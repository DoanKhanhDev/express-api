import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { UserController } from '../controllers/UserController';

export class UserRoutesV2 extends BaseRoutes {
  constructor(app: express.Application | express.Router) {
    super(app, 'UserRoutesV2');
  }

  configureRoutes(): express.Application | express.Router {
    // V2-specific implementation
    // Could have different endpoints or behavior
    return this.app;
  }
}
