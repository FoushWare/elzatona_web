'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function PromisesPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Basic Promise Creation',
      description: 'Understanding how to create and use promises',
      code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

promise.then(result => {
  console.log(result);
});`,
      question: 'What will be logged to the console?',
      options: ['Success!', 'undefined', 'Error', 'Nothing'],
      correctAnswer: 0,
      explanation:
        "The promise resolves with 'Success!' after 1 second, and the .then() callback logs this value to the console.",
    },
    {
      id: 2,
      title: 'Promise Chaining',
      description: 'Understanding promise chaining and data flow',
      code: `Promise.resolve(5)
  .then(x => x * 2)
  .then(x => x + 3)
  .then(x => console.log(x));`,
      question: 'What will be logged to the console?',
      options: ['5', '10', '13', '15'],
      correctAnswer: 2,
      explanation:
        'The promise chain: 5 → 5*2=10 → 10+3=13. The final value 13 is logged to the console.',
    },
    {
      id: 3,
      title: 'Promise Error Handling',
      description: 'Understanding how to handle promise rejections',
      code: `Promise.reject("Error occurred")
  .then(result => console.log("Success:", result))
  .catch(error => console.log("Caught:", error));`,
      question: 'What will be logged to the console?',
      options: [
        'Success: Error occurred',
        'Caught: Error occurred',
        'Nothing',
        'Error',
      ],
      correctAnswer: 1,
      explanation:
        "Since the promise is rejected, the .then() is skipped and the .catch() handles the error, logging 'Caught: Error occurred'.",
    },
    {
      id: 4,
      title: 'Async/Await Basics',
      description: 'Understanding async/await syntax',
      code: `async function getData() {
  return "Hello World";
}

async function main() {
  const result = await getData();
  console.log(result);
}

main();`,
      question: 'What will be logged to the console?',
      options: ['Hello World', 'Promise { <pending> }', 'undefined', 'Error'],
      correctAnswer: 0,
      explanation:
        "The async function getData() returns 'Hello World', which is awaited in main() and then logged to the console.",
    },
    {
      id: 5,
      title: 'Promise.all() Usage',
      description: 'Understanding Promise.all() for parallel execution',
      code: `const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 2000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values));`,
      question: 'What will be logged to the console after 2 seconds?',
      options: ["[3, 'foo', 42]", "[3, 42, 'foo']", "['foo', 3, 42]", 'Error'],
      correctAnswer: 0,
      explanation:
        'Promise.all() waits for all promises to resolve and returns an array with the resolved values in the same order as the input promises.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      if (answerIndex === problems[currentProblem].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextProblem = () => {
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
      return 'Excellent! You have a strong understanding of promises.';
    if (percentage >= 60)
      return 'Good job! You understand the basics of promises.';
    if (percentage >= 40) return 'Not bad! Review the concepts and try again.';
    return 'Keep practicing! Promises can be tricky at first.';
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
                  className="text-blue-600 hover:text-blue-800"
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href="/study-plans/one-week-intensive"
              className="text-blue-600 hover:text-blue-800 mb-2 inline-block"
            >
              ← Back to Study Plan
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              JavaScript Promises Practice
            </h1>
            <p className="text-gray-600">
              Practice your understanding of promises in JavaScript
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
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentProblem + 1) / problems.length) * 100}%`,
            }}
          ></div>
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
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index
                    ? selectedAnswer === currentP.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswer === index
                        ? selectedAnswer === currentP.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === index &&
                      (selectedAnswer === currentP.correctAnswer ? '✓' : '✗')}
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
                  ? 'Next Problem'
                  : 'Finish Practice'}
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
              <div className="space-y-2">
                <div className="text-sm text-gray-600">• Promise States</div>
                <div className="text-sm text-gray-600">
                  • .then() and .catch()
                </div>
                <div className="text-sm text-gray-600">• Promise Chaining</div>
                <div className="text-sm text-gray-600">• Async/Await</div>
                <div className="text-sm text-gray-600">• Error Handling</div>
              </div>
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
