import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  _Clock as _Clock,
  Target,
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Users,
  Zap,
  Code,
  Palette,
  Globe,
  Layers,
  Cpu,
  Database,
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "orange";
  questionCount: number;
  topics: string[];
  estimatedTime: string;
  difficulty: string;
}

const learningPaths: Record<string, LearningPath> = {
  javascript: {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description:
      "Master core JavaScript concepts, ES6+ features, and asynchronous programming.",
    icon: "⚡",
    color: "yellow",
    topics: [
      "ES6+ Features",
      "Async Programming",
      "DOM Manipulation",
      "Error Handling",
      "Closures",
      "Prototypes",
      "Event Loop",
      "Modules",
    ],
    estimatedTime: "2-3 weeks",
    difficulty: "Beginner to Advanced",
    questionCount: 125,
  },
  react: {
    id: "react",
    title: "React Development",
    description:
      "Build modern React applications with hooks and best practices",
    icon: "⚛️",
    color: "blue",
    questionCount: 306,
    topics: [
      "Components",
      "Hooks",
      "State Management",
      "Context API",
      "Performance",
      "Testing",
      "Routing",
      "Server Components",
    ],
    estimatedTime: "3-4 weeks",
    difficulty: "Intermediate to Advanced",
  },
  css: {
    id: "css",
    title: "CSS Mastery",
    description:
      "Dive deep into CSS layouts, animations, and responsive design principles.",
    icon: "🎨",
    color: "green",
    questionCount: 100,
    topics: [
      "Flexbox & Grid",
      "Animations",
      "Responsive Design",
      "Sass/Less",
      "BEM",
      "CSS Variables",
      "Custom Properties",
      "Modern CSS",
    ],
    estimatedTime: "1-2 weeks",
    difficulty: "Beginner to Intermediate",
  },
  html: {
    id: "html",
    title: "HTML Essentials",
    description:
      "Learn semantic HTML5, accessibility best practices, and form handling.",
    icon: "📄",
    color: "red",
    questionCount: 50,
    topics: [
      "Semantics",
      "Accessibility",
      "Forms",
      "SEO Basics",
      "Web Components",
      "ARIA",
      "Meta Tags",
      "Structured Data",
    ],
    estimatedTime: "1 week",
    difficulty: "Beginner",
  },
  nextjs: {
    id: "nextjs",
    title: "Next.js Framework",
    description:
      "Develop powerful server-rendered and static Next.js applications.",
    icon: "🚀",
    color: "purple",
    questionCount: 80,
    topics: [
      "Routing",
      "SSR/SSG",
      "API Routes",
      "Data Fetching",
      "Deployment",
      "Image Optimization",
      "Font Optimization",
      "Middleware",
    ],
    estimatedTime: "2-3 weeks",
    difficulty: "Intermediate",
  },
  "system-design": {
    id: "system-design",
    title: "Frontend System Design",
    description:
      "Understand architecture patterns for scalable frontend applications.",
    icon: "🏗️",
    color: "orange",
    topics: [
      "Architecture Patterns",
      "State Management",
      "Performance",
      "Scalability",
      "Caching Strategies",
      "CDN",
      "Micro Frontends",
      "Monitoring",
    ],
    estimatedTime: "3-4 weeks",
    difficulty: "Advanced",
    questionCount: 50,
  },
};

const getColorClasses = (color: LearningPath["color"]) => {
  const colorMap = {
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-400 to-yellow-600",
    red: "from-red-400 to-red-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-400 to-orange-600",
  };
  return (
    colorMap[color as keyof typeof colorMap] || "from-gray-400 to-gray-600"
  );
};

const getIconComponent = (pathId: string) => {
  const iconMap = {
    javascript: <Zap className="w-8 h-8" />,
    react: <Code className="w-8 h-8" />,
    css: <Palette className="w-8 h-8" />,
    html: <Globe className="w-8 h-8" />,
    nextjs: <Layers className="w-8 h-8" />,
    "system-design": <Cpu className="w-8 h-8" />,
  };
  return (
    iconMap[pathId as keyof typeof iconMap] || <BookOpen className="w-8 h-8" />
  );
};

interface LearningPathPageProps {
  params: Promise<{ pathId: string }>;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars like '+'
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/-+/g, "-"); // collapse dashes

export default async function LearningPathPage({
  params,
}: LearningPathPageProps) {
  const { pathId } = await params;
  const path = learningPaths[pathId];

  if (!path) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Path Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The requested learning path could not be found.
          </p>
          <Link
            href="/free-style"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Learning Paths
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Free Style */}
        <div className="mb-8">
          <Link
            href="/free-style"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Learning Paths</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Free Style Learning
            </span>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div
              className={`w-20 h-20 bg-gradient-to-r ${getColorClasses(path.color)} rounded-2xl flex items-center justify-center mr-6 shadow-xl`}
            >
              {getIconComponent(pathId)}
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {path.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                {path.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {path.questionCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questions
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {path.estimatedTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Duration
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {path.difficulty}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Level
              </div>
            </div>
          </div>
        </div>

        {/* Start Learning Button */}
        <div className="text-center mb-12">
          <Link
            href={`/questions?topic=${pathId}`}
            className="inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-6 h-6" />
            <span>Start {path.title}</span>
          </Link>
        </div>

        {/* Topics Covered */}
        <div className="mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border-2 border-white/20 dark:border-gray-700/20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Topics Covered
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {path.topics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Learning Modules
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {path.topics.slice(0, 6).map((topic, index) => (
              <div
                key={index}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {topic}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Master the fundamentals of {topic.toLowerCase()} with hands-on
                  practice and real-world examples.
                </p>
                <Link
                  href={`/questions?topic=${encodeURIComponent(
                    pathId,
                  )}&subtopic=${encodeURIComponent(slugify(topic))}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Practice {topic}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Track Your Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-2xl mx-auto">
              Monitor your learning journey with detailed progress tracking,
              performance analytics, and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/questions?topic=${pathId}`}
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
              >
                <Target className="w-5 h-5" />
                <span>Start Practice</span>
              </Link>
              <Link
                href="/free-style"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Paths</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
