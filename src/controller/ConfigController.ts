import { ControllerBase } from "./ControllerBase";
import MysqlConnection from "../modules/Connection/Mysql";

class ConfigController extends ControllerBase {
  async getAll() {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.config.findMany();
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        error: "An error occurred while fetching configs",
      });
    }
  }

  async get(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      const data = await prisma.config.findUnique({
        where: { id: id },
      });
      this.res.status(200).json(data);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        error: "An error occurred while fetching config",
      });
    }
  }
  async update(id: number, data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.config.update({
        where: { id: id },
        data: data,
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        error: "An error occurred while updating config",
      });
    }
  }
  async create(data: any) {
    try {
      const prisma = MysqlConnection.getClient();
      const newConfig = await prisma.config.create({
        data: data,
      });
      this.res.status(201).json(newConfig);
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        error: "An error occurred while creating config",
      });
    }
  }
  async delete(id: number) {
    try {
      const prisma = MysqlConnection.getClient();
      await prisma.config.delete({
        where: { id: id },
      });
      this.res.status(204).send();
    } catch (error) {
      this.res.status(500).json({
        code: (error as any).code,
        error: "An error occurred while deleting config",
      });
    }
  }
}

export default ConfigController;
