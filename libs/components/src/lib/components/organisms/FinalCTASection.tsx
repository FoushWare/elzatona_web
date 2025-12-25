"use client";

import React from "react";
import Link from "next/link";
import { Play, BookOpen, ArrowRight } from "lucide-react";
import { ANIMATION_DELAYS } from "@elzatona/types";

interface FinalCTASectionProps {
  showAnimation: boolean;
}

/**
 * FinalCTASection Component
 * Final call-to-action section for unauthenticated users
 */
export function FinalCTASection({ showAnimation }: FinalCTASectionProps) {
  return (
    <section
      className={`final-cta-section py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300 ${
        showAnimation ? "delay-450 opacity-100 translate-y-0" : "opacity-100 translate-y-0"
      }`}
      style={{ transitionDelay: `${ANIMATION_DELAYS.FINAL_CTA}ms` }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 left-8 w-6 h-6 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-4 w-3 h-3 bg-white rounded-full animate-ping"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Ace Your Interviews? 🚀
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have mastered frontend interviews
              with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Learning Paths</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
