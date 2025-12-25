"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Play,
  Code,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Users,
  Award,
  Map,
  Compass,
  ExternalLink,
} from "lucide-react";
import { useUserType } from "@elzatona/contexts";
import { useLearningType } from "../../../../src/context/LearningTypeContext";

type UserType = "guided" | "self-directed" | null;

// Inline UserTypeSelector component to avoid module resolution issues
const UserTypeSelector = ({
  onSelect,
  className = "",
}: {
  onSelect: (userType: "guided" | "self-directed") => void;
  className?: string;
}) => {
  const [selectedType, setSelectedType] = useState<
    "guided" | "self-directed" | null
  >(null);

  const handleSelect = (type: "guided" | "self-directed") => {
    setSelectedType(type);
    setTimeout(() => onSelect(type), 300); // Small delay for visual feedback
  };

  return (
    <div className={`user-type-selector ${className}`}>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Guided Path Option */}
        <div
          className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
            selectedType === "guided"
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
          }`}
          onClick={() => handleSelect("guided")}
        >
          {selectedType === "guided" && (
            <div className="absolute top-4 right-4">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
          )}

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Map className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              I need guidance
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Show me structured learning paths with clear milestones and
              progress tracking
            </p>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Pre-defined learning paths</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Progress tracking & milestones</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Expert-curated content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Directed Option */}
        <div
          className={`relative p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
            selectedType === "self-directed"
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
          }`}
          onClick={() => handleSelect("self-directed")}
        >
          {selectedType === "self-directed" && (
            <div className="absolute top-4 right-4">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
          )}

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              I&apos;m self-directed
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Let me create my own roadmap and explore content at my own pace
            </p>

            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Custom roadmap builder</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Flexible learning schedule</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Explore all content freely</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedType && (
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium">
            <span>Great choice!</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

// Simple inline loading component to avoid module resolution issues
const LoadingTransition = ({
  isVisible,
  message = "Loading...",
}: {
  isVisible: boolean;
  message?: string;
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
        <p className="text-white text-lg">{message}</p>
      </div>
    </div>
  );
};

export default function GetStartedPage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const { setLearningType } = useLearningType();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);

    if (type === "guided") {
      // Set learning type to guided to hide cart icon
      setLearningType("guided");
      // For guided learning, proceed directly but encourage sign-in for progress saving
      setIsNavigating(true);
      setTimeout(() => {
        router.push("/features/guided-learning");
      }, 1500);
    } else {
      // Set learning type to free-style for self-directed users
      setLearningType("free-style");

      // Navigate to browse practice questions (main page for free style)
      setIsNavigating(true);
      setTimeout(() => {
        router.push("/browse-practice-questions");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Loading Transition */}
      <LoadingTransition
        isVisible={isNavigating}
        message="Loading your learning experience..."
      />

      {/* User Type Selection */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Style
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select how you&apos;d like to learn and we&apos;ll customize your
              experience accordingly.
            </p>
          </div>
          <UserTypeSelector onSelect={handleUserTypeSelect} />
        </div>
      </div>
    </div>
  );
}
