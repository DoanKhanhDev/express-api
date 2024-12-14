import express from 'express';
import * as dotenv from 'dotenv';
import { RouteRegistry } from './api/RouteRegistry';
import Mysql from './modules/Connection/Mysql';
import Redis from './modules/Connection/Redis';
import { notFoundHandler } from './middleware/NotFoundMiddleware';
import { cronService } from './modules/Cron/CronService';
import { systemErrorLogger } from './modules/Logger/SystemErrorLogger';
import { logService, LogType } from './modules/Logger/LogService';

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
      await systemErrorLogger.logError(
        new Error('Application shutdown initiated'),
        'Shutdown'
      );
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

      // Initialize cron jobs
      cronService.initializeCrons();

      const routeRegistry = new RouteRegistry(this.app);
      const routes = routeRegistry.registerRoutes();

      this.app.use(notFoundHandler);

      this.app.listen(this.port, () => {
        routes.forEach(route => {
          logService.info(`Routes configured for ${route.name}`, LogType.SYSTEM);
        });
        logService.info(`Server running at https://${process.env.DOMAIN}`, LogType.SYSTEM);
      });
    } catch (error) {
      await systemErrorLogger.logError(error, 'Bootstrap');
      process.exit(1);
    }
  }
}
