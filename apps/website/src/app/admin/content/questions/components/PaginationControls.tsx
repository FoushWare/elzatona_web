"use client";

import React from "react";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@elzatona/components";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  showPageSize?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  showPageSize = true,
}: PaginationControlsProps) {
  if (totalPages <= 1 && !showPageSize) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          Showing{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{" "}
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{" "}
          of <span className="font-medium">{totalCount}</span> questions
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {showPageSize && (
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Show:
              </span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(parseInt(value))}
              >
                <SelectTrigger className="w-20 h-9">
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
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
