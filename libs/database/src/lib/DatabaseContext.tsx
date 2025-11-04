// Database Context for Dependency Injection
// v1.0 - React context for database service injection

import React, { createContext, useContext, ReactNode } from 'react';
import { IDatabaseService, DatabaseConfig } from './IDatabaseService';
import { SupabaseDatabaseService } from './SupabaseDatabaseService';

// Type-safe environment variable access
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (typeof window !== 'undefined') {
    return (window as any).env?.[key] || defaultValue;
  }
  return (process as any).env?.[key] || defaultValue;
};

// Database context type
interface DatabaseContextType {
  database: IDatabaseService;
  config: DatabaseConfig;
  isFirebase: boolean;
  isSupabase: boolean;
}

// Create the context
const DatabaseContext = createContext<DatabaseContextType | null>(null);

// Database provider props
interface DatabaseProviderProps {
  children: ReactNode;
  config?: DatabaseConfig;
  useFirebase?: boolean;
}

// Database provider component
export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
  config,
  useFirebase = false,
}) => {
  // Default configuration
  const defaultConfig: DatabaseConfig = config || {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    key: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  };

  // Determine which database to use
  const shouldUseFirebase =
    useFirebase || getEnvVar('NEXT_PUBLIC_USE_FIREBASE') === 'true';

  // Create the appropriate database service
  // For now, we'll use Supabase as fallback since Firebase isn't installed
  const database: IDatabaseService = shouldUseFirebase
    ? (() => {
        console.warn('Firebase not available, using Supabase instead');
        return new SupabaseDatabaseService(defaultConfig);
      })()
    : new SupabaseDatabaseService(defaultConfig);

  const contextValue: DatabaseContextType = {
    database,
    config: defaultConfig,
    isFirebase: false, // Always false for now since Firebase isn't available
    isSupabase: true, // Always true for now
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Hook to use the database context
export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }

  return context;
};

// Hook to get just the database service
export const useDatabaseService = (): IDatabaseService => {
  const { database } = useDatabase();
  return database;
};

// Utility function to create database service directly
export const createDatabaseService = (
  config: DatabaseConfig,
  useFirebase = false
): IDatabaseService => {
  if (useFirebase) {
    console.warn('Firebase not available, using Supabase instead');
    return new SupabaseDatabaseService(config);
  }
  return new SupabaseDatabaseService(config);
};

// Database service factory
export class DatabaseServiceFactory {
  static create(
    config?: DatabaseConfig,
    useFirebase = false
  ): IDatabaseService {
    const defaultConfig: DatabaseConfig = config || {
      url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
      key: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
      serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
    };
    return createDatabaseService(defaultConfig, useFirebase);
  }

  static createFirebase(config: DatabaseConfig): IDatabaseService {
    console.warn('Firebase not available, using Supabase instead');
    return new SupabaseDatabaseService(config);
  }

  static createSupabase(config: DatabaseConfig): IDatabaseService {
    return new SupabaseDatabaseService(config);
  }
}
