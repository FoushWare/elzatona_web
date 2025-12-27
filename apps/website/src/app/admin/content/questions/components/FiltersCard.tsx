"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/common-ui";
import { Filter, X } from "lucide-react";

interface FiltersCardProps {
  readonly selectedCategory: string;
  readonly selectedTopic: string;
  readonly selectedType: string;
  readonly selectedDifficulty: string;
  readonly selectedStatus: string;
  readonly categoriesData: any[];
  readonly topicsData: any[];
  readonly allTypes: string[];
  readonly onCategoryChange: (value: string) => void;
  readonly onTopicChange: (value: string) => void;
  readonly onTypeChange: (value: string) => void;
  readonly onDifficultyChange: (value: string) => void;
  readonly onStatusChange: (value: string) => void;
  readonly onClearFilters: () => void;
}

export const FiltersCard: React.FC<FiltersCardProps> = ({
  selectedCategory,
  selectedTopic,
  selectedType,
  selectedDifficulty,
  selectedStatus,
  categoriesData,
  topicsData,
  allTypes,
  onCategoryChange,
  onTopicChange,
  onTypeChange,
  onDifficultyChange,
  onStatusChange,
  onClearFilters,
}) => {
  // Filter topics by selected category
  const filteredTopics = React.useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") return topicsData;
    return topicsData.filter(
      (topic: any) => topic.category_id === selectedCategory,
    );
  }, [topicsData, selectedCategory]);

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== "all") ||
    (selectedTopic && selectedTopic !== "all") ||
    (selectedType && selectedType !== "all") ||
    (selectedDifficulty && selectedDifficulty !== "all") ||
    (selectedStatus && selectedStatus !== "all");

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>Filter Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Category Filter */}
          <div className="flex-1">
            <Label
              htmlFor="category-filter"
              className="text-sm font-medium mb-2 block"
            >
              Category
            </Label>
            {categoriesData && categoriesData.length > 0 ? (
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger id="category-filter" className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoriesData.map((category: any) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name || category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select>
                <SelectTrigger id="category-filter" disabled className="w-full">
                  <SelectValue placeholder="Loading..." />
                </SelectTrigger>
              </Select>
            )}
          </div>

          {/* Topic Filter */}
          <div className="flex-1">
            <Label
              htmlFor="topic-filter"
              className="text-sm font-medium mb-2 block"
            >
              Topic
            </Label>
            {filteredTopics && filteredTopics.length > 0 ? (
              <Select value={selectedTopic} onValueChange={onTopicChange}>
                <SelectTrigger id="topic-filter" className="w-full">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {filteredTopics.map((topic: any) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select>
                <SelectTrigger
                  id="topic-filter"
                  disabled={!selectedCategory}
                  className="w-full"
                >
                  <SelectValue
                    placeholder={
                      selectedCategory
                        ? "No topics found"
                        : "Select category first"
                    }
                  />
                </SelectTrigger>
              </Select>
            )}
          </div>

          {/* Type Filter */}
          <div className="flex-1">
            <Label
              htmlFor="type-filter"
              className="text-sm font-medium mb-2 block"
            >
              Type
            </Label>
            {allTypes && allTypes.length > 0 ? (
              <Select value={selectedType} onValueChange={onTypeChange}>
                <SelectTrigger id="type-filter" className="w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {allTypes.map((type: string) => (
                    <SelectItem key={type} value={type}>
                      {type
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select>
                <SelectTrigger id="type-filter" disabled className="w-full">
                  <SelectValue placeholder="No types available" />
                </SelectTrigger>
              </Select>
            )}
          </div>

          {/* Difficulty Filter */}
          <div className="flex-1">
            <Label
              htmlFor="difficulty-filter"
              className="text-sm font-medium mb-2 block"
            >
              Difficulty
            </Label>
            <Select
              value={selectedDifficulty}
              onValueChange={onDifficultyChange}
            >
              <SelectTrigger id="difficulty-filter" className="w-full">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex-1">
            <Label
              htmlFor="status-filter"
              className="text-sm font-medium mb-2 block"
            >
              Status
            </Label>
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
