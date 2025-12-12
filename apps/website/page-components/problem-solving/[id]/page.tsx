"use client";

import React, { useState, useEffect } from "react";
// Note: This page uses hooks/API routes, not direct supabase client

import { useParams, useRouter } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  _CheckCircle as _CheckCircle,
  _XCircle as _XCircle,
  _Clock as _Clock,
  Code,
  Lightbulb,
  Eye,
  EyeOff,
} from "lucide-react";
import { ProblemSolvingTask } from "@/types/admin";
import { ClientCodeRunner } from "@elzatona/components";

export default function ProblemSolvingTaskPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<ProblemSolvingTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCode, setUserCode] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [_activeTab, _setActiveTab] = useState<"problem" | "solution">(
    "problem",
  );
  const [isDark, setIsDark] = useState(false);

  // Theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      setIsDark(mediaQuery.matches);
    };

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, []);

  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/admin/problem-solving/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setTask(data.data);
          setUserCode(data.data.starterCode);
          setError(null);
        } else {
          setError(data.error || "Failed to fetch task");
        }
      } catch (err) {
        setError("Failed to fetch task");
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchTask();
    }
  }, [params?.id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "hard":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "🟢";
      case "medium":
        return "🟡";
      case "hard":
        return "🔴";
      default:
        return "⚪";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Problem Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "The requested problem could not be found."}
          </p>
          <button
            onClick={() => router.push("/problem-solving")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Problems
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b transition-colors duration-300 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/problem-solving")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Problems
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getDifficultyIcon(task.difficulty)}
                </span>
                <div>
                  <h1
                    className={`text-xl font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full text-white ${getDifficultyColor(task.difficulty)}`}
                    >
                      {task.difficulty.charAt(0).toUpperCase() +
                        task.difficulty.slice(1)}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setUserCode(task.starterCode)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Code
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  showSolution
                    ? isDark
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {showSolution ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showSolution ? "Hide Solution" : "Show Solution"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div
            className={`rounded-lg border transition-colors duration-300 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-blue-600" />
                <h2
                  className={`text-lg font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Problem Description
                </h2>
              </div>

              <div
                className={`prose prose-sm max-w-none ${
                  isDark ? "prose-invert" : ""
                }`}
              >
                <p
                  className={`mb-4 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {task.description}
                </p>
              </div>

              {/* Examples */}
              {task.examples && task.examples.length > 0 && (
                <div className="mt-6">
                  <h3
                    className={`text-md font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Examples
                  </h3>
                  <div className="space-y-3">
                    {task.examples.map((example, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          isDark
                            ? "bg-gray-700 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-sm">
                          <div className="mb-2">
                            <span
                              className={`font-medium ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Example {index + 1}:
                            </span>
                          </div>
                          <div className="mb-1">
                            <span
                              className={`font-medium ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Input:{" "}
                            </span>
                            <span
                              className={`font-mono ${
                                isDark ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {example.input}
                            </span>
                          </div>
                          <div className="mb-1">
                            <span
                              className={`font-medium ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              Output:{" "}
                            </span>
                            <span
                              className={`font-mono ${
                                isDark ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {example.output}
                            </span>
                          </div>
                          {example.explanation && (
                            <div>
                              <span
                                className={`font-medium ${
                                  isDark ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                Explanation:{" "}
                              </span>
                              <span
                                className={`${
                                  isDark ? "text-gray-200" : "text-gray-800"
                                }`}
                              >
                                {example.explanation}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {task.constraints && task.constraints.length > 0 && (
                <div className="mt-6">
                  <h3
                    className={`text-md font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Constraints
                  </h3>
                  <ul
                    className={`space-y-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {task.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-500 mt-1">•</span>
                        <span className="text-sm">{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div className="mt-6">
                  <h3
                    className={`text-md font-semibold mb-3 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDark
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor and Test Runner */}
          <div
            className={`rounded-lg border transition-colors duration-300 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-green-600" />
                  <h2
                    className={`text-lg font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Code Editor
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Function: {task.functionName}</span>
                </div>
              </div>

              {/* Code Editor */}
              <div className="mb-6">
                <Editor
                  height="400px"
                  language="javascript"
                  theme={isDark ? "vs-dark" : "vs-light"}
                  value={showSolution ? task.solution : userCode}
                  onChange={(value) => {
                    if (!showSolution) {
                      setUserCode(value || "");
                    }
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: "on",
                    readOnly: showSolution,
                  }}
                />
              </div>

              {/* Test Runner */}
              <div>
                <h3
                  className={`text-md font-semibold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Test Runner
                </h3>
                <ClientCodeRunner
                  functionName={task.functionName}
                  userCode={showSolution ? task.solution : userCode}
                  testCases={task.testCases}
                />
              </div>

              {/* Hints */}
              {task.tags && task.tags.includes("hint") && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    <h3
                      className={`text-md font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Hints
                    </h3>
                  </div>
                  <div
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-yellow-900/20 border-yellow-700"
                        : "bg-yellow-50 border-yellow-200"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isDark ? "text-yellow-200" : "text-yellow-800"
                      }`}
                    >
                      💡 Think about the problem constraints and try to optimize
                      your solution step by step.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
