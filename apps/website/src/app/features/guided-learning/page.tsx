"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, Target, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@elzatona/components";

interface LearningPlan {
  id: string;
  name: string;
  description?: string;
  duration?: number;
  questionCount?: number;
  category?: string;
  learningPath?: string;
}

export default function GuidedLearningPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<LearningPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true);
        const response = await fetch("/api/guided-learning/plans");
        const data = await response.json();

        if (data.success && data.data) {
          // If we have plans, use them; otherwise create default 1-7 day plans
          if (Array.isArray(data.data) && data.data.length > 0) {
            setPlans(data.data);
          } else {
            // Create default plans if none exist
            const defaultPlans: LearningPlan[] = Array.from(
              { length: 7 },
              (_, i) => ({
                id: `plan-${i + 1}`,
                name: `${i + 1} Day Plan`,
                description: `A structured ${i + 1}-day learning plan to master frontend development`,
                duration: i + 1,
              }),
            );
            setPlans(defaultPlans);
          }
        } else {
          // Fallback to default plans
          const defaultPlans: LearningPlan[] = Array.from(
            { length: 7 },
            (_, i) => ({
              id: `plan-${i + 1}`,
              name: `${i + 1} Day Plan`,
              description: `A structured ${i + 1}-day learning plan to master frontend development`,
              duration: i + 1,
            }),
          );
          setPlans(defaultPlans);
        }
      } catch (err) {
        console.error("Error fetching learning plans:", err);
        setError("Failed to load learning plans");
        // Fallback to default plans even on error
        const defaultPlans: LearningPlan[] = Array.from(
          { length: 7 },
          (_, i) => ({
            id: `plan-${i + 1}`,
            name: `${i + 1} Day Plan`,
            description: `A structured ${i + 1}-day learning plan to master frontend development`,
            duration: i + 1,
          }),
        );
        setPlans(defaultPlans);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  const handlePlanClick = (planId: string) => {
    router.push(`/features/guided-learning/${planId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading learning plans...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Guided Learning Plans
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose a structured learning plan designed to help you master
            frontend development step by step
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handlePlanClick(plan.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  {plan.duration && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {plan.duration} {plan.duration === 1 ? "Day" : "Days"}
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                {plan.description && (
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {plan.questionCount && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.questionCount} questions
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
