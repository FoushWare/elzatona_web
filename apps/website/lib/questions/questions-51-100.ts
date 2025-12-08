import { ReactQuestion } from './types';

export const questions1: ReactQuestion[] = [
{
    id: 51,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 52,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 53,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 54,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 55,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 56,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 57,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 58,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 59,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 60,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 61,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 62,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 63,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 64,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 65,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 66,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 67,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 68,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 69,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 70,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 71,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 72,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 73,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 74,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 75,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 76,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 77,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 78,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 79,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 80,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 81,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 82,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 83,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 84,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 85,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 86,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 87,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 88,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 89,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 90,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 91,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 92,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 93,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 94,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
    id: 95,
    question: "What is the purpose of the useFormState hook?",
    options: [
      "To manage form state and validation",
      "To handle form events",
      "To manage form submission",
      "To handle form data",
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
    id: 96,
    question: "What is the purpose of the use hook?",
    options: [
      "To consume promises and context in components",
      "To handle component hooks",
      "To manage component state",
      "To handle component events",
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
    id: 97,
    question: "What is the purpose of the useCache hook?",
    options: [
      "To cache expensive computations and data",
      "To handle cache management",
      "To manage component cache",
      "To handle cache events",
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
    id: 98,
    question: "What is the purpose of the useOptimistic hook?",
    options: [
      "To show optimistic updates while waiting for server responses",
      "To optimize component performance",
      "To handle optimistic state",
      "To manage optimistic rendering",
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
}`,
  },
{
    id: 99,
    question: "What is the purpose of the useActionState hook?",
    options: [
      "To manage state for server actions",
      "To handle action state",
      "To manage component actions",
      "To handle action events",
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
    id: 100,
    question: "What is the purpose of the useFormStatus hook?",
    options: [
      "To track the status of form submissions",
      "To handle form state",
      "To manage form validation",
      "To handle form events",
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
  
];
