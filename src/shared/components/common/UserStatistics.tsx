'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';

interface UserStats {
  activeLearners: number;
  successRate: number;
  totalQuestions: number;
  averageTime: string;
}

export const UserStatistics: React.FC = () => {
  const { isAuthenticated } = useFirebaseAuth();
  const [stats, setStats] = useState<UserStats>({
    activeLearners: 0,
    successRate: 0,
    totalQuestions: 0,
    averageTime: '0m',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and calculating stats
    const loadStats = async () => {
      setIsLoading(true);

      // In a real implementation, this would fetch from your backend/API
      // For now, we'll simulate with realistic numbers that grow over time
      const baseLearners = 8500; // Base number of learners
      const baseSuccessRate = 82; // Base success rate

      // Add some randomness and growth over time
      const timeBasedGrowth =
        Math.floor(Date.now() / (1000 * 60 * 60 * 24)) * 2; // 2 new learners per day
      const randomGrowth = Math.floor(Math.random() * 100);

      const activeLearners = baseLearners + timeBasedGrowth + randomGrowth;
      const successRate = Math.min(
        95,
        baseSuccessRate + Math.floor(Math.random() * 6)
      ); // Cap at 95%
      const totalQuestions = activeLearners * 45; // Average questions per user
      const averageTime = `${Math.floor(Math.random() * 30) + 15}m`; // 15-45 minutes

      // Animate the numbers
      await animateNumber(0, activeLearners, value => {
        setStats(prev => ({ ...prev, activeLearners: Math.floor(value) }));
      });

      await animateNumber(0, successRate, value => {
        setStats(prev => ({ ...prev, successRate: Math.floor(value) }));
      });

      await animateNumber(0, totalQuestions, value => {
        setStats(prev => ({ ...prev, totalQuestions: Math.floor(value) }));
      });

      setStats(prev => ({ ...prev, averageTime }));
      setIsLoading(false);
    };

    loadStats();
  }, [isAuthenticated]);

  const animateNumber = (
    start: number,
    end: number,
    callback: (value: number) => void
  ): Promise<void> => {
    return new Promise(resolve => {
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (end - start) * easeOutQuart;

        callback(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      animate();
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Active Learners */}
      <div className="text-center group">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {formatNumber(stats.activeLearners)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Active Learners
        </div>
      </div>

      {/* Success Rate */}
      <div className="text-center group">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {stats.successRate}%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Success Rate
        </div>
      </div>

      {/* Total Questions */}
      <div className="text-center group">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Award className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {formatNumber(stats.totalQuestions)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Questions Solved
        </div>
      </div>

      {/* Average Time */}
      <div className="text-center group">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {stats.averageTime}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Avg. Study Time
        </div>
      </div>
    </div>
  );
};
