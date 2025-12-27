"use client";

import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@elzatona/common-ui";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Target,
  Search,
  X,
} from "lucide-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

interface Topic {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly category_id?: string;
}

interface Category {
  readonly id: string;
  readonly name?: string;
}

interface TopicsListProps {
  readonly topics: readonly Topic[];
  readonly filteredTopics: readonly Topic[];
  readonly categories: readonly Category[];
  readonly isLoading: boolean;
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly selectedCategoryFilter: string | null;
  readonly onCategoryFilterChange: (value: string | null) => void;
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onAdd: () => void;
  readonly onEdit: (topic: Topic) => void;
  readonly onDelete: (topic: Topic) => void;
}

/**
 * TopicsList Component
 * Displays a collapsible list of topics with search, category filter, and CRUD operations
 */
export function TopicsList({
  topics,
  filteredTopics,
  categories,
  isLoading,
  searchTerm,
  onSearchChange,
  selectedCategoryFilter,
  onCategoryFilterChange,
  isOpen,
  onOpenChange,
  onAdd,
  onEdit,
  onDelete,
}: TopicsListProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Card className="bg-white dark:bg-gray-800">
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <CollapsibleTrigger className="flex items-center gap-2 text-left">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                  <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  Topics ({filteredTopics.length}
                  {(searchTerm || selectedCategoryFilter) &&
                    ` / ${topics.length}`}
                  )
                </CardTitle>
              </CollapsibleTrigger>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {/* Category Filter */}
            <div className="mb-3" onClick={(e) => e.stopPropagation()}>
              <Suspense fallback={<LoadingSkeleton />}>
                <Select
                  value={selectedCategoryFilter || "all"}
                  onValueChange={(value) =>
                    onCategoryFilterChange(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name || "Unnamed Category"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Suspense>
            </div>
            {/* Search Input */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto"></div>
                </div>
              ) : filteredTopics.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>
                    {searchTerm || selectedCategoryFilter
                      ? "No topics found"
                      : "No topics yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {topic.name || "Unnamed Topic"}
                        </p>
                        {topic.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                            {topic.description}
                          </p>
                        )}
                        {topic.category_id && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Category:{" "}
                            {categories.find((c) => c.id === topic.category_id)
                              ?.name || "Unknown"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(topic)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(topic)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </Suspense>
  );
}

export type TopicsListPropsType = TopicsListProps;
