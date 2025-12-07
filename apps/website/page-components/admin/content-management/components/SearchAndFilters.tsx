"use client";

import React, { Suspense } from "react";

const Input = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Input,
  })),
);
const Select = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.Select,
  })),
);
const SelectContent = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectContent,
  })),
);
const SelectItem = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectItem,
  })),
);
const SelectTrigger = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectTrigger,
  })),
);
const SelectValue = React.lazy(() =>
  import("@elzatona/components").then((module) => ({
    default: module.SelectValue,
  })),
);

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
  </div>
);

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterCardType: string;
  onFilterChange: (value: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterCardType,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Suspense fallback={<LoadingSkeleton />}>
          <Input
            placeholder="Search cards, plans, categories, topics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
};

