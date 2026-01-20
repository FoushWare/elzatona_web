/**
 * PostgreSQL Question Repository Adapter
 * Implements IQuestionRepository using Supabase PostgreSQL
 */

import {
  IQuestionRepository,
  Question,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionFilters,
  QuestionStatistics,
  QueryOptions,
  PaginatedResult,
  QuestionDifficulty,
  QuestionType,
} from "../../repositories";
import {
  BasePostgreSQLAdapter,
  PostgreSQLConfig,
} from "./BasePostgreSQLAdapter";

const TABLE_NAME = "questions";

/**
 * PostgreSQL implementation of Question Repository
 */
export class PostgreSQLQuestionRepository

    /**
     * Find questions by type (e.g., 'frontend-task', 'problem')
     * @param type - The type of question to filter by
     * @param options - Query options for filtering and pagination
     * @returns Paginated result with questions
     */
    async findByType(type: string, options?: QueryOptions): Promise<PaginatedResult<Question>> {
      try {
        let query = this.client
          .from(TABLE_NAME)
          .select("*", { count: "exact" })
          .eq("type", type);

        query = this.applyPagination(query, options);

        const { data, error, count } = await query;
        if (error) throw error;

        return {
          data: (data || []).map((item) => this.mapToQuestion(item)),
          meta: this.createPaginationMeta(count || 0, options),
        };
      } catch (error) {
        this.handleError(error, "PostgreSQLQuestionRepository.findByType");
      }
    }
  extends BasePostgreSQLAdapter
  implements IQuestionRepository
{
  constructor(config: PostgreSQLConfig) {
    super(config);
  }

  // ============================================
  // CREATE OPERATIONS
  // ============================================

  async create(question: CreateQuestionDTO): Promise<Question> {
    try {
      const dbData = this.toSnakeCase({
        ...question,
        viewCount: 0,
        isPublished: question.isPublished ?? false,
        points: question.points ?? 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;

      return this.mapToQuestion(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.create");
    }
  }

  async createBatch(questions: CreateQuestionDTO[]): Promise<Question[]> {
    try {
      const dbData = questions.map((q) =>
        this.toSnakeCase({
          ...q,
          viewCount: 0,
          isPublished: q.isPublished ?? false,
          points: q.points ?? 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );

      const { data, error } = await this.client
        .from(TABLE_NAME)
        .insert(dbData)
        .select();

      if (error) throw error;

      return data.map((item) => this.mapToQuestion(item));
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.createBatch");
    }
  }

  // ============================================
  // READ OPERATIONS
  // ============================================

  async findById(id: string): Promise<Question | null> {
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

      return this.mapToQuestion(data);
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findById");
    }
  }

  async findAll(options?: QueryOptions): Promise<PaginatedResult<Question>> {
    try {
      let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findAll");
    }
  }

  async findByCategory(
    categoryId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("category_id", categoryId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findByCategory");
    }
  }

  async findByTopic(
    topicId: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("topic_id", topicId);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findByTopic");
    }
  }

  async findByDifficulty(
    difficulty: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .eq("difficulty", difficulty);

      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findByDifficulty");
    }
  }

  async search(
    query: string,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>> {
    try {
      let dbQuery = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact" })
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`);

      dbQuery = this.applyPagination(dbQuery, options);

      const { data, error, count } = await dbQuery;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.search");
    }
  }

  async count(filters?: QuestionFilters): Promise<number> {
    try {
      let query = this.client
        .from(TABLE_NAME)
        .select("*", { count: "exact", head: true });

      if (filters) {
        query = this.applyFilters(query, filters);
      }

      const { count, error } = await query;

      if (error) throw error;

      return count || 0;
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.count");
    }
  }

  async findByFilters(
    filters: QuestionFilters,
    options?: QueryOptions,
  ): Promise<PaginatedResult<Question>> {
    try {
      let query = this.client.from(TABLE_NAME).select("*", { count: "exact" });

      query = this.applyFilters(query, filters);
      query = this.applyPagination(query, options);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data || []).map((item) => this.mapToQuestion(item)),
        meta: this.createPaginationMeta(count || 0, options),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.findByFilters");
    }
  }

  // ============================================
  // UPDATE OPERATIONS
  // ============================================

  async update(id: string, data: UpdateQuestionDTO): Promise<Question> {
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

      return this.mapToQuestion(result);
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.update");
    }
  }

  async updateBatch(
    updates: Array<{ id: string; data: UpdateQuestionDTO }>,
  ): Promise<Question[]> {
    try {
      const results: Question[] = [];

      // Execute updates sequentially (Supabase doesn't support batch updates directly)
      for (const update of updates) {
        const result = await this.update(update.id, update.data);
        results.push(result);
      }

      return results;
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.updateBatch");
    }
  }

  async incrementViewCount(id: string): Promise<Question> {
    try {
      const { data, error } = await this.client.rpc("increment_view_count", {
        question_id: id,
      });

      if (error) {
        // Fallback to manual increment if RPC doesn't exist
        const question = await this.findById(id);
        if (!question) {
          throw new Error(`Question with id ${id} not found`);
        }
        return await this.update(id, {
          // viewCount: question.viewCount + 1,
        });
      }

      return this.mapToQuestion(data);
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLQuestionRepository.incrementViewCount",
      );
    }
  }

  async updateSuccessRate(id: string, successRate: number): Promise<Question> {
    try {
      if (successRate < 0 || successRate > 100) {
        throw new Error("Success rate must be between 0 and 100");
      }

      return await this.update(id, {
        // successRate
      });
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.updateSuccessRate");
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
      this.handleError(error, "PostgreSQLQuestionRepository.delete");
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
      this.handleError(error, "PostgreSQLQuestionRepository.deleteBatch");
    }
  }

  async softDelete(id: string): Promise<Question> {
    try {
      return await this.update(id, { isPublished: false });
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.softDelete");
    }
  }

  // ============================================
  // STATISTICS OPERATIONS
  // ============================================

  async getStatistics(): Promise<QuestionStatistics> {
    try {
      const total = await this.count();

      // Get counts by difficulty
      const byDifficulty: Record<QuestionDifficulty, number> = {
        [QuestionDifficulty.BEGINNER]: await this.count({
          difficulty: QuestionDifficulty.BEGINNER,
        }),
        [QuestionDifficulty.INTERMEDIATE]: await this.count({
          difficulty: QuestionDifficulty.INTERMEDIATE,
        }),
        [QuestionDifficulty.ADVANCED]: await this.count({
          difficulty: QuestionDifficulty.ADVANCED,
        }),
        [QuestionDifficulty.EXPERT]: await this.count({
          difficulty: QuestionDifficulty.EXPERT,
        }),
      };

      // Get counts by type
      const byType: Record<QuestionType, number> = {
        [QuestionType.MULTIPLE_CHOICE]: await this.count({
          type: QuestionType.MULTIPLE_CHOICE,
        }),
        [QuestionType.CODE]: await this.count({ type: QuestionType.CODE }),
        [QuestionType.TRUE_FALSE]: await this.count({
          type: QuestionType.TRUE_FALSE,
        }),
        [QuestionType.FILL_IN_BLANK]: await this.count({
          type: QuestionType.FILL_IN_BLANK,
        }),
        [QuestionType.MATCHING]: await this.count({
          type: QuestionType.MATCHING,
        }),
      };

      const published = await this.count({ isPublished: true });
      const unpublished = await this.count({ isPublished: false });

      return {
        total,
        byDifficulty,
        byType,
        byCategory: {}, // TODO: Implement category aggregation
        published,
        unpublished,
        averageSuccessRate: 0, // TODO: Calculate from question attempts
        totalViews: 0, // TODO: Sum view counts
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.getStatistics");
    }
  }

  async getCategoryStatistics(categoryId: string): Promise<QuestionStatistics> {
    try {
      const total = await this.count({ categoryId });

      return {
        total,
        byDifficulty: {
          [QuestionDifficulty.BEGINNER]: 0,
          [QuestionDifficulty.INTERMEDIATE]: 0,
          [QuestionDifficulty.ADVANCED]: 0,
          [QuestionDifficulty.EXPERT]: 0,
        },
        byType: {
          [QuestionType.MULTIPLE_CHOICE]: 0,
          [QuestionType.CODE]: 0,
          [QuestionType.TRUE_FALSE]: 0,
          [QuestionType.FILL_IN_BLANK]: 0,
          [QuestionType.MATCHING]: 0,
        },
        byCategory: { [categoryId]: total },
        published: await this.count({ categoryId, isPublished: true }),
        unpublished: await this.count({ categoryId, isPublished: false }),
        averageSuccessRate: 0,
        totalViews: 0,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(
        error,
        "PostgreSQLQuestionRepository.getCategoryStatistics",
      );
    }
  }

  // ============================================
  // UTILITY OPERATIONS
  // ============================================

  async exists(id: string): Promise<boolean> {
    try {
      const question = await this.findById(id);
      return question !== null;
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.exists");
    }
  }

  async getRandom(
    count: number,
    filters?: QuestionFilters,
  ): Promise<Question[]> {
    try {
      let query = this.client.from(TABLE_NAME).select("*");

      if (filters) {
        query = this.applyFilters(query, filters);
      }

      // Use PostgreSQL's random() function
      const { data, error } = await query.order("random()").limit(count);

      if (error) throw error;

      return (data || []).map((item) => this.mapToQuestion(item));
    } catch (error) {
      this.handleError(error, "PostgreSQLQuestionRepository.getRandom");
    }
  }

  // ============================================
  // PRIVATE HELPER METHODS
  // ============================================

  private mapToQuestion(data: any): Question {
    const mapped = this.toCamelCase(data);
    return {
      ...mapped,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    } as Question;
  }

  private applyFilters(query: any, filters: QuestionFilters): any {
    if (filters.categoryId) {
      query = query.eq("category_id", filters.categoryId);
    }
    if (filters.topicId) {
      query = query.eq("topic_id", filters.topicId);
    }
    if (filters.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }
    if (filters.type) {
      query = query.eq("type", filters.type);
    }
    if (filters.isPublished !== undefined) {
      query = query.eq("is_published", filters.isPublished);
    }
    if (filters.authorId) {
      query = query.eq("author_id", filters.authorId);
    }
    if (filters.tags && filters.tags.length > 0) {
      query = query.contains("tags", filters.tags);
    }
    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`,
      );
    }
    return query;
  }
}
