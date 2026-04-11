import {
  FrontendTaskValidator,
  type TestCase,
} from "./frontend-task-validator";

describe("FrontendTaskValidator helper behavior", () => {
  it("clears and returns root element", () => {
    const validator = new FrontendTaskValidator() as unknown as {
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

    const resolvedRoot = validator.getReactRoot(mockIframe);

    expect(resolvedRoot).toBe(root);
    expect(resolvedRoot.innerHTML).toBe("");
  });

  it("renders a discovered React component", () => {
    const render = jest.fn();
    const createElement = jest.fn(() => ({ type: "Counter" }));
    const Counter = () => null;

    const validator = new FrontendTaskValidator() as unknown as {
      renderReactComponent: (
        iframe: HTMLIFrameElement,
        root: HTMLElement,
      ) => void;
    };

    const mockIframe = {
      contentWindow: {
        React: { createElement },
        ReactDOM: { render },
        Counter,
      },
    } as unknown as HTMLIFrameElement;

    const root = document.createElement("div");

    validator.renderReactComponent(mockIframe, root);

    expect(createElement).toHaveBeenCalledWith(Counter);
    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith({ type: "Counter" }, root);
  });

  it("evaluates increment and reset test cases", async () => {
    const validator = new FrontendTaskValidator() as unknown as {
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

    const reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.addEventListener("click", () => {
      status.textContent = "0";
    });

    root.appendChild(status);
    root.appendChild(inc);
    root.appendChild(reset);

    const incrementResult = await validator.evaluateReactTestCase(root, {
      id: "inc",
      description: "increment",
      input: "increment",
      expectedOutput: "1",
      type: "component",
    });

    const resetResult = await validator.evaluateReactTestCase(root, {
      id: "reset",
      description: "reset",
      input: "reset",
      expectedOutput: "0",
      type: "component",
    });

    expect(incrementResult).toBe("1");
    expect(resetResult).toBe("0");
  });

  it("runs react test case end-to-end through helper chain", async () => {
    const validator = new FrontendTaskValidator();

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

    const createElement = jest.fn(() => ({ type: todoComponent }));
    const render = jest.fn(() => {
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

    const result = await (
      validator as unknown as {
        runReactTestCase: (
          iframe: HTMLIFrameElement,
          testCase: TestCase,
        ) => Promise<{ passed: boolean; actualOutput?: unknown }>;
      }
    ).runReactTestCase(mockIframe, {
      id: "dec",
      description: "decrement",
      input: "decrement",
      expectedOutput: "-1",
      type: "component",
    });

    expect(result.passed).toBe(true);
    expect(result.actualOutput).toBe("-1");
  });
});
