"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const supabaseServiceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import {
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle,
  Play,
  BookOpen,
  Target,
  Users,
  Star,
  Zap,
  Compass,
  Brain,
  Lightbulb,
} from "lucide-react";

interface GuidanceStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  highlight?: boolean;
}

interface WindowWithTestFlags extends Window {
  __DISABLE_GUIDANCE_MODALS__?: boolean;
  __TEST_MODE__?: boolean;
}

interface UserGuidanceSystemProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const UserGuidanceSystem: React.FC<UserGuidanceSystemProps> = ({
  isOpen,
  _onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<"guided" | "self-directed" | null>(
    null,
  );
  const [showTour, setShowTour] = useState(false);

  // Don't show guidance during testing
  if (
    typeof window !== "undefined" &&
    ((window as WindowWithTestFlags).__DISABLE_GUIDANCE_MODALS__ ||
      (window as WindowWithTestFlags).__TEST_MODE__)
  ) {
    return null;
  }

  const welcomeSteps: GuidanceStep[] = [
    {
      id: "welcome",
      title: "Welcome to Elzatona web! 🚀",
      description:
        "Your journey to frontend mastery starts here. Let's discover everything this platform has to offer.",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      action: "Get Started",
    },
    {
      id: "features",
      title: "Discover Amazing Features",
      description:
        "Elzatona web offers comprehensive tools for frontend development learning and interview preparation.",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      action: "Explore Features",
    },
    {
      id: "learning-style",
      title: "Choose Your Learning Style",
      description:
        "Tell us how you prefer to learn so we can personalize your experience.",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      action: "Select Style",
    },
  ];

  const featureSteps: GuidanceStep[] = [
    {
      id: "practice",
      title: "Practice Challenges",
      description:
        "Solve real-world frontend challenges with instant feedback and detailed explanations.",
      icon: <Play className="w-8 h-8 text-green-500" />,
      highlight: true,
    },
    {
      id: "learning-paths",
      title: "Structured Learning Paths",
      description:
        "Follow expert-curated roadmaps to master specific frontend skills and technologies.",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
      highlight: true,
    },
    {
      id: "progress",
      title: "Track Your Progress",
      description:
        "Monitor your learning journey with detailed analytics and achievement tracking.",
      icon: <Target className="w-8 h-8 text-orange-500" />,
      highlight: true,
    },
    {
      id: "community",
      title: "Join the Community",
      description:
        "Connect with other learners, share experiences, and get help when you need it.",
      icon: <Users className="w-8 h-8 text-pink-500" />,
      highlight: true,
    },
  ];

  const learningStyleSteps: GuidanceStep[] = [
    {
      id: "guided",
      title: "I Need Guidance",
      description:
        "I prefer structured learning with clear steps and expert guidance.",
      icon: <Compass className="w-8 h-8 text-blue-600" />,
      action: "Start Guided Learning",
    },
    {
      id: "self-directed",
      title: "I'm Self-Directed",
      description:
        "I like to explore and learn at my own pace with flexible scheduling.",
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      action: "Start Self-Directed Learning",
    },
  ];

  const getCurrentSteps = () => {
    if (currentStep < welcomeSteps.length) return welcomeSteps;
    if (currentStep < welcomeSteps.length + featureSteps.length)
      return featureSteps;
    return learningStyleSteps;
  };

  const getStepIndex = () => {
    if (currentStep < welcomeSteps.length) return currentStep;
    if (currentStep < welcomeSteps.length + featureSteps.length)
      return currentStep - welcomeSteps.length;
    return currentStep - welcomeSteps.length - featureSteps.length;
  };

  const getTotalSteps = () => {
    return (
      welcomeSteps.length + featureSteps.length + learningStyleSteps.length
    );
  };

  const handleNext = () => {
    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLearningStyleSelect = (style: "guided" | "self-directed") => {
    setUserType(style);
    if (style === "self-directed") {
      // For self-directed users, we could redirect to roadmap builder
      // For now, just complete the guidance
    }
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleSkip = () => {
    onComplete();
  };

  const progress = ((currentStep + 1) / getTotalSteps()) * 100;
  const currentSteps = getCurrentSteps();
  const stepIndex = getStepIndex();
  const currentStepData = currentSteps[stepIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Skip guidance"
        >
          <X size={24} />
        </button>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Step {currentStep + 1} of {getTotalSteps()}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {currentStepData.icon}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {currentStepData.title}
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            {currentStepData.description}
          </p>

          {/* Learning Style Selection */}
          {currentStep >= welcomeSteps.length + featureSteps.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {learningStyleSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() =>
                    handleLearningStyleSelect(
                      step.id as "guided" | "self-directed",
                    )
                  }
                  className={`p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                    userType === step.id
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-105"
                      : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                        userType === step.id
                          ? "bg-indigo-600"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 ${
                          userType === step.id
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Feature Highlights */}
          {currentStep >= welcomeSteps.length &&
            currentStep < welcomeSteps.length + featureSteps.length && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {featureSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      step.highlight
                        ? "border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 mr-3">{step.icon}</div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentStep < welcomeSteps.length + featureSteps.length ? (
              <>
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>{currentStepData.action || "Next"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              userType && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-green-600 dark:text-green-400 animate-pulse">
                    Perfect! Setting up your{" "}
                    {userType === "guided" ? "guided" : "self-directed"}{" "}
                    learning experience...
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Previous
          </button>

          <button
            onClick={handleSkip}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm underline"
          >
            Skip for now
          </button>

          {currentStep < welcomeSteps.length + featureSteps.length && (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
