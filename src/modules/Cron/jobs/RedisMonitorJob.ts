import { CronJob } from '../interfaces/CronJob';
import { logService, LogType } from '../../Logger/LogService';
import Redis from '../../Connection/Redis';
import { getSchedule } from '../utils/scheduleHelper';

function parseRedisInfo(info: string) {
  const result: Record<string, any> = {};
  const lines = info.split('\n');

  for (const line of lines) {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split(':');
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    }
  }

  return result;
}

export const RedisMonitorJob: CronJob = {
  name: 'redisMonitor',
  schedule: getSchedule('*/5 * * * *'),
  enabled: true,
  handler: async () => {
    await logService.info('Starting Redis monitoring...', LogType.REDIS);

    try {
      const rawInfo = await Redis.getClient().info();
      const info = parseRedisInfo(rawInfo);

      await logService.info('Redis Server Info:', LogType.REDIS);
      await logService.info(`Connected Clients: ${info.connected_clients}`, LogType.REDIS);
      await logService.info(`Total Commands: ${info.total_commands_processed}`, LogType.REDIS);
      await logService.info(`Keyspace Hits: ${info.keyspace_hits}`, LogType.REDIS);
      await logService.info(`Keyspace Misses: ${info.keyspace_misses}`, LogType.REDIS);

      const hitRate = Number(info.keyspace_hits) / (Number(info.keyspace_hits) + Number(info.keyspace_misses)) * 100;
      await logService.info(`Cache Hit Rate: ${hitRate.toFixed(2)}%`, LogType.REDIS);

      await logService.notice('Redis monitoring completed', LogType.REDIS);
    } catch (error) {
      await logService.error(`Redis monitoring failed: ${error}`, LogType.REDIS);
    }
  }
};
