'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

export default function GuidedLearningSimplePage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setTimeout(() => {
      setTemplates([
        {
          id: '1',
          title: 'Frontend Fundamentals',
          description: 'Learn the basics of frontend development',
          categories: ['questions', 'framework'],
          difficulty: 'beginner',
          estimatedHours: 20,
          isActive: true,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Guided Learning Plans - Simple</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Plan
        </button>
      </div>

      <div className="grid gap-4">
        {templates.map((template: any) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <h3 className="text-lg font-semibold">{template.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {template.description}
            </p>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {template.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
