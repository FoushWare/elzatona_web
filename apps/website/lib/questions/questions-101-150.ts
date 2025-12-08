import { ReactQuestion } from './types';

export const questions2: ReactQuestion[] = [
{
    id: 101,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
{
    id: 102,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects",
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for handling async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return <div>{user.name}</div>;
}`,
  },
{
    id: 103,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 104,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only",
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
}`,
  },
{
    id: 105,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states",
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
}`,
  },
{
    id: 106,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 107,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs",
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
}`,
  },
{
    id: 108,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state",
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
}`,
  },
{
    id: 109,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates",
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
}`,
  },
{
    id: 110,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 111,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions",
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
}`,
  },
{
    id: 112,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events",
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
}`,
  },
{
    id: 113,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
{
    id: 114,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects",
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
}`,
  },
{
    id: 115,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 116,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only",
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
}`,
  },
{
    id: 117,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states",
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
}`,
  },
{
    id: 118,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 119,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs",
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
}`,
  },
{
    id: 120,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state",
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
}`,
  },
{
    id: 121,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates",
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
}`,
  },
{
    id: 122,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 123,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions",
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
}`,
  },
{
    id: 124,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events",
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
}`,
  },
{
    id: 125,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
{
    id: 126,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
{
    id: 127,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects",
    ],
    answer: "A",
    explanation: "The use hook is used to consume promises and context. It's a more flexible alternative to useEffect for handling async operations.",
    code: `// use hook example
import { use } from 'react';

function UserProfile({ userId }) {
  const user = use(fetchUser(userId));
  
  return <div>{user.name}</div>;
}`,
  },
{
    id: 128,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 129,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only",
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
}`,
  },
{
    id: 130,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states",
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
}`,
  },
{
    id: 131,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 132,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs",
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
}`,
  },
{
    id: 133,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state",
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
}`,
  },
{
    id: 134,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates",
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
}`,
  },
{
    id: 135,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 136,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions",
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
}`,
  },
{
    id: 137,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events",
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
}`,
  },
{
    id: 138,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
{
    id: 139,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context",
      "To handle async operations",
      "To manage state",
      "To handle side effects",
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
}`,
  },
{
    id: 140,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations",
      "To store data in memory",
      "To manage cache state",
      "To handle cache invalidation",
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
}`,
  },
{
    id: 141,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions, useMemo memoizes values",
      "useCallback memoizes values, useMemo memoizes functions",
      "They are identical in functionality",
      "useCallback is for async functions only",
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
}`,
  },
{
    id: 142,
    question: "What is the purpose of the useDeferredValue hook?",
    options: [
      "To defer updates to prevent UI blocking",
      "To delay state updates",
      "To handle async operations",
      "To manage loading states",
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
}`,
  },
{
    id: 143,
    question: "What is the purpose of the useTransition hook?",
    options: [
      "To mark state updates as non-urgent",
      "To handle page transitions",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 144,
    question: "What is the purpose of the useId hook?",
    options: [
      "To generate unique IDs for accessibility",
      "To create random IDs",
      "To manage component IDs",
      "To handle form IDs",
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
}`,
  },
{
    id: 145,
    question: "What is the purpose of the useSyncExternalStore hook?",
    options: [
      "To subscribe to external data sources",
      "To sync with localStorage",
      "To handle external APIs",
      "To manage external state",
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
}`,
  },
{
    id: 146,
    question: "What is the purpose of the useInsertionEffect hook?",
    options: [
      "To inject styles before DOM mutations",
      "To handle DOM insertions",
      "To manage CSS-in-JS",
      "To handle style updates",
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
}`,
  },
{
    id: 147,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates before server confirmation",
      "To handle optimistic UI updates",
      "To manage loading states",
      "To handle async operations",
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
}`,
  },
{
    id: 148,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage action state and results",
      "To handle form actions",
      "To manage server actions",
      "To handle async actions",
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
}`,
  },
{
    id: 149,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track form submission status",
      "To handle form validation",
      "To manage form state",
      "To handle form events",
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
}`,
  },
{
    id: 150,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form submissions",
      "To track form field changes",
      "To manage form events",
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
}`,
  },
  
];
