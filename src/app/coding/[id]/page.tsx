"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getChallengeById, codingChallenges } from "@/lib/codingChallenges";
import Link from "next/link";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function CodingChallengePage() {
  const params = useParams();
  const id = params.id as string;
  const challenge = getChallengeById(id);
  const [code, setCode] = useState(challenge?.starterCode.javascript || "");
  const [language, setLanguage] = useState<"javascript" | "typescript">(
    "javascript"
  );
  const [testResults, setTestResults] = useState<
    Array<{
      id: number;
      input: string;
      expected: string;
      output: string;
      status: string;
    }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const { isDarkMode } = useDarkMode();

  // Update code when language changes
  useEffect(() => {
    if (challenge) {
      const newCode = challenge.starterCode[language];
      if (newCode) {
        setCode(newCode);
      }
    }
  }, [language, challenge]);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
          <p className="mb-4 text-muted-foreground">
            The challenge with ID &quot;{id}&quot; could not be found.
          </p>
          <Link
            href="/coding"
            className="btn-primary inline-flex items-center"
          >
            ← Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const handleRunCode = () => {
    setIsRunning(true);
    const startTime = performance.now();

    // Simulate running code and getting results
    setTimeout(() => {
      const endTime = performance.now();
      const executionTimeMs = endTime - startTime;
      setExecutionTime(executionTimeMs);
      setMemoryUsage(Math.random() * 10 + 5); // Simulate memory usage in MB

      const results = challenge.testCases.map((test, index) => ({
        id: index + 1,
        input: JSON.stringify(test.input),
        expected: JSON.stringify(test.expectedOutput),
        output:
          Math.random() > 0.5 ? JSON.stringify(test.expectedOutput) : "[1, 5]", // Simulate pass/fail
        status: Math.random() > 0.5 ? "Passed" : "Failed",
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    // Simulate submission
    setTimeout(() => {
      alert("Challenge Submitted!");
      setIsRunning(false);
    }, 2000);
  };

  const getPassRateColor = (rate: number) => {
    if (rate >= 80) return "text-success";
    if (rate >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/coding"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Challenges
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">1.</span>
              <h1 className="text-xl font-semibold">{challenge.title}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`badge ${
              challenge.difficulty === "easy"
                ? "badge-success"
                : challenge.difficulty === "medium"
                ? "badge-warning"
                : "badge-destructive"
            }`}>
              {challenge.difficulty}
            </span>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn-primary disabled:bg-muted disabled:text-muted-foreground"
            >
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isRunning}
              className="btn-primary"
            >
              {isRunning ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel: Problem Description */}
        <div className="w-1/2 flex flex-col bg-background border-r border-border overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                {challenge.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-muted-foreground">
                  Acceptance Rate:{" "}
                  <span className={getPassRateColor(challenge.completionRate)}>
                    {challenge.completionRate}%
                  </span>
                </span>
                <span className="text-muted-foreground">
                  Time: {challenge.estimatedTime} min
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Examples:</h3>
              {challenge.problem.examples.map((example, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 bg-muted rounded-md"
                >
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
                      <span className="text-muted-foreground">Explanation: </span>
                      <span className="text-foreground">
                        {example.explanation}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Constraints:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {challenge.problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-sm">
                    {constraint}
                  </li>
                ))}
              </ul>
            </div>

            {challenge.problem.notes && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Follow-up:</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {challenge.problem.notes}
                </p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Hints</h3>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="text-primary hover:text-primary/80 text-sm transition-colors"
                >
                  {showHints ? "Hide" : "Show"} Hints
                </button>
              </div>
              {showHints && (
                <div className="p-4 bg-muted rounded-md">
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {challenge.hints.map((hint, index) => (
                      <li key={index} className="text-sm">
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.relatedTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded text-xs font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor and Output */}
        <div className="w-1/2 flex flex-col bg-background overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col border-b border-border">
            <div className="flex items-center justify-between p-3 bg-muted">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Code</span>
                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value as "javascript" | "typescript")
                  }
                  className="form-input w-auto text-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                </select>
              </div>
              <div className="text-xs text-muted-foreground">Saved</div>
            </div>
            <div className="flex-1 p-4">
              <textarea
                className="w-full h-full form-input font-mono resize-none"
                placeholder="Write your code here..."
                spellCheck="false"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Output/Test Results */}
          <div className="flex-shrink-0 h-1/3 flex flex-col">
            <div className="flex-shrink-0 flex border-b border-border">
              <button className="px-6 py-3 text-sm font-medium text-primary border-b-2 border-primary">
                Test Results
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-sm bg-muted/30">
              {isRunning ? (
                <p className="text-primary">Running tests...</p>
              ) : testResults.length === 0 ? (
                <p className="text-muted-foreground">
                  Run code to see test results.
                </p>
              ) : (
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded-md ${
                        result.status === "Passed"
                          ? "bg-success/10 border border-success/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      <p className="font-semibold">Test Case {result.id}:</p>
                      <p className="text-foreground">
                        Input: <span className="font-mono">{result.input}</span>
                      </p>
                      <p className="text-foreground">
                        Expected:{" "}
                        <span className="font-mono">{result.expected}</span>
                      </p>
                      <p className="text-foreground">
                        Output:{" "}
                        <span className="font-mono">{result.output}</span>
                      </p>
                      <p
                        className={`font-semibold ${
                          result.status === "Passed"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        Status: {result.status}
                      </p>
                    </div>
                  ))}
                  {executionTime && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm text-foreground">
                        Execution Time: {executionTime.toFixed(2)}ms
                      </p>
                      {memoryUsage && (
                        <p className="text-sm text-foreground">
                          Memory Usage: {memoryUsage.toFixed(2)}MB
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
