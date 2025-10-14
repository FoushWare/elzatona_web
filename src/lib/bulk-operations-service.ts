/**
 * Bulk Operations Service
 * Handles bulk operations for content management including bulk delete and bulk edit
 */

import { db } from '@/lib/firebase';
import {
  collection,
  writeBatch,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export interface BulkOperationResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: string[];
  message: string;
}

export interface BulkDeleteRequest {
  type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
  ids: string[];
}

export interface BulkEditRequest {
  type: 'cards' | 'plans' | 'categories' | 'topics' | 'questions';
  ids: string[];
  updates: Record<string, any>;
}

export interface BulkOperationProgress {
  total: number;
  processed: number;
  current: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

class BulkOperationsService {
  /**
   * Perform bulk delete operation
   */
  async bulkDelete(request: BulkDeleteRequest): Promise<BulkOperationResult> {
    const { type, ids } = request;
    const result: BulkOperationResult = {
      success: false,
      processed: 0,
      failed: 0,
      errors: [],
      message: '',
    };

    try {
      if (ids.length === 0) {
        result.message = 'No items selected for deletion';
        return result;
      }

      // Validate IDs exist
      const collectionRef = collection(db, type);
      const batch = writeBatch(db);

      for (const id of ids) {
        try {
          const docRef = doc(collectionRef, id);
          batch.delete(docRef);
          result.processed++;
        } catch (error) {
          result.failed++;
          result.errors.push(`Failed to delete ${id}: ${error}`);
        }
      }

      if (result.processed > 0) {
        await batch.commit();
        result.success = true;
        result.message = `Successfully deleted ${result.processed} ${type}`;
      } else {
        result.message = 'No items were deleted';
      }
    } catch (error) {
      result.success = false;
      result.message = `Bulk delete failed: ${error}`;
      result.errors.push(error as string);
    }

    return result;
  }

  /**
   * Perform bulk edit operation
   */
  async bulkEdit(request: BulkEditRequest): Promise<BulkOperationResult> {
    const { type, ids, updates } = request;
    const result: BulkOperationResult = {
      success: false,
      processed: 0,
      failed: 0,
      errors: [],
      message: '',
    };

    try {
      if (ids.length === 0) {
        result.message = 'No items selected for editing';
        return result;
      }

      if (Object.keys(updates).length === 0) {
        result.message = 'No updates provided';
        return result;
      }

      // Validate updates based on type
      const validationResult = this.validateUpdates(type, updates);
      if (!validationResult.valid) {
        result.message = validationResult.message;
        return result;
      }

      const collectionRef = collection(db, type);
      const batch = writeBatch(db);

      for (const id of ids) {
        try {
          const docRef = doc(collectionRef, id);
          batch.update(docRef, updates);
          result.processed++;
        } catch (error) {
          result.failed++;
          result.errors.push(`Failed to update ${id}: ${error}`);
        }
      }

      if (result.processed > 0) {
        await batch.commit();
        result.success = true;
        result.message = `Successfully updated ${result.processed} ${type}`;
      } else {
        result.message = 'No items were updated';
      }
    } catch (error) {
      result.success = false;
      result.message = `Bulk edit failed: ${error}`;
      result.errors.push(error as string);
    }

    return result;
  }

  /**
   * Validate updates based on content type
   */
  private validateUpdates(
    type: string,
    updates: Record<string, any>
  ): { valid: boolean; message: string } {
    const allowedFields: Record<string, string[]> = {
      cards: ['name', 'description', 'color', 'icon', 'order'],
      plans: ['name', 'description', 'duration', 'difficulty', 'order'],
      categories: ['name', 'description', 'color', 'order'],
      topics: ['name', 'description', 'difficulty', 'order'],
      questions: [
        'title',
        'content',
        'difficulty',
        'category',
        'topic',
        'sampleAnswers',
      ],
    };

    const fields = allowedFields[type] || [];
    const invalidFields = Object.keys(updates).filter(
      field => !fields.includes(field)
    );

    if (invalidFields.length > 0) {
      return {
        valid: false,
        message: `Invalid fields for ${type}: ${invalidFields.join(', ')}`,
      };
    }

    return { valid: true, message: '' };
  }

  /**
   * Get bulk operation progress (for future real-time updates)
   */
  async getBulkOperationProgress(
    operationId: string
  ): Promise<BulkOperationProgress> {
    // This would be implemented with real-time updates in a production system
    // For now, return a mock progress
    return {
      total: 0,
      processed: 0,
      current: '',
      status: 'pending',
    };
  }

  /**
   * Cancel bulk operation (for future implementation)
   */
  async cancelBulkOperation(operationId: string): Promise<boolean> {
    // This would be implemented with real-time updates in a production system
    return false;
  }
}

export const bulkOperationsService = new BulkOperationsService();
