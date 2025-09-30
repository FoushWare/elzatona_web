'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FolderOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Search,
  Filter,
  Zap,
  Globe,
  Palette,
  Server,
  Smartphone,
  Award,
  Github,
  Eye,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category:
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'mobile'
    | 'desktop'
    | 'game';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  rating: number;
  completedCount: number;
  tags: string[];
  technologies: string[];
  isCompleted?: boolean;
  isPremium?: boolean;
  features: string[];
  liveDemo?: string;
  githubRepo?: string;
  preview?: string;
}

const projects: Project[] = [
  {
    id: 'e-commerce-website',
    title: 'E-Commerce Website',
    description:
      'Build a complete e-commerce platform with shopping cart, user authentication, and payment integration.',
    category: 'fullstack',
    difficulty: 'advanced',
    estimatedTime: 480,
    rating: 4.9,
    completedCount: 3200,
    tags: ['E-Commerce', 'Shopping Cart', 'Payment', 'Authentication'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT'],
    features: [
      'User authentication and authorization',
      'Product catalog with search and filters',
      'Shopping cart functionality',
      'Payment processing with Stripe',
      'Order management system',
      'Admin dashboard',
    ],
    liveDemo: 'https://demo-ecommerce.example.com',
    githubRepo: 'https://github.com/example/ecommerce-project',
  },
  {
    id: 'social-media-dashboard',
    title: 'Social Media Dashboard',
    description:
      'Create a comprehensive social media management dashboard with analytics and scheduling features.',
    category: 'frontend',
    difficulty: 'intermediate',
    estimatedTime: 240,
    rating: 4.8,
    completedCount: 5600,
    tags: ['Dashboard', 'Analytics', 'Social Media', 'Charts'],
    technologies: ['React', 'TypeScript', 'Chart.js', 'Material-UI'],
    features: [
      'Multi-platform social media integration',
      'Analytics and reporting',
      'Content scheduling',
      'Engagement tracking',
      'Responsive design',
    ],
    liveDemo: 'https://demo-social-dashboard.example.com',
    githubRepo: 'https://github.com/example/social-dashboard',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description:
      'Build a collaborative task management application with real-time updates and team features.',
    category: 'fullstack',
    difficulty: 'intermediate',
    estimatedTime: 360,
    rating: 4.7,
    completedCount: 4200,
    tags: ['Task Management', 'Real-time', 'Collaboration', 'Teams'],
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    features: [
      'Real-time task updates',
      'Team collaboration',
      'Project organization',
      'Due date tracking',
      'File attachments',
      'Notifications',
    ],
    liveDemo: 'https://demo-taskmanager.example.com',
    githubRepo: 'https://github.com/example/task-manager',
  },
  {
    id: 'weather-app-mobile',
    title: 'Weather App (Mobile)',
    description:
      'Create a beautiful weather application for mobile devices with location services and forecasts.',
    category: 'mobile',
    difficulty: 'beginner',
    estimatedTime: 120,
    rating: 4.6,
    completedCount: 8900,
    tags: ['Weather', 'Mobile', 'Location', 'API Integration'],
    technologies: ['React Native', 'Expo', 'Weather API', 'Geolocation'],
    features: [
      'Current weather display',
      '5-day forecast',
      'Location-based weather',
      'Weather alerts',
      'Beautiful UI animations',
    ],
    liveDemo: 'https://demo-weather-app.example.com',
    githubRepo: 'https://github.com/example/weather-app',
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description:
      'Develop a full-featured blog platform with CMS, comments, and SEO optimization.',
    category: 'fullstack',
    difficulty: 'intermediate',
    estimatedTime: 300,
    rating: 4.8,
    completedCount: 3800,
    tags: ['Blog', 'CMS', 'SEO', 'Comments'],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Prisma'],
    features: [
      'Content management system',
      'Rich text editor',
      'Comment system',
      'SEO optimization',
      'User roles and permissions',
      'Search functionality',
    ],
    liveDemo: 'https://demo-blog-platform.example.com',
    githubRepo: 'https://github.com/example/blog-platform',
  },
  {
    id: 'chat-application',
    title: 'Real-time Chat Application',
    description:
      'Build a real-time chat application with rooms, file sharing, and message history.',
    category: 'fullstack',
    difficulty: 'advanced',
    estimatedTime: 420,
    rating: 4.9,
    completedCount: 2100,
    tags: ['Real-time', 'Chat', 'WebSocket', 'File Sharing'],
    technologies: ['React', 'Node.js', 'Socket.io', 'AWS S3'],
    features: [
      'Real-time messaging',
      'Chat rooms and channels',
      'File and image sharing',
      'Message history',
      'User presence indicators',
      'Emoji reactions',
    ],
    liveDemo: 'https://demo-chat-app.example.com',
    githubRepo: 'https://github.com/example/chat-app',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Create a stunning portfolio website with animations, contact form, and project showcase.',
    category: 'frontend',
    difficulty: 'beginner',
    estimatedTime: 180,
    rating: 4.7,
    completedCount: 12500,
    tags: ['Portfolio', 'Animation', 'Responsive', 'Contact Form'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Framer Motion'],
    features: [
      'Responsive design',
      'Smooth animations',
      'Project showcase',
      'Contact form',
      'Dark/light theme',
      'SEO optimized',
    ],
    liveDemo: 'https://demo-portfolio.example.com',
    githubRepo: 'https://github.com/example/portfolio',
  },
  {
    id: 'restaurant-booking',
    title: 'Restaurant Booking System',
    description:
      'Develop a restaurant reservation system with table management and customer notifications.',
    category: 'fullstack',
    difficulty: 'intermediate',
    estimatedTime: 360,
    rating: 4.6,
    completedCount: 2800,
    tags: ['Booking', 'Restaurant', 'Notifications', 'Calendar'],
    technologies: ['React', 'Node.js', 'MySQL', 'Twilio'],
    features: [
      'Table reservation system',
      'Calendar integration',
      'SMS notifications',
      'Customer management',
      'Admin dashboard',
      'Payment integration',
    ],
    liveDemo: 'https://demo-restaurant-booking.example.com',
    githubRepo: 'https://github.com/example/restaurant-booking',
  },
  {
    id: 'crypto-tracker',
    title: 'Cryptocurrency Tracker',
    description:
      'Build a cryptocurrency tracking application with real-time prices and portfolio management.',
    category: 'frontend',
    difficulty: 'intermediate',
    estimatedTime: 200,
    rating: 4.8,
    completedCount: 4500,
    tags: ['Cryptocurrency', 'Real-time', 'Charts', 'Portfolio'],
    technologies: ['React', 'TypeScript', 'Chart.js', 'WebSocket'],
    features: [
      'Real-time price updates',
      'Portfolio tracking',
      'Price charts and graphs',
      'Price alerts',
      'Market analysis',
    ],
    liveDemo: 'https://demo-crypto-tracker.example.com',
    githubRepo: 'https://github.com/example/crypto-tracker',
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker App',
    description:
      'Create a comprehensive fitness tracking application with workout plans and progress monitoring.',
    category: 'mobile',
    difficulty: 'advanced',
    estimatedTime: 480,
    rating: 4.7,
    completedCount: 1900,
    tags: ['Fitness', 'Mobile', 'Health', 'Tracking'],
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Charts'],
    features: [
      'Workout tracking',
      'Progress monitoring',
      'Health data integration',
      'Social features',
      'Nutrition tracking',
      'Goal setting',
    ],
    liveDemo: 'https://demo-fitness-tracker.example.com',
    githubRepo: 'https://github.com/example/fitness-tracker',
    isPremium: true,
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: '📁', count: projects.length },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    count: projects.filter(p => p.category === 'frontend').length,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    count: projects.filter(p => p.category === 'backend').length,
  },
  {
    id: 'fullstack',
    label: 'Full-Stack',
    icon: '🚀',
    count: projects.filter(p => p.category === 'fullstack').length,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    count: projects.filter(p => p.category === 'mobile').length,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: '💻',
    count: projects.filter(p => p.category === 'desktop').length,
  },
  {
    id: 'game',
    label: 'Game',
    icon: '🎮',
    count: projects.filter(p => p.category === 'game').length,
  },
];

const difficulties = [
  { id: 'all', label: 'All Levels', color: 'gray' },
  { id: 'beginner', label: 'Beginner', color: 'green' },
  { id: 'intermediate', label: 'Intermediate', color: 'yellow' },
  { id: 'advanced', label: 'Advanced', color: 'red' },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    const matchesFree = !showFreeOnly || !project.isPremium;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesFree;
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
        return <Server className="w-5 h-5" />;
      case 'fullstack':
        return <Zap className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'desktop':
        return <Globe className="w-5 h-5" />;
      case 'game':
        return <Award className="w-5 h-5" />;
      default:
        return <FolderOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Practice Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Build real-world projects to enhance your portfolio and gain
            practical experience with modern technologies.
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
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
              {/* Free Projects Toggle */}
              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={e => setShowFreeOnly(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Show free projects only
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
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
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
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {difficulty.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Preview Image */}
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  {getCategoryIcon(project.category)}
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {project.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                      PREMIUM
                    </span>
                  )}
                  {project.isCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}
                  >
                    {project.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(project.category)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {project.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li className="text-gray-500 dark:text-gray-400">
                        +{project.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.estimatedTime}h</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{project.completedCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    href={`/practice/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Project</span>
                  </Link>
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                      title="View Live Demo"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubRepo && (
                    <a
                      href={project.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setShowFreeOnly(false);
              }}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start with a project that matches your skill level and interests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/practice/coding-exercises"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Try Coding Exercises
              </Link>
              <Link
                href="/learning-paths"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-200"
              >
                Explore Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
