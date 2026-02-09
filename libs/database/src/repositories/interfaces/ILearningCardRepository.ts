/**
 * Learning Card Repository Interface
 * Defines contracts for learning card data operations
 */

import {
  LearningCard,
  CreateLearningCardDTO,
  UpdateLearningCardDTO,
  UserCardInteraction,
  LearningCardStatistics,
  QueryOptions,
  PaginatedResult,
} from "../types/index";

/**
 * Repository interface for Learning Card entity operations
 * Provides database-agnostic CRUD and query operations
 */
export interface ILearningCardRepository {
  // ============================================
  // CREATE OPERATIONS
  // ============================================

  /**
   * Create a new learning card
   * @param card - Learning card data to create
   * @returns Created card with generated ID
   * @throws RepositoryError if validation fails or database error occurs
   */
  create(card: CreateLearningCardDTO): Promise<LearningCard>;

  /**
   * Create multiple learning cards in a batch
   * @param cards - Array of learning cards to create
   * @returns Array of created cards
   * @throws RepositoryError if any validation fails or database error occurs
   */
  createBatch(cards: CreateLearningCardDTO[]): Promise<LearningCard[]>;

  // ============================================
  // READ OPERATIONS
  // ============================================

  /**
   * Find a learning card by ID
   * @param id - Card ID
   * @returns Card if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  findById(id: string): Promise<LearningCard | null>;

  /**
   * Find all learning cards with optional pagination and filtering
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with cards
   * @throws RepositoryError if database error occurs
   */
  findAll(options?: QueryOptions): Promise<PaginatedResult<LearningCard>>;

  /**
   * Find learning cards by category
   * @param categoryId - Category ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with cards
   * @throws RepositoryError if database error occurs
   */
  findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>>;

  /**
   * Find learning cards by topic
   * @param topicId - Topic ID to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with cards
   * @throws RepositoryError if database error occurs
   */
  findByTopic(
    topicId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>>;

  /**
   * Find learning cards by type
   * @param type - Card type to filter by
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with cards
   * @throws RepositoryError if database error occurs
   */
  findByType(
    type: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>>;

  /**
   * Search learning cards by keyword
   * @param query - Search query string
   * @param options - Query options for filtering and pagination
   * @returns Paginated result with matching cards
   * @throws RepositoryError if database error occurs
   */
  search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>>;

  /**
   * Find related cards
   * @param cardId - Card ID to find related cards for
   * @param limit - Maximum number of related cards to return
   * @returns Array of related cards
   * @throws RepositoryError if database error occurs
   */
  findRelatedCards(cardId: string, limit?: number): Promise<LearningCard[]>;

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  /**
   * Update a learning card by ID
   * @param id - Card ID to update
   * @param data - Partial card data to update
   * @returns Updated card
   * @throws RepositoryError if card not found or validation fails
   */
  update(id: string, data: UpdateLearningCardDTO): Promise<LearningCard>;

  /**
   * Increment view count for a card
   * @param id - Card ID
   * @returns Updated card
   * @throws RepositoryError if card not found
   */
  incrementViewCount(id: string): Promise<LearningCard>;

  /**
   * Increment like count for a card
   * @param id - Card ID
   * @returns Updated card
   * @throws RepositoryError if card not found
   */
  incrementLikeCount(id: string): Promise<LearningCard>;

  /**
   * Decrement like count for a card
   * @param id - Card ID
   * @returns Updated card
   * @throws RepositoryError if card not found
   */
  decrementLikeCount(id: string): Promise<LearningCard>;

  // ============================================
  // DELETE OPERATIONS
  // ============================================

  /**
   * Delete a learning card by ID
   * @param id - Card ID to delete
   * @throws RepositoryError if card not found or database error occurs
   */
  delete(id: string): Promise<void>;

  /**
   * Delete multiple learning cards in a batch
   * @param ids - Array of card IDs to delete
   * @throws RepositoryError if database error occurs
   */
  deleteBatch(ids: string[]): Promise<void>;

  // ============================================
  // USER INTERACTION OPERATIONS
  // ============================================

  /**
   * Record a user viewing a card
   * @param cardId - Card ID
   * @param userId - User ID
   * @returns Created or updated interaction
   * @throws RepositoryError if card not found
   */
  recordView(cardId: string, userId: string): Promise<UserCardInteraction>;

  /**
   * Record user's mastery level for a card
   * @param cardId - Card ID
   * @param userId - User ID
   * @param level - Mastery level (0-5)
   * @returns Updated interaction
   * @throws RepositoryError if card not found or invalid mastery level
   */
  recordMastery(
    cardId: string,
    userId: string,
    level: number,
  ): Promise<UserCardInteraction>;

  /**
   * Toggle bookmark for a card
   * @param cardId - Card ID
   * @param userId - User ID
   * @returns Updated interaction
   * @throws RepositoryError if card not found
   */
  toggleBookmark(cardId: string, userId: string): Promise<UserCardInteraction>;

  /**
   * Add or update user notes for a card
   * @param cardId - Card ID
   * @param userId - User ID
   * @param notes - User notes
   * @returns Updated interaction
   * @throws RepositoryError if card not found
   */
  updateNotes(
    cardId: string,
    userId: string,
    notes: string,
  ): Promise<UserCardInteraction>;

  /**
   * Get user's interaction with a card
   * @param cardId - Card ID
   * @param userId - User ID
   * @returns Interaction if found, null otherwise
   * @throws RepositoryError if database error occurs
   */
  getUserInteraction(
    cardId: string,
    userId: string,
  ): Promise<UserCardInteraction | null>;

  /**
   * Get all user's card interactions
   * @param userId - User ID
   * @param options - Query options for filtering and pagination
   * @returns User's card interactions
   * @throws RepositoryError if database error occurs
   */
  getUserInteractions(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<UserCardInteraction>>;

  /**
   * Get user's bookmarked cards
   * @param userId - User ID
   * @param options - Query options for filtering and pagination
   * @returns Bookmarked cards
   * @throws RepositoryError if database error occurs
   */
  getUserBookmarks(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>>;

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  /**
   * Get learning card statistics
   * @returns Card statistics
   * @throws RepositoryError if database error occurs
   */
  getStatistics(): Promise<LearningCardStatistics>;

  /**
   * Get category statistics
   * @param categoryId - Category ID
   * @returns Card statistics for the category
   * @throws RepositoryError if database error occurs
   */
  getCategoryStatistics(categoryId: string): Promise<LearningCardStatistics>;

  /**
   * Get total card count
   * @returns Total number of cards
   * @throws RepositoryError if database error occurs
   */
  count(): Promise<number>;

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  /**
   * Check if a card exists by ID
   * @param id - Card ID
   * @returns True if exists, false otherwise
   * @throws RepositoryError if database error occurs
   */
  exists(id: string): Promise<boolean>;
}
