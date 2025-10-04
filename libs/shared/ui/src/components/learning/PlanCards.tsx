'use client';

import React from 'react';
import {
  Clock,
  Target,
  Star,
  ArrowRight,
  Code,
  Layers,
  Brain,
  Network,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { PlanCard, PlanCategory } from '@elzatona/shared/types/learning-plans';

interface PlanCardsProps {
  plans: PlanCard[];
  onSelectPlan: (planId: string) => void;
  selectedPlanId?: string;
  category?: PlanCategory;
}

const categoryConfig = {
  questions: {
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  framework: {
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  'problem-solving': {
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    textColor: 'text-green-600 dark:text-green-400',
  },
  'system-design': {
    icon: Network,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-700',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
};

const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    icon: '🌱',
  },
  intermediate: {
    label: 'Intermediate',
    color:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    icon: '⚡',
  },
  advanced: {
    label: 'Advanced',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    icon: '🔥',
  },
};

export const PlanCards: React.FC<PlanCardsProps> = ({
  plans,
  onSelectPlan,
  selectedPlanId,
  category,
}) => {
  const filteredPlans = category
    ? plans.filter(plan => plan.category === category)
    : plans;

  if (filteredPlans.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No plans available
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Check back later for new learning plans
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlans.map(plan => {
        const config = categoryConfig[plan.category];
        const Icon = config.icon;
        const difficulty = difficultyConfig[plan.difficulty];
        const isSelected = selectedPlanId === plan.id;

        return (
          <div
            key={plan.id}
            onClick={() => onSelectPlan(plan.id)}
            className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              isSelected
                ? `${config.borderColor} ${config.bgColor} ring-2 ring-blue-500`
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isSelected
                    ? `bg-gradient-to-r ${config.color}`
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isSelected
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </div>

              <div className="flex items-center space-x-2">
                {plan.isRecommended && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Star className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-800 dark:text-yellow-300">
                      Recommended
                    </span>
                  </div>
                )}

                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.color}`}
                >
                  <span className="mr-1">{difficulty.icon}</span>
                  {difficulty.label}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {plan.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {plan.questionCount} questions
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {Math.round(plan.estimatedTime / 60)}h
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {plan.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {plan.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {plan.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                    +{plan.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isSelected ? (
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Selected</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Click to select</span>
                  </div>
                )}
              </div>

              <ArrowRight
                className={`w-5 h-5 transition-all duration-300 ${
                  isSelected
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
