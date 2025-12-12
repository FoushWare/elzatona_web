"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@elzatona/contexts";

// import { SignInPopup } from '@elzatona/components'; // Temporarily disabled due to import issues
import {
  Code,
  Target,
  Brain,
  ArrowRight,
  BookOpen,
  _Zap as _Zap,
  Users,
  Clock,
  CheckCircle,
  Eye,
  Play,
  Star,
  _Award as _Award,
  _TrendingUp as _TrendingUp,
  Calendar,
  Loader2,
} from "lucide-react";

interface CustomPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  sections: {
    id: string;
    name: string;
    selectedQuestions: string[];
  }[];
  totalQuestions: number;
  dailyQuestions: number;
  created_at: string;
  isActive?: boolean;
  progress?: {
    completedQuestions: number;
    currentDay: number;
    lastActivity: string;
  };
}

export default function BrowsePracticeQuestionsPage() {
  const router = useRouter();
  const { isAuthenticated: authIsAuthenticated, user } = useAuth();
  const [customRoadmaps, setCustomRoadmaps] = useState<CustomPlan[]>([]);
  const [isLoadingRoadmaps, setIsLoadingRoadmaps] = useState(false);

  // Determine if user is authenticated
  const isAuthenticated = authIsAuthenticated && !!user;

  // Load custom roadmaps when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      loadCustomRoadmaps();
    }
  }, [isAuthenticated]);

  const loadCustomRoadmaps = async () => {
    setIsLoadingRoadmaps(true);
    try {
      // Load from localStorage for now (in real app, load from Firebase)
      const savedPlans = localStorage.getItem("userPlans");
      if (savedPlans) {
        const parsedPlans = JSON.parse(savedPlans);
        setCustomRoadmaps(parsedPlans);
      }
    } catch (error) {
      console.error("Error loading custom roadmaps:", error);
      setCustomRoadmaps([]);
    } finally {
      setIsLoadingRoadmaps(false);
    }
  };

  const practiceOptions = [
    {
      id: "interview-questions",
      title: "Interview Questions",
      description: "Master technical interviews with curated questions",
      icon: <Users className="w-12 h-12" />,
      color: "blue",
      path: "/free-style",
      isPopular: true,
      comingSoon: false,
    },
    {
      id: "frontend-tasks",
      title: "Frontend Tasks",
      description: "Build real-world projects and components",
      icon: <Code className="w-12 h-12" />,
      color: "purple",
      path: "/frontend-tasks",
      isPopular: false,
      comingSoon: true,
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      description: "Solve algorithmic and logical problems",
      icon: <Brain className="w-12 h-12" />,
      color: "green",
      path: "/free-style-practice",
      isPopular: false,
      comingSoon: true,
    },
  ];

  const handleOptionClick = (option: (typeof practiceOptions)[0]) => {
    if (option.comingSoon) {
      return; // Don't navigate if coming soon
    }
    router.push(option.path);
  };

  const handleCustomRoadmapClick = () => {
    if (isAuthenticated) {
      router.push("/custom-roadmap");
    } else {
      // Store intent to browse practice questions in localStorage
      localStorage.setItem("pending_browse_practice_questions_intent", "true");
      localStorage.setItem("pending_custom_roadmap_intent", "true");
      // Redirect to auth page, which will then redirect to dashboard
      router.push("/auth?redirect=/dashboard");
    }
  };

  const handleStartRoadmap = (plan_id: string) => {
    // Set as active plan and redirect to practice
    localStorage.setItem("active-custom-plan", plan_id);
    router.push(`/custom-practice/${plan_id}`);
  };

  const handleViewRoadmap = (_plan_id: string) => {
    router.push(`/my-plans`);
  };

  const getProgressPercentage = (plan: CustomPlan) => {
    if (!plan.progress) return 0;
    return Math.round(
      (plan.progress.completedQuestions / plan.totalQuestions) * 100,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative mb-8">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 scale-110" />

            {/* Main Icon */}
            <div className="relative w-28 h-28 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <BookOpen className="w-14 h-14 text-white" />

              {/* Rotating Ring */}
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            Choose Your Learning Path
          </h1>

          <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-5xl mx-auto leading-relaxed mb-12">
            Select how you&apos;d like to learn and improve your frontend
            development skills. Each option offers a unique experience tailored
            to different goals and skill levels.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                750+
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Total Questions
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Learning Types
              </div>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                100%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Free Access
              </div>
            </div>
          </div>
        </div>

        {/* Practice Options Grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {practiceOptions.map((option, _index) => (
            <div
              key={option.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 ${
                option.comingSoon
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-2xl cursor-pointer hover:border-transparent hover:scale-105"
              } ${
                option.isPopular && !option.comingSoon
                  ? "ring-4 ring-blue-200 dark:ring-blue-800 scale-105 border-blue-300 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {/* Gradient Background Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                  option.color === "blue"
                    ? "from-blue-500 to-blue-600"
                    : option.color === "purple"
                      ? "from-purple-500 to-purple-600"
                      : "from-green-500 to-green-600"
                }`}
              />

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Icon */}
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg ${
                    option.color === "blue"
                      ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400"
                      : option.color === "purple"
                        ? "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400"
                        : "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400"
                  } group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  {option.icon}
                </div>

                {/* Title & Description */}
                <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {option.title}
                  </h3>
                  {option.comingSoon && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full text-xs font-bold shadow-lg">
                      <Clock className="w-3 h-3 fill-current" />
                      <span>Coming Soon</span>
                    </div>
                  )}
                  {option.isPopular && !option.comingSoon && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs font-bold shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {option.description}
                </p>

                {/* CTA Button */}
                <div className="text-center">
                  {option.comingSoon ? (
                    <button
                      disabled
                      className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed opacity-75"
                    >
                      <Clock className="w-5 h-5" />
                      <span>Coming Soon</span>
                    </button>
                  ) : (
                    <button
                      className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                        option.color === "blue"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                          : option.color === "purple"
                            ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                            : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      } group-hover:scale-105 group-hover:-translate-y-1`}
                    >
                      <Play className="w-5 h-5" />
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-current transition-all duration-300 ${
                  option.color === "blue"
                    ? "group-hover:border-blue-300"
                    : option.color === "purple"
                      ? "group-hover:border-purple-300"
                      : "group-hover:border-green-300"
                }`}
              />
            </div>
          ))}
        </div>

        {/* My Custom Roadmaps Section */}
        {isAuthenticated && customRoadmaps.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
                My Custom Roadmaps
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Continue your personalized learning journey with your custom
                roadmaps
              </p>
            </div>

            {isLoadingRoadmaps ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                <p className="text-gray-600 dark:text-gray-300">
                  Loading your roadmaps...
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {customRoadmaps.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Roadmap Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {roadmap.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {roadmap.description}
                          </p>
                        </div>
                        {roadmap.isActive && (
                          <div className="ml-4">
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Active</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Roadmap Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{roadmap.duration} days</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Target className="w-4 h-4" />
                          <span>{roadmap.totalQuestions} questions</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{roadmap.dailyQuestions}/day</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          <span>{roadmap.sections.length} sections</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    {roadmap.progress && (
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Progress
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {getProgressPercentage(roadmap)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${getProgressPercentage(roadmap)}%`,
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {roadmap.progress.completedQuestions} of{" "}
                            {roadmap.totalQuestions} completed
                          </span>
                          <span>
                            Day {roadmap.progress.currentDay} of{" "}
                            {roadmap.duration}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="p-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleStartRoadmap(roadmap.id)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 group-hover:scale-105"
                        >
                          <Play className="w-4 h-4" />
                          <span>{roadmap.progress ? "Continue" : "Start"}</span>
                        </button>

                        <button
                          onClick={() => handleViewRoadmap(roadmap.id)}
                          className="p-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Roadmap Option */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Want to Create Your Own Learning Path?
                </h2>
                <p className="text-purple-100 text-lg max-w-3xl mx-auto">
                  Build a completely customized learning plan tailored to your
                  specific goals, schedule, and interests. Choose from all
                  available sections and topics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={handleCustomRoadmapClick}
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-purple-600 hover:bg-purple-50 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Create Custom Roadmap</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => router.push("/my-plans")}
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Eye className="w-6 h-6" />
                    <span>View My Plans</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Not sure which to choose?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-center text-lg">
              Each practice mode is designed for different learning goals. You
              can always switch between them or try multiple approaches to find
              what works best for you.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Interview Prep
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Perfect if you&apos;re preparing for technical interviews or
                  want to practice with real company questions.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Hands-on Learning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Great for building practical skills, creating portfolio
                  projects, and learning through real-world applications.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Problem Solving
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ideal for improving logical thinking, algorithmic skills, and
                  tackling complex programming challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Sign-in Popup - Redirected to /auth page instead */}
    </div>
  );
}
