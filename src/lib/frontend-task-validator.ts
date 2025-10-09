// v1.0 - Enhanced solution validation system for frontend tasks

export interface TestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  type: 'function' | 'component' | 'css' | 'html';
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
  private timeout: number = 5000; // 5 seconds default timeout

  constructor(timeout: number = 5000) {
    this.timeout = timeout;
  }

  /**
   * Validate a React component solution
   */
  async validateReactComponent(
    userCode: string,
    testCases: TestCase[]
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
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Validation error:', error);
      // Add error result for all test cases
      testCases.forEach(testCase => {
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
    const passedTests = results.filter(r => r.passed).length;

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
    functionName: string
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
          functionName
        );
        results.push(result);
      }

      // Cleanup
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Validation error:', error);
      testCases.forEach(testCase => {
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
    const passedTests = results.filter(r => r.passed).length;

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
    testCases: TestCase[]
  ): Promise<SolutionValidation> {
    const results: ValidationResult[] = [];
    const startTime = Date.now();

    try {
      // Create a test iframe
      const iframe = this.createTestIframe();

      // Inject user code
      iframe.contentDocument!.write(userCode);
      iframe.contentDocument!.close();

      // Wait for content to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        setTimeout(resolve, 1000); // Fallback timeout
      });

      // Run test cases
      for (const testCase of testCases) {
        const result = await this.runCSSHTMLTestCase(iframe, testCase);
        results.push(result);
      }

      // Cleanup
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Validation error:', error);
      testCases.forEach(testCase => {
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
    const passedTests = results.filter(r => r.passed).length;

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
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    return iframe;
  }

  private async injectReactLibraries(iframe: HTMLIFrameElement): Promise<void> {
    return new Promise((resolve, reject) => {
      const doc = iframe.contentDocument!;

      // Create HTML structure
      doc.open();
      doc.write(`
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
      `);
      doc.close();

      iframe.onload = () => resolve();
      iframe.onerror = () =>
        reject(new Error('Failed to load React libraries'));

      setTimeout(
        () => reject(new Error('Timeout loading React libraries')),
        10000
      );
    });
  }

  private async injectUserCode(
    iframe: HTMLIFrameElement,
    userCode: string
  ): Promise<void> {
    const doc = iframe.contentDocument!;
    const script = doc.createElement('script');
    script.type = 'text/babel';
    script.text = userCode;
    doc.head.appendChild(script);

    // Wait for Babel to transpile
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async runReactTestCase(
    iframe: HTMLIFrameElement,
    testCase: TestCase
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const doc = iframe.contentDocument!;
      const root = doc.getElementById('root');

      if (!root) {
        throw new Error('Root element not found');
      }

      // Clear previous content
      root.innerHTML = '';

      // Render the component
      const React = (iframe.contentWindow as any).React;
      const ReactDOM = (iframe.contentWindow as any).ReactDOM;

      if (!React || !ReactDOM) {
        throw new Error('React libraries not loaded');
      }

      // Get the component from the global scope
      const Component =
        (iframe.contentWindow as any).Counter ||
        (iframe.contentWindow as any).TodoList;

      if (!Component) {
        throw new Error('Component not found in user code');
      }

      // Render component
      const element = React.createElement(Component);
      ReactDOM.render(element, root);

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 100));

      // Execute test case
      let actualOutput: any;

      switch (testCase.input) {
        case 'initial':
          // Check initial state
          const initialText = root.textContent || '';
          actualOutput = initialText.includes('0') ? '0' : initialText;
          break;

        case 'increment':
          // Find and click increment button
          const incrementBtn = Array.from(root.querySelectorAll('button')).find(
            btn =>
              btn.textContent?.includes('+1') || btn.textContent?.includes('+')
          );

          if (incrementBtn) {
            (incrementBtn as HTMLButtonElement).click();
            await new Promise(resolve => setTimeout(resolve, 100));
            const text = root.textContent || '';
            actualOutput = text.includes('1') ? '1' : text;
          } else {
            throw new Error('Increment button not found');
          }
          break;

        case 'decrement':
          // Find and click decrement button
          const decrementBtn = Array.from(root.querySelectorAll('button')).find(
            btn =>
              btn.textContent?.includes('-1') || btn.textContent?.includes('-')
          );

          if (decrementBtn) {
            (decrementBtn as HTMLButtonElement).click();
            await new Promise(resolve => setTimeout(resolve, 100));
            const text = root.textContent || '';
            actualOutput = text.includes('-1') ? '-1' : text;
          } else {
            throw new Error('Decrement button not found');
          }
          break;

        case 'reset':
          // Find and click reset button
          const resetBtn = Array.from(root.querySelectorAll('button')).find(
            btn => btn.textContent?.toLowerCase().includes('reset')
          );

          if (resetBtn) {
            (resetBtn as HTMLButtonElement).click();
            await new Promise(resolve => setTimeout(resolve, 100));
            const text = root.textContent || '';
            actualOutput = text.includes('0') ? '0' : text;
          } else {
            throw new Error('Reset button not found');
          }
          break;

        default:
          actualOutput = root.textContent || '';
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

  private async runJavaScriptTestCase(
    iframe: HTMLIFrameElement,
    testCase: TestCase,
    functionName: string
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const window = iframe.contentWindow!;
      const func = window[functionName];

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
    testCase: TestCase
  ): Promise<ValidationResult> {
    const startTime = Date.now();

    try {
      const doc = iframe.contentDocument!;

      // Execute test case based on type
      let actualOutput: any;

      switch (testCase.input) {
        case 'check-grid':
          const gridElement = doc.querySelector('.card-container');
          actualOutput = gridElement
            ? window.getComputedStyle(gridElement).display
            : 'none';
          break;

        case 'check-responsive':
          // Check if responsive classes exist
          const responsiveElements = doc.querySelectorAll('[class*="grid"]');
          actualOutput =
            responsiveElements.length > 0 ? 'responsive' : 'not-responsive';
          break;

        default:
          actualOutput = doc.body.textContent || '';
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
    if (typeof actual === 'object' && typeof expected === 'object') {
      return JSON.stringify(actual) === JSON.stringify(expected);
    }

    // String comparison with normalization
    if (typeof actual === 'string' && typeof expected === 'string') {
      return actual.trim().toLowerCase() === expected.trim().toLowerCase();
    }

    // Direct comparison
    return actual === expected;
  }
}

// Export default validator instance
export const frontendTaskValidator = new FrontendTaskValidator();
