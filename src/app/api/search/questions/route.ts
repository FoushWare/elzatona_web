/**
 * Advanced Search API Endpoints
 * Provides server-side search functionality with filtering, faceting, and analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface SearchFilters {
  query?: string;
  category?: string;
  difficulty?: string;
  type?: string;
  learningCardId?: string;
  tags?: string[];
  isActive?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  pointsRange?: {
    min: number;
    max: number;
  };
}

export interface SearchOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeFacets?: boolean;
  includeSuggestions?: boolean;
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
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const {
      filters,
      options,
    }: { filters: SearchFilters; options: SearchOptions } =
      await request.json();

    console.log('🔍 Advanced search request:', { filters, options });

    // Build Supabase query
    let query = supabase.from('questions').select('*');

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }

    if (filters.type) {
      query = query.eq('question_type', filters.type);
    }

    if (filters.learningCardId) {
      query = query.eq('learning_card_id', filters.learningCardId);
    }

    if (filters.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    if (filters.pointsRange) {
      if (filters.pointsRange.min !== undefined) {
        query = query.gte('points', filters.pointsRange.min);
      }
      if (filters.pointsRange.max !== undefined) {
        query = query.lte('points', filters.pointsRange.max);
      }
    }

    if (filters.dateRange) {
      if (filters.dateRange.start) {
        query = query.gte('created_at', filters.dateRange.start);
      }
      if (filters.dateRange.end) {
        query = query.lte('created_at', filters.dateRange.end);
      }
    }

    // Apply sorting
    const sortBy = options.sortBy || 'created_at';
    const sortOrder = options.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const offset = (page - 1) * pageSize;
    query = query.range(offset, offset + pageSize - 1);

    // Execute query
    const { data: questionsData, error, count } = await query;

    if (error) {
      throw error;
    }

    let questions = questionsData || [];

    // Apply text search if query is provided
    if (filters.query) {
      const searchTerm = filters.query.toLowerCase();
      questions = questions.filter(question => {
        return (
          question.title?.toLowerCase().includes(searchTerm) ||
          question.content?.toLowerCase().includes(searchTerm) ||
          question.tags?.some((tag: string) =>
            tag.toLowerCase().includes(searchTerm)
          ) ||
          question.explanation?.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Apply tag filters
    if (filters.tags && filters.tags.length > 0) {
      questions = questions.filter(question => {
        return filters.tags!.some(tag =>
          question.tags?.some((questionTag: string) =>
            questionTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
      });
    }

    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw countError;
    }

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedQuestions = questions.slice(startIndex, endIndex);

    // Calculate facets
    const facets = calculateFacets(questions);

    // Generate suggestions
    const suggestions = generateSuggestions(filters.query || '', questions);

    const searchTime = Date.now() - startTime;

    const result: SearchResult<any> = {
      data: paginatedQuestions,
      totalCount: totalCount || 0,
      facets,
      suggestions,
      searchTime,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil((totalCount || 0) / pageSize),
        hasNext: page < Math.ceil((totalCount || 0) / pageSize),
        hasPrevious: page > 1,
      },
    };

    console.log('✅ Search completed:', {
      resultCount: result.data.length,
      totalCount: result.totalCount,
      searchTime: result.searchTime,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json(
      {
        error: 'Search failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate search facets from results
 */
function calculateFacets(questions: any[]): any {
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
 * Generate search suggestions based on query and results
 */
function generateSuggestions(query: string, questions: any[]): string[] {
  if (!query || query.length < 2) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  questions.forEach(question => {
    // Add title words that contain the query
    if (question.title) {
      const titleWords = question.title.split(' ');
      titleWords.forEach((word: string) => {
        if (word.toLowerCase().includes(queryLower) && word.length > 2) {
          suggestions.add(word);
        }
      });
    }

    // Add tags that contain the query
    if (question.tags && Array.isArray(question.tags)) {
      question.tags.forEach((tag: string) => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
    }

    // Add category if it contains the query
    if (
      question.category &&
      question.category.toLowerCase().includes(queryLower)
    ) {
      suggestions.add(question.category);
    }
  });

  return Array.from(suggestions).slice(0, 10);
}
