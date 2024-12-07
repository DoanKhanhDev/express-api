import Redis from '../modules/Connection/Redis';

export class CacheService {
  constructor(private prefix: string) {}

  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    return await Redis.get(this.getKey(key));
  }

  async set(key: string, value: any, expireInSeconds: number = 300): Promise<void> {
    await Redis.set(this.getKey(key), value, expireInSeconds);
  }

  async delete(key: string): Promise<void> {
    await Redis.delete(this.getKey(key));
  }
}
