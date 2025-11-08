import {
  Challenge,
  Category,
  Difficulty,
  ChallengeFilters,
} from '@elzatona/shared-types';

// Sample challenges data - this will be replaced with Firebase data
export const sampleChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Create a Responsive Navigation Bar',
    description:
      'Build a responsive navigation bar that collapses into a hamburger menu on mobile devices.',
    category: 'html',
    difficulty: 'easy',
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Bar</title>
</head>
<body>
    <!-- Your navigation bar HTML here -->
    
</body>
</html>`,
      css: `/* Your CSS styles here */`,
      javascript: `// Your JavaScript here`,
    },
    testCases: [
      {
        id: '1',
        name: 'Navigation Structure',
        description: 'Check if navigation has proper semantic HTML structure',
        input: { type: 'html' },
        expectedOutput: 'nav element with ul/li structure',
        type: 'html',
      },
    ],
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Bar</title>
</head>
<body>
    <nav class="navbar">
        <div class="nav-brand">Logo</div>
        <ul class="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
</body>
</html>`,
      css: `.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #333;
    color: white;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: white;
    text-decoration: none;
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
}

.hamburger span {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 3px 0;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hamburger {
        display: flex;
    }
}`,
      javascript: `document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});`,
    },
    explanation:
      'This solution creates a responsive navigation bar using flexbox. The hamburger menu appears on mobile devices (screens smaller than 768px) and toggles the navigation menu visibility.',
    tags: ['navigation', 'responsive', 'flexbox', 'mobile'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Build a Contact Form',
    description:
      'Create a contact form with proper validation and accessibility features.',
    category: 'html',
    difficulty: 'easy',
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>
    <!-- Your contact form HTML here -->
    
</body>
</html>`,
      css: `/* Your CSS styles here */`,
      javascript: `// Your JavaScript here`,
    },
    testCases: [
      {
        id: '1',
        name: 'Form Structure',
        description: 'Check if form has proper input fields and labels',
        input: { type: 'html' },
        expectedOutput: 'form with name, email, message fields',
        type: 'html',
      },
    ],
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>
    <form class="contact-form">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>`,
      css: `.contact-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}`,
      javascript: `document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
});`,
    },
    explanation:
      'This solution creates a semantic contact form with proper labels, input types, and basic styling. The form includes validation attributes and is accessible.',
    tags: ['forms', 'validation', 'accessibility', 'semantic'],
    created_at: '2024-01-02T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    title: 'CSS Grid Layout',
    description:
      'Create a responsive grid layout using CSS Grid for a photo gallery.',
    category: 'css',
    difficulty: 'medium',
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery</title>
</head>
<body>
    <div class="gallery">
        <!-- Add 6-8 div elements for photos -->
    </div>
</body>
</html>`,
      css: `/* Your CSS Grid styles here */`,
      javascript: `// Your JavaScript here`,
    },
    testCases: [
      {
        id: '1',
        name: 'Grid Layout',
        description: 'Check if CSS Grid is properly implemented',
        input: { type: 'css' },
        expectedOutput: 'responsive grid with 3 columns on desktop',
        type: 'css',
      },
    ],
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery</title>
</head>
<body>
    <div class="gallery">
        <div class="photo">Photo 1</div>
        <div class="photo">Photo 2</div>
        <div class="photo">Photo 3</div>
        <div class="photo">Photo 4</div>
        <div class="photo">Photo 5</div>
        <div class="photo">Photo 6</div>
    </div>
</body>
</html>`,
      css: `.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.photo {
    background-color: #f0f0f0;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
}

@media (max-width: 768px) {
    .gallery {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
}

@media (max-width: 480px) {
    .gallery {
        grid-template-columns: 1fr;
        gap: 10px;
    }
}`,
      javascript: `// No JavaScript needed for this challenge`,
    },
    explanation:
      'This solution uses CSS Grid with auto-fit and minmax for a responsive layout that adapts to different screen sizes. The grid automatically adjusts columns based on available space.',
    tags: ['css-grid', 'responsive', 'layout', 'gallery'],
    created_at: '2024-01-03T00:00:00Z',
    updated_at: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    title: 'JavaScript Todo List',
    description:
      'Build a todo list application with add, delete, and toggle functionality.',
    category: 'javascript',
    difficulty: 'medium',
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
</head>
<body>
    <div class="todo-app">
        <h1>Todo List</h1>
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add a new task...">
            <button id="addBtn">Add</button>
        </div>
        <ul id="todoList">
            <!-- Todo items will be added here -->
        </ul>
    </div>
</body>
</html>`,
      css: `/* Your CSS styles here */`,
      javascript: `// Your JavaScript here`,
    },
    testCases: [
      {
        id: '1',
        name: 'Add Todo',
        description: 'Check if new todos can be added',
        input: { type: 'javascript' },
        expectedOutput: 'todo item added to list',
        type: 'javascript',
      },
    ],
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
</head>
<body>
    <div class="todo-app">
        <h1>Todo List</h1>
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add a new task...">
            <button id="addBtn">Add</button>
        </div>
        <ul id="todoList">
            <!-- Todo items will be added here -->
        </ul>
    </div>
</body>
</html>`,
      css: `.todo-app {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#addBtn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.todo-item.completed {
    text-decoration: line-through;
    opacity: 0.6;
}

.todo-item input[type="checkbox"] {
    margin-right: 10px;
}

.delete-btn {
    margin-left: auto;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}`,
      javascript: `document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        li.className = 'todo-item';
        
        li.innerHTML = \`
            <input type="checkbox" onchange="toggleTodo(this)">
            <span>\${todoText}</span>
            <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        \`;
        
        todoList.appendChild(li);
        todoInput.value = '';
    }
});

function toggleTodo(checkbox) {
    const todoItem = checkbox.parentElement;
    todoItem.classList.toggle('completed');
}

function deleteTodo(button) {
    const todoItem = button.parentElement;
    todoItem.remove();
}`,
    },
    explanation:
      'This solution creates a fully functional todo list with add, toggle, and delete functionality. It uses event delegation and DOM manipulation to manage the todo items.',
    tags: ['javascript', 'dom-manipulation', 'events', 'todo'],
    created_at: '2024-01-04T00:00:00Z',
    updated_at: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    title: 'CSS Animations',
    description:
      'Create smooth animations for a loading spinner and button hover effects.',
    category: 'css',
    difficulty: 'hard',
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations</title>
</head>
<body>
    <div class="container">
        <div class="spinner">
            <!-- Create a loading spinner -->
        </div>
        <button class="animated-btn">
            Hover Me
        </button>
    </div>
</body>
</html>`,
      css: `/* Your CSS animations here */`,
      javascript: `// Your JavaScript here`,
    },
    testCases: [
      {
        id: '1',
        name: 'Spinner Animation',
        description: 'Check if spinner rotates continuously',
        input: { type: 'css' },
        expectedOutput: 'rotating spinner animation',
        type: 'css',
      },
    ],
    solution: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations</title>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <button class="animated-btn">
            Hover Me
        </button>
    </div>
</body>
</html>`,
      css: `.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 50px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.animated-btn {
    padding: 15px 30px;
    font-size: 18px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.animated-btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.animated-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.animated-btn:hover::before {
    left: 100%;
}`,
      javascript: `// No JavaScript needed for this challenge`,
    },
    explanation:
      'This solution demonstrates advanced CSS animations including keyframes for rotation, transitions for smooth hover effects, and pseudo-elements for additional visual effects.',
    tags: ['css-animations', 'keyframes', 'transitions', 'effects'],
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
];

export function getChallenges(filters?: ChallengeFilters): Challenge[] {
  let filteredChallenges = [...sampleChallenges];

  if (filters?.category) {
    filteredChallenges = filteredChallenges.filter(
      challenge => challenge.category === filters.category
    );
  }

  if (filters?.difficulty) {
    filteredChallenges = filteredChallenges.filter(
      challenge => challenge.difficulty === filters.difficulty
    );
  }

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredChallenges = filteredChallenges.filter(
      challenge =>
        challenge.title.toLowerCase().includes(searchTerm) ||
        challenge.description.toLowerCase().includes(searchTerm) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  return filteredChallenges;
}

export function getChallengeById(id: string): Challenge | undefined {
  return sampleChallenges.find(challenge => challenge.id === id);
}

export function getChallengesByCategory(category: Category): Challenge[] {
  return sampleChallenges.filter(challenge => challenge.category === category);
}

export function getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
  return sampleChallenges.filter(
    challenge => challenge.difficulty === difficulty
  );
}
