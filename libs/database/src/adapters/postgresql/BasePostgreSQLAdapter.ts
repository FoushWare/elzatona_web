/**
 * Base PostgreSQL Adapter
 * Provides common functionality for all PostgreSQL repository adapters
 */

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import {
  RepositoryError,
  RepositoryErrorType,
  QueryOptions,
  PaginationMeta,
} from "../../repositories/types/index";

/**
 * Configuration for PostgreSQL adapter
 */
export interface PostgreSQLConfig {
  url: string;
  key: string;
  serviceRoleKey?: string;
}

/**
 * Base adapter class with common database operations
 */
export abstract class BasePostgreSQLAdapter {
  protected client: SupabaseClient;
  protected serviceRoleClient?: SupabaseClient;

  constructor(config: PostgreSQLConfig) {
    const isBuildPhase =
      process.env.NEXT_PHASE?.includes("build") ||
      process.env.NODE_ENV === "production";

    const supabaseUrl = config.url || "https://placeholder-url.supabase.co";
    const supabaseKey = config.key || "placeholder-key";

    // Validate config only if not in build phase or if in production runtime
    if (!config.url || !config.key) {
      if (
        !isBuildPhase ||
        (process.env.NODE_ENV === "production" &&
          !process.env.NEXT_PHASE?.includes("build"))
      ) {
        console.warn(
          "⚠️ Missing Supabase configuration in PostgreSQL Adapter. Operations will fail.",
        );
      }
    }

    this.client = createClient(supabaseUrl, supabaseKey);

    if (config.serviceRoleKey || isBuildPhase) {
      this.serviceRoleClient = createClient(
        supabaseUrl,
        config.serviceRoleKey || "placeholder-key",
      );
    }
  }

  /**
   * Get the appropriate client based on admin privileges needed
   */
  protected getClient(useServiceRole = false): SupabaseClient {
    return useServiceRole && this.serviceRoleClient
      ? this.serviceRoleClient
      : this.client;
  }

  /**
   * Handle database errors and convert to RepositoryError
   */
  protected handleError(error: unknown, context: string): never {
    console.error(`${context}:`, error);

    if (error instanceof Error) {
      // Check for specific Supabase/PostgreSQL errors
      const errorMessage = error.message.toLowerCase();

      if (
        errorMessage.includes("duplicate") ||
        errorMessage.includes("unique")
      ) {
        throw new RepositoryError(
          RepositoryErrorType.DUPLICATE_ERROR,
          error.message,
          error,
        );
      }

      if (
        errorMessage.includes("not found") ||
        errorMessage.includes("pgrst116")
      ) {
        throw new RepositoryError(
          RepositoryErrorType.NOT_FOUND,
          error.message,
          error,
        );
      }

      if (
        errorMessage.includes("permission") ||
        errorMessage.includes("forbidden")
      ) {
        throw new RepositoryError(
          RepositoryErrorType.PERMISSION_ERROR,
          error.message,
          error,
        );
      }
    }

    throw new RepositoryError(
      RepositoryErrorType.DATABASE_ERROR,
      "An unexpected database error occurred",
      error,
    );
  }

  /**
   * Apply pagination options to a query
   */
  protected applyPagination<T>(query: T, options?: QueryOptions): T {
    let paginatedQuery = query as any;

    if (options?.limit) {
      paginatedQuery = paginatedQuery.limit(options.limit);
    }

    if (options?.offset) {
      paginatedQuery = paginatedQuery.range(
        options.offset,
        options.offset + (options.limit || 10) - 1,
      );
    }

    if (options?.orderBy) {
      const direction = options.orderDirection || "asc";
      paginatedQuery = paginatedQuery.order(options.orderBy, {
        ascending: direction === "asc",
      });
    }

    return paginatedQuery;
  }

  /**
   * Create pagination metadata
   */
  protected createPaginationMeta(
    total: number,
    options?: QueryOptions,
  ): PaginationMeta {
    const limit = options?.limit || 10;
    const offset = options?.offset || 0;

    return {
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Map database timestamps to Date objects
   */
  protected mapTimestamps<T extends Record<string, any>>(data: T): T {
    const mapped: any = { ...data };

    if (mapped.created_at) {
      mapped.createdAt = new Date(mapped.created_at);
      delete mapped.created_at;
    }

    if (mapped.updated_at) {
      mapped.updatedAt = new Date(mapped.updated_at);
      delete mapped.updated_at;
    }

    return mapped as T;
  }

  /**
   * Map camelCase to snake_case for database columns
   */
  protected toSnakeCase(obj: Record<string, any>): Record<string, any> {
    const snakeCased: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`,
      );
      snakeCased[snakeKey] = value;
    }

    return snakeCased;
  }

  /**
   * Map snake_case to camelCase from database results
   */
  protected toCamelCase(obj: Record<string, any>): Record<string, any> {
    const camelCased: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      camelCased[camelKey] = value;
    }

    return camelCased;
  }
}
