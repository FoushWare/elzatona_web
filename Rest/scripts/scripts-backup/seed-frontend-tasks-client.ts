// v1.0 - Seed frontend tasks using Firebase client SDK
// This script uses the Firebase client SDK to seed frontend tasks

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  projectId: 'fir-demo-project-adffb',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample frontend tasks data
const frontendTasks = [
  {
    id: 'counter-component',
    title: 'Counter Component',
    description:
      'Create a React counter component with increment, decrement, and reset functionality. The component should display the current count and have three buttons.',
    category: 'React',
    difficulty: 'easy',
    estimatedTime: 15,
    author: 'AI Assistant',
    company: 'Elzatona',
    requirements: `Your task is to build a simple React counter component.
It should:
1. Display the current count.
2. Have an "Increment" button that increases the count by 1.
3. Have a "Decrement" button that decreases the count by 1.
4. Have a "Reset" button that sets the count back to 0.
5. Use React's useState hook for managing the count.`,
    hints: [
      'Start with a functional component and the useState hook.',
      'Each button will need an onClick handler to update the state.',
      'Remember to handle the initial state for the counter.',
    ],
    solution: `import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment} style={{ margin: '5px', padding: '10px 20px' }}>Increment</button>
      <button onClick={decrement} style={{ margin: '5px', padding: '10px 20px' }}>Decrement</button>
      <button onClick={reset} style={{ margin: '5px', padding: '10px 20px' }}>Reset</button>
    </div>
  );
};

export default Counter;`,
    starterCode: `import React, { useState } from 'react';

const Counter: React.FC = () => {
  // Your state and functions here
  const [count, setCount] = useState(0);

  const increment = () => {
    // Implement increment logic
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    // Implement decrement logic
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    // Implement reset logic
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={increment} style={{ margin: '5px', padding: '10px 20px' }}>Increment</button>
      <button onClick={decrement} style={{ margin: '5px', padding: '10px 20px' }}>Decrement</button>
      <button onClick={reset} style={{ margin: '5px', padding: '10px 20px' }}>Reset</button>
    </div>
  );
};

export default Counter;`,
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
    id: 'todo-list',
    title: 'Todo List',
    description:
      'Build a todo list application with add, edit, delete, and mark complete functionality',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 30,
    author: 'AI Assistant',
    company: 'Elzatona',
    requirements: `Create a todo list application with the following features:
1. Display a list of todos
2. Add new todos with a text input and button
3. Mark todos as complete/incomplete
4. Delete todos
5. Edit existing todos
6. Use React hooks for state management
7. Implement proper form handling`,
    hints: [
      'Use useState to manage the todos array and form state.',
      'Each todo should have an id, text, and completed status.',
      'Implement controlled components for the input fields.',
      'Use array methods like map, filter, and find for todo operations.',
    ],
    solution: `import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Todo List</h1>
      
      {/* Add Todo */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                border: '1px solid #eee',
                borderRadius: '4px',
                marginBottom: '10px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ flex: 1, padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button onClick={saveEdit} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Save
                  </button>
                  <button onClick={cancelEdit} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#666' : 'black',
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEdit(todo)}
                    style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
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

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    // TODO: Implement add todo functionality
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    // TODO: Implement toggle todo completion
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    // TODO: Implement delete todo functionality
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    // TODO: Implement edit functionality
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    // TODO: Implement save edit functionality
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    // TODO: Implement cancel edit functionality
    setEditingId(null);
    setEditText('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Todo List</h1>
      
      {/* Add Todo */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <div>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                border: '1px solid #eee',
                borderRadius: '4px',
                marginBottom: '10px',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={{ flex: 1, padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button onClick={saveEdit} style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Save
                  </button>
                  <button onClick={cancelEdit} style={{ padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#666' : 'black',
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => startEdit(todo)}
                    style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;`,
    testCases: [
      {
        id: 'todo-test-1',
        description: 'Should add a new todo',
        input: 'add todo "Learn React"',
        expectedOutput: 'Todo added to list',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'todo-test-2',
        description: 'Should toggle todo completion',
        input: 'toggle todo completion',
        expectedOutput: 'Todo marked as complete',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'todo-test-3',
        description: 'Should delete a todo',
        input: 'delete todo',
        expectedOutput: 'Todo removed from list',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'todo-test-4',
        description: 'Should edit a todo',
        input: 'edit todo text',
        expectedOutput: 'Todo text updated',
        type: 'component',
        timeout: 1000,
      },
    ],
    tags: ['react', 'forms', 'state', 'intermediate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedFrontendTasks() {
  console.log('🌱 Starting to seed frontend tasks...');

  try {
    for (const task of frontendTasks) {
      // Use setDoc with the task ID to ensure consistent document IDs
      await setDoc(doc(db, 'frontendTasks', task.id), {
        ...task,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Created task: ${task.title} (ID: ${task.id})`);
    }

    console.log(
      `🎉 Successfully seeded ${frontendTasks.length} frontend tasks!`
    );
  } catch (error) {
    console.error('❌ Error seeding frontend tasks:', error);
  }
}

// Run the seeding function
seedFrontendTasks();
