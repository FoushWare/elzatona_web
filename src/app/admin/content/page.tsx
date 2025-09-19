'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import {
  BookOpen,
  Code,
  Target,
  Headphones,
  Plus,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';

interface ContentSection {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  questionCount: number;
  isActive: boolean;
}

export default function ContentManagementPage() {
  const [sections] = useState<ContentSection[]>([
    {
      id: 'learning',
      name: 'Learning',
      icon: '📚',
      description: 'Learning paths, tutorials, and educational content',
      href: '/admin/content/learning',
      questionCount: 0,
      isActive: true,
    },
    {
      id: 'practice',
      name: 'Practice',
      icon: '💻',
      description: 'Coding challenges, exercises, and practice problems',
      href: '/admin/content/practice',
      questionCount: 0,
      isActive: true,
    },
    {
      id: 'interview-prep',
      name: 'Interview Prep',
      icon: '🎯',
      description:
        'Mock interviews, preparation guides, and interview questions',
      href: '/admin/content/interview-prep',
      questionCount: 0,
      isActive: true,
    },
    {
      id: 'media',
      name: 'Media',
      icon: '🎧',
      description: 'Podcasts, videos, and multimedia content',
      href: '/admin/content/media',
      questionCount: 0,
      isActive: true,
    },
  ]);

  return (
    
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Content Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all website content sections and questions
            </p>
          </div>

          {/* Content Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sections.map(section => (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{section.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {section.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {section.questionCount} questions
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      section.isActive ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {section.description}
                </p>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    href={section.href}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Manage</span>
                  </Link>
                  <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/content/questions/new"
                className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
              >
                <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">
                    Add New Question
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Create a new question with audio support
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/content/sections/new"
                className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
              >
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-medium text-green-900 dark:text-green-100">
                    Create New Section
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Add a new content section
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/content/analytics"
                className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
              >
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-medium text-purple-900 dark:text-purple-100">
                    View Analytics
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Content performance and usage stats
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    
  );
}
