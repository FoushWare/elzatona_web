"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
} from "../../components/ui";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  color?: string;
  icon?: string;
  order_index?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CategoriesManagerProps {
  categories: Category[];
  onCreateCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
  defaultExpanded?: boolean;
  itemsPerPage?: number;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  onCreateCategory,
  onEditCategory,
  onDeleteCategory,
  defaultExpanded = false,
  itemsPerPage = 9,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const lower = searchTerm.toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(lower) ||
        category.description?.toLowerCase().includes(lower),
    );
  }, [categories, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-green-600" />
            ) : (
              <ChevronRight className="h-5 w-5 text-green-600" />
            )}
            <CardTitle className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-green-600" />
              <span>Categories Management</span>
              <span className="text-sm font-normal text-gray-500">
                ({categories.length} categories)
              </span>
            </CardTitle>
          </button>
          {isExpanded && (
            <Button
              onClick={onCreateCategory}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Category
            </Button>
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories List */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first category to get started"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={onCreateCategory}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Category
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800"
                    style={{
                      borderLeftWidth: "4px",
                      borderLeftColor: category.color || "#10b981",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {category.icon && (
                          <span className="text-2xl">{category.icon}</span>
                        )}
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditCategory(category)}
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteCategory(category)}
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {category.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      {category.slug && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Slug: {category.slug}
                        </p>
                      )}
                      {category.is_active !== undefined && (
                        <Badge
                          variant={category.is_active ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {category.is_active ? "Active" : "Inactive"}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredCategories.length)} of{" "}
                    {filteredCategories.length} categories
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="h-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="h-8 w-8 p-0"
                          >
                            {page}
                          </Button>
                        ),
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8"
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};
