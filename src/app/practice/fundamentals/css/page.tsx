"use client";

import { useState } from "react";
import Link from "next/link";

const cssQuestions = [
  {
    id: 1,
    question: "Explain the CSS Box Model and its components.",
    answer: "The CSS Box Model consists of content, padding, border, and margin. Content is the actual content area, padding is the space between content and border, border is the visible boundary, and margin is the space outside the border.",
    category: "Box Model",
    difficulty: "Beginner"
  },
  {
    id: 2,
    question: "What is the difference between margin and padding?",
    answer: "Margin is the space outside an element's border, while padding is the space between the element's content and its border. Margin affects the element's position relative to other elements, while padding affects the internal spacing.",
    category: "Spacing",
    difficulty: "Beginner"
  },
  {
    id: 3,
    question: "Explain CSS specificity and how it works.",
    answer: "CSS specificity determines which styles are applied when multiple rules target the same element. It's calculated based on selector types: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), and elements/pseudo-elements (1).",
    category: "Specificity",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    question: "What are CSS Flexbox and Grid? When would you use each?",
    answer: "Flexbox is for 1D layouts (rows or columns), great for navigation, forms, and simple layouts. Grid is for 2D layouts (rows and columns), perfect for page layouts, card grids, and complex arrangements.",
    category: "Layout",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "How do you center an element horizontally and vertically?",
    answer: "Using Flexbox: display: flex, justify-content: center, align-items: center. Using Grid: display: grid, place-items: center. Using absolute positioning: position: absolute, top: 50%, left: 50%, transform: translate(-50%, -50%).",
    category: "Layout",
    difficulty: "Beginner"
  },
  {
    id: 6,
    question: "What are CSS pseudo-classes and pseudo-elements?",
    answer: "Pseudo-classes (like :hover, :focus, :nth-child) select elements based on their state or position. Pseudo-elements (like ::before, ::after, ::first-line) create virtual elements that don't exist in the DOM.",
    category: "Selectors",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    question: "Explain CSS units: px, em, rem, %, vh, vw.",
    answer: "px is absolute, em is relative to parent font-size, rem is relative to root font-size, % is relative to parent, vh/vw are viewport height/width percentages.",
    category: "Units",
    difficulty: "Beginner"
  },
  {
    id: 8,
    question: "What is the CSS cascade and inheritance?",
    answer: "The cascade determines which styles apply when multiple rules exist. Inheritance allows child elements to inherit certain properties from their parents. Not all properties are inherited (like border, margin, padding).",
    category: "Cascade",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    question: "How do you create a responsive design with CSS?",
    answer: "Use media queries (@media), flexible units (%, vw, vh), CSS Grid and Flexbox, and mobile-first approach. Set breakpoints for different screen sizes and adjust layouts accordingly.",
    category: "Responsive",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    question: "What are CSS custom properties (CSS variables)?",
    answer: "CSS custom properties (--variable-name) allow you to store reusable values. They can be scoped to elements and changed dynamically with JavaScript. Use var(--variable-name) to reference them.",
    category: "Variables",
    difficulty: "Intermediate"
  }
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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-6">
            <Link 
              href="/preparation-guides" 
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Preparation Guides
            </Link>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              🎨 CSS Practice Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master CSS fundamentals with these essential interview questions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {cssQuestions.length} Questions
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Beginner to Intermediate
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                Layout & Styling
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {cssQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleQuestionClick(question.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-bold">
                        {question.id}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        question.difficulty === 'Beginner' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        {question.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {question.question}
                    </h3>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ml-4 flex-shrink-0 ${
                      selectedQuestion === question.id && showAnswer ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {selectedQuestion === question.id && showAnswer && (
                <div className="border-t border-border p-6 bg-muted/20">
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Answer
                    </h4>
                    <p className="text-foreground leading-relaxed">
                      {question.answer}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/coding"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      🎯 Practice Coding
                    </Link>
                    <Link
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      📚 MDN Docs
                    </Link>
                    <Link
                      href="/practice/fundamentals"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
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
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready for More Practice?</h2>
          <p className="text-blue-100 mb-6">
            Continue your learning journey with related topics
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals/html"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🎯 HTML Practice
            </Link>
            <Link
              href="/practice/fundamentals/javascript"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ⚡ JavaScript Practice
            </Link>
            <Link
              href="/coding"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🎯 Coding Challenges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
