export interface ReactQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  code?: string;
}

export const reactQuestions: ReactQuestion[] = [
  {
    id: 1,
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A web server framework"
    ],
    answer: "A",
    explanation: "React is an open-source front-end JavaScript library for building user interfaces based on components. It's used for handling the view layer in web and mobile applications, and allows developers to create reusable UI components and manage the state of those components efficiently.",
    code: `// Example of a simple React component

function Welcome() {
  return <h1>Hello, React!</h1>;
}`
  },
  {
    id: 2,
    question: "What is JSX?",
    options: [
      "A JavaScript extension that allows writing HTML-like code in JavaScript",
      "A new programming language",
      "A database query language",
      "A CSS framework"
    ],
    answer: "A",
    explanation: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It makes React components more readable and expressive while providing the full power of JavaScript.",
    code: `// JSX example
const element = <h1>Hello, World!</h1>;

// This gets compiled to:
// React.createElement('h1', null, 'Hello, World!');`
  },
  {
    id: 3,
    question: "What is the Virtual DOM?",
    options: [
      "An in-memory representation of the actual DOM",
      "A virtual reality interface",
      "A database system",
      "A cloud storage service"
    ],
    answer: "A",
    explanation: "The Virtual DOM is an in-memory representation of the actual DOM. React uses it to improve performance by minimizing direct manipulation of the DOM. It compares the Virtual DOM with the real DOM and only updates what has changed.",
    code: `// React efficiently updates only what changed
// Instead of re-rendering the entire page
const element = <div>
  <h1>Hello</h1>
  <p>World</p>
</div>;`
  },
  {
    id: 4,
    question: "What are React Hooks?",
    options: [
      "Functions that allow you to use state and other React features in functional components",
      "A way to connect to external APIs",
      "A type of CSS styling",
      "A database connection method"
    ],
    answer: "A",
    explanation: "React Hooks are functions that allow you to use state and other React features in functional components without writing classes. They were introduced in React 16.8 and include useState, useEffect, useContext, and more.",
    code: `// Using useState hook
import React, { useState } from 'react';

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
}`
  },
  {
    id: 5,
    question: "What is the difference between state and props?",
    options: [
      "State is internal and mutable, props are external and immutable",
      "State is external and immutable, props are internal and mutable",
      "There is no difference between state and props",
      "State is for styling, props are for data"
    ],
    answer: "A",
    explanation: "State is internal to a component and can be changed by the component itself. Props are external data passed to a component and are immutable (read-only). State triggers re-renders when changed, while props are used to pass data down the component tree.",
    code: `// Props example (immutable)
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// State example (mutable)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`
  },
  {
    id: 6,
    question: "What is useEffect hook used for?",
    options: [
      "To perform side effects in functional components",
      "To create new components",
      "To style components",
      "To connect to databases"
    ],
    answer: "A",
    explanation: "useEffect is a React Hook that lets you perform side effects in functional components. It's used for data fetching, subscriptions, or manually changing the DOM. It runs after every render by default.",
    code: `// useEffect example
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Only re-run if userId changes
  
  return <div>{user ? user.name : 'Loading...'}</div>;
}`
  },
  {
    id: 7,
    question: "What is a controlled component?",
    options: [
      "A component whose value is controlled by React state",
      "A component that controls other components",
      "A component with strict access control",
      "A component that can't be modified"
    ],
    answer: "A",
    explanation: "A controlled component is a component whose value is controlled by React state. The component's value is set by state and updated through event handlers, giving React full control over the component's behavior.",
    code: `// Controlled component example
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`
  },
  {
    id: 8,
    question: "What is the Context API used for?",
    options: [
      "To share data between components without prop drilling",
      "To create new React contexts",
      "To manage database connections",
      "To style components globally"
    ],
    answer: "A",
    explanation: "The Context API provides a way to share data between components without having to explicitly pass props through every level of the component tree. It's useful for sharing global data like themes, user authentication, or language preferences.",
    code: `// Context API example
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 9,
    question: "What is the difference between functional and class components?",
    options: [
      "Functional components use hooks, class components use lifecycle methods",
      "Functional components are faster, class components are slower",
      "Functional components can't use state, class components can",
      "There is no difference in modern React"
    ],
    answer: "A",
    explanation: "Functional components use React Hooks (useState, useEffect, etc.) for state and side effects, while class components use lifecycle methods (componentDidMount, componentDidUpdate, etc.). Functional components are generally preferred in modern React.",
    code: `// Functional component with hooks
function FunctionalComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Class component with lifecycle methods
class ClassComponent extends React.Component {
  state = { count: 0 };
  
  componentDidUpdate() {
    document.title = \`Count: \${this.state.count}\`;
  }
  
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}`
  },
  {
    id: 10,
    question: "What is React Router used for?",
    options: [
      "To handle navigation and routing in React applications",
      "To route network requests",
      "To create database routes",
      "To style routing components"
    ],
    answer: "A",
    explanation: "React Router is a library for handling navigation and routing in React applications. It allows you to create single-page applications with multiple views and enables navigation between different components without page reloads.",
    code: `// React Router example
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}`
  },
  {
    id: 11,
    question: "What is Redux used for?",
    options: [
      "To manage application state in a predictable way",
      "To reduce bundle size",
      "To speed up rendering",
      "To handle routing"
    ],
    answer: "A",
    explanation: "Redux is a predictable state container for JavaScript applications. It helps manage application state in a predictable way by using a single source of truth (store) and unidirectional data flow. It's commonly used with React for state management.",
    code: `// Redux store setup
import { createStore } from 'redux';

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);`
  },
  {
    id: 12,
    question: "What is a React Fragment?",
    options: [
      "A way to group multiple elements without adding extra DOM nodes",
      "A broken piece of code",
      "A type of component",
      "A debugging tool"
    ],
    answer: "A",
    explanation: "React Fragments allow you to group multiple elements together without adding an extra DOM node. They're useful when you need to return multiple elements from a component but don't want to wrap them in a div.",
    code: `// Using React Fragment
import React from 'react';

function List() {
  return (
    <React.Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </React.Fragment>
  );
}

// Or using shorthand syntax
function List() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </>
  );
}`
  },
  {
    id: 13,
    question: "What is the purpose of the key prop in React lists?",
    options: [
      "To help React identify which items have changed, been added, or been removed",
      "To unlock premium features",
      "To encrypt data",
      "To style list items"
    ],
    answer: "A",
    explanation: "The key prop helps React identify which items have changed, been added, or been removed in lists. It should be unique among siblings and stable across re-renders. This helps React optimize rendering performance.",
    code: `// Using key prop in lists
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
}`
  },
  {
    id: 14,
    question: "What is React.memo used for?",
    options: [
      "To memoize functional components and prevent unnecessary re-renders",
      "To remember user preferences",
      "To memorize code",
      "To create memory leaks"
    ],
    answer: "A",
    explanation: "React.memo is a higher-order component that memoizes your functional component. It prevents unnecessary re-renders by doing a shallow comparison of props. If props haven't changed, the component won't re-render.",
    code: `// Using React.memo
import React from 'react';

const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// The component will only re-render if props change
<MyComponent name="John" />`
  },
  {
    id: 15,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback is faster, useMemo is slower",
      "useCallback is for classes, useMemo is for functions",
      "There is no difference"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions and returns the same function reference if dependencies haven't changed. useMemo memoizes values and returns the same value if dependencies haven't changed. Both help optimize performance by preventing unnecessary recalculations.",
    code: `// useCallback example
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);

// useMemo example
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
  },
  {
    id: 16,
    question: "What is React.lazy used for?",
    options: [
      "To enable code splitting and lazy loading of components",
      "To make components lazy",
      "To slow down rendering",
      "To create lazy animations"
    ],
    answer: "A",
    explanation: "React.lazy enables code splitting by allowing you to dynamically import components. It helps reduce the initial bundle size by loading components only when they're needed. It must be used with Suspense for proper error handling.",
    code: `// Using React.lazy
import React, { Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`
  },
  {
    id: 17,
    question: "What is the purpose of Error Boundaries in React?",
    options: [
      "To catch JavaScript errors anywhere in the component tree and display fallback UI",
      "To create boundaries between components",
      "To handle network errors",
      "To style error messages"
    ],
    answer: "A",
    explanation: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display fallback UI instead of crashing the whole app. They catch errors during rendering, in lifecycle methods, and in constructors.",
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
}`
  },
  {
    id: 18,
    question: "What is the difference between shallow and deep comparison?",
    options: [
      "Shallow compares references, deep compares values",
      "Shallow is faster, deep is slower",
      "Shallow is for objects, deep is for arrays",
      "There is no difference"
    ],
    answer: "A",
    explanation: "Shallow comparison checks if two values have the same reference (same object in memory). Deep comparison checks if two values have the same content, even if they're different objects. React uses shallow comparison by default for performance reasons.",
    code: `// Shallow comparison
const obj1 = { name: 'John' };
const obj2 = { name: 'John' };
console.log(obj1 === obj2); // false (different references)

// Deep comparison
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
console.log(deepEqual(obj1, obj2)); // true (same content)`
  },
  {
    id: 19,
    question: "What is the purpose of the useRef hook?",
    options: [
      "To persist values between renders without causing re-renders",
      "To reference other components",
      "To create references to external libraries",
      "To style components"
    ],
    answer: "A",
    explanation: "useRef returns a mutable ref object that persists for the full lifetime of the component. It's commonly used to access DOM elements directly or to store values that don't trigger re-renders when changed.",
    code: `// Using useRef to access DOM elements
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}`
  },
  {
    id: 20,
    question: "What is React Portal used for?",
    options: [
      "To render children into a DOM node that exists outside the parent component's DOM hierarchy",
      "To create portals to other dimensions",
      "To connect to external APIs",
      "To create modal windows"
    ],
    answer: "A",
    explanation: "React Portal allows you to render children into a DOM node that exists outside the parent component's DOM hierarchy. It's commonly used for modals, tooltips, and other overlays that need to break out of their parent container.",
    code: `// Using React Portal
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    children,
    document.getElementById('modal-root')
  );
}

// Usage
<Modal>
  <div>This content is rendered in a different DOM node</div>
</Modal>`
  },
  {
    id: 21,
    question: "What is the purpose of the useReducer hook?",
    options: [
      "To manage complex state logic with a reducer function",
      "To reduce bundle size",
      "To reduce the number of re-renders",
      "To reduce memory usage"
    ],
    answer: "A",
    explanation: "useReducer is a React Hook that lets you manage complex state logic with a reducer function. It's useful when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
    code: `// useReducer example
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
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
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`
  },
  {
    id: 22,
    question: "What is the difference between useState and useReducer?",
    options: [
      "useState is for simple state, useReducer for complex state logic",
      "useState is faster than useReducer",
      "useReducer is only for arrays",
      "There is no difference"
    ],
    answer: "A",
    explanation: "useState is perfect for simple state management with primitive values. useReducer is better when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
    code: `// useState for simple state
const [count, setCount] = useState(0);

// useReducer for complex state
const [state, dispatch] = useReducer(reducer, {
  count: 0,
  isLoading: false,
  error: null
});`
  },
  {
    id: 23,
    question: "What is the purpose of the useContext hook?",
    options: [
      "To consume React Context values in functional components",
      "To create new contexts",
      "To manage component state",
      "To handle side effects"
    ],
    answer: "A",
    explanation: "useContext is a React Hook that lets you consume React Context values in functional components. It allows you to access context values without having to pass props through every level of the component tree.",
    code: `// Using useContext
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}`
  },
  {
    id: 24,
    question: "What is the purpose of the useLayoutEffect hook?",
    options: [
      "To perform side effects synchronously after DOM mutations",
      "To perform side effects asynchronously",
      "To create layout effects",
      "To handle CSS animations"
    ],
    answer: "A",
    explanation: "useLayoutEffect is similar to useEffect, but it fires synchronously after all DOM mutations. It's useful when you need to make DOM measurements or mutations that need to be applied before the browser repaints.",
    code: `// useLayoutEffect example
import React, { useLayoutEffect, useState } from 'react';

function MeasureElement() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef();

  useLayoutEffect(() => {
    setWidth(elementRef.current.offsetWidth);
  }, []);

  return (
    <div ref={elementRef}>
      Width: {width}px
    </div>
  );
}`
  },
  {
    id: 25,
    question: "What is the purpose of the useImperativeHandle hook?",
    options: [
      "To customize the instance value that is exposed to parent components when using ref",
      "To create imperative code",
      "To handle imperative animations",
      "To manage imperative state"
    ],
    answer: "A",
    explanation: "useImperativeHandle customizes the instance value that is exposed to parent components when using ref. It allows you to control what methods or properties are accessible from the parent component.",
    code: `// useImperativeHandle example
import React, { forwardRef, useImperativeHandle } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function Parent() {
  const inputRef = useRef();
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}`
  },
  {
    id: 26,
    question: "What is the purpose of the useDebugValue hook?",
    options: [
      "To display a label for custom hooks in React DevTools",
      "To debug component state",
      "To create debug logs",
      "To handle debug events"
    ],
    answer: "A",
    explanation: "useDebugValue can be used to display a label for custom hooks in React DevTools. It's useful for custom hooks that have complex state or logic that would benefit from being labeled in the DevTools.",
    code: `// useDebugValue example
import { useState, useDebugValue } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useDebugValue(isOnline ? 'Online' : 'Offline');

  // ... rest of the hook logic

  return isOnline;
}`
  },
  {
    id: 27,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to a value to avoid blocking the UI",
      "To delay component rendering",
      "To defer API calls",
      "To handle deferred state"
    ],
    answer: "A",
    explanation: "useDeferredValue lets you defer updating a part of the UI. It's useful for keeping the UI responsive during expensive updates by allowing you to show stale content while new content is being prepared.",
    code: `// useDeferredValue example
import { useState, useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  // This will re-render with the deferred value
  // while the original query is still being processed
  return <ExpensiveSearchResults query={deferredQuery} />;
}`
  },
  {
    id: 28,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent transitions",
      "To handle page transitions",
      "To manage transition animations",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition lets you mark state updates as non-urgent transitions. It's useful for keeping the UI responsive during expensive updates by allowing you to show loading states and prioritize urgent updates.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>
        Count: {count}
      </button>
    </div>
  );
}`
  },
  {
    id: 29,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility attributes",
      "To create unique component IDs",
      "To handle ID management",
      "To create unique keys"
    ],
    answer: "A",
    explanation: "useId generates a unique ID string that can be used for accessibility attributes. It's useful for creating unique IDs for form labels, ARIA attributes, and other accessibility features.",
    code: `// useId example
import { useId } from 'react';

function NameFields() {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id + "-firstName"}>First Name</label>
      <input id={id + "-firstName"} type="text" />
      
      <label htmlFor={id + "-lastName"}>Last Name</label>
      <input id={id + "-lastName"} type="text" />
    </div>
  );
}`
  },
  {
    id: 30,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync component state",
      "To handle external API calls",
      "To manage external state"
    ],
    answer: "A",
    explanation: "useSyncExternalStore lets you subscribe to external data sources. It's useful for integrating with external state management libraries or subscribing to browser APIs.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
  
  return isOnline;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}`
  },
  {
    id: 31,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM before layout effects",
      "To insert components into the DOM",
      "To handle insertion animations",
      "To manage insertion state"
    ],
    answer: "A",
    explanation: "useInsertionEffect is designed to inject styles into the DOM before layout effects fire. It's useful for CSS-in-JS libraries that need to inject styles before the browser calculates layout.",
    code: `// useInsertionEffect example
import { useInsertionEffect } from 'react';

function useCSS(rule) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.textContent = rule;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  });
  
  return rule;
}`
  },
  {
    id: 32,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 33,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 34,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 35,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 36,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 37,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 38,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 39,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 40,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 41,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 42,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 43,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 44,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 45,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 46,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 47,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 48,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 49,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 50,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 51,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 52,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 53,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 54,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 55,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 56,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 57,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 58,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 59,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 60,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 61,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 62,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 63,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 64,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 65,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 66,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 67,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 68,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 69,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 70,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 71,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 72,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 73,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 74,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 75,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 76,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 77,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 78,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 79,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 80,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 81,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 82,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 83,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 84,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 85,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 86,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 87,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 88,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 89,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 90,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 91,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 92,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 93,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 94,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 95,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data"
    ],
    answer: "A",
    explanation: "useFormState is used to manage form state and validation. It's useful for handling form data, validation errors, and form submission state.",
    code: `// useFormState example
import { useFormState } from 'react';

function ContactForm() {
  const [state, formAction] = useFormState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Validation
      if (!name || !email) {
        return { errors: { name: 'Name is required', email: 'Email is required' } };
      }
      
      // Process form
      return { success: true, message: 'Form submitted!' };
    },
    { errors: {}, success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      {state.errors.name && <p>{state.errors.name}</p>}
      <input name="email" placeholder="Email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 96,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events"
    ],
    answer: "A",
    explanation: "The use hook lets you consume promises and context in components. It's useful for handling async data and context values in a more flexible way.",
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
}

// Usage with context
function ThemedButton() {
  const theme = use(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}`
  },
  {
    id: 97,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and data. It's useful for memoizing expensive operations and avoiding unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveResult = useCache(() => {
    // Expensive computation
    return processData(data);
  }, [data]);
  
  return <div>{expensiveResult}</div>;
}`
  },
  {
    id: 98,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic lets you show optimistic updates while waiting for server responses. It's useful for providing immediate feedback to users while background operations are processing.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleAddTodo(text) {
    addOptimisticTodo({ text, id: 'temp-' + Date.now() });
    await addTodo(text);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
  },
  {
    id: 99,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events"
    ],
    answer: "A",
    explanation: "useActionState is used to manage state for server actions. It's useful for handling form submissions and other server-side operations with proper state management.",
    code: `// useActionState example
import { useActionState } from 'react';

function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const name = formData.get('name');
      const email = formData.get('email');
      
      // Server action logic here
      return { success: true, message: 'Form submitted!' };
    },
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`
  },
  {
    id: 100,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 101,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation. It's useful for handling complex form logic and validation states.",
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
}`
  },
  {
    id: 102,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for handling async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return <div>{user.name}</div>;
}`
  },
  {
    id: 103,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and avoid recalculating them unnecessarily.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 104,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders of child components, while useMemo memoizes computed values to avoid expensive recalculations.",
    code: `// useCallback vs useMemo
import { useCallback, useMemo } from 'react';

function MyComponent({ items }) {
  // Memoizes the function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  // Memoizes the computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <button onClick={() => handleClick(1)}>Click me</button>
    </div>
  );
}`
  },
  {
    id: 105,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states"
    ],
    answer: "A",
    explanation: "useDeferredValue defers updates to prevent the UI from blocking during expensive operations, improving user experience.",
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
      <ExpensiveSearchResults query={deferredQuery} />
    </div>
  );
}`
  },
  {
    id: 106,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as non-urgent, allowing React to interrupt them for more important updates.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      <p>Count: {count}</p>
    </div>
  );
}`
  },
  {
    id: 107,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders, useful for accessibility attributes and form labels.",
    code: `// useId example
import { useId } from 'react';

function MyForm() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}`
  },
  {
    id: 108,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state"
    ],
    answer: "A",
    explanation: "useSyncExternalStore allows components to subscribe to external data sources and stay in sync with them.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine
  );
}`
  },
  {
    id: 109,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles before DOM mutations, commonly used in CSS-in-JS libraries.",
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
}`
  },
  {
    id: 110,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useOptimistic allows you to show optimistic updates immediately while waiting for server confirmation.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
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
}`
  },
  {
    id: 111,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions"
    ],
    answer: "A",
    explanation: "useActionState manages the state and results of actions, particularly useful with server actions.",
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
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.success && <p>Success!</p>}
    </form>
  );
}`
  },
  {
    id: 112,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 113,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation, providing a way to handle complex form logic.",
    code: `// useFormState example
import { useFormState } from 'react';

function MyForm() {
  const [state, formAction] = useFormState(
    (prevState, formData) => {
      const errors = validateForm(formData);
      return { errors, success: Object.keys(errors).length === 0 };
    },
    { errors: {}, success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`
  },
  {
    id: 114,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context, providing a more flexible way to handle async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`
  },
  {
    id: 115,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and avoid recalculating them unnecessarily.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 116,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders of child components, while useMemo memoizes computed values to avoid expensive recalculations.",
    code: `// useCallback vs useMemo
import { useCallback, useMemo } from 'react';

function MyComponent({ items }) {
  // Memoizes the function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  // Memoizes the computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <button onClick={() => handleClick(1)}>Click me</button>
    </div>
  );
}`
  },
  {
    id: 117,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states"
    ],
    answer: "A",
    explanation: "useDeferredValue defers updates to prevent the UI from blocking during expensive operations, improving user experience.",
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
      <ExpensiveSearchResults query={deferredQuery} />
    </div>
  );
}`
  },
  {
    id: 118,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as non-urgent, allowing React to interrupt them for more important updates.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      <p>Count: {count}</p>
    </div>
  );
}`
  },
  {
    id: 119,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders, useful for accessibility attributes and form labels.",
    code: `// useId example
import { useId } from 'react';

function MyForm() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}`
  },
  {
    id: 120,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state"
    ],
    answer: "A",
    explanation: "useSyncExternalStore allows components to subscribe to external data sources and stay in sync with them.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine
  );
}`
  },
  {
    id: 121,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles before DOM mutations, commonly used in CSS-in-JS libraries.",
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
}`
  },
  {
    id: 122,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useOptimistic allows you to show optimistic updates immediately while waiting for server confirmation.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
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
}`
  },
  {
    id: 123,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions"
    ],
    answer: "A",
    explanation: "useActionState manages the state and results of actions, particularly useful with server actions.",
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
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.success && <p>Success!</p>}
    </form>
  );
}`
  },
  {
    id: 124,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 125,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation, providing a way to handle complex form logic.",
    code: `// useFormState example
import { useFormState } from 'react';

function MyForm() {
  const [state, formAction] = useFormState(
    (prevState, formData) => {
      const errors = validateForm(formData);
      return { errors, success: Object.keys(errors).length === 0 };
    },
    { errors: {}, success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`
  },
  {
    id: 126,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation. It's useful for handling complex form logic and validation states.",
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
}`
  },
  {
    id: 127,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for handling async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return <div>{user.name}</div>;
}`
  },
  {
    id: 128,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and avoid recalculating them unnecessarily.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 129,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders of child components, while useMemo memoizes computed values to avoid expensive recalculations.",
    code: `// useCallback vs useMemo
import { useCallback, useMemo } from 'react';

function MyComponent({ items }) {
  // Memoizes the function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  // Memoizes the computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <button onClick={() => handleClick(1)}>Click me</button>
    </div>
  );
}`
  },
  {
    id: 130,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states"
    ],
    answer: "A",
    explanation: "useDeferredValue defers updates to prevent the UI from blocking during expensive operations, improving user experience.",
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
      <ExpensiveSearchResults query={deferredQuery} />
    </div>
  );
}`
  },
  {
    id: 131,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as non-urgent, allowing React to interrupt them for more important updates.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      <p>Count: {count}</p>
    </div>
  );
}`
  },
  {
    id: 132,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders, useful for accessibility attributes and form labels.",
    code: `// useId example
import { useId } from 'react';

function MyForm() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}`
  },
  {
    id: 133,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state"
    ],
    answer: "A",
    explanation: "useSyncExternalStore allows components to subscribe to external data sources and stay in sync with them.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine
  );
}`
  },
  {
    id: 134,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles before DOM mutations, commonly used in CSS-in-JS libraries.",
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
}`
  },
  {
    id: 135,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useOptimistic allows you to show optimistic updates immediately while waiting for server confirmation.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
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
}`
  },
  {
    id: 136,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions"
    ],
    answer: "A",
    explanation: "useActionState manages the state and results of actions, particularly useful with server actions.",
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
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.success && <p>Success!</p>}
    </form>
  );
}`
  },
  {
    id: 137,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 138,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation, providing a way to handle complex form logic.",
    code: `// useFormState example
import { useFormState } from 'react';

function MyForm() {
  const [state, formAction] = useFormState(
    (prevState, formData) => {
      const errors = validateForm(formData);
      return { errors, success: Object.keys(errors).length === 0 };
    },
    { errors: {}, success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`
  },
  {
    id: 139,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context, providing a more flexible way to handle async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`
  },
  {
    id: 140,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache expensive computations and avoid recalculating them unnecessarily.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 141,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders of child components, while useMemo memoizes computed values to avoid expensive recalculations.",
    code: `// useCallback vs useMemo
import { useCallback, useMemo } from 'react';

function MyComponent({ items }) {
  // Memoizes the function
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);

  // Memoizes the computed value
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <button onClick={() => handleClick(1)}>Click me</button>
    </div>
  );
}`
  },
  {
    id: 142,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states"
    ],
    answer: "A",
    explanation: "useDeferredValue defers updates to prevent the UI from blocking during expensive operations, improving user experience.",
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
      <ExpensiveSearchResults query={deferredQuery} />
    </div>
  );
}`
  },
  {
    id: 143,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as non-urgent, allowing React to interrupt them for more important updates.",
    code: `// useTransition example
import { useState, useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  const handleClick = () => {
    startTransition(() => {
      setCount(c => c + 1);
    });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      <p>Count: {count}</p>
    </div>
  );
}`
  },
  {
    id: 144,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders, useful for accessibility attributes and form labels.",
    code: `// useId example
import { useId } from 'react';

function MyForm() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}`
  },
  {
    id: 145,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state"
    ],
    answer: "A",
    explanation: "useSyncExternalStore allows components to subscribe to external data sources and stay in sync with them.",
    code: `// useSyncExternalStore example
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine
  );
}`
  },
  {
    id: 146,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles before DOM mutations, commonly used in CSS-in-JS libraries.",
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
}`
  },
  {
    id: 147,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useOptimistic allows you to show optimistic updates immediately while waiting for server confirmation.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
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
}`
  },
  {
    id: 148,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions"
    ],
    answer: "A",
    explanation: "useActionState manages the state and results of actions, particularly useful with server actions.",
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
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {state.success && <p>Success!</p>}
    </form>
  );
}`
  },
  {
    id: 149,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 150,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation, providing a way to handle complex form logic.",
    code: `// useFormState example
import { useFormState } from 'react';

function MyForm() {
  const [state, formAction] = useFormState(
    (prevState, formData) => {
      const errors = validateForm(formData);
      return { errors, success: Object.keys(errors).length === 0 };
    },
    { errors: {}, success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.errors.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`
  },
  {
    id: 151,
    question: "What is the purpose of the useImperativeHandle hook?",
    options: [
      "To expose custom functions to parent components",
      "To handle imperative operations",
      "To manage component refs",
      "To handle DOM manipulations"
    ],
    answer: "A",
    explanation: "useImperativeHandle allows a child component to expose custom functions or properties to its parent component when using ref.",
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
});`
  },
  {
    id: 152,
    question: "What is the purpose of the useDebugValue hook?",
    options: [
      "To display custom labels in React DevTools",
      "To debug component state",
      "To log component values",
      "To handle debugging operations"
    ],
    answer: "A",
    explanation: "useDebugValue is used to display custom labels in React DevTools for custom hooks.",
    code: `// useDebugValue example
import { useState, useDebugValue } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}`
  },
  {
    id: 153,
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect runs synchronously after DOM mutations",
      "useEffect runs before useLayoutEffect",
      "useLayoutEffect is deprecated",
      "They are identical in functionality"
    ],
    answer: "A",
    explanation: "useLayoutEffect runs synchronously after all DOM mutations, while useEffect runs asynchronously after the browser has painted.",
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
}`
  },
  {
    id: 154,
    question: "What is the purpose of the useReducer hook?",
    options: [
      "To manage complex state logic",
      "To handle form state",
      "To manage component state",
      "To handle async operations"
    ],
    answer: "A",
    explanation: "useReducer is used to manage complex state logic that involves multiple sub-values or when the next state depends on the previous one.",
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
}`
  },
  {
    id: 155,
    question: "What is the purpose of the useContext hook?",
    options: [
      "To consume React context",
      "To create context providers",
      "To manage global state",
      "To handle component communication"
    ],
    answer: "A",
    explanation: "useContext is used to consume values from React context, allowing components to access data without prop drilling.",
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
}`
  },
  {
    id: 156,
    question: "What is the purpose of the useRef hook?",
    options: [
      "To persist values across renders",
      "To manage component state",
      "To handle DOM references",
      "To store mutable values"
    ],
    answer: "A",
    explanation: "useRef is used to persist values across renders without causing re-renders, and to access DOM elements directly.",
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
}`
  },
  {
    id: 157,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize expensive calculations",
      "To cache component renders",
      "To optimize performance",
      "To store computed values"
    ],
    answer: "A",
    explanation: "useMemo is used to memoize expensive calculations and prevent unnecessary recalculations on every render.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
}`
  },
  {
    id: 158,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To optimize child component renders",
      "To prevent unnecessary re-renders",
      "To cache function calls"
    ],
    answer: "A",
    explanation: "useCallback is used to memoize functions and prevent unnecessary re-renders of child components that depend on those functions.",
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
}`
  },
  {
    id: 159,
    question: "What is the purpose of the useState hook?",
    options: [
      "To manage component state",
      "To handle form state",
      "To store component data",
      "To manage local state"
    ],
    answer: "A",
    explanation: "useState is used to manage component state and trigger re-renders when state changes.",
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
}`
  },
  {
    id: 160,
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To handle side effects",
      "To manage component lifecycle",
      "To handle async operations",
      "To perform cleanup"
    ],
    answer: "A",
    explanation: "useEffect is used to handle side effects in functional components, such as data fetching, subscriptions, or DOM manipulations.",
    code: `// useEffect example
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}`
  },
  {
    id: 161,
    question: "What is the Virtual DOM in React?",
    options: [
      "A lightweight copy of the actual DOM",
      "A virtual representation of components",
      "A memory-efficient DOM structure",
      "A React-specific DOM implementation"
    ],
    answer: "A",
    explanation: "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize rendering performance by minimizing direct DOM manipulations.",
    code: `// Virtual DOM concept
// React creates a virtual representation of the UI
const virtualElement = {
  type: 'div',
  props: {
    children: 'Hello World'
  }
};

// Then compares it with the actual DOM
// and only updates what changed`
  },
  {
    id: 162,
    question: "What is JSX in React?",
    options: [
      "A syntax extension for JavaScript",
      "A templating language",
      "A markup language",
      "A styling system"
    ],
    answer: "A",
    explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript, making React components more readable and expressive.",
    code: `// JSX example
function Welcome() {
  return (
    <div className="welcome">
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}`
  },
  {
    id: 163,
    question: "What is the difference between props and state?",
    options: [
      "Props are read-only, state is mutable",
      "Props are passed down, state is internal",
      "Props are external, state is internal",
      "Props are immutable, state can change"
    ],
    answer: "A",
    explanation: "Props are read-only and passed from parent to child components, while state is mutable and managed internally by the component.",
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
}`
  },
  {
    id: 164,
    question: "What is a controlled component?",
    options: [
      "A component whose value is controlled by React state",
      "A component with form validation",
      "A component with event handlers",
      "A component with controlled rendering"
    ],
    answer: "A",
    explanation: "A controlled component is a form element whose value is controlled by React state, allowing React to control the input's value and handle changes.",
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
}`
  },
  {
    id: 165,
    question: "What is an uncontrolled component?",
    options: [
      "A component that manages its own state internally",
      "A component without React state",
      "A component with refs",
      "A component without event handlers"
    ],
    answer: "A",
    explanation: "An uncontrolled component manages its own state internally using refs, rather than being controlled by React state.",
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
}`
  },
  {
    id: 166,
    question: "What is the key prop in React?",
    options: [
      "A unique identifier for list items",
      "A prop for component identification",
      "A prop for performance optimization",
      "A prop for component keys"
    ],
    answer: "A",
    explanation: "The key prop is a special attribute that helps React identify which items have changed, been added, or been removed in lists.",
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
}`
  },
  {
    id: 167,
    question: "What is a Higher-Order Component (HOC)?",
    options: [
      "A function that takes a component and returns a new component",
      "A component with higher privileges",
      "A component that wraps other components",
      "A component with advanced features"
    ],
    answer: "A",
    explanation: "A Higher-Order Component is a function that takes a component and returns a new component with additional props or behavior.",
    code: `// HOC example
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);`
  },
  {
    id: 168,
    question: "What is the children prop?",
    options: [
      "A special prop that contains nested components",
      "A prop for child components",
      "A prop for component nesting",
      "A prop for component composition"
    ],
    answer: "A",
    explanation: "The children prop is a special prop that contains the content between the opening and closing tags of a component.",
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
</Container>`
  },
  {
    id: 169,
    question: "What is React Fragments?",
    options: [
      "A way to group multiple elements without adding extra nodes",
      "A component for grouping elements",
      "A way to avoid wrapper divs",
      "A React-specific element"
    ],
    answer: "A",
    explanation: "React Fragments allow you to group multiple elements together without adding an extra DOM node.",
    code: `// React Fragments example
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  );
}`
  },
  {
    id: 170,
    question: "What is React Portals?",
    options: [
      "A way to render children into a DOM node outside the parent component",
      "A component for modal dialogs",
      "A way to render outside the component tree",
      "A React feature for DOM manipulation"
    ],
    answer: "A",
    explanation: "React Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.",
    code: `// React Portals example
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.body
  );
}`
  },
  {
    id: 171,
    question: "What is React Context?",
    options: [
      "A way to share data between components without prop drilling",
      "A global state management solution",
      "A way to pass data through the component tree",
      "A React feature for data sharing"
    ],
    answer: "A",
    explanation: "React Context provides a way to share data between components without having to explicitly pass props through every level.",
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
}`
  },
  {
    id: 172,
    question: "What is React Error Boundaries?",
    options: [
      "Components that catch JavaScript errors in their child component tree",
      "A way to handle errors in React",
      "Components for error handling",
      "A React feature for error management"
    ],
    answer: "A",
    explanation: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI.",
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
}`
  },
  {
    id: 173,
    question: "What is React Suspense?",
    options: [
      "A component for handling loading states",
      "A way to suspend component rendering",
      "A component for lazy loading",
      "A React feature for async operations"
    ],
    answer: "A",
    explanation: "React Suspense is a component that lets you wrap components that might need to wait for something before they can render.",
    code: `// React Suspense example
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`
  },
  {
    id: 174,
    question: "What is React.memo?",
    options: [
      "A higher-order component for performance optimization",
      "A way to memoize components",
      "A component for preventing re-renders",
      "A React feature for optimization"
    ],
    answer: "A",
    explanation: "React.memo is a higher-order component that memoizes your component, preventing unnecessary re-renders when props haven't changed.",
    code: `// React.memo example
import { memo } from 'react';

const MyComponent = memo(function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
});

// Component will only re-render if 'name' prop changes`
  },
  {
    id: 175,
    question: "What is React.lazy?",
    options: [
      "A function for code splitting and lazy loading components",
      "A way to lazy load components",
      "A function for dynamic imports",
      "A React feature for performance optimization"
    ],
    answer: "A",
    explanation: "React.lazy is a function that enables dynamic imports and code splitting, allowing you to load components only when they are needed.",
    code: `// React.lazy example
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`
  },
  {
    id: 176,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
}`
  },
  {
    id: 177,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
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
}`
  },
  {
    id: 178,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates",
      "To handle optimistic UI",
      "To manage optimistic state",
      "To handle async operations optimistically"
    ],
    answer: "A",
    explanation: "useOptimistic is used to show optimistic updates in the UI before the actual operation completes.",
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
}`
  },
  {
    id: 179,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action results"
    ],
    answer: "A",
    explanation: "useActionState is used to manage the state of server actions, including loading states and results.",
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
}`
  },
  {
    id: 180,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 181,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context, allowing components to read from promises and context providers.",
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
}`
  },
  {
    id: 182,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache function results",
      "To manage cached data",
      "To handle caching",
      "To store cached values"
    ],
    answer: "A",
    explanation: "useCache is used to cache function results and avoid unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ id }) {
  const data = useCache(async () => {
    return await fetchExpensiveData(id);
  });

  return <div>{data}</div>;
}`
  },
  {
    id: 183,
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo memoizes values, useCallback memoizes functions",
      "useMemo is for functions, useCallback is for values",
      "They are identical in functionality",
      "useMemo is deprecated"
    ],
    answer: "A",
    explanation: "useMemo memoizes computed values, while useCallback memoizes functions to prevent unnecessary re-renders of child components.",
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
}`
  },
  {
    id: 184,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent blocking",
      "To handle deferred operations",
      "To manage deferred state",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue is used to defer updates to prevent blocking the UI, useful for handling slow operations.",
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
}`
  },
  {
    id: 185,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark updates as non-urgent",
      "To handle transitions",
      "To manage state transitions",
      "To handle async transitions"
    ],
    answer: "A",
    explanation: "useTransition is used to mark updates as non-urgent, allowing React to interrupt and defer them.",
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
}`
  },
  {
    id: 186,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle component IDs",
      "To manage unique identifiers",
      "To create stable IDs"
    ],
    answer: "A",
    explanation: "useId is used to generate unique IDs that are stable across server and client rendering.",
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
}`
  },
  {
    id: 187,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
}`
  },
  {
    id: 188,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
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
}`
  },
  {
    id: 189,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates",
      "To handle optimistic UI",
      "To manage optimistic state",
      "To handle async operations optimistically"
    ],
    answer: "A",
    explanation: "useOptimistic is used to show optimistic updates in the UI before the actual operation completes.",
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
}`
  },
  {
    id: 190,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action results"
    ],
    answer: "A",
    explanation: "useActionState is used to manage the state of server actions, including loading states and results.",
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
}`
  },
  {
    id: 191,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus provides information about the status of form submissions, useful for showing loading states.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 192,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events"
    ],
    answer: "A",
    explanation: "useFormState manages form state and validation. It's useful for handling complex form logic and validation states.",
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
}`
  },
  {
    id: 193,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context, allowing components to read from promises and context providers.",
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
}`
  },
  {
    id: 194,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache function results",
      "To manage cached data",
      "To handle caching",
      "To store cached values"
    ],
    answer: "A",
    explanation: "useCache is used to cache function results and avoid unnecessary recalculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ id }) {
  const data = useCache(async () => {
    return await fetchExpensiveData(id);
  });

  return <div>{data}</div>;
}`
  },
  {
    id: 195,
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "useMemo memoizes values, useCallback memoizes functions",
      "useMemo is for functions, useCallback is for values",
      "They are identical in functionality",
      "useMemo is deprecated"
    ],
    answer: "A",
    explanation: "useMemo memoizes computed values, while useCallback memoizes functions to prevent unnecessary re-renders of child components.",
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
}`
  },
  {
    id: 196,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent blocking",
      "To handle deferred operations",
      "To manage deferred state",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue is used to defer updates to prevent blocking the UI, useful for handling slow operations.",
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
}`
  },
  {
    id: 197,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark updates as non-urgent",
      "To handle transitions",
      "To manage state transitions",
      "To handle async transitions"
    ],
    answer: "A",
    explanation: "useTransition is used to mark updates as non-urgent, allowing React to interrupt and defer them.",
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
}`
  },
  {
    id: 198,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle component IDs",
      "To manage unique identifiers",
      "To create stable IDs"
    ],
    answer: "A",
    explanation: "useId is used to generate unique IDs that are stable across server and client rendering.",
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
}`
  },
  {
    id: 199,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
}`
  },
  {
    id: 200,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles into the DOM",
      "To handle CSS-in-JS libraries",
      "To manage style insertions",
      "To handle DOM insertions"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to inject styles into the DOM, particularly useful for CSS-in-JS libraries.",
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
}`
  },
  {
    id: 201,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 202,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 203,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 204,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 205,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 206,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 207,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 208,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 209,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 210,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  },
  {
    id: 211,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders. It's useful for accessibility attributes and form labels.",
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
}`
  },
  {
    id: 212,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
    () => navigator.onLine
  );

  return isOnline;
}`
  },
  {
    id: 213,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 214,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 215,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 216,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 217,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 218,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 219,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 220,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 221,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 222,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  },
  {
    id: 223,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders. It's useful for accessibility attributes and form labels.",
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
}`
  },
  {
    id: 224,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
    () => navigator.onLine
  );

  return isOnline;
}`
  },
  {
    id: 225,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 226,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 227,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 228,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 229,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 230,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 231,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 232,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 233,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 234,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  },
  {
    id: 235,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders. It's useful for accessibility attributes and form labels.",
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
}`
  },
  {
    id: 236,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
    () => navigator.onLine
  );

  return isOnline;
}`
  },
  {
    id: 237,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 238,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 239,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 240,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 241,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 242,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 243,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 244,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 245,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 246,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  },
  {
    id: 247,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders. It's useful for accessibility attributes and form labels.",
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
}`
  },
  {
    id: 248,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
    () => navigator.onLine
  );

  return isOnline;
}`
  },
  {
    id: 249,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 250,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 251,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 252,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 253,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 254,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 255,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 256,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 257,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 258,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  },
  {
    id: 259,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs"
    ],
    answer: "A",
    explanation: "useId generates unique IDs that are stable across re-renders. It's useful for accessibility attributes and form labels.",
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
}`
  },
  {
    id: 260,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data"
    ],
    answer: "A",
    explanation: "useSyncExternalStore is used to subscribe to external data sources and ensure consistency between server and client rendering.",
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
    () => navigator.onLine
  );

  return isOnline;
}`
  },
  {
    id: 261,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting"
    ],
    answer: "A",
    explanation: "useInsertionEffect is used to insert styles or scripts into the DOM. It's particularly useful for CSS-in-JS libraries that need to inject styles.",
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
}`
  },
  {
    id: 262,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering"
    ],
    answer: "A",
    explanation: "useOptimistic provides optimistic UI updates. It allows you to show immediate feedback while waiting for server responses.",
    code: `// useOptimistic example
import { useOptimistic } from 'react';

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function addTodo(text) {
    addOptimisticTodo({ id: Date.now(), text });
    await submitTodo(text);
  }
}`
  },
  {
    id: 263,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses"
    ],
    answer: "C",
    explanation: "useActionState manages server actions and their state. It's useful for handling form submissions and server responses.",
    code: `// useActionState example
import { useActionState } from 'react';

function MyForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const result = await submitForm(formData);
      return { ...prevState, result };
    },
    { result: null }
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}`
  },
  {
    id: 264,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events"
    ],
    answer: "A",
    explanation: "useFormStatus tracks the status of form submissions. It's useful for showing loading states and handling form submission feedback.",
    code: `// useFormStatus example
import { useFormStatus } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}`
  },
  {
    id: 265,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching"
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for data fetching.",
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
}`
  },
  {
    id: 266,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation"
    ],
    answer: "A",
    explanation: "useCache is used to cache data and computations. It helps improve performance by avoiding redundant calculations.",
    code: `// useCache example
import { useCache } from 'react';

function ExpensiveComponent({ data }) {
  const cachedResult = useCache(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <div>{cachedResult}</div>;
}`
  },
  {
    id: 267,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references"
    ],
    answer: "A",
    explanation: "useCallback memoizes functions to prevent unnecessary re-renders. It's useful for optimizing performance when passing callbacks to child components.",
    code: `// useCallback example
import { useCallback } from 'react';

function ParentComponent() {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildComponent onClick={handleClick} />;
}`
  },
  {
    id: 268,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations"
    ],
    answer: "A",
    explanation: "useMemo memoizes values to prevent expensive recalculations. It's useful for optimizing performance when dealing with expensive computations.",
    code: `// useMemo example
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
}`
  },
  {
    id: 269,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates"
    ],
    answer: "A",
    explanation: "useDeferredValue defers value updates to prevent blocking the UI. It's useful for handling slow updates without affecting user experience.",
    code: `// useDeferredValue example
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  
  return (
    <div>
      {deferredQuery ? <SearchResults query={deferredQuery} /> : null}
    </div>
  );
}`
  },
  {
    id: 270,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions"
    ],
    answer: "A",
    explanation: "useTransition marks state updates as transitions, allowing React to prioritize more urgent updates. It's useful for managing loading states.",
    code: `// useTransition example
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`
  }
];
