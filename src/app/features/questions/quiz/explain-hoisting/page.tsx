'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function HoistingQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'What is hoisting in JavaScript?',
      options: [
        'Moving variables to the top of their scope during compilation',
        'Moving functions to the bottom of their scope',
        'A way to optimize code performance',
        'A method to prevent variable declaration',
      ],
      correctAnswer: 0,
      explanation:
        "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the compilation phase. This means that variable and function declarations are processed before any code is executed.",
    },
    {
      id: 2,
      question:
        'What will be the output of this code?\n\nconsole.log(x);\nvar x = 5;',
      options: ['5', 'undefined', 'ReferenceError', 'null'],
      correctAnswer: 1,
      explanation:
        "The output will be 'undefined'. This is because var declarations are hoisted, but the initialization is not. The code is interpreted as:\nvar x;\nconsole.log(x);\nx = 5;",
    },
    {
      id: 3,
      question: 'Which of the following is NOT hoisted?',
      options: [
        'var declarations',
        'function declarations',
        'let declarations',
        'const declarations',
      ],
      correctAnswer: 2,
      explanation:
        "let and const declarations are hoisted but not initialized. They are in the 'temporal dead zone' until the line where they are declared is reached. var and function declarations are fully hoisted.",
    },
    {
      id: 4,
      question:
        'What will be the output?\n\nfunction test() {\n  console.log(a);\n  let a = 10;\n}\ntest();',
      options: ['10', 'undefined', 'ReferenceError', 'null'],
      correctAnswer: 2,
      explanation:
        "This will throw a ReferenceError because let declarations are hoisted but not initialized. The variable 'a' is in the temporal dead zone until the line where it's declared.",
    },
    {
      id: 5,
      question: 'Which function declaration style is hoisted?',
      options: [
        'Function expressions',
        'Arrow functions',
        'Function declarations',
        'All of the above',
      ],
      correctAnswer: 2,
      explanation:
        'Only function declarations are hoisted. Function expressions and arrow functions are not hoisted because they are assigned to variables, and variable assignments are not hoisted.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);

    setScore(0);
    setQuizCompleted(false);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80)
      return 'Excellent! You have a strong understanding of hoisting.';
    if (percentage >= 60)
      return 'Good job! You understand the basics of hoisting.';
    if (percentage >= 40) return 'Not bad! Review the concepts and try again.';
    return 'Keep practicing! Hoisting can be tricky at first.';
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz Complete!
            </h1>

            <div className="mb-8">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {getScorePercentage()}%
              </div>
              <p className="text-gray-600">{getScoreMessage()}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleRetakeQuiz}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Retake Quiz
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

  const currentQ = questions[currentQuestion];

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
                JavaScript Hoisting Quiz
              </h1>
              <p className="text-gray-600">
                Test your understanding of hoisting in JavaScript
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {currentQuestion + 1}/{questions.length}
              </div>
              <div className="text-sm text-gray-500">Question</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Question {currentQ.id}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-800 whitespace-pre-line font-mono text-sm">
                {currentQ.question}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? selectedAnswer === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? selectedAnswer === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === index &&
                      (selectedAnswer === currentQ.correctAnswer ? '✓' : '✗')}
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
              <p className="text-blue-800 whitespace-pre-line">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {currentQuestion < questions.length - 1
                  ? 'Next Question'
                  : 'Finish Quiz'}
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
                <li>• Variable hoisting (var, let, const)</li>
                <li>• Function hoisting</li>
                <li>• Temporal Dead Zone</li>
                <li>• Execution context</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Practice More
              </h4>
              <div className="space-y-2">
                <Link
                  href="/questions/javascript/closure"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Closures Practice
                </Link>
                <Link
                  href="/internal-resources"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Internal Resources
                </Link>
                <Link
                  href="/questions"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → All Practice Questions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
