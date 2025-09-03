'use client';

import Link from 'next/link';
import ZatonaLogo from '@/components/ZatonaLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <ZatonaLogo size="lg" showText={true} variant="stacked" />
              </div>
              <div
                className="text-8xl mb-6 animate-bounce"
                role="img"
                aria-label="Rocket emoji"
              >
                🚀
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-blue-100">Zatona</span>
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Web
                </span>
              </h1>
              <div className="text-2xl md:text-3xl mb-4 text-blue-200 font-medium">
                <span className="text-blue-300">Zatona Web 🫒</span>
              </div>
              <div className="text-lg text-blue-100 mb-6 opacity-80">
                <span className="text-blue-200">Zatona</span> = Olive •{' '}
                <span className="text-blue-200">Web</span> = Web Development
                <br />
                <span className="text-sm opacity-75">
                  (Zatona Web = Olive Web Development)
                </span>
              </div>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Master frontend development with our comprehensive platform
                featuring practice questions, learning paths, coding challenges,
                and real-time AI assistance. Perfect for interview preparation
                and skill building.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/practice/fundamentals"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                  aria-label="Start learning frontend development fundamentals"
                >
                  🚀 Start Learning
                </Link>
                <Link
                  href="/learning-paths"
                  className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 hover:scale-105 border border-white/20 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  aria-label="Explore structured learning paths for frontend development"
                >
                  🗺️ Explore Paths
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Choose Zatona Web?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Our platform combines cutting-edge technology with proven
                learning methodologies to help you excel in frontend
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label="Target emoji"
                >
                  🎯
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Comprehensive Practice
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  75+ carefully crafted questions covering JavaScript, React,
                  CSS, and HTML fundamentals to advanced concepts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label="Map emoji"
                >
                  🗺️
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Structured Learning Paths
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Follow curated learning paths designed by industry experts to
                  build your skills systematically.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label="Computer emoji"
                >
                  💻
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Real Coding Challenges
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Practice with hands-on coding challenges that mirror
                  real-world interview scenarios and development tasks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Transform Your Frontend Skills?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-blue-50">
              Join thousands of developers who are already acing their frontend
              interviews with <span className="text-blue-200">Zatona Web</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/practice/fundamentals"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                aria-label="Start practicing frontend development fundamentals"
              >
                🚀 Start Practicing
              </Link>
              <Link
                href="/learning-paths"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors font-semibold text-lg border border-white/20 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
                aria-label="View comprehensive learning paths for frontend development"
              >
                🗺️ View Learning Paths
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
