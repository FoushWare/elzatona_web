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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">🚀</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-blue-100">Kod</span>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Dev
              </span>
            </h1>
            <div className="text-2xl md:text-3xl mb-4 text-blue-200 font-medium">
              <span className="text-blue-300">Frontend KodDev</span>
            </div>
            <div className="text-lg text-blue-100 mb-6 opacity-80">
              <span className="text-blue-200">Frontend</span> +{" "}
              <span className="text-blue-200">Kod</span> = Code •{" "}
              <span className="text-blue-200">Dev</span> = Developer
              <br />
              <span className="text-sm opacity-75">
                (Frontend KodDev = Frontend Code Developer)
              </span>
            </div>
            <div className="text-lg text-blue-100 mb-4 opacity-90">
              🎯 <span className="font-semibold">500+ Interview Questions</span>{" "}
              • 🚀 <span className="font-semibold">Coding Challenges</span> • 📚{" "}
              <span className="font-semibold">Study Plans</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/challenges"
                className="inline-block px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🎯 Practice Interviews
              </Link>
              <Link
                href="/resources"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                📚 Interview Questions
              </Link>
              <Link
                href="/learning-paths"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🗺️ Study Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Choose Your Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const gradients = [
                "from-purple-500 to-pink-500",
                "from-blue-500 to-cyan-500",
                "from-green-500 to-emerald-500",
              ];
              const icons = ["🎨", "⚡", "🚀"];
              const bgColors = [
                "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
                "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
                "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
              ];
              const borderColors = [
                "border-purple-200 dark:border-purple-800",
                "border-blue-200 dark:border-blue-800",
                "border-green-200 dark:border-green-800",
              ];
              const textColors = [
                "text-purple-600 dark:text-purple-400",
                "text-blue-600 dark:text-blue-400",
                "text-green-600 dark:text-green-400",
              ];

              return (
                <div
                  key={category.name}
                  className={`${bgColors[index]} ${borderColors[index]} border-2 rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="text-center">
                    <div
                      className={`text-6xl mb-4 transform hover:scale-110 transition-transform duration-300`}
                    >
                      {icons[index]}
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-4 ${textColors[index]}`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for interview preparation
                    </p>
                    <div
                      className={`text-4xl font-bold ${textColors[index]} mb-4`}
                    >
                      {category.count}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      challenges available
                    </p>
                    <Link
                      href={`/challenges?category=${category.name}`}
                      className={`inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${gradients[index]} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      Practice for Interviews
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Featured Challenges
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start with these popular challenges to build your frontend skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/challenges" className="btn-primary">
              View All Challenges
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Why Choose Frontend KodDev?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to ace frontend development interviews
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 hover:-translate-y-2 transition-all duration-300 shadow-lg animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-orange-600 dark:text-orange-400">
                Interactive Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Hands-on coding challenges with real-time feedback
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:-rotate-3 hover:-translate-y-2 transition-all duration-300 shadow-lg animate-bounce">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                Comprehensive Resources
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Curated learning materials and best practices
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 hover:-translate-y-2 transition-all duration-300 shadow-lg animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">
                Practice Questions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Interview-style questions to prepare for technical assessments
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:-rotate-3 hover:-translate-y-2 transition-all duration-300 shadow-lg animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-pink-600 dark:text-pink-400">
                Track Progress
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor your learning journey with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-6xl mb-6 animate-pulse">🌟</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-blue-50">
            Join thousands of developers who are already acing their frontend
            interviews with{" "}
            <span className="text-blue-200">Frontend KodDev</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/challenges"
              className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Start Interview Prep
            </Link>
            <Link
              href="/resources"
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              🔍 View Questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
