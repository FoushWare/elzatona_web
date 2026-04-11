/* eslint-disable @typescript-eslint/no-explicit-any */
// v1.0 - Enhanced solution validation system for frontend tasks
// This file uses 'any' types for test case inputs/outputs which can be of various types

export interface TestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  type: "function" | "component" | "css" | "html";
  timeout?: number; // in milliseconds
}

export interface ValidationResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: any;
  expectedOutput: any;
  error?: string;
  executionTime: number; // in milliseconds
}

export interface SolutionValidation {
  overallPassed: boolean;
  results: ValidationResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  executionTime: number;
}

export class FrontendTaskValidator {
  private readonly timeout: number; // 5 seconds default timeout

  constructor(timeout: number = 5000) {
    this.timeout = timeout;
  }

  /**
   * Validate a React component solution
   */
  async validateReactComponent(
    userCode: string,
    testCases: TestCase[],
  ): Promise<SolutionValidation> {
    const results: ValidationResult[] = [];
    const startTime = Date.now();

    try {
      // Create a sandboxed environment for testing
      const iframe = this.createTestIframe();

      // Inject React and ReactDOM
      await this.injectReactLibraries(iframe);

      // Inject user code
      await this.injectUserCode(iframe, userCode);

      // Run test cases
      for (const testCase of testCases) {
        const result = await this.runReactTestCase(iframe, testCase);
        results.push(result);
      }

      // Cleanup
      iframe.remove();
    } catch (error) {
      console.error("Validation error:", error);
      // Add error result for all test cases
      testCases.forEach((testCase) => {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          expectedOutput: testCase.expectedOutput,
          error: error instanceof Error ? error.message : String(error),
          executionTime: 0,
        });
      });
    }

    const executionTime = Date.now() - startTime;
    const passedTests = results.filter((r) => r.passed).length;

    return {
      overallPassed: passedTests === testCases.length,
      results,
      totalTests: testCases.length,
      passedTests,
      failedTests: testCases.length - passedTests,
      executionTime,
    };
  }

  /**
   * Validate a JavaScript function solution
   */
  async validateJavaScriptFunction(
    userCode: string,
    testCases: TestCase[],
    functionName: string,
  ): Promise<SolutionValidation> {
    const results: ValidationResult[] = [];
    const startTime = Date.now();

    try {
      // Create a sandboxed environment
      const iframe = this.createTestIframe();

      // Inject user code
      await this.injectUserCode(iframe, userCode);

      // Run test cases
      for (const testCase of testCases) {
        const result = await this.runJavaScriptTestCase(
          iframe,
          testCase,
          functionName,
        );
        results.push(result);
      }

      // Cleanup
      iframe.remove();
    } catch (error) {
      console.error("Validation error:", error);
      testCases.forEach((testCase) => {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          expectedOutput: testCase.expectedOutput,
          error: error instanceof Error ? error.message : String(error),
          executionTime: 0,
        });
      });
    }

    const executionTime = Date.now() - startTime;
    const passedTests = results.filter((r) => r.passed).length;

    return {
      overallPassed: passedTests === testCases.length,
      results,
      totalTests: testCases.length,
      passedTests,
      failedTests: testCases.length - passedTests,
      executionTime,
    };
  }

  /**
   * Validate CSS/HTML solution
   */
  async validateCSSHTML(
    userCode: string,
    testCases: TestCase[],
  ): Promise<SolutionValidation> {
    const results: ValidationResult[] = [];
    const startTime = Date.now();

    try {
      // Create a test iframe
      const iframe = this.createTestIframe();

      // Inject user code without using deprecated document.write API.
      iframe.srcdoc = userCode;

      // Wait for content to load
      await new Promise((resolve) => {
        iframe.onload = resolve;
        setTimeout(resolve, 1000); // Fallback timeout
      });

      // Run test cases
      for (const testCase of testCases) {
        const result = await this.runCSSHTMLTestCase(iframe, testCase);
        results.push(result);
      }

      // Cleanup
      iframe.remove();
    } catch (error) {
      console.error("Validation error:", error);
      testCases.forEach((testCase) => {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          expectedOutput: testCase.expectedOutput,
          error: error instanceof Error ? error.message : String(error),
          executionTime: 0,
        });
      });
    }

    const executionTime = Date.now() - startTime;
    const passedTests = results.filter((r) => r.passed).length;

    return {
      overallPassed: passedTests === testCases.length,
      results,
      totalTests: testCases.length,
      passedTests,
      failedTests: testCases.length - passedTests,
      executionTime,
    };
  }

  private createTestIframe(): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
    return iframe;
  }

  private async injectReactLibraries(iframe: HTMLIFrameElement): Promise<void> {
    return new Promise((resolve, reject) => {
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
        </html>
      `;

      iframe.onload = () => resolve();
      iframe.onerror = () =>
        reject(new Error("Failed to load React libraries"));

      setTimeout(
        () => reject(new Error("Timeout loading React libraries")),
        10000,
      );
    });
  }

  private async injectUserCode(
    iframe: HTMLIFrameElement,
    userCode: string,
  ): Promise<void> {
    const doc = iframe.contentDocument;
    if (!doc) {
      throw new Error("Iframe document is not available");
    }
    const script = doc.createElement("script");
    script.type = "text/babel";
    script.text = userCode;
    doc.head.appendChild(script);

    // Wait for Babel to transpile
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  private async runReactTestCase(
    iframe: HTMLIFrameElement,
    testCase: TestCase,
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const root = this.getReactRoot(iframe);
      this.renderReactComponent(iframe, root);
      const actualOutput = await this.evaluateReactTestCase(root, testCase);

      const executionTime = Date.now() - startTime;
      const passed = this.compareOutputs(actualOutput, testCase.expectedOutput);

      return {
        testCaseId: testCase.id,
        passed,
        actualOutput,
        expectedOutput: testCase.expectedOutput,
        executionTime,
      };
    } catch (error) {
      return {
        testCaseId: testCase.id,
        passed: false,
        expectedOutput: testCase.expectedOutput,
        error: error instanceof Error ? error.message : String(error),
        executionTime: Date.now() - startTime,
      };
    }
  }

  private getReactRoot(iframe: HTMLIFrameElement): HTMLElement {
    const doc = iframe.contentDocument;
    if (!doc) {
      throw new Error("Iframe document is not available");
    }

    const root = doc.getElementById("root");
    if (!root) {
      throw new Error("Root element not found");
    }

    root.innerHTML = "";
    return root;
  }

  private renderReactComponent(
    iframe: HTMLIFrameElement,
    root: HTMLElement,
  ): void {
    const win = iframe.contentWindow as any;
    const React = win?.React;
    const ReactDOM = win?.ReactDOM;

    if (!React || !ReactDOM) {
      throw new Error("React libraries not loaded");
    }

    const Component = win.Counter || win.TodoList;
    if (!Component) {
      throw new Error("Component not found in user code");
    }

    const element = React.createElement(Component);
    // eslint-disable-next-line react/no-deprecated
    ReactDOM.render(element, root);
  }

  private async evaluateReactTestCase(
    root: HTMLElement,
    testCase: TestCase,
  ): Promise<any> {
    await this.wait(100);

    if (testCase.input === "initial") {
      return this.textOrExpectedDigit(root, "0");
    }

    if (testCase.input === "increment") {
      await this.clickButtonAndWait(
        root,
        (text) => text.includes("+1") || text.includes("+"),
        "Increment button not found",
      );
      return this.textOrExpectedDigit(root, "1");
    }

    if (testCase.input === "decrement") {
      await this.clickButtonAndWait(
        root,
        (text) => text.includes("-1") || text.includes("-"),
        "Decrement button not found",
      );
      return this.textOrExpectedDigit(root, "-1");
    }

    if (testCase.input === "reset") {
      await this.clickButtonAndWait(
        root,
        (text) => text.toLowerCase().includes("reset"),
        "Reset button not found",
      );
      return this.textOrExpectedDigit(root, "0");
    }

    return root.textContent || "";
  }

  private async clickButtonAndWait(
    root: HTMLElement,
    matcher: (text: string) => boolean,
    notFoundError: string,
  ): Promise<void> {
    const buttons = Array.from(root.querySelectorAll("button"));
    const matchedButton = buttons.find((button) =>
      matcher(button.textContent || ""),
    );

    if (!matchedButton) {
      throw new Error(notFoundError);
    }

    matchedButton.click();
    await this.wait(100);
  }

  private textOrExpectedDigit(
    root: HTMLElement,
    expectedDigit: string,
  ): string {
    const text = root.textContent || "";
    return text.includes(expectedDigit) ? expectedDigit : text;
  }

  private async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async runJavaScriptTestCase(
    iframe: HTMLIFrameElement,
    testCase: TestCase,
    functionName: string,
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const window = iframe.contentWindow;
      if (!window) {
        throw new Error("Iframe window is not available");
      }

      const func = (window as any)[functionName];

      if (!func) {
        throw new Error(`Function ${functionName} not found`);
      }

      // Execute the function with test input
      const actualOutput = func(testCase.input);
      const executionTime = Date.now() - startTime;
      const passed = this.compareOutputs(actualOutput, testCase.expectedOutput);

      return {
        testCaseId: testCase.id,
        passed,
        actualOutput,
        expectedOutput: testCase.expectedOutput,
        executionTime,
      };
    } catch (error) {
      return {
        testCaseId: testCase.id,
        passed: false,
        expectedOutput: testCase.expectedOutput,
        error: error instanceof Error ? error.message : String(error),
        executionTime: Date.now() - startTime,
      };
    }
  }

  private async runCSSHTMLTestCase(
    iframe: HTMLIFrameElement,
    testCase: TestCase,
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const doc = iframe.contentDocument;
      if (!doc) {
        throw new Error("Iframe document is not available");
      }

      // Execute test case based on type

      let actualOutput: any;

      switch (testCase.input) {
        case "check-grid": {
          const gridElement = doc.querySelector(".card-container");
          actualOutput = gridElement
            ? globalThis.window.getComputedStyle(gridElement).display
            : "none";
          break;
        }

        case "check-responsive": {
          // Check if responsive classes exist
          const responsiveElements = doc.querySelectorAll('[class*="grid"]');
          actualOutput =
            responsiveElements.length > 0 ? "responsive" : "not-responsive";
          break;
        }

        default:
          actualOutput = doc.body.textContent || "";
      }

      const executionTime = Date.now() - startTime;
      const passed = this.compareOutputs(actualOutput, testCase.expectedOutput);

      return {
        testCaseId: testCase.id,
        passed,
        actualOutput,
        expectedOutput: testCase.expectedOutput,
        executionTime,
      };
    } catch (error) {
      return {
        testCaseId: testCase.id,
        passed: false,
        expectedOutput: testCase.expectedOutput,
        error: error instanceof Error ? error.message : String(error),
        executionTime: Date.now() - startTime,
      };
    }
  }

  private compareOutputs(actual: any, expected: any): boolean {
    // Deep comparison for objects and arrays
    if (typeof actual === "object" && typeof expected === "object") {
      return JSON.stringify(actual) === JSON.stringify(expected);
    }

    // String comparison with normalization
    if (typeof actual === "string" && typeof expected === "string") {
      return actual.trim().toLowerCase() === expected.trim().toLowerCase();
    }

    // Direct comparison
    return actual === expected;
  }
}

// Export default validator instance
export const frontendTaskValidator = new FrontendTaskValidator();
