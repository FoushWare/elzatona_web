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
  selectedCategory: string;
  selectedTopic: string;
  categoriesData: { data?: Array<{ id: string; name: string }> } | null;
  topicsData: { data?: Array<{ id: string; name: string }> } | null;
  onCategoryChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FiltersCard: React.FC<FiltersCardProps> = ({
  selectedCategory,
  selectedTopic,
  categoriesData,
  topicsData,
  onCategoryChange,
  onTopicChange,
  onClearFilters,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>Filter Questions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full sm:w-auto">
            <Label
              htmlFor="category-filter"
              className="text-sm font-medium mb-2 block"
            >
              Filter by Category
            </Label>
            {categoriesData?.data && categoriesData.data.length > 0 ? (
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger
                  id="category-filter"
                  className="w-full sm:w-[200px]"
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categoriesData.data.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-gray-500">
                No categories available
              </div>
            )}
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <Label
              htmlFor="topic-filter"
              className="text-sm font-medium mb-2 block"
            >
              Filter by Topic
            </Label>
            {topicsData?.data && topicsData.data.length > 0 ? (
              <Select value={selectedTopic} onValueChange={onTopicChange}>
                <SelectTrigger
                  id="topic-filter"
                  className="w-full sm:w-[200px]"
                >
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Topics</SelectItem>
                  {topicsData.data.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-gray-500">No topics available</div>
            )}
          </div>
          {(selectedCategory || selectedTopic) && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FiltersCard;
