import * as cron from 'node-cron';
import { logService, LogType } from '../Logger/LogService';
import { CronJob } from './interfaces/CronJob';
import { jobs } from './jobs';

export class CronService {
  private static instance: CronService;
  private jobs: Map<string, CronJob> = new Map();

  private constructor() {
    this.registerJobs();
  }

  private registerJobs() {
    jobs.forEach(job => this.addJob(job));
  }

  public addJob(job: CronJob) {
    this.jobs.set(job.name, job);
  }

  public removeJob(jobName: string) {
    this.jobs.delete(jobName);
  }

  public getJob(jobName: string): CronJob | undefined {
    return this.jobs.get(jobName);
  }

  public static getInstance(): CronService {
    if (!CronService.instance) {
      CronService.instance = new CronService();
    }
    return CronService.instance;
  }

  public initializeCrons() {
    for (const [name, job] of this.jobs) {
      if (!job.enabled) continue;

      logService.notice(`Initializing ${name} job with schedule: ${job.schedule}`, LogType.CRON);
      cron.schedule(job.schedule, job.handler);
    }
  }
}

export const cronService = CronService.getInstance();
