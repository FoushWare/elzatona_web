/**
 * Content Versioning Service
 * Handles versioning and audit trails for all content types
 */

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export interface ContentVersion {
  id: string;
  contentId: string;
  contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
  version: number;
  data: Record<string, any>;
  changes: ContentChange[];
  createdAt: Timestamp;
  createdBy: string;
  reason?: string;
  isActive: boolean;
}

export interface ContentChange {
  field: string;
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'modified' | 'removed';
}

export interface AuditLog {
  id: string;
  contentId: string;
  contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
  action: 'create' | 'update' | 'delete' | 'restore';
  userId: string;
  userEmail: string;
  timestamp: Timestamp;
  changes: ContentChange[];
  metadata: {
    userAgent?: string;
    ipAddress?: string;
    reason?: string;
  };
}

export interface VersionComparison {
  field: string;
  oldValue: any;
  newValue: any;
  hasChanged: boolean;
}

class ContentVersioningService {
  private readonly VERSIONS_COLLECTION = 'content_versions';
  private readonly AUDIT_LOGS_COLLECTION = 'audit_logs';

  /**
   * Create a new version of content
   */
  async createVersion(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    data: Record<string, any>,
    userId: string,
    reason?: string
  ): Promise<string> {
    try {
      // Get the latest version number
      const latestVersion = await this.getLatestVersion(contentId, contentType);
      const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1;

      // Calculate changes if this is an update
      const changes: ContentChange[] = [];
      if (latestVersion) {
        changes.push(...this.calculateChanges(latestVersion.data, data));
      } else {
        // First version - all fields are additions
        Object.entries(data).forEach(([field, value]) => {
          changes.push({
            field,
            oldValue: null,
            newValue: value,
            changeType: 'added',
          });
        });
      }

      // Deactivate previous versions
      if (latestVersion) {
        await this.deactivateVersions(contentId, contentType);
      }

      // Create new version
      const versionData: Omit<ContentVersion, 'id'> = {
        contentId,
        contentType,
        version: newVersionNumber,
        data: { ...data },
        changes,
        createdAt: serverTimestamp() as Timestamp,
        createdBy: userId,
        reason,
        isActive: true,
      };

      const docRef = await addDoc(
        collection(db, this.VERSIONS_COLLECTION),
        versionData
      );

      // Create audit log
      await this.createAuditLog({
        contentId,
        contentType,
        action: latestVersion ? 'update' : 'create',
        userId,
        userEmail: '', // Will be populated by the API
        timestamp: serverTimestamp() as Timestamp,
        changes,
        metadata: { reason },
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating content version:', error);
      throw new Error(`Failed to create version: ${error}`);
    }
  }

  /**
   * Get version history for content
   */
  async getVersionHistory(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    limitCount: number = 10
  ): Promise<ContentVersion[]> {
    try {
      const q = query(
        collection(db, this.VERSIONS_COLLECTION),
        where('contentId', '==', contentId),
        where('contentType', '==', contentType),
        orderBy('version', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as ContentVersion
      );
    } catch (error) {
      console.error('Error getting version history:', error);
      throw new Error(`Failed to get version history: ${error}`);
    }
  }

  /**
   * Get a specific version
   */
  async getVersion(versionId: string): Promise<ContentVersion | null> {
    try {
      const docRef = doc(db, this.VERSIONS_COLLECTION, versionId);
      const snapshot = await getDocs(
        query(
          collection(db, this.VERSIONS_COLLECTION),
          where('__name__', '==', versionId)
        )
      );

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      } as ContentVersion;
    } catch (error) {
      console.error('Error getting version:', error);
      throw new Error(`Failed to get version: ${error}`);
    }
  }

  /**
   * Restore content to a specific version
   */
  async restoreToVersion(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    versionId: string,
    userId: string
  ): Promise<void> {
    try {
      const version = await this.getVersion(versionId);
      if (!version) {
        throw new Error('Version not found');
      }

      if (
        version.contentId !== contentId ||
        version.contentType !== contentType
      ) {
        throw new Error('Version does not match content');
      }

      // Create a new version with the restored data
      await this.createVersion(
        contentId,
        contentType,
        version.data,
        userId,
        `Restored from version ${version.version}`
      );

      // Create audit log for restore action
      await this.createAuditLog({
        contentId,
        contentType,
        action: 'restore',
        userId,
        userEmail: '',
        timestamp: serverTimestamp() as Timestamp,
        changes: [
          {
            field: 'restore',
            oldValue: null,
            newValue: `Version ${version.version}`,
            changeType: 'added',
          },
        ],
        metadata: { reason: `Restored from version ${version.version}` },
      });
    } catch (error) {
      console.error('Error restoring version:', error);
      throw new Error(`Failed to restore version: ${error}`);
    }
  }

  /**
   * Compare two versions
   */
  async compareVersions(
    versionId1: string,
    versionId2: string
  ): Promise<VersionComparison[]> {
    try {
      const [version1, version2] = await Promise.all([
        this.getVersion(versionId1),
        this.getVersion(versionId2),
      ]);

      if (!version1 || !version2) {
        throw new Error('One or both versions not found');
      }

      const allFields = new Set([
        ...Object.keys(version1.data),
        ...Object.keys(version2.data),
      ]);

      const comparisons: VersionComparison[] = [];

      for (const field of allFields) {
        const oldValue = version1.data[field];
        const newValue = version2.data[field];
        const hasChanged =
          JSON.stringify(oldValue) !== JSON.stringify(newValue);

        comparisons.push({
          field,
          oldValue,
          newValue,
          hasChanged,
        });
      }

      return comparisons;
    } catch (error) {
      console.error('Error comparing versions:', error);
      throw new Error(`Failed to compare versions: ${error}`);
    }
  }

  /**
   * Get audit logs for content
   */
  async getAuditLogs(
    contentId?: string,
    contentType?: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    limitCount: number = 50
  ): Promise<AuditLog[]> {
    try {
      let q = query(
        collection(db, this.AUDIT_LOGS_COLLECTION),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      if (contentId) {
        q = query(q, where('contentId', '==', contentId));
      }

      if (contentType) {
        q = query(q, where('contentType', '==', contentType));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        doc =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as AuditLog
      );
    } catch (error) {
      console.error('Error getting audit logs:', error);
      throw new Error(`Failed to get audit logs: ${error}`);
    }
  }

  /**
   * Delete old versions (cleanup)
   */
  async cleanupOldVersions(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions',
    keepVersions: number = 10
  ): Promise<void> {
    try {
      const versions = await this.getVersionHistory(
        contentId,
        contentType,
        100
      );
      const versionsToDelete = versions.slice(keepVersions);

      for (const version of versionsToDelete) {
        await deleteDoc(doc(db, this.VERSIONS_COLLECTION, version.id));
      }
    } catch (error) {
      console.error('Error cleaning up old versions:', error);
      throw new Error(`Failed to cleanup old versions: ${error}`);
    }
  }

  /**
   * Private helper methods
   */
  private async getLatestVersion(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions'
  ): Promise<ContentVersion | null> {
    const q = query(
      collection(db, this.VERSIONS_COLLECTION),
      where('contentId', '==', contentId),
      where('contentType', '==', contentType),
      orderBy('version', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as ContentVersion;
  }

  private async deactivateVersions(
    contentId: string,
    contentType: 'cards' | 'plans' | 'categories' | 'topics' | 'questions'
  ): Promise<void> {
    const q = query(
      collection(db, this.VERSIONS_COLLECTION),
      where('contentId', '==', contentId),
      where('contentType', '==', contentType),
      where('isActive', '==', true)
    );

    const snapshot = await getDocs(q);
    const batch = snapshot.docs.map(doc =>
      updateDoc(doc.ref, { isActive: false })
    );

    await Promise.all(batch);
  }

  private calculateChanges(
    oldData: Record<string, any>,
    newData: Record<string, any>
  ): ContentChange[] {
    const changes: ContentChange[] = [];
    const allFields = new Set([
      ...Object.keys(oldData),
      ...Object.keys(newData),
    ]);

    for (const field of allFields) {
      const oldValue = oldData[field];
      const newValue = newData[field];

      if (oldValue === undefined && newValue !== undefined) {
        changes.push({
          field,
          oldValue: null,
          newValue,
          changeType: 'added',
        });
      } else if (oldValue !== undefined && newValue === undefined) {
        changes.push({
          field,
          oldValue,
          newValue: null,
          changeType: 'removed',
        });
      } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changes.push({
          field,
          oldValue,
          newValue,
          changeType: 'modified',
        });
      }
    }

    return changes;
  }

  private async createAuditLog(auditData: Omit<AuditLog, 'id'>): Promise<void> {
    await addDoc(collection(db, this.AUDIT_LOGS_COLLECTION), auditData);
  }
}

export const contentVersioningService = new ContentVersioningService();
