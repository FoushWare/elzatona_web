// Database library exports
// v1.0 - Multi-database support with Dependency Inversion Principle

// Core interfaces and types
export type {
  IDatabaseService,
  DatabaseConfig,
  QueryOptions,
  DatabaseResult,
  BatchResult,
} from './lib/IDatabaseService';

// Database service implementations
export { SupabaseDatabaseService } from './lib/SupabaseDatabaseService';

// Context and hooks
export {
  DatabaseProvider,
  useDatabase,
  useDatabaseService,
  createDatabaseService,
  DatabaseServiceFactory,
} from './lib/DatabaseContext';

// Configuration
export {
  getDatabaseConfig,
  getAppConfig,
  createDatabaseServiceFromEnv,
} from './lib/appConfig';

// Legacy exports for backward compatibility
export * from './lib/database';
