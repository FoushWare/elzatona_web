"use client";

import { useState } from "react";
import { preparationGuides } from "@/lib/preparationGuides";
import Link from "next/link";

export default function PreparationGuidesPage() {
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const guides = preparationGuides;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Preparation Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interview preparation strategies, question sets, and methodologies
            to ace your frontend interviews
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link 
              href="/learning-paths" 
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📚 Learning Paths
            </Link>
            <Link 
              href="/study-plans" 
              className="bg-transparent border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📅 Study Plans
            </Link>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className={`bg-card rounded-xl shadow-sm border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform cursor-pointer group ${
                selectedGuide === guide.id
                  ? "border-blue-500 shadow-blue-500/20 ring-2 ring-blue-500/20"
                  : "hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              {/* Guide Header */}
              <div className={`bg-gradient-to-r ${guide.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-5xl mr-4 drop-shadow-lg">{guide.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-sm">{guide.title}</h3>
                        <div className="flex items-center gap-3 text-blue-100">
                          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                            {guide.difficulty.replace('-', ' ')}
                          </span>
                          <span className="text-sm">•</span>
                          <span className="text-sm">{guide.estimatedTime} hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-100 text-lg leading-relaxed">{guide.description}</p>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-8">
                {/* Target Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Target Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.targetSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {guide.targetSkills.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                        +{guide.targetSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Sections Preview */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Sections ({guide.sections.length})
                  </h4>
                  <div className="space-y-2">
                    {guide.sections.slice(0, 3).map((section, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="truncate">{section.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {section.readingTime}min
                        </span>
                      </div>
                    ))}
                    {guide.sections.length > 3 && (
                      <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                        +{guide.sections.length - 3} more sections
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {guide.features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                    {guide.features.length > 3 && (
                      <div className="text-sm text-muted-foreground pt-2 border-t border-border">
                        +{guide.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href={`/preparation-guides/${guide.id}`}
                    className="w-full bg-transparent border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-center block"
                  >
                    Start {guide.title}
                    <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href={`/preparation-guides/${guide.id}`}
                    className="w-full bg-transparent border-2 border-gray-600 text-gray-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-600 hover:text-white hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-center block"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Plans Integration */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Study Plans + Preparation Guides
            </h2>
            <p className="text-xl text-muted-foreground">
              Combine structured study plans with comprehensive preparation
              guides for maximum effectiveness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {showStatistics ? "Hide Statistics" : "Show Statistics"}
                <span className="ml-2">📊</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                <span className="ml-2">🔍</span>
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-300 hover:scale-105 transform group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                1 Week Plan
              </h3>
              <p className="text-muted-foreground mb-4">
                Intensive preparation with focused guides
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-transparent border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-105 transform group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                1 Month Plan
              </h3>
              <p className="text-muted-foreground mb-4">
                Balanced approach with comprehensive coverage
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-105 transform group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                3 Months Plan
              </h3>
              <p className="text-muted-foreground mb-4">
                Deep mastery with expert-level preparation
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-transparent border-2 border-green-600 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-sm">Success Stories</h2>
              <p className="text-xl opacity-90">
                Join thousands of developers who have successfully landed their
                dream jobs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors border border-white/30"
                >
                  {showStatistics ? "Hide Statistics" : "Show Statistics"}
                  <span className="ml-2">📊</span>
                </button>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
              showStatistics ? 'block' : 'hidden md:grid'
            }`}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📈</div>
                <div className="text-4xl font-bold mb-2 drop-shadow-sm">95%</div>
                <div className="text-blue-100 font-medium">Success Rate</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
                <div className="text-4xl font-bold mb-2 drop-shadow-sm">10K+</div>
                <div className="text-blue-100 font-medium">Developers Hired</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <div className="text-4xl font-bold mb-2 drop-shadow-sm">4.9/5</div>
                <div className="text-blue-100 font-medium">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-card rounded-xl shadow-sm border border-border p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Start your preparation journey today with our comprehensive guides
              and structured study plans
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/questions"
                className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Practice Questions
                <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/study-plans"
                className="bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-medium hover:bg-purple-600 hover:text-white hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Study Plans
                <svg className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
