import { BaseController } from './BaseController';
import { firebaseService } from '../services/FirebaseService';

export class AuthController extends BaseController {
  async verify() {
    try {
      const token = this.req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        return this.sendResponse({ valid: false }, 401);
      }

      const decodedToken = await firebaseService.verifyToken(token);
      return this.sendResponse({
        valid: true,
        user: decodedToken
      });
    } catch (error) {
      return this.sendResponse({ valid: false }, 401);
    }
  }

  async getProfile() {
    try {
      const user = (this.req as any).user;
      if (!user?.uid) {
        return this.sendResponse(null, 404);
      }

      const userRecord = await firebaseService.getUser(user.uid);
      return this.sendResponse(userRecord);
    } catch (error) {
      return this.sendResponse(error, 500);
    }
  }
}
