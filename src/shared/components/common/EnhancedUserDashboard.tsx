'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Target,
  Zap,
  BarChart3,
  CheckCircle,
  Trophy,
  Clock,
  TrendingUp,
  Award,
  Activity,
  Share,
  Settings,
  Play,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';

interface UserActivity {
  id: string;
  type:
    | 'question_answered'
    | 'plan_completed'
    | 'streak_milestone'
    | 'badge_earned'
    | 'session_started'
    | 'session_completed';
  title: string;
  description: string;
  timestamp: Date;
  points?: number;
  metadata?: Record<string, unknown>;
}

interface LearningPlanProgress {
  planId: string;
  planName: string;
  duration: number;
  progress: number;
  currentDay: number;
  averageScore: number;
  completedQuestions: number;
  totalQuestions: number;
  startDate: Date;
  lastActivity: Date;
  isCompleted: boolean;
  completionDate?: Date;
  sections: {
    name: string;
    progress: number;
    averageScore: number;
  }[];
}

interface UserStats {
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number;
  badgesEarned: number;
  plansCompleted: number;
  weeklyProgress: number[];
  monthlyProgress: number[];
  skillLevels: Record<string, number>;
  recentActivities: UserActivity[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  progress?: number;
  maxProgress?: number;
}

export default function EnhancedUserDashboard() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [learningPlans, setLearningPlans] = useState<LearningPlanProgress[]>(
    []
  );
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivities, setRecentActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'progress' | 'achievements' | 'activity'
  >('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockUserStats: UserStats = {
      totalQuestionsAnswered: 247,
      totalCorrectAnswers: 198,
      averageScore: 80.2,
      currentStreak: 7,
      longestStreak: 15,
      totalStudyTime: 1240, // minutes
      badgesEarned: 8,
      plansCompleted: 2,
      weeklyProgress: [65, 72, 68, 75, 80, 85, 82],
      monthlyProgress: [70, 75, 80, 82],
      skillLevels: {
        HTML: 85,
        CSS: 78,
        JavaScript: 82,
        React: 75,
        TypeScript: 68,
        Performance: 70,
      },
      recentActivities: [],
    };

    const mockLearningPlans: LearningPlanProgress[] = [
      {
        planId: '3-day-plan',
        planName: '3 Day Comprehensive Plan',
        duration: 3,
        progress: 85,
        currentDay: 3,
        averageScore: 82,
        completedQuestions: 127,
        totalQuestions: 150,
        startDate: new Date(Date.now() - 3 * 86400000),
        lastActivity: new Date(Date.now() - 3600000),
        isCompleted: false,
        sections: [
          { name: 'HTML & CSS', progress: 100, averageScore: 85 },
          { name: 'JavaScript', progress: 90, averageScore: 80 },
          { name: 'React', progress: 75, averageScore: 78 },
          { name: 'TypeScript', progress: 60, averageScore: 75 },
        ],
      },
      {
        planId: '1-day-plan',
        planName: '1 Day Intensive',
        duration: 1,
        progress: 100,
        currentDay: 1,
        averageScore: 88,
        completedQuestions: 50,
        totalQuestions: 50,
        startDate: new Date(Date.now() - 7 * 86400000),
        lastActivity: new Date(Date.now() - 7 * 86400000),
        isCompleted: true,
        completionDate: new Date(Date.now() - 7 * 86400000),
        sections: [
          { name: 'JavaScript Fundamentals', progress: 100, averageScore: 90 },
          { name: 'React Basics', progress: 100, averageScore: 85 },
          { name: 'CSS Layout', progress: 100, averageScore: 88 },
        ],
      },
    ];

    const mockAchievements: Achievement[] = [
      {
        id: 'first_question',
        name: 'First Steps',
        description: 'Answer your first question',
        icon: '🎯',
        earned: true,
        earnedDate: new Date(Date.now() - 30 * 86400000),
      },
      {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        earned: true,
        earnedDate: new Date(Date.now() - 2 * 86400000),
      },
      {
        id: 'plan_complete',
        name: 'Plan Master',
        description: 'Complete your first learning plan',
        icon: '🏆',
        earned: true,
        earnedDate: new Date(Date.now() - 7 * 86400000),
      },
      {
        id: 'perfect_score',
        name: 'Perfectionist',
        description: 'Get a perfect score on a plan',
        icon: '⭐',
        earned: false,
        progress: 88,
        maxProgress: 100,
      },
      {
        id: 'streak_30',
        name: 'Monthly Master',
        description: 'Maintain a 30-day streak',
        icon: '👑',
        earned: false,
        progress: 7,
        maxProgress: 30,
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Complete 10 questions in under 5 minutes',
        icon: '⚡',
        earned: false,
        progress: 7,
        maxProgress: 10,
      },
    ];

    const mockRecentActivities: UserActivity[] = [
      {
        id: '1',
        type: 'question_answered',
        title: 'Answered JavaScript question',
        description: 'Correctly answered "What is hoisting in JavaScript?"',
        timestamp: new Date(Date.now() - 3600000),
        points: 10,
      },
      {
        id: '2',
        type: 'session_completed',
        title: 'Completed study session',
        description: 'Finished 15 questions with 85% accuracy',
        timestamp: new Date(Date.now() - 7200000),
        points: 25,
      },
      {
        id: '3',
        type: 'badge_earned',
        title: 'Earned Week Warrior badge',
        description: 'Maintained a 7-day study streak',
        timestamp: new Date(Date.now() - 86400000),
        points: 50,
      },
      {
        id: '4',
        type: 'plan_completed',
        title: 'Completed 1 Day Intensive plan',
        description: 'Finished all 50 questions with 88% average score',
        timestamp: new Date(Date.now() - 7 * 86400000),
        points: 100,
      },
    ];

    setUserStats(mockUserStats);
    setLearningPlans(mockLearningPlans);
    setAchievements(mockAchievements);
    setRecentActivities(mockRecentActivities);
    setLoading(false);
  }, []);

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeLetter = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'question_answered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'plan_completed':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'streak_milestone':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'badge_earned':
        return <Award className="w-4 h-4 text-purple-500" />;
      case 'session_started':
        return <Play className="w-4 h-4 text-orange-500" />;
      case 'session_completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!userStats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start learning to see your progress and achievements.
          </p>
          <Link href="/guided-learning">
            <Button className="bg-red-600 hover:bg-red-700">
              Start Learning
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Learning Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your progress, achievements, and learning journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Progress
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-white dark:bg-gray-800 rounded-lg p-1 w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'activity', label: 'Activity', icon: Activity },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | 'overview'
                      | 'progress'
                      | 'achievements'
                      | 'activity'
                  )
                }
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Questions Answered
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {userStats.totalQuestionsAnswered}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Accuracy:{' '}
                      {Math.round(
                        (userStats.totalCorrectAnswers /
                          userStats.totalQuestionsAnswered) *
                          100
                      )}
                      %
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Average Score
                      </p>
                      <p
                        className={`text-2xl font-bold ${getGradeColor(userStats.averageScore)}`}
                      >
                        {userStats.averageScore}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Badge className={getGradeColor(userStats.averageScore)}>
                      Grade: {getGradeLetter(userStats.averageScore)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Current Streak
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {userStats.currentStreak} days
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Best: {userStats.longestStreak} days
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Study Time
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatTime(userStats.totalStudyTime)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {userStats.badgesEarned} badges earned
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Learning Plans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPlans.map(plan => (
                    <div
                      key={plan.planId}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {plan.planName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {plan.completedQuestions}/{plan.totalQuestions}{' '}
                            questions completed
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${getGradeColor(plan.averageScore)}`}
                          >
                            {plan.averageScore}%
                          </p>
                          <Badge
                            variant={plan.isCompleted ? 'default' : 'secondary'}
                          >
                            {plan.isCompleted ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={plan.progress} className="mb-3" />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {plan.sections.map((section, index) => (
                          <div key={index} className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {section.name}
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {section.progress}%
                            </p>
                            <p className="text-xs text-gray-500">
                              {section.averageScore}% avg
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Skill Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userStats.skillLevels).map(
                    ([skill, level]) => (
                      <div
                        key={skill}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill}
                        </span>
                        <div className="flex items-center space-x-3">
                          <Progress value={level} className="w-32" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                            {level}%
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.weeklyProgress.map((progress, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Day {index + 1}
                        </span>
                        <div className="flex items-center space-x-3">
                          <Progress value={progress} className="w-32" />
                          <span className="text-sm font-medium w-12">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.monthlyProgress.map((progress, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Week {index + 1}
                        </span>
                        <div className="flex items-center space-x-3">
                          <Progress value={progress} className="w-32" />
                          <span className="text-sm font-medium w-12">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">
                      {achievement.earned ? achievement.icon : '🔒'}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-yellow-100 text-yellow-800 mb-2">
                          Earned
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {achievement.earnedDate?.toLocaleDateString()}
                        </p>
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div>
                        <Progress
                          value={
                            (achievement.progress / achievement.maxProgress!) *
                            100
                          }
                          className="mb-2"
                        />
                        <p className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </p>
                      </div>
                    ) : (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                      {activity.points && (
                        <div className="flex-shrink-0">
                          <Badge className="bg-green-100 text-green-800">
                            +{activity.points} pts
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/guided-learning">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning Plan
                </Button>
              </Link>
              <Link href="/practice/fundamentals">
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Practice Questions
                </Button>
              </Link>
              <Link href="/progress">
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Progress
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
