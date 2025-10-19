/**
 * Advanced Search Hook
 * Provides React integration for the advanced search service
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  advancedSearchService,
  SearchFilters,
  SearchOptions,
  SearchResult,
} from '@/lib/advanced-search-service';

export interface UseAdvancedSearchOptions {
  debounceMs?: number;
  enableSuggestions?: boolean;
  enableAnalytics?: boolean;
  cacheTime?: number;
  staleTime?: number;
}

export interface UseAdvancedSearchReturn<T> {
  // Search state
  query: string;
  setQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  options: SearchOptions;
  setOptions: (options: SearchOptions) => void;

  // Search results
  data: T[] | undefined;
  totalCount: number;
  facets: any;
  suggestions: string[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  searchTime: number;

  // Search actions
  search: (filters?: SearchFilters, options?: SearchOptions) => void;
  clearSearch: () => void;
  refresh: () => void;

  // Facet actions
  addFilter: (key: keyof SearchFilters, value: any) => void;
  removeFilter: (key: keyof SearchFilters) => void;
  clearFilters: () => void;

  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;

  // Analytics
  searchAnalytics: any;
  isLoadingAnalytics: boolean;
}

export function useAdvancedSearch<T = any>(
  initialFilters: SearchFilters = {},
  initialOptions: SearchOptions = {},
  hookOptions: UseAdvancedSearchOptions = {}
): UseAdvancedSearchReturn<T> {
  const {
    debounceMs = 300,
    enableSuggestions = true,
    enableAnalytics = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 1 * 60 * 1000, // 1 minute
  } = hookOptions;

  const queryClient = useQueryClient();

  // Search state
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [options, setOptions] = useState<SearchOptions>({
    page: 1,
    pageSize: 10,
    includeFacets: true,
    includeSuggestions: enableSuggestions,
    ...initialOptions,
  });

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Update filters when query changes
  useEffect(() => {
    if (debouncedQuery !== query) {
      setFilters(prev => ({ ...prev, query: debouncedQuery }));
    }
  }, [debouncedQuery, query]);

  // Search query
  const searchQuery = useQuery({
    queryKey: ['advanced-search', filters, options],
    queryFn: () => advancedSearchService.searchQuestions(filters, options),
    enabled: !!filters.query || Object.keys(filters).length > 0,
    gcTime: cacheTime,
    staleTime,
    retry: 2,
    retryDelay: 1000,
  });

  // Suggestions query
  const suggestionsQuery = useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => advancedSearchService.getSuggestions(query),
    enabled: enableSuggestions && query.length >= 2,
    gcTime: 10 * 60 * 1000, // 10 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Analytics query
  const analyticsQuery = useQuery({
    queryKey: ['search-analytics'],
    queryFn: () => advancedSearchService.getSearchAnalytics(),
    enabled: enableAnalytics,
    gcTime: 30 * 60 * 1000, // 30 minutes
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  // Search actions
  const search = useCallback(
    (newFilters?: SearchFilters, newOptions?: SearchOptions) => {
      if (newFilters) setFilters(newFilters);
      if (newOptions) setOptions(newOptions);
    },
    []
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setFilters({});
    setOptions({ page: 1, pageSize: 10 });
    queryClient.removeQueries({ queryKey: ['advanced-search'] });
  }, [queryClient]);

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['advanced-search'] });
  }, [queryClient]);

  // Facet actions
  const addFilter = useCallback((key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const removeFilter = useCallback((key: keyof SearchFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Pagination
  const currentPage = options.page || 1;
  const pageSize = options.pageSize || 10;
  const totalPages = Math.ceil((searchQuery.data?.totalCount || 0) / pageSize);

  const setCurrentPage = useCallback((page: number) => {
    setOptions(prev => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setOptions(prev => ({ ...prev, pageSize: size, page: 1 }));
  }, []);

  // Save search query for analytics
  useEffect(() => {
    if (searchQuery.data && enableAnalytics) {
      advancedSearchService.saveSearchQuery(
        query,
        filters,
        searchQuery.data.totalCount
      );
    }
  }, [searchQuery.data, query, filters, enableAnalytics]);

  // Computed values
  const data = searchQuery.data?.data;
  const totalCount = searchQuery.data?.totalCount || 0;
  const facets = searchQuery.data?.facets || {};
  const suggestions = suggestionsQuery.data || [];
  const searchTime = searchQuery.data?.searchTime || 0;

  return {
    // Search state
    query,
    setQuery,
    filters,
    setFilters,
    options,
    setOptions,

    // Search results
    data,
    totalCount,
    facets,
    suggestions,
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError,
    error: searchQuery.error,
    searchTime,

    // Search actions
    search,
    clearSearch,
    refresh,

    // Facet actions
    addFilter,
    removeFilter,
    clearFilters,

    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,

    // Analytics
    searchAnalytics: analyticsQuery.data,
    isLoadingAnalytics: analyticsQuery.isLoading,
  };
}

/**
 * Hook for global search across all content types
 */
export function useGlobalSearch(
  initialFilters: SearchFilters = {},
  initialOptions: SearchOptions = {},
  hookOptions: UseAdvancedSearchOptions = {}
) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [options, setOptions] = useState<SearchOptions>({
    page: 1,
    pageSize: 10,
    includeFacets: true,
    includeSuggestions: true,
    ...initialOptions,
  });

  const globalSearchQuery = useQuery({
    queryKey: ['global-search', filters, options],
    queryFn: () => advancedSearchService.searchAll(filters, options),
    enabled: !!filters.query || Object.keys(filters).length > 0,
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });

  const search = useCallback(
    (newFilters?: SearchFilters, newOptions?: SearchOptions) => {
      if (newFilters) setFilters(newFilters);
      if (newOptions) setOptions(newOptions);
    },
    []
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setFilters({});
    setOptions({ page: 1, pageSize: 10 });
  }, []);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    options,
    setOptions,
    data: globalSearchQuery.data,
    isLoading: globalSearchQuery.isLoading,
    isError: globalSearchQuery.isError,
    error: globalSearchQuery.error,
    search,
    clearSearch,
    refresh: () => globalSearchQuery.refetch(),
  };
}

/**
 * Hook for search suggestions
 */
export function useSearchSuggestions(query: string, limit: number = 10) {
  return useQuery({
    queryKey: ['search-suggestions', query, limit],
    queryFn: () => advancedSearchService.getSuggestions(query, limit),
    enabled: query.length >= 2,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook for search analytics
 */
export function useSearchAnalytics() {
  return useQuery({
    queryKey: ['search-analytics'],
    queryFn: () => advancedSearchService.getSearchAnalytics(),
    gcTime: 30 * 60 * 1000,
    staleTime: 15 * 60 * 1000,
  });
}
