/**
 * PostgreSQL User Repository Adapter
 * Implements IUserRepository using Supabase PostgreSQL
 */

import {
  IUserRepository,
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserProgress,
  UserPreferences,
  UserStatistics,
  QueryOptions,
  PaginatedResult,
} from "../../repositories";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

const TABLE_NAME = "users";
const PROGRESS_TABLE = "user_progress";
const PREFERENCES_TABLE = "user_preferences";

/**
 * PostgreSQL implementation of User Repository
 */
export class PostgreSQLUserRepository
  extends BasePostgreSQLAdapter
  implements IUserRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  // ============================================
  // CREATE OPERATIONS
  // ============================================

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const dbData = this.toSnakeCase({
        ...user,
        isActive: true,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.create");
    }
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  async findById(id: string): Promise<User | null> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.findById");
    }
  }

    async findAdminByEmail(email: string): Promise<User | null> {
      try {
        const { data, error } = await this.client
          .from(TABLE_NAME)
          .select("*")
          .eq("email", email)
          .eq("role", "admin")
          .single();

        if (error) {
          if (error.code === "PGRST116") return null;
          throw error;
        }

        return this.mapToUser(data);
      } catch (error) {
        this.handleError(error, "PostgreSQLUserRepository.findAdminByEmail");
      }
    }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.findByEmail");
    }
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<User>> {
    try {
      let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToUser(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.findAll");
    }
  }

  async findByRole(
    role: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<User>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("role", role);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToUser(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.findByRole");
    }
  }

  async search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<User>> {
    try {
      let dbQuery = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .or(
          `email.ilike.%${query}%,display_name.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`,
        );

      dbQuery = this.applyPagination(dbQuery, options);

      const { data, error, count } = await dbQuery;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToUser(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.search");
    }
  }

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      const dbData = this.toSnakeCase({
        ...data,
        updatedAt: new Date(),
      });

      const { data: result, error } = await this.client
        .from(TABLE_NAME)
        .update(dbData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return this.mapToUser(result);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.update");
    }
  }

  async updateProgress(userId: string, progress: UserProgress): Promise<void> {
    try {
      const dbData = this.toSnakeCase({
        ...progress,
        updatedAt: new Date(),
      });

      const { error } = await this.client
        .from(PROGRESS_TABLE)
        .upsert(dbData, { onConflict: "user_id" });

      if (error) throw error;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.updateProgress");
    }
  }

  async updatePreferences(
    userId: string,
    preferences: UserPreferences,
  ): Promise<void> {
    try {
      const dbData = this.toSnakeCase({
        ...preferences,
        updatedAt: new Date(),
      });

      const { error } = await this.client
        .from(PREFERENCES_TABLE)
        .upsert(dbData, { onConflict: "user_id" });

      if (error) throw error;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.updatePreferences");
    }
  }

  async updateLastLogin(userId: string): Promise<User> {
    try {
      return await this.update(userId, {
        // lastLoginAt: new Date(),
      });
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.updateLastLogin");
    }
  }

  async verifyEmail(userId: string): Promise<User> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({
          email_verified: true,
          updated_at: new Date(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.verifyEmail");
    }
  }

  async deactivate(userId: string): Promise<User> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({
          is_active: false,
          updated_at: new Date(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.deactivate");
    }
  }

  async activate(userId: string): Promise<User> {
    try {
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({
          is_active: true,
          updated_at: new Date(),
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return this.mapToUser(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.activate");
    }
  }

  // ============================================
  // DELETE OPERATIONS
  // ============================================

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.client
        .from(TABLE_NAME)
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.delete");
    }
  }

  // ============================================
  // PROGRESS AND PREFERENCES OPERATIONS
  // ============================================

  async getProgress(userId: string): Promise<UserProgress> {
    try {
      const { data, error } = await this.client
        .from(PROGRESS_TABLE)
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Return default progress if not found
          return {
            userId,
            totalQuestionsAttempted: 0,
            totalQuestionsCorrect: 0,
            totalPoints: 0,
            currentStreak: 0,
            longestStreak: 0,
            completedPlans: [],
            inProgressPlans: [],
            masteredTopics: [],
            weakTopics: [],
            lastActivityAt: new Date(),
          };
        }
        throw error;
      }

      const mapped = this.toCamelCase(data);
      return {
        ...mapped,
        lastActivityAt: new Date(data.last_activity_at),
      } as UserProgress;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.getProgress");
    }
  }

  async getPreferences(userId: string): Promise<UserPreferences> {
    try {
      const { data, error } = await this.client
        .from(PREFERENCES_TABLE)
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Return default preferences if not found
          return {
            userId,
            theme: "system",
            language: "en",
            emailNotifications: true,
            pushNotifications: false,
            difficulty: "mixed",
          };
        }
        throw error;
      }

      return this.toCamelCase(data) as UserPreferences;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.getPreferences");
    }
  }

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  async getUserStatistics(userId: string): Promise<UserStatistics> {
    try {
      const progress = await this.getProgress(userId);

      // Calculate success rate
      const successRate =
        progress.totalQuestionsAttempted > 0
          ? (progress.totalQuestionsCorrect /
              progress.totalQuestionsAttempted) *
            100
          : 0;

      return {
        userId,
        totalQuestionsAttempted: progress.totalQuestionsAttempted,
        totalQuestionsCorrect: progress.totalQuestionsCorrect,
        successRate,
        totalPoints: progress.totalPoints,
        currentStreak: progress.currentStreak,
        longestStreak: progress.longestStreak,
        plansCompleted: progress.completedPlans.length,
        plansInProgress: progress.inProgressPlans.length,
        topicsExplored:
          progress.masteredTopics.length + progress.weakTopics.length,
        topicsMastered: progress.masteredTopics.length,
        averageSessionDuration: 0, // TODO: Calculate from activity logs
        totalTimeSpent: 0, // TODO: Calculate from activity logs
        lastActivityAt: progress.lastActivityAt,
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.getUserStatistics");
    }
  }

  async count(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true });

      if (error) throw error;

      return count || 0;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.count");
    }
  }

  async countActive(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      if (error) throw error;

      return count || 0;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.countActive");
    }
  }

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  async exists(id: string): Promise<boolean> {
    try {
      const user = await this.findById(id);
      return user !== null;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.exists");
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const user = await this.findByEmail(email);
      return user !== null;
    } catch (error) {
      this.handleError(error, "PostgreSQLUserRepository.emailExists");
    }
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  private mapToUser(data: any): User {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      lastLoginAt: data.last_login_at
        ? new Date(data.last_login_at)
        : undefined,
    } as User;
  }
}
