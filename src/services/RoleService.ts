import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';

export class RoleService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = Mysql.getClient();
  }
  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findById(id: number) {
    return await this.prisma.role.findUnique({
      where: { id }
    });
  }

  async create(data: any) {
    return await this.prisma.role.create({
      data
    });
  }

  async update(id: number, data: any) {
    return await this.prisma.role.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return await this.prisma.role.delete({
      where: { id }
    });
  }
}

export const roleService = new RoleService();
