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
} from 'firebase/firestore';

export interface BulkOperation {
  id: string;
  type: 'delete' | 'edit' | 'activate' | 'deactivate';
  targetType: 'questions' | 'categories' | 'topics' | 'cards' | 'plans';
  targetIds: string[];
  operationData?: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  totalItems: number;
  processedItems: number;
  errors: string[];
  createdAt: string;
  completedAt?: string;
  createdBy: string;
}

export interface BulkOperationProgress {
  operationId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  totalItems: number;
  processedItems: number;
  errors: string[];
  estimatedTimeRemaining?: number;
}

export class BulkOperationsService {
  private static readonly BATCH_SIZE = 500; // Firestore batch limit
  private static readonly COLLECTION_NAME = 'bulkOperations';

  /**
   * Create a new bulk operation
   */
  static async createBulkOperation(
    type: BulkOperation['type'],
    targetType: BulkOperation['targetType'],
    targetIds: string[],
    operationData?: Record<string, any>,
    createdBy: string = 'admin'
  ): Promise<BulkOperation> {
    const operationId = `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const operation: BulkOperation = {
      id: operationId,
      type,
      targetType,
      targetIds,
      operationData,
      status: 'pending',
      progress: 0,
      totalItems: targetIds.length,
      processedItems: 0,
      errors: [],
      createdAt: new Date().toISOString(),
      createdBy,
    };

    // Save operation to Firestore
    const operationRef = doc(collection(db, this.COLLECTION_NAME), operationId);
    await writeBatch(db).set(operationRef, operation).commit();

    // Start processing in background
    this.processBulkOperation(operationId).catch(console.error);

    return operation;
  }

  /**
   * Process a bulk operation
   */
  private static async processBulkOperation(
    operationId: string
  ): Promise<void> {
    const operationRef = doc(collection(db, this.COLLECTION_NAME), operationId);

    try {
      // Update status to running
      await writeBatch(db)
        .update(operationRef, {
          status: 'running',
          progress: 0,
        })
        .commit();

      // Get operation details
      const operationDoc = await getDocs(
        query(
          collection(db, this.COLLECTION_NAME),
          where('id', '==', operationId)
        )
      );
      if (operationDoc.empty) {
        throw new Error('Operation not found');
      }

      const operation = operationDoc.docs[0].data() as BulkOperation;

      // Process in batches
      const batches = this.chunkArray(operation.targetIds, this.BATCH_SIZE);
      let processedItems = 0;

      for (const batch of batches) {
        await this.processBatch(operation, batch);
        processedItems += batch.length;

        // Update progress
        const progress = Math.round(
          (processedItems / operation.totalItems) * 100
        );
        await writeBatch(db)
          .update(operationRef, {
            progress,
            processedItems,
          })
          .commit();
      }

      // Mark as completed
      await writeBatch(db)
        .update(operationRef, {
          status: 'completed',
          progress: 100,
          completedAt: new Date().toISOString(),
        })
        .commit();
    } catch (error) {
      console.error('Bulk operation failed:', error);
      await writeBatch(db)
        .update(operationRef, {
          status: 'failed',
          errors: [
            ...(operation?.errors || []),
            error instanceof Error ? error.message : 'Unknown error',
          ],
        })
        .commit();
    }
  }

  /**
   * Process a batch of items
   */
  private static async processBatch(
    operation: BulkOperation,
    batch: string[]
  ): Promise<void> {
    const batchWrite = writeBatch(db);
    const collectionName = this.getCollectionName(operation.targetType);

    for (const itemId of batch) {
      try {
        const itemRef = doc(collection(db, collectionName), itemId);

        switch (operation.type) {
          case 'delete':
            batchWrite.delete(itemRef);
            break;
          case 'edit':
            if (operation.operationData) {
              batchWrite.update(itemRef, {
                ...operation.operationData,
                updatedAt: new Date().toISOString(),
                updatedBy: operation.createdBy,
              });
            }
            break;
          case 'activate':
            batchWrite.update(itemRef, {
              isActive: true,
              updatedAt: new Date().toISOString(),
              updatedBy: operation.createdBy,
            });
            break;
          case 'deactivate':
            batchWrite.update(itemRef, {
              isActive: false,
              updatedAt: new Date().toISOString(),
              updatedBy: operation.createdBy,
            });
            break;
        }
      } catch (error) {
        operation.errors.push(
          `Failed to process ${itemId}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    await batchWrite.commit();
  }

  /**
   * Get collection name for target type
   */
  private static getCollectionName(
    targetType: BulkOperation['targetType']
  ): string {
    const collectionMap = {
      questions: 'questions',
      categories: 'categories',
      topics: 'topics',
      cards: 'learningCards',
      plans: 'learningPlans',
    };
    return collectionMap[targetType];
  }

  /**
   * Get bulk operation by ID
   */
  static async getBulkOperation(
    operationId: string
  ): Promise<BulkOperation | null> {
    const operationDoc = await getDocs(
      query(
        collection(db, this.COLLECTION_NAME),
        where('id', '==', operationId)
      )
    );
    if (operationDoc.empty) {
      return null;
    }
    return operationDoc.docs[0].data() as BulkOperation;
  }

  /**
   * Get all bulk operations
   */
  static async getAllBulkOperations(
    limitCount: number = 50
  ): Promise<BulkOperation[]> {
    const operationsSnapshot = await getDocs(
      query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
    );

    return operationsSnapshot.docs.map(doc => doc.data() as BulkOperation);
  }

  /**
   * Cancel a bulk operation
   */
  static async cancelBulkOperation(operationId: string): Promise<boolean> {
    const operationRef = doc(collection(db, this.COLLECTION_NAME), operationId);

    try {
      await writeBatch(db)
        .update(operationRef, {
          status: 'failed',
          errors: [
            ...((await this.getBulkOperation(operationId))?.errors || []),
            'Operation cancelled by user',
          ],
        })
        .commit();
      return true;
    } catch (error) {
      console.error('Failed to cancel operation:', error);
      return false;
    }
  }

  /**
   * Get bulk operation statistics
   */
  static async getBulkOperationStats(): Promise<{
    totalOperations: number;
    completedOperations: number;
    failedOperations: number;
    runningOperations: number;
    averageProcessingTime: number;
  }> {
    const operationsSnapshot = await getDocs(
      collection(db, this.COLLECTION_NAME)
    );
    const operations = operationsSnapshot.docs.map(
      doc => doc.data() as BulkOperation
    );

    const totalOperations = operations.length;
    const completedOperations = operations.filter(
      op => op.status === 'completed'
    ).length;
    const failedOperations = operations.filter(
      op => op.status === 'failed'
    ).length;
    const runningOperations = operations.filter(
      op => op.status === 'running'
    ).length;

    // Calculate average processing time
    const completedOps = operations.filter(
      op => op.status === 'completed' && op.completedAt
    );
    const averageProcessingTime =
      completedOps.length > 0
        ? completedOps.reduce((sum, op) => {
            const start = new Date(op.createdAt).getTime();
            const end = new Date(op.completedAt!).getTime();
            return sum + (end - start);
          }, 0) / completedOps.length
        : 0;

    return {
      totalOperations,
      completedOperations,
      failedOperations,
      runningOperations,
      averageProcessingTime,
    };
  }

  /**
   * Utility function to chunk array into smaller arrays
   */
  private static chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Validate bulk operation parameters
   */
  static validateBulkOperation(
    type: BulkOperation['type'],
    targetType: BulkOperation['targetType'],
    targetIds: string[],
    operationData?: Record<string, any>
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!targetIds || targetIds.length === 0) {
      errors.push('Target IDs cannot be empty');
    }

    if (targetIds && targetIds.length > 10000) {
      errors.push('Cannot process more than 10,000 items at once');
    }

    if (type === 'edit' && !operationData) {
      errors.push('Operation data is required for edit operations');
    }

    if (targetType === 'questions' && type === 'edit') {
      // Validate question-specific fields
      if (
        operationData?.difficulty &&
        !['beginner', 'intermediate', 'advanced'].includes(
          operationData.difficulty
        )
      ) {
        errors.push('Invalid difficulty level');
      }
      if (
        operationData?.type &&
        !['multiple-choice', 'open-ended', 'true-false', 'code'].includes(
          operationData.type
        )
      ) {
        errors.push('Invalid question type');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
