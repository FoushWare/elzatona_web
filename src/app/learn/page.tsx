'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserType } from '@/contexts/UserTypeContext';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  Compass,
  Map,
  Target,
  Award,
  Brain,
  Zap,
} from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  rating: number;
  lessons: number;
  completedLessons: number;
  category: string;
  isEnrolled: boolean;
  isCompleted: boolean;
  progress: number;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isCompleted: boolean;
  category: string;
}

const learningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Frontend Fundamentals',
    description:
      'Master the basics of HTML, CSS, and JavaScript with hands-on projects and real-world examples.',
    duration: '4 weeks',
    difficulty: 'Beginner',
    students: 12500,
    rating: 4.8,
    lessons: 24,
    completedLessons: 18,
    category: 'Foundation',
    isEnrolled: true,
    isCompleted: false,
    progress: 75,
  },
  {
    id: '2',
    title: 'React Mastery',
    description:
      'Deep dive into React ecosystem including hooks, context, state management, and performance optimization.',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    students: 8900,
    rating: 4.7,
    lessons: 32,
    completedLessons: 0,
    category: 'Framework',
    isEnrolled: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '3',
    title: 'Advanced Frontend Architecture',
    description:
      'Learn advanced patterns, micro-frontends, performance optimization, and scalable architecture.',
    duration: '8 weeks',
    difficulty: 'Advanced',
    students: 3200,
    rating: 4.9,
    lessons: 28,
    completedLessons: 0,
    category: 'Architecture',
    isEnrolled: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Interview Preparation',
    description:
      'Comprehensive preparation for frontend interviews with mock interviews, system design, and coding challenges.',
    duration: '3 weeks',
    difficulty: 'Intermediate',
    students: 15600,
    rating: 4.6,
    lessons: 18,
    completedLessons: 0,
    category: 'Career',
    isEnrolled: false,
    isCompleted: false,
    progress: 0,
  },
];

const customRoadmap: RoadmapItem[] = [
  {
    id: '1',
    title: 'JavaScript ES6+ Features',
    description:
      'Learn modern JavaScript features including arrow functions, destructuring, modules, and async/await.',
    duration: '2 weeks',
    difficulty: 'Medium',
    isCompleted: true,
    category: 'JavaScript',
  },
  {
    id: '2',
    title: 'CSS Grid & Flexbox',
    description:
      'Master modern CSS layout techniques for responsive and flexible designs.',
    duration: '1 week',
    difficulty: 'Medium',
    isCompleted: true,
    category: 'CSS',
  },
  {
    id: '3',
    title: 'React Hooks Deep Dive',
    description:
      'Understand useState, useEffect, useContext, and custom hooks in detail.',
    duration: '2 weeks',
    difficulty: 'Hard',
    isCompleted: false,
    category: 'React',
  },
  {
    id: '4',
    title: 'TypeScript Fundamentals',
    description:
      'Learn TypeScript basics, interfaces, generics, and advanced type features.',
    duration: '3 weeks',
    difficulty: 'Medium',
    isCompleted: false,
    category: 'TypeScript',
  },
  {
    id: '5',
    title: 'Testing with Jest & React Testing Library',
    description:
      'Write comprehensive tests for React applications using modern testing tools.',
    duration: '2 weeks',
    difficulty: 'Hard',
    isCompleted: false,
    category: 'Testing',
  },
];

export default function LearnPage() {
  const { userType } = useUserType();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'paths' | 'roadmap'>('paths');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  // Redirect guided users to guided learning page
  useEffect(() => {
    if (userType === 'guided') {
      router.push('/guided-learning');
    }
  }, [userType, router]);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredPaths =
    selectedDifficulty === 'All'
      ? learningPaths
      : learningPaths.filter(path => path.difficulty === selectedDifficulty);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getDifficultyColorRoadmap = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    userType === 'guided'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}
                >
                  {userType === 'guided' ? (
                    <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userType === 'guided'
                    ? 'Guided Learning'
                    : 'Learning Center'}
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {userType === 'guided'
                  ? 'Structured learning paths with clear milestones and progress tracking'
                  : 'Choose your learning style: structured paths or custom roadmaps'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('paths')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'paths'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Map className="w-4 h-4 inline mr-2" />
                Learning Paths
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'roadmap'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Compass className="w-4 h-4 inline mr-2" />
                My Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'paths' ? (
          <>
            {/* Learning Paths Tab */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Structured Learning Paths
                </h2>
                <div className="flex space-x-2">
                  {difficulties.map(difficulty => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDifficulty === difficulty
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPaths.map(path => (
                  <div
                    key={path.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {path.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}
                          >
                            {path.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {path.description}
                        </p>
                      </div>
                      {path.isCompleted && (
                        <div className="ml-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                            <Award className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {path.isEnrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {path.completedLessons} of {path.lessons} lessons
                          completed
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{path.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{path.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{path.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{path.lessons} lessons</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {path.category}
                      </span>
                      <button
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          path.isEnrolled
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {path.isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                        <ArrowRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Custom Roadmap Tab */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    My Custom Roadmap
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your personalized learning journey with flexible scheduling
                  </p>
                </div>
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                  <Compass className="w-4 h-4 inline mr-2" />
                  Add New Goal
                </button>
              </div>

              {/* Roadmap Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Overall Progress
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {customRoadmap.filter(item => item.isCompleted).length} of{' '}
                    {customRoadmap.length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(customRoadmap.filter(item => item.isCompleted).length / customRoadmap.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Custom Frontend Development Path</span>
                  <span>
                    {Math.round(
                      (customRoadmap.filter(item => item.isCompleted).length /
                        customRoadmap.length) *
                        100
                    )}
                    % Complete
                  </span>
                </div>
              </div>

              {/* Roadmap Items */}
              <div className="space-y-4">
                {customRoadmap.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.isCompleted
                              ? 'bg-green-100 dark:bg-green-900/20'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          {item.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3
                              className={`text-lg font-semibold ${
                                item.isCompleted
                                  ? 'text-green-600 dark:text-green-400'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {item.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColorRoadmap(item.difficulty)}`}
                            >
                              {item.difficulty}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                            <span>{item.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <button
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            item.isCompleted
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          {item.isCompleted ? 'Completed' : 'Start Learning'}
                          {!item.isCompleted && (
                            <ArrowRight className="w-4 h-4 inline ml-2" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
