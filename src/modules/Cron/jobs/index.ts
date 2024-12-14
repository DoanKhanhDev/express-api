import { UserSyncJob } from './UserSyncJob';
import { CleanupJob } from './CleanupJob';
import { RedisMonitorJob } from './RedisMonitorJob';
import { CronJob } from '../interfaces/CronJob';

export const jobs: CronJob[] = [
  UserSyncJob,
  CleanupJob,
  RedisMonitorJob
];
