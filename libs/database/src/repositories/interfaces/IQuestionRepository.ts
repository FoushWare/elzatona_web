/**
 * Question Repository Interface
 * Defines contracts for question data operations
 */

import {
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionFilters,
  QuestionStatistics,
  QueryOptions,
  PaginatedResult,
} from "../types";

/**
 * Repository interface for Question entity operations
 * Provides database-agnostic CRUD and query operations
 */
export interface IQuestionRepository {
  // ============================================
  // CREATE OPERATIONS
  // ============================================

    /**
     * Find questions by type (e.g., 'frontend-task', 'problem')
     * @param type - The type of question to filter by
     * @param options - Query options for filtering and pagination
     * @returns Paginated result with questions
     * @throws RepositoryError if database error occurs
     */
    findByType(
      type: string,
      options?: QueryOptions,
    ): Promise<PaginatedResult<Question>>;

  /**
   * Create a new question
   * @param question - Question data to create
   * @returns Created question with generated ID
   * @throws RepositoryError if validation fails or database error occurs
   */
  create(question: CreateQuestionDTO): Promise<Question>;

  /**
   * Create multiple questions in a batch
   * @param questions - Array of questions to create
   * @returns Array of created questions
   * @throws RepositoryError if any validation fails or database error occurs
   */
  createBatch(questions: CreateQuestionDTO[]): Promise<Question[]>;

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Find a question by its ID
   * @param id - Question ID
   * @returns Question if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findById(id: string): Promise<Question | null>;

  /**
   * Find all questions with optional pagination and filtering
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with questions
   * @throws RepositoryError if database error occurs
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<Question>>;

  /**
   * Find questions by category
   * @param categoryId - Category ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with questions
   * @throws RepositoryError if database error occurs
   */
  findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>>;

  /**
   * Find questions by topic
   * @param topicId - Topic ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with questions
   * @throws RepositoryError if database error occurs
   */
  findByTopic(
    topicId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>>;

  /**
   * Find questions by difficulty level
   * @param difficulty - Difficulty level to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with questions
   * @throws RepositoryError if database error occurs
   */
  findByDifficulty(
    difficulty: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>>;

  /**
   * Search questions by keyword
   * @param query - Search query string
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with matching questions
   * @throws RepositoryError if database error occurs
   */
  search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>>;

  /**
   * Count questions with optional filters
   * @param filters - Optional filters to apply
   * @returns Total count of matching questions
   * @throws RepositoryError if database error occurs
   */
  count(filters?: QuestionFilters): Promise<number>;

  /**
   * Find questions with complex filters
   * @param filters - Filters to apply
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with matching questions
   * @throws RepositoryError if database error occurs
   */
  findByFilters(
    filters: QuestionFilters,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>>;

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  /**
   * Update a question by ID
   * @param id - Question ID to update
   * @param data - Partial question data to update
   * @returns Updated question
   * @throws RepositoryError if question not found or validation fails
   */
  update(id: string, data: UpdateQuestionDTO): Promise<Question>;

  /**
   * Update multiple questions in a batch
   * @param updates - Array of updates with ID and data
   * @returns Array of updated questions
   * @throws RepositoryError if any validation fails or database error occurs
   */
  updateBatch(
    updates: Array<{ id: string; data: UpdateQuestionDTO }>,
  ): Promise<Question[]>;

  /**
   * Increment view count for a question
   * @param id - Question ID
   * @returns Updated question
   * @throws RepositoryError if question not found
   */
  incrementViewCount(id: string): Promise<Question>;

  /**
   * Update success rate for a question
   * @param id - Question ID
   * @param successRate - New success rate (0-100)
   * @returns Updated question
   * @throws RepositoryError if question not found or validation fails
   */
  updateSuccessRate(id: string, successRate: number): Promise<Question>;

  // ============================================
  // DELETE OPERATIONS
  // ============================================

  /**
   * Delete a question by ID
   * @param id - Question ID to delete
   * @throws RepositoryError if question not found or database error occurs
   */
  delete(id: string): Promise<void>;

  /**
   * Delete multiple questions in a batch
   * @param ids - Array of question IDs to delete
   * @throws RepositoryError if database error occurs
   */
  deleteBatch(ids: string[]): Promise<void>;

  /**
   * Soft delete a question (mark as inactive)
   * @param id - Question ID to soft delete
   * @returns Updated question
   * @throws RepositoryError if question not found
   */
  softDelete(id: string): Promise<Question>;

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  /**
   * Get comprehensive statistics about questions
   * @returns Question statistics
   * @throws RepositoryError if database error occurs
   */
  getStatistics(): Promise<QuestionStatistics>;

  /**
   * Get statistics for a specific category
   * @param categoryId - Category ID
   * @returns Question statistics for the category
   * @throws RepositoryError if database error occurs
   */
  getCategoryStatistics(categoryId: string): Promise<QuestionStatistics>;

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  /**
   * Check if a question exists by ID
   * @param id - Question ID
   * @returns True if exists, false otherwise
   * @throws RepositoryError if database error occurs
   */
  exists(id: string): Promise<boolean>;

  /**
   * Get random questions with filters
   * @param count - Number of random questions to retrieve
   * @param filters - Optional filters to apply
   * @returns Array of random questions
   * @throws RepositoryError if database error occurs
   */
  getRandom(count: number, filters?: QuestionFilters): Promise<Question[]>;
}
