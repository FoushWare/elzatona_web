import { db } from './firebase';
import {
  collection,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

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
  createdAt: string;
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
  private static readonly VERSIONS_COLLECTION = 'contentVersions';
  private static readonly AUDIT_LOGS_COLLECTION = 'auditLogs';

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
      createdAt: new Date().toISOString(),
      description,
      tags,
    };

    // Save version to Firestore
    await addDoc(collection(db, this.VERSIONS_COLLECTION), version);

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
    const versionsSnapshot = await getDocs(
      query(
        collection(db, this.VERSIONS_COLLECTION),
        where('contentId', '==', contentId),
        where('contentType', '==', contentType),
        orderBy('version', 'desc'),
        limit(limitCount)
      )
    );

    return versionsSnapshot.docs.map(doc => doc.data() as ContentVersion);
  }

  /**
   * Get a specific version
   */
  static async getContentVersion(
    versionId: string
  ): Promise<ContentVersion | null> {
    const versionSnapshot = await getDocs(
      query(
        collection(db, this.VERSIONS_COLLECTION),
        where('id', '==', versionId)
      )
    );

    if (versionSnapshot.empty) {
      return null;
    }

    return versionSnapshot.docs[0].data() as ContentVersion;
  }

  /**
   * Get the latest version for a content item
   */
  static async getLatestVersion(
    contentId: string,
    contentType: ContentVersion['contentType']
  ): Promise<ContentVersion | null> {
    const versionsSnapshot = await getDocs(
      query(
        collection(db, this.VERSIONS_COLLECTION),
        where('contentId', '==', contentId),
        where('contentType', '==', contentType),
        orderBy('version', 'desc'),
        limit(1)
      )
    );

    if (versionsSnapshot.empty) {
      return null;
    }

    return versionsSnapshot.docs[0].data() as ContentVersion;
  }

  /**
   * Restore content to a specific version
   */
  static async restoreContentVersion(
    versionId: string,
    restoredBy: string
  ): Promise<boolean> {
    try {
      const version = await this.getContentVersion(versionId);
      if (!version) {
        throw new Error('Version not found');
      }

      // Get the collection name for the content type
      const collectionName = this.getCollectionName(version.contentType);

      // Update the content with the version data
      const contentRef = doc(collection(db, collectionName), version.contentId);
      await updateDoc(contentRef, {
        ...version.data,
        updatedAt: new Date().toISOString(),
        updatedBy: restoredBy,
      });

      // Create audit log
      await this.createAuditLog({
        contentId: version.contentId,
        contentType: version.contentType,
        action: 'restore',
        changes: { restoredFromVersion: version.version },
        userId: restoredBy,
        timestamp: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error('Failed to restore content version:', error);
      return false;
    }
  }

  /**
   * Compare two versions
   */
  static async compareVersions(
    versionId1: string,
    versionId2: string
  ): Promise<VersionComparison | null> {
    const [version1, version2] = await Promise.all([
      this.getContentVersion(versionId1),
      this.getContentVersion(versionId2),
    ]);

    if (!version1 || !version2) {
      return null;
    }

    const differences = this.calculateDifferences(version1.data, version2.data);

    return {
      version1,
      version2,
      differences,
    };
  }

  /**
   * Get audit logs for a content item
   */
  static async getAuditLogs(
    contentId?: string,
    contentType?: string,
    limitCount: number = 100
  ): Promise<AuditLog[]> {
    let auditQuery = query(
      collection(db, this.AUDIT_LOGS_COLLECTION),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    if (contentId) {
      auditQuery = query(
        collection(db, this.AUDIT_LOGS_COLLECTION),
        where('contentId', '==', contentId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
    }

    if (contentType) {
      auditQuery = query(
        collection(db, this.AUDIT_LOGS_COLLECTION),
        where('contentType', '==', contentType),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
    }

    const auditSnapshot = await getDocs(auditQuery);
    return auditSnapshot.docs.map(doc => doc.data() as AuditLog);
  }

  /**
   * Get audit log statistics
   */
  static async getAuditLogStats(): Promise<{
    totalLogs: number;
    logsByAction: Record<string, number>;
    logsByContentType: Record<string, number>;
    recentActivity: AuditLog[];
  }> {
    const auditSnapshot = await getDocs(
      query(
        collection(db, this.AUDIT_LOGS_COLLECTION),
        orderBy('timestamp', 'desc'),
        limit(1000)
      )
    );

    const logs = auditSnapshot.docs.map(doc => doc.data() as AuditLog);

    const logsByAction: Record<string, number> = {};
    const logsByContentType: Record<string, number> = {};

    logs.forEach(log => {
      logsByAction[log.action] = (logsByAction[log.action] || 0) + 1;
      logsByContentType[log.contentType] =
        (logsByContentType[log.contentType] || 0) + 1;
    });

    return {
      totalLogs: logs.length,
      logsByAction,
      logsByContentType,
      recentActivity: logs.slice(0, 10),
    };
  }

  /**
   * Delete old versions (cleanup)
   */
  static async cleanupOldVersions(
    contentId: string,
    contentType: ContentVersion['contentType'],
    keepVersions: number = 10
  ): Promise<number> {
    const versions = await this.getContentVersions(
      contentId,
      contentType,
      1000
    );

    if (versions.length <= keepVersions) {
      return 0;
    }

    const versionsToDelete = versions.slice(keepVersions);
    const batch = writeBatch(db);

    versionsToDelete.forEach(version => {
      const versionRef = doc(
        collection(db, this.VERSIONS_COLLECTION),
        version.id
      );
      batch.delete(versionRef);
    });

    await batch.commit();
    return versionsToDelete.length;
  }

  /**
   * Create audit log entry
   */
  private static async createAuditLog(
    auditData: Omit<AuditLog, 'id'>
  ): Promise<void> {
    const auditLog: AuditLog = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...auditData,
    };

    await addDoc(collection(db, this.AUDIT_LOGS_COLLECTION), auditLog);
  }

  /**
   * Get collection name for content type
   */
  private static getCollectionName(
    contentType: ContentVersion['contentType']
  ): string {
    const collectionMap = {
      question: 'questions',
      category: 'categories',
      topic: 'topics',
      card: 'learningCards',
      plan: 'learningPlans',
    };
    return collectionMap[contentType];
  }

  /**
   * Calculate differences between two objects
   */
  private static calculateDifferences(
    obj1: Record<string, any>,
    obj2: Record<string, any>
  ): {
    field: string;
    version1Value: any;
    version2Value: any;
    changeType: 'added' | 'removed' | 'modified';
  }[] {
    const differences: any[] = [];
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    allKeys.forEach(key => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (value1 === undefined && value2 !== undefined) {
        differences.push({
          field: key,
          version1Value: undefined,
          version2Value: value2,
          changeType: 'added' as const,
        });
      } else if (value1 !== undefined && value2 === undefined) {
        differences.push({
          field: key,
          version1Value: value1,
          version2Value: undefined,
          changeType: 'removed' as const,
        });
      } else if (JSON.stringify(value1) !== JSON.stringify(value2)) {
        differences.push({
          field: key,
          version1Value: value1,
          version2Value: value2,
          changeType: 'modified' as const,
        });
      }
    });

    return differences;
  }

  /**
   * Generate version description from changes
   */
  static generateVersionDescription(
    changes: ContentVersion['changes']
  ): string {
    if (changes.length === 0) {
      return 'No changes detected';
    }

    const changeTypes = changes.map(change => {
      if (change.oldValue === undefined) {
        return `Added ${change.field}`;
      } else if (change.newValue === undefined) {
        return `Removed ${change.field}`;
      } else {
        return `Modified ${change.field}`;
      }
    });

    return changeTypes.join(', ');
  }
}
