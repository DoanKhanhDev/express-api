import { PrismaClient } from '@prisma/client';
import Mysql from '../modules/Connection/Mysql';
import { CacheService } from './CacheService';

export class ConfigService {
  private prisma: PrismaClient;
  private cache: CacheService;

  constructor() {
    this.prisma = Mysql.getClient();
    this.cache = new CacheService('configs');
  }

  async findAll() {
    const cached = await this.cache.get<any[]>('all');
    if (cached) return cached;

    const configs = await this.prisma.config.findMany();
    await this.cache.set('all', configs);

    return configs;
  }

  async findById(id: number) {
    const cached = await this.cache.get<any>(`${id}`);
    if (cached) return cached;

    const config = await this.prisma.config.findUnique({
      where: { id }
    });

    if (config) {
      await this.cache.set(`${id}`, config);
    }

    return config;
  }

  async create(data: any) {
    const config = await this.prisma.config.create({ data });
    await this.cache.delete('all');
    return config;
  }

  async update(id: number, data: any) {
    const config = await this.prisma.config.update({
      where: { id },
      data
    });
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return config;
  }

  async delete(id: number) {
    const result = await this.prisma.config.delete({
      where: { id }
    });
    await Promise.all([
      this.cache.delete('all'),
      this.cache.delete(`${id}`)
    ]);
    return result;
  }
}

export const configService = new ConfigService();
