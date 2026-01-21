// Database library exports
// v2.0 - Multi-database support with Repository Pattern and Dependency Inversion Principle

// ============================================
// REPOSITORY PATTERN (NEW)
// ============================================

// Repository types and interfaces
export * from "./repositories";
export * from "./repositories/RepositoryFactory";
export { createRepositoryFactoryFromEnv } from "./repositories/RepositoryFactory";

// PostgreSQL adapters
export * from "./adapters";

// ============================================
// LEGACY DATABASE SERVICE (DEPRECATED)
// ============================================

// Core interfaces and types
export type {
  IDatabaseService,
  DatabaseConfig,
  LegacyQueryOptions,
  DatabaseResult,
  BatchResult,
} from "./lib/IDatabaseService";

// Database service implementations
export { SupabaseDatabaseService } from "./lib/SupabaseDatabaseService";

// Context and hooks
export {
  DatabaseProvider,
  useDatabase,
  useDatabaseService,
  createDatabaseService,
  DatabaseServiceFactory,
} from "./lib/DatabaseContext";

// Configuration
export {
  getDatabaseConfig,
  getAppConfig,
  createDatabaseServiceFromEnv,
} from "./lib/appConfig";

// Legacy exports for backward compatibility
export * from "./lib/database";
