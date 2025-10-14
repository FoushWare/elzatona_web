// Advanced Search Service for Elzatona Learning Platform
// Provides comprehensive search and filtering capabilities across all content types

export interface SearchFilters {
  // Text search
  searchTerm?: string;

  // Content type filters
  contentType?:
    | 'questions'
    | 'cards'
    | 'plans'
    | 'categories'
    | 'topics'
    | 'frontend-tasks'
    | 'problem-solving'
    | 'all';

  // Difficulty filters
  difficulty?: 'easy' | 'medium' | 'hard' | 'intermediate' | 'all';

  // Category and topic filters
  category?: string;
  topic?: string;
  cardType?: string;
  planId?: string;

  // Learning path filters
  learningPath?: string;
  sectionId?: string;

  // Status filters
  isActive?: boolean;
  isComplete?: boolean;

  // Date filters
  dateFrom?: string;
  dateTo?: string;

  // Tag filters
  tags?: string[];

  // Sorting options
  sortBy?:
    | 'createdAt'
    | 'updatedAt'
    | 'title'
    | 'difficulty'
    | 'order'
    | 'relevance';
  sortDirection?: 'asc' | 'desc';

  // Pagination
  page?: number;
  limit?: number;

  // Advanced search options
  exactMatch?: boolean;
  caseSensitive?: boolean;
  includeInactive?: boolean;
}

export interface SearchResult<T> {
  data: T[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  filters: SearchFilters;
  searchTime: number;
  suggestions?: string[];
}

export interface SearchableItem {
  id: string;
  title?: string;
  name?: string;
  content?: string;
  description?: string;
  difficulty?: string;
  category?: string;
  topic?: string;
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
  isActive?: boolean;
  isComplete?: boolean;
  learningPath?: string;
  sectionId?: string;
  cardType?: string;
  planId?: string;
}

export class AdvancedSearchService {
  private static instance: AdvancedSearchService;

  private constructor() {}

  public static getInstance(): AdvancedSearchService {
    if (!AdvancedSearchService.instance) {
      AdvancedSearchService.instance = new AdvancedSearchService();
    }
    return AdvancedSearchService.instance;
  }

  /**
   * Perform advanced search across multiple content types
   */
  async search<T extends SearchableItem>(
    items: T[],
    filters: SearchFilters
  ): Promise<SearchResult<T>> {
    const startTime = Date.now();

    // Apply filters
    let filteredItems = this.applyFilters(items, filters);

    // Apply text search
    if (filters.searchTerm) {
      filteredItems = this.applyTextSearch(filteredItems, filters);
    }

    // Apply sorting
    filteredItems = this.applySorting(filteredItems, filters);

    // Apply pagination
    const paginatedResult = this.applyPagination(filteredItems, filters);

    const searchTime = Date.now() - startTime;

    return {
      data: paginatedResult.data,
      totalCount: filteredItems.length,
      hasMore: paginatedResult.hasMore,
      currentPage: filters.page || 1,
      totalPages: paginatedResult.totalPages,
      filters,
      searchTime,
      suggestions: this.generateSuggestions(items, filters.searchTerm),
    };
  }

  /**
   * Apply content filters
   */
  private applyFilters<T extends SearchableItem>(
    items: T[],
    filters: SearchFilters
  ): T[] {
    return items.filter(item => {
      // Content type filter
      if (filters.contentType && filters.contentType !== 'all') {
        if (!this.matchesContentType(item, filters.contentType)) {
          return false;
        }
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty !== 'all') {
        if (item.difficulty !== filters.difficulty) {
          return false;
        }
      }

      // Category filter
      if (filters.category) {
        if (item.category !== filters.category) {
          return false;
        }
      }

      // Topic filter
      if (filters.topic) {
        if (item.topic !== filters.topic) {
          return false;
        }
      }

      // Card type filter
      if (filters.cardType) {
        if (item.cardType !== filters.cardType) {
          return false;
        }
      }

      // Plan ID filter
      if (filters.planId) {
        if (item.planId !== filters.planId) {
          return false;
        }
      }

      // Learning path filter
      if (filters.learningPath) {
        if (item.learningPath !== filters.learningPath) {
          return false;
        }
      }

      // Section ID filter
      if (filters.sectionId) {
        if (item.sectionId !== filters.sectionId) {
          return false;
        }
      }

      // Status filters
      if (filters.isActive !== undefined) {
        if (item.isActive !== filters.isActive) {
          return false;
        }
      }

      if (filters.isComplete !== undefined) {
        if (item.isComplete !== filters.isComplete) {
          return false;
        }
      }

      // Date filters
      if (filters.dateFrom || filters.dateTo) {
        if (!this.matchesDateRange(item, filters.dateFrom, filters.dateTo)) {
          return false;
        }
      }

      // Tag filters
      if (filters.tags && filters.tags.length > 0) {
        if (!this.matchesTags(item, filters.tags)) {
          return false;
        }
      }

      // Include inactive filter
      if (!filters.includeInactive && item.isActive === false) {
        return false;
      }

      return true;
    });
  }

  /**
   * Apply text search with advanced options
   */
  private applyTextSearch<T extends SearchableItem>(
    items: T[],
    filters: SearchFilters
  ): T[] {
    if (!filters.searchTerm) {
      return items;
    }

    const searchTerm = filters.caseSensitive
      ? filters.searchTerm
      : filters.searchTerm.toLowerCase();

    return items.filter(item => {
      const searchableFields = [
        item.title,
        item.name,
        item.content,
        item.description,
        ...(item.tags || []),
      ].filter(Boolean);

      return searchableFields.some(field => {
        const fieldValue = filters.caseSensitive ? field : field.toLowerCase();

        if (filters.exactMatch) {
          return fieldValue === searchTerm;
        } else {
          return fieldValue.includes(searchTerm);
        }
      });
    });
  }

  /**
   * Apply sorting
   */
  private applySorting<T extends SearchableItem>(
    items: T[],
    filters: SearchFilters
  ): T[] {
    const sortBy = filters.sortBy || 'relevance';
    const sortDirection = filters.sortDirection || 'desc';

    return [...items].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'title':
          aValue = a.title || a.name || '';
          bValue = b.title || b.name || '';
          break;
        case 'difficulty':
          aValue = this.getDifficultyOrder(a.difficulty);
          bValue = this.getDifficultyOrder(b.difficulty);
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        case 'updatedAt':
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        case 'order':
          aValue = (a as any).order || 0;
          bValue = (b as any).order || 0;
          break;
        case 'relevance':
          // For relevance, we'll use a simple scoring system
          aValue = this.calculateRelevanceScore(a, filters);
          bValue = this.calculateRelevanceScore(b, filters);
          break;
        default:
          aValue = a.title || a.name || '';
          bValue = b.title || b.name || '';
      }

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      // Compare values
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Apply pagination
   */
  private applyPagination<T>(
    items: T[],
    filters: SearchFilters
  ): { data: T[]; hasMore: boolean; totalPages: number } {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const totalPages = Math.ceil(items.length / limit);
    const hasMore = page < totalPages;

    return {
      data: items.slice(offset, offset + limit),
      hasMore,
      totalPages,
    };
  }

  /**
   * Generate search suggestions based on content
   */
  private generateSuggestions<T extends SearchableItem>(
    items: T[],
    searchTerm?: string
  ): string[] {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const suggestions = new Set<string>();
    const searchLower = searchTerm.toLowerCase();

    items.forEach(item => {
      // Add title/name suggestions
      const title = item.title || item.name;
      if (title && title.toLowerCase().includes(searchLower)) {
        suggestions.add(title);
      }

      // Add tag suggestions
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag.toLowerCase().includes(searchLower)) {
            suggestions.add(tag);
          }
        });
      }

      // Add category suggestions
      if (item.category && item.category.toLowerCase().includes(searchLower)) {
        suggestions.add(item.category);
      }
    });

    return Array.from(suggestions).slice(0, 10);
  }

  /**
   * Helper methods
   */
  private matchesContentType<T extends SearchableItem>(
    item: T,
    contentType: string
  ): boolean {
    // This would need to be implemented based on your data structure
    // For now, we'll use a simple approach
    return true; // Placeholder implementation
  }

  private matchesDateRange<T extends SearchableItem>(
    item: T,
    dateFrom?: string,
    dateTo?: string
  ): boolean {
    const itemDate = item.createdAt || item.updatedAt;
    if (!itemDate) return true;

    const itemDateObj = new Date(itemDate);

    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (itemDateObj < fromDate) return false;
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      if (itemDateObj > toDate) return false;
    }

    return true;
  }

  private matchesTags<T extends SearchableItem>(
    item: T,
    requiredTags: string[]
  ): boolean {
    if (!item.tags) return false;

    return requiredTags.every(tag =>
      item.tags!.some(itemTag =>
        itemTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
  }

  private getDifficultyOrder(difficulty?: string): number {
    switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'intermediate':
        return 3;
      case 'hard':
        return 4;
      default:
        return 0;
    }
  }

  private calculateRelevanceScore<T extends SearchableItem>(
    item: T,
    filters: SearchFilters
  ): number {
    let score = 0;

    // Boost score for exact matches in title/name
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const title = (item.title || item.name || '').toLowerCase();

      if (title.includes(searchTerm)) {
        score += 10;
      }

      if (title.startsWith(searchTerm)) {
        score += 5;
      }

      if (title === searchTerm) {
        score += 20;
      }
    }

    // Boost score for active items
    if (item.isActive) {
      score += 5;
    }

    // Boost score for recent items
    if (item.updatedAt) {
      const daysSinceUpdate =
        (Date.now() - new Date(item.updatedAt).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysSinceUpdate < 7) {
        score += 3;
      }
    }

    return score;
  }

  /**
   * Get search statistics
   */
  getSearchStats<T extends SearchableItem>(
    items: T[]
  ): {
    totalItems: number;
    activeItems: number;
    categories: string[];
    difficulties: string[];
    tags: string[];
  } {
    const categories = [
      ...new Set(items.map(item => item.category).filter(Boolean)),
    ];
    const difficulties = [
      ...new Set(items.map(item => item.difficulty).filter(Boolean)),
    ];
    const tags = [...new Set(items.flatMap(item => item.tags || []))];

    return {
      totalItems: items.length,
      activeItems: items.filter(item => item.isActive !== false).length,
      categories: categories.sort(),
      difficulties: difficulties.sort(),
      tags: tags.sort(),
    };
  }

  /**
   * Create search URL with filters
   */
  createSearchUrl(filters: SearchFilters, baseUrl: string = ''): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  /**
   * Parse search filters from URL
   */
  parseSearchFilters(searchParams: URLSearchParams): SearchFilters {
    const filters: SearchFilters = {};

    // Parse all possible filter parameters
    const paramMap: Record<string, keyof SearchFilters> = {
      search: 'searchTerm',
      type: 'contentType',
      difficulty: 'difficulty',
      category: 'category',
      topic: 'topic',
      cardType: 'cardType',
      planId: 'planId',
      learningPath: 'learningPath',
      sectionId: 'sectionId',
      isActive: 'isActive',
      isComplete: 'isComplete',
      dateFrom: 'dateFrom',
      dateTo: 'dateTo',
      tags: 'tags',
      sortBy: 'sortBy',
      sortDirection: 'sortDirection',
      page: 'page',
      limit: 'limit',
      exactMatch: 'exactMatch',
      caseSensitive: 'caseSensitive',
      includeInactive: 'includeInactive',
    };

    Object.entries(paramMap).forEach(([param, filterKey]) => {
      const value = searchParams.get(param);
      if (value) {
        switch (filterKey) {
          case 'tags':
            filters[filterKey] = value.split(',');
            break;
          case 'isActive':
          case 'isComplete':
          case 'exactMatch':
          case 'caseSensitive':
          case 'includeInactive':
            filters[filterKey] = value === 'true';
            break;
          case 'page':
          case 'limit':
            filters[filterKey] = parseInt(value);
            break;
          default:
            (filters as any)[filterKey] = value;
        }
      }
    });

    return filters;
  }
}

// Export singleton instance
export const advancedSearchService = AdvancedSearchService.getInstance();
