import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Mysql.getClient();
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id }
    });
  }

  async create(data: any) {
    return await this.prisma.user.create({
      data
    });
  }

  async update(id: number, data: any) {
    return await this.prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({
      where: { id }
    });
  }
}

export const userService = new UserService();
