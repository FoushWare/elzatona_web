"use client";

import React from "react";
// Note: This page uses API routes, not direct supabase client

import Link from "next/link";
import {
  ArrowRight,
  Play,
  BookOpen,
  Star,
  Map,
  Compass,
  Sparkles,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-80 right-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-60 right-10 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Watermark */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 dark:opacity-30">
          <div className="absolute inset-0 bg-white/10 dark:bg-gray-800/20 rounded-full blur-sm scale-110"></div>
          <img
            src="/elzatona-watermark.png"
            alt="Elzatona Watermark"
            className="w-[400px] h-[400px] object-contain relative z-10"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            {/* Animated title with sparkles */}
            <div className="relative inline-block">
              <h1 className="hero-title text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 opacity-100 translate-y-0">
                Master Frontend Development
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Interviews
                </span>
              </h1>

              {/* Animated sparkles around title */}
              <Sparkles className="absolute -top-4 w-8 h-8 text-yellow-400 animate-pulse right-4" />
              <Zap
                className="absolute -bottom-2 w-6 h-6 text-blue-400 animate-bounce right-4"
                style={{ animationDelay: "0.5s" }}
              />
              <Star
                className="absolute top-1/2 w-5 h-5 text-purple-400 animate-ping right-4"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Animated subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 opacity-100 translate-y-0">
              The complete platform to ace your frontend interviews with
              comprehensive practice questions, learning paths, and real-time AI
              assistance.
            </p>
          </div>

          {/* Animated CTA Button */}
          <div className="mb-12 transition-all duration-1000 delay-500 opacity-100 translate-y-0">
            <div className="relative inline-block">
              <Link
                href="/browse-practice-questions"
                className="main-cta-button group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <span className="relative z-10 flex items-center space-x-2">
                  <Play className="w-6 h-6" />
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Simple stats */}
          <div className="transition-all duration-1000 delay-700 opacity-100 translate-y-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Active Learners */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">8.5K+</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Learners
                </div>
              </div>

              {/* Success Rate */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">85%</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Success Rate
                </div>
              </div>

              {/* Total Questions */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">1K+</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Questions Solved
                </div>
              </div>

              {/* Average Time */}
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">25m</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Study Time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Style Selection */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 delay-800 opacity-100 translate-y-0">
              How would you like to learn?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-all duration-1000 delay-900 opacity-100 translate-y-0">
              Choose your learning style to get the most personalized
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Guided Learning */}
            <Link
              href="/learn"
              className="group bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 opacity-100 translate-y-0"
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Guided Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  Follow structured learning paths designed by experts. Perfect
                  for beginners or those who prefer a guided approach.
                </p>
                <div className="flex items-center justify-center space-x-2 text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Start Guided Learning</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Free Style Learning */}
            <Link
              href="/browse-practice-questions"
              className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 opacity-100 translate-y-0"
              style={{ transitionDelay: "1100ms" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Free Style Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  Create your own learning roadmap and explore topics at your
                  own pace. Perfect for experienced learners.
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400 font-medium">
                  <span>Start Free Style Learning</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="final-cta-section py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-1500 opacity-100 translate-y-0">
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
                Join thousands of developers who have mastered frontend
                interviews with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/browse-practice-questions"
                  className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300" />
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
    </div>
  );
}
