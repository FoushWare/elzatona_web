// v1.0 - Simple script to seed frontend tasks

const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccount) {
      const serviceAccountKey = JSON.parse(serviceAccount);
      initializeApp({
        credential: cert(serviceAccountKey),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    } else {
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'elzatona-web',
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'elzatona-web',
    });
  }
}

const db = getFirestore();

// Sample frontend tasks
const sampleTasks = [
  {
    title: 'Counter Component',
    description:
      'Create a React counter component with increment, decrement, and reset functionality.',
    category: 'React',
    difficulty: 'easy',
    estimatedTime: 15,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create a functional React component called Counter. Use useState hook to manage count state. Display the current count value. Add increment button (+1), decrement button (-1), and reset button (set to 0).',
    hints: [
      "Use React's useState hook for state management",
      'Create three separate functions for increment, decrement, and reset',
      'Use onClick handlers for button interactions',
    ],
    solution: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;`,
    starterCode: `import React, { useState } from 'react';

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

export default Counter;`,
    testCases: [
      {
        description: 'Initial state should be 0',
        input: 'initial',
        expectedOutput: '0',
      },
      {
        description: 'Increment should increase count by 1',
        input: 'increment',
        expectedOutput: '1',
      },
      {
        description: 'Decrement should decrease count by 1',
        input: 'decrement',
        expectedOutput: '-1',
      },
      {
        description: 'Reset should set count to 0',
        input: 'reset',
        expectedOutput: '0',
      },
    ],
    tags: ['react', 'hooks', 'state', 'beginner'],
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    title: 'Todo List Component',
    description:
      'Build a complete Todo List application with add, delete, and toggle completion functionality.',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 45,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Create a TodoList component. Use useState to manage todos array. Each todo should have: id, text, completed status. Add functionality to create new todos, delete todos, and toggle todo completion. Display todos in a list format.',
    hints: [
      'Use an array of objects to store todos',
      'Generate unique IDs for each todo',
      'Use map() to render the list of todos',
      'Use conditional styling for completed todos',
    ],
    solution: `import React, { useState } from 'react';

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
    <div>
      <h2>Todo List</h2>
      
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`,
    starterCode: `import React, { useState } from 'react';

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

  return (
    <div>
      <h2>Todo List</h2>
      {/* Add your todo list implementation here */}
    </div>
  );
};

export default TodoList;`,
    testCases: [
      {
        description: 'Should add a new todo',
        input: "Add todo: 'Learn React'",
        expectedOutput: "Todo 'Learn React' should appear in list",
      },
      {
        description: 'Should not add empty todos',
        input: "Add todo: ''",
        expectedOutput: 'No empty todo should be added',
      },
      {
        description: 'Should toggle todo completion',
        input: 'Toggle todo completion',
        expectedOutput: 'Todo should show strikethrough when completed',
      },
      {
        description: 'Should delete todo',
        input: 'Delete todo',
        expectedOutput: 'Todo should be removed from list',
      },
    ],
    tags: ['react', 'hooks', 'state', 'forms', 'intermediate'],
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    title: 'Array Manipulation Functions',
    description:
      'Implement common array manipulation functions including map, filter, reduce, and find.',
    category: 'JavaScript',
    difficulty: 'medium',
    estimatedTime: 30,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements:
      'Implement a custom map function, custom filter function, custom reduce function, and custom find function. Each function should work with arrays of any type and include proper TypeScript typing.',
    hints: [
      'Use for loops for iteration',
      'Return new arrays for map and filter',
      'Use accumulator pattern for reduce',
      'Add proper TypeScript generics',
    ],
    solution: `// Custom Array Functions Implementation

function customMap<T, U>(array: T[], callback: (item: T, index: number) => U): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}

function customFilter<T>(array: T[], callback: (item: T, index: number) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) {
      result.push(array[i]);
    }
  }
  return result;
}

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
console.log('Map:', customMap(numbers, x => x * 2));
console.log('Filter:', customFilter(numbers, x => x > 2));
console.log('Reduce:', customReduce(numbers, (acc, curr) => acc + curr, 0));
console.log('Find:', customFind(numbers, x => x > 3));`,
    starterCode: `// TODO: Implement custom map function
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
console.log('Find:', customFind(numbers, x => x > 3));`,
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
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

async function seedTasks() {
  console.log('🌱 Starting to seed frontend tasks...');

  try {
    for (const task of sampleTasks) {
      const docRef = await db.collection('frontendTasks').add(task);
      console.log(`✅ Created task: ${task.title} (ID: ${docRef.id})`);
    }

    console.log(`🎉 Successfully seeded ${sampleTasks.length} frontend tasks!`);
    console.log(
      '📝 You can now test the CRUD functionality in the admin panel.'
    );
    console.log(
      '🌐 Visit http://localhost:3002/admin/frontend-tasks to see the tasks.'
    );
  } catch (error) {
    console.error('❌ Error seeding frontend tasks:', error);
  }
}

seedTasks();
