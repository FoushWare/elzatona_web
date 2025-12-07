"use client";

import React, { useState, useEffect } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from "nuqs";
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
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface AdvancedSearchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResultsChange?: (results: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFacetsChange?: (facets: any) => void;
  placeholder?: string;
  showFilters?: boolean;
  showFacets?: boolean;
  showSuggestions?: boolean;
  showAnalytics?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allCategories?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  placeholder = "Search questions, topics, categories...",
  showFilters = true,
  showFacets = true,
  showSuggestions = true,
  showAnalytics = true,
  className = "",
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
  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("all"),
  );

  console.log("🔍 Current category value:", category);
  console.log("🔍 Available categories:", allCategories);
  const [difficulty, setDifficulty] = useQueryState(
    "difficulty",
    parseAsString.withDefault("all"),
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsString.withDefault("all"),
  );
  const [isActive, setIsActive] = useQueryState(
    "active",
    parseAsString.withDefault("all"),
  );
  const [topic, setTopic] = useQueryState(
    "topic",
    parseAsString.withDefault("all"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(10));

  // Sync with parent pagination props
  useEffect(() => {
    if (onPageChange && currentPage !== undefined) {
      setPage(currentPage);
    }
  }, [currentPage, onPageChange, setPage]);

  useEffect(() => {
    if (onPageSizeChange && pageSize !== undefined) {
      setSize(pageSize);
    }
  }, [pageSize, onPageSizeChange, setSize]);
  const [selectedTopics, setSelectedTopics] = useQueryState(
    "topics",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [topicSearchQuery, setTopicSearchQuery] = useState("");
  const [internalTotalPages, setInternalTotalPages] = useState(1);
  // Server-side search - no need for client-side facets or suggestions

  // Perform actual search on real data
  const performSearch = async () => {
    console.log("🔍 performSearch called with current state:", {
      query,
      category,
      difficulty,
      type,
      isActive,
      topic,
      selectedTopics,
    });

    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Build search parameters for server-side search
      const searchParams = new URLSearchParams();

      // Add pagination
      searchParams.set("page", page.toString());
      searchParams.set("pageSize", size.toString());

      // Add search query
      if (query.trim()) {
        searchParams.set("search", query.trim());
      }

      // Add filters
      if (category !== "all") {
        console.log("🔍 Adding category to search params:", category);
        searchParams.set("category", category);
      } else {
        console.log("🔍 Category not added to search params:", category);
      }
      if (difficulty !== "all") {
        searchParams.set("difficulty", difficulty);
      }
      if (type !== "all") {
        searchParams.set("type", type);
      }
      if (isActive !== "all") {
        searchParams.set("isActive", isActive);
      }
      if (topic !== "all") {
        searchParams.set("topic", topic);
      }
      if (selectedTopics.length > 0) {
        searchParams.set("topics", selectedTopics.join(","));
      }

      // Make API call for server-side search
      const apiUrl = `/api/questions/unified?${searchParams.toString()}`;
      console.log("🔍 Making API call to:", apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const filteredQuestions = result.data || [];
      const totalCount = result.pagination?.totalCount || 0;

      const endTime = Date.now();
      setSearchTime(endTime - startTime);
      setIsLoading(false);

      // Update pagination info
      setInternalTotalPages(Math.ceil(totalCount / size));

      onResultsChange?.(filteredQuestions);
    } catch (error) {
      console.error("Search error:", error);
      setIsLoading(false);
      onResultsChange?.([]);
    }
  };

  // Remove automatic search - only search on submit
  // Auto-search when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch();
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
    page,
    size,
  ]);

  // Handle search submission
  const handleSearchSubmit = () => {
    performSearch();
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    // Prevent undefined values from being set
    if (value === "undefined" || value === undefined) {
      return;
    }

    switch (key) {
      case "category":
        setCategory(value);
        break;
      case "difficulty":
        setDifficulty(value);
        break;
      case "type":
        setType(value);
        break;
      case "isActive":
        setIsActive(value);
        break;
      case "topic":
        setTopic(value);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setQuery("");
    setTopicSearchQuery("");
    setCategory("all");
    setDifficulty("all");
    setType("all");
    setIsActive("all");
    setTopic("all");
    setSelectedTopics([]);
    setPage(1); // Reset to first page when clearing filters
    onPageChange?.(1); // Also reset parent pagination
  };

  const clearSearch = () => {
    setQuery("");

    // Check if there are any active filters
    const hasActiveFilters = [
      category,
      difficulty,
      type,
      isActive,
      topic,
      ...selectedTopics,
    ].some((f) => f !== "all" && f !== "");

    if (hasActiveFilters) {
      // If there are active filters, perform search to maintain filter state
      performSearch();
    } else {
      // If no active filters, fetch original paginated data
      fetchOriginalData();
    }
  };

  const fetchOriginalData = async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      // Build parameters for original paginated data (no search, no filters)
      const searchParams = new URLSearchParams();
      searchParams.set("page", page.toString());
      searchParams.set("pageSize", size.toString());

      // Make API call for original paginated data
      const response = await fetch(
        `/api/questions/unified?${searchParams.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const questions = result.data || [];
      const totalCount = result.pagination?.totalCount || 0;

      const endTime = Date.now();
      setSearchTime(endTime - startTime);
      setIsLoading(false);

      // Update pagination info
      setInternalTotalPages(Math.ceil(totalCount / size));

      // Restore original data
      onResultsChange?.(questions);
    } catch (error) {
      console.error("Error fetching original data:", error);
      setIsLoading(false);
      onResultsChange?.([]);
    }
  };

  const activeFilterCount = [
    category,
    difficulty,
    type,
    isActive,
    topic,
    ...selectedTopics,
  ].filter((f) => f !== "all" && f !== "").length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-32" // Increased padding to accommodate both buttons
        />
        {/* Clear Search Button */}
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-24 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-500" />
          </Button>
        )}
        {/* Search Submit Button */}
        <Button
          onClick={handleSearchSubmit}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3"
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
        {/* Clear All Filters Button */}
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="absolute right-32 top-1/2 transform -translate-y-1/2 h-6 px-2"
          >
            <X className="w-3 h-3 mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="space-y-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full inline-flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Advanced Filters</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount}</Badge>
              )}
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
            />
          </button>

          {showAdvancedFilters && (
            <Card className="mt-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filter Options</CardTitle>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All Filters ({activeFilterCount})
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Category</Label>
                      {category !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCategory("all")}
                          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={category}
                      onValueChange={(value) => {
                        handleFilterChange("category", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {allCategories
                          .filter((category) => {
                            const isValid =
                              category &&
                              category.id &&
                              category.name &&
                              category.id !== "undefined";
                            return isValid;
                          })
                          .map((category) => {
                            return (
                              <SelectItem
                                key={category.id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Difficulty</Label>
                      {difficulty !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDifficulty("all")}
                          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={difficulty}
                      onValueChange={(value) =>
                        handleFilterChange("difficulty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Type</Label>
                      {type !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setType("all")}
                          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={type}
                      onValueChange={(value) =>
                        handleFilterChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="multiple-choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="open-ended">Open Ended</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Status</Label>
                      {isActive !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsActive("all")}
                          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={isActive}
                      onValueChange={(value) =>
                        handleFilterChange("isActive", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="inactive">Inactive Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Topics Filter with Search */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Topic</Label>
                      {topic !== "all" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setTopic("all")}
                          className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={topic}
                      onValueChange={(value) =>
                        handleFilterChange("topic", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Topics" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <Input
                            placeholder="Search topics..."
                            value={topicSearchQuery}
                            onChange={(e) =>
                              setTopicSearchQuery(e.target.value)
                            }
                            className="mb-2"
                          />
                        </div>
                        <SelectItem value="all">All Topics</SelectItem>
                        {allTopics
                          .filter((topic) =>
                            topic.name
                              ?.toLowerCase()
                              .includes(topicSearchQuery.toLowerCase()),
                          )
                          .map((topic) => (
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
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{" "}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
            questions
          </div>
          <div className="flex items-center space-x-4">
            {/* Per Page Select */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Show:
              </span>
              <Select
                value={size.toString()}
                onValueChange={(value) => {
                  const newSize = parseInt(value);
                  setSize(newSize);
                  onPageSizeChange?.(newSize);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = page - 1;
                  setPage(newPage);
                  onPageChange?.(newPage);
                }}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {internalTotalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  onPageChange?.(newPage);
                }}
                disabled={page >= internalTotalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  {totalCount} results found
                </span>
              </div>
              {searchTime > 0 && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
