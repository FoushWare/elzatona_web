// v1.0 - Script to seed frontend tasks for testing React developers

import { AdminFirestoreHelper, COLLECTIONS } from '../lib/firebase-admin';
import { FrontendTask } from '../types/admin';

// React Developer Test Questions
const reactFrontendTasks: FrontendTask[] = [
  {
    id: 'counter-component',
    title: 'Counter Component',
    description:
      'Create a React counter component with increment, decrement, and reset functionality. The component should display the current count and have three buttons.',
    category: 'React',
    difficulty: 'easy',
    estimatedTime: 15,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a functional React component called Counter
2. Use useState hook to manage count state
3. Display the current count value
4. Add increment button (+1)
5. Add decrement button (-1)
6. Add reset button (set to 0)
7. Style the component appropriately
8. Handle edge cases (negative numbers are allowed)
    `,
    hints: [
      "Use React's useState hook for state management",
      'Create three separate functions for increment, decrement, and reset',
      'Use onClick handlers for button interactions',
      'Consider using CSS classes for styling',
    ],
    solution: `
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="button-group">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;
    `,
    starterCode: `
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // TODO: Implement increment, decrement, and reset functions
  // TODO: Add buttons with onClick handlers
  // TODO: Display the count value

  return (
    <div>
      <h2>Counter: {count}</h2>
      {/* Add your buttons here */}
    </div>
  );
};

export default Counter;
    `,
    testCases: [
      {
        id: 'test-1',
        description: 'Initial state should be 0',
        input: 'initial',
        expectedOutput: '0',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'test-2',
        description: 'Increment should increase count by 1',
        input: 'increment',
        expectedOutput: '1',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'test-3',
        description: 'Decrement should decrease count by 1',
        input: 'decrement',
        expectedOutput: '-1',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'test-4',
        description: 'Reset should set count to 0',
        input: 'reset',
        expectedOutput: '0',
        type: 'component',
        timeout: 1000,
      },
    ],
    tags: ['react', 'hooks', 'state', 'beginner'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Todo List Component',
    description:
      'Build a complete Todo List application with add, delete, and toggle completion functionality. Include input validation and proper state management.',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 45,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a TodoList component
2. Use useState to manage todos array
3. Each todo should have: id, text, completed status
4. Add functionality to create new todos
5. Add functionality to delete todos
6. Add functionality to toggle todo completion
7. Display todos in a list format
8. Show completed todos with strikethrough
9. Add input validation (non-empty text)
10. Handle edge cases (empty list, duplicate todos)
    `,
    hints: [
      'Use an array of objects to store todos',
      'Generate unique IDs for each todo (use Date.now() or Math.random())',
      'Use map() to render the list of todos',
      'Use conditional styling for completed todos',
      'Implement proper form handling for adding todos',
    ],
    solution: `
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
    `,
    starterCode: `
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // TODO: Implement addTodo function
  // TODO: Implement deleteTodo function  
  // TODO: Implement toggleTodo function
  // TODO: Add input field and button for adding todos
  // TODO: Render the list of todos
  // TODO: Add delete and toggle functionality to each todo

  return (
    <div>
      <h2>Todo List</h2>
      {/* Add your todo list implementation here */}
    </div>
  );
};

export default TodoList;
    `,
    testCases: [
      {
        id: 'todo-test-1',
        description: 'Should add a new todo',
        input: "Add todo: 'Learn React'",
        expectedOutput: "Todo 'Learn React' should appear in list",
        type: 'component',
        timeout: 2000,
      },
      {
        id: 'todo-test-2',
        description: 'Should not add empty todos',
        input: "Add todo: ''",
        expectedOutput: 'No empty todo should be added',
        type: 'component',
        timeout: 2000,
      },
      {
        id: 'todo-test-3',
        description: 'Should toggle todo completion',
        input: 'Toggle todo completion',
        expectedOutput: 'Todo should show strikethrough when completed',
        type: 'component',
        timeout: 2000,
      },
      {
        id: 'todo-test-4',
        description: 'Should delete todo',
        input: 'Delete todo',
        expectedOutput: 'Todo should be removed from list',
        type: 'component',
        timeout: 2000,
      },
    ],
    tags: ['react', 'hooks', 'state', 'forms', 'intermediate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'User Profile Form',
    description:
      'Create a user profile form with validation, controlled inputs, and form submission handling. Include fields for name, email, age, and bio.',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 30,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a UserProfileForm component
2. Include form fields: name, email, age, bio
3. Implement controlled inputs with useState
4. Add form validation (required fields, email format, age range)
5. Display validation errors
6. Handle form submission
7. Show success message after submission
8. Reset form after successful submission
9. Use proper HTML form elements
10. Implement proper TypeScript types
    `,
    hints: [
      'Use controlled components with value and onChange',
      'Create a validation function to check form data',
      'Use conditional rendering to show validation errors',
      'Prevent default form submission behavior',
      'Use proper input types (email, number, text)',
    ],
    solution: `
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  age: string;
  bio: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  bio?: string;
}

const UserProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    bio: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', age: '', bio: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Profile Updated Successfully!</h2>
        <p>Your profile has been saved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>User Profile Form</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age *</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          max="120"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio *</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className={errors.bio ? 'error' : ''}
        />
        {errors.bio && <span className="error-message">{errors.bio}</span>}
      </div>

      <button type="submit">Save Profile</button>
    </form>
  );
};

export default UserProfileForm;
    `,
    starterCode: `
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  age: string;
  bio: string;
}

const UserProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    bio: ''
  });

  // TODO: Add form validation
  // TODO: Add error state management
  // TODO: Implement handleSubmit function
  // TODO: Implement handleChange function
  // TODO: Add form fields with proper validation
  // TODO: Display validation errors
  // TODO: Handle form submission

  return (
    <form>
      <h2>User Profile Form</h2>
      {/* Add your form implementation here */}
    </form>
  );
};

export default UserProfileForm;
    `,
    testCases: [
      {
        description: 'Should validate required fields',
        input: 'Submit empty form',
        expectedOutput: 'Should show validation errors for all required fields',
      },
      {
        description: 'Should validate email format',
        input: "Enter invalid email: 'test'",
        expectedOutput: 'Should show email validation error',
      },
      {
        description: 'Should validate age range',
        input: 'Enter age: 150',
        expectedOutput: 'Should show age validation error',
      },
      {
        description: 'Should submit valid form',
        input: 'Enter valid data and submit',
        expectedOutput: 'Should show success message and reset form',
      },
    ],
    tags: ['react', 'forms', 'validation', 'typescript', 'intermediate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'API Data Fetching Component',
    description:
      'Create a component that fetches data from an API, handles loading states, error states, and displays the data in a user-friendly format.',
    category: 'React',
    difficulty: 'hard',
    estimatedTime: 60,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a DataFetcher component
2. Use useEffect and useState hooks
3. Fetch data from JSONPlaceholder API (https://jsonplaceholder.typicode.com/posts)
4. Handle loading state (show spinner)
5. Handle error state (show error message)
6. Display fetched data in a list format
7. Add retry functionality for failed requests
8. Implement proper cleanup in useEffect
9. Use TypeScript interfaces for API response
10. Add proper error boundaries
    `,
    hints: [
      'Use async/await with fetch API',
      'Create separate state for loading, error, and data',
      'Use useEffect with empty dependency array for initial fetch',
      'Implement proper error handling with try/catch',
      'Use conditional rendering for different states',
    ],
    solution: `
import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const DataFetcher = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const data = await response.json();
      setPosts(data.slice(0, 10)); // Limit to first 10 posts
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRetry = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Posts</h3>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h2>Posts from API</h2>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
          </div>
        ))}
      </div>
      <button onClick={handleRetry} className="refresh-btn">
        Refresh Posts
      </button>
    </div>
  );
};

export default DataFetcher;
    `,
    starterCode: `
import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const DataFetcher = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement fetchPosts function
  // TODO: Add useEffect to fetch data on component mount
  // TODO: Handle loading state
  // TODO: Handle error state
  // TODO: Display fetched data
  // TODO: Add retry functionality
  // TODO: Implement proper cleanup

  return (
    <div>
      <h2>Posts from API</h2>
      {/* Add your data fetching implementation here */}
    </div>
  );
};

export default DataFetcher;
    `,
    testCases: [
      {
        description: 'Should show loading state initially',
        input: 'Component mounts',
        expectedOutput: 'Should display loading spinner',
      },
      {
        description: 'Should fetch and display posts',
        input: 'API call succeeds',
        expectedOutput: 'Should display list of posts',
      },
      {
        description: 'Should handle API errors',
        input: 'API call fails',
        expectedOutput: 'Should display error message with retry button',
      },
      {
        description: 'Should retry on button click',
        input: 'Click retry button',
        expectedOutput: 'Should attempt to fetch data again',
      },
    ],
    tags: ['react', 'hooks', 'api', 'async', 'error-handling', 'advanced'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'Custom Hook for Local Storage',
    description:
      'Create a custom React hook that manages localStorage with automatic serialization/deserialization, error handling, and TypeScript support.',
    category: 'React',
    difficulty: 'hard',
    estimatedTime: 40,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a custom hook called useLocalStorage
2. Accept key and initial value as parameters
3. Return current value and setter function
4. Handle JSON serialization/deserialization automatically
5. Handle localStorage errors gracefully
6. Provide TypeScript generics for type safety
7. Sync with localStorage changes from other tabs
8. Handle SSR compatibility (no localStorage on server)
9. Include proper cleanup
10. Add comprehensive error handling
    `,
    hints: [
      'Use useState and useEffect hooks',
      'Handle JSON.parse/JSON.stringify for serialization',
      'Use try/catch for localStorage operations',
      'Add window event listener for storage changes',
      'Check if window is defined for SSR compatibility',
    ],
    solution: `
import { useState, useEffect, useCallback } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  // Listen for changes to localStorage from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(\`Error parsing localStorage value for key "\${key}":\`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue] as const;
}

export default useLocalStorage;

// Example usage:
/*
const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', '');
  const [count, setCount] = useLocalStorage('count', 0);
  const [user, setUser] = useLocalStorage('user', { id: 0, name: '' });

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter name"
      />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <button onClick={() => setUser({ id: 1, name: 'John' })}>
        Set User
      </button>
    </div>
  );
};
*/
    `,
    starterCode: `
import { useState, useEffect, useCallback } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // TODO: Initialize state with value from localStorage
  // TODO: Handle SSR compatibility (check if window is defined)
  // TODO: Handle JSON parsing errors
  // TODO: Create setValue function that updates both state and localStorage
  // TODO: Add storage event listener for cross-tab synchronization
  // TODO: Implement proper cleanup
  // TODO: Add comprehensive error handling

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
    `,
    testCases: [
      {
        description: 'Should initialize with localStorage value',
        input: 'Component mounts with existing localStorage data',
        expectedOutput: 'Should use stored value as initial state',
      },
      {
        description: 'Should fallback to initial value on error',
        input: 'localStorage contains invalid JSON',
        expectedOutput: 'Should use initial value and log error',
      },
      {
        description: 'Should update localStorage when state changes',
        input: 'Call setValue function',
        expectedOutput: 'Should update both state and localStorage',
      },
      {
        description: 'Should sync with other tabs',
        input: 'localStorage changes in another tab',
        expectedOutput: 'Should update state to match new value',
      },
    ],
    tags: ['react', 'hooks', 'localStorage', 'typescript', 'advanced'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Additional JavaScript/TypeScript tasks
const javascriptTasks: FrontendTask[] = [
  {
    title: 'Array Manipulation Functions',
    description:
      'Implement common array manipulation functions including map, filter, reduce, and find. Test your implementation with various data types.',
    category: 'JavaScript',
    difficulty: 'medium',
    estimatedTime: 30,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Implement a custom map function
2. Implement a custom filter function
3. Implement a custom reduce function
4. Implement a custom find function
5. Each function should work with arrays of any type
6. Include proper TypeScript typing
7. Handle edge cases (empty arrays, null/undefined)
8. Test with different data types (numbers, strings, objects)
    `,
    hints: [
      'Use for loops or forEach for iteration',
      'Return new arrays for map and filter',
      'Use accumulator pattern for reduce',
      'Add proper TypeScript generics',
      'Handle edge cases gracefully',
    ],
    solution: `
// Custom Array Functions Implementation

// Custom map function
function customMap<T, U>(array: T[], callback: (item: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}

// Custom filter function
function customFilter<T>(array: T[], callback: (item: T, index: number) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
}

// Custom reduce function
function customReduce<T, U>(
  array: T[], 
  callback: (accumulator: U, current: T, index: number) => U, 
  initialValue: U
): U {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i);
  }
  return accumulator;
}

// Custom find function
function customFind<T>(array: T[], callback: (item: T, index: number) => boolean): T | undefined {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      return array[i];
    }
  }
  return undefined;
}

// Test the functions
const numbers = [1, 2, 3, 4, 5];
const strings = ['hello', 'world', 'javascript'];

console.log('Map:', customMap(numbers, x => x * 2));
console.log('Filter:', customFilter(numbers, x => x > 2));
console.log('Reduce:', customReduce(numbers, (acc, curr) => acc + curr, 0));
console.log('Find:', customFind(numbers, x => x > 3));
    `,
    starterCode: `
// TODO: Implement custom map function
function customMap<T, U>(array: T[], callback: (item: T, index: number) => U): U[] {
  // Your implementation here
}

// TODO: Implement custom filter function
function customFilter<T>(array: T[], callback: (item: T, index: number) => boolean): T[] {
  // Your implementation here
}

// TODO: Implement custom reduce function
function customReduce<T, U>(
  array: T[], 
  callback: (accumulator: U, current: T, index: number) => U, 
  initialValue: U
): U {
  // Your implementation here
}

// TODO: Implement custom find function
function customFind<T>(array: T[], callback: (item: T, index: number) => boolean): T | undefined {
  // Your implementation here
}

// Test your functions
const numbers = [1, 2, 3, 4, 5];
console.log('Map:', customMap(numbers, x => x * 2));
console.log('Filter:', customFilter(numbers, x => x > 2));
console.log('Reduce:', customReduce(numbers, (acc, curr) => acc + curr, 0));
console.log('Find:', customFind(numbers, x => x > 3));
    `,
    testCases: [
      {
        description: 'Map should transform each element',
        input: '[1,2,3] with x => x * 2',
        expectedOutput: '[2,4,6]',
      },
      {
        description: 'Filter should return matching elements',
        input: '[1,2,3,4,5] with x => x > 2',
        expectedOutput: '[3,4,5]',
      },
      {
        description: 'Reduce should accumulate values',
        input: '[1,2,3] with sum',
        expectedOutput: '6',
      },
      {
        description: 'Find should return first match',
        input: '[1,2,3,4,5] with x => x > 3',
        expectedOutput: '4',
      },
    ],
    tags: ['javascript', 'arrays', 'functional-programming', 'typescript'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// CSS/HTML tasks
const cssTasks: FrontendTask[] = [
  {
    title: 'Responsive Card Layout',
    description:
      'Create a responsive card layout using CSS Grid and Flexbox. The layout should adapt to different screen sizes and display cards in a grid format.',
    category: 'CSS',
    difficulty: 'medium',
    estimatedTime: 25,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: `
1. Create a responsive card layout
2. Use CSS Grid for the main layout
3. Use Flexbox for card internal layout
4. Cards should be responsive (1 column on mobile, 2 on tablet, 3 on desktop)
5. Add hover effects and transitions
6. Include proper spacing and typography
7. Make it accessible
8. Use modern CSS features
    `,
    hints: [
      'Use CSS Grid with auto-fit and minmax',
      'Use Flexbox for card content alignment',
      'Add media queries for different breakpoints',
      'Use CSS custom properties for consistent spacing',
      'Add smooth transitions for hover effects',
    ],
    solution: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Card Layout</title>
    <style>
        :root {
            --card-padding: 1.5rem;
            --card-gap: 1rem;
            --border-radius: 0.5rem;
            --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            --shadow-hover: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: var(--card-gap);
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .card {
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-hover);
        }

        .card-image {
            width: 100%;
            height: 200px;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
        }

        .card-content {
            padding: var(--card-padding);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0;
            color: #333;
        }

        .card-description {
            color: #666;
            line-height: 1.5;
            margin: 0;
        }

        .card-footer {
            margin-top: auto;
            padding-top: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .card-button:hover {
            background: #5a6fd8;
        }

        .card-date {
            color: #999;
            font-size: 0.875rem;
        }

        @media (max-width: 768px) {
            .card-container {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
            .card-container {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 1025px) {
            .card-container {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="card-container">
        <div class="card">
            <div class="card-image">Card 1</div>
            <div class="card-content">
                <h3 class="card-title">Sample Card Title</h3>
                <p class="card-description">This is a sample card description that explains what this card is about.</p>
                <div class="card-footer">
                    <button class="card-button">Read More</button>
                    <span class="card-date">Jan 15, 2024</span>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-image">Card 2</div>
            <div class="card-content">
                <h3 class="card-title">Another Card</h3>
                <p class="card-description">Another sample card with different content to demonstrate the layout.</p>
                <div class="card-footer">
                    <button class="card-button">Read More</button>
                    <span class="card-date">Jan 16, 2024</span>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-image">Card 3</div>
            <div class="card-content">
                <h3 class="card-title">Third Card</h3>
                <p class="card-description">This is the third card in our responsive layout demonstration.</p>
                <div class="card-footer">
                    <button class="card-button">Read More</button>
                    <span class="card-date">Jan 17, 2024</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `,
    starterCode: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Card Layout</title>
    <style>
        /* TODO: Add CSS custom properties for consistent styling */
        
        /* TODO: Create responsive grid layout */
        .card-container {
            /* Your grid implementation here */
        }
        
        /* TODO: Style individual cards */
        .card {
            /* Your card styling here */
        }
        
        /* TODO: Add hover effects */
        .card:hover {
            /* Your hover effects here */
        }
        
        /* TODO: Style card content with flexbox */
        .card-content {
            /* Your flexbox implementation here */
        }
        
        /* TODO: Add responsive breakpoints */
        @media (max-width: 768px) {
            /* Mobile styles */
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
            /* Tablet styles */
        }
        
        @media (min-width: 1025px) {
            /* Desktop styles */
        }
    </style>
</head>
<body>
    <div class="card-container">
        <!-- Add your card HTML structure here -->
    </div>
</body>
</html>
    `,
    testCases: [
      {
        description: 'Should display 1 column on mobile',
        input: 'Screen width < 768px',
        expectedOutput: 'Cards should stack vertically',
      },
      {
        description: 'Should display 2 columns on tablet',
        input: 'Screen width 768px - 1024px',
        expectedOutput: 'Cards should display in 2 columns',
      },
      {
        description: 'Should display 3 columns on desktop',
        input: 'Screen width > 1024px',
        expectedOutput: 'Cards should display in 3 columns',
      },
      {
        description: 'Should have hover effects',
        input: 'Hover over card',
        expectedOutput: 'Card should lift up and show shadow',
      },
    ],
    tags: ['css', 'responsive', 'grid', 'flexbox', 'layout'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Combine all tasks
const allFrontendTasks = [
  ...reactFrontendTasks,
  ...javascriptTasks,
  ...cssTasks,
];

// Function to seed the database
async function seedFrontendTasks() {
  console.log('🌱 Starting to seed frontend tasks...');

  try {
    for (const task of allFrontendTasks) {
      const taskId = await AdminFirestoreHelper.createDocument<FrontendTask>(
        COLLECTIONS.FRONTEND_TASKS,
        task
      );
      console.log(`✅ Created task: ${task.title} (ID: ${taskId})`);
    }

    console.log(
      `🎉 Successfully seeded ${allFrontendTasks.length} frontend tasks!`
    );
  } catch (error) {
    console.error('❌ Error seeding frontend tasks:', error);
  }
}

// Run the seeding function
if (require.main === module) {
  seedFrontendTasks()
    .then(() => {
      console.log('✅ Seeding completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export { seedFrontendTasks, allFrontendTasks };
