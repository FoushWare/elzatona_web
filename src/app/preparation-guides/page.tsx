"use client";

import { useState } from "react";
import { preparationGuides } from "@/lib/preparationGuides";
import Link from "next/link";

export default function PreparationGuidesPage() {
  const [selectedGuide, _setSelectedGuide] = useState<string | null>(null);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const guides = preparationGuides;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Preparation Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Interview preparation strategies, question sets, and methodologies
            to ace your frontend interviews
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/learning-paths" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              📚 Learning Paths
            </Link>
            <Link 
              href="/study-plans" 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
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
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-transparent overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform cursor-pointer group ${
                selectedGuide === guide.id
                  ? "border-blue-500 shadow-blue-500/30 ring-4 ring-blue-500/20"
                  : "hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              {/* Guide Header */}
              <div className={`bg-gradient-to-br ${guide.color} p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className="text-6xl mr-6 drop-shadow-lg filter brightness-110">{guide.icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold mb-3 drop-shadow-lg text-white">{guide.title}</h3>
                        <div className="flex items-center gap-4 text-white/90">
                          <span className="px-4 py-2 bg-white/25 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30">
                            {guide.difficulty.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-lg font-semibold">•</span>
                          <span className="text-lg font-semibold">{guide.estimatedTime} hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/95 text-lg leading-relaxed font-medium">{guide.description}</p>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-8 bg-white dark:bg-gray-800">
                {/* Target Skills */}
                <div className="mb-8">
                  <h4 className="font-bold text-foreground mb-4 flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Target Skills
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {guide.targetSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border border-blue-200 dark:border-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {guide.targetSkills.length > 4 && (
                      <span className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-bold border border-gray-300 dark:border-gray-600">
                        +{guide.targetSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Sections Preview */}
                <div className="mb-8">
                  <h4 className="font-bold text-foreground mb-4 flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    Sections ({guide.sections.length})
                  </h4>
                  <div className="space-y-3">
                    {guide.sections.slice(0, 3).map((section, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="font-medium truncate">{section.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground font-bold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {section.readingTime}min
                        </span>
                      </div>
                    ))}
                    {guide.sections.length > 3 && (
                      <div className="text-sm text-muted-foreground pt-3 border-t border-border font-medium">
                        +{guide.sections.length - 3} more sections
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-8">
                  <h4 className="font-bold text-foreground mb-4 flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {guide.features.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="font-medium truncate">{feature}</span>
                      </div>
                    ))}
                    {guide.features.length > 3 && (
                      <div className="text-sm text-muted-foreground pt-3 border-t border-border font-medium">
                        +{guide.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Link
                    href={`/preparation-guides/${guide.id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-center block"
                  >
                    Start {guide.title}
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href={`/preparation-guides/${guide.id}`}
                    className="w-full bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 group-hover:shadow-lg text-center block"
                  >
                    View Details
                    <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Plans Integration */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📚</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Study Plans + Preparation Guides
            </h2>
            <p className="text-xl text-muted-foreground">
              Combine structured study plans with comprehensive preparation
              guides for maximum effectiveness
            </p>
            {/* Mobile Toggle Buttons - Hidden on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 md:hidden">
              <button
                onClick={() => setShowStatistics(!showStatistics)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showStatistics ? "Hide Statistics" : "Show Statistics"}
                <span className="ml-2">📊</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
                <span className="ml-2">🔍</span>
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
            showStatistics ? 'block' : 'hidden md:grid'
          }`}>
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-300 hover:scale-105 transform group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                1 Week Plan
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Intensive preparation with focused guides
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105 transform group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📅</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                1 Month Plan
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Balanced approach with comprehensive coverage
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:scale-105 transform group">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎯</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                3 Months Plan
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Deep mastery with expert-level preparation
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Learn More
                <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏆</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Success Stories</h2>
              <p className="text-xl opacity-90">
                Join thousands of developers who have successfully landed their
                dream jobs
              </p>
              {/* Mobile Toggle Buttons - Hidden on desktop */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 md:hidden">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/30"
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
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">📈</div>
                <div className="text-5xl font-bold mb-2 drop-shadow-sm">95%</div>
                <div className="text-blue-100 font-bold text-lg">Success Rate</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
                <div className="text-5xl font-bold mb-2 drop-shadow-sm">10K+</div>
                <div className="text-blue-100 font-bold text-lg">Developers Hired</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <div className="text-5xl font-bold mb-2 drop-shadow-sm">4.9/5</div>
                <div className="text-blue-100 font-bold text-lg">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your preparation journey today with our comprehensive guides
              and structured study plans
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/questions"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Practice Questions
                <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/study-plans"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Study Plans
                <svg className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
