"use client";

import Link from "next/link";
import ChallengeCard from "@/components/ChallengeCard";
import { getChallenges } from "@/lib/challenges";
import { Category } from "@/types/challenge";

export default function Home() {
  const featuredChallenges = getChallenges().slice(0, 6);
  const categories: {
    name: Category;
    title: string;
    description: string;
    count: number;
  }[] = [
    {
      name: "html",
      title: "HTML Challenges",
      description: "Master semantic markup, forms, and accessibility",
      count: getChallenges({ category: "html" }).length,
    },
    {
      name: "css",
      title: "CSS Challenges",
      description: "Learn layouts, animations, and responsive design",
      count: getChallenges({ category: "css" }).length,
    },
    {
      name: "javascript",
      title: "JavaScript Challenges",
      description: "Practice DOM manipulation, events, and modern JS",
      count: getChallenges({ category: "javascript" }).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GreatFrontendHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Master frontend development with hands-on coding challenges.
              Practice HTML, CSS, and JavaScript with real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/challenges"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Practicing
              </Link>
              <Link
                href="/resources"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Resources
              </Link>
              <Link
                href="/learning-paths"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-4">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {category.count}
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    challenges available
                  </p>
                  <Link
                    href={`/challenges?category=${category.name}`}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Explore {category.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Challenges
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onClick={() =>
                  console.log(`Navigate to challenge ${challenge.id}`)
                }
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/challenges"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Challenges
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Learning Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Curated Resources</h3>
              <p className="text-gray-600">
                Access carefully selected articles, videos, tools, and courses
                from the best sources in frontend development.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Structured Learning
              </h3>
              <p className="text-gray-600">
                Follow curated learning paths designed to take you from beginner
                to advanced frontend developer.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Discovery</h3>
              <p className="text-gray-600">
                Find exactly what you need with advanced filtering by category,
                difficulty, and resource type.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/resources"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors mr-4"
            >
              Browse All Resources
            </Link>
            <Link
              href="/learning-paths"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Explore Learning Paths
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose GreatFrontendHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Learn by Doing</h3>
              <p className="text-gray-600">
                Practice with real-world coding challenges that build your
                skills progressively.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Feedback</h3>
              <p className="text-gray-600">
                Get immediate feedback on your code with live preview and
                automated testing.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Solutions</h3>
              <p className="text-gray-600">
                Learn from detailed explanations and best practices for each
                challenge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
