"use client";

import React, { useState, useRef, useEffect } from "react";
import { Compass, Map, ChevronDown } from "lucide-react";
import { useUserType } from "@elzatona/contexts";

interface LearningModeSwitcherProps {
  isScrolled?: boolean;
  variant?: "desktop" | "mobile";
}

export const LearningModeSwitcher: React.FC<LearningModeSwitcherProps> = ({
  isScrolled = false,
  variant = "desktop",
}) => {
  const { userType, setUserType } = useUserType();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Don't render if user type is not set
  if (!userType) {
    return null;
  }

  const handleModeChange = (mode: "guided" | "self-directed") => {
    setUserType(mode);
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleModeChange("guided")}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
            userType === "guided"
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Switch to Guided Learning"
        >
          <Compass className="w-4 h-4" />
          <span className="text-sm font-medium">Guided</span>
        </button>
        <button
          onClick={() => handleModeChange("self-directed")}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
            userType === "self-directed"
              ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          aria-label="Switch to Free Style Learning"
        >
          <Map className="w-4 h-4" />
          <span className="text-sm font-medium">Free Style</span>
        </button>
      </div>
    );
  }

  // Desktop variant
  const getButtonStyles = () => {
    if (isScrolled) {
      return "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700";
    }
    return "bg-white/20 text-white border border-white/30 hover:bg-white/30";
  };

  const getDropdownStyles = () => {
    if (isScrolled) {
      return "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl";
    }
    return "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${getButtonStyles()}`}
        aria-label="Learning mode switcher"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {userType === "guided" ? (
          <Compass className="w-4 h-4" />
        ) : (
          <Map className="w-4 h-4" />
        )}
        <span className="text-sm">
          {userType === "guided" ? "Guided" : "Free Style"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56 rounded-lg ${getDropdownStyles()} z-50`}
        >
          <div className="p-2">
            <button
              onClick={() => handleModeChange("guided")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                userType === "guided"
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              <Compass className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">Guided Learning</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Structured learning with clear steps
                </div>
              </div>
              {userType === "guided" && (
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => handleModeChange("self-directed")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors mt-1 ${
                userType === "self-directed"
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              <Map className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-medium">Free Style Learning</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Explore and learn at your own pace
                </div>
              </div>
              {userType === "self-directed" && (
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
