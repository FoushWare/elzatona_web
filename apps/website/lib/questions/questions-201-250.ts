import { ReactQuestion } from './types';

export const questions4: ReactQuestion[] = [
{
    id: 201,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting",
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
}`,
  },
{
    id: 202,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering",
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
}`,
  },
{
    id: 203,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses",
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
}`,
  },
{
    id: 204,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
}`,
  },
{
    id: 205,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
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
}`,
  },
{
    id: 206,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 207,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references",
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
}`,
  },
{
    id: 208,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations",
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
}`,
  },
{
    id: 209,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates",
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
}`,
  },
{
    id: 210,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions",
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
}`,
  },
{
    id: 211,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs",
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
}`,
  },
{
    id: 212,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
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
}`,
  },
{
    id: 213,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting",
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
}`,
  },
{
    id: 214,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering",
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
}`,
  },
{
    id: 215,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses",
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
}`,
  },
{
    id: 216,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
}`,
  },
{
    id: 217,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
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
}`,
  },
{
    id: 218,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 219,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references",
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
}`,
  },
{
    id: 220,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations",
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
}`,
  },
{
    id: 221,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates",
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
}`,
  },
{
    id: 222,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions",
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
}`,
  },
{
    id: 223,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs",
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
}`,
  },
{
    id: 224,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
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
}`,
  },
{
    id: 225,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting",
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
}`,
  },
{
    id: 226,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering",
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
}`,
  },
{
    id: 227,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses",
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
}`,
  },
{
    id: 228,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
}`,
  },
{
    id: 229,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
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
}`,
  },
{
    id: 230,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 231,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references",
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
}`,
  },
{
    id: 232,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations",
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
}`,
  },
{
    id: 233,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates",
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
}`,
  },
{
    id: 234,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions",
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
}`,
  },
{
    id: 235,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs",
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
}`,
  },
{
    id: 236,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
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
}`,
  },
{
    id: 237,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting",
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
}`,
  },
{
    id: 238,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering",
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
}`,
  },
{
    id: 239,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state",
      "To handle form actions",
      "To manage server actions",
      "To handle action responses",
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
}`,
  },
{
    id: 240,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
}`,
  },
{
    id: 241,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage promises",
      "To handle data fetching",
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
}`,
  },
{
    id: 242,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache data and computations",
      "To handle caching",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 243,
    question: "What is the purpose of the useCallback hook?",
    options: [
      "To memoize functions",
      "To handle callbacks",
      "To manage function state",
      "To handle function references",
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
}`,
  },
{
    id: 244,
    question: "What is the purpose of the useMemo hook?",
    options: [
      "To memoize values",
      "To handle memoization",
      "To manage computed values",
      "To handle expensive calculations",
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
}`,
  },
{
    id: 245,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer value updates",
      "To handle deferred state",
      "To manage deferred updates",
      "To handle slow updates",
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
}`,
  },
{
    id: 246,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as transitions",
      "To handle transitions",
      "To manage transition state",
      "To handle state transitions",
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
}`,
  },
{
    id: 247,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs",
      "To handle ID generation",
      "To manage unique identifiers",
      "To handle accessibility IDs",
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
}`,
  },
{
    id: 248,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To synchronize external state",
      "To handle external subscriptions",
      "To manage external data",
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
}`,
  },
{
    id: 249,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To insert styles or scripts into the DOM",
      "To handle DOM insertions",
      "To manage CSS-in-JS libraries",
      "To handle component mounting",
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
}`,
  },
{
    id: 250,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To provide optimistic UI updates",
      "To handle optimistic state",
      "To manage optimistic data",
      "To handle optimistic rendering",
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
}`,
  },
  
];
