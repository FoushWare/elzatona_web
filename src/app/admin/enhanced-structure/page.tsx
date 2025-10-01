'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Tag,
  FolderOpen,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  topics: Topic[];
  createdAt: string;
  updatedAt: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export default function EnhancedStructurePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  // const [editingCategory, setEditingCategory] = useState<string | null>(null);
  // const [editingTopic, setEditingTopic] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
  });

  const [newTopic, setNewTopic] = useState({
    name: '',
    description: '',
    categoryId: '',
    color: '#10B981',
  });

  const colors = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
    '#84CC16',
    '#F97316',
    '#EC4899',
    '#6366F1',
  ];

  // Load data on component mount
  useEffect(() => {
    loadCategoriesAndTopics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCategoriesAndTopics = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // For now, we'll use the predefined structure
      const predefinedCategories = getPredefinedCategories();
      setCategories(predefinedCategories);

      const allTopics = predefinedCategories.flatMap(cat => cat.topics);
      setTopics(allTopics);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPredefinedCategories = (): Category[] => {
    return [
      {
        id: 'javascript-core',
        name: 'JavaScript (Core)',
        description: 'Fundamental JavaScript concepts and features',
        color: '#F59E0B',
        topics: [
          {
            id: 'variables-scopes',
            name: 'Variables & Scopes',
            description: 'var, let, const and scope concepts',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'hoisting',
            name: 'Hoisting',
            description: 'Variable and function hoisting behavior',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'closures',
            name: 'Closures',
            description: 'Function closures and lexical scoping',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'execution-context',
            name: 'Execution Context & Call Stack',
            description: 'How JavaScript executes code',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'this-keyword',
            name: 'this keyword',
            description: 'Understanding the this keyword',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'prototypes',
            name: 'Prototypes & Inheritance',
            description: 'Prototype chain and inheritance',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'event-loop',
            name: 'Event Loop & Concurrency',
            description: 'Asynchronous JavaScript execution',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'promises',
            name: 'Promises & Async/Await',
            description: 'Modern asynchronous programming',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'error-handling',
            name: 'Error Handling',
            description: 'try/catch and error management',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'type-coercion',
            name: 'Type Coercion & Equality',
            description: '== vs === and type conversion',
            categoryId: 'javascript-core',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'html',
        name: 'HTML',
        description: 'HTML markup and semantic structure',
        color: '#EF4444',
        topics: [
          {
            id: 'semantic-html',
            name: 'Semantic HTML',
            description: 'Meaningful HTML elements',
            categoryId: 'html',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'forms-validation',
            name: 'Forms & Validation',
            description: 'HTML forms and input validation',
            categoryId: 'html',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'accessibility',
            name: 'Accessibility (ARIA)',
            description: 'Making web content accessible',
            categoryId: 'html',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'seo-basics',
            name: 'SEO Basics',
            description: 'Search engine optimization fundamentals',
            categoryId: 'html',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'css',
        name: 'CSS',
        description: 'Styling and layout with CSS',
        color: '#8B5CF6',
        topics: [
          {
            id: 'selectors-specificity',
            name: 'CSS Selectors & Specificity',
            description: 'CSS selector types and specificity rules',
            categoryId: 'css',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'box-model',
            name: 'Box Model',
            description: 'Content, padding, border, margin',
            categoryId: 'css',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'flexbox',
            name: 'Flexbox',
            description: 'Flexible box layout',
            categoryId: 'css',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'grid-layout',
            name: 'Grid Layout',
            description: 'CSS Grid system',
            categoryId: 'css',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'responsive-design',
            name: 'Responsive Design',
            description: 'Mobile-first and responsive layouts',
            categoryId: 'css',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'react',
        name: 'React',
        description: 'React library for building user interfaces',
        color: '#06B6D4',
        topics: [
          {
            id: 'jsx-rendering',
            name: 'JSX & Rendering',
            description: 'JSX syntax and component rendering',
            categoryId: 'react',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'components',
            name: 'Components',
            description: 'Functional vs Class components',
            categoryId: 'react',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'props-state',
            name: 'Props & State',
            description: 'Component data management',
            categoryId: 'react',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'hooks',
            name: 'Hooks',
            description: 'useState, useEffect, and custom hooks',
            categoryId: 'react',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'virtual-dom',
            name: 'Virtual DOM',
            description: "React's virtual DOM and reconciliation",
            categoryId: 'react',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'performance',
        name: 'Performance',
        description: 'Web performance optimization techniques',
        color: '#84CC16',
        topics: [
          {
            id: 'bundle-optimization',
            name: 'Bundle Size Optimization',
            description: 'Reducing JavaScript bundle size',
            categoryId: 'performance',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'code-splitting',
            name: 'Code Splitting',
            description: 'Lazy loading and dynamic imports',
            categoryId: 'performance',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'web-vitals',
            name: 'Web Vitals',
            description: 'Core Web Vitals metrics',
            categoryId: 'performance',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'security',
        name: 'Security',
        description: 'Web security best practices and vulnerabilities',
        color: '#DC2626',
        topics: [
          {
            id: 'xss-prevention',
            name: 'XSS Prevention',
            description: 'Cross-Site Scripting attacks and prevention',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'csrf-protection',
            name: 'CSRF Protection',
            description: 'Cross-Site Request Forgery prevention',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'cors-security',
            name: 'CORS & Security Headers',
            description: 'Cross-Origin Resource Sharing and security headers',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'authentication',
            name: 'Authentication & Authorization',
            description: 'JWT, OAuth, session management, and access control',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'data-protection',
            name: 'Data Protection',
            description: 'Encryption, secure storage, and data privacy',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'content-security-policy',
            name: 'Content Security Policy',
            description: 'CSP implementation and security policies',
            categoryId: 'security',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'system-design',
        name: 'System Design',
        description: 'Scalable system architecture and design patterns',
        color: '#7C3AED',
        topics: [
          {
            id: 'scalability',
            name: 'Scalability',
            description: 'Horizontal vs vertical scaling, load balancing',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'microservices',
            name: 'Microservices Architecture',
            description: 'Service decomposition, API design, and communication',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'database-design',
            name: 'Database Design',
            description: 'SQL vs NoSQL, indexing, sharding, and replication',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'caching-strategies',
            name: 'Caching Strategies',
            description: 'Redis, Memcached, CDN, and cache invalidation',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'message-queues',
            name: 'Message Queues',
            description:
              'Event-driven architecture, pub/sub, and async processing',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'monitoring-observability',
            name: 'Monitoring & Observability',
            description: 'Logging, metrics, tracing, and alerting',
            categoryId: 'system-design',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'patterns',
        name: 'Design Patterns',
        description: 'Software design patterns and architectural patterns',
        color: '#059669',
        topics: [
          {
            id: 'creational-patterns',
            name: 'Creational Patterns',
            description: 'Singleton, Factory, Builder, and Prototype patterns',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'structural-patterns',
            name: 'Structural Patterns',
            description: 'Adapter, Decorator, Facade, and Proxy patterns',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'behavioral-patterns',
            name: 'Behavioral Patterns',
            description: 'Observer, Strategy, Command, and State patterns',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'frontend-patterns',
            name: 'Frontend Patterns',
            description: 'MVC, MVP, MVVM, and component patterns',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'react-patterns',
            name: 'React Patterns',
            description:
              'HOC, Render Props, Custom Hooks, and Compound Components',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'api-patterns',
            name: 'API Design Patterns',
            description: 'REST, GraphQL, RPC, and API versioning strategies',
            categoryId: 'patterns',
            color: '#10B981',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const createCategory = async () => {
    if (!newCategory.name.trim()) return;

    const category: Category = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      description: newCategory.description,
      color: newCategory.color,
      topics: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', description: '', color: '#3B82F6' });
    setIsCreatingCategory(false);
  };

  const createTopic = async () => {
    if (!newTopic.name.trim() || !newTopic.categoryId) return;

    const topic: Topic = {
      id: `topic-${Date.now()}`,
      name: newTopic.name,
      description: newTopic.description,
      categoryId: newTopic.categoryId,
      color: newTopic.color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTopics(prev => [...prev, topic]);
    setCategories(prev =>
      prev.map(cat =>
        cat.id === newTopic.categoryId
          ? { ...cat, topics: [...cat.topics, topic] }
          : cat
      )
    );
    setNewTopic({
      name: '',
      description: '',
      categoryId: '',
      color: '#10B981',
    });
    setIsCreatingTopic(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading structure...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Enhanced Structure
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage categories and topics for organizing questions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Categories
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Tag className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Topics
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {topics.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  155
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setIsCreatingCategory(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
          <button
            onClick={() => setIsCreatingTopic(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Topic</span>
          </button>
        </div>

        {/* Categories and Topics */}
        <div className="space-y-4">
          {categories.map(category => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {category.topics.length} topics
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {expandedCategories.has(category.id) && (
                  <div className="mt-4 space-y-2">
                    {category.topics.map(topic => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: topic.color }}
                          ></div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {topic.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Create Category Modal */}
        {isCreatingCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Category
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={e =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={e =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Category description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() =>
                          setNewCategory({ ...newCategory, color })
                        }
                        className={`w-8 h-8 rounded-full border-2 ${
                          newCategory.color === color
                            ? 'border-gray-900 dark:border-white'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsCreatingCategory(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={createCategory}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Topic Modal */}
        {isCreatingTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Topic
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newTopic.categoryId}
                    onChange={e =>
                      setNewTopic({ ...newTopic, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newTopic.name}
                    onChange={e =>
                      setNewTopic({ ...newTopic, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Topic name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newTopic.description}
                    onChange={e =>
                      setNewTopic({ ...newTopic, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                    placeholder="Topic description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setNewTopic({ ...newTopic, color })}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newTopic.color === color
                            ? 'border-gray-900 dark:border-white'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsCreatingTopic(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={createTopic}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
