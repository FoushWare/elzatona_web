import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface BackupData {
  id: string;
  name: string;
  description: string;
  collections: {
    [collectionName: string]: any[];
  };
  metadata: {
    created_at: Date;
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
    'learning_cards',
    'learning_plans',
    'frontend_tasks',
    'problem_solving_tasks',
    'learning_paths',
    'audit_logs',
    'admin_credentials',
    'users',
    'notifications',
    'error_logs',
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
          created_at: new Date(),
          createdBy,
          version: '1.0',
          totalDocuments: 0,
          collectionsCount: 0,
        },
        status: 'in_progress',
      };

      await supabase.from('backups').insert({
        id: backupId,
        ...backupData,
        metadata: {
          ...backupData.metadata,
          created_at: new Date().toISOString(),
        },
      });

      // Backup each collection
      const collections: { [key: string]: any[] } = {};
      let totalDocuments = 0;

      for (const collectionName of this.COLLECTIONS_TO_BACKUP) {
        try {
          const { data: documents, error } = await supabase
            .from(collectionName)
            .select('*');

          if (error) {
            throw error;
          }

          collections[collectionName] = documents || [];
          totalDocuments += (documents || []).length;

          console.log(
            `✅ Backed up ${(documents || []).length} documents from ${collectionName}`
          );
        } catch (error) {
          console.error(
            `❌ Failed to backup collection ${collectionName}:`,
            error
          );
          collections[collectionName] = [];
        }
      }

      // Update backup record with final data
      await supabase
        .from('backups')
        .update({
          collections,
          metadata: {
            ...backupData.metadata,
            totalDocuments,
            collectionsCount: Object.keys(collections).length,
            created_at: new Date().toISOString(),
          },
          status: 'completed',
        })
        .eq('id', backupId);

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
      const { data: backupDoc, error: backupError } = await supabase
        .from('backups')
        .select('*')
        .eq('id', backupId)
        .single();

      if (backupError || !backupDoc) {
        return { success: false, error: 'Backup not found' };
      }

      const backupData = backupDoc as BackupData;
      if (backupData.status !== 'completed') {
        return { success: false, error: 'Backup is not completed' };
      }

      const summary = {
        collectionsRestored: 0,
        documentsRestored: 0,
        documentsSkipped: 0,
        errors: [] as string[],
      };

      const BATCH_SIZE = 100;
      let batchCount = 0;

      // Restore each collection
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
          if (options.dryRun) {
            console.log(
              `🔍 Dry run: Would restore ${documents.length} documents to ${collectionName}`
            );
            summary.documentsRestored += documents.length;
            summary.collectionsRestored++;
            continue;
          }

          for (const document of documents) {
            const docId = document.id;

            if (options.overwriteExisting) {
              await supabase.from(collectionName).upsert(document);
            } else {
              // Check if document exists
              const { data: existingDoc } = await supabase
                .from(collectionName)
                .select('id')
                .eq('id', docId)
                .single();

              if (!existingDoc) {
                await supabase.from(collectionName).insert(document);
              } else {
                summary.documentsSkipped++;
                continue;
              }
            }

            batchCount++;
            summary.documentsRestored++;

            // Commit batch if it reaches the limit
            if (batchCount >= BATCH_SIZE) {
              // Batch operations completed
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
        // Batch operations completed
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
      const { data: backups, error } = await supabase
        .from('backups')
        .select('*')
        .order('metadata.created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (backups || []).map(backup => ({ id: backup.id, ...backup }));
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
      const { error } = await supabase
        .from('backups')
        .delete()
        .eq('id', backupId);

      if (error) {
        throw error;
      }

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
    lastBackupDate?: string;
  }> {
    try {
      const { data: backups, error } = await supabase
        .from('backups')
        .select('*');

      if (error) {
        throw error;
      }

      const totalBackups = (backups || []).length;
      const totalSize = (backups || []).reduce((size, backup) => {
        return size + JSON.stringify(backup).length;
      }, 0);

      const lastBackup = (backups || []).sort(
        (a, b) =>
          new Date(b.metadata.created_at).getTime() -
          new Date(a.metadata.created_at).getTime()
      )[0];

      return {
        totalBackups,
        totalSize,
        lastBackupDate: lastBackup?.metadata.created_at,
      };
    } catch (error) {
      console.error('❌ Failed to get backup stats:', error);
      return {
        totalBackups: 0,
        totalSize: 0,
      };
    }
  }
}
