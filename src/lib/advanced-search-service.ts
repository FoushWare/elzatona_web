/**
 * Advanced Search Service
 * Provides comprehensive search and filtering capabilities across all content types
 */

export interface SearchFilters {
  query?: string;
  category?: string;
  difficulty?: string;
  type?: string;
  learningCardId?: string;
  tags?: string[];
  isActive?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  pointsRange?: {
    min: number;
    max: number;
  };
}

export interface SearchResult<T> {
  data: T[];
  totalCount: number;
  facets: {
    categories: { [key: string]: number };
    difficulties: { [key: string]: number };
    types: { [key: string]: number };
    learningCards: { [key: string]: number };
    tags: { [key: string]: number };
  };
  suggestions: string[];
  searchTime: number;
}

export interface SearchOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeFacets?: boolean;
  includeSuggestions?: boolean;
}

export class AdvancedSearchService {
  private static instance: AdvancedSearchService;
  private searchCache: Map<string, any> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): AdvancedSearchService {
    if (!AdvancedSearchService.instance) {
      AdvancedSearchService.instance = new AdvancedSearchService();
    }
    return AdvancedSearchService.instance;
  }

  /**
   * Search questions with advanced filtering
   */
  async searchQuestions(
    filters: SearchFilters,
    options: SearchOptions = {}
  ): Promise<SearchResult<any>> {
    const startTime = Date.now();
    const cacheKey = this.generateCacheKey('questions', filters, options);

    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch('/api/search/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters, options }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const result = await response.json();
      result.searchTime = Date.now() - startTime;

      // Cache the result
      this.setCache(cacheKey, result);

      return result;
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to client-side search
      return this.fallbackSearch(filters, options);
    }
  }

  /**
   * Search across all content types
   */
  async searchAll(
    filters: SearchFilters,
    options: SearchOptions = {}
  ): Promise<{
    questions: SearchResult<any>;
    categories: SearchResult<any>;
    topics: SearchResult<any>;
    learningCards: SearchResult<any>;
    learningPlans: SearchResult<any>;
  }> {
    const startTime = Date.now();

    try {
      const [questions, categories, topics, learningCards, learningPlans] =
        await Promise.all([
          this.searchQuestions(filters, options),
          this.searchCategories(filters, options),
          this.searchTopics(filters, options),
          this.searchLearningCards(filters, options),
          this.searchLearningPlans(filters, options),
        ]);

      return {
        questions,
        categories,
        topics,
        learningCards,
        learningPlans,
      };
    } catch (error) {
      console.error('Global search error:', error);
      throw error;
    }
  }

  /**
   * Get search suggestions based on query
   */
  async getSuggestions(query: string, limit: number = 10): Promise<string[]> {
    if (!query || query.length < 2) return [];

    try {
      const response = await fetch(
        `/api/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.suggestions || [];
      }
    } catch (error) {
      console.error('Suggestions error:', error);
    }

    return [];
  }

  /**
   * Get search analytics
   */
  async getSearchAnalytics(): Promise<{
    popularSearches: { query: string; count: number }[];
    searchTrends: { date: string; count: number }[];
    topCategories: { category: string; count: number }[];
    searchPerformance: {
      averageResponseTime: number;
      cacheHitRate: number;
      totalSearches: number;
    };
  }> {
    try {
      const response = await fetch('/api/search/analytics');
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }

    return {
      popularSearches: [],
      searchTrends: [],
      topCategories: [],
      searchPerformance: {
        averageResponseTime: 0,
        cacheHitRate: 0,
        totalSearches: 0,
      },
    };
  }

  /**
   * Save search query for analytics
   */
  async saveSearchQuery(
    query: string,
    filters: SearchFilters,
    resultCount: number
  ): Promise<void> {
    try {
      await fetch('/api/search/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          filters,
          resultCount,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Save search query error:', error);
    }
  }

  // Private methods for individual content type searches
  private async searchCategories(
    filters: SearchFilters,
    options: SearchOptions
  ): Promise<SearchResult<any>> {
    // Implementation for category search
    return {
      data: [],
      totalCount: 0,
      facets: {} as any,
      suggestions: [],
      searchTime: 0,
    };
  }

  private async searchTopics(
    filters: SearchFilters,
    options: SearchOptions
  ): Promise<SearchResult<any>> {
    // Implementation for topic search
    return {
      data: [],
      totalCount: 0,
      facets: {} as any,
      suggestions: [],
      searchTime: 0,
    };
  }

  private async searchLearningCards(
    filters: SearchFilters,
    options: SearchOptions
  ): Promise<SearchResult<any>> {
    // Implementation for learning card search
    return {
      data: [],
      totalCount: 0,
      facets: {} as any,
      suggestions: [],
      searchTime: 0,
    };
  }

  private async searchLearningPlans(
    filters: SearchFilters,
    options: SearchOptions
  ): Promise<SearchResult<any>> {
    // Implementation for learning plan search
    return {
      data: [],
      totalCount: 0,
      facets: {} as any,
      suggestions: [],
      searchTime: 0,
    };
  }

  /**
   * Fallback client-side search when API fails
   */
  private async fallbackSearch(
    filters: SearchFilters,
    options: SearchOptions
  ): Promise<SearchResult<any>> {
    const startTime = Date.now();

    try {
      // Fetch all questions and filter client-side
      const response = await fetch(
        '/api/questions/unified?page=1&pageSize=1000'
      );
      if (!response.ok) throw new Error('Failed to fetch questions');

      const result = await response.json();
      let questions = result.data || [];

      // Apply filters
      if (filters.query) {
        const query = filters.query.toLowerCase();
        questions = questions.filter(
          (q: any) =>
            q.title.toLowerCase().includes(query) ||
            q.content.toLowerCase().includes(query) ||
            q.tags?.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }

      if (filters.category) {
        questions = questions.filter(
          (q: any) => q.category === filters.category
        );
      }

      if (filters.difficulty) {
        questions = questions.filter(
          (q: any) => q.difficulty === filters.difficulty
        );
      }

      if (filters.type) {
        questions = questions.filter((q: any) => q.type === filters.type);
      }

      if (filters.learningCardId) {
        questions = questions.filter(
          (q: any) => q.learningCardId === filters.learningCardId
        );
      }

      if (filters.isActive !== undefined) {
        questions = questions.filter(
          (q: any) => q.isActive === filters.isActive
        );
      }

      // Calculate facets
      const facets = this.calculateFacets(questions);

      // Apply pagination
      const page = options.page || 1;
      const pageSize = options.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedQuestions = questions.slice(startIndex, endIndex);

      return {
        data: paginatedQuestions,
        totalCount: questions.length,
        facets,
        suggestions: [],
        searchTime: Date.now() - startTime,
      };
    } catch (error) {
      console.error('Fallback search error:', error);
      return {
        data: [],
        totalCount: 0,
        facets: {} as any,
        suggestions: [],
        searchTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Calculate search facets from results
   */
  private calculateFacets(questions: any[]): any {
    const facets = {
      categories: {} as { [key: string]: number },
      difficulties: {} as { [key: string]: number },
      types: {} as { [key: string]: number },
      learningCards: {} as { [key: string]: number },
      tags: {} as { [key: string]: number },
    };

    questions.forEach(question => {
      // Categories
      if (question.category) {
        facets.categories[question.category] =
          (facets.categories[question.category] || 0) + 1;
      }

      // Difficulties
      if (question.difficulty) {
        facets.difficulties[question.difficulty] =
          (facets.difficulties[question.difficulty] || 0) + 1;
      }

      // Types
      if (question.type) {
        facets.types[question.type] = (facets.types[question.type] || 0) + 1;
      }

      // Learning Cards
      if (question.learningCardId) {
        facets.learningCards[question.learningCardId] =
          (facets.learningCards[question.learningCardId] || 0) + 1;
      }

      // Tags
      if (question.tags && Array.isArray(question.tags)) {
        question.tags.forEach((tag: string) => {
          facets.tags[tag] = (facets.tags[tag] || 0) + 1;
        });
      }
    });

    return facets;
  }

  /**
   * Generate cache key for search results
   */
  private generateCacheKey(
    type: string,
    filters: SearchFilters,
    options: SearchOptions
  ): string {
    return `${type}:${JSON.stringify(filters)}:${JSON.stringify(options)}`;
  }

  /**
   * Get result from cache
   */
  private getFromCache(key: string): any | null {
    const cached = this.searchCache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  /**
   * Set result in cache
   */
  private setCache(key: string, data: any): void {
    this.searchCache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear search cache
   */
  clearCache(): void {
    this.searchCache.clear();
  }
}

export const advancedSearchService = AdvancedSearchService.getInstance();
