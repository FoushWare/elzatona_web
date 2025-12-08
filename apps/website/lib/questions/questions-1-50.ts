import { ReactQuestion } from './types';

export const questions0: ReactQuestion[] = [
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
}`,
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
// React.createElement('h1', null, 'Hello, World!');`,
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
</div>;`,
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
import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);


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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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

const store = createStore(reducer);`,
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
}`,
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
}`,
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
<MyComponent name="John" />`,
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
  }
  [a, b]
);

// useMemo example
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`,
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
}`,
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
}`,
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
console.log(deepEqual(obj1, obj2)); // true (same content)`,
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
}`,
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
    children
    document.getElementById('modal-root')
  );
}

// Usage
<Modal>
  <div>This content is rendered in a different DOM node</div>
</Modal>`,
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
}`,
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
  isLoading: false
  error: null
});`,
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
}`,
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
}`,
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
    }
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
    subscribe
    () => navigator.onLine
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
}`,
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
}`,
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
    todos
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
    todos
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
    todos
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
}`,
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
    todos
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
}`,
  }
];
