"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Trophy,
  Star,
  Award,
  _Target as _Target,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: {
    correct: number;
    total: number;
    percentage: number;
    grade: string;
    planName: string;
  };
  onRetake: () => void;
  onViewPlans: () => void;
}

export default function CelebrationModal({
  isOpen,
  onClose,
  results,
  onRetake,
  onViewPlans,
}: CelebrationModalProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);
      setTimeout(() => setShowContent(true), 500);
    } else {
      setShowAnimation(false);
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-yellow-500";
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 70) return "text-blue-500";
    if (percentage >= 60) return "text-orange-500";
    return "text-red-500";
  };

  const getGradeBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-yellow-100 dark:bg-yellow-900/30";
    if (percentage >= 80) return "bg-green-100 dark:bg-green-900/30";
    if (percentage >= 70) return "bg-blue-100 dark:bg-blue-900/30";
    if (percentage >= 60) return "bg-orange-100 dark:bg-orange-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  const getEncouragementMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! You're a frontend master! 🎉";
    if (percentage >= 80) return "Excellent work! You're doing great! 🌟";
    if (percentage >= 70) return "Good job! Keep up the great work! 💪";
    if (percentage >= 60) return "Nice progress! Keep practicing! 📚";
    return "Keep studying! Practice makes perfect! 🎯";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 ${
          showAnimation ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Celebration Animation */}
          <div className="relative mb-8">
            {/* Confetti Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...new Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full animate-bounce ${
                    [
                      "bg-yellow-400",
                      "bg-blue-400",
                      "bg-green-400",
                      "bg-pink-400",
                      "bg-purple-400",
                    ][i % 5]
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Trophy Icon */}
            <div
              className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-700 ${
                showContent ? "scale-100 rotate-0" : "scale-0 rotate-180"
              } ${getGradeBgColor(results.percentage)}`}
            >
              <Trophy
                className={`w-16 h-16 ${getGradeColor(results.percentage)}`}
              />
            </div>

            {/* Floating Stars */}
            <div className="absolute -top-4 -left-4 animate-pulse">
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
            </div>
            <div
              className="absolute -top-2 -right-6 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-6 h-6 text-blue-400 fill-current" />
            </div>
            <div
              className="absolute -bottom-2 -left-2 animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              <Star className="w-7 h-7 text-green-400 fill-current" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            >
              <Star className="w-5 h-5 text-pink-400 fill-current" />
            </div>
          </div>

          {/* Results */}
          <div
            className={`transition-all duration-700 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Congratulations! 🎉
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {getEncouragementMessage(results.percentage)}
            </p>

            {/* Grade Display */}
            <div className="mb-8">
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold ${getGradeBgColor(results.percentage)} ${getGradeColor(results.percentage)}`}
              >
                {results.grade}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {results.percentage}%
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Your Results
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {results.correct}/{results.total}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Correct Answers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {results.planName}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Plan Completed
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onViewPlans}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Award className="w-5 h-5" />
                <span>Explore Other Plans</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onRetake}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Practice Again</span>
              </button>
            </div>

            {/* Encouragement Message */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                💡 <strong>Tip:</strong> Consistent practice is key to mastering
                frontend development. Try different learning plans to cover all
                topics comprehensively!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
