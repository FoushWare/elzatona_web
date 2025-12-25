"use client";

import React from "react";
import { Compass, Map } from "lucide-react";
import { LearningTypeCard } from "../atoms/LearningTypeCard";
import { ANIMATION_DELAYS } from "@elzatona/types";
import type { UserType } from "@elzatona/types";

interface LearningStyleSelectorProps {
  userType: UserType;
  onGuidedClick: () => void;
  onFreestyleClick: () => void;
  showAnimation: boolean;
}

/**
 * LearningStyleSelector Component
 * Selection interface for choosing learning style (Guided or Free Style)
 */
export function LearningStyleSelector({
  userType,
  onGuidedClick,
  onFreestyleClick,
  showAnimation,
}: LearningStyleSelectorProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300 ${
              showAnimation ? "delay-200 opacity-100 translate-y-0" : "opacity-100 translate-y-0"
            }`}
          >
            How would you like to learn?
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-300 transition-all duration-300 ${
              showAnimation ? "delay-250 opacity-100 translate-y-0" : "opacity-100 translate-y-0"
            }`}
          >
            Choose your learning style to get the most personalized experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <LearningTypeCard
            title="Guided Learning"
            description="Follow structured learning paths designed by experts. Perfect for beginners or those who prefer a guided approach."
            icon={Compass}
            onClick={onGuidedClick}
            isSelected={userType === "guided"}
            showAnimation={showAnimation}
            animationDelay={`${ANIMATION_DELAYS.LEARNING_CARD_GUIDED}ms`}
            colorVariant="indigo"
          />

          <LearningTypeCard
            title="Free Style Learning"
            description="Create your own learning roadmap and explore topics at your own pace. Perfect for experienced learners."
            icon={Map}
            onClick={onFreestyleClick}
            isSelected={userType === "self-directed"}
            showAnimation={showAnimation}
            animationDelay={`${ANIMATION_DELAYS.LEARNING_CARD_FREESTYLE}ms`}
            colorVariant="green"
          />
        </div>
      </div>
    </section>
  );
}
