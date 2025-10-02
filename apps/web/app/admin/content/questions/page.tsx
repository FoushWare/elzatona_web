'use client';

import React, { useState, useEffect } from 'react';
import UnifiedQuestionManager from '@/components/UnifiedQuestionManager';

export default function QuestionsManagementPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log(
    '🔍 QuestionsManagementPage: Component rendered, isClient:',
    isClient
  );

  if (!isClient) {
    return (
      <div className="container mx-auto p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Unified Question Manager</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage all questions from a single source of truth
              </p>
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading questions...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <UnifiedQuestionManager />
    </div>
  );
}
