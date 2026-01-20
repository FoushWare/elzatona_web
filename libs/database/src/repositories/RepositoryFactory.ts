/**
 * Repository Factory
 * Creates and configures repository instances with dependency injection
 */






import {
  IQuestionRepository,
  IUserRepository,
  IPlanRepository,
  ILearningCardRepository,
  ICategoryRepository,
  ITopicRepository,
  ISectionRepository,
  IFlashcardRepository,
  IProgressRepository,
} from "../repositories";





import {
  PostgreSQLConfig,
  PostgreSQLQuestionRepository,
  PostgreSQLUserRepository,
  PostgreSQLPlanRepository,
  PostgreSQLLearningCardRepository,
  PostgreSQLCategoryRepository,
  PostgreSQLTopicRepository,
  PostgreSQLSectionRepository,
  PostgreSQLFlashcardRepository,
  PostgreSQLProgressRepository,
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
  private categoryRepository?: ICategoryRepository;
  private topicRepository?: ITopicRepository;
  private sectionRepository?: ISectionRepository;
  private flashcardRepository?: IFlashcardRepository;
  private progressRepository?: IProgressRepository;
        /**
         * Get or create Progress Repository instance
         */
        getProgressRepository(): IProgressRepository {
          if (!this.progressRepository) {
            this.progressRepository = this.createProgressRepository();
          }
          return this.progressRepository;
        }
        private createProgressRepository(): IProgressRepository {
          switch (this.config.database.type) {
            case "postgresql":
              return new PostgreSQLProgressRepository(this.getPostgreSQLConfig());
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
      /**
       * Get or create Flashcard Repository instance
       */
      getFlashcardRepository(): IFlashcardRepository {
        if (!this.flashcardRepository) {
          this.flashcardRepository = this.createFlashcardRepository();
        }
        return this.flashcardRepository;
      }
      private createFlashcardRepository(): IFlashcardRepository {
        switch (this.config.database.type) {
          case "postgresql":
            return new PostgreSQLFlashcardRepository(this.getPostgreSQLConfig());
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
    /**
     * Get or create Section Repository instance
     */
    getSectionRepository(): ISectionRepository {
      if (!this.sectionRepository) {
        this.sectionRepository = this.createSectionRepository();
      }
      return this.sectionRepository;
    }
    private createSectionRepository(): ISectionRepository {
      switch (this.config.database.type) {
        case "postgresql":
          return new PostgreSQLSectionRepository(this.getPostgreSQLConfig());
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
  /**
   * Get or create Topic Repository instance
   */
  getTopicRepository(): ITopicRepository {
    if (!this.topicRepository) {
      this.topicRepository = this.createTopicRepository();
    }
    return this.topicRepository;
  }
  private createTopicRepository(): ITopicRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLTopicRepository(this.getPostgreSQLConfig());
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
   * Get or create Category Repository instance
   */
  getCategoryRepository(): ICategoryRepository {
    if (!this.categoryRepository) {
      this.categoryRepository = this.createCategoryRepository();
    }
    return this.categoryRepository;
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

  private createCategoryRepository(): ICategoryRepository {
    switch (this.config.database.type) {
      case "postgresql":
        return new PostgreSQLCategoryRepository(this.getPostgreSQLConfig());
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

  // Allow database type to be toggled via env variable (default: 'postgresql')
  const dbType = (process.env.DATABASE_TYPE || "postgresql").toLowerCase() as "postgresql" | "mongodb" | "mysql";
  const config: RepositoryFactoryConfig = {
    database: {
      type: dbType,
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
