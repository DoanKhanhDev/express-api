import { PrismaClient } from '@prisma/client'

/**
 * The Connection interface. This interface uses Prisma to connect to DB (MySQL).
 */
export interface MysqlInterface {
  /**
   * Get the Prisma client instance.
   */
  getClient(): PrismaClient;

  /**
   * Check if the connection to MySQL is established.
   */
  isConnected(): Promise<boolean>;
}

export default new (class Mysql implements MysqlInterface {
  private prisma: PrismaClient;

  /**
   * Create a constructor to initialize the Prisma client.
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  public async isConnected(): Promise<boolean> {
    try {
      await this.getClient().$connect();
      return true;
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      return false;
    }
  }

  /**
   * Disconnect from the database.
   */
  public async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
})();
