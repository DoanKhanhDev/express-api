import JsonResponse from '../modules/Helper/JsonResponse';
import { Request, Response } from 'express';

export class BaseController {
  protected req: Request;
  protected res: Response;
  protected jsonResponse: JsonResponse;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    this.jsonResponse = new JsonResponse();
  }

  protected sendResponse(data: any = null, statusCode: number = 200) {
    return this.res
      .status(statusCode)
      .json(this.jsonResponse.setStatusCode(statusCode).setData(data).send());
  }
}
