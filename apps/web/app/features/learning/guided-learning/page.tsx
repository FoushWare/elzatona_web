'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { useLearningPlanTemplates } from '@/hooks/useLearningPlanTemplates';
import { setIntendedRedirectUrl } from '@elzatona/shared/utils/authRedirect';
import { PlanCards } from '@elzatona/shared/ui/components/learning/PlanCards';
import { SimpleOnboarding } from '@elzatona/shared/ui/components/onboarding/SimpleOnboarding';
import {
  LearningPlan,
  PlanCard,
  OnboardingData,
  PlanCategory,
} from '@elzatona/shared/types/learning-plans';
import {
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Calendar,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Users,
  Star,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Info,
  X,
} from 'lucide-react';

// LearningPlan interface is imported from shared types

interface DailyGoal {
  day: number;
  date: string;
  questions: number;
  sections: string[];
  completed: boolean;
  progress: number;
}

// Learning plans are now loaded dynamically from Firestore via useLearningPlanTemplates hook

export default function GuidedLearningPage() {
  const { user, isAuthenticated } = useFirebaseAuth();
  const {
    templates: allTemplates,
    isLoading: templatesLoading,
    error: templatesError,
    getTemplate,
  } = useLearningPlanTemplates();
  const router = useRouter();

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    PlanCategory | undefined
  >(undefined);
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    undefined
  );

  // Mock admin-managed plans - in real app, this would come from Firebase
  const [adminPlans, setAdminPlans] = useState<PlanCard[]>([
    {
      id: '1',
      planId: '1',
      title: 'Frontend Fundamentals - 7 Days',
      description:
        'Complete frontend interview preparation covering HTML, CSS, and JavaScript',
      category: 'questions',
      questionCount: 95,
      estimatedTime: 450,
      difficulty: 'intermediate',
      isRecommended: true,
      tags: ['HTML', 'CSS', 'JavaScript', 'Fundamentals'],
    },
    {
      id: '2',
      planId: '2',
      title: 'React Mastery - 5 Days',
      description: 'Deep dive into React.js concepts and best practices',
      category: 'framework',
      questionCount: 60,
      estimatedTime: 350,
      difficulty: 'advanced',
      isRecommended: false,
      tags: ['React', 'Hooks', 'State Management', 'Components'],
    },
    {
      id: '3',
      planId: '3',
      title: 'Problem Solving Bootcamp - 3 Days',
      description: 'Master frontend algorithms and data structures',
      category: 'problem-solving',
      questionCount: 45,
      estimatedTime: 300,
      difficulty: 'intermediate',
      isRecommended: true,
      tags: ['Algorithms', 'Data Structures', 'Problem Solving'],
    },
    {
      id: '4',
      planId: '4',
      title: 'System Design Essentials - 4 Days',
      description:
        'Learn to design scalable frontend systems like Facebook feeds',
      category: 'system-design',
      questionCount: 30,
      estimatedTime: 240,
      difficulty: 'advanced',
      isRecommended: false,
      tags: ['System Design', 'Architecture', 'Scalability'],
    },
  ]);

  // Filter to only show day-based plans (1-day, 2-day, 3-day, 4-day, 5-day, 6-day, 7-day)
  const templates = allTemplates
    .filter(plan => {
      const dayBasedPlans = [
        '1-day-plan',
        '2-day-plan',
        '3-day-plan',
        '4-day-plan',
        '5-day-plan',
        '6-day-plan',
        '7-day-plan',
      ];
      return dayBasedPlans.includes(plan.id);
    })
    .sort((a, b) => {
      // Extract day number from plan ID (e.g., "1-day-plan" -> 1)
      const getDayNumber = (planId: string) => {
        const match = planId.match(/(\d+)-day-plan/);
        return match ? parseInt(match[1], 10) : 0;
      };

      return getDayNumber(a.id) - getDayNumber(b.id);
    });

  // Debug logging
  useEffect(() => {
    console.log('🔍 GuidedLearning: Templates state changed:', {
      templatesCount: templates.length,
      templatesLoading,
      templatesError,
      templates: templates.map(t => ({ id: t.id, name: t.name })),
    });
  }, [templates, templatesLoading, templatesError]);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<any | null>(null);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedPlans, setCompletedPlans] = useState<Set<string>>(new Set());
  const [planGrades, setPlanGrades] = useState<Map<string, number>>(new Map());
  const [isNavigatingToPlan, setIsNavigatingToPlan] = useState<string | null>(
    null
  );

  // Check if user needs onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasCompletedOnboarding = localStorage.getItem(
        'hasCompletedOnboarding'
      );
      if (!hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  // Handle onboarding completion
  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setShowOnboarding(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('onboardingData', JSON.stringify(data));
    }

    // Set category filter based on onboarding data
    if (data.preferredTopics && data.preferredTopics.length > 0) {
      setSelectedCategory(data.preferredTopics[0] as PlanCategory);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasCompletedOnboarding', 'true');
    }
  };

  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    // Store selected plan and redirect to practice
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPlanId', planId);
    }
    router.push(`/features/learning/guided-practice?plan=${planId}`);
  };

  // No longer redirect unauthenticated users - allow them to browse

  // Check if user has an active plan
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check localStorage for active plan
      const activePlan = localStorage.getItem('active-guided-plan');
      if (activePlan) {
        try {
          const plan = JSON.parse(activePlan);
          setCurrentPlan(plan);
          generateDailyGoals(plan);
        } catch (error) {
          console.error('Error parsing active plan:', error);
          // If parsing fails, clear the invalid data
          localStorage.removeItem('active-guided-plan');
        }
      }
    }
  }, [isAuthenticated, user]);

  // Load completed plans and grades from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const completedPlansData = localStorage.getItem('completed-guided-plans');
      if (completedPlansData) {
        try {
          const completed = JSON.parse(completedPlansData);
          setCompletedPlans(new Set(completed));
        } catch (error) {
          console.error('Error parsing completed plans:', error);
        }
      }

      // Load plan grades
      const planGradesData = localStorage.getItem('plan-grades');
      if (planGradesData) {
        try {
          const grades = JSON.parse(planGradesData);
          setPlanGrades(new Map(Object.entries(grades)));
        } catch (error) {
          console.error('Error parsing plan grades:', error);
        }
      }
    }
  }, []);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90)
      return 'border-yellow-500 dark:border-yellow-400 ring-4 ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/20';
    if (percentage >= 80)
      return 'border-green-500 dark:border-green-400 ring-4 ring-green-200 dark:ring-green-800 bg-green-50/50 dark:bg-green-900/20';
    if (percentage >= 70)
      return 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-200 dark:ring-blue-800 bg-blue-50/50 dark:bg-blue-900/20';
    if (percentage >= 60)
      return 'border-orange-500 dark:border-orange-400 ring-4 ring-orange-200 dark:ring-orange-800 bg-orange-50/50 dark:bg-orange-900/20';
    return 'border-red-500 dark:border-red-400 ring-4 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/20';
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return 'A+ (Excellent!)';
    if (percentage >= 80) return 'A (Great!)';
    if (percentage >= 70) return 'B+ (Good!)';
    if (percentage >= 60) return 'B (Not bad!)';
    return 'C (Keep practicing!)';
  };

  const generateDailyGoals = (plan: any) => {
    const goals: DailyGoal[] = [];
    const today = new Date();

    for (let day = 1; day <= plan.duration; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day - 1);

      goals.push({
        day,
        date: date.toLocaleDateString(),
        questions: plan.dailyQuestions,
        sections: plan.sections.map(s => s.name),
        completed: false,
        progress: 0,
      });
    }

    setDailyGoals(goals);
  };

  const handleResumePlan = () => {
    if (currentPlan) {
      router.push('/guided-practice?plan=' + currentPlan.id);
    }
  };

  const handleResetPlan = () => {
    localStorage.removeItem('active-guided-plan');
    localStorage.removeItem('plan-start-date');
    setCurrentPlan(null);
    setDailyGoals([]);
    setCurrentDay(1);
  };

  if (currentPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Active Learning Plan
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your {currentPlan.name} journey
            </p>
          </div>

          {/* Plan Overview */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentPlan.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentPlan.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  Day {currentDay} of {currentPlan.duration}
                </span>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.duration}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Days Total
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Target className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.totalQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Questions
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Zap className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.dailyQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Daily Goal
                </div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <TrendingUp className="w-6 h-6 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentPlan.estimatedTime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Estimated Time
                </div>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Daily Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyGoals.map((goal, index) => (
                  <div
                    key={goal.day}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      goal.day === currentDay
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : goal.completed
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Day {goal.day}
                      </span>
                      {goal.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {goal.date}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {goal.questions} questions
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {goal.sections.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleResumePlan}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                <span>Continue Learning</span>
              </button>
              <button
                onClick={handleResetPlan}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add state for notification banner
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 py-8">
      {/* Onboarding Modal */}
      {showOnboarding && (
        <SimpleOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Notification Modal for Unauthenticated Users */}
        {!isAuthenticated && showNotification && (
          <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 dark:from-black/90 dark:via-black/80 dark:to-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
            <div className="relative bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 dark:from-gray-800 dark:via-blue-900/30 dark:to-indigo-900/40 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-700 scale-100 animate-in zoom-in-95 slide-in-from-bottom-4">
              {/* Enhanced Decorative Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-pink-500/8 rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>

              {/* Enhanced Animated Background Pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/25 to-purple-400/25 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-400/25 to-pink-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
              </div>

              <div className="relative p-10">
                {/* Enhanced Header with Icon */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                      <Info className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                      <span className="text-white text-sm font-bold">✨</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-white text-xs font-bold">💫</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mt-6 mb-3">
                    You Can Do Everything! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed max-w-lg mx-auto">
                    Explore all our learning plans, practice questions, and
                    resources completely free. No restrictions, no limits!
                  </p>
                </div>

                {/* Enhanced Features List */}
                <div className="mb-10 space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white/70 dark:bg-gray-700/70 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-600/30 shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                        Full Access to Everything
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        All learning plans, practice questions, and resources
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white/70 dark:bg-gray-700/70 rounded-2xl backdrop-blur-sm border border-white/30 dark:border-gray-600/30 shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                        Start Learning Immediately
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        No signup required to begin your journey
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl backdrop-blur-sm border-2 border-purple-300/50 dark:border-purple-600/50 shadow-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                        Save Progress Across All Devices
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Sign in to sync your progress everywhere you go
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                      Ready to save your progress across all devices?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setIntendedRedirectUrl(
                          '/features/learning/guided-learning'
                        );
                        router.push('/auth/login');
                      }}
                      className="flex-1 group relative inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative flex items-center space-x-3">
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setIntendedRedirectUrl(
                          '/features/learning/guided-learning'
                        );
                        router.push('/auth/register');
                      }}
                      className="flex-1 group relative inline-flex items-center justify-center px-8 py-5 bg-white/90 dark:bg-gray-700/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-blue-300 dark:border-blue-600 hover:border-blue-400 dark:hover:border-blue-500 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                    >
                      <span className="relative flex items-center space-x-3">
                        <span>Create Account</span>
                        <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => setShowNotification(false)}
                      className="group inline-flex items-center justify-center px-6 py-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-medium rounded-xl hover:bg-gray-100/60 dark:hover:bg-gray-700/60 transition-all duration-300"
                    >
                      <span className="flex items-center space-x-2">
                        <Compass className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Continue Browsing as Guest</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Close Button */}
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100/90 dark:bg-gray-700/90 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 scale-110" />

            {/* Main Icon */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Compass className="w-12 h-12 text-white" />

              {/* Rotating Ring */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Choose Your Learning Journey
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Select a structured learning plan tailored to your timeline. Each
            path is carefully crafted to prepare you for frontend interviews
            with progressive difficulty and comprehensive coverage.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {templatesLoading
                  ? '...'
                  : templates.length > 0
                    ? `${Math.min(...templates.map(p => p.totalQuestions))}-${Math.max(...templates.map(p => p.totalQuestions))}`
                    : '100-400'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questions per Plan
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {templatesLoading
                  ? '...'
                  : templates.length > 0
                    ? `${Math.min(...templates.map(p => p.duration))}-${Math.max(...templates.map(p => p.duration))}`
                    : '1-7'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Days Available
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Success Rate
              </div>
            </div>
          </div>
        </div>

        {/* User Status */}
        {isAuthenticated ? (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Welcome back, {user?.displayName || 'User'}! Your progress will
                be saved.
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                You're browsing as a guest. Sign in to save your progress and
                access advanced features.
              </span>
            </div>
          </div>
        )}

        {/* Completion Statistics */}
        {completedPlans.size > 0 && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="text-green-800 dark:text-green-200 font-semibold">
                🎉 You&apos;ve completed {completedPlans.size} learning plan
                {completedPlans.size > 1 ? 's' : ''}!
              </span>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {['questions', 'framework', 'problem-solving', 'system-design'].map(
              category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as PlanCategory)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.replace('-', ' ')}
                </button>
              )
            )}
          </div>
        </div>

        {/* Admin-Managed Learning Plans */}
        <div className="mb-12">
          <PlanCards
            plans={adminPlans}
            onSelectPlan={handleSelectPlan}
            selectedPlanId={selectedPlanId}
            category={selectedCategory}
          />
        </div>

        {/* Bottom Info */}
        <div className="text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Why Choose Guided Learning?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Clear Learning Objectives</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Progress Tracking</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Achievement Badges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
