import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { RoleController } from '../controllers/RoleController';

export class RoleRoutes extends BaseRoutes {
  constructor(app: express.Application  | express.Router) {
    super(app, 'RoleRoutes');
  }

  configureRoutes(): express.Application | express.Router {
    const controller = (req: express.Request, res: express.Response) => new RoleController(req, res);

    this.app.route('/roles')
      .get((req, res) => controller(req, res).getAll())
      .post((req, res) => controller(req, res).create(req.body));

    this.app.route('/roles/:roleId')
      .get((req, res) => controller(req, res).get(Number(req.params.roleId)))
      .put((req, res) => controller(req, res).update(Number(req.params.roleId), req.body))
      .delete((req, res) => controller(req, res).delete(Number(req.params.roleId)));

    return this.app;
  }
}
