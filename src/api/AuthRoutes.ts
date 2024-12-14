import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/AuthMiddleware';

export class AuthRoutes extends BaseRoutes {
  constructor(app: express.Application | express.Router) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application | express.Router {
    const controller = (req: express.Request, res: express.Response) =>
      new AuthController(req, res);

    // Public routes
    this.app.route('/auth/verify')
      .post((req, res) => controller(req, res).verify());

    // Protected routes
    this.app.route('/auth/profile')
      .all(authMiddleware)
      .get((req, res) => controller(req, res).getProfile());

    return this.app;
  }
}
