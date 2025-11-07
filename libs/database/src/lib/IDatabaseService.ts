/* eslint-disable @typescript-eslint/no-explicit-any */
// Database Service Interface
// v1.0 - Abstraction for database operations supporting both Firebase and Supabase
// This file uses 'any' types for database filters which can have various structures

export interface IDatabaseService {
  // Basic CRUD operations
  get<T>(collection: string, id: string): Promise<T | null>;
  getAll<T>(collection: string, filters?: Record<string, any>): Promise<T[]>;
  add<T>(collection: string, data: Omit<T, 'id'>): Promise<T>;
  update<T>(collection: string, id: string, data: Partial<T>): Promise<T>;
  delete(collection: string, id: string): Promise<void>;

  // Query operations
  query<T>(collection: string, filters: Record<string, any>): Promise<T[]>;
  querySingle<T>(
    collection: string,
    filters: Record<string, any>
  ): Promise<T | null>;

  // Batch operations
  batchAdd<T>(collection: string, data: Omit<T, 'id'>[]): Promise<T[]>;
  batchUpdate<T>(
    collection: string,
    updates: Array<{ id: string; data: Partial<T> }>
  ): Promise<T[]>;
  batchDelete(collection: string, ids: string[]): Promise<void>;

  // Utility operations
  count(collection: string, filters?: Record<string, any>): Promise<number>;
  exists(collection: string, id: string): Promise<boolean>;

  // Transaction support (if available)
  transaction?<T>(
    callback: (service: IDatabaseService) => Promise<T>
  ): Promise<T>;
}

// Database configuration interface
export interface DatabaseConfig {
  url: string;
  key: string;
  serviceRoleKey?: string; // For Supabase admin operations
}

// Query options interface
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Database operation result interface
export interface DatabaseResult<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Batch operation result interface
export interface BatchResult<T> {
  data: T[];
  errors: string[];
  successCount: number;
  failureCount: number;
}
