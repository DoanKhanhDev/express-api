import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';

export class ConfigService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Mysql.getClient();
  }

  async findAll() {
    return await this.prisma.config.findMany();
  }

  async findById(id: number) {
    return await this.prisma.config.findUnique({
      where: { id }
    });
  }

  async create(data: any) {
    return await this.prisma.config.create({
      data
    });
  }

  async update(id: number, data: any) {
    return await this.prisma.config.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await this.prisma.config.delete({
      where: { id }
    });
  }
}

export const configService = new ConfigService();
