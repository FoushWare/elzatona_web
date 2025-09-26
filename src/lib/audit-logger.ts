// Audit Logger Utility
// v1.0 - Centralized audit logging for all admin actions

import { AuditLogService } from './audit-log-schema';

export interface LogActionParams {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'LOGIN' | 'LOGOUT' | 'EXPORT' | 'IMPORT';
  resource: 'TOPIC' | 'CATEGORY' | 'QUESTION' | 'SECTION' | 'LEARNING_PATH' | 'USER' | 'SYSTEM';
  resourceId?: string;
  resourceName?: string;
  details: string;
  changes?: Record<string, any>;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export class AuditLogger {
  // Log a successful action
  static async logSuccess(params: LogActionParams): Promise<void> {
    try {
      // Clean up undefined values to prevent Firebase errors
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );
      
      await AuditLogService.logAction({
        ...cleanParams,
        success: true
      });
    } catch (error) {
      console.error('Failed to log audit action:', error);
    }
  }

  // Log a failed action
  static async logError(params: LogActionParams & { errorMessage: string }): Promise<void> {
    try {
      // Clean up undefined values to prevent Firebase errors
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );
      
      await AuditLogService.logAction({
        ...cleanParams,
        success: false
      });
    } catch (error) {
      console.error('Failed to log audit action:', error);
    }
  }

  // Log topic actions
  static async logTopicAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    topicId: string,
    topicName: string,
    details: string,
    changes?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'TOPIC',
      resourceId: topicId,
      resourceName: topicName,
      details,
      changes,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Log category actions
  static async logCategoryAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    categoryId: string,
    categoryName: string,
    details: string,
    changes?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'CATEGORY',
      resourceId: categoryId,
      resourceName: categoryName,
      details,
      changes,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Log question actions
  static async logQuestionAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    questionId: string,
    questionTitle: string,
    details: string,
    changes?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'QUESTION',
      resourceId: questionId,
      resourceName: questionTitle,
      details,
      changes,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Log section actions
  static async logSectionAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    sectionId: string,
    sectionName: string,
    details: string,
    changes?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'SECTION',
      resourceId: sectionId,
      resourceName: sectionName,
      details,
      changes,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Log learning path actions
  static async logLearningPathAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    pathId: string,
    pathName: string,
    details: string,
    changes?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'LEARNING_PATH',
      resourceId: pathId,
      resourceName: pathName,
      details,
      changes,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Log user actions
  static async logUserAction(
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'LOGIN' | 'LOGOUT',
    userId: string,
    userEmail: string,
    details: string,
    changes?: Record<string, any>
  ): Promise<void> {
    await this.logSuccess({
      action,
      resource: 'USER',
      resourceId: userId,
      resourceName: userEmail,
      details,
      changes,
      userId,
      userEmail,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    });
  }

  // Log system actions
  static async logSystemAction(
    action: 'EXPORT' | 'IMPORT' | 'VIEW',
    details: string,
    metadata?: Record<string, any>,
    userId?: string,
    userEmail?: string
  ): Promise<void> {
    const logData: any = {
      action,
      resource: 'SYSTEM',
      details,
      metadata,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent()
    };

    // Only add user info if provided
    if (userId) logData.userId = userId;
    if (userEmail) logData.userEmail = userEmail;

    await this.logSuccess(logData);
  }

  // Get client IP address (simplified)
  private static getClientIP(): string {
    if (typeof window !== 'undefined') {
      // Client-side: we can't get real IP, so use a placeholder
      return 'client-side';
    }
    // Server-side: this would be passed from the request
    return 'server-side';
  }

  // Get user agent
  private static getUserAgent(): string {
    if (typeof window !== 'undefined') {
      return navigator.userAgent;
    }
    return 'server-side';
  }
}
