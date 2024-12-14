import express from 'express';
import { BaseRoutes } from './BaseRoutes';
import { UserRoutes } from './UserRoutes';
import { RoleRoutes } from './RoleRoutes';
import { ConfigRoutes } from './ConfigRoutes';
import { AuthRoutes } from './AuthRoutes';

export class RouteRegistry {
  private routes: Map<string, Array<BaseRoutes>> = new Map();
  private apiRouters: Map<string, express.Router> = new Map();

  constructor(private app: express.Application) {
    this.initializeVersions(['v1']);
  }

  private initializeVersions(versions: string[]) {
    versions.forEach(version => {
      const router = express.Router();
      this.app.use(`/api/${version}`, router);
      this.apiRouters.set(version, router);
      this.routes.set(version, []);
    });
  }

  public registerV1Routes(): void {
    const router = this.apiRouters.get('v1');
    if (!router) return;

    const v1Routes = [
      new UserRoutes(router),
      new RoleRoutes(router),
      new ConfigRoutes(router),
      new AuthRoutes(router)
    ];

    this.routes.set('v1', v1Routes);
  }

  // public registerV2Routes(): void {
  //   const router = this.apiRouters.get('v2');
  //   if (!router) return;

  //   const v2Routes = [
  //     // Add v2 specific routes here
  //     // Example: new UserRoutesV2(router)
  //   ];

  //   this.routes.set('v2', v2Routes);
  // }

  public registerRoutes(): Array<BaseRoutes> {
    this.registerV1Routes();
    // this.registerV2Routes();

    // Flatten all routes for logging
    return Array.from(this.routes.values()).flat();
  }
}
