import express from 'express';
import * as dotenv from 'dotenv';
import { RouteRegistry } from './api/RouteRegistry';
import Mysql from './modules/Connection/Mysql';
import Redis from './modules/Connection/Redis';
import { notFoundHandler } from './middleware/NotFoundMiddleware';

export class App {
  private app: express.Application;
  private port: number;

  constructor() {
    dotenv.config();
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
    this.initializeMiddlewares();
    this.initializeShutdown();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeShutdown() {
    process.on('SIGTERM', async () => {
      await Promise.all([
        Mysql.disconnect(),
        Redis.disconnect()
      ]);
      process.exit(0);
    });
  }

  public async bootstrap() {
    try {
      await Promise.all([
        Mysql.isConnected(),
        Redis.connect()
      ]);

      const routeRegistry = new RouteRegistry(this.app);
      const routes = routeRegistry.registerRoutes();

      this.app.use(notFoundHandler);

      this.app.listen(this.port, () => {
        routes.forEach(route => {
          console.log(`Routes configured for ${route.name}`);
        });
        console.log(`Server running at https://${process.env.DOMAIN}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}
