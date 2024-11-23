import { CommonRoutesConfig } from "./CommonRoutesConfig";
import express from "express";
import UserController from "../controller/UserController";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.route(`/user`)
      .get((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.getAll();
      })
      .post((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.create(req.body);
      });

    this.app.route(`/user/:userId`)
      .get((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.get(parseInt(req.params.userId));
      })
      .put((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.update(parseInt(req.params.userId), req.body);
      })
      .patch((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.update(parseInt(req.params.userId), req.body);
      })
      .delete((req: express.Request, res: express.Response) => {
        const userController = new UserController(req, res);
        userController.delete(parseInt(req.params.userId));
      });

    return this.app;
  }
}
