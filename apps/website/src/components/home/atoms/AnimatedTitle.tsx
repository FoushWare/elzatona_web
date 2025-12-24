"use client";

import React from "react";
import { Sparkles, Zap, Star } from "lucide-react";
import { ANIMATION_DURATION } from "@/lib/constants/homePage.constants";

interface AnimatedTitleProps {
  title: string;
  highlightText?: string;
  showAnimation: boolean;
  className?: string;
}

/**
 * AnimatedTitle Component
 * Displays an animated title with decorative sparkles
 */
export function AnimatedTitle({
  title,
  highlightText = "Interviews",
  showAnimation,
  className = "",
}: AnimatedTitleProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <h1
        className={`hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 ${
          showAnimation
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {title}
        {highlightText && (
          <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h1>

      {/* Animated sparkles around title */}
      {showAnimation && (
        <>
          <Sparkles className="absolute -top-4 w-8 h-8 text-yellow-400 animate-pulse right-4" />
          <Zap
            className="absolute -bottom-2 w-6 h-6 text-blue-400 animate-bounce right-4"
            style={{ animationDelay: "0.5s" }}
          />
          <Star
            className="absolute top-1/2 w-5 h-5 text-purple-400 animate-ping right-4"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}
    </div>
  );
}

