'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  Award,
  Zap,
  Target,
  BookOpen,
  Code,
  TrendingUp,
  Crown,
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
  points: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  level: number;
  streak: number;
  avatar: string;
}

const badges: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first practice question',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    unlocked: true,
    progress: 100,
    requirement: '1 question completed',
    points: 10,
  },
  {
    id: 'code-warrior',
    name: 'Code Warrior',
    description: 'Complete 50 coding challenges',
    icon: <Code className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    unlocked: false,
    progress: 45,
    requirement: '50 challenges completed',
    points: 100,
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    unlocked: false,
    progress: 71,
    requirement: '7-day streak',
    points: 75,
  },
  {
    id: 'performance-guru',
    name: 'Performance Guru',
    description: 'Achieve 90%+ accuracy in performance quizzes',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    unlocked: false,
    progress: 87,
    requirement: '90% accuracy',
    points: 150,
  },
  {
    id: 'system-architect',
    name: 'System Architect',
    description: 'Complete 10 system design challenges',
    icon: <Target className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    unlocked: false,
    progress: 30,
    requirement: '10 challenges completed',
    points: 200,
  },
  {
    id: 'frontend-master',
    name: 'Frontend Master',
    description: 'Complete all fundamental topics',
    icon: <Crown className="w-6 h-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    unlocked: false,
    progress: 75,
    requirement: 'All fundamentals completed',
    points: 500,
  },
];

const achievements: Achievement[] = [
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 5 questions in a single day',
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    unlocked: true,
    unlockedAt: '2024-01-15',
    points: 25,
    rarity: 'common',
  },
  {
    id: 'accuracy-champion',
    title: 'Accuracy Champion',
    description: 'Achieve 100% accuracy in a quiz',
    icon: <Target className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    unlocked: true,
    unlockedAt: '2024-01-10',
    points: 50,
    rarity: 'rare',
  },
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Study for 5+ hours over a weekend',
    icon: <Zap className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    unlocked: false,
    points: 100,
    rarity: 'epic',
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 3 different learning paths',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    unlocked: false,
    points: 200,
    rarity: 'legendary',
  },
];

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'CodeMaster',
    points: 2840,
    level: 15,
    streak: 12,
    avatar: '👑',
  },
  {
    rank: 2,
    username: 'DevPro',
    points: 2670,
    level: 14,
    streak: 8,
    avatar: '🥈',
  },
  {
    rank: 3,
    username: 'FrontendGuru',
    points: 2450,
    level: 13,
    streak: 15,
    avatar: '🥉',
  },
  {
    rank: 4,
    username: 'ReactNinja',
    points: 2180,
    level: 12,
    streak: 6,
    avatar: '⭐',
  },
  {
    rank: 5,
    username: 'CSSWizard',
    points: 1950,
    level: 11,
    streak: 9,
    avatar: '🔥',
  },
  {
    rank: 6,
    username: 'JavaScriptKing',
    points: 1780,
    level: 10,
    streak: 7,
    avatar: '💎',
  },
  {
    rank: 7,
    username: 'WebDevPro',
    points: 1620,
    level: 9,
    streak: 5,
    avatar: '🚀',
  },
  {
    rank: 8,
    username: 'UIMaster',
    points: 1480,
    level: 8,
    streak: 11,
    avatar: '🎯',
  },
  {
    rank: 9,
    username: 'PerformanceGuru',
    points: 1350,
    level: 7,
    streak: 4,
    avatar: '⚡',
  },
  {
    rank: 10,
    username: 'AccessibilityPro',
    points: 1220,
    level: 6,
    streak: 8,
    avatar: '♿',
  },
];

export default function GamificationPage() {
  const [showStatistics, setShowStatistics] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'badges' | 'achievements' | 'leaderboard'
  >('badges');

  const totalPoints =
    badges.reduce(
      (sum, badge) => sum + (badge.unlocked ? badge.points : 0),
      0
    ) +
    achievements.reduce(
      (sum, achievement) =>
        sum + (achievement.unlocked ? achievement.points : 0),
      0
    );

  const unlockedBadges = badges.filter(badge => badge.unlocked).length;
  const unlockedAchievements = achievements.filter(
    achievement => achievement.unlocked
  ).length;
  const totalBadges = badges.length;
  const totalAchievements = achievements.length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
      case 'rare':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'epic':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'legendary':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '⭐';
      case 'rare':
        return '🌟';
      case 'epic':
        return '💫';
      case 'legendary':
        return '👑';
      default:
        return '⭐';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                🏆 Gamification Center
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Earn badges, unlock achievements, and compete on the leaderboard
              </p>

              {/* Mobile Toggle Button */}
              <div className="flex justify-center mt-6 md:hidden">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
                  <span className="ml-2">📊</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Section */}
          <div
            className={`${showStatistics ? 'block' : 'hidden md:grid'} grid-cols-1 md:grid-cols-4 gap-6 mb-8`}
          >
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {totalPoints}
              </div>
              <div className="text-card-foreground font-medium">
                Total Points
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {unlockedBadges}/{totalBadges}
              </div>
              <div className="text-card-foreground font-medium">
                Badges Unlocked
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {unlockedAchievements}/{totalAchievements}
              </div>
              <div className="text-card-foreground font-medium">
                Achievements
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">#15</div>
              <div className="text-card-foreground font-medium">
                Leaderboard Rank
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg">
            {[
              { id: 'badges', label: 'Badges', icon: '🏅' },
              { id: 'achievements', label: 'Achievements', icon: '🏆' },
              { id: 'leaderboard', label: 'Leaderboard', icon: '📊' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as 'badges' | 'achievements' | 'leaderboard'
                  )
                }
                className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`bg-card rounded-lg shadow-sm border border-border p-6 transition-all duration-200 ${
                    badge.unlocked ? 'hover:shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                        badge.unlocked ? badge.bgColor : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`${badge.unlocked ? badge.color : 'text-muted-foreground'}`}
                      >
                        {badge.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {badge.description}
                    </p>

                    {badge.unlocked ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                          <span>✅ Unlocked</span>
                          <span className="font-medium">
                            +{badge.points} pts
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${badge.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {badge.progress}% - {badge.requirement}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reward: {badge.points} points
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`bg-card rounded-lg shadow-sm border border-border p-6 transition-all duration-200 ${
                    achievement.unlocked ? 'hover:shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        achievement.unlocked ? achievement.bgColor : 'bg-muted'
                      }`}
                    >
                      <div
                        className={`${achievement.unlocked ? achievement.color : 'text-muted-foreground'}`}
                      >
                        {achievement.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {achievement.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}
                        >
                          {getRarityIcon(achievement.rarity)}{' '}
                          {achievement.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>

                      {achievement.unlocked ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <span>✅ Unlocked</span>
                            <span className="font-medium">
                              +{achievement.points} pts
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Unlocked on {achievement.unlockedAt}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Reward: {achievement.points} points
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              {/* Your Stats */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,250</div>
                    <div className="text-blue-100 text-sm">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-blue-100 text-sm">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-blue-100 text-sm">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">#15</div>
                    <div className="text-blue-100 text-sm">Global Rank</div>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Global Leaderboard
                </h3>
                <div className="space-y-3">
                  {leaderboard.map(entry => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        entry.rank <= 3
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="text-2xl font-bold text-foreground w-8 text-center">
                        {entry.rank === 1
                          ? '🥇'
                          : entry.rank === 2
                            ? '🥈'
                            : entry.rank === 3
                              ? '🥉'
                              : entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">
                          {entry.username}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Level {entry.level} • {entry.streak} day streak
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          {entry.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
              <p className="text-xl mb-6 opacity-90">
                Start practicing to earn more badges and climb the leaderboard
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/practice/fundamentals"
                  className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Practice Now
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
