"use client";

import { useState, useCallback, useEffect } from "react";
import { ProblemSolvingTask, TestResult } from "@elzatona/types";
import { executeCode, runTestCases } from "./ProblemSolverUtils";
import { useToast } from "../../common/Toast";

export const useProblemSolver = (task: ProblemSolvingTask) => {
  const [code, setCode] = useState(task.starterCode || "");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const { showSuccess, showError } = useToast();

  // Reset state when task changes
  useEffect(() => {
    setCode(task.starterCode || "");
    setOutput([]);
    setTestResults(null);
    setActiveTab("description");
  }, [task.id, task.starterCode]);

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput([]);
    setActiveTab("console");

    try {
      // Run against the first test case as a "Run Code" check
      const exampleTestCase = task.testCases[0];
      if (!exampleTestCase) {
        setOutput(["No test cases available to run."]);
        return;
      }

      const result = await executeCode(
        code,
        task.functionName,
        exampleTestCase.input,
      );

      if (result.logs && result.logs.length > 0) {
        setOutput((prev) => [...prev, ...result.logs!]);
      }

      if (result.success) {
        setOutput((prev) => [
          ...prev,
          `> Result: ${JSON.stringify(result.output)}`,
        ]);
      } else {
        setOutput((prev) => [...prev, `> Error: ${result.error}`]);
      }
    } catch (error: any) {
      setOutput((prev) => [...prev, `> System Error: ${error.message}`]);
    } finally {
      setIsRunning(false);
    }
  }, [code, task]);

  const handleSubmit = useCallback(async () => {
    setIsRunning(true);
    setActiveTab("tests");

    try {
      const { passed, results } = await runTestCases(code, task);
      setTestResults(results);

      if (passed) {
        showSuccess(
          "All Tests Passed!",
          "Great job! You've solved the problem.",
        );
        // Here you would typically trigger a "completed" API call
      } else {
        showError("Tests Failed", "Some test cases failed. Check the results.");
      }
    } catch (error: any) {
      showError("Execution Error", error.message);
    } finally {
      setIsRunning(false);
    }
  }, [code, task, showSuccess, showError]);

  return {
    code,
    setCode,
    output,
    isRunning,
    testResults,
    activeTab,
    setActiveTab,
    handleRunCode,
    handleSubmit,
  };
};
