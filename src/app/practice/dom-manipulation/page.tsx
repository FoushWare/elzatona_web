'use client';

import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  tags: string[];
  completed?: boolean;
  example?: string;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Dynamic List Manager',
    description:
      'Create a list where users can add, remove, and reorder items dynamically using DOM manipulation.',
    difficulty: 'Easy',
    estimatedTime: '25 min',
    tags: ['createElement', 'appendChild', 'removeChild', 'Event Listeners'],
    example: 'Add/remove items from a shopping list',
  },
  {
    id: '2',
    title: 'Interactive Form Builder',
    description:
      'Build a form builder that allows users to add different input types dynamically and validate them.',
    difficulty: 'Medium',
    estimatedTime: '45 min',
    tags: [
      'Form Elements',
      'Validation',
      'Dynamic Creation',
      'Event Delegation',
    ],
    example: 'Create custom forms with different input types',
  },
  {
    id: '3',
    title: 'Tab Navigation System',
    description:
      'Implement a tab navigation system that switches content without page reload using DOM manipulation.',
    difficulty: 'Easy',
    estimatedTime: '30 min',
    tags: [
      'classList',
      'data-attributes',
      'Content Switching',
      'Active States',
    ],
    example: 'Switch between different content sections',
  },
  {
    id: '4',
    title: 'Drag and Drop Sortable List',
    description:
      'Create a sortable list where items can be dragged and dropped to reorder them.',
    difficulty: 'Hard',
    estimatedTime: '60 min',
    tags: [
      'Drag Events',
      'Mouse Events',
      'Element Positioning',
      'Visual Feedback',
    ],
    example: 'Reorder tasks in a todo list',
  },
  {
    id: '5',
    title: 'Modal Dialog System',
    description:
      'Build a modal dialog system with backdrop, close functionality, and focus management.',
    difficulty: 'Medium',
    estimatedTime: '40 min',
    tags: ['Modal', 'Backdrop', 'Focus Management', 'Escape Key'],
    example: 'Confirmation dialogs and forms',
  },
  {
    id: '6',
    title: 'Infinite Scroll Implementation',
    description:
      'Implement infinite scroll functionality that loads more content as user scrolls.',
    difficulty: 'Hard',
    estimatedTime: '50 min',
    tags: [
      'Scroll Events',
      'Intersection Observer',
      'Dynamic Loading',
      'Performance',
    ],
    example: 'Load more posts in a social media feed',
  },
  {
    id: '7',
    title: 'Search and Filter Interface',
    description:
      'Create a search and filter interface that updates results in real-time as user types.',
    difficulty: 'Medium',
    estimatedTime: '35 min',
    tags: ['Input Events', 'Filtering', 'Real-time Search', 'Debouncing'],
    example: 'Search through a product catalog',
  },
  {
    id: '8',
    title: 'Accordion Component',
    description:
      'Build an accordion component that expands and collapses content sections smoothly.',
    difficulty: 'Easy',
    estimatedTime: '20 min',
    tags: [
      'Collapse/Expand',
      'Smooth Animations',
      'Height Transitions',
      'Toggle States',
    ],
    example: 'FAQ sections and collapsible content',
  },
  {
    id: '9',
    title: 'Image Gallery with Thumbnails',
    description:
      'Create an image gallery with thumbnail navigation and full-size image display.',
    difficulty: 'Medium',
    estimatedTime: '40 min',
    tags: [
      'Image Handling',
      'Thumbnail Navigation',
      'Lightbox Effect',
      'Keyboard Navigation',
    ],
    example: 'Photo gallery with thumbnail previews',
  },
  {
    id: '10',
    title: 'Real-time Form Validation',
    description:
      'Implement real-time form validation with visual feedback and error messages.',
    difficulty: 'Medium',
    estimatedTime: '35 min',
    tags: [
      'Form Validation',
      'Real-time Feedback',
      'Error Handling',
      'Visual Indicators',
    ],
    example: 'Contact form with instant validation',
  },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function DOMManipulationPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChallenges = challenges.filter(challenge => {
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      challenge.difficulty === selectedDifficulty;
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 DOM Manipulation Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master JavaScript DOM manipulation through hands-on challenges.
            Learn to create interactive web experiences with pure JavaScript.
          </p>
        </div>

        {/* Learning Path */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            📚 Learning Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                Beginner
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Basic DOM operations and event handling
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌿</div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                Intermediate
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Complex interactions and dynamic content
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌳</div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                Advanced
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">
                Performance optimization and advanced patterns
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'Easy', 'Medium', 'Hard'].map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {difficulty === 'all' ? 'All Levels' : difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {challenge.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Challenge #{challenge.id}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[challenge.difficulty]}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {challenge.description}
                </p>

                {/* Example */}
                {challenge.example && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Example:</span>{' '}
                      {challenge.example}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>⏱️ {challenge.estimatedTime}</span>
                  <span className="text-green-600 dark:text-green-400">
                    {challenge.completed ? '✅ Completed' : '⭕ Not Started'}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  {challenge.completed ? 'Review Solution' : 'Start Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Key Concepts Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔑 Key DOM Concepts You&apos;ll Master
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Element Selection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                querySelector, getElementById, and more
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Event Handling
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Click, scroll, keyboard, and custom events
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Dynamic Content
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Creating, modifying, and removing elements
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Styling & Classes
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Manipulating CSS classes and inline styles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
