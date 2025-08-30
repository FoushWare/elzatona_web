"use client";

import { useState } from "react";
import Link from "next/link";

const htmlQuestions = [
  {
    id: 1,
    question: "What are the key differences between HTML4 and HTML5?",
    answer: "HTML5 introduced semantic elements (header, nav, main, section, article, footer), new form controls, multimedia support (audio, video), canvas for graphics, local storage, and improved accessibility features.",
    category: "HTML5",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    question: "Explain the purpose of semantic HTML elements.",
    answer: "Semantic HTML elements clearly describe their meaning to both the browser and developer. Examples include header, nav, main, section, article, aside, footer. They improve accessibility, SEO, and code readability.",
    category: "Semantics",
    difficulty: "Beginner"
  },
  {
    id: 3,
    question: "What is the difference between div and span elements?",
    answer: "div is a block-level element that creates a new line and takes full width, while span is an inline element that only takes the space it needs and doesn't create line breaks.",
    category: "Elements",
    difficulty: "Beginner"
  },
  {
    id: 4,
    question: "How do you create a responsive image in HTML?",
    answer: "Use the picture element with multiple source elements for different screen sizes, or use CSS with max-width: 100% and height: auto on img elements.",
    category: "Responsive",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "What are the new form input types in HTML5?",
    answer: "email, url, tel, number, range, date, time, datetime-local, month, week, color, search, and datalist for suggestions.",
    category: "Forms",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    question: "Explain the difference between GET and POST methods.",
    answer: "GET sends data in URL parameters, is cached, has length limits, and is less secure. POST sends data in request body, is not cached, has no length limits, and is more secure.",
    category: "Forms",
    difficulty: "Beginner"
  },
  {
    id: 7,
    question: "What is the purpose of the alt attribute in img tags?",
    answer: "The alt attribute provides alternative text for images, improving accessibility for screen readers and displaying when images fail to load.",
    category: "Accessibility",
    difficulty: "Beginner"
  },
  {
    id: 8,
    question: "How do you create a table in HTML?",
    answer: "Use table element with tr for rows, th for headers, and td for data cells. You can also use thead, tbody, and tfoot for better structure.",
    category: "Tables",
    difficulty: "Beginner"
  },
  {
    id: 9,
    question: "What is the difference between id and class attributes?",
    answer: "id must be unique in the document and is used for specific targeting, while class can be used on multiple elements and is used for grouping similar elements.",
    category: "Attributes",
    difficulty: "Beginner"
  },
  {
    id: 10,
    question: "How do you embed audio and video in HTML5?",
    answer: "Use audio and video elements with source elements for different formats. Include controls, autoplay, loop, and preload attributes as needed.",
    category: "Multimedia",
    difficulty: "Intermediate"
  }
];

export default function HTMLPracticePage() {
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
              🎯 HTML Practice Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master HTML fundamentals with these essential interview questions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {htmlQuestions.length} Questions
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Beginner to Intermediate
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                HTML5 & Semantics
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {htmlQuestions.map((question) => (
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
                      href="https://developer.mozilla.org/en-US/docs/Web/HTML"
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
              href="/practice/fundamentals/css"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              🎨 CSS Practice
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
