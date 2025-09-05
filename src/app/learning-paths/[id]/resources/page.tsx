'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { learningPaths } from '@/lib/resources';
import { Resource, getResourcesForPath } from '@/lib/resources-parser';
import VideoEmbed from '@/components/VideoEmbed';

export default function ResourcesPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;

  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const learningPath = learningPaths.find(path => path.id === pathId);

  useEffect(() => {
    if (pathId) {
      loadResources();
    }
  }, [pathId, loadResources]);

  useEffect(() => {
    filterResources();
  }, [
    resources,
    selectedType,
    selectedDifficulty,
    searchQuery,
    filterResources,
  ]);

  const loadResources = useCallback(async () => {
    try {
      setLoading(true);

      // Mock resources data - in a real app, this would come from the resources.md files
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mockResources: Resource[] = [
        {
          id: 'css-grid-guide',
          title: 'Complete CSS Grid Guide',
          description:
            'A comprehensive guide to CSS Grid layout with practical examples and best practices.',
          url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
          type: 'article',
          platform: 'CSS-Tricks',
          difficulty: 'intermediate',
          tags: ['CSS', 'Grid', 'Layout'],
        },
        {
          id: 'flexbox-course',
          title: 'Flexbox Complete Course',
          description:
            'Learn Flexbox from basics to advanced techniques with interactive examples.',
          url: 'https://www.youtube.com/watch?v=3YW65K6LcIA',
          type: 'video',
          platform: 'YouTube',
          duration: '2h 30m',
          difficulty: 'beginner',
          tags: ['CSS', 'Flexbox', 'Layout'],
        },
        {
          id: 'javascript-fundamentals',
          title: 'JavaScript Fundamentals Course',
          description:
            'Master JavaScript fundamentals including variables, functions, and DOM manipulation.',
          url: 'https://www.udemy.com/course/javascript-fundamentals/',
          type: 'course',
          platform: 'Udemy',
          duration: '8h 45m',
          difficulty: 'beginner',
          tags: ['JavaScript', 'Fundamentals', 'DOM'],
        },
        {
          id: 'react-docs',
          title: 'React Official Documentation',
          description:
            'The official React documentation with guides, API reference, and tutorials.',
          url: 'https://react.dev/',
          type: 'documentation',
          platform: 'React',
          difficulty: 'intermediate',
          tags: ['React', 'Documentation', 'Hooks'],
        },
        {
          id: 'typescript-handbook',
          title: 'TypeScript Handbook',
          description:
            'Complete TypeScript handbook covering types, interfaces, and advanced features.',
          url: 'https://www.typescriptlang.org/docs/',
          type: 'documentation',
          platform: 'TypeScript',
          difficulty: 'intermediate',
          tags: ['TypeScript', 'Types', 'Interfaces'],
        },
      ];

      const resourcesData = getResourcesForPath(pathId);
      setResources(resourcesData);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  }, [pathId]);

  const filterResources = useCallback(() => {
    let filtered = resources;

    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        resource => resource.difficulty === selectedDifficulty
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        resource =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          resource.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    setFilteredResources(filtered);
  }, [resources, selectedType, selectedDifficulty, searchQuery]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'article':
        return '📄';
      case 'course':
        return '🎓';
      case 'documentation':
        return '📚';
      case 'tool':
        return '🛠️';
      case 'book':
        return '📖';
      default:
        return '📖';
    }
  };

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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return '📺';
      case 'udemy':
        return '🎓';
      case 'coursera':
        return '🎓';
      case 'freecodecamp':
        return '🆓';
      case 'mdn':
        return '🌐';
      case 'css-tricks':
        return '🎨';
      case 'react':
        return '⚛️';
      case 'typescript':
        return '📘';
      default:
        return '🔗';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading resources...
          </p>
        </div>
      </div>
    );
  }

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Path Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const resourceTypes = [
    'all',
    'video',
    'article',
    'course',
    'documentation',
    'tool',
    'book',
  ];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back to Learning Path
          </button>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {learningPath.title} - Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Curated resources to help you master {learningPath.title}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Resources
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, description, or tags..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resource Type
              </label>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all'
                      ? 'All Types'
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all'
                      ? 'All Levels'
                      : difficulty.charAt(0).toUpperCase() +
                        difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Resource Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {getTypeIcon(resource.type)}
                    </span>
                    <span className="text-lg">
                      {getPlatformIcon(resource.platform)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}
                  >
                    {resource.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>

                {/* Resource Meta */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Platform:</span>
                    <span>{resource.platform}</span>
                  </div>

                  {resource.duration && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium mr-2">Duration:</span>
                      <span>{resource.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium mr-2">Type:</span>
                    <span className="capitalize">{resource.type}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video Preview */}
              {resource.type === 'video' && (
                <div className="px-6 pb-4">
                  <VideoEmbed url={resource.url} title={resource.title} />
                </div>
              )}

              {/* Action Button */}
              <div className="px-6 pb-6">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group"
                >
                  <span>
                    {resource.type === 'video'
                      ? 'Watch on Platform'
                      : 'Open Resource'}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Resource Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>
      </div>
    </div>
  );
}
