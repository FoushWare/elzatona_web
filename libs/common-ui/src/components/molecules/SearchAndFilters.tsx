"use client";

import React, { Suspense } from "react";
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/common-ui";

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

interface SearchAndFiltersProps {
  readonly searchTerm: string;
  readonly onSearchChange: (value: string) => void;
  readonly filterCardType: string;
  readonly onFilterChange: (value: string) => void;
}

/**
 * SearchAndFilters Component
 * Search input and card type filter for content management
 */
export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  filterCardType,
  onFilterChange,
}: SearchAndFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Suspense fallback={<LoadingSkeleton />}>
          <Input
            placeholder="Search cards, plans, categories, topics..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            className="w-full"
          />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <Select value={filterCardType} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by card type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Card Types</SelectItem>
            <SelectItem value="Core Technologies">Core Technologies</SelectItem>
            <SelectItem value="Framework Questions">
              Framework Questions
            </SelectItem>
            <SelectItem value="Problem Solving">Problem Solving</SelectItem>
            <SelectItem value="System Design">System Design</SelectItem>
          </SelectContent>
        </Select>
      </Suspense>
    </div>
  );
}
