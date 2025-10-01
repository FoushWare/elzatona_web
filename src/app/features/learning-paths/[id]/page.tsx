'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { getLearningPathById, getResourceById } from '@/lib/resources';
import { useState, useEffect, useMemo } from 'react';

interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount?: number;
}

export default function LearningPathDetailPage() {
  const params = useParams();
  const pathId = params?.id as string;

  const learningPath = getLearningPathById(pathId);

  if (!learningPath) {
    notFound();
  }

  // State for topics
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch topics based on learning path
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Map learning path to category
        const categoryMap: Record<string, string> = {
          'javascript-deep-dive': 'JavaScript (Core)',
          'react-mastery': 'React.js (Core)',
          'css-mastery': 'CSS & Styling',
          'typescript-essentials': 'TypeScript',
          'frontend-basics': 'HTML & Web Fundamentals',
          'performance-optimization': 'Performance & Optimization',
          'security-essentials': 'Security',
          'testing-strategies': 'Testing',
          'build-tools-devops': 'Build Tools & DevOps',
          'api-integration': 'API Integration',
          'frontend-system-design': 'System Design',
          'advanced-frontend-architectures': 'Architecture',
          'ai-tools-frontend': 'AI Tools',
        };

        const category = categoryMap[pathId];
        if (!category) {
          setError('No topics available for this learning path');
          return;
        }

        const response = await fetch(`/api/topics`);
        const data = await response.json();

        if (data.success) {
          // Filter topics by category
          const filteredTopics = data.data.filter(
            (topic: Topic) => topic.category === category
          );
          setTopics(filteredTopics);
        } else {
          setError(data.error || 'Failed to fetch topics');
        }
      } catch (err) {
        setError('Failed to fetch topics');
        console.error('Error fetching topics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [pathId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
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
      default:
        return '📚';
    }
  };

  const getTopicIcon = (topicName: string) => {
    const iconMap: Record<string, string> = {
      Hoisting: '⬆️',
      Closures: '🔒',
      'Event Loop & Async/Await': '🔄',
      'Promises & Callbacks': '🤝',
      'Prototypes & Inheritance': '🧬',
      'Scope & this': '🎯',
      'Variables (var, let, const)': '📦',
      'ES6+ Features (spread, destructuring, modules)': '✨',
      'API Routes': '🛣️',
      'Accessibility (a11y)': '♿',
      'Animations & Transitions': '🎬',
      'CSS Grid': '📐',
      Flexbox: '📏',
      'CSS Variables': '🎨',
      'Responsive Design': '📱',
      'React Hooks': '🪝',
      'State Management': '🗃️',
      'Component Lifecycle': '♻️',
      JSX: '⚛️',
      'Props & State': '📋',
      'TypeScript Basics': '📘',
      'Interfaces & Types': '🔗',
      Generics: '🔧',
      Enums: '📊',
      'Performance Optimization': '⚡',
      Security: '🔐',
      Testing: '🧪',
      'Build Tools': '🛠️',
      DevOps: '🚀',
      'API Integration': '🔌',
      'System Design': '🏗️',
      Architecture: '🏛️',
      'AI Tools': '🤖',
    };

    return iconMap[topicName] || '📚';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/learning-paths"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Learning Paths
          </Link>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(learningPath.difficulty)}`}
            >
              {getDifficultyIcon(learningPath.difficulty)}{' '}
              {learningPath.difficulty}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {learningPath.estimatedTime} hours
            </span>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            {learningPath.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {learningPath.description}
          </p>

          {/* Target Skills */}
          {learningPath.targetSkills && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Target Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {learningPath.targetSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prerequisites */}
          {learningPath.prerequisites &&
            learningPath.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Prerequisites
                </h3>
                <div className="flex flex-wrap gap-2">
                  {learningPath.prerequisites.map(prereq => (
                    <Link
                      key={prereq}
                      href={`/learning-paths/${prereq}`}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors"
                    >
                      {prereq}
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Topics Section */}
        {isLoading ? (
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-muted-foreground">
                Loading topics...
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-card rounded-lg shadow-sm border border-red-200 dark:border-red-800 p-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading topics: {error}
            </p>
          </div>
        ) : topics.length === 0 ? (
          <div className="bg-card rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-800 p-6">
            <p className="text-yellow-600 dark:text-yellow-400">
              No topics available for this learning path yet.
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Learning Topics
              </h2>
              <div className="text-sm text-muted-foreground">
                {topics.length} topics available
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map(topic => (
                <div
                  key={topic.id}
                  className="bg-muted/50 rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => {
                    // Navigate to topic questions page
                    window.location.href = `/learning-paths/${pathId}/topics/${topic.id}`;
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}
                    >
                      {getDifficultyIcon(topic.difficulty)} {topic.difficulty}
                    </span>
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      {getTopicIcon(topic.name)}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                    {topic.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {topic.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {topic.category}
                    </span>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-medium">
                        Start Learning
                      </span>
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Learning Resources
          </h2>

          <div className="space-y-4">
            {learningPath.resources.map(resourceId => {
              const resource = getResourceById(resourceId);
              if (!resource) return null;

              return (
                <div
                  key={resource.id}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{resource.type}</span>
                        <span>•</span>
                        <span className="capitalize">{resource.category}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {resource.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Resource
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/learning-paths"
            className="flex-1 bg-muted text-foreground px-6 py-3 rounded-lg text-center hover:bg-muted/80 transition-colors"
          >
            Browse All Learning Paths
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
