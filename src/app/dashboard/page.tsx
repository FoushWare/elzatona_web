'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  BookOpen,
  Code,
  Target,
  TrendingUp,
  Clock,
  Award,
  Zap,
  BarChart3,
  CheckCircle,
} from 'lucide-react';

interface DashboardCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  category: string;
  icon: React.ReactNode;
}

const dashboardCards: DashboardCard[] = [
  {
    id: 'streak',
    title: 'Learning Streak',
    value: '7 days',
    change: '+2 days',
    changeType: 'positive',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-green-600',
  },
  {
    id: 'completed',
    title: 'Items Completed',
    value: '45',
    change: '+12 this week',
    changeType: 'positive',
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-blue-600',
  },
  {
    id: 'time',
    title: 'Study Time',
    value: '23h',
    change: '+5h this week',
    changeType: 'positive',
    icon: <Clock className="w-6 h-6" />,
    color: 'text-purple-600',
  },
  {
    id: 'accuracy',
    title: 'Quiz Accuracy',
    value: '87%',
    change: '+3% this week',
    changeType: 'positive',
    icon: <Target className="w-6 h-6" />,
    color: 'text-yellow-600',
  },
];

const recentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'Completed',
    title: 'CSS Grid Layout Challenge',
    time: '2 hours ago',
    icon: <Code className="w-4 h-4" />,
    color: 'text-green-600',
  },
  {
    id: '2',
    type: 'Started',
    title: 'React Hooks Deep Dive',
    time: '4 hours ago',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-blue-600',
  },
  {
    id: '3',
    type: 'Achieved',
    title: 'Performance Master Badge',
    time: '1 day ago',
    icon: <Award className="w-4 h-4" />,
    color: 'text-yellow-600',
  },
  {
    id: '4',
    type: 'Completed',
    title: 'JavaScript Fundamentals Quiz',
    time: '2 days ago',
    icon: <Target className="w-4 h-4" />,
    color: 'text-green-600',
  },
];

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Advanced CSS Animations',
    description:
      'Master CSS keyframes and transitions for smooth user experiences',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    category: 'CSS',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: '2',
    title: 'React Performance Optimization',
    description:
      'Learn React.memo, useMemo, and useCallback for better performance',
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    category: 'React',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: '3',
    title: 'System Design: E-commerce Platform',
    description:
      'Design a scalable e-commerce system with frontend considerations',
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    category: 'System Design',
    icon: <Target className="w-5 h-5" />,
  },
];

export default function DashboardPage() {
  const [showStatistics, setShowStatistics] = useState(false);

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return '↗️';
      case 'negative':
        return '↘️';
      default:
        return '→';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card shadow-sm border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome back, Developer! 👋
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your personalized dashboard with progress, recommendations, and
                learning insights
              </p>

              {/* Mobile Toggle Button */}
              <div className="flex justify-center mt-6 md:hidden">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                  <span className="ml-2">📊</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <div
            className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`}
          >
            {dashboardCards.map(card => (
              <div
                key={card.id}
                className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.color} p-2 rounded-lg bg-muted`}>
                    {card.icon}
                  </div>
                  <div
                    className={`text-sm font-medium ${getChangeColor(card.changeType)}`}
                  >
                    {getChangeIcon(card.changeType)} {card.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {card.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {card.title}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Activity
                  </h2>
                  <Link
                    href="/progress"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div
                        className={`${activity.color} p-2 rounded-lg bg-muted`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {activity.title}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/practice/fundamentals"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground"
                  >
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">
                      Practice Fundamentals
                    </span>
                  </Link>
                  <Link
                    href="/coding"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground"
                  >
                    <Code className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">
                      Take Coding Challenge
                    </span>
                  </Link>
                  <Link
                    href="/learning-paths"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground"
                  >
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">
                      Start Learning Path
                    </span>
                  </Link>
                  <Link
                    href="/progress"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-foreground"
                  >
                    <BarChart3 className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium">View Progress</span>
                  </Link>
                </div>
              </div>

              {/* Today's Goal */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  🎯 Today&apos;s Goal
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Complete 3 practice questions and spend 30 minutes coding
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>2/3 questions completed</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>20/30 minutes spent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Recommended for You
                </h2>
                <span className="text-sm text-muted-foreground">
                  Based on your learning pattern
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map(rec => (
                  <div
                    key={rec.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-blue-600 p-2 rounded-lg bg-muted">
                        {rec.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {rec.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {rec.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          rec.difficulty === 'Advanced'
                            ? 'bg-red-100 text-red-700'
                            : rec.difficulty === 'Intermediate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {rec.difficulty}
                      </span>
                      <span>⏱️ {rec.estimatedTime}</span>
                    </div>
                    <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Start Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Accelerate Your Learning?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of developers mastering frontend development
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/practice/fundamentals"
                  className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Start Practicing
                </Link>
                <Link
                  href="/learning-paths"
                  className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-600 transition-colors duration-200"
                >
                  Explore Paths
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
