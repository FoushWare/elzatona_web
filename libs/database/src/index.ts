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
// NOTE: `DatabaseContext` exports (React context and hooks) are intentionally
// not re-exported from the package root to avoid importing client-only React
// code into server modules (Next.js app routes). Consumers that need the
// provider/hooks should import them explicitly from the library client entry
// (or directly from `./lib/DatabaseContext`) in client components only.

// Configuration
export {
  getDatabaseConfig,
  getAppConfig,
  createDatabaseServiceFromEnv,
} from "./lib/appConfig";

// Legacy exports for backward compatibility
export * from "./lib/database";
