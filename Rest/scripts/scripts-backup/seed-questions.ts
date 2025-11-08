import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample questions data based on the new schema
const sampleQuestions = [
  // React Questions
  {
    id: 'react-q-001',
    title: 'What is React?',
    content:
      'React (aka React.js or ReactJS) is an **open-source front-end JavaScript library** for building user interfaces, particularly web applications. It was created by Facebook (now Meta) and is maintained by Facebook and the community.\n\n## Key Features:\n- **Component-based architecture**: Build encapsulated components that manage their own state\n- **Virtual DOM**: Efficient updates to the real DOM\n- **Declarative**: Describe what the UI should look like for any given state\n- **Learn once, write anywhere**: Can be used for web, mobile, and desktop applications\n\n## Why React?\n- **Performance**: Virtual DOM makes updates efficient\n- **Reusability**: Components can be reused across applications\n- **Ecosystem**: Large community and rich ecosystem of tools\n- **Industry standard**: Widely adopted by major companies',
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'React Basics',
    topicId: 'react-basics',
    topicSlug: 'react-basics',
    difficulty: 'beginner',
    tags: ['react', 'library', 'ui', 'components', 'frontend'],
    estimatedTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'react-q-002',
    title: 'What are React Components?',
    content:
      "React components are **reusable pieces of UI** that can be composed together to build complex user interfaces. They are the building blocks of React applications.\n\n## Types of Components:\n\n### 1. Function Components\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n```\n\n### 2. Class Components\n```jsx\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}\n```\n\n## Key Concepts:\n- **Props**: Data passed down from parent components\n- **State**: Internal data that can change over time\n- **Lifecycle**: Methods that run at different stages of a component's life\n- **Composition**: Building complex UIs by combining simpler components",
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'Components',
    topicId: 'react-components',
    topicSlug: 'components',
    difficulty: 'beginner',
    tags: ['react', 'components', 'props', 'state', 'jsx'],
    estimatedTime: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'react-q-003',
    title: 'What is JSX?',
    content:
      'JSX (JavaScript XML) is a **syntax extension for JavaScript** that allows you to write HTML-like code in your JavaScript files. It makes React components more readable and easier to write.\n\n## JSX Examples:\n\n### Basic JSX\n```jsx\nconst element = <h1>Hello, world!</h1>;\n```\n\n### JSX with Expressions\n```jsx\nconst name = \'Josh Perez\';\nconst element = <h1>Hello, {name}</h1>;\n```\n\n### JSX with Attributes\n```jsx\nconst element = <div tabIndex="0"></div>;\nconst element2 = <img src={user.avatarUrl}></img>;\n```\n\n## Key Points:\n- **Not required**: JSX is optional but recommended\n- **Compiled**: JSX gets compiled to regular JavaScript\n- **Expressions**: Use curly braces `{}` to embed JavaScript expressions\n- **CamelCase**: HTML attributes become camelCase in JSX (e.g., `className` instead of `class`)',
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'JSX',
    topicId: 'react-jsx',
    topicSlug: 'jsx',
    difficulty: 'beginner',
    tags: ['react', 'jsx', 'syntax', 'html', 'javascript'],
    estimatedTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'react-q-004',
    title: 'What are React Hooks?',
    content:
      "React Hooks are **functions that let you use state and other React features** in function components. They were introduced in React 16.8 to allow function components to have state and lifecycle methods.\n\n## Built-in Hooks:\n\n### useState\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n### useEffect\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\n## Rules of Hooks:\n1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions\n2. **Only call hooks from React functions** - Call hooks from React function components or custom hooks",
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'React',
    categoryId: 'cat-react',
    categorySlug: 'react',
    topic: 'Hooks',
    topicId: 'react-hooks',
    topicSlug: 'hooks',
    difficulty: 'intermediate',
    tags: ['react', 'hooks', 'usestate', 'useeffect', 'state'],
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // JavaScript Questions
  {
    id: 'js-q-001',
    title: 'What is JavaScript?',
    content:
      'JavaScript is a **high-level, interpreted programming language** that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.\n\n## Key Features:\n- **Dynamic typing**: Variables can hold values of any type\n- **Prototype-based**: Uses prototypes for inheritance\n- **First-class functions**: Functions are treated as first-class citizens\n- **Event-driven**: Responds to user interactions and events\n- **Asynchronous**: Supports asynchronous programming with callbacks, promises, and async/await\n\n## JavaScript in the Browser:\n- **DOM manipulation**: Interact with HTML elements\n- **Event handling**: Respond to user actions\n- **AJAX**: Make asynchronous requests\n- **Local storage**: Store data locally\n\n## Modern JavaScript (ES6+):\n- **Arrow functions**: Concise function syntax\n- **Template literals**: String interpolation\n- **Destructuring**: Extract values from objects and arrays\n- **Modules**: Import/export functionality\n- **Classes**: Object-oriented programming syntax',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'JavaScript',
    categoryId: 'cat-javascript',
    categorySlug: 'javascript',
    topic: 'JavaScript Basics',
    topicId: 'js-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['javascript', 'programming', 'web', 'language', 'frontend'],
    estimatedTime: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'js-q-002',
    title: 'What are JavaScript Functions?',
    content:
      'Functions in JavaScript are **reusable blocks of code** that perform a specific task. They are fundamental building blocks of JavaScript programs.\n\n## Function Declarations\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\n\n## Function Expressions\n```javascript\nconst greet = function(name) {\n  return `Hello, ${name}!`;\n};\n```\n\n## Arrow Functions (ES6+)\n```javascript\nconst greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\n// Shorter syntax\nconst greet = name => `Hello, ${name}!`;\n```\n\n## Key Concepts:\n- **Parameters**: Input values passed to the function\n- **Return value**: The value the function gives back\n- **Scope**: Where variables are accessible\n- **Hoisting**: Function declarations are hoisted\n- **Closures**: Functions that have access to outer scope variables\n\n## Function Types:\n- **Pure functions**: Always return the same output for the same input\n- **Higher-order functions**: Functions that take other functions as arguments\n- **Callback functions**: Functions passed as arguments to other functions',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'JavaScript',
    categoryId: 'cat-javascript',
    categorySlug: 'javascript',
    topic: 'Functions',
    topicId: 'js-functions',
    topicSlug: 'functions',
    difficulty: 'beginner',
    tags: [
      'javascript',
      'functions',
      'arrow-functions',
      'parameters',
      'return',
    ],
    estimatedTime: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'js-q-003',
    title: 'What are JavaScript Arrays?',
    content:
      "Arrays in JavaScript are **ordered collections of values** that can hold any type of data. They are one of the most commonly used data structures.\n\n## Creating Arrays\n```javascript\n// Array literal\nconst fruits = ['apple', 'banana', 'orange'];\n\n// Array constructor\nconst numbers = new Array(1, 2, 3, 4, 5);\n\n// Empty array\nconst empty = [];\n```\n\n## Common Array Methods\n\n### Adding/Removing Elements\n```javascript\nconst arr = [1, 2, 3];\n\n// Add to end\narr.push(4); // [1, 2, 3, 4]\n\n// Remove from end\narr.pop(); // [1, 2, 3]\n\n// Add to beginning\narr.unshift(0); // [0, 1, 2, 3]\n\n// Remove from beginning\narr.shift(); // [1, 2, 3]\n```\n\n### Iteration Methods\n```javascript\nconst numbers = [1, 2, 3, 4, 5];\n\n// map - transform each element\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]\n\n// filter - select elements that meet condition\nconst evens = numbers.filter(n => n % 2 === 0); // [2, 4]\n\n// reduce - reduce array to single value\nconst sum = numbers.reduce((acc, n) => acc + n, 0); // 15\n\n// forEach - execute function for each element\nnumbers.forEach(n => console.log(n));\n```\n\n## Key Concepts:\n- **Zero-indexed**: First element is at index 0\n- **Dynamic size**: Arrays can grow and shrink\n- **Mixed types**: Can contain different data types\n- **Reference type**: Arrays are objects\n- **Length property**: `array.length` gives the number of elements",
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'JavaScript',
    categoryId: 'cat-javascript',
    categorySlug: 'javascript',
    topic: 'Arrays',
    topicId: 'js-arrays',
    topicSlug: 'arrays',
    difficulty: 'beginner',
    tags: ['javascript', 'arrays', 'methods', 'iteration', 'data-structures'],
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // CSS Questions
  {
    id: 'css-q-001',
    title: 'What is CSS?',
    content:
      'CSS (Cascading Style Sheets) is a **stylesheet language** used to describe the presentation of a document written in HTML or XML. It controls the visual appearance of web pages.\n\n## Key Features:\n- **Separation of concerns**: Separates content (HTML) from presentation (CSS)\n- **Cascading**: Styles cascade from parent to child elements\n- **Specificity**: Determines which styles take precedence\n- **Inheritance**: Some properties are inherited by child elements\n\n## CSS Syntax\n```css\nselector {\n  property: value;\n  property: value;\n}\n\n/* Example */\nh1 {\n  color: blue;\n  font-size: 24px;\n  margin: 10px 0;\n}\n```\n\n## Ways to Include CSS:\n\n### 1. Inline Styles\n```html\n<h1 style="color: blue; font-size: 24px;">Hello World</h1>\n```\n\n### 2. Internal Stylesheet\n```html\n<head>\n  <style>\n    h1 { color: blue; font-size: 24px; }\n  </style>\n</head>\n```\n\n### 3. External Stylesheet\n```html\n<head>\n  <link rel="stylesheet" href="styles.css">\n</head>\n```\n\n## CSS Box Model:\n- **Content**: The actual content of the element\n- **Padding**: Space between content and border\n- **Border**: Line around the padding\n- **Margin**: Space outside the border',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'CSS',
    categoryId: 'cat-css',
    categorySlug: 'css',
    topic: 'CSS Basics',
    topicId: 'css-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['css', 'styling', 'web', 'presentation', 'frontend'],
    estimatedTime: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
  {
    id: 'css-q-002',
    title: 'What is Flexbox?',
    content:
      "Flexbox (Flexible Box Layout) is a **CSS layout method** that provides an efficient way to arrange, align, and distribute space among items in a container, even when their size is unknown or dynamic.\n\n## Flexbox Container Properties\n\n### display\n```css\n.container {\n  display: flex; /* or inline-flex */\n}\n```\n\n### flex-direction\n```css\n.container {\n  flex-direction: row; /* default */\n  flex-direction: row-reverse;\n  flex-direction: column;\n  flex-direction: column-reverse;\n}\n```\n\n### justify-content (main axis)\n```css\n.container {\n  justify-content: flex-start; /* default */\n  justify-content: flex-end;\n  justify-content: center;\n  justify-content: space-between;\n  justify-content: space-around;\n  justify-content: space-evenly;\n}\n```\n\n### align-items (cross axis)\n```css\n.container {\n  align-items: stretch; /* default */\n  align-items: flex-start;\n  align-items: flex-end;\n  align-items: center;\n  align-items: baseline;\n}\n```\n\n## Flexbox Item Properties\n\n### flex-grow\n```css\n.item {\n  flex-grow: 1; /* grow to fill available space */\n}\n```\n\n### flex-shrink\n```css\n.item {\n  flex-shrink: 0; /* don't shrink */\n}\n```\n\n### flex-basis\n```css\n.item {\n  flex-basis: 200px; /* initial size */\n}\n```\n\n### flex (shorthand)\n```css\n.item {\n  flex: 1 0 200px; /* grow shrink basis */\n}\n```\n\n## Common Use Cases:\n- **Centering content**: Both horizontally and vertically\n- **Equal height columns**: Make columns the same height\n- **Navigation bars**: Space items evenly\n- **Card layouts**: Flexible card arrangements\n- **Form layouts**: Align form elements",
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'CSS',
    categoryId: 'cat-css',
    categorySlug: 'css',
    topic: 'Flexbox',
    topicId: 'css-flexbox',
    topicSlug: 'flexbox',
    difficulty: 'intermediate',
    tags: ['css', 'flexbox', 'layout', 'alignment', 'responsive'],
    estimatedTime: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // HTML Questions
  {
    id: 'html-q-001',
    title: 'What is HTML?',
    content:
      'HTML (HyperText Markup Language) is the **standard markup language** for creating web pages and web applications. It defines the structure and content of web pages.\n\n## Key Features:\n- **Markup language**: Uses tags to define elements\n- **Semantic**: Provides meaning to content\n- **Accessible**: Can be read by screen readers and other assistive technologies\n- **Platform independent**: Works across different devices and browsers\n\n## Basic HTML Structure\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n```\n\n## Common HTML Elements:\n\n### Text Elements\n```html\n<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<p>Paragraph text</p>\n<strong>Bold text</strong>\n<em>Italic text</em>\n```\n\n### Link and Media\n```html\n<a href="https://example.com">Link</a>\n<img src="image.jpg" alt="Description">\n<video src="video.mp4" controls></video>\n<audio src="audio.mp3" controls></audio>\n```\n\n### Lists\n```html\n<ul>\n  <li>Unordered list item</li>\n  <li>Another item</li>\n</ul>\n\n<ol>\n  <li>Ordered list item</li>\n  <li>Another item</li>\n</ol>\n```\n\n## HTML5 Semantic Elements:\n- `<header>`: Header section\n- `<nav>`: Navigation links\n- `<main>`: Main content\n- `<article>`: Self-contained content\n- `<section>`: Thematic grouping\n- `<aside>`: Sidebar content\n- `<footer>`: Footer section',
    type: 'open-ended',
    cardType: 'Core Technologies',
    category: 'HTML',
    categoryId: 'cat-html',
    categorySlug: 'html',
    topic: 'HTML Basics',
    topicId: 'html-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['html', 'markup', 'web', 'structure', 'semantic'],
    estimatedTime: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // Next.js Questions
  {
    id: 'nextjs-q-001',
    title: 'What is Next.js?',
    content:
      "Next.js is a **React framework** that provides additional features and optimizations for building production-ready React applications. It's built on top of React and provides a great developer experience.\n\n## Key Features:\n- **Server-Side Rendering (SSR)**: Render pages on the server\n- **Static Site Generation (SSG)**: Pre-render pages at build time\n- **File-based routing**: Automatic routing based on file structure\n- **API routes**: Build API endpoints within your app\n- **Image optimization**: Automatic image optimization\n- **Font optimization**: Optimized font loading\n- **Built-in CSS support**: Support for CSS modules and styled-jsx\n\n## Getting Started\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```\n\n## File-based Routing\n```\npages/\n  index.js          # / route\n  about.js          # /about route\n  blog/\n    index.js        # /blog route\n    [slug].js       # /blog/[slug] dynamic route\n```\n\n## Data Fetching Methods\n\n### getStaticProps (SSG)\n```javascript\nexport async function getStaticProps() {\n  const data = await fetchData();\n  return {\n    props: { data },\n  };\n}\n```\n\n### getServerSideProps (SSR)\n```javascript\nexport async function getServerSideProps() {\n  const data = await fetchData();\n  return {\n    props: { data },\n  };\n}\n```\n\n## API Routes\n```javascript\n// pages/api/hello.js\nexport default function handler(req, res) {\n  res.status(200).json({ message: 'Hello from API!' });\n}\n```\n\n## Benefits:\n- **Performance**: Optimized loading and rendering\n- **SEO**: Better search engine optimization\n- **Developer Experience**: Great tooling and features\n- **Production Ready**: Built-in optimizations and best practices",
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'Next.js',
    categoryId: 'cat-nextjs',
    categorySlug: 'nextjs',
    topic: 'Next.js Basics',
    topicId: 'nextjs-basics',
    topicSlug: 'basics',
    difficulty: 'beginner',
    tags: ['nextjs', 'react', 'framework', 'ssr', 'ssg'],
    estimatedTime: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // System Design Questions
  {
    id: 'sd-q-001',
    title: 'What is Frontend System Design?',
    content:
      "Frontend System Design involves **architecting scalable, maintainable, and performant frontend applications**. It focuses on how to structure and organize frontend code, manage state, handle data flow, and ensure the application can scale with growing requirements.\n\n## Key Areas:\n\n### 1. Architecture Patterns\n- **Component Architecture**: Organizing components hierarchically\n- **State Management**: Choosing between local state, context, or external libraries\n- **Data Flow**: Unidirectional data flow patterns\n- **Separation of Concerns**: Dividing responsibilities across layers\n\n### 2. Performance Optimization\n- **Code Splitting**: Loading code only when needed\n- **Lazy Loading**: Deferring non-critical resources\n- **Caching Strategies**: Browser caching, CDN, service workers\n- **Bundle Optimization**: Minimizing bundle size\n\n### 3. Scalability Considerations\n- **Modular Design**: Breaking down large applications\n- **Reusable Components**: Creating component libraries\n- **API Design**: Designing efficient data fetching\n- **Error Handling**: Graceful error management\n\n### 4. User Experience\n- **Loading States**: Providing feedback during operations\n- **Error Boundaries**: Handling component errors\n- **Accessibility**: Ensuring inclusive design\n- **Responsive Design**: Adapting to different screen sizes\n\n## Design Principles:\n- **Single Responsibility**: Each component has one purpose\n- **Composition over Inheritance**: Building complex UIs from simple components\n- **Performance First**: Optimizing for speed and efficiency\n- **Maintainability**: Writing code that's easy to understand and modify\n- **Testability**: Designing for easy testing\n\n## Common Patterns:\n- **Container/Presentational Components**: Separating logic from presentation\n- **Higher-Order Components (HOCs)**: Reusing component logic\n- **Render Props**: Sharing code between components\n- **Custom Hooks**: Extracting and reusing stateful logic",
    type: 'open-ended',
    cardType: 'System Design',
    category: 'System Design',
    categoryId: 'cat-system-design',
    categorySlug: 'system-design',
    topic: 'Frontend Architecture',
    topicId: 'sd-architecture',
    topicSlug: 'architecture',
    difficulty: 'intermediate',
    tags: [
      'system-design',
      'architecture',
      'frontend',
      'scalability',
      'performance',
    ],
    estimatedTime: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },

  // Design Patterns Questions
  {
    id: 'dp-q-001',
    title: 'What are Design Patterns in Frontend Development?',
    content:
      "Design patterns in frontend development are **reusable solutions to common problems** that occur when building user interfaces. They provide proven approaches to organizing code and solving recurring design challenges.\n\n## Common Frontend Design Patterns:\n\n### 1. Creational Patterns\n\n#### Singleton Pattern\n```javascript\nclass Logger {\n  constructor() {\n    if (Logger.instance) {\n      return Logger.instance;\n    }\n    this.logs = [];\n    Logger.instance = this;\n  }\n  \n  log(message) {\n    this.logs.push(message);\n    console.log(message);\n  }\n}\n\nconst logger1 = new Logger();\nconst logger2 = new Logger();\nconsole.log(logger1 === logger2); // true\n```\n\n#### Factory Pattern\n```javascript\nclass ButtonFactory {\n  static createButton(type) {\n    switch (type) {\n      case 'primary':\n        return new PrimaryButton();\n      case 'secondary':\n        return new SecondaryButton();\n      default:\n        return new DefaultButton();\n    }\n  }\n}\n```\n\n### 2. Structural Patterns\n\n#### Decorator Pattern\n```javascript\nfunction withLoading(WrappedComponent) {\n  return function LoadingComponent(props) {\n    if (props.isLoading) {\n      return <div>Loading...</div>;\n    }\n    return <WrappedComponent {...props} />;\n  };\n}\n```\n\n#### Adapter Pattern\n```javascript\nclass OldAPIAdapter {\n  constructor(oldAPI) {\n    this.oldAPI = oldAPI;\n  }\n  \n  fetchData() {\n    const oldData = this.oldAPI.getData();\n    return {\n      data: oldData.items,\n      total: oldData.count\n    };\n  }\n}\n```\n\n### 3. Behavioral Patterns\n\n#### Observer Pattern\n```javascript\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  \n  on(event, callback) {\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    this.events[event].push(callback);\n  }\n  \n  emit(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach(callback => callback(data));\n    }\n  }\n}\n```\n\n## React-Specific Patterns:\n- **Higher-Order Components (HOCs)**: Enhancing components with additional functionality\n- **Render Props**: Sharing code between components using a prop whose value is a function\n- **Compound Components**: Components that work together to form a complete UI\n- **Custom Hooks**: Extracting component logic into reusable functions\n\n## Benefits:\n- **Code Reusability**: Avoid duplicating solutions\n- **Maintainability**: Easier to understand and modify\n- **Scalability**: Patterns help manage complexity\n- **Team Consistency**: Common approaches across the team\n- **Problem Solving**: Proven solutions to common issues",
    type: 'open-ended',
    cardType: 'Framework Questions',
    category: 'Design Patterns',
    categoryId: 'cat-design-patterns',
    categorySlug: 'design-patterns',
    topic: 'Creational Patterns',
    topicId: 'dp-creational',
    topicSlug: 'creational',
    difficulty: 'intermediate',
    tags: ['design-patterns', 'creational', 'singleton', 'factory', 'frontend'],
    estimatedTime: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
  },
];

async function seedQuestions() {
  try {
    console.log('🌱 Starting questions seeding...');

    // Clear existing questions
    console.log('🗑️ Clearing existing questions...');
    // Note: In a real scenario, you'd want to delete existing questions first
    // For now, we'll just add new ones

    let successCount = 0;
    let errorCount = 0;

    for (const question of sampleQuestions) {
      try {
        // Clean the question data to ensure Firestore compatibility
        const cleanQuestion = {
          title: question.title,
          content: question.content,
          type: question.type,
          cardType: question.cardType,
          category: question.category,
          categoryId: question.categoryId,
          categorySlug: question.categorySlug,
          topic: question.topic,
          topicId: question.topicId,
          topicSlug: question.topicSlug,
          difficulty: question.difficulty,
          tags: question.tags,
          estimatedTime: question.estimatedTime,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'system',
          updatedBy: 'system',
          isActive: true,
        };

        // Use addDoc instead of setDoc to avoid ID conflicts
        const docRef = await addDoc(
          collection(db, 'unifiedQuestions'),
          cleanQuestion
        );

        console.log(`✅ Seeded question: ${question.title} (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error seeding question ${question.title}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Questions seeding completed!`);
    console.log(`✅ Successfully seeded: ${successCount} questions`);
    console.log(`❌ Failed to seed: ${errorCount} questions`);

    // Verify the seeding
    console.log('\n🔍 Verifying seeded questions...');
    const questionsRef = collection(db, 'unifiedQuestions');
    const snapshot = await getDocs(questionsRef);
    console.log(`📊 Total questions in database: ${snapshot.size}`);
  } catch (error) {
    console.error('💥 Error during questions seeding:', error);
    process.exit(1);
  }
}

// Run the seeder
seedQuestions()
  .then(() => {
    console.log('✨ Questions seeding process completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Questions seeding process failed:', error);
    process.exit(1);
  });
