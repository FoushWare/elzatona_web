import { ReactQuestion } from "./types";

export const questions3: ReactQuestion[] = [
  {
    id: 151,
    question: "What is the purpose of the useImperativeHandle hook?",
    options: [
      "To expose custom functions to parent components",
      "To handle imperative operations",
      "To manage component refs",
      "To handle DOM manipulations",
    ],
    answer: "A",
    explanation:
      "useImperativeHandle allows a child component to expose custom functions or properties to its parent component when using ref.",
    code: `// useImperativeHandle example
import { useImperativeHandle, forwardRef } from 'react';

const ChildComponent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      // Custom focus logic
    },
    reset: () => {
      // Custom reset logic
    }
  }));

  return <input {...props} />;
});`,
  },
  {
    id: 152,
    question: "What is the purpose of the useDebugValue hook?",
    options: [
      "To display custom labels in React DevTools",
      "To debug component state",
      "To log component values",
      "To handle debugging operations",
    ],
    answer: "A",
    explanation:
      "useDebugValue is used to display custom labels in React DevTools for custom hooks.",
    code: `// useDebugValue example
import { useState, useDebugValue } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}`,
  },
  {
    id: 153,
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect runs synchronously after DOM mutations",
      "useEffect runs before useLayoutEffect",
      "useLayoutEffect is deprecated",
      "They are identical in functionality",
    ],
    answer: "A",
    explanation:
      "useLayoutEffect runs synchronously after all DOM mutations, while useEffect runs asynchronously after the browser has painted.",
    code: `// useEffect vs useLayoutEffect
import { useEffect, useLayoutEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Runs after browser paint (asynchronous)
    console.log('useEffect');
  }, []);

  useLayoutEffect(() => {
    // Runs synchronously after DOM mutations
    console.log('useLayoutEffect');
  }, []);

  return <div>Component</div>;
}`,
  },
  {
    id: 154,
    question: "What is the purpose of the useReducer hook?",
    options: [
      "To manage complex state logic",
      "To handle form state",
      "To manage component state",
      "To handle async operations",
    ],
    answer: "A",
    explanation:
      "useReducer is used to manage complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
    code: `// useReducer example
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}`,
  },
  {
    id: 155,
    question: "What is the purpose of the useContext hook?",
    options: [
      "To consume React context",
      "To create context providers",
      "To manage global state",
      "To handle component communication",
    ],
    answer: "A",
    explanation:
      "useContext is used to consume values from React context, allowing components to access data without prop drilling.",
    code: `// useContext example
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={theme}>
      Themed Button
    </button>
  );
}`,
  },
  {
    id: 156,
    question: "What is the purpose of the useRef hook?",
    options: [
      "To persist values across renders",
      "To manage component state",
      "To handle DOM references",
      "To store mutable values",
    ],
    answer: "A",
    explanation:
      "useRef is used to persist values across renders without causing re-renders, and to access DOM elements directly.",
    code: `// useRef example
import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}`,
  },
  {
    id: 157,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize expensive calculations",
      "To cache component renders",
      "To optimize performance",
      "To store computed values",
    ],
    answer: "A",
    explanation:
      "useMemo is used to memoize expensive calculations and prevent unnecessary recalculations on every render.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
}`,
  },
  {
    id: 158,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To optimize child component renders",
      "To prevent unnecessary re-renders",
      "To cache function calls",
    ],
    answer: "A",
    explanation:
      "useCallback is used to memoize functions and prevent unnecessary re-renders of child components that depend on those functions.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent({ items }) {
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <ChildComponent 
      items={items} 
      onItemClick={handleClick} 
    />
  );
}`,
  },
  {
    id: 159,
    question: "What is the purpose of the useState hook?",
    options: [
      "To manage component state",
      "To handle form state",
      "To store component data",
      "To manage local state",
    ],
    answer: "A",
    explanation:
      "useState is used to manage component state and trigger re-renders when state changes.",
    code: `// useState example
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
  },
  {
    id: 160,
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To handle side effects",
      "To manage component lifecycle",
      "To handle async operations",
      "To perform cleanup",
    ],
    answer: "A",
    explanation:
      "useEffect is used to handle side effects in functional components, such as data fetching, subscriptions, or DOM manipulations.",
    code: `// useEffect example
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}`,
  },
  {
    id: 161,
    question: "What is the Virtual DOM in React?",
    options: [
      "A lightweight copy of the actual DOM",
      "A virtual representation of components",
      "A memory-efficient DOM structure",
      "A React-specific DOM implementation",
    ],
    answer: "A",
    explanation:
      "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance by minimizing direct DOM manipulations.",
    code: `// Virtual DOM concept
// React creates a virtual representation of the UI
const virtualElement = {
  type: 'div',
  props: {
    children: 'Hello World'
  }
};

// Then compares it with the actual DOM
// and only updates what changed`,
  },
  {
    id: 162,
    question: "What is JSX in React?",
    options: [
      "A syntax extension for JavaScript",
      "A templating language",
      "A markup language",
      "A styling system",
    ],
    answer: "A",
    explanation:
      "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript, making React components more readable and expressive.",
    code: `// JSX example
function Welcome() {
  return (
    <div className="welcome">
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}`,
  },
  {
    id: 163,
    question: "What is the difference between props and state?",
    options: [
      "Props are read-only, state is mutable",
      "Props are passed down, state is internal",
      "Props are external, state is internal",
      "Props are immutable, state can change",
    ],
    answer: "A",
    explanation:
      "Props are read-only and passed from parent to child components, while state is mutable and managed internally by the component.",
    code: `// Props vs State example
function ChildComponent({ name }) { // props
  const [count, setCount] = useState(0); // state
  
  return (
    <div>
      <p>Name: {name}</p> {/* props */}
      <p>Count: {count}</p> {/* state */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
  },
  {
    id: 164,
    question: "What is a controlled component?",
    options: [
      "A component whose value is controlled by React state",
      "A component with form validation",
      "A component with event handlers",
      "A component with controlled rendering",
    ],
    answer: "A",
    explanation:
      "A controlled component is a form element whose value is controlled by React state, allowing React to control the input's value and handle changes.",
    code: `// Controlled component example
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`,
  },
  {
    id: 165,
    question: "What is an uncontrolled component?",
    options: [
      "A component that manages its own state internally",
      "A component without React state",
      "A component with refs",
      "A component without event handlers",
    ],
    answer: "A",
    explanation:
      "An uncontrolled component manages its own state internally using refs, rather than being controlled by React state.",
    code: `// Uncontrolled component example
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log('Value:', inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}`,
  },
  {
    id: 166,
    question: "What is the key prop in React?",
    options: [
      "A unique identifier for list items",
      "A prop for component identification",
      "A prop for performance optimization",
      "A prop for component keys",
    ],
    answer: "A",
    explanation:
      "The key prop is a special attribute that helps React identify which items have changed, been added, or been removed in lists.",
    code: `// Key prop example
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 167,
    question: "What is a Higher-Order Component (HOC)?",
    options: [
      "A function that takes a component and returns a new component",
      "A component with higher privileges",
      "A component that wraps other components",
      "A component with advanced features",
    ],
    answer: "A",
    explanation:
      "A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior.",
    code: `// HOC example
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);`,
  },
  {
    id: 168,
    question: "What is the children prop?",
    options: [
      "A special prop that contains nested components",
      "A prop for child components",
      "A prop for component nesting",
      "A prop for component composition",
    ],
    answer: "A",
    explanation:
      "The children prop is a special prop that contains the content between the opening and closing tags of a component.",
    code: `// Children prop example
function Container({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

// Usage
<Container>
  <h1>Title</h1>
  <p>Content</p>
</Container>`,
  },
  {
    id: 169,
    question: "What is React Fragments?",
    options: [
      "A way to group multiple elements without adding extra nodes",
      "A component for grouping elements",
      "A way to avoid wrapper divs",
      "A React-specific element",
    ],
    answer: "A",
    explanation:
      "React Fragments allow you to group multiple elements together without adding an extra DOM node.",
    code: `// React Fragments example
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  );
}`,
  },
  {
    id: 170,
    question: "What is React Portals?",
    options: [
      "A way to render children into a DOM node outside the parent component",
      "A component for modal dialogs",
      "A way to render outside the component tree",
      "A React feature for DOM manipulation",
    ],
    answer: "A",
    explanation:
      "React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.",
    code: `// React Portals example
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.body
  );
}`,
  },
  {
    id: 171,
    question: "What is React Context?",
    options: [
      "A way to share data between components without prop drilling",
      "A global state management solution",
      "A way to pass data through the component tree",
      "A React feature for data sharing",
    ],
    answer: "A",
    explanation:
      "React Context provides a way to share data between components without having to explicitly pass props through every level.",
    code: `// React Context example
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Button</button>;
}`,
  },
  {
    id: 172,
    question: "What is React Error Boundaries?",
    options: [
      "Components that catch JavaScript errors in their child component tree",
      "A way to handle errors in React",
      "Components for error handling",
      "A React feature for error management",
    ],
    answer: "A",
    explanation:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI.",
    code: `// Error Boundary example
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}`,
  },
  {
    id: 173,
    question: "What is React Suspense?",
    options: [
      "A component for handling loading states",
      "A way to suspend component rendering",
      "A component for lazy loading",
      "A React feature for async operations",
    ],
    answer: "A",
    explanation:
      "React Suspense is a component that lets you wrap components that might need to wait for something before they can render.",
    code: `// React Suspense example
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`,
  },
  {
    id: 174,
    question: "What is React.memo?",
    options: [
      "A higher-order component for performance optimization",
      "A way to memoize components",
      "A component for preventing re-renders",
      "A React feature for optimization",
    ],
    answer: "A",
    explanation:
      "React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders when props haven't changed.",
    code: `// React.memo example
import { memo } from 'react';

const MyComponent = memo(function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
});

// Component will only re-render if 'name' prop changes`,
  },
  {
    id: 175,
    question: "What is React.lazy?",
    options: [
      "A function for code splitting and lazy loading components",
      "A way to lazy load components",
      "A function for dynamic imports",
      "A React feature for performance optimization",
    ],
    answer: "A",
    explanation:
      "React.lazy is a function that enables dynamic imports and code splitting, allowing you to load components only when they are needed.",
    code: `// React.lazy example
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`,
  },
  {
    id: 176,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
    ],
    answer: "A",
    explanation:
      "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true
  );

  return isOnline;
}`,
  },
  {
    id: 177,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions",
    ],
    answer: "A",
    explanation:
      "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
    code: `// useInsertionEffect example
import { useInsertionEffect } from 'react';

function useStyles(css) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}`,
  },
  {
    id: 178,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates",
      "To handle optimistic UI",
      "To manage optimistic state",
      "To handle async operations optimistically",
    ],
    answer: "A",
    explanation:
      "useOptimistic is used to show optimistic updates in the UI before the actual operation completes.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await saveTodo(text);
  };

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 179,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action results",
    ],
    answer: "A",
    explanation:
      "useActionState is used to manage the state of server actions, including loading states and results.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { success: true, data: result };
    },
    { success: false, data: null }
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`,
  },
  {
    id: 180,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
    ],
    answer: "A",
    explanation:
      "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`,
  },
  {
    id: 181,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
    ],
    answer: "A",
    explanation:
      "The use hook is used to consume promises and context, allowing components to read from promises and context providers.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
  },
  {
    id: 182,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache function results",
      "To manage cached data",
      "To handle caching",
      "To store cached values",
    ],
    answer: "A",
    explanation:
      "useCache is used to cache function results and avoid unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ id }) {
  const data = useCache(async () => {
    return await fetchExpensiveData(id);
  });

  return <div>{data}</div>;
}`,
  },
  {
    id: 183,
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo memoizes values, useCallback memoizes functions",
      "useMemo is for functions, useCallback is for values",
      "They are identical in functionality",
      "useMemo is deprecated",
    ],
    answer: "A",
    explanation:
      "useMemo memoizes computed values, while useCallback memoizes functions to prevent unnecessary re-renders of child components.",
    code: `// useMemo vs useCallback example
import { useMemo, useCallback } from 'react';

function ParentComponent({ items }) {
  // useMemo - memoizes computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  // useCallback - memoizes function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <ChildComponent onItemClick={handleClick} />
    </div>
  );
}`,
  },
  {
    id: 184,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent blocking",
      "To handle deferred operations",
      "To manage deferred state",
      "To handle slow updates",
    ],
    answer: "A",
    explanation:
      "useDeferredValue is used to defer updates to prevent blocking the UI, useful for handling slow operations.",
    code: `// useDeferredValue example
import { useState, useDeferredValue } from 'react';

function SearchResults({ query }) {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SlowList query={deferredQuery} />
    </div>
  );
}`,
  },
  {
    id: 185,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark updates as non-urgent",
      "To handle transitions",
      "To manage state transitions",
      "To handle async transitions",
    ],
    answer: "A",
    explanation:
      "useTransition is used to mark updates as non-urgent, allowing React to interrupt and defer them.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      {isPending && <div>Loading...</div>}
      <div>Count: {count}</div>
    </div>
  );
}`,
  },
  {
    id: 186,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle component IDs",
      "To manage unique identifiers",
      "To create stable IDs",
    ],
    answer: "A",
    explanation:
      "useId is used to generate unique IDs that are stable across server and client rendering.",
    code: `// useId example
import { useId } from 'react';

function FormField({ label }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}`,
  },
  {
    id: 187,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
    ],
    answer: "A",
    explanation:
      "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true
  );

  return isOnline;
}`,
  },
  {
    id: 188,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions",
    ],
    answer: "A",
    explanation:
      "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
    code: `// useInsertionEffect example
import { useInsertionEffect } from 'react';

function useStyles(css) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}`,
  },
  {
    id: 189,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates",
      "To handle optimistic UI",
      "To manage optimistic state",
      "To handle async operations optimistically",
    ],
    answer: "A",
    explanation:
      "useOptimistic is used to show optimistic updates in the UI before the actual operation completes.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await saveTodo(text);
  };

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 190,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action results",
    ],
    answer: "A",
    explanation:
      "useActionState is used to manage the state of server actions, including loading states and results.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { success: true, data: result };
    },
    { success: false, data: null }
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`,
  },
  {
    id: 191,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
    ],
    answer: "A",
    explanation:
      "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`,
  },
  {
    id: 192,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
    ],
    answer: "A",
    explanation:
      "useFormState manages form state and validation. It's useful for handling complex form logic and validation states.",
    code: `// useFormState example
import { useFormState } from 'react';

function MyForm() {
  const [state, formAction] = useFormState(validateForm, {
    message: null,
    errors: {}
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors?.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
  },
  {
    id: 193,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
    ],
    answer: "A",
    explanation:
      "The use hook is used to consume promises and context, allowing components to read from promises and context providers.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
  },
  {
    id: 194,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache function results",
      "To manage cached data",
      "To handle caching",
      "To store cached values",
    ],
    answer: "A",
    explanation:
      "useCache is used to cache function results and avoid unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ id }) {
  const data = useCache(async () => {
    return await fetchExpensiveData(id);
  });

  return <div>{data}</div>;
}`,
  },
  {
    id: 195,
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo memoizes values, useCallback memoizes functions",
      "useMemo is for functions, useCallback is for values",
      "They are identical in functionality",
      "useMemo is deprecated",
    ],
    answer: "A",
    explanation:
      "useMemo memoizes computed values, while useCallback memoizes functions to prevent unnecessary re-renders of child components.",
    code: `// useMemo vs useCallback example
import { useMemo, useCallback } from 'react';

function ParentComponent({ items }) {
  // useMemo - memoizes computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  // useCallback - memoizes function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <ChildComponent onItemClick={handleClick} />
    </div>
  );
}`,
  },
  {
    id: 196,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent blocking",
      "To handle deferred operations",
      "To manage deferred state",
      "To handle slow updates",
    ],
    answer: "A",
    explanation:
      "useDeferredValue is used to defer updates to prevent blocking the UI, useful for handling slow operations.",
    code: `// useDeferredValue example
import { useState, useDeferredValue } from 'react';

function SearchResults({ query }) {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SlowList query={deferredQuery} />
    </div>
  );
}`,
  },
  {
    id: 197,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark updates as non-urgent",
      "To handle transitions",
      "To manage state transitions",
      "To handle async transitions",
    ],
    answer: "A",
    explanation:
      "useTransition is used to mark updates as non-urgent, allowing React to interrupt and defer them.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      {isPending && <div>Loading...</div>}
      <div>Count: {count}</div>
    </div>
  );
}`,
  },
  {
    id: 198,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle component IDs",
      "To manage unique identifiers",
      "To create stable IDs",
    ],
    answer: "A",
    explanation:
      "useId is used to generate unique IDs that are stable across server and client rendering.",
    code: `// useId example
import { useId } from 'react';

function FormField({ label }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}`,
  },
  {
    id: 199,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
    ],
    answer: "A",
    explanation:
      "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true
  );

  return isOnline;
}`,
  },
  {
    id: 200,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions",
    ],
    answer: "A",
    explanation:
      "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
    code: `// useInsertionEffect example
import { useInsertionEffect } from 'react';

function useStyles(css) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}`,
  },
];
