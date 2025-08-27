"use client";

import { useState } from "react";
import Link from "next/link";

interface PracticeProblem {
  id: number;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function SystemDesignPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: "Autocomplete System Design",
      description: "Designing a scalable autocomplete system",
      scenario:
        "You need to design an autocomplete system for a search engine that handles millions of users and provides instant suggestions as users type.",
      question:
        "What is the most important consideration for the autocomplete system?",
      options: [
        "Data storage efficiency",
        "Response time (latency)",
        "Cost optimization",
        "Data accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "Response time (latency) is the most important consideration for autocomplete. Users expect instant feedback as they type, typically within 100-200ms. This requires efficient data structures and caching strategies.",
    },
    {
      id: 2,
      title: "Data Structure Choice",
      description: "Choosing the right data structure for autocomplete",
      scenario:
        "You need to store millions of search terms and provide fast prefix matching for autocomplete suggestions.",
      question:
        "Which data structure would be most efficient for prefix matching?",
      options: [
        "Hash table",
        "Binary search tree",
        "Trie (prefix tree)",
        "Linked list",
      ],
      correctAnswer: 2,
      explanation:
        "A Trie (prefix tree) is the most efficient data structure for prefix matching. It allows O(k) time complexity for prefix searches where k is the length of the prefix, making it ideal for autocomplete systems.",
    },
    {
      id: 3,
      title: "Caching Strategy",
      description: "Implementing effective caching for autocomplete",
      scenario:
        "Your autocomplete system receives thousands of requests per second and you need to minimize database load.",
      question: "What caching strategy would be most effective?",
      options: [
        "Cache only the most popular queries",
        "Cache all possible prefixes",
        "Use LRU cache with size limit",
        "No caching needed",
      ],
      correctAnswer: 2,
      explanation:
        "Using an LRU (Least Recently Used) cache with a size limit is most effective. It keeps frequently accessed suggestions in memory while automatically removing less popular ones, balancing memory usage and performance.",
    },
    {
      id: 4,
      title: "Scalability Considerations",
      description: "Scaling the autocomplete system",
      scenario:
        "Your autocomplete system needs to handle 10 million daily active users with peak traffic of 100,000 requests per second.",
      question: "What is the primary scaling challenge?",
      options: [
        "Database storage",
        "Network bandwidth",
        "Memory usage",
        "CPU processing",
      ],
      correctAnswer: 2,
      explanation:
        "Memory usage is the primary scaling challenge. Autocomplete systems need to keep large datasets in memory for fast access. With millions of search terms, the memory footprint can be substantial, requiring careful optimization.",
    },
    {
      id: 5,
      title: "Load Balancing",
      description: "Distributing autocomplete requests",
      scenario:
        "You have multiple autocomplete servers and need to distribute incoming requests efficiently.",
      question: "Which load balancing strategy would work best?",
      options: [
        "Round-robin",
        "Least connections",
        "IP hash",
        "Weighted round-robin",
      ],
      correctAnswer: 0,
      explanation:
        "Round-robin load balancing works best for autocomplete systems because requests are stateless and have similar processing requirements. It provides even distribution and is simple to implement and maintain.",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextProblem = () => {
    if (selectedAnswer === problems[currentProblem].correctAnswer) {
      setScore(score + 1);
    }

    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer(null);
    } else {
      setPracticeCompleted(true);
    }
  };

  const handleRetakePractice = () => {
    setCurrentProblem(0);
    setSelectedAnswer(null);
    setScore(0);
    setPracticeCompleted(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / problems.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80)
      return "Excellent! You have a strong understanding of system design.";
    if (percentage >= 60)
      return "Good job! You understand the basics of system design.";
    if (percentage >= 40) return "Not bad! Review the concepts and try again.";
    return "Keep practicing! System design can be complex at first.";
  };

  if (practiceCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Complete!
            </h1>

            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{problems.length}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {getScorePercentage()}%
              </div>
              <p className="text-gray-600">{getScoreMessage()}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleRetakePractice}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Retake Practice
              </button>
              <div>
                <Link
                  href="/study-plans/one-week-intensive"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Study Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentP = problems[currentProblem];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link
                href="/study-plans/one-week-intensive"
                className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
              >
                ← Back to Study Plan
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                System Design Practice
              </h1>
              <p className="text-gray-600">
                Practice your understanding of system design principles
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {currentProblem + 1}/{problems.length}
              </div>
              <div className="text-sm text-gray-500">Problem</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentProblem + 1) / problems.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Problem */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentP.title}
            </h2>
            <p className="text-gray-600 mb-4">{currentP.description}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Scenario:</h3>
              <p className="text-blue-800">{currentP.scenario}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Question:</h3>
              <p className="text-gray-800">{currentP.question}</p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentP.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? selectedAnswer === currentP.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? selectedAnswer === currentP.correctAnswer
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswer === index &&
                      (selectedAnswer === currentP.correctAnswer ? "✓" : "✗")}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {selectedAnswer !== null && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation</h3>
              <p className="text-blue-800">{currentP.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div className="text-center">
              <button
                onClick={handleNextProblem}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {currentProblem < problems.length - 1
                  ? "Next Problem"
                  : "Finish Practice"}
              </button>
            </div>
          )}
        </div>

        {/* Study Resources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Study Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Key Concepts</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Scalability</li>
                <li>• Performance optimization</li>
                <li>• Data structures</li>
                <li>• Caching strategies</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/user-interface/layout"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → CSS Layout Practice
                </Link>
                <Link
                  href="/questions/javascript/closure"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → JavaScript Practice
                </Link>
                <Link
                  href="/internal-resources"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Internal Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
