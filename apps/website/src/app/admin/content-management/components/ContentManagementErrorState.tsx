/**
 * ContentManagementErrorState Component
 * Displays error state for content management page
 * v1.0
 */

import React from "react";

interface ContentManagementErrorStateProps {
  cardsError?: Error | null;
  plansError?: Error | null;
  categoriesError?: Error | null;
  topicsError?: Error | null;
  questionsError?: Error | null;
}

export function ContentManagementErrorState({
  cardsError,
  plansError,
  categoriesError,
  topicsError,
  questionsError,
}: ContentManagementErrorStateProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There was an error loading the admin data. Please try refreshing the
            page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
          <div className="mt-4 text-sm text-gray-500">
            {cardsError && <p>Cards Error: {cardsError.message}</p>}
            {plansError && <p>Plans Error: {plansError.message}</p>}
            {categoriesError && (
              <p>Categories Error: {categoriesError.message}</p>
            )}
            {topicsError && <p>Topics Error: {topicsError.message}</p>}
            {questionsError && <p>Questions Error: {questionsError.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
