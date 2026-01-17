/**
 * Repository Factory
 * Creates and configures repository instances with dependency injection
 */

import {
  IQuestionRepository,
  IUserRepository,
  IPlanRepository,
  ILearningCardRepository,
} from "../repositories";

import {
  PostgreSQLConfig,
  PostgreSQLQuestionRepository,
  PostgreSQLUserRepository,
  PostgreSQLPlanRepository,
  PostgreSQLLearningCardRepository,
} from "../adapters/postgresql";

/**
 * Repository factory configuration
 */
export interface RepositoryFactoryConfig {
  database: {
    type: "postgresql" | "mongodb" | "mysql";
    url: string;
    key: string;
    serviceRoleKey?: string;
  };
}

/**
 * Repository factory for creating repository instances
 * Implements dependency injection pattern
 */
export class RepositoryFactory {
  private config: RepositoryFactoryConfig;
  private questionRepository?: IQuestionRepository;
  private userRepository?: IUserRepository;
  private planRepository?: IPlanRepository;
  private learningCardRepository?: ILearningCardRepository;

  constructor(config: RepositoryFactoryConfig) {
    this.config = config;
  }

  /**
   * Get or create Question Repository instance
   */
  getQuestionRepository(): IQuestionRepository {
    if (!this.questionRepository) {
      this.questionRepository = this.createQuestionRepository();
    }
    return this.questionRepository;
  }

  /**
   * Get or create User Repository instance
   */
  getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      this.userRepository = this.createUserRepository();
    }
    return this.userRepository;
  }

  /**
   * Get or create Plan Repository instance
   */
  getPlanRepository(): IPlanRepository {
    if (!this.planRepository) {
      this.planRepository = this.createPlanRepository();
    }
    return this.planRepository;
  }

  /**
   * Get or create Learning Card Repository instance
   */
  getLearningCardRepository(): ILearningCardRepository {
    if (!this.learningCardRepository) {
      this.learningCardRepository = this.createLearningCardRepository();
    }
    return this.learningCardRepository;
  }

  /**
   * Reset all repository instances (useful for testing)
   */
  reset(): void {
    this.questionRepository = undefined;
    this.userRepository = undefined;
    this.planRepository = undefined;
    this.learningCardRepository = undefined;
  }

  // ============================================
  // PRIVATE FACTORY METHODS
  // ============================================

  private createQuestionRepository(): IQuestionRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLQuestionRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(
          `Unsupported database type: ${this.config.database.type}`,
        );
    }
  }

  private createUserRepository(): IUserRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLUserRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(
          `Unsupported database type: ${this.config.database.type}`,
        );
    }
  }

  private createPlanRepository(): IPlanRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLPlanRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(
          `Unsupported database type: ${this.config.database.type}`,
        );
    }
  }

  private createLearningCardRepository(): ILearningCardRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLLearningCardRepository(this.getPostgreSQLConfig());
      case "mongodb":
        throw new Error("MongoDB adapter not yet implemented");
      case "mysql":
        throw new Error("MySQL adapter not yet implemented");
      default:
        throw new Error(
          `Unsupported database type: ${this.config.database.type}`,
        );
    }
  }

  private getPostgreSQLConfig(): PostgreSQLConfig {
    return {
      url: this.config.database.url,
      key: this.config.database.key,
      serviceRoleKey: this.config.database.serviceRoleKey,
    };
  }
}

/**
 * Create repository factory from environment variables
 */
export function createRepositoryFactoryFromEnv(): RepositoryFactory {
  const config: RepositoryFactoryConfig = {
    database: {
      type: "postgresql", // Currently only PostgreSQL is supported
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  };

  if (!config.database.url || !config.database.key) {
    throw new Error(
      "Database configuration missing. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.",
    );
  }

  return new RepositoryFactory(config);
}

// Singleton instance for application-wide use
let factoryInstance: RepositoryFactory | null = null;

/**
 * Get singleton repository factory instance
 */
export function getRepositoryFactory(): RepositoryFactory {
  if (!factoryInstance) {
    factoryInstance = createRepositoryFactoryFromEnv();
  }
  return factoryInstance;
}

/**
 * Reset singleton instance (useful for testing)
 */
export function resetRepositoryFactory(): void {
  if (factoryInstance) {
    factoryInstance.reset();
  }
  factoryInstance = null;
}
