'use client';

import { useState } from 'react';
import { Target, BookOpen, Code, Zap } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProgressAnalytics from '@/components/ProgressAnalytics';
import ContinueWhereLeftOff from '@/components/ContinueWhereLeftOff';

interface ProgressItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  total: number;
  completed: number;
  icon: React.ReactNode;
  color: string;
}

const progressData: ProgressItem[] = [
  {
    id: 'fundamentals',
    title: 'Frontend Fundamentals',
    category: 'Core Skills',
    progress: 75,
    total: 500,
    completed: 375,
    icon: <BookOpen className="w-6 h-6" />,
    color: 'text-blue-600',
  },
  {
    id: 'coding',
    title: 'Coding Challenges',
    category: 'Practice',
    progress: 45,
    total: 100,
    completed: 45,
    icon: <Code className="w-6 h-6" />,
    color: 'text-green-600',
  },
  {
    id: 'system-design',
    title: 'System Design',
    category: 'Advanced',
    progress: 30,
    total: 50,
    completed: 15,
    icon: <Target className="w-6 h-6" />,
    color: 'text-purple-600',
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    category: 'Advanced',
    progress: 60,
    total: 80,
    completed: 48,
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-600',
  },
];

export default function ProgressPage() {
  const [showStatistics, setShowStatistics] = useState(false);

  const totalProgress =
    progressData.reduce((sum, item) => sum + item.progress, 0) /
    progressData.length;
  const totalCompleted = progressData.reduce(
    (sum, item) => sum + item.completed,
    0
  );
  const totalItems = progressData.reduce((sum, item) => sum + item.total, 0);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card shadow-sm border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Learning Progress
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Track your frontend development journey and celebrate your
                achievements
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
          {/* Enhanced Analytics Section */}
          <div className="mb-8">
            <ProgressAnalytics />
          </div>

          {/* Continue Where Left Off */}
          <div className="mb-8">
            <ContinueWhereLeftOff />
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {progressData.map(item => (
              <div
                key={item.id}
                className="bg-card rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${item.color} p-2 rounded-lg bg-muted`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-2xl font-bold ${getProgressColor(item.progress)}`}
                  >
                    {item.progress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>
                      {item.completed} / {item.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(item.progress)}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Continue Learning
                  </button>
                  <button className="px-4 py-2 border border-border text-foreground text-sm rounded-lg hover:bg-muted transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              🏆 Your Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🥇</div>
                <h3 className="text-xl font-semibold mb-2">
                  Fundamentals Master
                </h3>
                <p className="text-purple-100">
                  Completed 75% of core concepts
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Code Warrior</h3>
                <p className="text-purple-100">Solved 45 coding challenges</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Performance Guru</h3>
                <p className="text-purple-100">
                  Mastered optimization techniques
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
              <p className="text-xl mb-6 opacity-90">
                Continue your learning journey and unlock new achievements
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/practice/fundamentals"
                  className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Practice Fundamentals
                </Link>
                <Link
                  href="/coding"
                  className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-600 transition-colors duration-200"
                >
                  Take Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
