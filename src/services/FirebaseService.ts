import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import * as serviceAccount from '../../firebase_config.json';

export class FirebaseService {
  private static instance: FirebaseService;
  private auth: admin.auth.Auth;

  private constructor() {
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key
          } as admin.ServiceAccount)
        });
      }
      this.auth = admin.auth();
      console.log('Firebase Admin initialized successfully');
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public async verifyToken(token: string): Promise<DecodedIdToken> {
    return this.auth.verifyIdToken(token);
  }

  public async createCustomToken(uid: string): Promise<string> {
    return this.auth.createCustomToken(uid);
  }

  public async getUser(uid: string) {
    return this.auth.getUser(uid);
  }

  public async revokeRefreshTokens(uid: string) {
    return this.auth.revokeRefreshTokens(uid);
  }

  public async listUsers() {
    return this.auth.listUsers();
  }
}

export const firebaseService = FirebaseService.getInstance();
