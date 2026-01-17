/**
 * Common types for Repository Pattern
 * Shared types used across all repository interfaces
 */

/**
 * Query options for filtering and pagination
 */
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * Paginated result wrapper
 */
export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Error types for repository operations
 */
export enum RepositoryErrorType {
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DUPLICATE_ERROR = "DUPLICATE_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  PERMISSION_ERROR = "PERMISSION_ERROR",
}

/**
 * Repository operation error
 */
export class RepositoryError extends Error {
  constructor(
    public readonly type: RepositoryErrorType,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "RepositoryError";
  }
}

/**
 * Statistics base interface
 */
export interface Statistics {
  total: number;
  lastUpdated: Date;
}
