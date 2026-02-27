import prisma from './db';

export type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  jobId?: string;
  projectId?: string;
  uploadId?: string;
  chapterId?: string;
  entityId?: string;
  [key: string]: unknown;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext) {
    console.log(this.formatMessage('info', message, context));
    if (context?.jobId) {
      this.saveToDb('info', message, context);
    }
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage('warn', message, context));
    if (context?.jobId) {
      this.saveToDb('warn', message, context);
    }
  }

  error(message: string, context?: LogContext) {
    console.error(this.formatMessage('error', message, context));
    if (context?.jobId) {
      this.saveToDb('error', message, context);
    }
  }

  private async saveToDb(level: LogLevel, message: string, context: LogContext) {
    if (!context.jobId) return;

    try {
      await prisma.jobLog.create({
        data: {
          jobId: context.jobId,
          level,
          message,
          metadata: JSON.stringify(context),
        },
      });
    } catch (error) {
      console.error('Failed to save log to database:', error);
    }
  }
}

export const logger = new Logger();

// Job progress helper
export async function updateJobProgress(
  jobId: string,
  progress: number,
  stepLabel?: string,
  currentStep?: number
): Promise<void> {
  await prisma.job.update({
    where: { id: jobId },
    data: {
      progress,
      stepLabel,
      currentStep,
      ...(progress === 100 ? { status: 'completed', completedAt: new Date() } : {}),
    },
  });
}

export async function failJob(jobId: string, error: string): Promise<void> {
  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: 'failed',
      error,
      completedAt: new Date(),
    },
  });

  logger.error(`Job ${jobId} failed: ${error}`, { jobId });
}

export async function startJob(jobId: string): Promise<void> {
  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: 'running',
      startedAt: new Date(),
    },
  });

  logger.info(`Job ${jobId} started`, { jobId });
}
