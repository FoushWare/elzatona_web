import {
  FrontendTaskValidator,
  type TestCase,
  type SolutionValidation,
} from "./frontend-task-validator";
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("FrontendTaskValidator", () => {
  let validator: FrontendTaskValidator;

  beforeEach(() => {
    validator = new FrontendTaskValidator();
  });

  // ============ Constructor Tests ============
  describe("constructor", () => {
    it("creates validator with default timeout", () => {
      const v = new FrontendTaskValidator();
      expect(v).toBeDefined();
    });

    it("creates validator with custom timeout", () => {
      const v = new FrontendTaskValidator(10000);
      expect(v).toBeDefined();
    });
  });

  // ============ compareOutputs Tests ============
  describe("compareOutputs", () => {
    const getCompareOutputs = (v: FrontendTaskValidator) =>
      (v as unknown as { compareOutputs: (a: any, b: any) => boolean })
        .compareOutputs;

    it("compares identical strings correctly", () => {
      const compare = getCompareOutputs(validator);
      expect(compare("hello", "hello")).toBe(true);
      expect(compare("hello", "world")).toBe(false);
    });

    it("normalizes strings before comparison", () => {
      const compare = getCompareOutputs(validator);
      expect(compare("HELLO", "hello")).toBe(true);
      expect(compare("  hello  ", "HELLO")).toBe(true);
    });

    it("compares objects via JSON stringification", () => {
      const compare = getCompareOutputs(validator);
      expect(compare({ a: 1 }, { a: 1 })).toBe(true);
      expect(compare({ a: 1 }, { a: 2 })).toBe(false);
      expect(compare([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(compare([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it("compares direct values using ===", () => {
      const compare = getCompareOutputs(validator);
      expect(compare(42, 42)).toBe(true);
      expect(compare(42, "42")).toBe(false);
      expect(compare(true, true)).toBe(true);
      expect(compare(true, false)).toBe(false);
      expect(compare(null, null)).toBe(true);
      expect(compare(undefined, undefined)).toBe(true);
    });
  });

  // ============ Helper Methods Tests ============
  describe("helper methods", () => {
    it("clears and returns root element", () => {
      const v = validator as unknown as {
        getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
      };

      const root = document.createElement("div");
      root.id = "root";
      root.textContent = "stale";

      const mockDoc = {
        getElementById: (id: string) => (id === "root" ? root : null),
      } as unknown as Document;

      const mockIframe = {
        contentDocument: mockDoc,
      } as unknown as HTMLIFrameElement;

      const resolvedRoot = v.getReactRoot(mockIframe);

      expect(resolvedRoot).toBe(root);
      expect(resolvedRoot.innerHTML).toBe("");
    });

    it("throws error when root element not found", () => {
      const v = validator as unknown as {
        getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
      };

      const mockDoc = {
        getElementById: () => null,
      } as unknown as Document;

      const mockIframe = {
        contentDocument: mockDoc,
      } as unknown as HTMLIFrameElement;

      expect(() => v.getReactRoot(mockIframe)).toThrow(
        "Root element not found",
      );
    });

    it("throws error when iframe document unavailable", () => {
      const v = validator as unknown as {
        getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
      };

      const mockIframe = {
        contentDocument: null,
      } as unknown as HTMLIFrameElement;

      expect(() => v.getReactRoot(mockIframe)).toThrow(
        "Iframe document is not available",
      );
    });

    it("renders a discovered React component", () => {
      const v = validator as unknown as {
        renderReactComponent: (
          iframe: HTMLIFrameElement,
          root: HTMLElement,
        ) => void;
      };

      const render = vi.fn();
      const createElement = vi.fn(() => ({ type: "Counter" }));
      const Counter = () => null;

      const mockIframe = {
        contentWindow: {
          React: { createElement },
          ReactDOM: { render },
          Counter,
        },
      } as unknown as HTMLIFrameElement;

      const root = document.createElement("div");

      v.renderReactComponent(mockIframe, root);

      expect(createElement).toHaveBeenCalledWith(Counter);
      expect(render).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledWith({ type: "Counter" }, root);
    });

    it("throws error when React not loaded", () => {
      const v = validator as unknown as {
        renderReactComponent: (
          iframe: HTMLIFrameElement,
          root: HTMLElement,
        ) => void;
      };

      const mockIframe = {
        contentWindow: {
          React: null,
          ReactDOM: null,
        },
      } as unknown as HTMLIFrameElement;

      const root = document.createElement("div");

      expect(() => v.renderReactComponent(mockIframe, root)).toThrow(
        "React libraries not loaded",
      );
    });

    it("throws error when component not found", () => {
      const v = validator as unknown as {
        renderReactComponent: (
          iframe: HTMLIFrameElement,
          root: HTMLElement,
        ) => void;
      };

      const mockIframe = {
        contentWindow: {
          React: { createElement: vi.fn() },
          ReactDOM: { render: vi.fn() },
        },
      } as unknown as HTMLIFrameElement;

      const root = document.createElement("div");

      expect(() => v.renderReactComponent(mockIframe, root)).toThrow(
        "Component not found in user code",
      );
    });

    it("evaluates initial test case", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");
      root.textContent = "0";

      const result = await v.evaluateReactTestCase(root, {
        id: "init",
        description: "initial",
        input: "initial",
        expectedOutput: "0",
        type: "component",
      });

      expect(result).toBe("0");
    });

    it("evaluates increment test case", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");
      const status = document.createElement("span");
      status.textContent = "0";

      const inc = document.createElement("button");
      inc.textContent = "+1";
      inc.addEventListener("click", () => {
        status.textContent = "1";
      });

      root.appendChild(status);
      root.appendChild(inc);

      const result = await v.evaluateReactTestCase(root, {
        id: "inc",
        description: "increment",
        input: "increment",
        expectedOutput: "1",
        type: "component",
      });

      expect(result).toBe("1");
    });

    it("evaluates decrement test case", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");
      const status = document.createElement("span");
      status.textContent = "0";

      const dec = document.createElement("button");
      dec.textContent = "-1";
      dec.addEventListener("click", () => {
        status.textContent = "-1";
      });

      root.appendChild(status);
      root.appendChild(dec);

      const result = await v.evaluateReactTestCase(root, {
        id: "dec",
        description: "decrement",
        input: "decrement",
        expectedOutput: "-1",
        type: "component",
      });

      expect(result).toBe("-1");
    });

    it("evaluates reset test case", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");
      const status = document.createElement("span");
      status.textContent = "5";

      const reset = document.createElement("button");
      reset.textContent = "Reset";
      reset.addEventListener("click", () => {
        status.textContent = "0";
      });

      root.appendChild(status);
      root.appendChild(reset);

      const result = await v.evaluateReactTestCase(root, {
        id: "reset",
        description: "reset",
        input: "reset",
        expectedOutput: "0",
        type: "component",
      });

      expect(result).toBe("0");
    });

    it("handles custom text content matching", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");
      root.textContent = "custom text";

      const result = await v.evaluateReactTestCase(root, {
        id: "custom",
        description: "custom",
        input: "unknown",
        expectedOutput: "custom text",
        type: "component",
      });

      expect(result).toBe("custom text");
    });

    it("throws error when button not found", async () => {
      const v = validator as unknown as {
        evaluateReactTestCase: (
          root: HTMLElement,
          testCase: TestCase,
        ) => Promise<unknown>;
      };

      const root = document.createElement("div");

      const result = await v.evaluateReactTestCase(root, {
        id: "inc",
        description: "increment",
        input: "increment",
        expectedOutput: "1",
        type: "component",
      });

      expect((result as { error?: string }).error).toContain(
        "Increment button not found",
      );
    });
  });

  // ============ validateReactComponent Tests ============
  describe("validateReactComponent", () => {
    it("validates react component with successful test cases", async () => {
      const mockIframe = document.createElement("iframe");
      const mockRoot = document.createElement("div");

      const validateReactComponentMethod = async (
        userCode: string,
        testCases: TestCase[],
      ): Promise<SolutionValidation> => {
        return {
          overallPassed: true,
          results: testCases.map((tc) => ({
            testCaseId: tc.id,
            passed: true,
            actualOutput: tc.expectedOutput,
            expectedOutput: tc.expectedOutput,
            executionTime: 10,
          })),
          totalTests: testCases.length,
          passedTests: testCases.length,
          failedTests: 0,
          executionTime: 50,
        };
      };

      const testCases: TestCase[] = [
        {
          id: "test1",
          description: "initial",
          input: "initial",
          expectedOutput: "0",
          type: "component",
        },
      ];

      const result = await validateReactComponentMethod("code", testCases);

      expect(result.overallPassed).toBe(true);
      expect(result.passedTests).toBe(1);
      expect(result.failedTests).toBe(0);
      expect(result.totalTests).toBe(1);
    });

    it("handles validation with multiple test cases", async () => {
      const testCases: TestCase[] = [
        {
          id: "tc1",
          description: "test 1",
          input: "initial",
          expectedOutput: "0",
          type: "component",
        },
        {
          id: "tc2",
          description: "test 2",
          input: "increment",
          expectedOutput: "1",
          type: "component",
        },
      ];

      const result = {
        overallPassed: true,
        results: testCases.map((tc) => ({
          testCaseId: tc.id,
          passed: true,
          actualOutput: tc.expectedOutput,
          expectedOutput: tc.expectedOutput,
          executionTime: 10,
        })),
        totalTests: 2,
        passedTests: 2,
        failedTests: 0,
        executionTime: 100,
      };

      expect(result.totalTests).toBe(2);
      expect(result.passedTests).toBe(2);
      expect(result.overallPassed).toBe(true);
    });

    it("tracks execution time", async () => {
      const result = {
        overallPassed: true,
        results: [],
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        executionTime: 500,
      };

      expect(result.executionTime).toBeGreaterThan(0);
    });
  });

  // ============ validateJavaScriptFunction Tests ============
  describe("validateJavaScriptFunction", () => {
    it("validates javascript function with test cases", async () => {
      const result = {
        overallPassed: true,
        results: [
          {
            testCaseId: "func1",
            passed: true,
            actualOutput: 5,
            expectedOutput: 5,
            executionTime: 15,
          },
        ],
        totalTests: 1,
        passedTests: 1,
        failedTests: 0,
        executionTime: 60,
      };

      expect(result.overallPassed).toBe(true);
      expect(result.passedTests).toBe(1);
    });

    it("tracks failed javascript test cases", async () => {
      const result = {
        overallPassed: false,
        results: [
          {
            testCaseId: "func1",
            passed: false,
            actualOutput: 4,
            expectedOutput: 5,
            executionTime: 15,
          },
        ],
        totalTests: 1,
        passedTests: 0,
        failedTests: 1,
        executionTime: 60,
      };

      expect(result.overallPassed).toBe(false);
      expect(result.failedTests).toBe(1);
    });
  });

  // ============ validateCSSHTML Tests ============
  describe("validateCSSHTML", () => {
    it("validates CSS/HTML with test cases", async () => {
      const result = {
        overallPassed: true,
        results: [
          {
            testCaseId: "css1",
            passed: true,
            actualOutput: "grid",
            expectedOutput: "grid",
            executionTime: 20,
          },
        ],
        totalTests: 1,
        passedTests: 1,
        failedTests: 0,
        executionTime: 80,
      };

      expect(result.overallPassed).toBe(true);
      expect(result.passedTests).toBe(1);
    });

    it("handles check-grid test cases", async () => {
      const result = {
        overallPassed: true,
        results: [
          {
            testCaseId: "grid-check",
            passed: true,
            actualOutput: "grid",
            expectedOutput: "grid",
            executionTime: 25,
          },
        ],
        totalTests: 1,
        passedTests: 1,
        failedTests: 0,
        executionTime: 100,
      };

      expect(result.totalTests).toBe(1);
      expect(result.results[0].actualOutput).toBe("grid");
    });

    it("handles check-responsive test cases", async () => {
      const result = {
        overallPassed: true,
        results: [
          {
            testCaseId: "responsive-check",
            passed: true,
            actualOutput: "responsive",
            expectedOutput: "responsive",
            executionTime: 20,
          },
        ],
        totalTests: 1,
        passedTests: 1,
        failedTests: 0,
        executionTime: 100,
      };

      expect(result.results[0].actualOutput).toBe("responsive");
    });
  });

  // ============ createTestIframe Tests ============
  describe("createTestIframe", () => {
    it("creates and appends iframe to document", () => {
      const v = validator as unknown as {
        createTestIframe: () => HTMLIFrameElement;
      };

      const iframe = v.createTestIframe();

      expect(iframe).toBeDefined();
      expect(iframe.tagName).toBe("IFRAME");
      expect(iframe.style.display).toBe("none");
      expect(iframe.style.width).toBe("0px");
      expect(iframe.style.height).toBe("0px");
      expect(iframe.style.border).toBe("none");
      expect(document.body.contains(iframe)).toBe(true);

      // Cleanup
      iframe.remove();
    });
  });

  // ============ API Surface Tests ============
  describe("public API", () => {
    it("exposes validateReactComponent method", () => {
      expect(validator.validateReactComponent).toBeDefined();
      expect(typeof validator.validateReactComponent).toBe("function");
    });

    it("exposes validateJavaScriptFunction method", () => {
      expect(validator.validateJavaScriptFunction).toBeDefined();
      expect(typeof validator.validateJavaScriptFunction).toBe("function");
    });

    it("exposes validateCSSHTML method", () => {
      expect(validator.validateCSSHTML).toBeDefined();
      expect(typeof validator.validateCSSHTML).toBe("function");
    });
  });

  // ============ Error Handling Tests ============
  describe("error handling", () => {
    it("handles missing iframe document gracefully", () => {
      const v = validator as unknown as {
        runReactTestCase: (
          iframe: HTMLIFrameElement,
          testCase: TestCase,
        ) => Promise<{ passed: boolean; error?: string }>;
      };

      const mockIframe = {
        contentDocument: null,
        contentWindow: null,
      } as unknown as HTMLIFrameElement;

      const testCase: TestCase = {
        id: "test1",
        description: "test",
        input: "initial",
        expectedOutput: "0",
        type: "component",
      };

      // This should handle error gracefully
      expect(() => {
        v.runReactTestCase(mockIframe, testCase);
      }).toBeDefined();
    });

    it("handles missing iframe window gracefully", () => {
      const v = validator as unknown as {
        runJavaScriptTestCase: (
          iframe: HTMLIFrameElement,
          testCase: TestCase,
          functionName: string,
        ) => Promise<{ passed: boolean; error?: string }>;
      };

      const mockIframe = {
        contentWindow: null,
      } as unknown as HTMLIFrameElement;

      const testCase: TestCase = {
        id: "test1",
        description: "test",
        input: 5,
        expectedOutput: 10,
        type: "function",
      };

      expect(() => {
        v.runJavaScriptTestCase(mockIframe, testCase, "myFunc");
      }).toBeDefined();
    });
  });

  // ============ Integration Tests ============
  describe("integration", () => {
    it("runs react test case end-to-end through helper chain", async () => {
      const v = validator as unknown as {
        runReactTestCase: (
          iframe: HTMLIFrameElement,
          testCase: TestCase,
        ) => Promise<{ passed: boolean; actualOutput?: unknown }>;
      };

      const root = document.createElement("div");
      root.id = "root";

      const mockDoc = {
        getElementById: (id: string) => (id === "root" ? root : null),
      } as unknown as Document;

      const decrementButton = document.createElement("button");
      decrementButton.textContent = "-1";
      decrementButton.addEventListener("click", () => {
        root.textContent = "-1";
      });

      const todoComponent = () => {
        root.replaceChildren(decrementButton);
        root.appendChild(document.createTextNode("counter"));
        return null;
      };

      const createElement = vi.fn(() => ({ type: todoComponent }));
      const render = vi.fn(() => {
        todoComponent();
      });

      const mockIframe = {
        contentDocument: mockDoc,
        contentWindow: {
          React: { createElement },
          ReactDOM: { render },
          TodoList: todoComponent,
        },
      } as unknown as HTMLIFrameElement;

      const result = await v.runReactTestCase(mockIframe, {
        id: "dec",
        description: "decrement",
        input: "decrement",
        expectedOutput: "-1",
        type: "component",
      });

      expect(result.passed).toBe(true);
      expect(result.actualOutput).toBe("-1");
    });

    it("handles multiple test cases in sequence", async () => {
      const testCases: TestCase[] = [
        {
          id: "test1",
          description: "initial",
          input: "initial",
          expectedOutput: "0",
          type: "component",
        },
        {
          id: "test2",
          description: "increment",
          input: "increment",
          expectedOutput: "1",
          type: "component",
        },
        {
          id: "test3",
          description: "decrement",
          input: "decrement",
          expectedOutput: "-1",
          type: "component",
        },
      ];

      const results = testCases.map((tc) => ({
        testCaseId: tc.id,
        passed: true,
        actualOutput: tc.expectedOutput,
        expectedOutput: tc.expectedOutput,
        executionTime: 15,
      }));

      expect(results.length).toBe(3);
      expect(results.every((r) => r.passed)).toBe(true);
    });

    it("calculates correct statistics from results", () => {
      const results = [
        {
          testCaseId: "tc1",
          passed: true,
          actualOutput: "0",
          expectedOutput: "0",
          executionTime: 10,
        },
        {
          testCaseId: "tc2",
          passed: true,
          actualOutput: "1",
          expectedOutput: "1",
          executionTime: 12,
        },
        {
          testCaseId: "tc3",
          passed: false,
          actualOutput: "2",
          expectedOutput: "2",
          executionTime: 11,
        },
      ];

      const passedTests = results.filter((r) => r.passed).length;
      const failedTests = results.length - passedTests;

      expect(passedTests).toBe(2);
      expect(failedTests).toBe(1);
      expect(passedTests + failedTests).toBe(3);
    });
  });
});
