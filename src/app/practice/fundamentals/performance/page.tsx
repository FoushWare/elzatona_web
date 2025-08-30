"use client";

import { useState } from "react";
import Link from "next/link";

const performanceQuestions = [
  {
    id: 1,
    question: "How would you optimize a frontend application for performance?",
    answer: "Use code splitting, lazy loading, image optimization, minification, caching strategies, CDN, bundle analysis, tree shaking, and performance monitoring tools like Lighthouse.",
    category: "Optimization",
    difficulty: "Advanced"
  },
  {
    id: 2,
    question: "What is code splitting and how does it improve performance?",
    answer: "Code splitting divides your bundle into smaller chunks that can be loaded on demand. It reduces initial bundle size, improves first contentful paint, and allows parallel loading of chunks.",
    category: "Bundling",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    question: "Explain lazy loading and when to use it.",
    answer: "Lazy loading defers loading of non-critical resources until they're needed. Use it for images below the fold, components not immediately visible, and routes that aren't accessed immediately.",
    category: "Loading",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    question: "What are the key web performance metrics?",
    answer: "First Contentful Paint (FCP), Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS), Time to Interactive (TTI), and Total Blocking Time (TBT).",
    category: "Metrics",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    question: "How do you optimize images for web performance?",
    answer: "Use modern formats (WebP, AVIF), implement responsive images with srcset, compress images, use lazy loading, implement proper sizing, and consider using a CDN for image delivery.",
    category: "Images",
    difficulty: "Intermediate"
  },
  {
    id: 6,
    question: "What is tree shaking and how does it work?",
    answer: "Tree shaking is a dead code elimination technique that removes unused code from the final bundle. It works by analyzing import/export statements and removing code that's not actually used.",
    category: "Bundling",
    difficulty: "Advanced"
  },
  {
    id: 7,
    question: "Explain caching strategies for web applications.",
    answer: "Browser caching (Cache-Control headers), service worker caching, CDN caching, API response caching, and memory caching. Use appropriate cache policies based on content type and update frequency.",
    category: "Caching",
    difficulty: "Advanced"
  },
  {
    id: 8,
    question: "How do you debug performance issues in a web application?",
    answer: "Use Chrome DevTools Performance tab, Lighthouse audits, WebPageTest, bundle analyzers, monitoring tools like Sentry, and performance APIs like PerformanceObserver.",
    category: "Debugging",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    question: "What is the critical rendering path and how to optimize it?",
    answer: "The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels. Optimize by minimizing render-blocking resources, inlining critical CSS, and deferring non-critical JavaScript.",
    category: "Rendering",
    difficulty: "Advanced"
  },
  {
    id: 10,
    question: "How do you implement virtual scrolling for large lists?",
    answer: "Virtual scrolling renders only visible items in the viewport. Use libraries like react-window or implement custom solutions with Intersection Observer API to manage DOM nodes efficiently.",
    category: "Rendering",
    difficulty: "Advanced"
  }
];

export default function PerformancePracticePage() {
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
              ⚡ Performance Practice Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Master frontend performance optimization with these advanced interview questions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {performanceQuestions.length} Questions
              </span>
              <span className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                Intermediate to Advanced
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                Optimization & Metrics
              </span>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {performanceQuestions.map((question) => (
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
                        question.difficulty === 'Intermediate' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
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
                      href="https://web.dev/performance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      📚 Web.dev
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
              href="/practice/fundamentals/javascript"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ⚡ JavaScript Practice
            </Link>
            <Link
              href="/practice/fundamentals/react"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              ⚛️ React Practice
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
