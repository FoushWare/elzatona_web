'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { codingChallenges } from '@/lib/codingChallenges';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Code,
} from 'lucide-react';
import Link from 'next/link';

export default function CodingChallengePage() {
  const params = useParams();

  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<
    Array<{ name: string; passed: boolean; output: string }>
  >([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const challengeId = params.id as string;
  const challenge = codingChallenges.find(c => c.id === challengeId);

  useEffect(() => {
    if (challenge) {
      setCode(
        challenge.starterCode.javascript || '// Write your solution here'
      );
    }
  }, [challenge]);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Challenge Not Found
            </h1>
            <p className="text-muted-foreground mt-2">
              The requested coding challenge could not be found.
            </p>
            <Link
              href="/coding"
              className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenges
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRunTests = async () => {
    setIsRunning(true);
    // Simulate test execution
    setTimeout(() => {
      setTestResults([
        { name: 'Test 1', passed: true, output: 'Expected: 5, Got: 5' },
        { name: 'Test 2', passed: false, output: 'Expected: 10, Got: 8' },
        { name: 'Test 3', passed: true, output: 'Expected: 15, Got: 15' },
      ]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    // Handle code submission
    console.log('Submitting code:', code);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/coding"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{challenge.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{challenge.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{challenge.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{challenge.completionRate}% success</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Problem Description
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground mb-4">
                  {challenge.description}
                </p>

                <h3 className="text-lg font-semibold mb-3">
                  Problem Statement
                </h3>
                <p className="text-muted-foreground mb-4">
                  {challenge.problem.statement}
                </p>

                <h3 className="text-lg font-semibold mb-3">Examples</h3>
                {challenge.problem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Example {index + 1}:
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <code className="bg-background px-2 py-1 rounded font-mono">
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output: </span>
                        <code className="bg-background px-2 py-1 rounded font-mono">
                          {example.output}
                        </code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Explanation:{' '}
                        </span>
                        <span className="text-foreground">
                          {example.explanation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {challenge.problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-sm">
                      {constraint}
                    </li>
                  ))}
                </ul>

                {challenge.problem.notes && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">
                      Notes
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      {challenge.problem.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                <div className="space-y-3">
                  {testResults.map((test, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-muted"
                    >
                      {test.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {test.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solution */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Solution</h3>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>
              {showSolution && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">JavaScript Solution</h4>
                    <pre className="text-sm overflow-x-auto">
                      <code>{challenge.solution.javascript}</code>
                    </pre>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-sm text-muted-foreground">
                      {challenge.solution.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Your Solution</span>
                </h3>
              </div>
              <div className="p-4">
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your JavaScript code here..."
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
