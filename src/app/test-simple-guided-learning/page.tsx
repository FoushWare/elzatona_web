'use client';

import React, { useState, useEffect } from 'react';

interface Plan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  totalQuestions: number;
  dailyQuestions: number;
  sections: any[];
  isRecommended: boolean;
}

export default function TestSimpleGuidedLearningPage() {
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/guided-learning/plans');
        const data = await response.json();

        if (data.success) {
          setAllPlans(data.plans);
        } else {
          setError(data.error || 'Failed to fetch plans');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch plans');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Filter to only show day-based plans (1-day, 2-day, 3-day, 4-day, 5-day, 6-day, 7-day)
  const dayBasedPlans = allPlans.filter(plan => {
    const dayBasedPlanIds = [
      '1-day-plan',
      '2-day-plan',
      '3-day-plan',
      '4-day-plan',
      '5-day-plan',
      '6-day-plan',
      '7-day-plan',
    ];
    return dayBasedPlanIds.includes(plan.id);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading learning plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Simple Guided Learning Plans
          </h1>
          <p className="text-gray-600">
            Total plans from API: {allPlans.length} | Filtered day-based plans:{' '}
            {dayBasedPlans.length}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Plans (from API):
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {allPlans.map(plan => (
              <div
                key={plan.id}
                className={`p-2 rounded text-xs ${
                  dayBasedPlans.some(p => p.id === plan.id)
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {plan.id}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Day-Based Plans (Filtered):
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dayBasedPlans.map(plan => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-200 hover:border-green-500 transition-colors"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">
                      {plan.duration} day{plan.duration > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <span className="font-medium">{plan.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Questions:</span>
                    <span className="font-medium">{plan.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily:</span>
                    <span className="font-medium">{plan.dailyQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sections:</span>
                    <span className="font-medium">
                      {plan.sections?.length || 0}
                    </span>
                  </div>
                </div>

                {plan.isRecommended && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Recommended
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {dayBasedPlans.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No day-based plans found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
