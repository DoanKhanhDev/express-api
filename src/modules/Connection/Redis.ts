import { createClient } from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

class Redis {
  private client;

  constructor() {
    this.client = createClient({
      url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.on('connect', () => console.log('Redis Client Connected'));
  }

  async connect() {
    await this.client.connect();
  }

  async set(key: string, value: any, expireInSeconds?: number) {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await this.client.set(key, stringValue);
    if (expireInSeconds) {
      await this.client.expire(key, expireInSeconds);
    }
  }

  async get(key: string) {
    const value = await this.client.get(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value;
    }
  }

  async delete(key: string) {
    await this.client.del(key);
  }

  async disconnect() {
    await this.client.disconnect();
  }
}

export default new Redis();
