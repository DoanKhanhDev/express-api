import { CommonRoutesConfig } from "./CommonRoutesConfig";
import express from "express";
import MysqlConnection from "../modules/Connection/Mysql";

export class ConfigRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ConfigRoutes");
  }

  configureRoutes() {
    this.app.route(`/config`)
      .get(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          const data = await prisma.config.findMany();
          res.status(200).json(data);
        } catch (error) {
          res.status(500).json({ error: "An error occurred while fetching configs" });
        }
      })
      .post(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          const newConfig = await prisma.config.create({
            data: req.body,
          });
          res.status(200).json(newConfig);
        } catch (error) {
          res.status(500).json({ error: "An error occurred while updating the config" });
        }
      });

    this.app.route(`/config/:configId`)
      .get(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          const config = await prisma.config.findUnique({
            where: { id: parseInt(req.params.configId) }
          });
          if (config) {
            res.status(200).json(config);
          } else {
            res.status(404).json({ error: "Config not found" });
          }
        } catch (error) {
          res.status(500).json({ error: "An error occurred while fetching the config" });
        }
      })
      .put(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          const updatedConfig = await prisma.config.update({
            where: { id: parseInt(req.params.configId) },
            data: req.body
          });
          res.status(200).json(updatedConfig);
        } catch (error) {
          res.status(500).json({ error: "An error occurred while updating the config" });
        }
      })
      .patch(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          const updatedConfig = await prisma.config.update({
            where: { id: parseInt(req.params.configId) },
            data: req.body
          });
          res.status(200).json(updatedConfig);
        } catch (error) {
          res.status(500).json({ error: "An error occurred while patching the config" });
        }
      })
      .delete(async (req: express.Request, res: express.Response) => {
        try {
          const prisma = MysqlConnection.getClient();
          await prisma.config.delete({
            where: { id: parseInt(req.params.configId) }
          });
          res.status(200).json({ message: "Config deleted successfully" });
        } catch (error) {
          res.status(500).json({ error: "An error occurred while deleting the config" });
        }
      });

    return this.app;
  }
}
