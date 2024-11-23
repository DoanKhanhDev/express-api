import { ControllerBase } from "./ControllerBase";
import MysqlConnection from "../modules/Connection/Mysql";

class RoleController extends ControllerBase {
  async getAll() {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.role.findMany();
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while fetching roles",
      });
    }
  }

  async get(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.role.findUnique({
        where: { id: id },
      });
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while fetching role",
      });
    }
  }

  async update(id: number, data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.role.update({
        where: { id: id },
        data: data,
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while updating role",
      });
    }
  }

  async create(data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      const newRoles = await prisma.role.create({
        data: data,
      });
      this.res.status(201).json(newRoles);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while creating role",
      });
    }
  }

  async delete(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.role.delete({
        where: { id: id },
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        message: "An error occurred while deleting role",
      });
    }
  }
}

export default RoleController;
