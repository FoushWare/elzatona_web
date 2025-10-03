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

export default function GridFlexboxPracticePage() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const problems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Flexbox Basics',
      description: 'Understanding flexbox container properties',
      code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.item {
  width: 100px;
  height: 50px;
}`,
      question: 'How will the items be arranged in this flexbox container?',
      options: [
        'Horizontally centered, vertically centered',
        'Vertically stacked, horizontally centered',
        'Horizontally stacked, vertically centered',
        'Vertically stacked, left-aligned',
      ],
      correctAnswer: 1,
      explanation:
        'flex-direction: column makes items stack vertically, justify-content: center centers them horizontally, and align-items: center centers them vertically within their space.',
    },
    {
      id: 2,
      title: 'Flexbox Order',
      description: 'Understanding flexbox order property',
      code: `.item1 { order: 3; }
.item2 { order: 1; }
.item3 { order: 2; }

<div class="container">
  <div class="item1">First</div>
  <div class="item2">Second</div>
  <div class="item3">Third</div>
</div>`,
      question: 'What will be the visual order of the items?',
      options: [
        'First, Second, Third',
        'Second, Third, First',
        'Third, First, Second',
        'Second, First, Third',
      ],
      correctAnswer: 1,
      explanation:
        'The order property controls the visual order. Lower values appear first, so order: 1 (Second) comes first, then order: 2 (Third), then order: 3 (First).',
    },
    {
      id: 3,
      title: 'CSS Grid Basics',
      description: 'Understanding CSS Grid container setup',
      code: `.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 10px;
}`,
      question: 'How many columns and rows will this grid have?',
      options: [
        '3 columns, 2 rows',
        '2 columns, 3 rows',
        '3 columns, 3 rows',
        '2 columns, 2 rows',
      ],
      correctAnswer: 0,
      explanation:
        'grid-template-columns defines 3 columns (1fr 2fr 1fr), and grid-template-rows defines 2 rows (100px 200px).',
    },
    {
      id: 4,
      title: 'Grid Areas',
      description: 'Understanding CSS Grid areas',
      code: `.grid-container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
      question: 'How many grid areas are defined in this layout?',
      options: ['3 areas', '4 areas', '5 areas', '6 areas'],
      correctAnswer: 1,
      explanation:
        'There are 4 distinct grid areas: header, sidebar, main, and footer. The header and footer span multiple columns but are single areas.',
    },
    {
      id: 5,
      title: 'Responsive Grid',
      description: 'Understanding responsive grid layouts',
      code: `.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}`,
      question: 'What happens when the screen width changes?',
      options: [
        'Grid items stay the same size',
        'Grid items automatically resize to fit',
        'Number of columns automatically adjusts',
        'Grid becomes a single column',
      ],
      correctAnswer: 2,
      explanation:
        'auto-fit with minmax() automatically adjusts the number of columns based on available space. Each column is minimum 200px wide and expands to fill available space.',
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
      return 'Excellent! You have a strong understanding of CSS Grid and Flexbox.';
    if (percentage >= 60)
      return 'Good job! You understand the basics of CSS Grid and Flexbox.';
    if (percentage >= 40) return 'Not bad! Review the concepts and try again.';
    return 'Keep practicing! CSS Grid and Flexbox can be complex at first.';
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
              CSS Grid & Flexbox Practice
            </h1>
            <p className="text-gray-600">
              Practice your understanding of CSS Grid and Flexbox
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
                <div className="text-sm text-gray-600">
                  • Flexbox Container Properties
                </div>
                <div className="text-sm text-gray-600">
                  • Flexbox Item Properties
                </div>
                <div className="text-sm text-gray-600">• CSS Grid Template</div>
                <div className="text-sm text-gray-600">• Grid Areas</div>
                <div className="text-sm text-gray-600">
                  • Responsive Layouts
                </div>
              </div>
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
                  href="/questions/react/hooks"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → React Hooks Practice
                </Link>
                <Link
                  href="/questions/javascript/promises"
                  className="block text-blue-600 hover:text-blue-800 text-sm"
                >
                  → Promises Practice
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
