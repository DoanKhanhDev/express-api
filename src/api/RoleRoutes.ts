import { CommonRoutesConfig } from "./CommonRoutesConfig";
import express from "express";
import RoleController from "../controller/RoleController";

export class RoleRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "RoleRoutes");
  }

  configureRoutes() {
    this.app.route(`/role`)
      .get((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.getAll();
      })
      .post((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.create(req.body);
      });

    this.app.route(`/role/:userId`)
      .get((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.get(parseInt(req.params.userId));
      })
      .put((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.update(parseInt(req.params.userId), req.body);
      })
      .patch((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.update(parseInt(req.params.userId), req.body);
      })
      .delete((req: express.Request, res: express.Response) => {
        const roleController = new RoleController(req, res);
        roleController.delete(parseInt(req.params.userId));
      });

    return this.app;
  }
}
