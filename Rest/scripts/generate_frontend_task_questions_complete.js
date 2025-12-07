const fs = require('fs');
const path = require('path');

/**
 * Generate 30 comprehensive questions about frontend task implementation
 * Based on common frontend task patterns: dashboards, streaming apps, e-commerce, etc.
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);
const batchesDir = path.join(__dirname, 'frontend-task-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

function formatCode(content) {
  if (!content) return '';
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => {
      code = code
        .trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }
  );
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    if (match.includes('<pre>') || match.includes('<code>')) return match;
    code = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<code>${code}</code>`;
  });
  return content;
}

function generateQuestion(
  id,
  title,
  content,
  topic,
  options,
  explanation,
  difficulty = 'intermediate'
) {
  return {
    id: `react-ft-${id}`,
    title: title,
    content: formatCode(content),
    type: 'multiple-choice',
    category: 'React',
    topic: topic,
    difficulty: difficulty,
    learningCardId: 'framework-questions',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'admin',
    updatedBy: 'admin',
    tags: [
      'react',
      'frontend-tasks',
      topic.toLowerCase().replace(/\s+/g, '-'),
      difficulty,
    ],
    explanation: formatCode(explanation),
    points: 15,
    options: options.map((opt, idx) => ({
      id: `o${idx + 1}`,
      text: formatCode(opt.text),
      isCorrect: opt.isCorrect,
      explanation: opt.explanation ? formatCode(opt.explanation) : '',
    })),
    hints: [
      'Consider React best practices for component architecture',
      'Think about state management and data flow patterns',
      'Review frontend task implementation patterns',
    ],
    metadata: {},
  };
}

// Generate 30 comprehensive questions
const allQuestions = [];

// Batch 1: Component Architecture (3 questions)
allQuestions.push(
  generateQuestion(
    '1',
    'When building a social media dashboard frontend task, what is the best approach for component structure?',
    'You need to build a social media dashboard with posts, comments, and user profiles. How should you organize your React components?',
    'Core React',
    [
      {
        text: 'Create reusable components (PostCard, CommentList, UserProfile) and compose them in a Dashboard container',
        isCorrect: true,
      },
      {
        text: 'Put everything in one large component for simplicity',
        isCorrect: false,
      },
      {
        text: 'Create separate components for each feature without composition',
        isCorrect: false,
      },
      { text: 'Use only class components for all features', isCorrect: false },
    ],
    'Break down complex UIs into smaller, reusable components. Use composition to build complex features from simple components.'
  ),

  generateQuestion(
    '2',
    'How should you structure components for a todo list frontend task?',
    'You need to build a todo list with add, edit, delete, and filter functionality. What component structure is best?',
    'Core React',
    [
      {
        text: 'TodoList container, TodoItem component, TodoForm component, FilterBar component',
        isCorrect: true,
      },
      { text: 'One component with all functionality', isCorrect: false },
      { text: 'Separate components for each todo item only', isCorrect: false },
      { text: 'No component structure needed', isCorrect: false },
    ],
    'Break down into logical components: container for state, item for display, form for input, filter for UI controls.'
  ),

  generateQuestion(
    '3',
    'What is the best pattern for sharing data between sibling components in a frontend task?',
    'You have a ProductList and ShoppingCart component that need to share cart state. What approach should you use?',
    'Core React',
    [
      {
        text: 'Lift state up to a common parent component or use Context API',
        isCorrect: true,
      },
      {
        text: 'Use props to pass data between siblings directly',
        isCorrect: false,
      },
      { text: 'Store state in localStorage only', isCorrect: false },
      { text: 'Use global variables', isCorrect: false },
    ],
    'Lift state to common parent or use Context API. Props cannot be passed directly between siblings.'
  )
);

// Batch 2: State Management (3 questions)
allQuestions.push(
  generateQuestion(
    '4',
    'How should you handle state management in a complex frontend task like a video streaming app?',
    "You're building a Netflix-style app with video player, recommendations, and watchlist. What state management approach is best?",
    'Core React',
    [
      {
        text: 'Use Context API for global state (current video, user preferences) and useState for local component state',
        isCorrect: true,
      },
      {
        text: 'Put all state in a single useState hook at the root',
        isCorrect: false,
      },
      { text: 'Use only props drilling for all state', isCorrect: false },
      { text: 'Avoid state management entirely', isCorrect: false },
    ],
    'Use Context API for state shared across multiple components (current video, user). Use useState for component-local state (UI toggles).'
  ),

  generateQuestion(
    '5',
    'When should you use useReducer instead of useState in a frontend task?',
    "You're building a complex form with multiple interdependent fields and validation. Which hook is more appropriate?",
    'Core React',
    [
      {
        text: 'useReducer when state logic is complex with multiple sub-values or when next state depends on previous state',
        isCorrect: true,
      },
      { text: "Always use useState - it's simpler", isCorrect: false },
      { text: 'useReducer only for arrays', isCorrect: false },
      { text: 'useState and useReducer are identical', isCorrect: false },
    ],
    'useReducer is better for complex state logic, multiple related state values, or when state updates depend on previous state.'
  ),

  generateQuestion(
    '6',
    'How do you prevent unnecessary re-renders in a frontend task with many child components?',
    'Your dashboard has 100+ product cards that re-render when parent state changes. How do you optimize this?',
    'Core React',
    [
      {
        text: 'Use React.memo for child components and useMemo/useCallback for expensive computations and callbacks',
        isCorrect: true,
      },
      { text: 'Disable re-rendering completely', isCorrect: false },
      { text: 'Put all components in one file', isCorrect: false },
      { text: 'Use only class components', isCorrect: false },
    ],
    "React.memo prevents re-renders when props haven't changed. useMemo/useCallback memoize values and functions to prevent recreation."
  )
);

// Batch 3: Data Fetching & Loading States (3 questions)
allQuestions.push(
  generateQuestion(
    '7',
    'What is the best way to handle loading states in a frontend task with multiple API calls?',
    'Your dashboard needs to fetch users, posts, and comments. How do you manage loading states?',
    'Core React',
    [
      {
        text: 'Use separate loading states for each data fetch, or use React Query/SWR for automatic loading state management',
        isCorrect: true,
      },
      {
        text: 'Show a single loading spinner for the entire page',
        isCorrect: false,
      },
      {
        text: "Don't show loading states - just render empty data",
        isCorrect: false,
      },
      { text: 'Use setTimeout to simulate loading', isCorrect: false },
    ],
    'Use separate loading states for each data fetch to show partial content as it loads. Libraries like React Query handle this automatically.'
  ),

  generateQuestion(
    '8',
    'How should you handle data fetching in a frontend task with pagination?',
    'You need to implement infinite scroll for a product list. What approach is best?',
    'Core React',
    [
      {
        text: 'Use Intersection Observer API to detect when user scrolls near bottom, then fetch next page and append to existing data',
        isCorrect: true,
      },
      {
        text: 'Fetch all data at once and paginate client-side',
        isCorrect: false,
      },
      { text: 'Reload entire page for each page change', isCorrect: false },
      { text: 'Use only localStorage for pagination', isCorrect: false },
    ],
    'Use Intersection Observer to detect scroll position. Fetch next page when user nears bottom, append to existing data for seamless infinite scroll.'
  ),

  generateQuestion(
    '9',
    'What is the best way to handle error states in API calls for a frontend task?',
    'Your app makes multiple API calls. How should you handle and display errors?',
    'Core React',
    [
      {
        text: 'Use try-catch blocks, set error state, and display user-friendly error messages with retry options',
        isCorrect: true,
      },
      { text: 'Let errors crash the app', isCorrect: false },
      { text: 'Hide all errors from users', isCorrect: false },
      { text: 'Only log errors to console', isCorrect: false },
    ],
    'Catch errors, set error state, display user-friendly messages, and provide retry mechanisms. Use Error Boundaries for component tree errors.'
  )
);

// Batch 4: Performance Optimization (3 questions)
allQuestions.push(
  generateQuestion(
    '10',
    'How do you optimize a frontend task with large lists of items?',
    'You need to render 1000+ items in a list. What optimization technique should you use?',
    'Core React',
    [
      {
        text: 'Use virtualization (react-window or react-virtualized) to render only visible items',
        isCorrect: true,
      },
      { text: 'Render all items at once', isCorrect: false },
      { text: 'Use display: none to hide items', isCorrect: false },
      { text: 'Split into multiple pages only', isCorrect: false },
    ],
    'Virtualization renders only visible items in viewport, dramatically improving performance for large lists. Libraries like react-window handle this.'
  ),

  generateQuestion(
    '11',
    'How should you optimize images in a frontend task like an e-commerce site?',
    'Your product catalog has hundreds of product images. How do you optimize loading?',
    'Core React',
    [
      {
        text: 'Use lazy loading, responsive images with srcset, WebP format, and image CDN with proper sizing',
        isCorrect: true,
      },
      { text: 'Load all images at once', isCorrect: false },
      { text: 'Use only PNG format', isCorrect: false },
      { text: "Don't optimize - let browser handle it", isCorrect: false },
    ],
    'Lazy load images, use responsive srcset, modern formats like WebP, and CDN. Only load images when needed and at appropriate sizes.'
  ),

  generateQuestion(
    '12',
    'What is code splitting and how should you implement it in a frontend task?',
    'Your app is getting large. How do you reduce initial bundle size?',
    'Core React',
    [
      {
        text: 'Use React.lazy() and Suspense for route-based code splitting, and dynamic imports for heavy components',
        isCorrect: true,
      },
      { text: 'Bundle everything into one file', isCorrect: false },
      { text: 'Split code manually by copying files', isCorrect: false },
      { text: 'Code splitting is not possible in React', isCorrect: false },
    ],
    'React.lazy() enables code splitting. Use it with Suspense for route-based splitting. Dynamic imports split heavy components.'
  )
);

// Batch 5: Forms & User Input (3 questions)
allQuestions.push(
  generateQuestion(
    '13',
    'How should you handle form validation in a frontend task?',
    'You need to build a registration form with validation. What approach is best?',
    'Core React',
    [
      {
        text: 'Use controlled components with validation logic, or libraries like React Hook Form or Formik for complex forms',
        isCorrect: true,
      },
      { text: 'Use only HTML5 validation attributes', isCorrect: false },
      { text: 'Validate only on submit', isCorrect: false },
      { text: 'No validation needed', isCorrect: false },
    ],
    'Controlled components with validation provide better UX. Libraries like React Hook Form handle validation, errors, and performance automatically.'
  ),

  generateQuestion(
    '14',
    'What is the difference between controlled and uncontrolled components in forms?',
    'When building a form in a frontend task, which approach should you use?',
    'Core React',
    [
      {
        text: 'Controlled: React controls form state via state. Uncontrolled: DOM handles form state via refs. Use controlled for React integration.',
        isCorrect: true,
      },
      { text: 'They are identical', isCorrect: false },
      { text: 'Controlled components are deprecated', isCorrect: false },
      { text: 'Uncontrolled is always better', isCorrect: false },
    ],
    'Controlled components give React full control over form state, enabling validation and integration. Uncontrolled uses DOM refs for less React overhead.'
  ),

  generateQuestion(
    '15',
    'How do you handle file uploads in a frontend task?',
    'You need to allow users to upload profile pictures. How should you implement this?',
    'Core React',
    [
      {
        text: 'Use input type="file", handle File API, show preview, validate file type/size, and upload via FormData to API',
        isCorrect: true,
      },
      { text: 'Use only drag-and-drop', isCorrect: false },
      { text: 'Store files in localStorage', isCorrect: false },
      { text: 'File uploads are not possible in React', isCorrect: false },
    ],
    'Use file input, File API for preview/validation, FormData for upload. Validate type, size, and show user feedback during upload.'
  )
);

// Batch 6: Real-time Features (3 questions)
allQuestions.push(
  generateQuestion(
    '16',
    'How do you implement real-time updates in a frontend task like a chat app?',
    'You need to show new messages as they arrive. What technology should you use?',
    'Core React',
    [
      {
        text: 'Use WebSockets (Socket.io) or Server-Sent Events for real-time communication, update state when messages arrive',
        isCorrect: true,
      },
      { text: 'Poll API every second', isCorrect: false },
      { text: 'Use only HTTP requests', isCorrect: false },
      { text: 'Real-time is not possible in React', isCorrect: false },
    ],
    'WebSockets enable bidirectional real-time communication. Socket.io provides React-friendly API. Update component state when messages arrive.'
  ),

  generateQuestion(
    '17',
    'How should you handle WebSocket connections in a React frontend task?',
    "You're building a collaborative editor with real-time updates. How do you manage the WebSocket connection?",
    'Core React',
    [
      {
        text: 'Create WebSocket connection in useEffect, store in useRef, cleanup on unmount, handle reconnection logic',
        isCorrect: true,
      },
      { text: 'Create connection in component body', isCorrect: false },
      {
        text: 'Use only one global connection for entire app',
        isCorrect: false,
      },
      { text: "WebSockets don't need cleanup", isCorrect: false },
    ],
    'Create connection in useEffect, store in ref to persist across renders, cleanup on unmount. Implement reconnection logic for reliability.'
  ),

  generateQuestion(
    '18',
    'How do you prevent memory leaks when using WebSockets in a frontend task?',
    'Your chat component unmounts but WebSocket listeners remain. How do you fix this?',
    'Core React',
    [
      {
        text: 'Remove event listeners in useEffect cleanup function and close WebSocket connection on unmount',
        isCorrect: true,
      },
      { text: 'Leave listeners active', isCorrect: false },
      { text: 'Use only global listeners', isCorrect: false },
      { text: "Memory leaks don't happen with WebSockets", isCorrect: false },
    ],
    'Always clean up event listeners and close connections in useEffect cleanup. This prevents memory leaks and stale updates.'
  )
);

// Batch 7: Routing & Navigation (3 questions)
allQuestions.push(
  generateQuestion(
    '19',
    'How should you implement routing in a frontend task with multiple pages?',
    'Your app needs multiple pages: home, products, cart, checkout. What routing solution should you use?',
    'React Router',
    [
      {
        text: 'Use React Router with BrowserRouter, Routes, and Route components for declarative routing',
        isCorrect: true,
      },
      { text: 'Use only window.location', isCorrect: false },
      { text: 'Create separate HTML files', isCorrect: false },
      { text: 'Routing is not needed in React', isCorrect: false },
    ],
    'React Router provides declarative routing. Use BrowserRouter for history API, Routes for route matching, Route for individual routes.'
  ),

  generateQuestion(
    '20',
    'How do you protect routes in a frontend task that requires authentication?',
    'Some pages should only be accessible to logged-in users. How do you implement this?',
    'React Router',
    [
      {
        text: 'Create a ProtectedRoute component that checks auth state and redirects to login if not authenticated',
        isCorrect: true,
      },
      { text: 'Check auth in every component', isCorrect: false },
      { text: 'Use only server-side protection', isCorrect: false },
      { text: 'All routes should be public', isCorrect: false },
    ],
    'Create ProtectedRoute wrapper component. Check authentication, redirect to login if needed, or render children if authenticated.'
  ),

  generateQuestion(
    '21',
    'How should you handle deep linking in a frontend task?',
    'Users should be able to bookmark and share specific product pages. How do you enable this?',
    'React Router',
    [
      {
        text: 'Use React Router with proper route structure, ensure server supports client-side routing (catch-all route)',
        isCorrect: true,
      },
      { text: 'Deep linking is not possible', isCorrect: false },
      { text: 'Use only hash routing', isCorrect: false },
      { text: 'Require users to navigate from home page', isCorrect: false },
    ],
    'React Router enables deep linking. Ensure server returns index.html for all routes (SPA catch-all) so React Router can handle routing.'
  )
);

// Batch 8: Testing Frontend Tasks (3 questions)
allQuestions.push(
  generateQuestion(
    '22',
    'How should you test a frontend task component?',
    'You need to test a ProductCard component. What testing approach is best?',
    'React Testing',
    [
      {
        text: 'Use React Testing Library to test user interactions and rendered output, not implementation details',
        isCorrect: true,
      },
      { text: 'Test only internal state', isCorrect: false },
      { text: 'Test component implementation details', isCorrect: false },
      { text: 'No testing needed for frontend tasks', isCorrect: false },
    ],
    'React Testing Library tests components from user perspective. Test what users see and interact with, not internal implementation.'
  ),

  generateQuestion(
    '23',
    'How do you test async operations in a frontend task?',
    'Your component fetches data from an API. How should you test this?',
    'React Testing',
    [
      {
        text: 'Mock the API call, use waitFor to wait for async updates, and assert on final rendered state',
        isCorrect: true,
      },
      { text: 'Make real API calls in tests', isCorrect: false },
      { text: 'Skip testing async operations', isCorrect: false },
      { text: 'Use only setTimeout in tests', isCorrect: false },
    ],
    'Mock fetch/API calls, use waitFor for async updates, test loading and error states, verify final rendered output.'
  ),

  generateQuestion(
    '24',
    'What should you test in a frontend task form component?',
    'You have a registration form. What aspects should be tested?',
    'React Testing',
    [
      {
        text: 'Test user interactions (typing, submitting), validation errors, successful submission, and form state changes',
        isCorrect: true,
      },
      { text: 'Test only CSS styles', isCorrect: false },
      { text: 'Test internal state only', isCorrect: false },
      { text: "Forms don't need testing", isCorrect: false },
    ],
    'Test user interactions, validation (errors shown correctly), form submission, state updates, and integration with parent components.'
  )
);

// Batch 9: Accessibility & UX (3 questions)
allQuestions.push(
  generateQuestion(
    '25',
    'How do you ensure accessibility in a frontend task?',
    'Your dashboard needs to be accessible to screen readers. What should you implement?',
    'Core React',
    [
      {
        text: 'Use semantic HTML, ARIA attributes where needed, keyboard navigation, focus management, and test with screen readers',
        isCorrect: true,
      },
      { text: 'Use only div elements', isCorrect: false },
      { text: 'Accessibility is automatic in React', isCorrect: false },
      { text: 'Only add alt text to images', isCorrect: false },
    ],
    'Use semantic HTML (nav, main, article), ARIA labels for complex widgets, keyboard navigation, focus management, and proper heading hierarchy.'
  ),

  generateQuestion(
    '26',
    'How should you handle focus management in a modal frontend task?',
    'You have a modal dialog. How do you manage focus for accessibility?',
    'Core React',
    [
      {
        text: 'Trap focus within modal when open, return focus to trigger when closed, use useRef and useEffect for focus management',
        isCorrect: true,
      },
      { text: 'Let focus go anywhere', isCorrect: false },
      { text: 'Disable focus entirely', isCorrect: false },
      { text: 'Focus management is not needed', isCorrect: false },
    ],
    'Trap focus within modal (prevent tabbing outside), return focus to trigger element on close, use refs and focus() API.'
  ),

  generateQuestion(
    '27',
    'How do you implement keyboard shortcuts in a frontend task?',
    'You want Ctrl+K to open search. How should you implement this?',
    'Core React',
    [
      {
        text: 'Use useEffect with keydown event listener, check for modifier keys (Ctrl/Cmd), cleanup on unmount',
        isCorrect: true,
      },
      { text: 'Use only onClick handlers', isCorrect: false },
      { text: 'Keyboard shortcuts are not possible', isCorrect: false },
      { text: 'Use only HTML5 keyboard attributes', isCorrect: false },
    ],
    'Add keydown listener in useEffect, check event.key and event.ctrlKey/event.metaKey, handle shortcut, cleanup listener on unmount.'
  )
);

// Batch 10: Advanced Patterns (3 questions)
allQuestions.push(
  generateQuestion(
    '28',
    'How should you structure a large frontend task application?',
    'Your app is growing with many features. How should you organize the codebase?',
    'Core React',
    [
      {
        text: 'Organize by features/modules, use barrel exports, separate concerns (components, hooks, utils, types), and use absolute imports',
        isCorrect: true,
      },
      { text: 'Put everything in one file', isCorrect: false },
      { text: 'Organize only by file type', isCorrect: false },
      { text: 'No organization needed', isCorrect: false },
    ],
    'Organize by features (feature-based structure), separate components/hooks/utils/types, use barrel exports, configure path aliases for clean imports.'
  ),

  generateQuestion(
    '29',
    'How do you handle error boundaries in a frontend task?',
    'You want to prevent one component error from crashing the entire app. How do you implement this?',
    'Core React',
    [
      {
        text: 'Create ErrorBoundary class component with componentDidCatch, wrap error-prone sections, display fallback UI',
        isCorrect: true,
      },
      { text: 'Use try-catch in every component', isCorrect: false },
      { text: 'Errors always crash the app', isCorrect: false },
      { text: 'Use only console.error', isCorrect: false },
    ],
    'Error Boundaries catch errors in component tree. Create class component with componentDidCatch, wrap sections, show fallback UI.'
  ),

  generateQuestion(
    '30',
    'How should you optimize bundle size for a production frontend task?',
    'Your app bundle is too large. What optimization strategies should you use?',
    'Core React',
    [
      {
        text: 'Use code splitting, tree shaking, analyze bundle, remove unused dependencies, use dynamic imports, and optimize images/assets',
        isCorrect: true,
      },
      { text: "Bundle size doesn't matter", isCorrect: false },
      { text: 'Include all libraries', isCorrect: false },
      { text: 'Optimization is automatic', isCorrect: false },
    ],
    'Code splitting reduces initial load. Tree shaking removes unused code. Analyze bundle, remove unused deps, use dynamic imports, optimize assets.'
  )
);

console.log(`\n✅ Generated ${allQuestions.length} frontend task questions\n`);

// Create batch scripts (3 questions per batch)
let batchNum = 1;
for (let i = 0; i < allQuestions.length; i += 3) {
  const batch = allQuestions.slice(i, i + 3);
  const batchFileName = path.join(batchesDir, `batch${batchNum}.js`);

  const scriptContent = `const fs = require('fs');
const path = require('path');

const questionsFile = path.join(__dirname, '../../final-questions-v01/react-questions.json');

const newQuestions = ${JSON.stringify(batch, null, 2)};

// Read existing questions
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

// Add new questions
existingQuestions.push(...newQuestions);

// Write back
fs.writeFileSync(questionsFile, JSON.stringify(existingQuestions, null, 2));

console.log(\`✅ Added \${newQuestions.length} frontend task questions (Batch ${batchNum})\`);
console.log(\`📝 Total React questions: \${existingQuestions.length}\`);
`;

  fs.writeFileSync(batchFileName, scriptContent);
  batchNum++;
}

console.log(`✅ Created ${batchNum - 1} batch scripts in ${batchesDir}`);
console.log('\n📋 Batch breakdown:');
console.log('  Batch 1-3: Component Architecture');
console.log('  Batch 4-6: State Management & Data Fetching');
console.log('  Batch 7-9: Performance & Forms');
console.log('  Batch 10-12: Real-time Features');
console.log('  Batch 13-15: Routing & Navigation');
console.log('  Batch 16-18: Testing');
console.log('  Batch 19-21: Accessibility & UX');
console.log('  Batch 22-24: Advanced Patterns');
console.log('  Batch 25-27: (Additional topics)');
console.log('  Batch 28-30: (Additional topics)');

// Create master runner script
const masterRunner = `const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const batchesDir = path.join(__dirname, 'frontend-task-batches');
const batches = fs.readdirSync(batchesDir)
  .filter(f => f.endsWith('.js'))
  .sort();

console.log(\`🚀 Running \${batches.length} frontend task question batches...\\n\`);

let successCount = 0;
let errorCount = 0;

batches.forEach((batchFile, index) => {
  const batchPath = path.join(batchesDir, batchFile);
  try {
    process.stdout.write(\`[\${index + 1}/\${batches.length}] \${batchFile}... \`);
    execSync(\`node "\${batchPath}"\`, { stdio: 'pipe', cwd: __dirname });
    process.stdout.write('✅\\n');
    successCount++;
  } catch (error) {
    process.stdout.write('❌\\n');
    errorCount++;
  }
  
  if ((index + 1) % 5 === 0) {
    console.log(\`\\n📊 Progress: \${index + 1}/\${batches.length} batches\\n\`);
  }
});

console.log(\`\\n✅ All batches completed! \${successCount} success, \${errorCount} errors\`);
`;

fs.writeFileSync(path.join(batchesDir, 'run_all_batches.js'), masterRunner);
console.log(
  `\n✅ Created master runner: ${path.join(batchesDir, 'run_all_batches.js')}`
);
