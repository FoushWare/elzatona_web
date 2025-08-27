"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Question,
  sampleQuestions,
  getDifficultyColor,
  getDifficultyBgColor,
} from "@/lib/questions";

export default function QuestionDetailPage() {
  const params = useParams();
  const questionId = params.id as string;
  const [question, setQuestion] = useState<Question | null>(null);
  const [activeTab, setActiveTab] = useState<
    "problem" | "solution" | "submissions" | "discussion"
  >("problem");
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");

  useEffect(() => {
    const foundQuestion = sampleQuestions.find((q) => q.id === questionId);
    if (foundQuestion) {
      setQuestion(foundQuestion);
      setCode(getInitialCode(foundQuestion));
    }
  }, [questionId]);

  const getInitialCode = (question: Question) => {
    switch (question.subCategory) {
      case "javascript-functions":
        return `// ${question.title}\nfunction solution() {\n  // Your code here\n  \n}`;
      case "user-interface":
        return `// ${question.title}\nfunction Component() {\n  // Your React component here\n  \n}`;
      case "css-layouts":
        return `/* ${question.title} */\n.container {\n  /* Your CSS here */\n}`;
      default:
        return `// ${question.title}\n// Your code here\n`;
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Question not found</h1>
          <p className="text-gray-400 mb-6">
            The question you're looking for doesn't exist.
          </p>
          <Link
            href="/questions"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/questions"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{question.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBgColor(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty}
                  </span>
                  <span>{question.estimatedTime} min</span>
                  <span>
                    {question.completionCount.toLocaleString()} completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Problem Description */}
          <div>
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Problem Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {question.description}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-medium text-gray-200 mb-2">
                    Sub-category
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                    {question.subCategory
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>

                <div>
                  <h3 className="font-medium text-gray-200 mb-2">Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {question.frameworks.map((framework, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-200 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor and Tabs */}
          <div>
            {/* Tabs */}
            <div className="flex space-x-1 mb-4">
              {["problem", "solution", "submissions", "discussion"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(
                        tab as
                          | "problem"
                          | "solution"
                          | "submissions"
                          | "discussion"
                      )
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-800 rounded-lg p-6">
              {activeTab === "problem" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Code Editor</h3>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-gray-300"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="jsx">JSX</option>
                      <option value="css">CSS</option>
                      <option value="html">HTML</option>
                    </select>
                  </div>

                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your code here..."
                  />

                  <div className="flex space-x-3 mt-4">
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Run Code
                    </button>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Solution</h3>
                  {question.hasSolution ? (
                    <div className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-200 mb-2">
                          Sample Solution
                        </h4>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{getInitialCode(question)}</code>
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200 mb-2">
                          Explanation
                        </h4>
                        <p className="text-gray-300">
                          This is a sample solution for the "{question.title}"
                          problem. The solution demonstrates the key concepts
                          and implementation approach.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🔒</div>
                      <h3 className="text-lg font-medium text-gray-200 mb-2">
                        Premium Content
                      </h3>
                      <p className="text-gray-400 mb-4">
                        This solution is available for premium users.
                      </p>
                      <button className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                        Upgrade to Premium
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "submissions" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Submissions</h3>
                  <div className="text-center py-8 text-gray-400">
                    <p>No submissions yet.</p>
                  </div>
                </div>
              )}

              {activeTab === "discussion" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Discussion</h3>
                  <div className="text-center py-8 text-gray-400">
                    <p>No discussion yet.</p>
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
