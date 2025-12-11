import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Zap,
  Target,
  Clock,
  Users,
  Star,
  ArrowRight,
  Map,
  Compass,
  CheckCircle,
  Play,
} from "lucide-react";

export default function FreeStyleLearningPage() {
  const learningPaths = [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Master JavaScript from basics to advanced concepts",
      icon: "⚡",
      color: "yellow",
      topics: [
        "ES6+ Features",
        "Async Programming",
        "DOM Manipulation",
        "Error Handling",
      ],
      estimatedTime: "2-3 weeks",
      difficulty: "Beginner to Advanced",
      questionCount: 125,
    },
    {
      id: "react",
      title: "React Development",
      description:
        "Build modern React applications with hooks and best practices",
      icon: "⚛️",
      color: "blue",
      topics: ["Hooks", "State Management", "Component Design", "Performance"],
      estimatedTime: "3-4 weeks",
      difficulty: "Intermediate to Advanced",
      questionCount: 306,
    },
    {
      id: "css",
      title: "CSS Mastery",
      description: "Advanced CSS techniques and modern layout systems",
      icon: "🎨",
      color: "purple",
      topics: ["Flexbox", "Grid", "Animations", "Responsive Design"],
      estimatedTime: "2-3 weeks",
      difficulty: "Beginner to Advanced",
      questionCount: 100,
    },
    {
      id: "html",
      title: "HTML & Accessibility",
      description: "Semantic HTML and web accessibility best practices",
      icon: "📄",
      color: "green",
      topics: ["Semantic Elements", "ARIA", "Forms", "SEO"],
      estimatedTime: "1-2 weeks",
      difficulty: "Beginner to Intermediate",
      questionCount: 50,
    },
    {
      id: "nextjs",
      title: "Next.js Framework",
      description: "Full-stack React applications with Next.js",
      icon: "🚀",
      color: "indigo",
      topics: ["SSR/SSG", "Routing", "API Routes", "Optimization"],
      estimatedTime: "2-3 weeks",
      difficulty: "Intermediate to Advanced",
      questionCount: 80,
    },
    {
      id: "system-design",
      title: "Frontend System Design",
      description: "Design scalable frontend architectures",
      icon: "🏗️",
      color: "orange",
      topics: [
        "Architecture Patterns",
        "State Management",
        "Performance",
        "Scalability",
      ],
      estimatedTime: "3-4 weeks",
      difficulty: "Advanced",
      questionCount: 50,
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      yellow: "from-yellow-400 to-orange-500",
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
      green: "from-green-400 to-green-600",
      indigo: "from-indigo-400 to-indigo-600",
      orange: "from-orange-400 to-orange-600",
    };
    return (
      colorMap[color as keyof typeof colorMap] || "from-gray-400 to-gray-600"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-4">
            <Map className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
              Free Style Learning Mode
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learn at Your Own Pace
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Choose your learning path and customize your journey. Access all
            questions, create custom practice sessions, and learn at your own
            speed.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                711+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                6
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Learning Paths
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Custom
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Timeline
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Choose Your Learning Path
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(path.color)} rounded-xl flex items-center justify-center mr-4 shadow-lg`}
                  >
                    <span className="text-2xl">{path.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {path.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {path.questionCount} Questions
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {path.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Topics Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {path.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{path.difficulty}</span>
                  </div>
                </div>

                <Link
                  href={`/free-style/path/${path.id}`}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Practice Section */}
        <div className="mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Create Custom Practice Sessions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Mix and match topics from different learning paths to create
                your own personalized practice sessions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/custom-roadmap"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  <span>Create Custom Session</span>
                </Link>

                <Link
                  href="/questions"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse All Questions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Switch to Guided Learning */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Prefer Structured Learning?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Try our guided learning plans with pre-defined timelines and
              structured question sequences for focused interview preparation.
            </p>
            <Link
              href="/features/guided-learning"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              <Compass className="w-5 h-5" />
              <span>Switch to Guided Learning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
