import { firebaseService } from './FirebaseService';
import { userService } from './UserService';

export class UserSyncService {
  private static instance: UserSyncService;

  private constructor() {}

  public static getInstance(): UserSyncService {
    if (!UserSyncService.instance) {
      UserSyncService.instance = new UserSyncService();
    }
    return UserSyncService.instance;
  }

  public async syncUserFromFirebase(uid: string) {
    try {
      // Get user from Firebase
      const firebaseUser = await firebaseService.getUser(uid);

      // Check if user exists in our database
      const existingUser = await userService.findByUid(uid);

      if (existingUser) {
        // Update existing user
        return await userService.update(existingUser.id, {
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        // Create new user
        return await userService.create({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      }
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  }
}

export const userSyncService = UserSyncService.getInstance();
