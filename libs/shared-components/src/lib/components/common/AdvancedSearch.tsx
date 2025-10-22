'use client';

import React, { useState, useEffect } from 'react';
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
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

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
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    type: 'all',
    isActive: 'all',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  // Mock data for demonstration
  const mockFacets = {
    categories: {
      React: 150,
      JavaScript: 100,
      CSS: 50,
    },
    difficulties: {
      beginner: 120,
      intermediate: 150,
      advanced: 30,
    },
    types: {
      'multiple-choice': 200,
      'open-ended': 80,
      code: 20,
    },
    tags: {
      react: 50,
      hooks: 30,
      components: 40,
      state: 25,
    },
  };

  const mockSuggestions = [
    'React hooks',
    'JavaScript ES6',
    'CSS Grid',
    'TypeScript',
    'Node.js',
  ];

  // Simulate search
  const performSearch = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const endTime = Date.now();
    setSearchTime(endTime - startTime);
    setIsLoading(false);

    // Mock results - in real implementation, this would come from API
    const mockResults = Array.from({ length: 20 }, (_, i) => ({
      id: `question-${i + 1}`,
      title: `Sample Question ${i + 1}`,
      content: `This is the content for question ${i + 1}`,
      category: 'React',
      difficulty: ['beginner', 'intermediate', 'advanced'][i % 3],
      type: 'multiple-choice',
      isActive: true,
    }));

    onResultsChange?.(mockResults);
    onFacetsChange?.(mockFacets);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length > 2 || Object.values(filters).some(f => f !== 'all')) {
        performSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setQuery('');
    setFilters({
      category: 'all',
      difficulty: 'all',
      type: 'all',
      isActive: 'all',
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    f => f !== 'all'
  ).length;

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

      {/* Search Suggestions */}
      {showSuggestions && mockSuggestions.length > 0 && (
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2 mb-3'>
              <TrendingUp className='w-4 h-4 text-blue-500' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Suggestions
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {mockSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant='outline'
                  className='cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900'
                  onClick={() => setQuery(suggestion)}
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
                      value={filters.category}
                      onValueChange={value =>
                        handleFilterChange('category', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Categories' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Categories</SelectItem>
                        {Object.keys(mockFacets.categories).map(category => (
                          <SelectItem key={category} value={category}>
                            {category} ({mockFacets.categories[category]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Difficulty</Label>
                    <Select
                      value={filters.difficulty}
                      onValueChange={value =>
                        handleFilterChange('difficulty', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Difficulties' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Difficulties</SelectItem>
                        {Object.keys(mockFacets.difficulties).map(
                          difficulty => (
                            <SelectItem key={difficulty} value={difficulty}>
                              {difficulty} (
                              {mockFacets.difficulties[difficulty]})
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
                      value={filters.type}
                      onValueChange={value => handleFilterChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='All Types' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='all'>All Types</SelectItem>
                        {Object.keys(mockFacets.types).map(type => (
                          <SelectItem key={type} value={type}>
                            {type} ({mockFacets.types[type]})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <Label className='text-sm font-medium'>Status</Label>
                    <Select
                      value={filters.isActive}
                      onValueChange={value =>
                        handleFilterChange('isActive', value)
                      }
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
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Search Facets */}
      {showFacets && Object.keys(mockFacets.tags).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Filter by Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Object.keys(mockFacets.tags).map(tag => (
                <div key={tag} className='flex items-center space-x-2'>
                  <Checkbox id={tag} />
                  <Label
                    htmlFor={tag}
                    className='flex items-center space-x-2 cursor-pointer'
                  >
                    <span>{tag}</span>
                    <Badge variant='secondary'>{mockFacets.tags[tag]}</Badge>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Summary */}
      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <BarChart3 className='w-4 h-4 text-green-500' />
                <span className='text-sm font-medium'>20 results found</span>
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
