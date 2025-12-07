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
} from "@elzatona/components";
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
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categoriesData.data.map(
                    (category: { id: string; name: string }) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            ) : (
              <Select disabled>
                <SelectTrigger
                  id="category-filter"
                  className="w-full sm:w-[200px]"
                >
                  <SelectValue placeholder="Loading categories..." />
                </SelectTrigger>
              </Select>
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
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Topics</SelectItem>
                  {topicsData.data.map(
                    (topic: { id: string; name: string }) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            ) : (
              <Select disabled>
                <SelectTrigger
                  id="topic-filter"
                  className="w-full sm:w-[200px]"
                >
                  <SelectValue placeholder="Loading topics..." />
                </SelectTrigger>
              </Select>
            )}
          </div>
          {(selectedCategory || selectedTopic) && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
