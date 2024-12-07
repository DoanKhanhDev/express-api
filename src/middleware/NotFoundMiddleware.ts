import { Request, Response } from 'express';
import JsonResponse from '../modules/Helper/JsonResponse';

export const notFoundHandler = (req: Request, res: Response) => {
  const jsonResponse = new JsonResponse();
  return res.status(404).json(
    jsonResponse
      .setStatusCode(404)
      .setData(null)
      .setMessage(`Route ${req.method} ${req.url} not found`)
      .send()
  );
};
