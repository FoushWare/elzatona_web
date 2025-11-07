/* eslint-disable @typescript-eslint/no-explicit-any */
// This file uses 'any' types for content versioning data which can be of various content types
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface ContentVersion {
  id: string;
  contentId: string;
  contentType: 'question' | 'category' | 'topic' | 'card' | 'plan';
  version: number;
  data: Record<string, any>;
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  createdBy: string;
  created_at: string;
  description?: string;
  tags?: string[];
}

export interface VersionComparison {
  version1: ContentVersion;
  version2: ContentVersion;
  differences: {
    field: string;
    version1Value: any;
    version2Value: any;
    changeType: 'added' | 'removed' | 'modified';
  }[];
}

export interface AuditLog {
  id: string;
  contentId: string;
  contentType: string;
  action: 'create' | 'update' | 'delete' | 'restore';
  changes?: Record<string, any>;
  userId: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export class ContentVersioningService {
  private static readonly VERSIONS_COLLECTION = 'content_versions';
  private static readonly AUDIT_LOGS_COLLECTION = 'audit_logs';

  /**
   * Create a new content version
   */
  static async createContentVersion(
    contentId: string,
    contentType: ContentVersion['contentType'],
    data: Record<string, any>,
    changes: ContentVersion['changes'],
    createdBy: string,
    description?: string,
    tags?: string[]
  ): Promise<ContentVersion> {
    // Get the latest version number
    const latestVersion = await this.getLatestVersion(contentId, contentType);
    const versionNumber = latestVersion ? latestVersion.version + 1 : 1;

    const version: ContentVersion = {
      id: `${contentType}_${contentId}_v${versionNumber}`,
      contentId,
      contentType,
      version: versionNumber,
      data,
      changes,
      createdBy,
      created_at: new Date().toISOString(),
      description,
      tags,
    };

    // Save version to Supabase
    await supabase.from(this.VERSIONS_COLLECTION).insert(version);

    // Create audit log
    await this.createAuditLog({
      contentId,
      contentType,
      action: 'create',
      changes: { version: versionNumber, changes },
      userId: createdBy,
      timestamp: new Date().toISOString(),
    });

    return version;
  }

  /**
   * Get all versions for a specific content item
   */
  static async getContentVersions(
    contentId: string,
    contentType: ContentVersion['contentType'],
    limitCount: number = 50
  ): Promise<ContentVersion[]> {
    try {
      const { data: versions, error } = await supabase
        .from(this.VERSIONS_COLLECTION)
        .select('*')
        .eq('contentId', contentId)
        .eq('contentType', contentType)
        .order('version', { ascending: false })
        .limit(limitCount);

      if (error) {
        throw error;
      }

      return versions || [];
    } catch (error) {
      console.error('❌ Failed to get content versions:', error);
      return [];
    }
  }

  /**
   * Get the latest version of a content item
   */
  static async getLatestVersion(
    contentId: string,
    contentType: ContentVersion['contentType']
  ): Promise<ContentVersion | null> {
    try {
      const { data: version, error } = await supabase
        .from(this.VERSIONS_COLLECTION)
        .select('*')
        .eq('contentId', contentId)
        .eq('contentType', contentType)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return version || null;
    } catch (error) {
      console.error('❌ Failed to get latest version:', error);
      return null;
    }
  }

  /**
   * Get a specific version by ID
   */
  static async getVersionById(
    versionId: string
  ): Promise<ContentVersion | null> {
    try {
      const { data: version, error } = await supabase
        .from(this.VERSIONS_COLLECTION)
        .select('*')
        .eq('id', versionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return version || null;
    } catch (error) {
      console.error('❌ Failed to get version by ID:', error);
      return null;
    }
  }

  /**
   * Compare two versions
   */
  static compareVersions(
    version1: ContentVersion,
    version2: ContentVersion
  ): VersionComparison {
    const differences: VersionComparison['differences'] = [];

    // Compare all fields in version1.data
    for (const [field, value1] of Object.entries(version1.data)) {
      const value2 = version2.data[field];

      if (value1 !== value2) {
        differences.push({
          field,
          version1Value: value1,
          version2Value: value2,
          changeType: value2 === undefined ? 'removed' : 'modified',
        });
      }
    }

    // Check for fields added in version2
    for (const [field, value2] of Object.entries(version2.data)) {
      if (!(field in version1.data)) {
        differences.push({
          field,
          version1Value: undefined,
          version2Value: value2,
          changeType: 'added',
        });
      }
    }

    return {
      version1,
      version2,
      differences,
    };
  }

  /**
   * Restore content to a specific version
   */
  static async restoreToVersion(
    versionId: string,
    restoredBy: string
  ): Promise<boolean> {
    try {
      const version = await this.getVersionById(versionId);
      if (!version) {
        throw new Error('Version not found');
      }

      // Update the content in the main table
      const tableName = this.getTableName(version.contentType);
      const { error: updateError } = await supabase
        .from(tableName)
        .update(version.data)
        .eq('id', version.contentId);

      if (updateError) {
        throw updateError;
      }

      // Create audit log
      await this.createAuditLog({
        contentId: version.contentId,
        contentType: version.contentType,
        action: 'restore',
        changes: { restoredToVersion: version.version },
        userId: restoredBy,
        timestamp: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error('❌ Failed to restore version:', error);
      return false;
    }
  }

  /**
   * Delete a specific version
   */
  static async deleteVersion(versionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.VERSIONS_COLLECTION)
        .delete()
        .eq('id', versionId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('❌ Failed to delete version:', error);
      return false;
    }
  }

  /**
   * Get audit logs for a content item
   */
  static async getAuditLogs(
    contentId: string,
    contentType: string,
    limitCount: number = 50
  ): Promise<AuditLog[]> {
    try {
      const { data: logs, error } = await supabase
        .from(this.AUDIT_LOGS_COLLECTION)
        .select('*')
        .eq('contentId', contentId)
        .eq('contentType', contentType)
        .order('timestamp', { ascending: false })
        .limit(limitCount);

      if (error) {
        throw error;
      }

      return logs || [];
    } catch (error) {
      console.error('❌ Failed to get audit logs:', error);
      return [];
    }
  }

  /**
   * Create an audit log entry
   */
  private static async createAuditLog(
    logData: Omit<AuditLog, 'id'>
  ): Promise<void> {
    try {
      const auditLog: AuditLog = {
        id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...logData,
      };

      await supabase.from(this.AUDIT_LOGS_COLLECTION).insert(auditLog);
    } catch (error) {
      console.error('❌ Failed to create audit log:', error);
    }
  }

  /**
   * Get table name for content type
   */
  private static getTableName(
    contentType: ContentVersion['contentType']
  ): string {
    const tableMap = {
      question: 'questions',
      category: 'categories',
      topic: 'topics',
      card: 'learning_cards',
      plan: 'learning_plans',
    };
    return tableMap[contentType];
  }

  /**
   * Get audit log statistics
   */
  static async getAuditLogStats(): Promise<{
    totalLogs: number;
    logsByAction: Record<string, number>;
    logsByContentType: Record<string, number>;
    recentActivity: number;
  }> {
    try {
      const { data: logs, error } = await supabase
        .from(this.AUDIT_LOGS_COLLECTION)
        .select('*');

      if (error) {
        throw error;
      }

      const allLogs = logs || [];
      const totalLogs = allLogs.length;

      // Count by action
      const logsByAction = allLogs.reduce(
        (acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Count by content type
      const logsByContentType = allLogs.reduce(
        (acc, log) => {
          acc[log.contentType] = (acc[log.contentType] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      // Count recent activity (last 24 hours)
      const oneDayAgo = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      const recentActivity = allLogs.filter(
        log => log.timestamp >= oneDayAgo
      ).length;

      return {
        totalLogs,
        logsByAction,
        logsByContentType,
        recentActivity,
      };
    } catch (error) {
      console.error('❌ Failed to get audit log stats:', error);
      return {
        totalLogs: 0,
        logsByAction: {},
        logsByContentType: {},
        recentActivity: 0,
      };
    }
  }
}
