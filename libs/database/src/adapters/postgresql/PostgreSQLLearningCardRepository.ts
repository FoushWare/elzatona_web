/**
 * PostgreSQL Learning Card Repository Adapter
 * Implements ILearningCardRepository using Supabase PostgreSQL
 */

import {
  ILearningCardRepository,
  LearningCard,
  CreateLearningCardDTO,
  UpdateLearningCardDTO,
  UserCardInteraction,
  LearningCardStatistics,
  QueryOptions,
  PaginatedResult,
  CardType,
} from "../../repositories";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

const TABLE_NAME = "learning_cards";
const INTERACTION_TABLE = "user_card_interactions";

/**
 * PostgreSQL implementation of Learning Card Repository
 */
export class PostgreSQLLearningCardRepository
  extends BasePostgreSQLAdapter
  implements ILearningCardRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  // ============================================
  // CREATE OPERATIONS
  // ============================================

  async create(card: CreateLearningCardDTO): Promise<LearningCard> {
    try {
      const dbData = this.toSnakeCase({
        ...card,
        isPublished: card.isPublished ?? false,
        viewCount: 0,
        likeCount: 0,
        order: card.order ?? 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return this.mapToCard(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.create");
    }
  }

  async createBatch(cards: CreateLearningCardDTO[]): Promise<LearningCard[]> {
    try {
      const dbData = cards.map((card) =>
        this.toSnakeCase({
          ...card,
          isPublished: card.isPublished ?? false,
          viewCount: 0,
          likeCount: 0,
          order: card.order ?? 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select();

      if (error) throw error;

      return data.map((item) => this.mapToCard(item));
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.createBatch");
    }
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  async findById(id: string): Promise<LearningCard | null> {
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

      return this.mapToCard(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.findById");
    }
  }

  async findAll(
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.findAll");
    }
  }

  async findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("category_id", categoryId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.findByCategory",
      );
    }
  }

  async findByTopic(
    topicId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("topic_id", topicId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.findByTopic");
    }
  }

  async findByType(
    type: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("type", type);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.findByType");
    }
  }

  async search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      let dbQuery = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`);

      dbQuery = this.applyPagination(dbQuery, options);

      const { data, error, count } = await dbQuery;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.search");
    }
  }

  async findRelatedCards(cardId: string, limit = 5): Promise<LearningCard[]> {
    try {
      const card = await this.findById(cardId);
      if (!card) {
        throw new Error(`Card with id ${cardId} not found`);
      }

      // If relatedCards are explicitly defined, fetch them
      if (card.relatedCards && card.relatedCards.length > 0) {
        const { data, error } = await this.client
          .from(TABLE_NAME)
          .select("*")
          .in("id", card.relatedCards)
          .limit(limit);

        if (error) throw error;

        return (data || []).map((item) => this.mapToCard(item));
      }

      // Otherwise, find cards with similar topic/category
      const { data, error } = await this.client
        .from(TABLE_NAME)
        .select("*")
        .eq("topic_id", card.topicId)
        .neq("id", cardId)
        .limit(limit);

      if (error) throw error;

      return (data || []).map((item) => this.mapToCard(item));
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.findRelatedCards",
      );
    }
  }

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  async update(id: string, data: UpdateLearningCardDTO): Promise<LearningCard> {
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

      return this.mapToCard(result);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.update");
    }
  }

  async incrementViewCount(id: string): Promise<LearningCard> {
    try {
      const card = await this.findById(id);
      if (!card) {
        throw new Error(`Card with id ${id} not found`);
      }

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({ view_count: card.viewCount + 1 })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return this.mapToCard(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.incrementViewCount",
      );
    }
  }

  async incrementLikeCount(id: string): Promise<LearningCard> {
    try {
      const card = await this.findById(id);
      if (!card) {
        throw new Error(`Card with id ${id} not found`);
      }

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({ like_count: card.likeCount + 1 })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return this.mapToCard(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.incrementLikeCount",
      );
    }
  }

  async decrementLikeCount(id: string): Promise<LearningCard> {
    try {
      const card = await this.findById(id);
      if (!card) {
        throw new Error(`Card with id ${id} not found`);
      }

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .update({ like_count: Math.max(0, card.likeCount - 1) })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return this.mapToCard(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.decrementLikeCount",
      );
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
      this.handleError(error, "PostgreSQLLearningCardRepository.delete");
    }
  }

  async deleteBatch(ids: string[]): Promise<void> {
    try {
      const { error } = await this.client
        .from(TABLE_NAME)
        .delete()
        .in("id", ids);

      if (error) throw error;
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.deleteBatch");
    }
  }

  // ============================================
  // USER INTERACTION OPERATIONS
  // ============================================

  async recordView(
    cardId: string,
    userId: string,
  ): Promise<UserCardInteraction> {
    try {
      // Increment card view count
      await this.incrementViewCount(cardId);

      // Create or update user interaction
      const existing = await this.getUserInteraction(cardId, userId);

      if (existing) {
        const { data, error } = await this.client
          .from(INTERACTION_TABLE)
          .update({
            viewed_at: new Date(),
            review_count: existing.reviewCount + 1,
          })
          .eq("card_id", cardId)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;

        return this.mapToInteraction(data);
      }

      const dbData = this.toSnakeCase({
        cardId,
        userId,
        viewedAt: new Date(),
        masteryLevel: 0,
        reviewCount: 1,
        isBookmarked: false,
      });

      const { data, error } = await this.client
        .from(INTERACTION_TABLE)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return this.mapToInteraction(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.recordView");
    }
  }

  async recordMastery(
    cardId: string,
    userId: string,
    level: number,
  ): Promise<UserCardInteraction> {
    try {
      if (level < 0 || level > 5) {
        throw new Error("Mastery level must be between 0 and 5");
      }

      const existing = await this.getUserInteraction(cardId, userId);

      if (existing) {
        const { data, error } = await this.client
          .from(INTERACTION_TABLE)
          .update({
            mastery_level: level,
            last_reviewed_at: new Date(),
          })
          .eq("card_id", cardId)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;

        return this.mapToInteraction(data);
      }

      // Create new interaction if it doesn't exist
      const interaction = await this.recordView(cardId, userId);
      return await this.recordMastery(cardId, userId, level);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.recordMastery");
    }
  }

  async toggleBookmark(
    cardId: string,
    userId: string,
  ): Promise<UserCardInteraction> {
    try {
      const existing = await this.getUserInteraction(cardId, userId);

      if (existing) {
        const { data, error } = await this.client
          .from(INTERACTION_TABLE)
          .update({
            is_bookmarked: !existing.isBookmarked,
          })
          .eq("card_id", cardId)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;

        return this.mapToInteraction(data);
      }

      // Create new interaction if it doesn't exist
      await this.recordView(cardId, userId);
      return await this.toggleBookmark(cardId, userId);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.toggleBookmark",
      );
    }
  }

  async updateNotes(
    cardId: string,
    userId: string,
    notes: string,
  ): Promise<UserCardInteraction> {
    try {
      const existing = await this.getUserInteraction(cardId, userId);

      if (existing) {
        const { data, error } = await this.client
          .from(INTERACTION_TABLE)
          .update({ notes })
          .eq("card_id", cardId)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) throw error;

        return this.mapToInteraction(data);
      }

      // Create new interaction if it doesn't exist
      await this.recordView(cardId, userId);
      return await this.updateNotes(cardId, userId, notes);
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.updateNotes");
    }
  }

  async getUserInteraction(
    cardId: string,
    userId: string,
  ): Promise<UserCardInteraction | null> {
    try {
      const { data, error } = await this.client
        .from(INTERACTION_TABLE)
        .select("*")
        .eq("card_id", cardId)
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null;
        throw error;
      }

      return this.mapToInteraction(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.getUserInteraction",
      );
    }
  }

  async getUserInteractions(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<UserCardInteraction>> {
    try {
      let query = this.client
        .from(INTERACTION_TABLE)
        .select("*", { count: "exact" })
        .eq("user_id", userId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToInteraction(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.getUserInteractions",
      );
    }
  }

  async getUserBookmarks(
    userId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<LearningCard>> {
    try {
      // Get bookmarked card IDs
      const { data: interactions, error: interactionError } = await this.client
        .from(INTERACTION_TABLE)
        .select("card_id")
        .eq("user_id", userId)
        .eq("is_bookmarked", true);

      if (interactionError) throw interactionError;

      if (!interactions || interactions.length === 0) {
        return {
          data: [],
          meta: this.createPaginationMeta(0, options),
        };
      }

      const cardIds = interactions.map((i) => i.card_id);

      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .in("id", cardIds);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToCard(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.getUserBookmarks",
      );
    }
  }

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  async getStatistics(): Promise<LearningCardStatistics> {
    try {
      const total = await this.count();

      // Get counts by type
      const byType: Record<CardType, number> = {
        [CardType.CONCEPT]: 0,
        [CardType.EXAMPLE]: 0,
        [CardType.TIP]: 0,
        [CardType.WARNING]: 0,
        [CardType.BEST_PRACTICE]: 0,
      };

      for (const type of Object.values(CardType)) {
        const { count } = await this.client
          .from(TABLE_NAME)
          .select("*", { count: "exact", head: true })
          .eq("type", type);
        byType[type] = count || 0;
      }

      const { count: published } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);

      const { count: unpublished } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("is_published", false);

      return {
        total,
        byType,
        byCategory: {}, // TODO: Aggregate by category
        byDifficulty: {}, // TODO: Aggregate by difficulty
        published: published || 0,
        unpublished: unpublished || 0,
        totalViews: 0, // TODO: Sum view counts
        totalLikes: 0, // TODO: Sum like counts
        averageMasteryLevel: 0, // TODO: Calculate from interactions
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.getStatistics");
    }
  }

  async getCategoryStatistics(
    categoryId: string,
  ): Promise<LearningCardStatistics> {
    try {
      const { count: total } = await this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId);

      return {
        total: total || 0,
        byType: {
          [CardType.CONCEPT]: 0,
          [CardType.EXAMPLE]: 0,
          [CardType.TIP]: 0,
          [CardType.WARNING]: 0,
          [CardType.BEST_PRACTICE]: 0,
        },
        byCategory: { [categoryId]: total || 0 },
        byDifficulty: {},
        published: 0,
        unpublished: 0,
        totalViews: 0,
        totalLikes: 0,
        averageMasteryLevel: 0,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLLearningCardRepository.getCategoryStatistics",
      );
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
      this.handleError(error, "PostgreSQLLearningCardRepository.count");
    }
  }

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  async exists(id: string): Promise<boolean> {
    try {
      const card = await this.findById(id);
      return card !== null;
    } catch (error) {
      this.handleError(error, "PostgreSQLLearningCardRepository.exists");
    }
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  private mapToCard(data: any): LearningCard {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as LearningCard;
  }

  private mapToInteraction(data: any): UserCardInteraction {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      viewedAt: new Date(data.viewed_at),
      lastReviewedAt: data.last_reviewed_at
        ? new Date(data.last_reviewed_at)
        : undefined,
    } as UserCardInteraction;
  }
}
