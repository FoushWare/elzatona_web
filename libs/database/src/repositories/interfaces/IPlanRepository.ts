/**
 * Plan Repository Interface
 * Defines contracts for learning plan data operations
 */

import {
  Plan,
  CreatePlanDTO,
  UpdatePlanDTO,
  PlanEnrollment,
  PlanStatistics,
  QueryOptions,
  PaginatedResult,
} from "../types";

/**
 * Repository interface for Plan entity operations
 * Provides database-agnostic CRUD and query operations
 */
export interface IPlanRepository {
  // ============================================
  // CREATE OPERATIONS
  // ============================================

  /**
   * Create a new learning plan
   * @param plan - Plan data to create
   * @returns Created plan with generated ID
   * @throws RepositoryError if validation fails or database error occurs
   */
  create(plan: CreatePlanDTO): Promise<Plan>;

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Find a plan by ID
   * @param id - Plan ID
   * @returns Plan if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findById(id: string): Promise<Plan | null>;

  /**
   * Find all plans with optional pagination and filtering
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with plans
   * @throws RepositoryError if database error occurs
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<Plan>>;

  /**
   * Find plans by category
   * @param categoryId - Category ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with plans
   * @throws RepositoryError if database error occurs
   */
  findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Plan>>;

  /**
   * Find plans by author
   * @param authorId - Author ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with plans
   * @throws RepositoryError if database error occurs
   */
  findByAuthor(
    authorId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Plan>>;

  /**
   * Find published plans
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with published plans
   * @throws RepositoryError if database error occurs
   */
  findPublished(options?: QueryOptions): Promise<PaginatedResult<Plan>>;

  /**
   * Search plans by title or description
   * @param query - Search query string
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with matching plans
   * @throws RepositoryError if database error occurs
   */
  search(query: string, options?: QueryOptions): Promise<PaginatedResult<Plan>>;

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  /**
   * Update a plan by ID
   * @param id - Plan ID to update
   * @param data - Partial plan data to update
   * @returns Updated plan
   * @throws RepositoryError if plan not found or validation fails
   */
  update(id: string, data: UpdatePlanDTO): Promise<Plan>;

  /**
   * Publish a plan
   * @param id - Plan ID to publish
   * @returns Updated plan
   * @throws RepositoryError if plan not found
   */
  publish(id: string): Promise<Plan>;

  /**
   * Archive a plan
   * @param id - Plan ID to archive
   * @returns Updated plan
   * @throws RepositoryError if plan not found
   */
  archive(id: string): Promise<Plan>;

  // ============================================
  // DELETE OPERATIONS
  // ============================================

  /**
   * Delete a plan by ID
   * @param id - Plan ID to delete
   * @throws RepositoryError if plan not found or database error occurs
   */
  delete(id: string): Promise<void>;

  // ============================================
  // ENROLLMENT OPERATIONS
  // ============================================

  /**
   * Enroll a user in a plan
   * @param planId - Plan ID
   * @param userId - User ID
   * @returns Created enrollment
   * @throws RepositoryError if already enrolled or plan not found
   */
  enrollUser(planId: string, userId: string): Promise<PlanEnrollment>;

  /**
   * Unenroll a user from a plan
   * @param planId - Plan ID
   * @param userId - User ID
   * @throws RepositoryError if not enrolled or database error occurs
   */
  unenrollUser(planId: string, userId: string): Promise<void>;

  /**
   * Get user's enrollment in a plan
   * @param planId - Plan ID
   * @param userId - User ID
   * @returns Enrollment if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  getUserEnrollment(
    planId: string,
    userId: string,
  ): Promise<PlanEnrollment | null>;

  /**
   * Get all enrollments for a user
   * @param userId - User ID
   * @param options - Query options for filtering and pagination
   * @returns User's plan enrollments
   * @throws RepositoryError if database error occurs
   */
  getUserEnrollments(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<PlanEnrollment>>;

  /**
   * Get all enrollments for a plan
   * @param planId - Plan ID
   * @param options - Query options for filtering and pagination
   * @returns Plan's user enrollments
   * @throws RepositoryError if database error occurs
   */
  getPlanEnrollments(
    planId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<PlanEnrollment>>;

  /**
   * Update enrollment progress
   * @param planId - Plan ID
   * @param userId - User ID
   * @param progress - Progress percentage (0-100)
   * @param currentStep - Current step number
   * @returns Updated enrollment
   * @throws RepositoryError if enrollment not found
   */
  updateEnrollmentProgress(
    planId: string,
    userId: string,
    progress: number,
    currentStep: number,
  ): Promise<PlanEnrollment>;

  /**
   * Mark enrollment as completed
   * @param planId - Plan ID
   * @param userId - User ID
   * @returns Updated enrollment
   * @throws RepositoryError if enrollment not found
   */
  completeEnrollment(planId: string, userId: string): Promise<PlanEnrollment>;

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  /**
   * Get plan statistics
   * @param planId - Plan ID
   * @returns Plan statistics
   * @throws RepositoryError if plan not found
   */
  getPlanStatistics(planId: string): Promise<PlanStatistics>;

  /**
   * Get total plan count
   * @returns Total number of plans
   * @throws RepositoryError if database error occurs
   */
  count(): Promise<number>;

  /**
   * Get published plan count
   * @returns Number of published plans
   * @throws RepositoryError if database error occurs
   */
  countPublished(): Promise<number>;

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  /**
   * Check if a plan exists by ID
   * @param id - Plan ID
   * @returns True if exists, false otherwise
   * @throws RepositoryError if database error occurs
   */
  exists(id: string): Promise<boolean>;

  /**
   * Check if user is enrolled in plan
   * @param planId - Plan ID
   * @param userId - User ID
   * @returns True if enrolled, false otherwise
   * @throws RepositoryError if database error occurs
   */
  isUserEnrolled(planId: string, userId: string): Promise<boolean>;
}
