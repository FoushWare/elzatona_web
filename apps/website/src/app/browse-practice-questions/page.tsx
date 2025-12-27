"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Brain,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@elzatona/common-ui";

export default function BrowsePracticeQuestionsPage() {
  const router = useRouter();

  const practiceOptions = [
    {
      id: "interview-questions",
      title: "Practice Interview Questions",
      description:
        "Master frontend interview questions covering HTML, CSS, JavaScript, React, and more. Perfect for interview preparation.",
      icon: BookOpen,
      href: "/learning-paths",
      color: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-600",
      stats: "500+ questions",
    },
    {
      id: "frontend-tasks",
      title: "Practice Frontend Tasks",
      description:
        "Hands-on coding challenges and real-world frontend development tasks. Build projects and improve your skills.",
      icon: Code,
      href: "/frontend-tasks",
      color: "from-green-500 to-emerald-600",
      iconBg: "bg-green-600",
      stats: "100+ tasks",
    },
    {
      id: "problem-solving",
      title: "Practice Problem Solving",
      description:
        "Algorithm and logic problems to sharpen your problem-solving skills. Essential for technical interviews.",
      icon: Brain,
      href: "/problem-solving",
      color: "from-purple-500 to-pink-600",
      iconBg: "bg-purple-600",
      stats: "200+ problems",
    },
  ];

  const handleOptionClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Browse Practice Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your practice mode and start improving your frontend
            development skills
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Questions
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    500+
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Frontend Tasks
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    100+
                  </p>
                </div>
                <Code className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Problem Sets
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    200+
                  </p>
                </div>
                <Brain className="w-12 h-12 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {practiceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.id}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleOptionClick(option.href)}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${option.iconBg}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {option.stats}
                    </span>
                    <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Roadmap Option */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Create Custom Roadmap
                  </h3>
                  <p className="text-indigo-100">
                    Build your own personalized learning path with topics and
                    questions of your choice
                  </p>
                </div>
              </div>
              <Link
                href="/custom-roadmap"
                className="ml-4 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
