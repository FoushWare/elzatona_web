/**
 * Advanced Search Component
 * A comprehensive search interface with filters, facets, and suggestions
 */

'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  Search,
  Filter,
  X,
  ChevronDown,
  Loader2,
  TrendingUp,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { SearchFilters } from '@/lib/advanced-search-service';

interface AdvancedSearchProps {
  onResultsChange?: (results: any[]) => void;
  onFacetsChange?: (facets: any) => void;
  placeholder?: string;
  showFilters?: boolean;
  showFacets?: boolean;
  showSuggestions?: boolean;
  showAnalytics?: boolean;
  className?: string;
}

export function AdvancedSearch({
  onResultsChange,
  onFacetsChange,
  placeholder = 'Search questions, topics, categories...',
  showFilters = true,
  showFacets = true,
  showSuggestions = true,
  showAnalytics = true,
  className = '',
}: AdvancedSearchProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const {
    query,
    setQuery,
    filters,
    setFilters,
    data,
    totalCount,
    facets,
    suggestions,
    isLoading,
    isError,
    error,
    searchTime,
    addFilter,
    removeFilter,
    clearFilters,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    searchAnalytics,
    isLoadingAnalytics,
  } = useAdvancedSearch(
    {},
    {},
    {
      enableSuggestions: showSuggestions,
      enableAnalytics: showAnalytics,
    }
  );

  // Notify parent components of changes
  useEffect(() => {
    if (onResultsChange && data) {
      onResultsChange(data);
    }
  }, [data, onResultsChange]);

  useEffect(() => {
    if (onFacetsChange && facets) {
      onFacetsChange(facets);
    }
  }, [facets, onFacetsChange]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSelectedSuggestions(prev => [...prev, suggestion]);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    if (value === 'all' || value === '') {
      removeFilter(key);
    } else {
      addFilter(key, value);
    }
  };

  // Handle tag filter
  const handleTagFilter = (tag: string) => {
    const currentTags = filters.tags || [];
    if (currentTags.includes(tag)) {
      setFilters({
        ...filters,
        tags: currentTags.filter(t => t !== tag),
      });
    } else {
      setFilters({
        ...filters,
        tags: [...currentTags, tag],
      });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    clearFilters();
    setQuery('');
    setSelectedSuggestions([]);
  };

  // Get active filter count
  const activeFilterCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof SearchFilters];
    return (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      (Array.isArray(value) ? value.length > 0 : true)
    );
  }).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='pl-10 pr-20'
        />
        {isLoading && (
          <Loader2 className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400' />
        )}
        {activeFilterCount > 0 && (
          <Button
            variant='outline'
            size='sm'
            onClick={handleClearFilters}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 h-6 px-2'
          >
            <X className='w-3 h-3 mr-1' />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2 mb-3'>
              <TrendingUp className='w-4 h-4 text-blue-500' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Suggestions
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {suggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900'
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <Collapsible
          open={showAdvancedFilters}
          onOpenChange={setShowAdvancedFilters}
        >
          <CollapsibleTrigger asChild>
            <Button variant='outline' className='w-full justify-between'>
              <div className='flex items-center space-x-2'>
                <Filter className='w-4 h-4' />
                <span>Advanced Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant='secondary'>{activeFilterCount}</Badge>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className='mt-2'>
              <CardContent className='p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {/* Category Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Category</Label>
                    <Select
                      value={filters.category || 'all'}
                      onValueChange={value =>
                        handleFilterChange('category', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Categories' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Categories</SelectItem>
                        {Object.keys(facets.categories || {}).map(category => (
                          <SelectItem key={category} value={category}>
                            {category} ({facets.categories[category]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Difficulty</Label>
                    <Select
                      value={filters.difficulty || 'all'}
                      onValueChange={value =>
                        handleFilterChange('difficulty', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Difficulties' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Difficulties</SelectItem>
                        {Object.keys(facets.difficulties || {}).map(
                          difficulty => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty} ({facets.difficulties[difficulty]})
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Type</Label>
                    <Select
                      value={filters.type || 'all'}
                      onValueChange={value => handleFilterChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Types' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Types</SelectItem>
                        {Object.keys(facets.types || {}).map(type => (
                          <SelectItem key={type} value={type}>
                            {type} ({facets.types[type]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Learning Card Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Learning Card</Label>
                    <Select
                      value={filters.learningCardId || 'all'}
                      onValueChange={value =>
                        handleFilterChange('learningCardId', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Learning Cards' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Learning Cards</SelectItem>
                        {Object.keys(facets.learningCards || {}).map(cardId => (
                          <SelectItem key={cardId} value={cardId}>
                            {cardId} ({facets.learningCards[cardId]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Active Status Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Status</Label>
                    <Select
                      value={
                        filters.isActive === undefined
                          ? 'all'
                          : filters.isActive
                            ? 'active'
                            : 'inactive'
                      }
                      onValueChange={value => {
                        if (value === 'all') {
                          removeFilter('isActive');
                        } else {
                          addFilter('isActive', value === 'active');
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Status</SelectItem>
                        <SelectItem value='active'>Active Only</SelectItem>
                        <SelectItem value='inactive'>Inactive Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Points Range Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Points Range</Label>
                    <div className='flex space-x-2'>
                      <Input
                        type='number'
                        placeholder='Min'
                        value={filters.pointsRange?.min || ''}
                        onChange={e => {
                          const min = e.target.value
                            ? parseInt(e.target.value)
                            : undefined;
                          setFilters({
                            ...filters,
                            pointsRange: {
                              min: min || 0,
                              max: filters.pointsRange?.max || 100,
                            },
                          });
                        }}
                      />
                      <Input
                        type='number'
                        placeholder='Max'
                        value={filters.pointsRange?.max || ''}
                        onChange={e => {
                          const max = e.target.value
                            ? parseInt(e.target.value)
                            : undefined;
                          setFilters({
                            ...filters,
                            pointsRange: {
                              min: filters.pointsRange?.min || 0,
                              max: max || 100,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Search Facets */}
      {showFacets && Object.keys(facets).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Filter by Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Object.keys(facets.tags || {}).map(tag => (
                <div key={tag} className='flex items-center space-x-2'>
                  <Checkbox
                    id={tag}
                    checked={filters.tags?.includes(tag) || false}
                    onCheckedChange={() => handleTagFilter(tag)}
                  />
                  <Label
                    htmlFor={tag}
                    className='flex items-center space-x-2 cursor-pointer'
                  >
                    <span>{tag}</span>
                    <Badge variant='secondary'>{facets.tags[tag]}</Badge>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Summary */}
      {data && (
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <BarChart3 className='w-4 h-4 text-green-500' />
                  <span className='text-sm font-medium'>
                    {totalCount} results found
                  </span>
                </div>
                {searchTime > 0 && (
                  <div className='flex items-center space-x-2'>
                    <Clock className='w-4 h-4 text-blue-500' />
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      {searchTime}ms
                    </span>
                  </div>
                )}
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>
                  Page {currentPage} of {totalPages}
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={value => setPageSize(parseInt(value))}
                >
                  <SelectTrigger className='w-20'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='10'>10</SelectItem>
                    <SelectItem value='25'>25</SelectItem>
                    <SelectItem value='50'>50</SelectItem>
                    <SelectItem value='100'>100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className='border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900'>
          <CardContent className='p-4'>
            <div className='text-red-700 dark:text-red-300'>
              <p className='font-medium'>Search Error</p>
              <p className='text-sm'>
                {error?.message || 'An error occurred while searching'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Analytics */}
      {showAnalytics && searchAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Search Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {searchAnalytics.searchPerformance?.totalSearches || 0}
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Total Searches
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {searchAnalytics.searchPerformance?.averageResponseTime || 0}
                  ms
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Avg Response Time
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {Math.round(
                    searchAnalytics.searchPerformance?.cacheHitRate || 0
                  )}
                  %
                </div>
                <div className='text-sm text-gray-600 dark:text-gray-400'>
                  Cache Hit Rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
