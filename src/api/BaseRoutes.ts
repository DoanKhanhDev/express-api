import express from 'express';

export abstract class BaseRoutes {
  app: express.Application | express.Router;
  name: string;

  constructor(app: express.Application | express.Router, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  abstract configureRoutes(): express.Application | express.Router;
}
