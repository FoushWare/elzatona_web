"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { TestResult } from "@elzatona/types";

interface TestResultsPanelProps {
  results: TestResult[] | null;
}

export const TestResultsPanel: React.FC<TestResultsPanelProps> = ({
  results,
}) => {
  if (!results) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Run your code to see test results
      </div>
    );
  }

  const passedCount = results.filter((r) => r.passed).length;
  const isAllPassed = passedCount === results.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">
          Test Results: {passedCount}/{results.length} Passed
        </h3>
        <Badge variant={isAllPassed ? "default" : "destructive"}>
          {isAllPassed ? "Success" : "Failed"}
        </Badge>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {results.map((result, index) => (
            <Card
              key={result.id}
              className="border-l-4 border-l-transparent overflow-hidden"
              style={{ borderLeftColor: result.passed ? "#22c55e" : "#ef4444" }}
            >
              <CardContent className="p-3 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">Test Case {index + 1}</span>
                  {result.elapsedMs !== undefined && (
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" />{" "}
                      {result.elapsedMs.toFixed(2)}ms
                    </span>
                  )}
                </div>
                {!result.passed && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs space-y-1">
                    <div>
                      <span className="font-semibold">Expected:</span>{" "}
                      <code className="bg-white dark:bg-black/20 px-1 rounded">
                        {JSON.stringify(result.expected)}
                      </code>
                    </div>
                    <div>
                      <span className="font-semibold">Actual:</span>{" "}
                      <code className="bg-white dark:bg-black/20 px-1 rounded">
                        {JSON.stringify(result.actual)}
                      </code>
                    </div>
                    {result.error && (
                      <div className="text-red-600 dark:text-red-400 mt-1">
                        Error: {result.error}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ConsoleOutputProps {
  output: string[];
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output }) => {
  return (
    <ScrollArea className="h-full min-h-[200px] bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm rounded-md">
      {output.length === 0 ? (
        <span className="text-gray-600 italic">No output...</span>
      ) : (
        output.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap">
            {line}
          </div>
        ))
      )}
    </ScrollArea>
  );
};
