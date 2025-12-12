"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Smartphone,
  Laptop,
  Cloud,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  BookOpen,
} from "lucide-react";
// import _Link from "next/link";

interface SignInGuidanceProps {
  trigger: "progress" | "roadmap" | "achievement" | "device-switch" | "manual";
  onClose: () => void;
  onSignIn: () => void;
  context?: {
    progressCount?: number;
    roadmapSections?: number;
    achievement?: string;
    deviceType?: string;
  };
}

export const SignInGuidance: React.FC<SignInGuidanceProps> = ({
  trigger,
  onClose,
  onSignIn,
  context = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getGuidanceContent = () => {
    switch (trigger) {
      case "progress":
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: "Save Your Progress!",
          subtitle: `You've completed ${context.progressCount || 0} questions`,
          description:
            "Sign in to save your progress and continue learning on any device.",
          benefits: [
            "Sync progress across all devices",
            "Never lose your learning streak",
            "Track your improvement over time",
            "Access your custom roadmap anywhere",
          ],
          ctaText: "Sign In to Save Progress",
          ctaIcon: <Cloud className="w-5 h-5" />,
        };

      case "roadmap":
        return {
          icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
          title: "Save Your Custom Roadmap!",
          subtitle: `You've selected ${context.roadmapSections || 0} learning sections`,
          description:
            "Sign in to save your personalized roadmap and access it from any device.",
          benefits: [
            "Access your roadmap on any device",
            "Sync your learning preferences",
            "Track progress across all sections",
            "Never lose your custom path",
          ],
          ctaText: "Sign In to Save Roadmap",
          ctaIcon: <BookOpen className="w-5 h-5" />,
        };

      case "achievement":
        return {
          icon: <Trophy className="w-8 h-8 text-yellow-500" />,
          title: "Congratulations! 🎉",
          subtitle: `You've earned: ${context.achievement || "New Achievement"}`,
          description:
            "Sign in to unlock achievements, track your progress, and compete with others.",
          benefits: [
            "Unlock achievement badges",
            "Track your learning milestones",
            "Compare progress with others",
            "Build your learning profile",
          ],
          ctaText: "Sign In to Unlock Achievements",
          ctaIcon: <Trophy className="w-5 h-5" />,
        };

      case "device-switch":
        return {
          icon: <Smartphone className="w-8 h-8 text-blue-500" />,
          title: "Continue on Any Device!",
          subtitle: `Switch from ${context.deviceType || "this device"} seamlessly`,
          description:
            "Sign in to access your progress, roadmap, and achievements on any device.",
          benefits: [
            "Seamless device switching",
            "Sync all your data instantly",
            "Continue where you left off",
            "Access from phone, tablet, or computer",
          ],
          ctaText: "Sign In for Cross-Device Access",
          ctaIcon: <ArrowRight className="w-5 h-5" />,
        };

      case "manual":
      default:
        return {
          icon: <User className="w-8 h-8 text-purple-500" />,
          title: "Sign In to Get Started!",
          subtitle: "Join thousands of developers learning frontend skills",
          description:
            "Create your account to save progress, track achievements, and access premium features.",
          benefits: [
            "Save progress across all devices",
            "Track your learning journey",
            "Access premium content",
            "Join the developer community",
          ],
          ctaText: "Create Free Account",
          ctaIcon: <Star className="w-5 h-5" />,
        };
    }
  };

  const content = getGuidanceContent();

  const handleSignIn = () => {
    onSignIn();
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {content.icon}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {content.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {content.description}
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Device Icons */}
          <div className="flex items-center justify-center space-x-4 mb-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm">Mobile</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Laptop className="w-5 h-5" />
              <span className="text-sm">Desktop</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Cloud className="w-5 h-5" />
              <span className="text-sm">Sync</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSignIn}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {content.ctaIcon}
              <span>{content.ctaText}</span>
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Free to sign up • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};
