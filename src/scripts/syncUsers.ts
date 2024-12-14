import { firebaseService } from '../services/FirebaseService';
import { userSyncService } from '../services/UserSyncService';
import Mysql from '../modules/Connection/Mysql';
import Redis from '../modules/Connection/Redis';
import * as dotenv from 'dotenv';

dotenv.config();

async function syncUsers() {
  console.log('Starting manual user sync...');
  try {
    // Initialize connections
    await Promise.all([
      Mysql.isConnected(),
      Redis.connect()
    ]);

    const { users } = await firebaseService.listUsers();
    console.log(`Found ${users.length} users to sync`);

    for (const user of users) {
      try {
        await userSyncService.syncUserFromFirebase(user.uid);
        console.log(`✅ Synced user: ${user.email}`);
      } catch (error) {
        console.error(`❌ Failed to sync user ${user.email}:`, error);
        continue;
      }
    }

    console.log('Manual user sync completed');

    // Close connections
    await Promise.all([
      Mysql.disconnect(),
      Redis.disconnect()
    ]);

    process.exit(0);
  } catch (error) {
    console.error('Manual user sync failed:', error);
    process.exit(1);
  }
}

syncUsers();
