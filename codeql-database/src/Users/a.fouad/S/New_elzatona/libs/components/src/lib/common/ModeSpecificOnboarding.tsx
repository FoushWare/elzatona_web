"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { useRouter } from "next/navigation";
import { useUserType } from "@elzatona/contexts";
import {
  Compass,
  Brain,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Target,
  BookOpen,
  Zap,
  Users,
  TrendingUp,
  Star,
  Loader2,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface ModeSpecificOnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const ModeSpecificOnboarding: React.FC<ModeSpecificOnboardingProps> = ({
  onComplete,
  onSkip,
}) => {
  const { userType } = useUserType();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const guidedSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Guided Learning!",
      description: "Let's set up your personalized learning journey",
      icon: <Compass className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Structured Learning Paths
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We&apos;ll guide you through carefully designed learning paths
              tailored to your interview timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Time-Based Plans
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose from 1-7 day preparation plans
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Daily Goals
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear milestones and progress tracking
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Achievements
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn badges and track your progress
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "timeline",
      title: "Choose Your Timeline",
      description: "Select how many days you have to prepare",
      icon: <Clock className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              How many days do you have?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We&apos;ll adjust the learning intensity based on your timeline
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((days) => (
              <button
                key={days}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center"
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {days}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {days === 1 ? "day" : "days"}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Timeline Recommendations:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• 1-2 days: Intensive crash course</li>
              <li>• 3-4 days: Balanced preparation</li>
              <li>• 5-7 days: Comprehensive study plan</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "sections",
      title: "Select Focus Areas",
      description: "Choose which topics to prioritize",
      icon: <BookOpen className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              What topics do you want to focus on?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Select the areas you want to strengthen for your interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "HTML & CSS Fundamentals",
              "JavaScript Core Concepts",
              "React.js & Hooks",
              "TypeScript",
              "Next.js Framework",
              "System Design",
              "Performance Optimization",
              "Security Best Practices",
              "Design Patterns",
              "Problem Solving",
            ].map((topic) => (
              <label
                key={topic}
                className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600"
                  defaultChecked
                />
                <span className="text-gray-900 dark:text-white">{topic}</span>
              </label>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const freestyleSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Free Style Learning!",
      description: "Create your own personalized learning journey",
      icon: <Brain className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Flexible Learning Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              You&apos;re in control! Build your own roadmap and learn at your
              own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Custom Roadmaps
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build your own learning path
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Flexible Timeline
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn at your own pace
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 dark:text-white">
                All Access
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore any topic anytime
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "roadmap",
      title: "Build Your Roadmap",
      description: "Create a custom learning plan",
      icon: <Target className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Let&apos;s build your custom roadmap
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the topics and timeline that work best for you
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">
              Roadmap Builder Features:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Select specific topics
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Set question counts per topic
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Choose your timeline
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Adjust difficulty levels
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Modify anytime
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-purple-800 dark:text-purple-200">
                    Save multiple roadmaps
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const steps = userType === "guided" ? guidedSteps : freestyleSteps;
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete();
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  userType === "guided"
                    ? "bg-blue-100 dark:bg-blue-900/30"
                    : "bg-purple-100 dark:bg-purple-900/30"
                }`}
              >
                <div
                  className={
                    userType === "guided"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-purple-600 dark:text-purple-400"
                  }
                >
                  {currentStepData.icon}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentStepData.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <button
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= currentStep
                      ? userType === "guided"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              <button
                onClick={onSkip}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Skip Setup
              </button>
              <button
                onClick={handleNext}
                disabled={isCompleting}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
                  userType === "guided"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-purple-500 hover:bg-purple-600"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === steps.length - 1
                        ? "Get Started"
                        : "Next"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
