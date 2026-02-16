"use client";

import {
  Clock,
  Target,
  CheckCircle,
  Star,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { LearningPlan } from "../types";
import { getGradeColor, getGradeText } from "../utils";

interface LearningPlanCardProps {
  readonly plan: LearningPlan;
  readonly isCompleted: boolean;
  readonly grade?: number;
  readonly onSelect: (plan: LearningPlan) => void;
}

export function LearningPlanCard({
  plan,
  isCompleted,
  grade,
  onSelect,
}: Readonly<LearningPlanCardProps>) {
  const difficultyColors = {
    Beginner:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Intermediate:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        isCompleted && grade
          ? getGradeColor(grade)
          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
      }`}
    >
      {/* Recommended Badge */}
      {plan.isRecommended && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-md">
          <Star className="w-3 h-3" />
          Recommended
        </div>
      )}

      {/* Completed Badge */}
      {isCompleted && grade && (
        <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
          <Trophy className="w-3 h-3" />
          {getGradeText(grade)}
        </div>
      )}

      <div className="p-6">
        {/* Plan Name */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {plan.name}
        </h3>

        {/* Difficulty */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
            difficultyColors[plan.difficulty]
          }`}
        >
          {plan.difficulty}
        </span>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {plan.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{plan.duration} days</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Target className="w-4 h-4" />
            <span>{plan.totalQuestions} questions</span>
          </div>
        </div>

        {/* Daily Questions */}
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
          <CheckCircle className="w-4 h-4" />
          <span>{plan.dailyQuestions} questions per day</span>
        </div>

        {/* Features */}
        {plan.features && plan.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {plan.features.slice(0, 3).map((feature, index) => (
                <span
                  key={`${feature}-${index}`}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() => onSelect(plan)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          {isCompleted ? "Retry Plan" : "Start Plan"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
