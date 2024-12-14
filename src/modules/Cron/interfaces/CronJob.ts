export interface CronJob {
  name: string;
  schedule: string;
  enabled: boolean;
  handler: () => Promise<void>;
}
