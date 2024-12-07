import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { UserController } from '../controllers/UserController';

export class UserRoutes extends BaseRoutes {
  constructor(app: express.Application | express.Router) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): express.Application | express.Router {
    const controller = (req: express.Request, res: express.Response) => new UserController(req, res);

    this.app.route('/users')
      .get((req, res) => controller(req, res).getAll())
      .post((req, res) => controller(req, res).create(req.body));

    this.app.route('/users/:userId')
      .get((req, res) => controller(req, res).get(Number(req.params.userId)))
      .put((req, res) => controller(req, res).update(Number(req.params.userId), req.body))
      .delete((req, res) => controller(req, res).delete(Number(req.params.userId)));

    return this.app;
  }
}
