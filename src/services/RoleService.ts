import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';
import { CacheService } from './CacheService';

export class RoleService {
  private prisma: PrismaClient;
  private cache: CacheService;

  constructor() {
    this.prisma = Mysql.getClient();
    this.cache = new CacheService('roles');
  }

  async findAll() {
    const cached = await this.cache.get<any[]>('all');
    if (cached) return cached;

    const roles = await this.prisma.role.findMany();
    await this.cache.set('all', roles);

    return roles;
  }

  async findById(id: number) {
    const cached = await this.cache.get<any>(`${id}`);
    if (cached) return cached;

    const role = await this.prisma.role.findUnique({
      where: { id }
    });

    if (role) {
      await this.cache.set(`${id}`, role);
    }

    return role;
  }

  async create(data: any) {
    const role = await this.prisma.role.create({ data });
    await this.cache.delete('all');
    return role;
  }

  async update(id: number, data: any) {
    const role = await this.prisma.role.update({
      where: { id },
      data
    });
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return role;
  }

  async delete(id: number) {
    const result = await this.prisma.role.delete({
      where: { id }
    });
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return result;
  }
}

export const roleService = new RoleService();
