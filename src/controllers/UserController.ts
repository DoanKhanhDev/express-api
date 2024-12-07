import { BaseController } from "./BaseController";
import { userService } from "../services/UserService";

export class UserController extends BaseController {
  async getAll() {
    try {
      const users = await userService.findAll();
      return this.sendResponse(users);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async get(id: number) {
    try {
      const user = await userService.findById(id);
      if (!user) {
        return this.sendResponse(null, 404);
      }
      return this.sendResponse(user);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }

  async create(data: any) {
    try {
      const newUser = await userService.create(data);
      return this.sendResponse(newUser, 201);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async update(id: number, data: any) {
    try {
      const updated = await userService.update(id, data);
      return this.sendResponse(updated);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }

  async delete(id: number) {
    try {
      await userService.delete(id);
      return this.sendResponse(null, 204);
    } catch (error) {
      return this.sendResponse(error, 400);
    }
  }
}
