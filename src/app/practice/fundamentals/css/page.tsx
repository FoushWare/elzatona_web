'use client';

import { useState } from 'react';
import Link from 'next/link';

const cssQuestions = [
  {
    id: 1,
    question: 'Explain the CSS Box Model and its components.',
    answer:
      'The CSS Box Model consists of content, padding, border, and margin. Content is the actual content area, padding is the space between content and border, border is the visible boundary, and margin is the space outside the border.',
    category: 'Box Model',
    difficulty: 'Beginner',
  },
  {
    id: 2,
    question: 'What is the difference between margin and padding?',
    answer:
      "Margin is the space outside an element's border, while padding is the space between the element's content and its border. Margin affects the element's position relative to other elements, while padding affects the internal spacing.",
    category: 'Spacing',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    question: 'Explain CSS specificity and how it works.',
    answer:
      "CSS specificity determines which styles are applied when multiple rules target the same element. It's calculated based on selector types: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), and elements/pseudo-elements (1).",
    category: 'Specificity',
    difficulty: 'Intermediate',
  },
  {
    id: 4,
    question: 'What are CSS Flexbox and Grid? When would you use each?',
    answer:
      'Flexbox is for 1D layouts (rows or columns), great for navigation, forms, and simple layouts. Grid is for 2D layouts (rows and columns), perfect for page layouts, card grids, and complex arrangements.',
    category: 'Layout',
    difficulty: 'Intermediate',
  },
  {
    id: 5,
    question: 'How do you center an element horizontally and vertically?',
    answer:
      'Using Flexbox: display: flex, justify-content: center, align-items: center. Using Grid: display: grid, place-items: center. Using absolute positioning: position: absolute, top: 50%, left: 50%, transform: translate(-50%, -50%).',
    category: 'Layout',
    difficulty: 'Beginner',
  },
  {
    id: 6,
    question: 'What are CSS pseudo-classes and pseudo-elements?',
    answer:
      "Pseudo-classes (like :hover, :focus, :nth-child) select elements based on their state or position. Pseudo-elements (like ::before, ::after, ::first-line) create virtual elements that don't exist in the DOM.",
    category: 'Selectors',
    difficulty: 'Intermediate',
  },
  {
    id: 7,
    question: 'Explain CSS units: px, em, rem, %, vh, vw.',
    answer:
      'px is absolute, em is relative to parent font-size, rem is relative to root font-size, % is relative to parent, vh/vw are viewport height/width percentages.',
    category: 'Units',
    difficulty: 'Beginner',
  },
  {
    id: 8,
    question: 'What is the CSS cascade and inheritance?',
    answer:
      'The cascade determines which styles apply when multiple rules exist. Inheritance allows child elements to inherit certain properties from their parents. Not all properties are inherited (like border, margin, padding).',
    category: 'Cascade',
    difficulty: 'Intermediate',
  },
  {
    id: 9,
    question: 'How do you create a responsive design with CSS?',
    answer:
      'Use media queries (@media), flexible units (%, vw, vh), CSS Grid and Flexbox, and mobile-first approach. Set breakpoints for different screen sizes and adjust layouts accordingly.',
    category: 'Responsive',
    difficulty: 'Intermediate',
  },
  {
    id: 10,
    question: 'What are CSS custom properties (CSS variables)?',
    answer:
      'CSS custom properties (--variable-name) allow you to store reusable values. They can be scoped to elements and changed dynamically with JavaScript. Use var(--variable-name) to reference them.',
    category: 'Variables',
    difficulty: 'Intermediate',
  },
];

export default function CSSPracticePage() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleQuestionClick = (questionId: number) => {
    if (selectedQuestion === questionId) {
      setShowAnswer(!showAnswer);
    } else {
      setSelectedQuestion(questionId);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <nav className="mb-8">
            <Link
              href="/preparation-guides"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Preparation Guides
            </Link>
          </nav>

          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">🎨</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              CSS Practice Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Master CSS fundamentals with these essential interview questions
              covering layout, styling, and modern CSS techniques
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-bold border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                {cssQuestions.length} Questions
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-xl text-sm font-bold border-2 border-green-200 dark:border-green-700 shadow-sm">
                Beginner to Intermediate
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-bold border-2 border-purple-200 dark:border-purple-700 shadow-sm">
                Layout & Styling
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {cssQuestions.map(question => (
            <div
              key={question.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <button
                onClick={() => handleQuestionClick(question.id)}
                className="w-full p-8 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">
                          {question.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${
                            question.difficulty === 'Beginner'
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700'
                              : 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-bold border-2 border-purple-200 dark:border-purple-700">
                          {question.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  <div className="ml-6 flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedQuestion === question.id && showAnswer
                          ? 'bg-blue-500 text-white rotate-180'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {selectedQuestion === question.id && showAnswer && (
                <div className="border-t-2 border-blue-200 dark:border-blue-800 p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center text-xl">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      Answer
                    </h4>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 shadow-md">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {question.answer}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/coding"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      🎯 Practice Coding
                    </Link>
                    <Link
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      📚 MDN Docs
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      🔄 More Questions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-2xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Ready for More Practice?
            </h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Continue your learning journey with related topics and master the
              complete frontend stack
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/practice/fundamentals/html"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 HTML Practice
              </Link>
              <Link
                href="/practice/fundamentals/javascript"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ⚡ JavaScript Practice
              </Link>
              <Link
                href="/coding"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 Coding Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
