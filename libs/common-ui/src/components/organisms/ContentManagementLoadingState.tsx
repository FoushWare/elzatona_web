/**
 * ContentManagementLoadingState Component
 * Displays loading state for content management page
 * v1.0
 */

import React from "react";

export function ContentManagementLoadingState() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
        </div>
      </div>
    </div>
  );
}
