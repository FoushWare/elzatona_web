import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';

export interface BackupData {
  id: string;
  name: string;
  description: string;
  collections: {
    [collectionName: string]: any[];
  };
  metadata: {
    createdAt: Date;
    createdBy: string;
    version: string;
    totalDocuments: number;
    collectionsCount: number;
  };
  status: 'completed' | 'failed' | 'in_progress';
  error?: string;
}

export interface RestoreOptions {
  overwriteExisting: boolean;
  collections?: string[];
  dryRun?: boolean;
}

export class BackupService {
  private static readonly BACKUP_COLLECTION = 'backups';
  private static readonly COLLECTIONS_TO_BACKUP = [
    'questions',
    'categories',
    'topics',
    'learningCards',
    'learningPlans',
    'frontendTasks',
    'problemSolvingTasks',
    'learningPaths',
    'auditLogs',
    'adminCredentials',
    'users',
    'notifications',
    'errorLogs',
  ];

  /**
   * Create a full backup of all collections
   */
  static async createBackup(
    name: string,
    description: string,
    createdBy: string
  ): Promise<{ success: boolean; backupId?: string; error?: string }> {
    try {
      const backupId = `backup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create backup record
      const backupData: Omit<BackupData, 'id'> = {
        name,
        description,
        collections: {},
        metadata: {
          createdAt: new Date(),
          createdBy,
          version: '1.0',
          totalDocuments: 0,
          collectionsCount: 0,
        },
        status: 'in_progress',
      };

      await setDoc(doc(db, this.BACKUP_COLLECTION, backupId), {
        ...backupData,
        metadata: {
          ...backupData.metadata,
          createdAt: serverTimestamp(),
        },
      });

      // Backup each collection
      const collections: { [key: string]: any[] } = {};
      let totalDocuments = 0;

      for (const collectionName of this.COLLECTIONS_TO_BACKUP) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          collections[collectionName] = documents;
          totalDocuments += documents.length;

          console.log(
            `✅ Backed up ${documents.length} documents from ${collectionName}`
          );
        } catch (error) {
          console.error(
            `❌ Failed to backup collection ${collectionName}:`,
            error
          );
          collections[collectionName] = [];
        }
      }

      // Update backup with data
      await setDoc(
        doc(db, this.BACKUP_COLLECTION, backupId),
        {
          ...backupData,
          collections,
          metadata: {
            ...backupData.metadata,
            totalDocuments,
            collectionsCount: Object.keys(collections).length,
          },
          status: 'completed',
        },
        { merge: true }
      );

      console.log(`✅ Backup completed: ${backupId}`);
      return { success: true, backupId };
    } catch (error) {
      console.error('❌ Backup failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Backup failed',
      };
    }
  }

  /**
   * Restore data from a backup
   */
  static async restoreBackup(
    backupId: string,
    options: RestoreOptions = { overwriteExisting: false, dryRun: false }
  ): Promise<{ success: boolean; error?: string; summary?: any }> {
    try {
      // Get backup data
      const backupDoc = await getDocs(
        doc(db, this.BACKUP_COLLECTION, backupId)
      );
      if (!backupDoc.exists()) {
        return { success: false, error: 'Backup not found' };
      }

      const backupData = backupDoc.data() as BackupData;
      if (backupData.status !== 'completed') {
        return { success: false, error: 'Backup is not completed' };
      }

      const summary = {
        collectionsRestored: 0,
        documentsRestored: 0,
        documentsSkipped: 0,
        errors: [] as string[],
      };

      if (options.dryRun) {
        // Dry run - just count what would be restored
        for (const [collectionName, documents] of Object.entries(
          backupData.collections
        )) {
          if (
            options.collections &&
            !options.collections.includes(collectionName)
          ) {
            continue;
          }

          summary.collectionsRestored++;
          summary.documentsRestored += documents.length;
        }

        return { success: true, summary };
      }

      // Actual restore
      const batch = writeBatch(db);
      let batchCount = 0;
      const BATCH_SIZE = 500; // Firestore batch limit

      for (const [collectionName, documents] of Object.entries(
        backupData.collections
      )) {
        if (
          options.collections &&
          !options.collections.includes(collectionName)
        ) {
          continue;
        }

        try {
          for (const document of documents) {
            const docRef = doc(db, collectionName, document.id);

            if (options.overwriteExisting) {
              batch.set(docRef, document);
            } else {
              // Check if document exists
              const existingDoc = await getDocs(docRef);
              if (!existingDoc.exists()) {
                batch.set(docRef, document);
              } else {
                summary.documentsSkipped++;
                continue;
              }
            }

            batchCount++;
            summary.documentsRestored++;

            // Commit batch if it reaches the limit
            if (batchCount >= BATCH_SIZE) {
              await batch.commit();
              batchCount = 0;
            }
          }

          summary.collectionsRestored++;
          console.log(
            `✅ Restored ${documents.length} documents to ${collectionName}`
          );
        } catch (error) {
          const errorMsg = `Failed to restore collection ${collectionName}: ${error}`;
          summary.errors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }

      // Commit remaining batch
      if (batchCount > 0) {
        await batch.commit();
      }

      console.log(
        `✅ Restore completed: ${summary.documentsRestored} documents restored`
      );
      return { success: true, summary };
    } catch (error) {
      console.error('❌ Restore failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Restore failed',
      };
    }
  }

  /**
   * List all available backups
   */
  static async listBackups(): Promise<BackupData[]> {
    try {
      const snapshot = await getDocs(collection(db, this.BACKUP_COLLECTION));
      const backups: BackupData[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        backups.push({
          id: doc.id,
          ...data,
          metadata: {
            ...data.metadata,
            createdAt: data.metadata?.createdAt?.toDate() || new Date(),
          },
        } as BackupData);
      });

      return backups.sort(
        (a, b) =>
          b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime()
      );
    } catch (error) {
      console.error('❌ Failed to list backups:', error);
      return [];
    }
  }

  /**
   * Delete a backup
   */
  static async deleteBackup(
    backupId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, this.BACKUP_COLLECTION, backupId));
      console.log(`✅ Backup deleted: ${backupId}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to delete backup:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delete failed',
      };
    }
  }

  /**
   * Get backup statistics
   */
  static async getBackupStats(): Promise<{
    totalBackups: number;
    totalSize: number;
    lastBackup?: Date;
    collectionsCount: number;
  }> {
    try {
      const backups = await this.listBackups();
      const totalBackups = backups.length;
      const totalSize = backups.reduce(
        (sum, backup) => sum + backup.metadata.totalDocuments,
        0
      );
      const lastBackup =
        backups.length > 0 ? backups[0].metadata.createdAt : undefined;
      const collectionsCount = this.COLLECTIONS_TO_BACKUP.length;

      return {
        totalBackups,
        totalSize,
        lastBackup,
        collectionsCount,
      };
    } catch (error) {
      console.error('❌ Failed to get backup stats:', error);
      return {
        totalBackups: 0,
        totalSize: 0,
        collectionsCount: this.COLLECTIONS_TO_BACKUP.length,
      };
    }
  }

  /**
   * Schedule automatic backups
   */
  static async scheduleBackup(
    schedule: 'daily' | 'weekly' | 'monthly',
    createdBy: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // This would integrate with a cron job service or cloud scheduler
      // For now, we'll just create a scheduled backup record
      const scheduleId = `schedule_${Date.now()}`;

      await setDoc(doc(db, 'backupSchedules', scheduleId), {
        schedule,
        createdBy,
        createdAt: serverTimestamp(),
        isActive: true,
        lastRun: null,
        nextRun: this.calculateNextRun(schedule),
      });

      console.log(`✅ Backup schedule created: ${schedule}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Failed to schedule backup:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Schedule failed',
      };
    }
  }

  /**
   * Calculate next run time for scheduled backups
   */
  private static calculateNextRun(
    schedule: 'daily' | 'weekly' | 'monthly'
  ): Date {
    const now = new Date();

    switch (schedule) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  }
}
