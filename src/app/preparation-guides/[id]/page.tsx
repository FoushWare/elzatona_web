'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getPreparationGuideById } from '@/lib/preparationGuides';

export default function PreparationGuideDetailPage() {
  const params = useParams();
  const guideId = params.id as string;
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set()
  );

  const guide = getPreparationGuideById(guideId);

  if (!guide) {
    notFound();
  }

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      case 'all-levels':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      case 'all-levels':
        return '🎯';
      default:
        return '📚';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    return `${minutes}m`;
  };

  // Mock practice questions for each section
  const getPracticeQuestions = (sectionIndex: number) => {
    const questions = [
      'What are the key differences between HTML4 and HTML5?',
      'Explain the CSS Box Model and its components.',
      'How does JavaScript handle asynchronous operations?',
      'What are React Hooks and when should you use them?',
      'How would you optimize a frontend application for performance?',
      'Describe the STAR method for behavioral interviews.',
    ];
    return questions[sectionIndex] || 'Practice questions coming soon...';
  };

  // Get the appropriate practice page URL based on question content
  const getPracticePageUrl = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    if (
      lowerQuestion.includes('html') ||
      lowerQuestion.includes('html4') ||
      lowerQuestion.includes('html5')
    ) {
      return '/practice/fundamentals/html';
    } else if (
      lowerQuestion.includes('css') ||
      lowerQuestion.includes('box model')
    ) {
      return '/practice/fundamentals/css';
    } else if (
      lowerQuestion.includes('javascript') ||
      lowerQuestion.includes('async')
    ) {
      return '/practice/fundamentals/javascript';
    } else if (
      lowerQuestion.includes('react') ||
      lowerQuestion.includes('hooks')
    ) {
      return '/practice/fundamentals/react';
    } else if (
      lowerQuestion.includes('optimize') ||
      lowerQuestion.includes('performance')
    ) {
      return '/practice/fundamentals/performance';
    } else if (
      lowerQuestion.includes('star') ||
      lowerQuestion.includes('behavioral') ||
      lowerQuestion.includes('interview')
    ) {
      return '/practice/fundamentals/behavioral';
    } else {
      return '/practice/fundamentals';
    }
  };

  // Mock resources for each section
  const getResources = (sectionIndex: number) => {
    const resources = [
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        type: 'Documentation',
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info/',
        type: 'Tutorial',
      },
      {
        title: 'React Official Docs',
        url: 'https://react.dev/',
        type: 'Documentation',
      },
      { title: 'CSS-Tricks', url: 'https://css-tricks.com/', type: 'Blog' },
      {
        title: 'Frontend Masters',
        url: 'https://frontendmasters.com/',
        type: 'Course',
      },
      { title: 'LeetCode', url: 'https://leetcode.com/', type: 'Practice' },
    ];
    return resources[sectionIndex] || resources[0];
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/preparation-guides"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Preparation Guides
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(guide.difficulty)}`}
            >
              {getDifficultyIcon(guide.difficulty)}{' '}
              {guide.difficulty.replace('-', ' ')}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {formatTime(guide.estimatedTime)}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {guide.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {guide.description}
          </p>

          {/* Target Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Target Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {guide.targetSkills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Sections */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Learning Sections
          </h2>

          <div className="space-y-4">
            {guide.sections.map((section, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-background hover:shadow-md transition-shadow"
              >
                {/* Section Header - Clickable */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {section.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {formatTime(section.readingTime)}
                      </span>
                      <svg
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                          expandedSections.has(index) ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expandable Content */}
                {expandedSections.has(index) && (
                  <div className="border-t border-border p-6 bg-muted/20">
                    {/* Topics */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Topics Covered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {section.topics.map(topic => (
                          <span
                            key={topic}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Practice Question */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Practice Question
                      </h4>
                      <div className="bg-background border border-border rounded-lg p-4">
                        <p className="text-foreground mb-3">
                          {getPracticeQuestions(index)}
                        </p>
                        <Link
                          href={getPracticePageUrl(getPracticeQuestions(index))}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Practice Now
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">
                        Recommended Resources
                      </h4>
                      <div className="space-y-2">
                        {[
                          getResources(index),
                          getResources((index + 1) % 6),
                          getResources((index + 2) % 6),
                        ].map((resource, idx) => (
                          <Link
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-foreground">
                                {resource.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {resource.type}
                              </p>
                            </div>
                            <svg
                              className="w-4 h-4 text-muted-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/coding"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        🎯 Start Coding Challenge
                      </Link>
                      <Link
                        href="/practice/fundamentals"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        📚 Practice Questions
                      </Link>
                      <Link
                        href="/study-plans"
                        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                      >
                        📅 Study Plan
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-muted-foreground"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 mb-6">
            Choose your preferred learning path and begin your preparation
            journey
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🎯 Coding Challenges
            </Link>
            <Link
              href="/practice/fundamentals"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              📚 Practice Questions
            </Link>
            <Link
              href="/study-plans"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              📅 Study Plans
            </Link>
            <Link
              href="/learning-paths"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🛤️ Learning Paths
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/preparation-guides"
            className="flex-1 bg-muted text-foreground px-6 py-3 rounded-lg text-center hover:bg-muted/80 transition-colors"
          >
            Browse All Preparation Guides
          </Link>
          <Link
            href="/study-plans"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors"
          >
            View Study Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
