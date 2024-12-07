import { BaseController } from './BaseController';
import { configService } from '../services/ConfigService';

export class ConfigController extends BaseController {
  async getAll() {
    try {
      const configs = await configService.findAll();
      return this.sendResponse(configs);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async get(id: number) {
    try {
      const config = await configService.findById(id);
      if (!config) {
        return this.sendResponse(null, 404);
      }
      return this.sendResponse(config);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async create(data: any) {
    try {
      const newConfig = await configService.create(data);
      return this.sendResponse(newConfig, 201);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async update(id: number, data: any) {
    try {
      const updated = await configService.update(id, data);
      return this.sendResponse(updated);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async delete(id: number) {
    try {
      await configService.delete(id);
      return this.sendResponse(null, 204);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }
}
