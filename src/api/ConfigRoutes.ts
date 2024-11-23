import { CommonRoutesConfig } from "./CommonRoutesConfig";
import express from "express";
import ConfigController from "../controller/ConfigController";

export class ConfigRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ConfigRoutes");
  }

  configureRoutes() {
    this.app.route(`/config`)
      .get((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.getAll();
      })
      .post((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.create(req.body);
      });

    this.app.route(`/config/:configId`)
      .get((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.get(parseInt(req.params.configId));
      })
      .put((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.update(parseInt(req.params.configId), req.body);
      })
      .patch((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.update(parseInt(req.params.configId), req.body);
      })
      .delete((req: express.Request, res: express.Response) => {
        const configController = new ConfigController(req, res);
        configController.delete(parseInt(req.params.configId));
      });

    return this.app;
  }
}
