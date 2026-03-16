/**
 * PostgreSQL Plan Repository Adapter
 * Implements IPlanRepository using Supabase PostgreSQL
 */

import {
  IPlanRepository,
  Plan,
  CreatePlanDTO,
  UpdatePlanDTO,
  PlanEnrollment,
  PlanStatistics,
  QueryOptions,
  PaginatedResult,
  PlanStatus,
} from "../../repositories/types/index";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

const TABLE_NAME = "plan_cards";
const ENROLLMENT_TABLE = "plan_enrollments";

/**
 * PostgreSQL implementation of Plan Repository
 */
export class PostgreSQLPlanRepository
  extends BasePostgreSQLAdapter
  implements IPlanRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  // ============================================
  // CREATE OPERATIONS
  // ============================================

  async create(plan: CreatePlanDTO): Promise<Plan> {
    try {
      const dbData = this.toSnakeCase({
        ...plan,
        status: plan.status || PlanStatus.DRAFT,
        isPublic: plan.isPublic ?? true,
        enrollmentCount: 0,
        completionCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return this.mapToPlan(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.create");
    }
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  async findById(id: string): Promise<Plan | null> {
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

      return this.mapToPlan(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.findById");
    }
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Plan>> {
    try {
      let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToPlan(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.findAll");
    }
  }

  async findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Plan>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("category_id", categoryId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToPlan(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.findByCategory");
    }
  }

  async findByAuthor(
    authorId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Plan>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("author_id", authorId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToPlan(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.findByAuthor");
    }
  }

  async findPublished(options?: QueryOptions): Promise<PaginatedResult<Plan>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("status", PlanStatus.PUBLISHED);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToPlan(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.findPublished");
    }
  }

  async search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Plan>> {
    try {
      let dbQuery = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

      dbQuery = this.applyPagination(dbQuery, options);

      const { data, error, count } = await dbQuery;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToPlan(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.search");
    }
  }

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  async update(id: string, data: UpdatePlanDTO): Promise<Plan> {
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

      return this.mapToPlan(result);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.update");
    }
  }

  async publish(id: string): Promise<Plan> {
    try {
      return await this.update(id, { status: PlanStatus.PUBLISHED });
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.publish");
    }
  }

  async archive(id: string): Promise<Plan> {
    try {
      return await this.update(id, { status: PlanStatus.ARCHIVED });
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.archive");
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
      this.handleError(error, "PostgreSQLPlanRepository.delete");
    }
  }

  // ============================================
  // ENROLLMENT OPERATIONS
  // ============================================

  async enrollUser(planId: string, userId: string): Promise<PlanEnrollment> {
    try {
      // Check if already enrolled
      const existing = await this.getUserEnrollment(planId, userId);
      if (existing) {
        throw new Error("User is already enrolled in this plan");
      }

      const dbData = this.toSnakeCase({
        planId,
        userId,
        enrolledAt: new Date(),
        progress: 0,
        currentStep: 0,
        totalSteps: 0, // TODO: Get from plan details
        lastAccessedAt: new Date(),
        isActive: true,
      });

      const { data, error } = await this.client
        .from(ENROLLMENT_TABLE)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      // Increment enrollment count
      await this.client
        .from(TABLE_NAME)
        .update({ enrollment_count: this.client.rpc("increment", { x: 1 }) })
        .eq("id", planId);

      return this.mapToEnrollment(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.enrollUser");
    }
  }

  async unenrollUser(planId: string, userId: string): Promise<void> {
    try {
      const { error } = await this.client
        .from(ENROLLMENT_TABLE)
        .delete()
        .eq("plan_id", planId)
        .eq("user_id", userId);

      if (error) throw error;

      // Decrement enrollment count
      await this.client
        .from(TABLE_NAME)
        .update({ enrollment_count: this.client.rpc("decrement", { x: 1 }) })
        .eq("id", planId);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.unenrollUser");
    }
  }

  async getUserEnrollment(
    planId: string,
    userId: string,
  ): Promise<PlanEnrollment | null> {
    try {
      const { data, error } = await this.client
        .from(ENROLLMENT_TABLE)
        .select("*")
        .eq("plan_id", planId)
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      return this.mapToEnrollment(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.getUserEnrollment");
    }
  }

  async getUserEnrollments(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<PlanEnrollment>> {
    try {
      let query = this.client
        .from(ENROLLMENT_TABLE)
        .select("*", { count: "exact" })
        .eq("user_id", userId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToEnrollment(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.getUserEnrollments");
    }
  }

  async getPlanEnrollments(
    planId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<PlanEnrollment>> {
    try {
      let query = this.client
        .from(ENROLLMENT_TABLE)
        .select("*", { count: "exact" })
        .eq("plan_id", planId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToEnrollment(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.getPlanEnrollments");
    }
  }

  async updateEnrollmentProgress(
    planId: string,
    userId: string,
    progress: number,
    currentStep: number,
  ): Promise<PlanEnrollment> {
    try {
      const { data, error } = await this.client
        .from(ENROLLMENT_TABLE)
        .update({
          progress,
          current_step: currentStep,
          last_accessed_at: new Date(),
        })
        .eq("plan_id", planId)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;

      return this.mapToEnrollment(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLPlanRepository.updateEnrollmentProgress",
      );
    }
  }

  async completeEnrollment(
    planId: string,
    userId: string,
  ): Promise<PlanEnrollment> {
    try {
      const { data, error } = await this.client
        .from(ENROLLMENT_TABLE)
        .update({
          progress: 100,
          completed_at: new Date(),
          last_accessed_at: new Date(),
        })
        .eq("plan_id", planId)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;

      // Increment completion count
      await this.client
        .from(TABLE_NAME)
        .update({ completion_count: this.client.rpc("increment", { x: 1 }) })
        .eq("id", planId);

      return this.mapToEnrollment(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.completeEnrollment");
    }
  }

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  async getPlanStatistics(planId: string): Promise<PlanStatistics> {
    try {
      const plan = await this.findById(planId);
      if (!plan) {
        throw new Error(`Plan with id ${planId} not found`);
      }

      const enrollments = await this.getPlanEnrollments(planId);
      const activeCount = enrollments.data.filter((e) => e.isActive).length;

      const completionRate =
        plan.enrollmentCount > 0
          ? (plan.completionCount / plan.enrollmentCount) * 100
          : 0;

      return {
        planId,
        totalEnrollments: plan.enrollmentCount,
        activeEnrollments: activeCount,
        completions: plan.completionCount,
        completionRate,
        averageCompletionTime: 0, // TODO: Calculate from enrollments
        averageRating: plan.averageRating || 0,
        totalRatings: 0, // TODO: Get from ratings table
        viewCount: 0, // TODO: Implement view tracking
        lastEnrollmentAt: undefined, // TODO: Get max enrolled_at
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.getPlanStatistics");
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
      this.handleError(error, "PostgreSQLPlanRepository.count");
    }
  }

  async countPublished(): Promise<number> {
    try {
      const { count, error } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("status", PlanStatus.PUBLISHED);

      if (error) throw error;

      return count || 0;
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.countPublished");
    }
  }

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  async exists(id: string): Promise<boolean> {
    try {
      const plan = await this.findById(id);
      return plan !== null;
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.exists");
    }
  }

  async isUserEnrolled(planId: string, userId: string): Promise<boolean> {
    try {
      const enrollment = await this.getUserEnrollment(planId, userId);
      return enrollment !== null && enrollment.isActive;
    } catch (error) {
      this.handleError(error, "PostgreSQLPlanRepository.isUserEnrolled");
    }
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  private mapToPlan(data: any): Plan {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Plan;
  }

  private mapToEnrollment(data: any): PlanEnrollment {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      enrolledAt: new Date(data.enrolled_at),
      startedAt: data.started_at ? new Date(data.started_at) : undefined,
      completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
      lastAccessedAt: new Date(data.last_accessed_at),
    } as PlanEnrollment;
  }
}
