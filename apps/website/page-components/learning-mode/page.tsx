"use client";

import React from "react";
// Client-side Supabase service role usage removed

import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Target, Users } from "lucide-react";
import { useUserType } from "@elzatona/contexts";
import { useLearningType } from "../../../../src/context/LearningTypeContext"""";

export default function LearningModePage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const { setLearningType } = useLearningType();

  const learningModes = [
    {
      id: "guided",
      title: "Guided Learning",
      description:
        "Follow structured learning paths with clear milestones and progress tracking",
      icon: BookOpen,
      features: [
        "Pre-defined learning paths",
        "Progress tracking & milestones",
        "Expert-curated content",
        "Time-based plans (1-7 days)",
        "Card-based learning structure",
      ],
      color: "blue",
      href: "/features/guided-learning",
    },
    {
      id: "self-directed",
      title: "Free-Style Learning",
      description:
        "Create your own roadmap and explore content at your own pace",
      icon: Target,
      features: [
        "Custom roadmap builder",
        "Flexible learning schedule",
        "Explore all content freely",
        "Self-paced progression",
        "Personalized learning paths",
      ],
      color: "purple",
      href: "/free-style-practice",
    },
  ];

  const handleModeSelect = (modeId: string, href: string) => {
    // Store the selected mode in localStorage for future reference
    localStorage.setItem("selectedLearningMode", modeId);

    // Set user type and learning type based on selection
    if (modeId === "guided") {
      setUserType("guided");
      setLearningType("guided");
    } else {
      setUserType("self-directed");
      setLearningType("free-style");
    }

    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Choose Your Learning Style
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select how you&apos;d like to learn and we&apos;ll customize
                your experience accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How would you like to learn?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your learning style to get the most personalized experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {learningModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <div
                key={mode.id}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                  mode.color === "blue"
                    ? "hover:border-blue-300 dark:hover:border-blue-600"
                    : "hover:border-purple-300 dark:hover:border-purple-600"
                }`}
                onClick={() => handleModeSelect(mode.id, mode.href)}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      mode.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-purple-100 dark:bg-purple-900/30"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${
                        mode.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-purple-600 dark:text-purple-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {mode.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {mode.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {mode.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          mode.color === "blue"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                    mode.color === "blue"
                      ? "bg-blue-600 text-white hover:bg-blue-700 group-hover:bg-blue-700"
                      : "bg-purple-600 text-white hover:bg-purple-700 group-hover:bg-purple-700"
                  }`}
                >
                  Choose {mode.title}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Not sure which to choose?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
              Each learning mode is designed for different goals and
              preferences. You can always switch between them or try multiple
              approaches to find what works best for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Guided Learning
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Perfect if you&apos;re preparing for technical interviews or
                  want structured, expert-curated content with clear milestones.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Free-Style Learning
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Great for building practical skills, exploring specific
                  topics, and learning at your own pace with full flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
