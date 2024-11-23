import { Response, Request } from "express";

export abstract class ControllerBase {
  protected req: Request;
  protected res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  getAll(): any {};
  get(id: number): any {};
  update(id: number, data: any): any {};
  create(data: any): any {};
  delete(id: number): any {};
}
