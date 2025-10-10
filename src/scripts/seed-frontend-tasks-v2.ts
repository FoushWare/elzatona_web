// v2.0 - Seed frontend tasks with dynamic files structure

import { db } from '../lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FrontendTask } from '../types/admin';

const frontendTasks: FrontendTask[] = [
  {
    id: 'counter-component',
    title: 'Counter Component',
    description:
      'Create a React counter component with increment, decrement, and reset functionality.',
    category: 'React',
    difficulty: 'easy',
    estimatedTime: 15,
    author: 'AI Assistant',
    company: 'Elzatona',
    requirements: 'Build a simple counter component with useState hook',
    hints: ['Use useState hook', 'Create increment/decrement functions'],
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
    starterCode: '// Legacy field for backward compatibility',
    files: [
      {
        id: '1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    // TODO: Implement increment logic
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    // TODO: Implement decrement logic
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    // TODO: Implement reset logic
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
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'styles.css',
        type: 'css',
        content: `body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}

button {
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  opacity: 0.8;
}`,
        isEntryPoint: false,
      },
      {
        id: '3',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter Component</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="root"></div>
</body>
</html>`,
        isEntryPoint: false,
      },
    ],
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
    requirements: 'Create a todo list with CRUD operations',
    hints: ['Use useState for state management', 'Implement form handling'],
    solution: '// Solution code here',
    starterCode: '// Legacy field for backward compatibility',
    files: [
      {
        id: '1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

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

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Todo List</h1>
      
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
                onClick={() => deleteTodo(todo.id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;`,
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'styles.css',
        type: 'css',
        content: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

input[type="text"] {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
}

input[type="text"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

button {
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

button:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

input[type="checkbox"] {
  cursor: pointer;
}`,
        isEntryPoint: false,
      },
    ],
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
    ],
    tags: ['react', 'forms', 'state', 'intermediate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'user-profile-form',
    title: 'User Profile Form',
    description:
      'Create a user profile form with validation, controlled inputs, and form submission handling.',
    category: 'React',
    difficulty: 'medium',
    estimatedTime: 30,
    author: 'Elzatona Team',
    company: 'Elzatona',
    requirements: 'Create a UserProfileForm component with form validation',
    hints: [
      'Use useState for form state',
      'Implement validation logic',
      'Handle form submission',
    ],
    solution: '// Solution code here',
    starterCode: '// Legacy field for backward compatibility',
    files: [
      {
        id: '1',
        name: 'App.tsx',
        type: 'tsx',
        content: `import React, { useState } from 'react';

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

const UserProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    bio: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    // TODO: Clear error for the field as user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    // TODO: Implement validation logic for name, email, age, bio
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    if (!formData.bio) newErrors.bio = 'Bio is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      // Simulate API call
      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
      setErrors({});
      setFormData({ name: '', email: '', age: '', bio: '' }); // Reset form
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Profile</h2>
      {isSubmitted && (
        <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>Profile updated successfully!</p>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: errors.name ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: errors.email ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: errors.age ? '1px solid red' : '1px solid #ddd', borderRadius: '4px' }}
          />
          {errors.age && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="bio" style={{ display: 'block', marginBottom: '5px' }}>Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            style={{ width: '100%', padding: '8px', border: errors.bio ? '1px solid red' : '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
          ></textarea>
          {errors.bio && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.bio}</p>}
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;`,
        isEntryPoint: true,
      },
      {
        id: '2',
        name: 'styles.css',
        type: 'css',
        content: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

input, textarea {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input.error, textarea.error {
  border-color: #dc3545;
}

button {
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.error-message {
  color: #dc3545;
  font-size: 0.8em;
  margin-top: 5px;
}

.success-message {
  color: #28a745;
  text-align: center;
  margin-bottom: 15px;
}`,
        isEntryPoint: false,
      },
    ],
    testCases: [
      {
        id: 'form-test-1',
        description: 'Form should render without errors',
        input: 'initial render',
        expectedOutput: 'Form elements visible',
        type: 'component',
        timeout: 1000,
      },
      {
        id: 'form-test-2',
        description: 'Name field should be required',
        input: 'submit with empty name',
        expectedOutput: 'Name is required error',
        type: 'component',
        timeout: 1000,
      },
    ],
    tags: ['react', 'hooks', 'state', 'forms', 'intermediate'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedFrontendTasks() {
  console.log('🌱 Starting to seed frontend tasks...');

  try {
    for (const task of frontendTasks) {
      const taskRef = doc(collection(db, 'frontendTasks'), task.id);
      await setDoc(taskRef, task);
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
seedFrontendTasks().catch(console.error);
