"use client";

import React from "react";
import { useUserType } from "@elzatona/contexts";
import { Compass, Map } from "lucide-react";

interface LearningModeSwitcherProps {
  isScrolled?: boolean;
}

/**
 * LearningModeSwitcher
 * A premium, glassmorphism-inspired toggle for switching between Guided and Free Style learning.
 */
export const LearningModeSwitcher: React.FC<LearningModeSwitcherProps> = ({
  isScrolled,
}) => {
  const { userType, setUserType } = useUserType();

  const isGuided = userType === "guided";

  return (
    <div
      role="group"
      aria-label="Learning Mode Switcher"
      className={`relative flex items-center p-1 rounded-xl transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-inner"
          : "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      }`}
    >
      {/* Active Background Pill */}
      <div
        className={`absolute inset-y-1 transition-all duration-500 ease-out rounded-lg shadow-md ${
          isGuided ? "left-1 right-1/2" : "left-1/2 right-1"
        } ${isScrolled ? "bg-indigo-600" : "bg-white/90 dark:bg-indigo-500"}`}
      />

      {/* Guided Option */}
      <button
        onClick={() => setUserType("guided")}
        aria-pressed={isGuided}
        className={`relative z-10 flex items-center justify-center space-x-2 px-4 py-1.5 rounded-lg transition-colors duration-300 ${
          isGuided
            ? isScrolled
              ? "text-white"
              : "text-indigo-900 dark:text-white"
            : isScrolled
              ? "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              : "text-white/70 hover:text-white"
        }`}
      >
        <Compass size={16} className={isGuided ? "animate-pulse" : ""} />
        <span className="text-sm font-semibold whitespace-nowrap">Guided</span>
      </button>

      {/* Free Style Option */}
      <button
        onClick={() => setUserType("self-directed")}
        aria-pressed={!isGuided}
        className={`relative z-10 flex items-center justify-center space-x-2 px-4 py-1.5 rounded-lg transition-colors duration-300 ${
          !isGuided
            ? isScrolled
              ? "text-white"
              : "text-indigo-900 dark:text-white"
            : isScrolled
              ? "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              : "text-white/70 hover:text-white"
        }`}
      >
        <Map size={16} className={!isGuided ? "animate-pulse" : ""} />
        <span className="text-sm font-semibold whitespace-nowrap">
          Free Style
        </span>
      </button>
    </div>
  );
};
