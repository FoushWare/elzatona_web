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

export default function ClosurePracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: "Basic Closure",
      description:
        "Understanding how closures capture variables from their outer scope",
      code: `function outer() {
  let count = 0;
  
  function inner() {
    count++;
    return count;
  }
  
  return inner;
}

const counter = outer();
console.log(counter()); // What will this output?
console.log(counter()); // What will this output?`,
      question: "What will be the output of the above code?",
      options: ["1, 2", "0, 1", "1, 1", "undefined, undefined"],
      correctAnswer: 0,
      explanation:
        "The output will be '1, 2'. The inner function forms a closure that captures the 'count' variable from its outer scope. Each time counter() is called, it increments and returns the current value of count.",
    },
    {
      id: 2,
      title: "Closure with Parameters",
      description: "Closures can capture parameters from their outer function",
      code: `function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // What will this output?
console.log(triple(5)); // What will this output?`,
      question: "What will be the output of the above code?",
      options: ["10, 15", "5, 5", "2, 3", "Error"],
      correctAnswer: 0,
      explanation:
        "The output will be '10, 15'. Each closure captures the 'factor' parameter from its outer function. double(5) returns 5 * 2 = 10, and triple(5) returns 5 * 3 = 15.",
    },
    {
      id: 3,
      title: "Closure in Loop",
      description: "Common pitfall with closures in loops",
      code: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// What will be the output after 1 second?`,
      question: "What will be the output after 1 second?",
      options: [
        "0, 1, 2",
        "3, 3, 3",
        "undefined, undefined, undefined",
        "Error",
      ],
      correctAnswer: 1,
      explanation:
        "The output will be '3, 3, 3'. This is because var is function-scoped, and by the time the setTimeout callbacks execute, the loop has finished and i equals 3. All closures capture the same variable reference.",
    },
    {
      id: 4,
      title: "Closure with let",
      description: "Using let to fix the loop closure issue",
      code: `for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// What will be the output after 1 second?`,
      question: "What will be the output after 1 second?",
      options: [
        "0, 1, 2",
        "3, 3, 3",
        "undefined, undefined, undefined",
        "Error",
      ],
      correctAnswer: 0,
      explanation:
        "The output will be '0, 1, 2'. Using let creates block-scoped variables, so each iteration gets its own 'i' variable. Each closure captures the correct value of i for that iteration.",
    },
    {
      id: 5,
      title: "Module Pattern",
      description: "Using closures to create private variables",
      code: `const counter = (function() {
  let privateCounter = 0;
  
  function changeBy(val) {
    privateCounter += val;
  }
  
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

counter.increment();
counter.increment();
console.log(counter.value()); // What will this output?`,
      question: "What will be the output of the above code?",
      options: ["0", "1", "2", "undefined"],
      correctAnswer: 2,
      explanation:
        "The output will be '2'. This is the module pattern where privateCounter is private and can only be accessed through the returned object's methods. Two increments result in a value of 2.",
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
      return "Excellent! You have a strong understanding of closures.";
    if (percentage >= 60)
      return "Good job! You understand the basics of closures.";
    if (percentage >= 40) return "Not bad! Review the concepts and try again.";
    return "Keep practicing! Closures can be tricky at first.";
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
                JavaScript Closures Practice
              </h1>
              <p className="text-gray-600">
                Practice your understanding of closures in JavaScript
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
                  <span className="text-gray-900 font-mono">{option}</span>
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
                <li>• Lexical scope</li>
                <li>• Variable capture</li>
                <li>• Module pattern</li>
                <li>• Loop closures</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/quiz/explain-hoisting"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Hoisting Quiz
                </Link>
                <Link
                  href="/questions/react/hooks"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React Hooks Practice
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
