import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
} from 'firebase/firestore';

export interface ErrorLog {
  id: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack?: string;
  context: {
    userId?: string;
    adminId?: string;
    sessionId?: string;
    userAgent?: string;
    url?: string;
    method?: string;
    statusCode?: number;
    timestamp: Date;
  };
  metadata?: {
    component?: string;
    action?: string;
    entityId?: string;
    entityType?: string;
    [key: string]: any;
  };
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface PerformanceLog {
  id: string;
  operation: string;
  duration: number; // in milliseconds
  success: boolean;
  context: {
    userId?: string;
    adminId?: string;
    sessionId?: string;
    url?: string;
    method?: string;
    timestamp: Date;
  };
  metadata?: {
    component?: string;
    apiEndpoint?: string;
    databaseOperation?: string;
    [key: string]: any;
  };
}

export class ErrorLoggingService {
  private static readonly ERROR_COLLECTION = 'errorLogs';
  private static readonly PERFORMANCE_COLLECTION = 'performanceLogs';

  /**
   * Log an error
   */
  static async logError(
    level: ErrorLog['level'],
    message: string,
    error?: Error,
    context: Partial<ErrorLog['context']> = {},
    metadata: ErrorLog['metadata'] = {}
  ): Promise<string> {
    try {
      if (!db) {
        console.error('Database not initialized for error logging');
        return '';
      }

      const errorData = {
        level,
        message,
        stack: error?.stack,
        context: {
          ...context,
          timestamp: serverTimestamp(),
        },
        metadata,
        resolved: false,
      };

      const docRef = await addDoc(
        collection(db, this.ERROR_COLLECTION),
        errorData
      );

      // Also log to console for development
      if (process.env.NODE_ENV === 'development') {
        console.error(`[${level.toUpperCase()}] ${message}`, error);
      }

      return docRef.id;
    } catch (logError) {
      console.error('Failed to log error:', logError);
      return '';
    }
  }

  /**
   * Log performance metrics
   */
  static async logPerformance(
    operation: string,
    duration: number,
    success: boolean,
    context: Partial<PerformanceLog['context']> = {},
    metadata: PerformanceLog['metadata'] = {}
  ): Promise<string> {
    try {
      if (!db) {
        console.error('Database not initialized for performance logging');
        return '';
      }

      const performanceData = {
        operation,
        duration,
        success,
        context: {
          ...context,
          timestamp: serverTimestamp(),
        },
        metadata,
      };

      const docRef = await addDoc(
        collection(db, this.PERFORMANCE_COLLECTION),
        performanceData
      );
      return docRef.id;
    } catch (error) {
      console.error('Failed to log performance:', error);
      return '';
    }
  }

  /**
   * Get error logs with filtering
   */
  static async getErrorLogs(
    filters: {
      level?: ErrorLog['level'];
      resolved?: boolean;
      userId?: string;
      adminId?: string;
      startDate?: Date;
      endDate?: Date;
    } = {},
    limitCount: number = 100
  ): Promise<ErrorLog[]> {
    try {
      if (!db) {
        return [];
      }

      let q = query(
        collection(db, this.ERROR_COLLECTION),
        orderBy('context.timestamp', 'desc'),
        limit(limitCount)
      );

      // Apply filters
      if (filters.level) {
        q = query(q, where('level', '==', filters.level));
      }
      if (filters.resolved !== undefined) {
        q = query(q, where('resolved', '==', filters.resolved));
      }
      if (filters.userId) {
        q = query(q, where('context.userId', '==', filters.userId));
      }
      if (filters.adminId) {
        q = query(q, where('context.adminId', '==', filters.adminId));
      }

      const querySnapshot = await getDocs(q);
      const errorLogs: ErrorLog[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        errorLogs.push({
          id: doc.id,
          level: data.level,
          message: data.message,
          stack: data.stack,
          context: {
            ...data.context,
            timestamp: data.context.timestamp?.toDate() || new Date(),
          },
          metadata: data.metadata,
          resolved: data.resolved,
          resolvedAt: data.resolvedAt?.toDate(),
          resolvedBy: data.resolvedBy,
        });
      });

      return errorLogs;
    } catch (error) {
      console.error('Error getting error logs:', error);
      return [];
    }
  }

  /**
   * Get performance logs
   */
  static async getPerformanceLogs(
    filters: {
      operation?: string;
      success?: boolean;
      userId?: string;
      adminId?: string;
      minDuration?: number;
      maxDuration?: number;
    } = {},
    limitCount: number = 100
  ): Promise<PerformanceLog[]> {
    try {
      if (!db) {
        return [];
      }

      let q = query(
        collection(db, this.PERFORMANCE_COLLECTION),
        orderBy('context.timestamp', 'desc'),
        limit(limitCount)
      );

      // Apply filters
      if (filters.operation) {
        q = query(q, where('operation', '==', filters.operation));
      }
      if (filters.success !== undefined) {
        q = query(q, where('success', '==', filters.success));
      }
      if (filters.userId) {
        q = query(q, where('context.userId', '==', filters.userId));
      }
      if (filters.adminId) {
        q = query(q, where('context.adminId', '==', filters.adminId));
      }

      const querySnapshot = await getDocs(q);
      const performanceLogs: PerformanceLog[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        performanceLogs.push({
          id: doc.id,
          operation: data.operation,
          duration: data.duration,
          success: data.success,
          context: {
            ...data.context,
            timestamp: data.context.timestamp?.toDate() || new Date(),
          },
          metadata: data.metadata,
        });
      });

      return performanceLogs;
    } catch (error) {
      console.error('Error getting performance logs:', error);
      return [];
    }
  }

  /**
   * Mark error as resolved
   */
  static async resolveError(
    errorId: string,
    resolvedBy: string
  ): Promise<boolean> {
    try {
      if (!db) {
        return false;
      }

      await addDoc(collection(db, this.ERROR_COLLECTION), {
        id: errorId,
        resolved: true,
        resolvedAt: serverTimestamp(),
        resolvedBy,
      });

      return true;
    } catch (error) {
      console.error('Error resolving error:', error);
      return false;
    }
  }

  /**
   * Get error statistics
   */
  static async getErrorStats(): Promise<{
    total: number;
    byLevel: Record<string, number>;
    unresolved: number;
    recentErrors: number;
  }> {
    try {
      const errorLogs = await this.getErrorLogs({}, 1000);

      const stats = {
        total: errorLogs.length,
        byLevel: {} as Record<string, number>,
        unresolved: 0,
        recentErrors: 0,
      };

      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      errorLogs.forEach(log => {
        // Count by level
        stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;

        // Count unresolved
        if (!log.resolved) {
          stats.unresolved++;
        }

        // Count recent errors
        if (log.context.timestamp > oneDayAgo) {
          stats.recentErrors++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error getting error stats:', error);
      return {
        total: 0,
        byLevel: {},
        unresolved: 0,
        recentErrors: 0,
      };
    }
  }

  /**
   * Get performance statistics
   */
  static async getPerformanceStats(): Promise<{
    averageResponseTime: number;
    successRate: number;
    slowestOperations: Array<{ operation: string; duration: number }>;
    totalOperations: number;
  }> {
    try {
      const performanceLogs = await this.getPerformanceLogs({}, 1000);

      if (performanceLogs.length === 0) {
        return {
          averageResponseTime: 0,
          successRate: 0,
          slowestOperations: [],
          totalOperations: 0,
        };
      }

      const totalDuration = performanceLogs.reduce(
        (sum, log) => sum + log.duration,
        0
      );
      const successfulOperations = performanceLogs.filter(
        log => log.success
      ).length;

      // Get slowest operations
      const operationDurations = performanceLogs.reduce(
        (acc, log) => {
          if (!acc[log.operation]) {
            acc[log.operation] = [];
          }
          acc[log.operation].push(log.duration);
          return acc;
        },
        {} as Record<string, number[]>
      );

      const slowestOperations = Object.entries(operationDurations)
        .map(([operation, durations]) => ({
          operation,
          duration: Math.max(...durations),
        }))
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5);

      return {
        averageResponseTime: totalDuration / performanceLogs.length,
        successRate: (successfulOperations / performanceLogs.length) * 100,
        slowestOperations,
        totalOperations: performanceLogs.length,
      };
    } catch (error) {
      console.error('Error getting performance stats:', error);
      return {
        averageResponseTime: 0,
        successRate: 0,
        slowestOperations: [],
        totalOperations: 0,
      };
    }
  }
}
