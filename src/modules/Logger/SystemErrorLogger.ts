import { logService, LogType } from './LogService';
import * as fs from 'fs';
import * as path from 'path';

export class SystemErrorLogger {
  private static instance: SystemErrorLogger;

  private constructor() {
    this.initializeErrorHandlers();
  }

  public static getInstance(): SystemErrorLogger {
    if (!SystemErrorLogger.instance) {
      SystemErrorLogger.instance = new SystemErrorLogger();
    }
    return SystemErrorLogger.instance;
  }

  private initializeErrorHandlers(): void {
    // Handle uncaught exceptions
    process.on('uncaughtException', async (error: Error) => {
      await this.logSystemError('UncaughtException', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (reason: any) => {
      await this.logSystemError('UnhandledRejection', reason);
      process.exit(1);
    });

    // Handle system signals
    process.on('SIGTERM', async () => {
      await this.logSystemError('SystemShutdown', new Error('SIGTERM received'));
      process.exit(0);
    });
  }

  private async logSystemError(type: string, error: any): Promise<void> {
    try {
      const errorDetails = {
        type,
        message: error.message || 'No error message',
        stack: error.stack || 'No stack trace',
        timestamp: new Date().toISOString(),
        processInfo: {
          pid: process.pid,
          platform: process.platform,
          nodeVersion: process.version,
          memory: process.memoryUsage()
        }
      };

      await logService.error(
        `SYSTEM ERROR [${type}]: ${JSON.stringify(errorDetails, null, 2)}`,
        LogType.SYSTEM
      );
    } catch (writeError) {
      // Last resort if logging fails
      console.error('Failed to write error log:', writeError);
      console.error('Original error:', error);
    }
  }

  public async logError(error: unknown, context?: string): Promise<void> {
    await this.logSystemError(
      context || 'ApplicationError',
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

export const systemErrorLogger = SystemErrorLogger.getInstance();
