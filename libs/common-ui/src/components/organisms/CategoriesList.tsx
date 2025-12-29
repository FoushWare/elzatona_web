"use client";

import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
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
  BookOpen,
  Search,
  X,
} from "lucide-react";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

interface Category {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
}

interface CategoriesListProps {
  readonly categories: readonly Category[];
  readonly filteredCategories: readonly Category[];
  readonly isLoading: boolean;
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly isOpen: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly onAdd: () => void;
  readonly onEdit: (category: Category) => void;
  readonly onDelete: (category: Category) => void;
}

/**
 * CategoriesList Component
 * Displays a collapsible list of categories with search and CRUD operations
 */
export function CategoriesList({
  categories,
  filteredCategories,
  isLoading,
  searchTerm,
  onSearchChange,
  isOpen,
  onOpenChange,
  onAdd,
  onEdit,
  onDelete,
}: CategoriesListProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Card className="bg-white dark:bg-gray-800">
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2 text-left flex-1">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {isOpen ? (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                  <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Categories ({filteredCategories.length}
                  {searchTerm && ` / ${categories.length}`})
                </CardTitle>
              </CollapsibleTrigger>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              {/* Search Input - Only visible when open */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search categories..."
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
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>
                    {searchTerm ? "No categories found" : "No categories yet"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {category.name || "Unnamed Category"}
                        </p>
                        {category.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(category)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(category)}
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

export type CategoriesListPropsType = CategoriesListProps;
