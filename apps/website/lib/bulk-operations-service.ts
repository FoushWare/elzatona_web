import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface BulkOperation {
  id: string;
  type: "delete" | "edit" | "activate" | "deactivate";
  targetType: "questions" | "categories" | "topics" | "cards" | "plans";
  targetIds: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operationData?: Record<string, any>;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  totalItems: number;
  processedItems: number;
  errors: string[];
  created_at: string;
  completedAt?: string;
  createdBy: string;
}

export interface BulkOperationProgress {
  operationId: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  totalItems: number;
  processedItems: number;
  errors: string[];
  estimatedTimeRemaining?: number;
}

export class BulkOperationsService {
  private static readonly BATCH_SIZE = 500; // Supabase batch limit
  private static readonly COLLECTION_NAME = "bulk_operations";

  /**
   * Validate bulk operation parameters
   */
  static validateBulkOperation(
    type: BulkOperation["type"],
    targetType: BulkOperation["targetType"],
    targetIds: string[],
    operationData?: Record<string, unknown>,
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate type
    if (!["delete", "edit", "activate", "deactivate"].includes(type)) {
      errors.push("Invalid operation type");
    }

    // Validate target type
    if (
      !["questions", "categories", "topics", "cards", "plans"].includes(
        targetType,
      )
    ) {
      errors.push("Invalid target type");
    }

    // Validate target IDs
    if (!Array.isArray(targetIds) || targetIds.length === 0) {
      errors.push("Target IDs must be a non-empty array");
    }

    // Validate operation data for edit operations
    if (
      type === "edit" &&
      (!operationData || Object.keys(operationData).length === 0)
    ) {
      errors.push("Operation data is required for edit operations");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Create a new bulk operation
   */
  static async createBulkOperation(
    type: BulkOperation["type"],
    targetType: BulkOperation["targetType"],
    targetIds: string[],
    operationData?: Record<string, unknown>,
    createdBy: string = "admin",
  ): Promise<BulkOperation> {
    const operationId = `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const operation: BulkOperation = {
      id: operationId,
      type,
      targetType,
      targetIds,
      operationData,
      status: "pending",
      progress: 0,
      totalItems: targetIds.length,
      processedItems: 0,
      errors: [],
      created_at: new Date().toISOString(),
      createdBy,
    };

    // Save operation to Supabase
    await supabase.from(this.COLLECTION_NAME).insert(operation);

    // Start processing in background
    this.processBulkOperation(operationId).catch(console.error);

    return operation;
  }

  /**
   * Process a bulk operation
   */
  private static async processBulkOperation(
    operationId: string,
  ): Promise<void> {
    try {
      // Update status to running
      await supabase
        .from(this.COLLECTION_NAME)
        .update({
          status: "running",
          progress: 0,
        })
        .eq("id", operationId);

      // Get operation details
      const { data: operationData, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*")
        .eq("id", operationId)
        .single();

      if (error || !operationData) {
        throw new Error("Operation not found");
      }

      const operation = operationData as BulkOperation;

      // Process in batches
      const batches = this.createBatches(operation.targetIds, this.BATCH_SIZE);
      let processedItems = 0;

      for (const batch of batches) {
        try {
          await this.processBatch(operation, batch);
          processedItems += batch.length;

          // Update progress
          const progress = Math.round(
            (processedItems / operation.totalItems) * 100,
          );
          await supabase
            .from(this.COLLECTION_NAME)
            .update({
              progress,
              processedItems,
            })
            .eq("id", operationId);
        } catch (error) {
          console.error(`❌ Batch processing failed:`, error);
          await supabase
            .from(this.COLLECTION_NAME)
            .update({
              errors: [...operation.errors, `Batch failed: ${error}`],
            })
            .eq("id", operationId);
        }
      }

      // Mark as completed
      await supabase
        .from(this.COLLECTION_NAME)
        .update({
          status: "completed",
          progress: 100,
          completedAt: new Date().toISOString(),
        })
        .eq("id", operationId);

      console.log(`✅ Bulk operation completed: ${operationId}`);
    } catch (error) {
      console.error(`❌ Bulk operation failed: ${operationId}`, error);
      await supabase
        .from(this.COLLECTION_NAME)
        .update({
          status: "failed",
          errors: [error instanceof Error ? error.message : "Unknown error"],
        })
        .eq("id", operationId);
    }
  }

  /**
   * Process a batch of items
   */
  private static async processBatch(
    operation: BulkOperation,
    batch: string[],
  ): Promise<void> {
    const tableName = this.getTableName(operation.targetType);

    switch (operation.type) {
      case "delete":
        await supabase.from(tableName).delete().in("id", batch);
        break;

      case "edit":
        if (operation.operationData) {
          await supabase
            .from(tableName)
            .update(operation.operationData)
            .in("id", batch);
        }
        break;

      case "activate":
        await supabase
          .from(tableName)
          .update({ is_active: true })
          .in("id", batch);
        break;

      case "deactivate":
        await supabase
          .from(tableName)
          .update({ is_active: false })
          .in("id", batch);
        break;

      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }

  /**
   * Get table name for target type
   */
  private static getTableName(targetType: BulkOperation["targetType"]): string {
    const tableMap = {
      questions: "questions",
      categories: "categories",
      topics: "topics",
      cards: "learning_cards",
      plans: "learning_plans",
    };
    return tableMap[targetType];
  }

  /**
   * Create batches from array
   */
  private static createBatches<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * Get a specific operation by ID
   */
  static async getBulkOperation(
    operationId: string,
  ): Promise<BulkOperation | null> {
    try {
      const { data: operation, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*")
        .eq("id", operationId)
        .single();

      if (error || !operation) {
        return null;
      }

      return operation as BulkOperation;
    } catch (error) {
      console.error("❌ Failed to get bulk operation:", error);
      return null;
    }
  }

  /**
   * Get operation progress
   */
  static async getOperationProgress(
    operationId: string,
  ): Promise<BulkOperationProgress | null> {
    try {
      const { data: operation, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*")
        .eq("id", operationId)
        .single();

      if (error || !operation) {
        return null;
      }

      const estimatedTimeRemaining = this.calculateEstimatedTime(
        operation.processedItems,
        operation.totalItems,
        operation.created_at,
      );

      return {
        operationId: operation.id,
        status: operation.status,
        progress: operation.progress,
        totalItems: operation.totalItems,
        processedItems: operation.processedItems,
        errors: operation.errors,
        estimatedTimeRemaining,
      };
    } catch (error) {
      console.error("❌ Failed to get operation progress:", error);
      return null;
    }
  }

  /**
   * Calculate estimated time remaining
   */
  private static calculateEstimatedTime(
    processedItems: number,
    totalItems: number,
    startTime: string,
  ): number | undefined {
    if (processedItems === 0) return undefined;

    const elapsed = Date.now() - new Date(startTime).getTime();
    const rate = processedItems / elapsed; // items per millisecond
    const remaining = totalItems - processedItems;

    return Math.round(remaining / rate); // milliseconds
  }

  /**
   * Get bulk operation statistics
   */
  static async getBulkOperationStats(): Promise<{
    totalOperations: number;
    completedOperations: number;
    failedOperations: number;
    pendingOperations: number;
    runningOperations: number;
    averageProcessingTime: number;
    totalItemsProcessed: number;
  }> {
    try {
      const { data: operations, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*");

      if (error) {
        throw error;
      }

      const ops = operations || [];
      const totalOperations = ops.length;
      const completedOperations = ops.filter(
        (op) => op.status === "completed",
      ).length;
      const failedOperations = ops.filter(
        (op) => op.status === "failed",
      ).length;
      const pendingOperations = ops.filter(
        (op) => op.status === "pending",
      ).length;
      const runningOperations = ops.filter(
        (op) => op.status === "running",
      ).length;

      const totalItemsProcessed = ops.reduce(
        (sum, op) => sum + (op.processedItems || 0),
        0,
      );

      // Calculate average processing time for completed operations
      const completedOps = ops.filter(
        (op) => op.status === "completed" && op.completedAt,
      );
      const averageProcessingTime =
        completedOps.length > 0
          ? completedOps.reduce((sum, op) => {
              const startTime = new Date(op.created_at).getTime();
              const endTime = new Date(op.completedAt).getTime();
              return sum + (endTime - startTime);
            }, 0) / completedOps.length
          : 0;

      return {
        totalOperations,
        completedOperations,
        failedOperations,
        pendingOperations,
        runningOperations,
        averageProcessingTime,
        totalItemsProcessed,
      };
    } catch (error) {
      console.error("❌ Failed to get bulk operation stats:", error);
      return {
        totalOperations: 0,
        completedOperations: 0,
        failedOperations: 0,
        pendingOperations: 0,
        runningOperations: 0,
        averageProcessingTime: 0,
        totalItemsProcessed: 0,
      };
    }
  }

  /**
   * Get all operations with limit
   */
  static async getAllBulkOperations(
    limit: number = 50,
  ): Promise<BulkOperation[]> {
    try {
      const { data: operations, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return operations || [];
    } catch (error) {
      console.error("❌ Failed to get all bulk operations:", error);
      return [];
    }
  }

  /**
   * List all operations
   */
  static async listOperations(): Promise<BulkOperation[]> {
    try {
      const { data: operations, error } = await supabase
        .from(this.COLLECTION_NAME)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return operations || [];
    } catch (error) {
      console.error("❌ Failed to list operations:", error);
      return [];
    }
  }

  /**
   * Cancel a bulk operation (alias for cancelOperation)
   */
  static async cancelBulkOperation(operationId: string): Promise<boolean> {
    return this.cancelOperation(operationId);
  }

  /**
   * Cancel an operation
   */
  static async cancelOperation(operationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .update({ status: "failed" })
        .eq("id", operationId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error("❌ Failed to cancel operation:", error);
      return false;
    }
  }

  /**
   * Delete an operation
   */
  static async deleteOperation(operationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(this.COLLECTION_NAME)
        .delete()
        .eq("id", operationId);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error("❌ Failed to delete operation:", error);
      return false;
    }
  }
}
