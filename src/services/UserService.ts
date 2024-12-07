import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';
import { CacheService } from './CacheService';

export class UserService {
  private prisma: PrismaClient;
  private cache: CacheService;

  constructor() {
    this.prisma = Mysql.getClient();
    this.cache = new CacheService('users');
  }

  async findAll() {
    // Try cache first
    const cached = await this.cache.get<any[]>('all');
    if (cached) return cached;

    // Get from database
    const users = await this.prisma.user.findMany();

    // Cache result
    await this.cache.set('all', users);

    return users;
  }

  async findById(id: number) {
    // Try cache first
    const cached = await this.cache.get<any>(`${id}`);
    if (cached) return cached;

    // Get from database
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (user) {
      // Cache result
      await this.cache.set(`${id}`, user);
    }

    return user;
  }

  async create(data: any) {
    const user = await this.prisma.user.create({ data });
    // Invalidate cache
    await this.cache.delete('all');
    return user;
  }

  async update(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: { id },
      data
    });
    // Invalidate caches
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return user;
  }

  async delete(id: number) {
    const result = await this.prisma.user.delete({
      where: { id }
    });
    // Invalidate caches
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return result;
  }
}

export const userService = new UserService();
