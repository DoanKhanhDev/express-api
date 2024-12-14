import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { LogConfig } from './interfaces/LogConfig';
import { LogLevel, LogType } from './enums';

dotenv.config();

export class LogService {
  private static instance: LogService;
  private baseLogDir: string;
  private currentLogFiles: Map<LogType, string>;
  private readonly config: LogConfig;

  private constructor() {
    this.config = {
      retentionDays: 30,
      baseDir: process.env.LOG_DIR || 'logs'
    };

    this.baseLogDir = path.join(process.cwd(), this.config.baseDir);
    this.currentLogFiles = new Map();
    this.initializeLogTypes();
  }

  private initializeLogTypes(): void {
    Object.values(LogType).forEach(type => {
      const logDir = this.getTypeDirectory(type);
      this.ensureDirectory(logDir);
      this.currentLogFiles.set(type, this.generateFileName(type));
    });
    this.cleanOldLogs();
  }

  private getTypeDirectory(type: LogType): string {
    return path.join(this.baseLogDir, type);
  }

  private generateFileName(type: LogType): string {
    const date = new Date();
    const formattedDate = this.formatDate(date);
    return path.join(this.getTypeDirectory(type), `${type}-${formattedDate}.log`);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private async cleanOldLogs(): Promise<void> {
    try {
      await Promise.all(
        Object.values(LogType).map(type => this.cleanTypeDirectory(type))
      );
    } catch (error) {
      console.error('Error cleaning old logs:', error);
    }
  }

  private async cleanTypeDirectory(type: LogType): Promise<void> {
    const typeDir = this.getTypeDirectory(type);
    const files = await fs.promises.readdir(typeDir);
    const now = new Date();

    await Promise.all(
      files
        .filter(file => this.isValidLogFile(file, type))
        .map(async file => {
          const filePath = path.join(typeDir, file);
          await this.deleteIfOld(filePath, now);
        })
    );
  }

  private isValidLogFile(fileName: string, type: LogType): boolean {
    return fileName.startsWith(`${type}-`) && fileName.endsWith('.log');
  }

  private async deleteIfOld(filePath: string, now: Date): Promise<void> {
    const stats = await fs.promises.stat(filePath);
    const daysOld = (now.getTime() - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);

    if (daysOld > this.config.retentionDays) {
      await fs.promises.unlink(filePath);
      console.log(`Deleted old log file: ${path.basename(filePath)}`);
    }
  }

  private ensureDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
    }
    return LogService.instance;
  }

  private async writeLog(message: string, level: LogLevel, type: LogType): Promise<void> {
    const newLogFile = this.generateFileName(type);

    if (newLogFile !== this.currentLogFiles.get(type)) {
      this.currentLogFiles.set(type, newLogFile);
      await this.cleanOldLogs();
    }

    const logEntry = this.formatLogEntry(message, level);

    try {
      await fs.promises.appendFile(this.currentLogFiles.get(type)!, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  private formatLogEntry(message: string, level: LogLevel): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}\n`;
  }

  // Public logging methods
  public async log(message: string, level: LogLevel = LogLevel.INFO, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, level, type);
  }

  public async info(message: string, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, LogLevel.INFO, type);
  }

  public async error(message: string, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, LogLevel.ERROR, type);
  }

  public async warning(message: string, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, LogLevel.WARNING, type);
  }

  public async debug(message: string, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, LogLevel.DEBUG, type);
  }

  public async notice(message: string, type: LogType = LogType.SYSTEM): Promise<void> {
    await this.writeLog(message, LogLevel.NOTICE, type);
  }
}

export { LogLevel, LogType };
export const logService = LogService.getInstance();
