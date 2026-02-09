"use client";

import {
  Play,
  RefreshCw,
  Calendar,
  Target,
  CheckCircle,
  Clock,
} from "lucide-react";
import { LearningPlan, DailyGoal } from "../types";

interface ActivePlanViewProps {
  plan: LearningPlan;
  dailyGoals: DailyGoal[];
  currentDay: number;
  onResume: () => void;
  onReset: () => void;
}

export function ActivePlanView({
  plan,
  dailyGoals,
  currentDay,
  onResume,
  onReset,
}: ActivePlanViewProps) {
  const completedDays = dailyGoals.filter((g) => g.completed).length;
  const progressPercent = Math.round((completedDays / plan.duration) * 100);

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-blue-100 dark:border-blue-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">
                Current Plan
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onResume}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                Continue Learning
              </button>
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span className="font-semibold">{progressPercent}%</span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">Day</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentDay}/{plan.duration}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedDays}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Questions</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.totalQuestions}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Est. Time</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.estimatedTime || `${plan.dailyQuestions * 2}min`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
