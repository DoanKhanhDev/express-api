import { ControllerBase } from "./ControllerBase";
import MysqlConnection from "../modules/Connection/Mysql";

class UserController extends ControllerBase {
  async getAll() {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.user.findMany();
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while fetching users",
      });
    }
  }

  async get(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.user.findUnique({
        where: { id: id },
      });
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while fetching user",
      });
    }
  }

  async update(id: number, data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.user.update({
        where: { id: id },
        data: data,
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while updating user",
      });
    }
  }

  async create(data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      const newUser = await prisma.user.create({
        data: data,
      });
      this.res.status(201).json(newUser);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while creating user",
      });
    }
  }

  async delete(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.user.delete({
        where: { id: id },
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while deleting user",
      });
    }
  }
}

export default UserController;
