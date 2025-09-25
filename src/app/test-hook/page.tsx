'use client';

import { useLearningPlanTemplatesSimple } from '@/hooks/useLearningPlanTemplatesSimple';

export default function TestHookPage() {
  const { templates, isLoading, error } = useLearningPlanTemplatesSimple();

  console.log('🔍 TestHookPage: Hook state:', {
    templates: templates.length,
    isLoading,
    error,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Hook Test Page</h1>
      <div className="space-y-4">
        <div>
          <strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {error || 'None'}
        </div>
        <div>
          <strong>Templates Count:</strong> {templates.length}
        </div>
        <div>
          <strong>Templates:</strong>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(templates, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
