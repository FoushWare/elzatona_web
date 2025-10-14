// Advanced Search Component
// A comprehensive search interface with filters, suggestions, and real-time results

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Loader2,
  Calendar,
  Tag,
  Hash,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { SearchFilters } from '@/lib/advanced-search-service';

export interface AdvancedSearchProps {
  // Search state
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;

  // Search options
  placeholder?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  showStats?: boolean;

  // Available options for filters
  availableCategories?: string[];
  availableTopics?: string[];
  availableTags?: string[];
  availableDifficulties?: string[];
  availableCardTypes?: string[];
  availableLearningPaths?: string[];

  // Search stats
  totalItems?: number;
  activeItems?: number;

  // Loading state
  isLoading?: boolean;

  // Suggestions
  suggestions?: string[];

  // Custom filter components
  customFilters?: React.ReactNode;
}

export default function AdvancedSearch({
  searchTerm,
  onSearchTermChange,
  filters,
  onFiltersChange,
  placeholder = 'Search...',
  showFilters = true,
  showSuggestions = true,
  showStats = true,
  availableCategories = [],
  availableTopics = [],
  availableTags = [],
  availableDifficulties = ['easy', 'medium', 'hard', 'intermediate'],
  availableCardTypes = [],
  availableLearningPaths = [],
  totalItems = 0,
  activeItems = 0,
  isLoading = false,
  suggestions = [],
  customFilters,
}: AdvancedSearchProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    filters.tags || []
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update selected tags when filters change
  useEffect(() => {
    setSelectedTags(filters.tags || []);
  }, [filters.tags]);

  // Handle search term change
  const handleSearchChange = (value: string) => {
    onSearchTermChange(value);
    setIsSuggestionsOpen(value.length > 0 && showSuggestions);
  };

  // Handle filter change
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ [key]: value });
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    handleFilterChange('tags', newTags.length > 0 ? newTags : undefined);
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFiltersChange({
      difficulty: undefined,
      category: undefined,
      topic: undefined,
      cardType: undefined,
      learningPath: undefined,
      tags: undefined,
      isActive: undefined,
      isComplete: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      sortBy: undefined,
      sortDirection: undefined,
    });
    setSelectedTags([]);
  };

  // Get active filter count
  const activeFilterCount = [
    filters.difficulty,
    filters.category,
    filters.topic,
    filters.cardType,
    filters.learningPath,
    filters.tags?.length,
    filters.isActive,
    filters.isComplete,
    filters.dateFrom,
    filters.dateTo,
    filters.sortBy,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={e => handleSearchChange(e.target.value)}
            className="pl-10 pr-20"
            onFocus={() =>
              setIsSuggestionsOpen(searchTerm.length > 0 && showSuggestions)
            }
            onBlur={() => setTimeout(() => setIsSuggestionsOpen(false), 200)}
          />
          {isLoading && (
            <Loader2 className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
          )}
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => handleSearchChange('')}
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>

        {/* Search Suggestions */}
        {isSuggestionsOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Suggestions:
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    handleSearchChange(suggestion);
                    setIsSuggestionsOpen(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Toggle Button */}
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Search Filters</h4>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Difficulty</Label>
                  <Select
                    value={filters.difficulty || 'all'}
                    onValueChange={value =>
                      handleFilterChange(
                        'difficulty',
                        value === 'all' ? undefined : value
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      {availableDifficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty.charAt(0).toUpperCase() +
                            difficulty.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                {availableCategories.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category</Label>
                    <Select
                      value={filters.category || 'all'}
                      onValueChange={value =>
                        handleFilterChange(
                          'category',
                          value === 'all' ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {availableCategories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Topic Filter */}
                {availableTopics.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Topic</Label>
                    <Select
                      value={filters.topic || 'all'}
                      onValueChange={value =>
                        handleFilterChange(
                          'topic',
                          value === 'all' ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Topics</SelectItem>
                        {availableTopics.map(topic => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Card Type Filter */}
                {availableCardTypes.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Card Type</Label>
                    <Select
                      value={filters.cardType || 'all'}
                      onValueChange={value =>
                        handleFilterChange(
                          'cardType',
                          value === 'all' ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select card type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Card Types</SelectItem>
                        {availableCardTypes.map(cardType => (
                          <SelectItem key={cardType} value={cardType}>
                            {cardType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Learning Path Filter */}
                {availableLearningPaths.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Learning Path</Label>
                    <Select
                      value={filters.learningPath || 'all'}
                      onValueChange={value =>
                        handleFilterChange(
                          'learningPath',
                          value === 'all' ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning path" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Learning Paths</SelectItem>
                        {availableLearningPaths.map(path => (
                          <SelectItem key={path} value={path}>
                            {path}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Tags Filter */}
                {availableTags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {availableTags.map(tag => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => handleTagToggle(tag)}
                          />
                          <Label htmlFor={tag} className="text-sm">
                            {tag}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Filters */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="active"
                        checked={filters.isActive === true}
                        onCheckedChange={checked =>
                          handleFilterChange(
                            'isActive',
                            checked ? true : undefined
                          )
                        }
                      />
                      <Label htmlFor="active" className="text-sm">
                        Active only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="complete"
                        checked={filters.isComplete === true}
                        onCheckedChange={checked =>
                          handleFilterChange(
                            'isComplete',
                            checked ? true : undefined
                          )
                        }
                      />
                      <Label htmlFor="complete" className="text-sm">
                        Completed only
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort By</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={filters.sortBy || 'relevance'}
                      onValueChange={value =>
                        handleFilterChange('sortBy', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="createdAt">Date Created</SelectItem>
                        <SelectItem value="updatedAt">Last Updated</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={filters.sortDirection || 'desc'}
                      onValueChange={value =>
                        handleFilterChange('sortDirection', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Custom Filters */}
                {customFilters}
              </div>
            </PopoverContent>
          </Popover>

          {/* Active Filter Badges */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-1">
              {filters.difficulty && (
                <Badge variant="secondary" className="text-xs">
                  Difficulty: {filters.difficulty}
                  <button
                    onClick={() => handleFilterChange('difficulty', undefined)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="text-xs">
                  Category: {filters.category}
                  <button
                    onClick={() => handleFilterChange('category', undefined)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.topic && (
                <Badge variant="secondary" className="text-xs">
                  Topic: {filters.topic}
                  <button
                    onClick={() => handleFilterChange('topic', undefined)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.tags && filters.tags.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Tags: {filters.tags.length}
                  <button
                    onClick={() => handleFilterChange('tags', undefined)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search Stats */}
      {showStats && (
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Total: {totalItems}</span>
          <span>Active: {activeItems}</span>
          {isLoading && (
            <span className="flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Searching...
            </span>
          )}
        </div>
      )}
    </div>
  );
}
