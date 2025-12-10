"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Code,
  Target,
  BookOpen,
} from "lucide-react";

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
  icon: React.ReactNode;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Elzatona web!",
    description:
      "Let's take a quick tour to discover all the amazing features that will help you ace your frontend interviews.",
    target: "hero-section",
    position: "bottom",
    icon: <Play className="w-5 h-5" />,
  },
  {
    id: "practice",
    title: "Practice Challenges",
    description:
      "Solve real interview questions with our interactive code editor. Each challenge comes with detailed solutions and explanations.",
    target: "practice-section",
    position: "bottom",
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: "learning",
    title: "Learning Paths",
    description:
      "Follow structured learning paths or create your own roadmap. Track your progress and celebrate milestones.",
    target: "learning-section",
    position: "bottom",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: "progress",
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed analytics. See your strengths and areas for improvement.",
    target: "progress-section",
    position: "top",
    icon: <Target className="w-5 h-5" />,
  },
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Scroll to first step target
      const firstTarget = document.querySelector(
        `[data-tour="${tourSteps[0].target}"]`,
      );
      if (firstTarget) {
        firstTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Scroll to next target
      const nextTarget = document.querySelector(
        `[data-tour="${tourSteps[currentStep + 1].target}"]`,
      );
      if (nextTarget) {
        nextTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to previous target
      const prevTarget = document.querySelector(
        `[data-tour="${tourSteps[currentStep - 1].target}"]`,
      );
      if (prevTarget) {
        prevTarget.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen || !isVisible) return null;

  const currentStepData = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" />

      {/* Tour Content */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto transform transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  {currentStepData.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentStepData.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Step {currentStep + 1} of {tourSteps.length}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {currentStepData.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentStep === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                >
                  <span>
                    {currentStep === tourSteps.length - 1 ? "Complete" : "Next"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
