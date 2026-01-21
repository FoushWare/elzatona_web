/**
 * User Repository Interface
 * Defines contracts for user data operations
 */

import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserProgress,
  UserPreferences,
  UserStatistics,
  QueryOptions,
  PaginatedResult,
} from "../types/index";

/**
 * Repository interface for User entity operations
 * Provides database-agnostic CRUD and query operations
 */
export interface IUserRepository {
  // ============================================
  // CREATE OPERATIONS
  // ============================================

  /**
   * Create a new user
   * @param user - User data to create
   * @returns Created user with generated ID
   * @throws RepositoryError if validation fails or duplicate email
   */
  create(user: CreateUserDTO): Promise<User>;

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Find a user by ID
   * @param id - User ID
   * @returns User if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find a user by email
   * @param email - User email
   * @returns User if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find an admin user by email (from admin_users table)
   * @param email - Admin email
   * @returns Admin user if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findAdminByEmail(email: string): Promise<any | null>;

  /**
   * Find all users with optional pagination and filtering
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with users
   * @throws RepositoryError if database error occurs
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<User>>;

  /**
   * Find users by role
   * @param role - User role to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with users
   * @throws RepositoryError if database error occurs
   */
  findByRole(
    role: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<User>>;

  /**
   * Search users by name or email
   * @param query - Search query string
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with matching users
   * @throws RepositoryError if database error occurs
   */
  search(query: string, options?: QueryOptions): Promise<PaginatedResult<User>>;

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  /**
   * Update a user by ID
   * @param id - User ID to update
   * @param data - Partial user data to update
   * @returns Updated user
   * @throws RepositoryError if user not found or validation fails
   */
  update(id: string, data: UpdateUserDTO): Promise<User>;

  /**
   * Update user progress
   * @param userId - User ID
   * @param progress - User progress data
   * @throws RepositoryError if user not found
   */
  updateProgress(userId: string, progress: UserProgress): Promise<void>;

  /**
   * Update user preferences
   * @param userId - User ID
   * @param preferences - User preferences data
   * @throws RepositoryError if user not found
   */
  updatePreferences(
    userId: string,
    preferences: UserPreferences,
  ): Promise<void>;

  /**
   * Update last login timestamp
   * @param userId - User ID
   * @returns Updated user
   * @throws RepositoryError if user not found
   */
  updateLastLogin(userId: string): Promise<User>;

  /**
   * Verify user email
   * @param userId - User ID
   * @returns Updated user
   * @throws RepositoryError if user not found
   */
  verifyEmail(userId: string): Promise<User>;

  /**
   * Deactivate user account
   * @param userId - User ID
   * @returns Updated user
   * @throws RepositoryError if user not found
   */
  deactivate(userId: string): Promise<User>;

  /**
   * Activate user account
   * @param userId - User ID
   * @returns Updated user
   * @throws RepositoryError if user not found
   */
  activate(userId: string): Promise<User>;

  // ============================================
  // DELETE OPERATIONS
  // ============================================

  /**
   * Delete a user by ID
   * @param id - User ID to delete
   * @throws RepositoryError if user not found or database error occurs
   */
  delete(id: string): Promise<void>;

  // ============================================
  // PROGRESS AND PREFERENCES OPERATIONS
  // ============================================

  /**
   * Get user progress
   * @param userId - User ID
   * @returns User progress data
   * @throws RepositoryError if user not found
   */
  getProgress(userId: string): Promise<UserProgress>;

  /**
   * Get user preferences
   * @param userId - User ID
   * @returns User preferences data
   * @throws RepositoryError if user not found
   */
  getPreferences(userId: string): Promise<UserPreferences>;

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  /**
   * Get user statistics
   * @param userId - User ID
   * @returns User statistics
   * @throws RepositoryError if user not found
   */
  getUserStatistics(userId: string): Promise<UserStatistics>;

  /**
   * Get total user count
   * @returns Total number of users
   * @throws RepositoryError if database error occurs
   */
  count(): Promise<number>;

  /**
   * Get active user count
   * @returns Number of active users
   * @throws RepositoryError if database error occurs
   */
  countActive(): Promise<number>;

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  /**
   * Check if a user exists by ID
   * @param id - User ID
   * @returns True if exists, false otherwise
   * @throws RepositoryError if database error occurs
   */
  exists(id: string): Promise<boolean>;

  /**
   * Check if email is already taken
   * @param email - Email to check
   * @returns True if email exists, false otherwise
   * @throws RepositoryError if database error occurs
   */
  emailExists(email: string): Promise<boolean>;
}
