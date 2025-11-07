/* eslint-disable @typescript-eslint/no-explicit-any */
// This file uses 'any' types for error metadata which can contain various dynamic properties
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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
  private static readonly ERROR_COLLECTION = 'error_logs';
  private static readonly PERFORMANCE_COLLECTION = 'performance_logs';

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
      const errorData = {
        level,
        message,
        stack: error?.stack,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
        },
        metadata,
        resolved: false,
      };

      const { data, error: insertError } = await supabase
        .from(this.ERROR_COLLECTION)
        .insert(errorData)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Also log to console for development
      if (process.env['NODE_ENV'] === 'development') {
        console.error(`[${level.toUpperCase()}] ${message}`, error);
      }

      return data.id;
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
      const performanceData = {
        operation,
        duration,
        success,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
        },
        metadata,
      };

      const { data, error: insertError } = await supabase
        .from(this.PERFORMANCE_COLLECTION)
        .insert(performanceData)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      return data.id;
    } catch (logError) {
      console.error('Failed to log performance:', logError);
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
      let query = supabase.from(this.ERROR_COLLECTION).select('*');

      if (filters.level) {
        query = query.eq('level', filters.level);
      }

      if (filters.resolved !== undefined) {
        query = query.eq('resolved', filters.resolved);
      }

      if (filters.userId) {
        query = query.eq('context.userId', filters.userId);
      }

      if (filters.adminId) {
        query = query.eq('context.adminId', filters.adminId);
      }

      if (filters.startDate) {
        query = query.gte('context.timestamp', filters.startDate.toISOString());
      }

      if (filters.endDate) {
        query = query.lte('context.timestamp', filters.endDate.toISOString());
      }

      const { data: logs, error } = await query
        .order('context.timestamp', { ascending: false })
        .limit(limitCount);

      if (error) {
        throw error;
      }

      return logs || [];
    } catch (error) {
      console.error('❌ Failed to get error logs:', error);
      return [];
    }
  }

  /**
   * Get performance logs with filtering
   */
  static async getPerformanceLogs(
    filters: {
      operation?: string;
      success?: boolean;
      userId?: string;
      adminId?: string;
      startDate?: Date;
      endDate?: Date;
    } = {},
    limitCount: number = 100
  ): Promise<PerformanceLog[]> {
    try {
      let query = supabase.from(this.PERFORMANCE_COLLECTION).select('*');

      if (filters.operation) {
        query = query.eq('operation', filters.operation);
      }

      if (filters.success !== undefined) {
        query = query.eq('success', filters.success);
      }

      if (filters.userId) {
        query = query.eq('context.userId', filters.userId);
      }

      if (filters.adminId) {
        query = query.eq('context.adminId', filters.adminId);
      }

      if (filters.startDate) {
        query = query.gte('context.timestamp', filters.startDate.toISOString());
      }

      if (filters.endDate) {
        query = query.lte('context.timestamp', filters.endDate.toISOString());
      }

      const { data: logs, error } = await query
        .order('context.timestamp', { ascending: false })
        .limit(limitCount);

      if (error) {
        throw error;
      }

      return logs || [];
    } catch (error) {
      console.error('❌ Failed to get performance logs:', error);
      return [];
    }
  }

  /**
   * Mark an error as resolved
   */
  static async resolveError(
    errorId: string,
    resolvedBy: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.ERROR_COLLECTION)
        .update({
          resolved: true,
          resolvedAt: new Date().toISOString(),
          resolvedBy,
        })
        .eq('id', errorId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('❌ Failed to resolve error:', error);
      return false;
    }
  }

  /**
   * Delete old logs (cleanup)
   */
  static async deleteOldLogs(
    olderThanDays: number = 30,
    logType: 'error' | 'performance' | 'both' = 'both'
  ): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      let deletedCount = 0;

      if (logType === 'error' || logType === 'both') {
        const { data: deletedErrors } = await supabase
          .from(this.ERROR_COLLECTION)
          .delete()
          .lt('context.timestamp', cutoffDate.toISOString())
          .select();

        deletedCount += (deletedErrors || []).length;
      }

      if (logType === 'performance' || logType === 'both') {
        const { data: deletedPerformance } = await supabase
          .from(this.PERFORMANCE_COLLECTION)
          .delete()
          .lt('context.timestamp', cutoffDate.toISOString())
          .select();

        deletedCount += (deletedPerformance || []).length;
      }

      console.log(`✅ Deleted ${deletedCount} old log entries`);
      return deletedCount;
    } catch (error) {
      console.error('❌ Failed to delete old logs:', error);
      return 0;
    }
  }

  /**
   * Get error statistics
   */
  static async getErrorStats(): Promise<{
    totalErrors: number;
    errorsByLevel: Record<string, number>;
    unresolvedErrors: number;
    recentErrors: number;
  }> {
    try {
      const { data: errors, error } = await supabase
        .from(this.ERROR_COLLECTION)
        .select('*');

      if (error) {
        throw error;
      }

      const allErrors = errors || [];
      const totalErrors = allErrors.length;

      // Count by level
      const errorsByLevel = allErrors.reduce(
        (acc, error) => {
          acc[error.level] = (acc[error.level] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Count unresolved
      const unresolvedErrors = allErrors.filter(
        error => !error.resolved
      ).length;

      // Count recent (last 24 hours)
      const oneDayAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      const recentErrors = allErrors.filter(
        error => error.context.timestamp >= oneDayAgo
      ).length;

      return {
        totalErrors,
        errorsByLevel,
        unresolvedErrors,
        recentErrors,
      };
    } catch (error) {
      console.error('❌ Failed to get error stats:', error);
      return {
        totalErrors: 0,
        errorsByLevel: {},
        unresolvedErrors: 0,
        recentErrors: 0,
      };
    }
  }

  /**
   * Get performance statistics
   */
  static async getPerformanceStats(): Promise<{
    totalOperations: number;
    averageDuration: number;
    successRate: number;
    slowestOperations: Array<{
      operation: string;
      duration: number;
      timestamp: string;
    }>;
  }> {
    try {
      const { data: logs, error } = await supabase
        .from(this.PERFORMANCE_COLLECTION)
        .select('*');

      if (error) {
        throw error;
      }

      const allLogs = logs || [];
      const totalOperations = allLogs.length;

      if (totalOperations === 0) {
        return {
          totalOperations: 0,
          averageDuration: 0,
          successRate: 0,
          slowestOperations: [],
        };
      }

      const averageDuration =
        allLogs.reduce((sum, log) => sum + log.duration, 0) / totalOperations;
      const successRate =
        (allLogs.filter(log => log.success).length / totalOperations) * 100;

      const slowestOperations = allLogs
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10)
        .map(log => ({
          operation: log.operation,
          duration: log.duration,
          timestamp: log.context.timestamp,
        }));

      return {
        totalOperations,
        averageDuration,
        successRate,
        slowestOperations,
      };
    } catch (error) {
      console.error('❌ Failed to get performance stats:', error);
      return {
        totalOperations: 0,
        averageDuration: 0,
        successRate: 0,
        slowestOperations: [],
      };
    }
  }
}
