'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  Zap,
  Globe,
  Palette,
  Code,
} from 'lucide-react';

interface VideoCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category:
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'mobile'
    | 'devops'
    | 'design';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  rating: number;
  studentsCount: number;
  price: number;
  isFree: boolean;
  thumbnail: string;
  tags: string[];
  modules: number;
  isCompleted?: boolean;
  progress?: number;
  level: 'course' | 'path' | 'bootcamp';
}

const videoCourses: VideoCourse[] = [
  {
    id: 'complete-frontend-bootcamp',
    title: 'Complete Frontend Development Bootcamp',
    description:
      'Master HTML, CSS, JavaScript, React, and modern development tools in this comprehensive bootcamp.',
    instructor: 'Sarah Johnson',
    category: 'frontend',
    difficulty: 'beginner',
    duration: 45,
    rating: 4.9,
    studentsCount: 12500,
    price: 199,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootcamp'],
    modules: 12,
    level: 'bootcamp',
  },
  {
    id: 'react-mastery-course',
    title: 'React Mastery: From Basics to Advanced',
    description:
      'Deep dive into React ecosystem including hooks, context, testing, and performance optimization.',
    instructor: 'Mike Chen',
    category: 'frontend',
    difficulty: 'intermediate',
    duration: 25,
    rating: 4.8,
    studentsCount: 8900,
    price: 149,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['React', 'Hooks', 'Context', 'Testing', 'Performance'],
    modules: 8,
    level: 'course',
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals for Beginners',
    description:
      'Learn JavaScript from scratch with hands-on projects and real-world examples.',
    instructor: 'Alex Rodriguez',
    category: 'frontend',
    difficulty: 'beginner',
    duration: 15,
    rating: 4.7,
    studentsCount: 15600,
    price: 0,
    isFree: true,
    thumbnail: '/api/placeholder/400/225',
    tags: ['JavaScript', 'ES6+', 'DOM', 'Async'],
    modules: 6,
    level: 'course',
  },
  {
    id: 'css-animations',
    title: 'CSS Animations and Transitions',
    description:
      'Create stunning animations and smooth transitions with CSS and JavaScript.',
    instructor: 'Emma Wilson',
    category: 'frontend',
    difficulty: 'intermediate',
    duration: 8,
    rating: 4.6,
    studentsCount: 4200,
    price: 79,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['CSS', 'Animations', 'Transitions', 'Keyframes'],
    modules: 4,
    level: 'course',
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend Development',
    description:
      'Build scalable backend applications with Node.js, Express, and MongoDB.',
    instructor: 'David Kim',
    category: 'backend',
    difficulty: 'intermediate',
    duration: 20,
    rating: 4.8,
    studentsCount: 6800,
    price: 129,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['Node.js', 'Express', 'MongoDB', 'API'],
    modules: 7,
    level: 'course',
  },
  {
    id: 'fullstack-mern',
    title: 'Full-Stack MERN Development',
    description:
      'Complete full-stack development with MongoDB, Express, React, and Node.js.',
    instructor: 'Lisa Thompson',
    category: 'fullstack',
    difficulty: 'advanced',
    duration: 35,
    rating: 4.9,
    studentsCount: 3200,
    price: 249,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['MERN', 'Full-Stack', 'MongoDB', 'Express', 'React', 'Node.js'],
    modules: 10,
    level: 'path',
  },
  {
    id: 'mobile-react-native',
    title: 'React Native Mobile Development',
    description: 'Build cross-platform mobile apps with React Native and Expo.',
    instructor: 'James Park',
    category: 'mobile',
    difficulty: 'intermediate',
    duration: 18,
    rating: 4.7,
    studentsCount: 5400,
    price: 159,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['React Native', 'Mobile', 'Expo', 'iOS', 'Android'],
    modules: 6,
    level: 'course',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design for Developers',
    description:
      'Learn design principles and create beautiful user interfaces.',
    instructor: 'Sophie Martinez',
    category: 'design',
    difficulty: 'beginner',
    duration: 12,
    rating: 4.5,
    studentsCount: 3800,
    price: 99,
    isFree: false,
    thumbnail: '/api/placeholder/400/225',
    tags: ['UI/UX', 'Design', 'Figma', 'Prototyping'],
    modules: 5,
    level: 'course',
  },
];

const categories = [
  { id: 'all', label: 'All Courses', icon: '📚', count: videoCourses.length },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    count: videoCourses.filter(c => c.category === 'frontend').length,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    count: videoCourses.filter(c => c.category === 'backend').length,
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    icon: '🚀',
    count: videoCourses.filter(c => c.category === 'fullstack').length,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    count: videoCourses.filter(c => c.category === 'mobile').length,
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: '🔧',
    count: videoCourses.filter(c => c.category === 'devops').length,
  },
  {
    id: 'design',
    label: 'Design',
    icon: '🎨',
    count: videoCourses.filter(c => c.category === 'design').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'beginner', label: 'Beginner', color: 'green' },
  { id: 'intermediate', label: 'Intermediate', color: 'yellow' },
  { id: 'advanced', label: 'Advanced', color: 'red' },
];

const levels = [
  { id: 'all', label: 'All Types', icon: '📚' },
  { id: 'course', label: 'Course', icon: '🎓' },
  { id: 'path', label: 'Learning Path', icon: '🗺️' },
  { id: 'bootcamp', label: 'Bootcamp', icon: '🏕️' },
];

export default function VideoCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredCourses = videoCourses.filter(course => {
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    const matchesLevel =
      selectedLevel === 'all' || course.level === selectedLevel;
    const matchesFree = !showFreeOnly || course.isFree;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesLevel &&
      matchesFree
    );
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Palette className="w-5 h-5" />;
      case 'backend':
        return <Code className="w-5 h-5" />;
      case 'fullstack':
        return <Zap className="w-5 h-5" />;
      case 'mobile':
        return <Globe className="w-5 h-5" />;
      case 'devops':
        return <Code className="w-5 h-5" />;
      case 'design':
        return <Palette className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'course':
        return '🎓';
      case 'path':
        return '🗺️';
      case 'bootcamp':
        return '🏕️';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎥 Video Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn from industry experts with comprehensive video courses,
            learning paths, and bootcamps.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Free Courses Toggle */}
              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={e => setShowFreeOnly(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Show free courses only
                  </span>
                </label>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty and Level Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Difficulty
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map(difficulty => (
                      <button
                        key={difficulty.id}
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedDifficulty === difficulty.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {difficulty.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Course Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {levels.map(level => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedLevel(level.id)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedLevel === level.id
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="mr-2">{level.icon}</span>
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredCourses.length} of {videoCourses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.difficulty)}`}
                  >
                    {course.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                    {getLevelIcon(course.level)}
                  </span>
                </div>
                {course.isFree && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                      FREE
                    </span>
                  </div>
                )}
                {course.isCompleted && (
                  <div className="absolute bottom-4 left-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(course.category)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {course.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  {course.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  by <span className="font-medium">{course.instructor}</span>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{course.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules} modules</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Progress Bar (if in progress) */}
                {course.progress && course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {course.isFree ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>
                  <Link
                    href={`/video-courses/${course.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <span>
                      {course.isCompleted ? 'Continue' : 'Start Course'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedLevel('all');
                setShowFreeOnly(false);
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of developers who are already learning with our
              video courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutorials"
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Browse Tutorials
              </Link>
              <Link
                href="/learning-paths"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                View Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
