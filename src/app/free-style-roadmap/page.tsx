'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FreeStyleRoadmapBuilder } from '@/components/FreeStyleRoadmapBuilder';
import { useUserType } from '@/contexts/UserTypeContext';

export default function FreeStyleRoadmapPage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const [isBuilding, setIsBuilding] = useState(false);

  const handleSave = (selectedSections: string[]) => {
    // Save the selected sections to localStorage or context
    localStorage.setItem('freeStyleRoadmap', JSON.stringify(selectedSections));

    // Set user type to self-directed if not already set
    setUserType('self-directed');

    // Redirect to free style practice
    router.push('/free-style-practice');
  };

  const handleCancel = () => {
    router.back();
  };

  const handleStartBuilding = () => {
    setIsBuilding(true);
  };

  if (isBuilding) {
    return (
      <FreeStyleRoadmapBuilder onSave={handleSave} onCancel={handleCancel} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Free Style Learning
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create your own personalized learning roadmap by selecting the
            sections that interest you most.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose Free Style Learning?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Path
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose exactly what you want to learn based on your interests
                and career goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Flexible Schedule
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn at your own pace with no rigid structure or deadlines to
                follow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Skip What You Know
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Focus on areas where you need improvement and skip topics you've
                already mastered.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Follow Your Passion
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dive deep into topics that excite you and build expertise in
                your areas of interest.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Custom Roadmap?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from 15+ sections covering everything from frontend basics to
            advanced system design.
          </p>
          <button
            onClick={handleStartBuilding}
            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Building My Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
