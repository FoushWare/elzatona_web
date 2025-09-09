'use client';

import { useState, useMemo } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Code,
  Eye,
  MessageSquare,
  Star,
} from 'lucide-react';

interface CodeReviewExample {
  id: string;
  title: string;
  category:
    | 'react'
    | 'javascript'
    | 'css'
    | 'performance'
    | 'security'
    | 'accessibility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  originalCode: string;
  improvedCode: string;
  issues: {
    type: 'error' | 'warning' | 'suggestion';
    line: number;
    description: string;
    explanation: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  bestPractices: string[];
  explanation: string;
  tags: string[];
}

const codeReviewExamples: CodeReviewExample[] = [
  {
    id: 'cr-001',
    title: 'React Component with Performance Issues',
    category: 'react',
    difficulty: 'intermediate',
    language: 'jsx',
    originalCode: `import React, { useState, useEffect } from 'react';

function UserList({ users }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      {filteredUsers.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => console.log(user.id)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}`,
    improvedCode: `import React, { useState, useEffect, useMemo, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize filtered users to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Memoize click handler to prevent unnecessary re-renders
  const handleUserClick = useCallback((userId: string) => {
    console.log(userId);
  }, []);

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        aria-label="Search users"
      />
      {filteredUsers.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => handleUserClick(user.id)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}`,
    issues: [
      {
        type: 'warning',
        line: 8,
        description: 'Unnecessary state for filtered users',
        explanation:
          'The filtered users can be computed directly without storing in state, which causes unnecessary re-renders.',
        severity: 'medium',
      },
      {
        type: 'error',
        line: 1,
        description: 'Missing TypeScript interfaces',
        explanation:
          'Props and data structures should be properly typed for better maintainability and error prevention.',
        severity: 'high',
      },
      {
        type: 'warning',
        line: 20,
        description: 'Inline function in render',
        explanation:
          'Creating functions inline in render causes unnecessary re-renders of child components.',
        severity: 'medium',
      },
      {
        type: 'suggestion',
        line: 15,
        description: 'Missing accessibility attributes',
        explanation:
          'Input elements should have proper ARIA labels for screen readers.',
        severity: 'low',
      },
    ],
    bestPractices: [
      'Use TypeScript for better type safety',
      'Memoize expensive calculations with useMemo',
      'Use useCallback for event handlers to prevent unnecessary re-renders',
      'Add proper accessibility attributes',
      'Avoid unnecessary state when data can be computed',
    ],
    explanation:
      'This component had several performance and maintainability issues. The main problems were unnecessary state management, missing TypeScript types, and inline functions causing re-renders. The improved version uses proper memoization, TypeScript interfaces, and follows React best practices.',
    tags: [
      'react',
      'performance',
      'typescript',
      'memoization',
      'accessibility',
    ],
  },
  {
    id: 'cr-002',
    title: 'JavaScript Function with Security Vulnerabilities',
    category: 'javascript',
    difficulty: 'advanced',
    language: 'javascript',
    originalCode: `function processUserData(userData) {
  // Store user data in localStorage
  localStorage.setItem('userData', JSON.stringify(userData));
  
  // Process sensitive information
  const processedData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    password: userData.password, // Storing password in plain text
    creditCard: userData.creditCard
  };
  
  // Send to server
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(processedData)
  });
  
  // Log for debugging
  console.log('User data processed:', processedData);
}`,
    improvedCode: `import crypto from 'crypto';

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  creditCard?: string;
}

function processUserData(userData: UserData): Promise<void> {
  // Validate input data
  if (!userData || !userData.id || !userData.email) {
    throw new Error('Invalid user data provided');
  }
  
  // Hash password before any processing
  const hashedPassword = crypto.createHash('sha256')
    .update(userData.password)
    .digest('hex');
  
  // Remove sensitive data and create safe object
  const safeUserData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    passwordHash: hashedPassword
    // Note: creditCard data should never be stored client-side
  };
  
  // Store only non-sensitive data in localStorage
  localStorage.setItem('userData', JSON.stringify({
    id: safeUserData.id,
    name: safeUserData.name,
    email: safeUserData.email
  }));
  
  // Send to server with proper error handling
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${getAuthToken()}\`
    },
    body: JSON.stringify(safeUserData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  })
  .catch(error => {
    console.error('Failed to process user data:', error);
    throw error;
  });
}`,
    issues: [
      {
        type: 'error',
        line: 2,
        description: 'Storing sensitive data in localStorage',
        explanation:
          'localStorage is accessible to any script and persists across sessions, making it unsuitable for sensitive data.',
        severity: 'high',
      },
      {
        type: 'error',
        line: 8,
        description: 'Storing password in plain text',
        explanation:
          'Passwords should never be stored in plain text. They should be hashed using a secure algorithm.',
        severity: 'high',
      },
      {
        type: 'error',
        line: 9,
        description: 'Storing credit card information',
        explanation:
          'Credit card information should never be stored client-side and requires PCI compliance.',
        severity: 'high',
      },
      {
        type: 'warning',
        line: 15,
        description: 'No input validation',
        explanation:
          'User input should always be validated before processing to prevent injection attacks.',
        severity: 'medium',
      },
      {
        type: 'warning',
        line: 18,
        description: 'Logging sensitive data',
        explanation:
          'Sensitive information should never be logged as it can be exposed in logs.',
        severity: 'medium',
      },
      {
        type: 'suggestion',
        line: 12,
        description: 'Missing error handling',
        explanation:
          'Network requests should have proper error handling and user feedback.',
        severity: 'low',
      },
    ],
    bestPractices: [
      'Never store sensitive data in localStorage or sessionStorage',
      'Always hash passwords using secure algorithms',
      'Validate all user input before processing',
      'Never log sensitive information',
      'Use HTTPS for all data transmission',
      'Implement proper error handling for network requests',
      'Follow PCI compliance for credit card data',
      'Use proper authentication headers',
    ],
    explanation:
      'This function had multiple serious security vulnerabilities including storing sensitive data in localStorage, plain text passwords, and lack of input validation. The improved version implements proper security practices including password hashing, input validation, secure data handling, and proper error management.',
    tags: [
      'security',
      'javascript',
      'authentication',
      'data-protection',
      'validation',
    ],
  },
  {
    id: 'cr-003',
    title: 'CSS with Accessibility and Performance Issues',
    category: 'css',
    difficulty: 'beginner',
    language: 'css',
    originalCode: `/* User Profile Styles */
.user-profile {
  background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
  color: white;
  font-size: 14px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}

.profile-email {
  font-size: 16px;
  margin-left: 20px;
  color: #ffff00;
}

/* Hover effects */
.user-profile:hover {
  transform: scale(1.1);
  transition: all 0.3s ease;
}

/* Mobile styles */
@media (max-width: 768px) {
  .user-profile {
    flex-direction: column;
    height: 300px;
  }
  
  .profile-name {
    margin-left: 0;
    margin-top: 10px;
  }
  
  .profile-email {
    margin-left: 0;
    margin-top: 5px;
  }
}`,
    improvedCode: `/* User Profile Styles */
.user-profile {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-size: 1rem;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  object-fit: cover;
  flex-shrink: 0;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-left: 1.25rem;
  line-height: 1.4;
}

.profile-email {
  font-size: 1rem;
  margin-left: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

/* Focus and hover states for accessibility */
.user-profile:focus-within {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.user-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .user-profile:hover {
    transform: none;
    transition: none;
  }
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
  .user-profile {
    flex-direction: column;
    min-height: 250px;
    text-align: center;
    padding: 1.5rem;
  }
  
  .profile-name {
    margin-left: 0;
    margin-top: 0.75rem;
    font-size: 1.25rem;
  }
  
  .profile-email {
    margin-left: 0;
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .user-profile {
    background: #000000;
    border: 2px solid #ffffff;
  }
  
  .profile-image {
    border-color: #ffffff;
  }
}`,
    issues: [
      {
        type: 'error',
        line: 3,
        description: 'Poor color contrast',
        explanation:
          'The gradient with red, green, and blue creates poor contrast and may not meet WCAG accessibility standards.',
        severity: 'high',
      },
      {
        type: 'warning',
        line: 4,
        description: 'Using pixel values instead of relative units',
        explanation:
          "Pixel values don't scale well with user preferences and accessibility settings.",
        severity: 'medium',
      },
      {
        type: 'warning',
        line: 25,
        description: 'Yellow text on white background',
        explanation:
          'Yellow text (#ffff00) on white background has very poor contrast and is hard to read.',
        severity: 'medium',
      },
      {
        type: 'suggestion',
        line: 30,
        description: 'Missing focus states',
        explanation:
          'Interactive elements should have visible focus states for keyboard navigation.',
        severity: 'low',
      },
      {
        type: 'suggestion',
        line: 30,
        description: 'No reduced motion support',
        explanation:
          'Animations should respect user preferences for reduced motion.',
        severity: 'low',
      },
    ],
    bestPractices: [
      'Use relative units (rem, em) instead of pixels for better scalability',
      'Ensure sufficient color contrast for accessibility',
      'Provide focus states for keyboard navigation',
      'Support reduced motion preferences',
      'Use semantic color values and avoid hard-coded colors',
      'Implement high contrast mode support',
      'Use object-fit for images to maintain aspect ratios',
      'Provide proper spacing with consistent units',
    ],
    explanation:
      'The original CSS had several accessibility and usability issues including poor color contrast, hard-coded pixel values, and missing focus states. The improved version uses better color schemes, relative units, proper focus management, and supports accessibility preferences like reduced motion and high contrast.',
    tags: [
      'css',
      'accessibility',
      'responsive-design',
      'color-contrast',
      'usability',
    ],
  },
];

export default function CodeReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedExample, setSelectedExample] =
    useState<CodeReviewExample | null>(null);
  const [showIssues, setShowIssues] = useState<boolean>(false);

  const filteredExamples = useMemo(() => {
    let filtered = codeReviewExamples;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        example => example.category === selectedCategory
      );
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(
        example => example.difficulty === selectedDifficulty
      );
    }

    return filtered;
  }, [selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'suggestion':
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            👀 Code Review Practice
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn to identify and fix common code issues. Practice reviewing
            code for performance, security, accessibility, and best practices.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="react">React</option>
                <option value="javascript">JavaScript</option>
                <option value="css">CSS</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
                <option value="accessibility">Accessibility</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExamples.map(example => (
            <div
              key={example.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedExample(example)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Code className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {example.title}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}
                      >
                        {example.difficulty.charAt(0).toUpperCase() +
                          example.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {example.issues.length} issues
                    </span>
                  </div>
                </div>

                {/* Issues Summary */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {example.issues.filter(i => i.type === 'error').length}{' '}
                        errors
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {
                          example.issues.filter(i => i.type === 'warning')
                            .length
                        }{' '}
                        warnings
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lightbulb className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {
                          example.issues.filter(i => i.type === 'suggestion')
                            .length
                        }{' '}
                        suggestions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {example.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{example.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Click to view more */}
                <div className="text-center">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
                    Click to review code →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredExamples.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No examples found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Code Review Detail Modal */}
      {selectedExample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Code className="w-8 h-8 text-blue-500" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedExample.title}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedExample.difficulty)}`}
                      >
                        {selectedExample.difficulty.charAt(0).toUpperCase() +
                          selectedExample.difficulty.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedExample.language.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExample(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Toggle for showing issues */}
              <div className="mb-6">
                <button
                  onClick={() => setShowIssues(!showIssues)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showIssues
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {showIssues ? 'Hide Issues' : 'Show Issues'} (
                  {selectedExample.issues.length})
                </button>
              </div>

              {/* Issues List */}
              {showIssues && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Issues Found:
                  </h3>
                  <div className="space-y-3">
                    {selectedExample.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">
                                Line {issue.line}: {issue.description}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}
                              >
                                {issue.severity}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {issue.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Original Code */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    Original Code
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {selectedExample.originalCode}
                    </code>
                  </pre>
                </div>

                {/* Improved Code */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Improved Code
                  </h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="text-gray-800 dark:text-gray-200">
                      {selectedExample.improvedCode}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Explanation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedExample.explanation}
                </p>
              </div>

              {/* Best Practices */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Best Practices Applied
                </h3>
                <ul className="space-y-2">
                  {selectedExample.bestPractices.map((practice, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {practice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExample.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedExample(null)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
