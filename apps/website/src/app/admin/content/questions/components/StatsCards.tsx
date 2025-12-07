"use client";

import React from "react";
import { Card, CardContent } from "@elzatona/components";

interface StatsCardsProps {
  totalCount: number;
  categoriesCount: number;
  topicsCount: number;
  filteredCount: number;
}

export function StatsCards({
  totalCount,
  categoriesCount,
  topicsCount,
  filteredCount,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                Q
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Total Questions
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {totalCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                C
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Categories
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {categoriesCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                T
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Topics
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {topicsCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 dark:text-orange-400 font-bold text-lg">
                F
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Filtered Results
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {filteredCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
