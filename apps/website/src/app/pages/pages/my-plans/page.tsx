"use client";

import React, { useState, useEffect } from "react";
// Note: This page uses API routes, not direct supabase client

import { useRouter } from "next/navigation";

import { SignInPopup } from "@elzatona/components";
import {
  Play,
  Edit,
  Trash2,
  Calendar,
  Target,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
  Loader2,
  AlertCircle,
  BookOpen,
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

export default function MyPlansPage() {
  const router = useRouter();
  const [isAuthenticated, _setIsAuthenticated] = useState(false);
  const [_user, _setUser] = useState(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [plans, setPlans] = useState<CustomPlan[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setShowSignInPopup(true);
      return;
    }

    loadPlans();
  }, [isAuthenticated]);

  const loadPlans = async () => {
    setIsLoading(true);
    // Simulate loading from Firebase
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Load from localStorage for now (in real app, load from Firebase)
    const savedPlans = localStorage.getItem("userPlans");
    if (savedPlans) {
      try {
        const parsedPlans = JSON.parse(savedPlans);
        setPlans(parsedPlans);
      } catch (error) {
        console.error("Error parsing saved plans:", error);
        setPlans([]);
      }
    } else {
      setPlans([]);
    }

    setIsLoading(false);
  };

  const handleStartPlan = (plan_id: string) => {
    // Set as active plan and redirect to practice
    localStorage.setItem("active-custom-plan", plan_id);
    router.push(`/custom-practice/${plan_id}`);
  };

  const handleEditPlan = (plan_id: string) => {
    // Redirect to edit mode
    router.push(`/custom-roadmap?edit=${plan_id}`);
  };

  const handleDeletePlan = async (plan_id: string) => {
    const updatedPlans = plans.filter((plan) => plan.id !== plan_id);
    setPlans(updatedPlans);
    localStorage.setItem("userPlans", JSON.stringify(updatedPlans));
    setShowDeleteConfirm(null);
  };

  const handleCreateNew = () => {
    router.push("/custom-roadmap");
  };

  const handleSignInSuccess = () => {
    setShowSignInPopup(false);
    loadPlans();
  };

  const handleSignInSkip = () => {
    setShowSignInPopup(false);
    router.push("/browse-practice-questions");
  };

  const handleSignInClose = () => {
    setShowSignInPopup(false);
    router.push("/browse-practice-questions");
  };

  const getProgressPercentage = (plan: CustomPlan) => {
    if (!plan.progress) return 0;
    return Math.round(
      (plan.progress.completedQuestions / plan.totalQuestions) * 100,
    );
  };

  const _getDaysRemaining = (plan: CustomPlan) => {
    if (!plan.progress) return plan.duration;
    return Math.max(0, plan.duration - plan.progress.currentDay);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading your plans...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 rounded-3xl blur-3xl opacity-20 scale-110" />
            <div className="relative w-24 h-24 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <BookOpen className="w-12 h-12 text-white" />
              <div
                className="absolute inset-0 rounded-3xl border-4 border-white/20 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            My Learning Plans
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            Manage your custom learning plans and track your progress. Start,
            edit, or create new plans tailored to your learning goals.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {plans.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Plans
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {plans.filter((p) => p.isActive).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Active
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plans.reduce((sum, plan) => sum + plan.totalQuestions, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Questions
              </div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {plans.reduce(
                  (sum, plan) => sum + (plan.progress?.completedQuestions || 0),
                  0,
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </div>
          </div>
        </div>

        {/* Create New Plan Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-6 h-6" />
            <span>Create New Plan</span>
          </button>
        </div>

        {/* Plans Grid */}
        {plans.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No plans yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Create your first custom learning plan to get started with
              personalized study sessions.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Plan</span>
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Plan Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                    {plan.isActive && (
                      <div className="ml-4">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Plan Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{plan.duration} days</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Target className="w-4 h-4" />
                      <span>{plan.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{plan.dailyQuestions}/day</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      <span>{plan.sections.length} sections</span>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                {plan.progress && (
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {getProgressPercentage(plan)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(plan)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        {plan.progress.completedQuestions} of{" "}
                        {plan.totalQuestions} completed
                      </span>
                      <span>
                        Day {plan.progress.currentDay} of {plan.duration}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStartPlan(plan.id)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 group-hover:scale-105"
                    >
                      <Play className="w-4 h-4" />
                      <span>{plan.progress ? "Continue" : "Start"}</span>
                    </button>

                    <button
                      onClick={() => handleEditPlan(plan.id)}
                      className="p-3 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors"
                      title="Edit Plan"
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(plan.id)}
                      className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Go Back</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Plan
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this plan? This action cannot be
              undone and you&apos;ll lose all progress.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePlan(showDeleteConfirm)}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign-in Popup */}
      {showSignInPopup && (
        <SignInPopup
          isOpen={showSignInPopup}
          onClose={handleSignInClose}
          onSuccess={handleSignInSuccess}
        />
      )}
    </div>
  );
}
