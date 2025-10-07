'use client';

import { useState } from 'react';
import { Challenge } from '@/types/challenge';

interface SolutionDisplayProps {
  challenge: Challenge;
  userCode: {
    html: string;
    css: string;
    javascript: string;
  };
  testResults: Array<{
    name: string;
    passed: boolean;
    message?: string;
    error?: string;
  }>;
  onClose: () => void;
}

export default function SolutionDisplay({
  challenge,
  userCode,
  testResults,
  onClose,
}: SolutionDisplayProps) {
  const [activeTab, setActiveTab] = useState<
    'solution' | 'comparison' | 'explanation'
  >('solution');

  const allTestsPassed = testResults.every(result => result.passed);
  const passedCount = testResults.filter(result => result.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Challenge Complete!</h2>
              <p className="text-blue-100 mt-1">
                {allTestsPassed
                  ? '🎉 All tests passed!'
                  : `${passedCount}/${totalTests} tests passed`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('solution')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'solution'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                Official Solution
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'comparison'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                Code Comparison
              </button>
              <button
                onClick={() => setActiveTab('explanation')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'explanation'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                Explanation
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'solution' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Official Solution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-md font-medium text-card-foreground mb-2">
                        HTML
                      </h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{challenge.solution.html}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-card-foreground mb-2">
                        CSS
                      </h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{challenge.solution.css}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-card-foreground mb-2">
                        JavaScript
                      </h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{challenge.solution.javascript}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Code Comparison
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {/* Your Code */}
                  <div>
                    <h4 className="text-md font-medium text-card-foreground mb-2">
                      Your Code
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          HTML
                        </h5>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-muted-foreground">
                          <code>{userCode.html}</code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          CSS
                        </h5>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-muted-foreground">
                          <code>{userCode.css}</code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          JavaScript
                        </h5>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-muted-foreground">
                          <code>{userCode.javascript}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Solution Code */}
                  <div>
                    <h4 className="text-md font-medium text-card-foreground mb-2">
                      Solution Code
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          HTML
                        </h5>
                        <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-xs overflow-x-auto border border-green-200 dark:border-green-800">
                          <code>{challenge.solution.html}</code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          CSS
                        </h5>
                        <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-xs overflow-x-auto border border-green-200 dark:border-green-800">
                          <code>{challenge.solution.css}</code>
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">
                          JavaScript
                        </h5>
                        <pre className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-xs overflow-x-auto border border-green-200 dark:border-green-800">
                          <code>{challenge.solution.javascript}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'explanation' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Solution Explanation
                </h3>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="text-md font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    How the Solution Works
                  </h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      {challenge.explanation}
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="text-md font-semibold text-card-foreground mb-3">
                    Key Concepts
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {challenge.tags.map((tag, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="text-md font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                    Best Practices
                  </h4>
                  <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                    <li>
                      • Use semantic HTML elements for better accessibility
                    </li>
                    <li>
                      • Write clean, readable CSS with proper organization
                    </li>
                    <li>
                      • Follow JavaScript best practices and avoid common
                      pitfalls
                    </li>
                    <li>• Test your code thoroughly before submitting</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 bg-muted">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {allTestsPassed ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  🎉 Congratulations! You&apos;ve completed this challenge!
                </span>
              ) : (
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                  Keep practicing! You&apos;re making progress.
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-muted-foreground text-muted rounded-lg hover:bg-foreground hover:text-background transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => (window.location.href = '/challenges')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
