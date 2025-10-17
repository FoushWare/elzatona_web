/**
 * Advanced Search API Endpoints
 * Provides server-side search functionality with filtering, faceting, and analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
} from 'firebase/firestore';

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

    // Build Firestore query
    let firestoreQuery = collection(db, 'questions');
    const conditions: any[] = [];

    // Apply filters
    if (filters.category) {
      conditions.push(where('category', '==', filters.category));
    }

    if (filters.difficulty) {
      conditions.push(where('difficulty', '==', filters.difficulty));
    }

    if (filters.type) {
      conditions.push(where('type', '==', filters.type));
    }

    if (filters.learningCardId) {
      conditions.push(where('learningCardId', '==', filters.learningCardId));
    }

    if (filters.isActive !== undefined) {
      conditions.push(where('isActive', '==', filters.isActive));
    }

    if (filters.pointsRange) {
      if (filters.pointsRange.min !== undefined) {
        conditions.push(where('points', '>=', filters.pointsRange.min));
      }
      if (filters.pointsRange.max !== undefined) {
        conditions.push(where('points', '<=', filters.pointsRange.max));
      }
    }

    if (filters.dateRange) {
      if (filters.dateRange.start) {
        conditions.push(where('createdAt', '>=', filters.dateRange.start));
      }
      if (filters.dateRange.end) {
        conditions.push(where('createdAt', '<=', filters.dateRange.end));
      }
    }

    // Apply sorting
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    conditions.push(orderBy(sortBy, sortOrder));

    // Apply pagination
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const offset = (page - 1) * pageSize;

    if (offset > 0) {
      // For pagination, we need to get documents after the offset
      // This is a simplified implementation - in production, you'd use startAfter
      conditions.push(limit(offset + pageSize));
    } else {
      conditions.push(limit(pageSize));
    }

    // Execute query
    const firestoreQueryWithConditions = query(firestoreQuery, ...conditions);
    const snapshot = await getDocs(firestoreQueryWithConditions);

    let questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

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
    const totalCountQuery = query(
      collection(db, 'questions'),
      ...conditions.slice(0, -1)
    );
    const totalCountSnapshot = await getDocs(totalCountQuery);
    const totalCount = totalCountSnapshot.size;

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
      totalCount,
      facets,
      suggestions,
      searchTime,
      pagination: {
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        hasNext: page < Math.ceil(totalCount / pageSize),
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
      titleWords.forEach(word => {
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
