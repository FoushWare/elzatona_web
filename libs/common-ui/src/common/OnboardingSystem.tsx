"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const _supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Target,
  Users,
  BookOpen,
  Zap,
  Shield,
  Award,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  action?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

interface OnboardingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingSystem: React.FC<OnboardingSystemProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Elzatona Web!",
      description: "Your comprehensive frontend interview preparation platform",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            We&apos;re excited to help you prepare for your frontend developer
            interviews! Let us show you around and discover all the amazing
            features we have to offer.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>No data will be saved</strong> until you sign in. Feel
              free to explore!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "learning-paths",
      title: "Choose Your Learning Path",
      description: "Two powerful ways to prepare for your interviews",
      icon: <Target className="w-8 h-8 text-green-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                🎯 Guided Learning
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Structured 1-7 day preparation plans with curated questions and
                clear milestones.
              </p>
            </div>
            <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                🗺️ Free Style Learning
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Flexible learning with custom roadmaps or complete freedom to
                explore.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "topics",
      title: "Comprehensive Frontend Topics",
      description: "Master all essential frontend technologies",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "HTML & CSS",
              "JavaScript",
              "TypeScript",
              "React.js",
              "Next.js",
              "System Design",
              "Performance",
              "Security",
              "Design Patterns",
              "Problem Solving",
              "Code Reviews",
              "Best Practices",
            ].map((topic, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {topic}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Each topic includes questions from Easy to Hard difficulty levels
          </p>
        </div>
      ),
    },
    {
      id: "practice-system",
      title: "Smart Practice System",
      description: "Adaptive learning that grows with you",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Adaptive Question Selection
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Questions adjust based on your performance and learning pace
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Automatic Flashcard Generation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Incorrect answers automatically become flashcards for review
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Progress Tracking
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time insights into your strengths and areas for
                  improvement
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "features",
      title: "Powerful Features",
      description: "Everything you need for interview success",
      icon: <Award className="w-8 h-8 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Community Support
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Custom Questions
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Interview Simulation
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Learning Resources
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Performance Analytics
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  Achievement System
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sign-in",
      title: "Save Your Progress",
      description: "Sign in to unlock the full experience",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Why Sign In?
            </h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• Save your progress across all devices</li>
              <li>• Access personalized learning recommendations</li>
              <li>• Track your improvement over time</li>
              <li>• Create custom questions and flashcards</li>
              <li>• Join the community and share knowledge</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Your data is secure and will never be shared without your permission
          </p>
        </div>
      ),
      action: {
        text: "Sign In to Continue",
        href: "/auth",
      },
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <button
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity border-0 cursor-pointer"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
          aria-label="Close onboarding"
        />

        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {currentStepData.icon}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentStepData.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {currentStepData.content}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <button
              onClick={skipOnboarding}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Skip Tour
            </button>

            <div className="flex items-center space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              )}

              {currentStepData.action ? (
                <a
                  href={currentStepData.action.href}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                >
                  <span>{currentStepData.action.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
                >
                  <span>
                    {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
