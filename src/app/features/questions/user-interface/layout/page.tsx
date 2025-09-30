"use client";

import { useState } from "react";
import Link from "next/link";

interface PracticeProblem {
  id: number;
  title: string;
  description: string;
  code: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function CSSLayoutPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: "Flexbox Basics",
      description: "Understanding flexbox layout properties",
      code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.item {
  width: 100px;
  height: 50px;
  background: blue;
}`,
      question: "What will this CSS do to the layout?",
      options: [
        "Center the item horizontally and vertically",
        "Only center horizontally",
        "Only center vertically",
        "No centering effect",
      ],
      correctAnswer: 0,
      explanation:
        "This CSS will center the item both horizontally and vertically. justify-content: center centers horizontally, and align-items: center centers vertically within the flex container.",
    },
    {
      id: 2,
      title: "Grid Layout",
      description: "Understanding CSS Grid properties",
      code: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}`,
      question: "What does this grid layout create?",
      options: [
        "3 equal columns",
        "3 columns with middle column twice as wide",
        "2 columns with gap",
        "Single column layout",
      ],
      correctAnswer: 1,
      explanation:
        "This creates 3 columns where the middle column (2fr) is twice as wide as the side columns (1fr each). The gap property adds 20px spacing between grid items.",
    },
    {
      id: 3,
      title: "Responsive Design",
      description: "Understanding media queries",
      code: `@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}`,
      question: "When will this CSS take effect?",
      options: [
        "Always",
        "On screens wider than 768px",
        "On screens 768px or narrower",
        "Never",
      ],
      correctAnswer: 2,
      explanation:
        "This CSS will take effect on screens that are 768px wide or narrower. max-width: 768px means the styles apply when the viewport width is 768px or less.",
    },
    {
      id: 4,
      title: "Positioning",
      description: "Understanding CSS positioning",
      code: `.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}`,
      question: "Where will the child element be positioned?",
      options: [
        "Top-left corner",
        "Top-right corner",
        "Bottom-left corner",
        "Bottom-right corner",
      ],
      correctAnswer: 1,
      explanation:
        "The child will be positioned at the top-right corner of its parent. position: absolute with top: 0 and right: 0 positions it at the top-right corner relative to the nearest positioned ancestor.",
    },
    {
      id: 5,
      title: "Box Model",
      description: "Understanding CSS box model",
      code: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: border-box;
}`,
      question: "What is the total width of this element?",
      options: ["200px", "250px", "270px", "290px"],
      correctAnswer: 0,
      explanation:
        "The total width is 200px. With box-sizing: border-box, the width includes padding and border. Without it, the total width would be 200px + 40px padding + 10px border = 250px.",
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
      return "Excellent! You have a strong understanding of CSS layout.";
    if (percentage >= 60)
      return "Good job! You understand the basics of CSS layout.";
    if (percentage >= 40) return "Not bad! Review the concepts and try again.";
    return "Keep practicing! CSS layout can be tricky at first.";
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
                CSS Layout Practice
              </h1>
              <p className="text-gray-600">
                Practice your understanding of CSS layout techniques
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

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 overflow-x-auto">
              <pre className="text-sm">{currentP.code}</pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Question:</h3>
              <p className="text-blue-800">{currentP.question}</p>
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
                <li>• Flexbox layout</li>
                <li>• CSS Grid</li>
                <li>• Responsive design</li>
                <li>• Box model</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/react/hooks"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React Hooks Practice
                </Link>
                <Link
                  href="/questions/system-design/autocomplete"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → System Design Practice
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
