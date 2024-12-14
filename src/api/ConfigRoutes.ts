import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { ConfigController } from '../controllers/ConfigController';
import { authMiddleware } from '../middleware/AuthMiddleware';

export class ConfigRoutes extends BaseRoutes {
  constructor(app: express.Application | express.Router) {
    super(app, 'ConfigRoutes');
  }

  configureRoutes(): express.Application | express.Router {
    const controller = (req: express.Request, res: express.Response) => new ConfigController(req, res);

    this.app.route('/configs')
      .all(authMiddleware)
      .get((req, res) => controller(req, res).getAll())
      .post((req, res) => controller(req, res).create(req.body));

    this.app.route('/configs/:configId')
      .all(authMiddleware)
      .get((req, res) => controller(req, res).get(Number(req.params.configId)))
      .put((req, res) => controller(req, res).update(Number(req.params.configId), req.body))
      .delete((req, res) => controller(req, res).delete(Number(req.params.configId)));

    return this.app;
  }
}
