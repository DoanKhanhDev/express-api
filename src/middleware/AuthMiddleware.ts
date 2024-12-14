import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { firebaseService } from '../services/FirebaseService';
import { userSyncService } from '../services/UserSyncService';
import JsonResponse from '../modules/Helper/JsonResponse';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
  dbUser?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (process.env.AUTH_ENABLED !== 'true') {
    return next();
  }

  const jsonResponse = new JsonResponse();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json(
        jsonResponse
          .setStatusCode(401)
          .setMessage('No token provided')
          .send()
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await firebaseService.verifyToken(idToken);

    const dbUser = await userSyncService.syncUserFromFirebase(decodedToken.uid);

    req.user = decodedToken;
    req.dbUser = dbUser;
    next();
  } catch (error: any) {
    console.error('Auth Error:', error);
    return res.status(401).json(
      jsonResponse
        .setStatusCode(401)
        .setMessage(error.message || 'Authentication failed')
        .send()
    );
  }
};
