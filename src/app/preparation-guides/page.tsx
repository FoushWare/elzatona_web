"use client";

import { useState } from "react";
import { preparationGuides } from "@/lib/preparationGuides";
import Link from "next/link";

export default function PreparationGuidesPage() {
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
            <Link href="/learning-paths" className="btn-primary px-6 py-3">
              📚 Learning Paths
            </Link>
            <Link href="/study-plans" className="btn-primary px-6 py-3">
              📅 Study Plans
            </Link>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className={`card overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                selectedGuide === guide.id
                  ? "border-primary shadow-primary/20"
                  : "border-border hover:border-border/80"
              }`}
            >
              {/* Guide Header */}
              <div className={`bg-gradient-to-r ${guide.color} p-6 text-white`}>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{guide.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{guide.title}</h3>
                    <p className="text-blue-100 mt-1">{guide.description}</p>
                  </div>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-6">
                {/* Sections */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    Sections
                  </h4>
                  <ul className="space-y-2">
                    {guide.sections?.map((section, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <svg
                          className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {section.title}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {guide.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedGuide(guide.id)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Start {guide.title}
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Study Plans Integration */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Study Plans + Preparation Guides
            </h2>
            <p className="text-xl text-gray-600">
              Combine structured study plans with comprehensive preparation
              guides for maximum effectiveness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1 Week Plan
              </h3>
              <p className="text-gray-600 mb-4">
                Intensive preparation with focused guides
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1 Month Plan
              </h3>
              <p className="text-gray-600 mb-4">
                Balanced approach with comprehensive coverage
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3 Months Plan
              </h3>
              <p className="text-gray-600 mb-4">
                Deep mastery with expert-level preparation
              </p>
              <Link
                href="/study-plans"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl opacity-90">
              Join thousands of developers who have successfully landed their
              dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎓</div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Developers Hired</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">User Rating</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Start your preparation journey today with our comprehensive guides
              and structured study plans
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/questions"
                className="bg-blue-600 text-white px-8 py-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Practice Questions
              </Link>
              <Link
                href="/study-plans"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                Study Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
