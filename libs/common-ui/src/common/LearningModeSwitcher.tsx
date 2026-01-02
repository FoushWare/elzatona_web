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
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 sm:p-2.5 rounded-lg transition-colors duration-200 ${
            isScrolled
              ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
              : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
          }`}
          aria-label="Learning mode"
        >
          {userType === "guided" ? (
            <Compass size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Map size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
          isScrolled
            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
            : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
        }`}
        aria-label="Learning mode"
      >
        {userType === "guided" ? (
          <>
            <Compass size={16} />
            <span className="text-sm font-medium">Guided</span>
          </>
        ) : (
          <>
            <Map size={16} />
            <span className="text-sm font-medium">Free Style</span>
          </>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <button
            onClick={() => handleModeChange("guided")}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
              userType === "guided"
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            }`}
          >
            <Compass className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Guided Learning</span>
            {userType === "guided" && (
              <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
            )}
          </button>
          <button
            onClick={() => handleModeChange("self-directed")}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
              userType === "self-directed"
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            }`}
          >
            <Map className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Free Style Learning</span>
            {userType === "self-directed" && (
              <div className="w-2 h-2 bg-indigo-600 rounded-full ml-auto"></div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
