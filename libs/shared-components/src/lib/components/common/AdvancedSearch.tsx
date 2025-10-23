'use client';

import React, { useState, useEffect } from 'react';
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from 'nuqs';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  TrendingUp,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface AdvancedSearchProps {
  onResultsChange?: (results: any[]) => void;
  onFacetsChange?: (facets: any) => void;
  placeholder?: string;
  showFilters?: boolean;
  showFacets?: boolean;
  showSuggestions?: boolean;
  showAnalytics?: boolean;
  className?: string;
  allQuestions?: any[];
  allCategories?: any[];
  allTopics?: any[];
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
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
  allQuestions = [],
  allCategories = [],
  allTopics = [],
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: AdvancedSearchProps) {
  // URL state management with nuqs
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''));
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all')
  );
  const [difficulty, setDifficulty] = useQueryState(
    'difficulty',
    parseAsString.withDefault('all')
  );
  const [type, setType] = useQueryState(
    'type',
    parseAsString.withDefault('all')
  );
  const [isActive, setIsActive] = useQueryState(
    'active',
    parseAsString.withDefault('all')
  );
  const [topic, setTopic] = useQueryState(
    'topic',
    parseAsString.withDefault('all')
  );
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [size, setSize] = useQueryState('size', parseAsInteger.withDefault(10));
  const [selectedTopics, setSelectedTopics] = useQueryState(
    'topics',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [topicSearchQuery, setTopicSearchQuery] = useState('');
  const [actualFacets, setActualFacets] = useState({
    categories: {} as Record<string, number>,
    difficulties: {} as Record<string, number>,
    types: {} as Record<string, number>,
    tags: {} as Record<string, number>,
  });

  // Generate facets from actual data
  useEffect(() => {
    if (allQuestions.length > 0) {
      const facets = {
        categories: {} as Record<string, number>,
        difficulties: {} as Record<string, number>,
        types: {} as Record<string, number>,
        tags: {} as Record<string, number>,
      };

      allQuestions.forEach(question => {
        // Count categories
        if (question.category) {
          facets.categories[question.category] =
            (facets.categories[question.category] || 0) + 1;
        }

        // Count difficulties
        if (question.difficulty) {
          facets.difficulties[question.difficulty] =
            (facets.difficulties[question.difficulty] || 0) + 1;
        }

        // Count types
        if (question.type) {
          facets.types[question.type] = (facets.types[question.type] || 0) + 1;
        }

        // Count tags
        if (question.tags && Array.isArray(question.tags)) {
          question.tags.forEach(tag => {
            facets.tags[tag] = (facets.tags[tag] || 0) + 1;
          });
        }
      });

      setActualFacets(facets);
      onFacetsChange?.(facets);
    }
  }, [allQuestions, onFacetsChange]);

  // Generate suggestions from actual data
  const actualSuggestions = React.useMemo(() => {
    const suggestions = new Set<string>();

    allQuestions.forEach(question => {
      // Add category names
      if (question.category) {
        suggestions.add(question.category);
      }

      // Add tags
      if (question.tags && Array.isArray(question.tags)) {
        question.tags.forEach(tag => {
          suggestions.add(tag);
        });
      }

      // Add words from titles
      if (question.title) {
        const words = question.title.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 3) {
            suggestions.add(word);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 10);
  }, [allQuestions]);

  // Perform actual search on real data
  const performSearch = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    // Filter questions based on query and filters
    let filteredQuestions = allQuestions;

    // Text search
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filteredQuestions = filteredQuestions.filter(
        question =>
          question.title?.toLowerCase().includes(searchTerm) ||
          question.content?.toLowerCase().includes(searchTerm) ||
          question.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          question.category?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply filters using nuqs state
    if (category !== 'all') {
      filteredQuestions = filteredQuestions.filter(
        question => question.category === category
      );
    }

    if (difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(
        question => question.difficulty === difficulty
      );
    }

    if (type !== 'all') {
      filteredQuestions = filteredQuestions.filter(
        question => question.type === type
      );
    }

    if (isActive !== 'all') {
      const isActiveFilter = isActive === 'true';
      filteredQuestions = filteredQuestions.filter(
        question => question.isActive === isActiveFilter
      );
    }

    if (topic !== 'all') {
      filteredQuestions = filteredQuestions.filter(question =>
        question.topics?.some(t => t.name === topic)
      );
    }

    // Apply selected topics filter
    if (selectedTopics.length > 0) {
      filteredQuestions = filteredQuestions.filter(question =>
        question.topics?.some(t => selectedTopics.includes(t.name))
      );
    }

    const endTime = Date.now();
    setSearchTime(endTime - startTime);
    setIsLoading(false);

    onResultsChange?.(filteredQuestions);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (allQuestions.length > 0) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    query,
    category,
    difficulty,
    type,
    isActive,
    topic,
    selectedTopics,
    allQuestions,
  ]);

  const handleFilterChange = (key: string, value: string) => {
    switch (key) {
      case 'category':
        setCategory(value);
        break;
      case 'difficulty':
        setDifficulty(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'isActive':
        setIsActive(value);
        break;
      case 'topic':
        setTopic(value);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setQuery('');
    setTopicSearchQuery('');
    setCategory('all');
    setDifficulty('all');
    setType('all');
    setIsActive('all');
    setTopic('all');
    setSelectedTopics([]);
  };

  const activeFilterCount = [
    category,
    difficulty,
    type,
    isActive,
    topic,
    ...selectedTopics,
  ].filter(f => f !== 'all' && f !== '').length;

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
            onClick={clearFilters}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 h-6 px-2'
          >
            <X className='w-3 h-3 mr-1' />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className='space-y-2'>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className='w-full inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer'
          >
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
          </button>

          {showAdvancedFilters && (
            <Card className='mt-2'>
              <CardContent className='p-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {/* Category Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder='All Categories' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Categories</SelectItem>
                        {Object.keys(actualFacets.categories).map(category => (
                          <SelectItem key={category} value={category}>
                            {category} ({actualFacets.categories[category]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder='All Difficulties' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Difficulties</SelectItem>
                        {Object.keys(actualFacets.difficulties).map(
                          difficulty => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty} (
                              {actualFacets.difficulties[difficulty]})
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger>
                        <SelectValue placeholder='All Types' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Types</SelectItem>
                        {Object.keys(actualFacets.types).map(type => (
                          <SelectItem key={type} value={type}>
                            {type} ({actualFacets.types[type]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Status</Label>
                    <Select value={isActive} onValueChange={setIsActive}>
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

                  {/* Topics Filter with Search */}
                  <div>
                    <Label className='text-sm font-medium'>Topic</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder='All Topics' />
                      </SelectTrigger>
                      <SelectContent>
                        <div className='p-2'>
                          <Input
                            placeholder='Search topics...'
                            value={topicSearchQuery}
                            onChange={e => setTopicSearchQuery(e.target.value)}
                            className='mb-2'
                          />
                        </div>
                        <SelectItem value='all'>All Topics</SelectItem>
                        {allTopics
                          .filter(topic =>
                            topic.name
                              ?.toLowerCase()
                              .includes(topicSearchQuery.toLowerCase())
                          )
                          .map(topic => (
                            <SelectItem key={topic.id} value={topic.id}>
                              {topic.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Pagination Before Results Summary */}
      {totalCount > 0 && (
        <div className='flex items-center justify-between'>
          <div className='text-sm text-gray-700 dark:text-gray-300'>
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{' '}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{' '}
            questions
          </div>
          <div className='flex items-center space-x-4'>
            {/* Per Page Select */}
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Show:
              </span>
              <Select
                value={size.toString()}
                onValueChange={value => setSize(parseInt(value))}
              >
                <SelectTrigger className='w-20'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='5'>5</SelectItem>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                  <SelectItem value='100'>100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Navigation Buttons */}
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                Page {page} of {totalPages}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
