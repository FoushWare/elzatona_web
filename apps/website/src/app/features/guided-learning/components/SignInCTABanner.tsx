"use client";

import { LogIn, Sparkles, Cloud, Trophy } from "lucide-react";

interface SignInCTABannerProps {
  readonly onSignIn: () => void;
}

export function SignInCTABanner({ onSignIn }: Readonly<SignInCTABannerProps>) {
  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              Sign in to track your progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Save your learning journey and continue on any device
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Cloud className="w-4 h-4" />
              Sync progress
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Earn badges
            </span>
          </div>

          <button
            onClick={onSignIn}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
