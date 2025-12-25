"use client";

import React from "react";
import { AnimatedTitle } from "../atoms/AnimatedTitle";
import { CTAButton } from "../atoms/CTAButton";
import { UserStatistics } from "@elzatona/components";
import type { PersonalizedContent } from "../../../../../apps/website/src/app/Types/homePage.types";
import { ANIMATION_DELAYS } from "../../../../../apps/website/src/app/utils/constants/homePage.constants";

interface HeroSectionProps {
  personalizedContent: PersonalizedContent;
  showAnimation: boolean;
}

/**
 * HeroSection Component
 * Main hero section with title, subtitle, CTA button, and user statistics
 */
export function HeroSection({
  personalizedContent,
  showAnimation,
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <AnimatedTitle
            title={personalizedContent.title}
            highlightText="Interviews"
            showAnimation={showAnimation}
          />

          {/* Animated subtitle */}
          <p
            className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              showAnimation
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {personalizedContent.subtitle}
          </p>
        </div>

        {/* Animated CTA Button */}
        <div className="mb-12">
          <CTAButton
            href={personalizedContent.ctaLink}
            text={personalizedContent.cta}
            icon={personalizedContent.icon}
            color={personalizedContent.color}
            showAnimation={showAnimation}
          />
        </div>

        {/* Animated stats */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            showAnimation
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <UserStatistics />
        </div>
      </div>
    </section>
  );
}
