// Advanced Search Hook for React Components
// Provides easy-to-use search functionality with TanStack Query integration

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  advancedSearchService,
  SearchFilters,
  SearchResult,
  SearchableItem,
} from '@/lib/advanced-search-service';

export interface UseAdvancedSearchOptions<T extends SearchableItem> {
  // Data source
  data?: T[];
  queryKey?: string[];
  queryFn?: () => Promise<T[]>;

  // Default filters
  defaultFilters?: Partial<SearchFilters>;

  // Search behavior
  debounceMs?: number;
  minSearchLength?: number;

  // Pagination
  defaultPageSize?: number;

  // Auto-refetch
  refetchInterval?: number;
  enabled?: boolean;
}

export interface UseAdvancedSearchReturn<T extends SearchableItem> {
  // Search state
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  clearFilters: () => void;

  // Results
  results: SearchResult<T>;
  isLoading: boolean;
  error: Error | null;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  hasMore: boolean;

  // Search stats
  searchStats: {
    totalItems: number;
    activeItems: number;
    categories: string[];
    difficulties: string[];
    tags: string[];
  };

  // Actions
  refetch: () => void;
  search: (filters: Partial<SearchFilters>) => Promise<void>;

  // URL integration
  updateUrl: () => void;
  loadFromUrl: () => void;

  // Suggestions
  suggestions: string[];
}

export function useAdvancedSearch<T extends SearchableItem>(
  options: UseAdvancedSearchOptions<T> = {}
): UseAdvancedSearchReturn<T> {
  const {
    data: providedData,
    queryKey,
    queryFn,
    defaultFilters = {},
    debounceMs = 300,
    minSearchLength = 0,
    defaultPageSize = 10,
    refetchInterval,
    enabled = true,
  } = options;

  const queryClient = useQueryClient();

  // State management
  const [searchTerm, setSearchTerm] = useState(defaultFilters.searchTerm || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filters, setFiltersState] = useState<SearchFilters>({
    page: 1,
    limit: defaultPageSize,
    ...defaultFilters,
  });
  const [currentPage, setCurrentPage] = useState(filters.page || 1);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Fetch data if queryFn is provided
  const {
    data: fetchedData,
    isLoading: isDataLoading,
    error: dataError,
    refetch,
  } = useQuery({
    queryKey: queryKey || ['advanced-search-data'],
    queryFn: queryFn!,
    enabled: enabled && !!queryFn,
    refetchInterval,
  });

  // Use provided data or fetched data
  const data = providedData || fetchedData || [];
  const isLoading = isDataLoading;

  // Update filters when search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.searchTerm) {
      setFiltersState(prev => ({
        ...prev,
        searchTerm: debouncedSearchTerm,
        page: 1, // Reset to first page when searching
      }));
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, filters.searchTerm]);

  // Perform search
  const searchResults = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        data: [],
        totalCount: 0,
        hasMore: false,
        currentPage: 1,
        totalPages: 0,
        filters,
        searchTime: 0,
        suggestions: [],
      };
    }

    return advancedSearchService.search(data, {
      ...filters,
      searchTerm: debouncedSearchTerm,
    });
  }, [data, filters, debouncedSearchTerm]);

  // Search stats
  const searchStats = useMemo(() => {
    return advancedSearchService.getSearchStats(data);
  }, [data]);

  // Filter management
  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset to first page when filters change
    }));
    setCurrentPage(newFilters.page || 1);
  }, []);

  const updateFilter = useCallback(
    (key: keyof SearchFilters, value: any) => {
      setFilters({ [key]: value });
    },
    [setFilters]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters: SearchFilters = {
      page: 1,
      limit: defaultPageSize,
      ...defaultFilters,
    };
    setFiltersState(clearedFilters);
    setCurrentPage(1);
    setSearchTerm('');
  }, [defaultFilters, defaultPageSize]);

  // Search action
  const search = useCallback(
    async (searchFilters: Partial<SearchFilters>) => {
      setFilters(searchFilters);
    },
    [setFilters]
  );

  // URL integration
  const updateUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      const url = advancedSearchService.createSearchUrl(
        filters,
        window.location.pathname
      );
      window.history.replaceState({}, '', url);
    }
  }, [filters]);

  const loadFromUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlFilters = advancedSearchService.parseSearchFilters(urlParams);

      if (Object.keys(urlFilters).length > 0) {
        setFiltersState(prev => ({ ...prev, ...urlFilters }));
        if (urlFilters.searchTerm) {
          setSearchTerm(urlFilters.searchTerm);
        }
        if (urlFilters.page) {
          setCurrentPage(urlFilters.page);
        }
      }
    }
  }, []);

  // Load filters from URL on mount
  useEffect(() => {
    loadFromUrl();
  }, [loadFromUrl]);

  // Update URL when filters change
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  return {
    // Search state
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    updateFilter,
    clearFilters,

    // Results
    results: searchResults,
    isLoading,
    error: dataError,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages: searchResults.totalPages,
    hasMore: searchResults.hasMore,

    // Search stats
    searchStats,

    // Actions
    refetch,
    search,

    // URL integration
    updateUrl,
    loadFromUrl,

    // Suggestions
    suggestions: searchResults.suggestions || [],
  };
}

// Specialized hooks for different content types
export function useQuestionsSearch(
  options: Omit<UseAdvancedSearchOptions<any>, 'queryKey' | 'queryFn'> = {}
) {
  return useAdvancedSearch({
    ...options,
    queryKey: ['questions-search'],
    queryFn: async () => {
      // Fetch all questions without pagination for client-side filtering
      const response = await fetch('/api/questions/unified?pageSize=1000');
      const data = await response.json();
      return data.data || [];
    },
  });
}

export function useCardsSearch(
  options: Omit<UseAdvancedSearchOptions<any>, 'queryKey' | 'queryFn'> = {}
) {
  return useAdvancedSearch({
    ...options,
    queryKey: ['cards-search'],
    queryFn: async () => {
      const response = await fetch('/api/cards');
      const data = await response.json();
      return data.data || [];
    },
  });
}

export function usePlansSearch(
  options: Omit<UseAdvancedSearchOptions<any>, 'queryKey' | 'queryFn'> = {}
) {
  return useAdvancedSearch({
    ...options,
    queryKey: ['plans-search'],
    queryFn: async () => {
      const response = await fetch('/api/plans');
      const data = await response.json();
      return data.data || [];
    },
  });
}

export function useFrontendTasksSearch(
  options: Omit<UseAdvancedSearchOptions<any>, 'queryKey' | 'queryFn'> = {}
) {
  return useAdvancedSearch({
    ...options,
    queryKey: ['frontend-tasks-search'],
    queryFn: async () => {
      const response = await fetch('/api/admin/frontend-tasks');
      const data = await response.json();
      return data.data || [];
    },
  });
}

export function useProblemSolvingSearch(
  options: Omit<UseAdvancedSearchOptions<any>, 'queryKey' | 'queryFn'> = {}
) {
  return useAdvancedSearch({
    ...options,
    queryKey: ['problem-solving-search'],
    queryFn: async () => {
      const response = await fetch('/api/admin/problem-solving');
      const data = await response.json();
      return data.data || [];
    },
  });
}
