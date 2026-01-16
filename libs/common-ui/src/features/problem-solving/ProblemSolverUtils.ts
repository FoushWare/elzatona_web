import { ProblemSolvingTask, TestCase, TestResult } from "@elzatona/types";

export interface ExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
  logs?: string[];
  executionTime?: number;
}

export const executeCode = async (
  code: string,
  functionName: string,
  args: any[],
): Promise<ExecutionResult> => {
  const logs: string[] = [];

  try {
    // Create a safe(ish) execution environment
    // Note: In a real production app, this should be sandboxed (e.g., WebWorkers, VM)
    // For this implementation, we use Function constructor but override console

    const startTime = performance.now();

    // Capture console usage
    const capturedConsole = {
      log: (...args: any[]) => logs.push(args.map((a) => String(a)).join(" ")),
      error: (...args: any[]) =>
        logs.push(`Error: ${args.map((a) => String(a)).join(" ")}`),
      warn: (...args: any[]) =>
        logs.push(`Warn: ${args.map((a) => String(a)).join(" ")}`),
      info: (...args: any[]) =>
        logs.push(`Info: ${args.map((a) => String(a)).join(" ")}`),
    };

    // Wrap user code to return the target function
    const wrappedCode = `
      ${code}
      return ${functionName};
    `;

    // Execute

    const userFunction = new Function("console", wrappedCode)(capturedConsole);

    if (typeof userFunction !== "function") {
      throw new Error(`Function '${functionName}' not found in code.`);
    }

    const result = userFunction(...args);
    const endTime = performance.now();

    return {
      success: true,
      output: result,
      logs,
      executionTime: endTime - startTime,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || String(err),
      logs,
    };
  }
};

export const runTestCases = async (
  code: string,
  task: ProblemSolvingTask,
): Promise<{ passed: boolean; results: TestResult[] }> => {
  const results: TestResult[] = [];
  let allPassed = true;

  for (const testCase of task.testCases) {
    const execResult = await executeCode(
      code,
      task.functionName,
      testCase.input,
    );

    const passed =
      execResult.success &&
      JSON.stringify(execResult.output) === JSON.stringify(testCase.expected); // Simple deep equality

    if (!passed) allPassed = false;

    results.push({
      id: testCase.id,
      passed,
      actual: execResult.success ? execResult.output : undefined,
      expected: testCase.expected,
      error: execResult.error,
      elapsedMs: execResult.executionTime,
    });
  }

  return { passed: allPassed, results };
};
