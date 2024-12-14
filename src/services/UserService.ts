import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';
import { CacheService } from './CacheService';
import { systemErrorLogger } from '../modules/Logger/SystemErrorLogger';

export class UserService {
  private prisma: PrismaClient;
  private cache: CacheService;

  constructor() {
    this.prisma = Mysql.getClient();
    this.cache = new CacheService('users');
  }

  async findAll() {
    try {
      const cached = await this.cache.get<any[]>('all');
      if (cached) return cached;

      const users = await this.prisma.user.findMany();
      await this.cache.set('all', users);
      return users;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.findAll');
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const cached = await this.cache.get<any>(`${id}`);
      if (cached) return cached;

      const user = await this.prisma.user.findUnique({ where: { id } });
      if (user) {
        await this.cache.set(`${id}`, user);
      }
      return user;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.findById');
      throw error;
    }
  }

  async create(data: any) {
    try {
      const user = await this.prisma.user.create({ data });
      await this.cache.delete('all');
      return user;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.create');
      throw error;
    }
  }

  async update(id: number, data: any) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data
      });
      await Promise.all([
        this.cache.delete('all'),
        this.cache.delete(`${id}`)
      ]);
      return user;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.update');
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const result = await this.prisma.user.delete({ where: { id } });
      await Promise.all([
        this.cache.delete('all'),
        this.cache.delete(`${id}`)
      ]);
      return result;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.delete');
      throw error;
    }
  }

  async findByUid(uid: string) {
    try {
      const cached = await this.cache.get<any>(`uid:${uid}`);
      if (cached) return cached;

      const user = await this.prisma.user.findUnique({ where: { uid } });
      if (user) {
        await this.cache.set(`uid:${uid}`, user);
      }
      return user;
    } catch (error) {
      await systemErrorLogger.logError(error, 'UserService.findByUid');
      throw error;
    }
  }
}

export const userService = new UserService();
