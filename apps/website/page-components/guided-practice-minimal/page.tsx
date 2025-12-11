"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MinimalGuidedPracticePage() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plan, setPlan] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams?.get("plan");

  useEffect(() => {
    const loadPlan = async () => {
      if (!planId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/guided-learning/plan-details/${planId}`,
        );
        const data = await response.json();

        if (data.success) {
          setPlan(data.data);
        }
      } catch (error) {
        console.error("Error loading plan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlan();
  }, [planId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
          <button
            onClick={() => router.push("/features/guided-learning")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{plan.name}</h1>
        <p className="text-lg mb-8">Total Questions: {plan.totalQuestions}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {plan.cards?.map((card: any) => (
            <div key={card.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{card.description}</p>
              <p className="text-blue-600 font-medium">
                {card.questionCount} questions
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/features/guided-learning")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Plans
          </button>
        </div>
      </div>
    </div>
  );
}
