'use client';

import React, { useState, useEffect } from 'react';
import { useLearningPlanTemplates } from '@/hooks/useLearningPlanTemplates';

export default function TestGuidedLearningPage() {
  const {
    templates: allTemplates,
    isLoading: templatesLoading,
    error: templatesError,
  } = useLearningPlanTemplates();

  // Filter to only show day-based plans (1-day, 2-day, 3-day, 4-day, 5-day, 6-day, 7-day)
  const templates = allTemplates.filter(plan => {
    const dayBasedPlans = [
      '1-day-plan',
      '2-day-plan',
      '3-day-plan',
      '4-day-plan',
      '5-day-plan',
      '6-day-plan',
      '7-day-plan',
    ];
    return dayBasedPlans.includes(plan.id);
  });

  if (templatesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading learning plans...</p>
        </div>
      </div>
    );
  }

  if (templatesError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{templatesError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Guided Learning Plans
          </h1>
          <p className="text-gray-600">
            Total plans from API: {allTemplates.length} | Filtered day-based
            plans: {templates.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map(plan => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
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

        {templates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No day-based plans found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
