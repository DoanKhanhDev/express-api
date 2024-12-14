import { CronJob } from '../interfaces/CronJob';
import { firebaseService } from '../../../services/FirebaseService';
import { userSyncService } from '../../../services/UserSyncService';
import { logService, LogType } from '../../Logger/LogService';
import { getSchedule } from '../utils/scheduleHelper';

export const UserSyncJob: CronJob = {
  name: 'userSync',
  schedule: getSchedule('*/10 * * * *'),
  enabled: true,
  handler: async () => {
    await logService.info(`Starting user sync cron job...`, LogType.CRON);

    try {
      const { users } = await firebaseService.listUsers();
      await logService.info(`Found ${users.length} users to sync`, LogType.CRON);

      for (const user of users) {
        try {
          await userSyncService.syncUserFromFirebase(user.uid);
        } catch (error) {
          await logService.error(`Failed to sync user ${user.email}: ${error}`, LogType.CRON);
          continue;
        }
      }

      await logService.notice(`User sync cron job completed`, LogType.CRON);
    } catch (error) {
      await logService.error(`User sync cron job failed: ${error}`, LogType.CRON);
    }
  }
};
