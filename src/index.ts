import express from 'express';
import * as dotenv from 'dotenv';
import { RouteRegistry } from './api/RouteRegistry';
import Mysql from './modules/Connection/Mysql';

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Database connection
Mysql.isConnected();

// Routes registration
const routeRegistry = new RouteRegistry(app);
const routes = routeRegistry.registerRoutes();

// Server startup
app.listen(port, () => {
  routes.forEach(route => {
    console.log(`Routes configured for ${route.name}`);
  });
  console.log(`Server running at https://${process.env.DOMAIN}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await Mysql.disconnect();
  process.exit(0);
});
