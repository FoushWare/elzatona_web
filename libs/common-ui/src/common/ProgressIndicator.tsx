"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  User,
  Cloud,
} from "lucide-react";
import { useProgressTracking } from "@elzatona/hooks";

interface ProgressIndicatorProps {
  showSignInPrompt?: boolean;
  compact?: boolean;
}

interface WindowWithGuidance extends Window {
  triggerSignInGuidance?: (
    trigger: string,
    context: Record<string, unknown>,
  ) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  showSignInPrompt = true,
  compact = false,
}) => {
  const { progress } = useProgressTracking();
  // Reserved for future sign-in modal functionality
  // const [showSignInModal, setShowSignInModal] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handleSignInClick = () => {
    if (
      typeof globalThis.window !== "undefined" &&
      (globalThis.window as WindowWithGuidance).triggerSignInGuidance
    ) {
      (globalThis.window as WindowWithGuidance).triggerSignInGuidance?.(
        "manual",
        {
          progressCount: progress.completedQuestions,
          roadmapSections: progress.roadmapSections.length,
        },
      );
    }
  };

  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Progress
          </h3>
          {showSignInPrompt && (
            <button
              onClick={handleSignInClick}
              className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
            >
              <Cloud className="w-4 h-4" />
              <span>Save</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {progress.completedQuestions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Questions
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {progress.streak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Day Streak
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Learning Progress
        </h3>
        {showSignInPrompt && (
          <button
            onClick={handleSignInClick}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <Cloud className="w-5 h-5" />
            <span>Sign In to Save</span>
          </button>
        )}
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <CheckCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.completedQuestions}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Questions Completed
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {progress.streak}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Day Streak
          </div>
        </div>

        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(progress.totalTimeSpent)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Time Spent
          </div>
        </div>

        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {progress.achievements.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Achievements
          </div>
        </div>
      </div>

      {/* Learning Mode */}
      {progress.learningMode && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Learning Mode:
            </span>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {progress.learningMode === "guided"
                ? "Guided Learning"
                : "Free Style Learning"}
            </span>
          </div>
        </div>
      )}

      {/* Roadmap Sections */}
      {progress.roadmapSections.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Roadmap ({progress.roadmapSections.length} sections)
          </h4>
          <div className="flex flex-wrap gap-2">
            {progress.roadmapSections.slice(0, 5).map((section) => (
              <span
                key={section}
                className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs rounded-full"
              >
                {section
                  .replaceAll("-", " ")
                  .replaceAll(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            ))}
            {progress.roadmapSections.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{progress.roadmapSections.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sign In Benefits */}
      {showSignInPrompt && (
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
            Sign in to unlock these benefits:
          </h4>
          <ul className="text-xs text-indigo-800 dark:text-indigo-200 space-y-1">
            <li>• Sync progress across all your devices</li>
            <li>• Never lose your learning streak</li>
            <li>• Track detailed analytics and insights</li>
            <li>• Compete with other developers</li>
            <li>• Access premium content and features</li>
          </ul>
        </div>
      )}
    </div>
  );
};
