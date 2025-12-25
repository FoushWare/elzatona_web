"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  loadCart,
  removeFromCart,
  clearCart,
  CartItem,
} from "../../../lib/cart";
import { ShoppingCart, Trash2, CheckCircle2, BookOpen } from "lucide-react";
import { useLearningType } from "../../../../src/context/LearningTypeContext""";

export default function FreeStyleCartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [created, setCreated] = useState<string | null>(null);
  const [planName, setPlanName] = useState("My Custom Plan");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [questionsPerDay, setQuestionsPerDay] = useState<number>(0);
  const { setLearningType } = useLearningType();

  useEffect(() => {
    const loaded = loadCart();
    setItems(loaded);
    // default questions per day from current selection
    if (loaded.length > 0) {
      setQuestionsPerDay(Math.max(1, Math.floor(loaded.length / durationDays)));
    }
    // ensure we are in custom mode for this page
    setLearningType("custom");
  }, [durationDays, setLearningType]);

  useEffect(() => {
    // recompute questionsPerDay when items change
    if (items.length > 0) {
      setQuestionsPerDay((prev) =>
        prev > 0 ? prev : Math.max(1, Math.floor(items.length / durationDays)),
      );
    }
  }, [items, durationDays]);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setItems(loadCart());
  };

  const handleCreatePlan = () => {
    if (items.length === 0) return;
    try {
      const planId = `custom-plan-${Date.now()}`;
      const entry = {
        id: planId,
        name: planName || "My Custom Plan",
        createdAt: Date.now(),
        questionIds: items.map((i) => i.id),
        durationDays,
        questionsPerDay,
        totalQuestions: items.length,
        type: "custom" as const,
      };
      const raw = localStorage.getItem("my-custom-plans:v1");
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(entry);
      localStorage.setItem("my-custom-plans:v1", JSON.stringify(list));
      clearCart();
      setItems([]);
      setCreated(planId);
    } catch (_) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Selection
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Review chosen questions and create your personal plan.
          </p>
        </div>

        {created && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Plan created! You can find it later in your dashboard.</span>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No questions added yet. Browse Free Style paths to add questions.
            <div className="mt-4">
              <Link
                href="/free-style"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
              >
                Explore Free Style
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Plan settings */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-white/30 dark:border-gray-700/30 shadow mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Plan Name
                  </label>
                  <input
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                    placeholder="My Custom Plan"
                    data-testid="plan-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={durationDays}
                    onChange={(e) =>
                      setDurationDays(
                        Math.max(1, Math.min(60, Number(e.target.value) || 1)),
                      )
                    }
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                    data-testid="duration-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Questions per day
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, items.length)}
                    value={questionsPerDay}
                    onChange={(e) =>
                      setQuestionsPerDay(
                        Math.max(
                          1,
                          Math.min(items.length, Number(e.target.value) || 1),
                        ),
                      )
                    }
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                    data-testid="questions-per-day-input"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Total questions: {items.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-5 border border-white/30 dark:border-gray-700/30 shadow"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {item.section || "General"}{" "}
                        {item.difficulty ? `• ${item.difficulty}` : ""}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.question}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Remove from Selection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/free-style"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-white"
              >
                <BookOpen className="w-4 h-4" />
                Continue Browsing
              </Link>

              <button
                onClick={handleCreatePlan}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-xl font-semibold shadow hover:shadow-md"
                data-testid="create-plan-button"
              >
                Create Plan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
