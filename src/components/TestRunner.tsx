'use client';

import { useState } from 'react';
import { TestCase } from '@/types/challenge';

interface TestRunnerProps {
  testCases: TestCase[];
  userCode: {
    html: string;
    css: string;
    javascript: string;
  };
  onTestComplete?: (results: TestResult[]) => void;
}

interface TestResult {
  testCase: TestCase;
  passed: boolean;
  output?: string | boolean | number;
  error?: string;
  executionTime: number;
}

export default function TestRunner({
  testCases,
  userCode,
  onTestComplete,
}: TestRunnerProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setIsCompleted(false);
    setTestResults([]);

    const results: TestResult[] = [];

    for (const testCase of testCases) {
      const startTime = performance.now();
      let result: TestResult;

      try {
        switch (testCase.type) {
          case 'html':
            result = await runHtmlTest(testCase, userCode.html);
            break;
          case 'css':
            result = await runCssTest(testCase, userCode.css);
            break;
          case 'javascript':
            result = await runJavaScriptTest(testCase, userCode.javascript);
            break;
          default:
            result = {
              testCase,
              passed: false,
              error: 'Unknown test type',
              executionTime: 0,
            };
        }
      } catch (error) {
        result = {
          testCase,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          executionTime: 0,
        };
      }

      result.executionTime = performance.now() - startTime;
      results.push(result);
    }

    setTestResults(results);
    setIsRunning(false);
    setIsCompleted(true);

    if (onTestComplete) {
      onTestComplete(results);
    }
  };

  const runHtmlTest = async (
    testCase: TestCase,
    htmlCode: string
  ): Promise<TestResult> => {
    // Create a temporary DOM to test HTML structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    // Basic HTML structure validation
    const hasRequiredElements =
      testCase.input &&
      Object.keys(testCase.input).every(selector => {
        const elements = doc.querySelectorAll(selector);
        return elements.length > 0;
      });

    return {
      testCase,
      passed: hasRequiredElements,
      output: hasRequiredElements
        ? 'HTML structure is valid'
        : 'Missing required elements',
      executionTime: 0,
    };
  };

  const runCssTest = async (
    testCase: TestCase,
    cssCode: string
  ): Promise<TestResult> => {
    // Basic CSS validation - check if required properties are present
    const hasRequiredProperties =
      testCase.input &&
      Object.keys(testCase.input).every(property => {
        return cssCode.includes(property);
      });

    return {
      testCase,
      passed: hasRequiredProperties,
      output: hasRequiredProperties
        ? 'CSS properties found'
        : 'Missing required CSS properties',
      executionTime: 0,
    };
  };

  const runJavaScriptTest = async (
    testCase: TestCase,
    jsCode: string
  ): Promise<TestResult> => {
    // Create a sandboxed environment for JavaScript testing
    const sandbox = {
      console: {
        log: (...args: unknown[]) => args,
        error: (...args: unknown[]) => args,
        warn: (...args: unknown[]) => args,
      },
      document: {
        querySelector: () => ({ textContent: '', value: '' }),
        querySelectorAll: () => [],
        getElementById: () => ({ textContent: '', value: '' }),
        addEventListener: () => {},
        removeEventListener: () => {},
      },
      window: {
        addEventListener: () => {},
        removeEventListener: () => {},
      },
      setTimeout: (fn: () => void, delay: number) => setTimeout(fn, delay),
      setInterval: (fn: () => void, delay: number) => setInterval(fn, delay),
      clearTimeout: (id: number) => clearTimeout(id),
      clearInterval: (id: number) => clearInterval(id),
    };

    try {
      // Execute the JavaScript code in the sandbox
      const userFunction = new Function(
        'document',
        'window',
        'console',
        jsCode
      );
      const result = userFunction(
        sandbox.document,
        sandbox.window,
        sandbox.console
      );

      // Compare with expected output
      const passed =
        JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);

      return {
        testCase,
        passed,
        output: result,
        executionTime: 0,
      };
    } catch (error) {
      return {
        testCase,
        passed: false,
        error:
          error instanceof Error ? error.message : 'JavaScript execution error',
        executionTime: 0,
      };
    }
  };

  const getPassedCount = () =>
    testResults.filter(result => result.passed).length;
  const getTotalCount = () => testResults.length;

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            Test Cases
          </h3>
          <div className="flex items-center space-x-4">
            {isCompleted && (
              <div className="text-sm text-muted-foreground">
                {getPassedCount()} / {getTotalCount()} tests passed
              </div>
            )}
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isRunning
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </button>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="p-6">
        {testResults.length === 0 && !isRunning && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-4">🧪</div>
            <p>Click &quot;Run Tests&quot; to execute test cases</p>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Running test cases...</p>
          </div>
        )}

        {testResults.length > 0 && (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.passed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground mb-1">
                      {result.testCase.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {result.testCase.description}
                    </p>

                    {result.passed ? (
                      <div className="flex items-center text-green-700 dark:text-green-400">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium">Passed</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-700 dark:text-red-400">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-medium">Failed</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground ml-4">
                    {result.executionTime.toFixed(2)}ms
                  </div>
                </div>

                {!result.passed && result.error && (
                  <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/20 rounded text-sm text-red-800 dark:text-red-300">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}

                {result.output && (
                  <div className="mt-3 p-3 bg-muted rounded text-sm text-muted-foreground">
                    <strong>Output:</strong> {JSON.stringify(result.output)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {isCompleted && testResults.length > 0 && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              getPassedCount() === getTotalCount()
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
            }`}
          >
            <div className="flex items-center">
              {getPassedCount() === getTotalCount() ? (
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span
                className={`font-medium ${
                  getPassedCount() === getTotalCount()
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-yellow-800 dark:text-yellow-200'
                }`}
              >
                {getPassedCount() === getTotalCount()
                  ? 'All tests passed! Great job!'
                  : `${getPassedCount()} out of ${getTotalCount()} tests passed. Keep trying!`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
