'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Code, Zap, Target, Clock } from 'lucide-react';

export default function FrontendTasksPage() {
  const router = useRouter();

  const taskCategories = [
    {
      id: 'components',
      title: 'Component Building',
      description: 'Build reusable React components',
      difficulty: 'Beginner',
      tasks: 15,
      icon: <Code className="w-6 h-6" />,
    },
    {
      id: 'ui-challenges',
      title: 'UI/UX Challenges',
      description: 'Create beautiful user interfaces',
      difficulty: 'Intermediate',
      tasks: 12,
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: 'animations',
      title: 'Animations & Interactions',
      description: 'Master CSS and JS animations',
      difficulty: 'Advanced',
      tasks: 8,
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frontend Tasks
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Build real-world projects and components to sharpen your frontend
            development skills. Each task is designed to teach you practical
            skills you'll use in your career.
          </p>
        </div>

        {/* Task Categories */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {taskCategories.map(category => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {category.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{category.difficulty}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{category.tasks} tasks</span>
                  </span>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Start Tasks
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're working hard to bring you amazing frontend tasks. This
              feature will be available soon with hands-on projects, component
              challenges, and real-world scenarios.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
