import { CronJob } from '../interfaces/CronJob';
import { logService, LogType } from '../../Logger/LogService';
import { getSchedule } from '../utils/scheduleHelper';

export const CleanupJob: CronJob = {
  name: 'cleanup',
  schedule: getSchedule('0 0 * * *'),
  enabled: true,
  handler: async () => {
    await logService.info('Starting cleanup job...', LogType.CRON);
    // Cleanup logic here
    await logService.info('Cleanup completed', LogType.CRON);
  }
};
