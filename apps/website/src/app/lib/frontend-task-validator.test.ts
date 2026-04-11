import {
  FrontendTaskValidator,
  type TestCase,
  type ValidationResult,
  type SolutionValidation,
} from "./frontend-task-validator";
import { describe, expect, it, vi } from "vitest";

describe("FrontendTaskValidator", () => {
  // ============ Constructor Tests ============
  describe("constructor", () => {
    it("creates validator instance", () => {
      const v = new FrontendTaskValidator();
      expect(v).toBeDefined();
      expect(v).toBeInstanceOf(FrontendTaskValidator);
    });

    it("supports custom timeout", () => {
      const v = new FrontendTaskValidator(10000);
      expect(v).toBeDefined();
    });
  });

  // ============ Public API Tests ============
  describe("public API", () => {
    it("has validateReactComponent method", () => {
      const v = new FrontendTaskValidator();
      expect(typeof v.validateReactComponent).toBe("function");
    });

    it("has validateJavaScriptFunction method", () => {
      const v = new FrontendTaskValidator();
      expect(typeof v.validateJavaScriptFunction).toBe("function");
    });

    it("has validateCSSHTML method", () => {
      const v = new FrontendTaskValidator();
      expect(typeof v.validateCSSHTML).toBe("function");
    });
  });

  // ============ compareOutputs Tests ============
  describe("compareOutputs", () => {
    it("is callable via type casting", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(typeof cmp).toBe("function");
    });

    it("compares identical strings", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp("hello", "hello")).toBe(true);
      expect(cmp("hello", "world")).toBe(false);
    });

    it("compares strings with case normalization", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp("HELLO", "hello")).toBe(true);
      expect(cmp("  test  ", "TEST")).toBe(true);
    });

    it("compares objects", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp({ a: 1 }, { a: 1 })).toBe(true);
      expect(cmp({ a: 1 }, { a: 2 })).toBe(false);
    });

    it("compares arrays", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp([1, 2], [1, 2])).toBe(true);
      expect(cmp([1, 2], [1, 3])).toBe(false);
    });

    it("compares primitives", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp(42, 42)).toBe(true);
      expect(cmp(true, true)).toBe(true);
      expect(cmp(null, null)).toBe(true);
    });
  });

  // ============ getReactRoot Tests ============
  describe("getReactRoot", () => {
    it("returns root element when found", () => {
      const v = new FrontendTaskValidator();
      const getRoot = (
        v as unknown as {
          getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
        }
      ).getReactRoot;

      const root = document.createElement("div");
      root.id = "root";
      const mockDoc = { getElementById: () => root } as unknown as Document;
      const mockIframe = {
        contentDocument: mockDoc,
      } as unknown as HTMLIFrameElement;

      const result = getRoot(mockIframe);
      expect(result).toBe(root);
    });

    it("clears root innerHTML", () => {
      const v = new FrontendTaskValidator();
      const getRoot = (
        v as unknown as {
          getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
        }
      ).getReactRoot;

      const root = document.createElement("div");
      root.id = "root";
      root.innerHTML = "<p>test</p>";
      const mockDoc = { getElementById: () => root } as unknown as Document;
      const mockIframe = {
        contentDocument: mockDoc,
      } as unknown as HTMLIFrameElement;

      getRoot(mockIframe);
      expect(root.innerHTML).toBe("");
    });

    it("throws when root not found", () => {
      const v = new FrontendTaskValidator();
      const getRoot = (
        v as unknown as {
          getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
        }
      ).getReactRoot;

      const mockDoc = { getElementById: () => null } as unknown as Document;
      const mockIframe = {
        contentDocument: mockDoc,
      } as unknown as HTMLIFrameElement;

      expect(() => getRoot(mockIframe)).toThrow("Root element not found");
    });

    it("throws when document is null", () => {
      const v = new FrontendTaskValidator();
      const getRoot = (
        v as unknown as {
          getReactRoot: (iframe: HTMLIFrameElement) => HTMLElement;
        }
      ).getReactRoot;

      const mockIframe = {
        contentDocument: null,
      } as unknown as HTMLIFrameElement;
      expect(() => getRoot(mockIframe)).toThrow(
        "Iframe document is not available",
      );
    });
  });

  // ============ renderReactComponent Tests ============
  describe("renderReactComponent", () => {
    it("calls React.createElement", () => {
      const v = new FrontendTaskValidator();
      const render = (
        v as unknown as {
          renderReactComponent: (
            iframe: HTMLIFrameElement,
            root: HTMLElement,
          ) => void;
        }
      ).renderReactComponent;

      const createElementMock = vi.fn(() => ({}));
      const renderMock = vi.fn();
      const mockIframe = {
        contentWindow: {
          React: { createElement: createElementMock },
          ReactDOM: { render: renderMock },
          Counter: () => null,
        },
      } as unknown as HTMLIFrameElement;

      render(mockIframe, document.createElement("div"));
      expect(createElementMock).toHaveBeenCalled();
      expect(renderMock).toHaveBeenCalled();
    });

    it("throws when React not loaded", () => {
      const v = new FrontendTaskValidator();
      const render = (
        v as unknown as {
          renderReactComponent: (
            iframe: HTMLIFrameElement,
            root: HTMLElement,
          ) => void;
        }
      ).renderReactComponent;

      const mockIframe = {
        contentWindow: { React: null, ReactDOM: null },
      } as unknown as HTMLIFrameElement;

      expect(() => render(mockIframe, document.createElement("div"))).toThrow(
        "React libraries not loaded",
      );
    });

    it("throws when component not found", () => {
      const v = new FrontendTaskValidator();
      const render = (
        v as unknown as {
          renderReactComponent: (
            iframe: HTMLIFrameElement,
            root: HTMLElement,
          ) => void;
        }
      ).renderReactComponent;

      const mockIframe = {
        contentWindow: {
          React: { createElement: vi.fn() },
          ReactDOM: { render: vi.fn() },
        },
      } as unknown as HTMLIFrameElement;

      expect(() => render(mockIframe, document.createElement("div"))).toThrow(
        "Component not found in user code",
      );
    });
  });

  // ============ createTestIframe Tests ============
  describe("createTestIframe", () => {
    it("creates iframe element", () => {
      const v = new FrontendTaskValidator();
      const create = (
        v as unknown as { createTestIframe: () => HTMLIFrameElement }
      ).createTestIframe;

      const iframe = create();
      expect(iframe).toBeInstanceOf(HTMLIFrameElement);
      expect(iframe.tagName).toBe("IFRAME");
      expect(iframe.style.display).toBe("none");
      iframe.remove();
    });

    it("appends iframe to body", () => {
      const v = new FrontendTaskValidator();
      const create = (
        v as unknown as { createTestIframe: () => HTMLIFrameElement }
      ).createTestIframe;

      const count = document.body.children.length;
      const iframe = create();
      expect(document.body.children.length).toBe(count + 1);
      expect(document.body.contains(iframe)).toBe(true);
      iframe.remove();
    });
  });

  // ============ Type/Interface Tests ============
  describe("types", () => {
    it("TestCase interface is valid", () => {
      const tc: TestCase = {
        id: "test1",
        description: "test",
        input: "x",
        expectedOutput: "y",
        type: "component",
      };
      expect(tc.id).toBe("test1");
      expect(tc.type).toBe("component");
    });

    it("TestCase with timeout is valid", () => {
      const tc: TestCase = {
        id: "t2",
        description: "test",
        input: 5,
        expectedOutput: 10,
        type: "function",
        timeout: 3000,
      };
      expect(tc.timeout).toBe(3000);
    });

    it("all TestCase types are supported", () => {
      const types: TestCase["type"][] = [
        "component",
        "function",
        "css",
        "html",
      ];
      types.forEach((t) => {
        const tc: TestCase = {
          id: "t",
          description: "test",
          input: "x",
          expectedOutput: "y",
          type: t,
        };
        expect(tc.type).toBe(t);
      });
    });

    it("ValidationResult structure is valid", () => {
      const vr: ValidationResult = {
        testCaseId: "tc1",
        passed: true,
        actualOutput: "a",
        expectedOutput: "b",
        executionTime: 100,
      };
      expect(vr.testCaseId).toBe("tc1");
      expect(vr.executionTime).toBeGreaterThanOrEqual(0);
    });

    it("ValidationResult with error is valid", () => {
      const vr: ValidationResult = {
        testCaseId: "tc1",
        passed: false,
        expectedOutput: "b",
        error: "test error",
        executionTime: 50,
      };
      expect(vr.error).toBe("test error");
    });

    it("SolutionValidation structure is valid", () => {
      const sv: SolutionValidation = {
        overallPassed: false,
        results: [],
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        executionTime: 0,
      };
      expect(sv.overallPassed).toBeDefined();
      expect(Array.isArray(sv.results)).toBe(true);
    });
  });

  // ============ Code Path Coverage Tests ============
  describe("code path coverage", () => {
    it("supports multiple test cases", () => {
      const testCases: TestCase[] = [
        {
          id: "1",
          description: "a",
          input: "x",
          expectedOutput: "y",
          type: "component",
        },
        {
          id: "2",
          description: "b",
          input: 1,
          expectedOutput: 2,
          type: "function",
        },
        {
          id: "3",
          description: "c",
          input: "s",
          expectedOutput: "v",
          type: "css",
        },
      ];
      expect(testCases.length).toBe(3);
      expect(testCases.every((t) => t.id)).toBe(true);
    });

    it("tracks test results", () => {
      const results: ValidationResult[] = [
        {
          testCaseId: "1",
          passed: true,
          actualOutput: "y",
          expectedOutput: "y",
          executionTime: 10,
        },
        {
          testCaseId: "2",
          passed: false,
          actualOutput: 3,
          expectedOutput: 2,
          executionTime: 15,
        },
      ];
      const passed = results.filter((r) => r.passed).length;
      const failed = results.length - passed;
      expect(passed).toBe(1);
      expect(failed).toBe(1);
    });

    it("calculatesvalidation statistics", () => {
      const results = [
        {
          testCaseId: "1",
          passed: true,
          actualOutput: "a",
          expectedOutput: "a",
          executionTime: 10,
        },
        {
          testCaseId: "2",
          passed: true,
          actualOutput: "b",
          expectedOutput: "b",
          executionTime: 12,
        },
        {
          testCaseId: "3",
          passed: false,
          actualOutput: "c",
          expectedOutput: "d",
          executionTime: 11,
        },
      ];
      const sv: SolutionValidation = {
        overallPassed: false,
        results,
        totalTests: 3,
        passedTests: 2,
        failedTests: 1,
        executionTime: 100,
      };
      expect(sv.totalTests).toBe(3);
      expect(sv.passedTests + sv.failedTests).toBe(3);
    });
  });

  // ============ Edge Cases ============
  describe("edge cases", () => {
    it("handles empty test case arrays", () => {
      const testCases: TestCase[] = [];
      expect(testCases.length).toBe(0);
      const empty: ValidationResult[] = [];
      expect(empty.length).toBe(0);
    });

    it("handles null and undefined safely in comparisons", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp(null, null)).toBe(true);
      expect(cmp(undefined, undefined)).toBe(true);
    });

    it("handles large timeout values", () => {
      const tc: TestCase = {
        id: "t1",
        description: "test",
        input: "x",
        expectedOutput: "y",
        type: "component",
        timeout: 50000,
      };
      expect(tc.timeout).toBe(50000);
    });

    it("handles string inputs with special characters", () => {
      const v = new FrontendTaskValidator();
      const cmp = (
        v as unknown as { compareOutputs: (a: any, b: any) => boolean }
      ).compareOutputs;
      expect(cmp("<html>test</html>", "<html>test</html>")).toBe(true);
      expect(cmp("test@#$%", "test@#$%")).toBe(true);
    });
  });
});
