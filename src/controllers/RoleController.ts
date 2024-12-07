import { BaseController } from './BaseController';
import { roleService } from '../services/RoleService';

export class RoleController extends BaseController {
  async getAll() {
    try {
      const roles = await roleService.findAll();
      return this.sendResponse(roles);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async get(id: number) {
    try {
      const role = await roleService.findById(id);
      if (!role) {
        return this.sendResponse(null, 404);
      }
      return this.sendResponse(role);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async create(data: any) {
    try {
      const newRole = await roleService.create(data);
      return this.sendResponse(newRole, 201);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async update(id: number, data: any) {
    try {
      const updated = await roleService.update(id, data);
      return this.sendResponse(updated);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async delete(id: number) {
    try {
      await roleService.delete(id);
      return this.sendResponse(null, 204);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }
}
