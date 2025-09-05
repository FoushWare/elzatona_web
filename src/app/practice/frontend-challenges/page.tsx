'use client';

import { useState } from 'react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  estimatedTime: string;
  tags: string[];
  completed?: boolean;
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Build a Todo App with React',
    description:
      'Create a fully functional todo application with add, edit, delete, and mark as complete functionality using React hooks.',
    difficulty: 'Medium',
    category: 'React',
    estimatedTime: '45 min',
    tags: ['React', 'useState', 'useEffect', 'CRUD Operations'],
  },
  {
    id: '2',
    title: 'Responsive Navigation Bar',
    description:
      'Build a responsive navigation bar that collapses into a hamburger menu on mobile devices using CSS and JavaScript.',
    difficulty: 'Easy',
    category: 'CSS/JavaScript',
    estimatedTime: '30 min',
    tags: ['CSS', 'JavaScript', 'Responsive Design', 'Mobile First'],
  },
  {
    id: '3',
    title: 'Image Gallery with Lightbox',
    description:
      'Create an image gallery with thumbnail grid and lightbox modal functionality for viewing full-size images.',
    difficulty: 'Medium',
    category: 'JavaScript',
    estimatedTime: '60 min',
    tags: ['JavaScript', 'DOM Manipulation', 'Modal', 'Event Handling'],
  },
  {
    id: '4',
    title: 'Form Validation with Real-time Feedback',
    description:
      'Build a contact form with real-time validation, error messages, and success feedback using vanilla JavaScript.',
    difficulty: 'Medium',
    category: 'JavaScript',
    estimatedTime: '40 min',
    tags: ['JavaScript', 'Form Validation', 'Regular Expressions', 'UX'],
  },
  {
    id: '5',
    title: 'CSS Grid Layout Challenge',
    description:
      'Create a complex layout using CSS Grid with responsive breakpoints and modern design principles.',
    difficulty: 'Hard',
    category: 'CSS',
    estimatedTime: '90 min',
    tags: ['CSS Grid', 'Responsive Design', 'Layout', 'Modern CSS'],
  },
  {
    id: '6',
    title: 'React Context API State Management',
    description:
      'Implement a global state management solution using React Context API for a multi-component application.',
    difficulty: 'Hard',
    category: 'React',
    estimatedTime: '75 min',
    tags: ['React', 'Context API', 'State Management', 'useReducer'],
  },
  {
    id: '7',
    title: 'Custom Hook for API Calls',
    description:
      'Create a reusable custom hook for handling API calls with loading states, error handling, and caching.',
    difficulty: 'Medium',
    category: 'React',
    estimatedTime: '50 min',
    tags: ['React', 'Custom Hooks', 'API', 'Error Handling'],
  },
  {
    id: '8',
    title: 'CSS Animation Showcase',
    description:
      'Build a collection of CSS animations including hover effects, transitions, and keyframe animations.',
    difficulty: 'Easy',
    category: 'CSS',
    estimatedTime: '35 min',
    tags: ['CSS', 'Animations', 'Transitions', 'Keyframes'],
  },
  {
    id: '9',
    title: 'Drag and Drop File Upload',
    description:
      'Implement a drag and drop file upload component with progress indicators and file type validation.',
    difficulty: 'Hard',
    category: 'JavaScript',
    estimatedTime: '80 min',
    tags: ['JavaScript', 'File API', 'Drag & Drop', 'Progress Indicators'],
  },
  {
    id: '10',
    title: 'React Performance Optimization',
    description:
      'Optimize a React application using memo, useMemo, useCallback, and code splitting techniques.',
    difficulty: 'Hard',
    category: 'React',
    estimatedTime: '100 min',
    tags: ['React', 'Performance', 'Optimization', 'Code Splitting'],
  },
];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function FrontendChallengesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChallenges = challenges.filter(challenge => {
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      challenge.difficulty === selectedDifficulty;
    const matchesCategory =
      selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(challenges.map(c => c.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ Frontend Challenges
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master frontend development through hands-on coding challenges.
            Build real-world applications and improve your skills.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
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
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
                      {challenge.category}
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

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {challenges.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Challenges
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {challenges.filter(c => c.completed).length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
