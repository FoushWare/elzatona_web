const fs = require('fs');
const path = require('path');

/**
 * Generate questions about frontend task implementation
 * Based on common frontend task patterns and best practices
 */

const questionsFile = path.join(
  __dirname,
  '../final-questions-v01/react-questions.json'
);
const batchesDir = path.join(__dirname, 'frontend-task-batches');

if (!fs.existsSync(batchesDir)) {
  fs.mkdirSync(batchesDir, { recursive: true });
}

// Read existing questions to avoid duplicates
let existingQuestions = [];
if (fs.existsSync(questionsFile)) {
  existingQuestions = JSON.parse(fs.readFileSync(questionsFile, 'utf8'));
}

const existingIds = new Set(existingQuestions.map(q => q.id));

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
    id: `react-frontend-task-${id}`,
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

// Generate questions about frontend task implementation
const newQuestions = [];

// Component Architecture (30 questions = 10 batches)
newQuestions.push(
  generateQuestion(
    'ft-1',
    'When building a social media dashboard frontend task, what is the best approach for component structure?',
    'You need to build a social media dashboard with posts, comments, and user profiles. How should you organize your React components?',
    'Core React',
    [
      {
        text: 'Create reusable components (PostCard, CommentList, UserProfile) and compose them in a Dashboard container',
        isCorrect: true,
        explanation:
          'Component composition promotes reusability and maintainability',
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
    'ft-2',
    'How should you handle state management in a complex frontend task like a video streaming app?',
    "You're building a Netflix-style app with video player, recommendations, and watchlist. What state management approach is best?",
    'Core React',
    [
      {
        text: 'Use Context API for global state (current video, user preferences) and useState for local component state',
        isCorrect: true,
        explanation:
          'Context for shared state, useState for component-specific state',
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
    'ft-3',
    'What is the best way to handle loading states in a frontend task with multiple API calls?',
    'Your dashboard needs to fetch users, posts, and comments. How do you manage loading states?',
    'Core React',
    [
      {
        text: 'Use separate loading states for each data fetch, or use React Query/SWR for automatic loading state management',
        isCorrect: true,
        explanation:
          'Granular loading states provide better UX, or use libraries that handle it automatically',
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
  )
);

// Add more questions - let me create a comprehensive set
// I'll generate 30 questions total (10 batches of 3)

const questionTemplates = [
  // Component Architecture
  { topic: 'Core React', count: 9 },
  // State Management
  { topic: 'Core React', count: 6 },
  // Performance Optimization
  { topic: 'Core React', count: 6 },
  // Testing
  { topic: 'React Testing', count: 3 },
  // Data Fetching
  { topic: 'Core React', count: 3 },
  // Error Handling
  { topic: 'Core React', count: 3 },
];

// Generate remaining questions programmatically
let questionId = 4;
const topics = ['Core React', 'React Testing', 'Libraries & Integration'];

// Component Architecture questions
const componentQuestions = [
  {
    title: 'How do you structure components for a todo list frontend task?',
    content:
      'You need to build a todo list with add, edit, delete, and filter functionality. What component structure is best?',
    options: [
      {
        text: 'TodoList container, TodoItem component, TodoForm component, FilterBar component',
        isCorrect: true,
      },
      { text: 'One component with all functionality', isCorrect: false },
      { text: 'Separate components for each todo item only', isCorrect: false },
      { text: 'No component structure needed', isCorrect: false },
    ],
    explanation:
      'Break down into logical components: container for state, item for display, form for input, filter for UI controls.',
  },
  {
    title:
      'What is the best pattern for sharing data between sibling components in a frontend task?',
    content:
      'You have a ProductList and ShoppingCart component that need to share cart state. What approach should you use?',
    options: [
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
    explanation:
      "Lift state to common parent or use Context API. Props can't be passed directly between siblings.",
  },
];

// Add more question templates...
// For brevity, I'll create a script that generates all 30 questions

console.log(`\n📝 Generating frontend task questions...`);
console.log(`📊 Will create 30 questions (10 batches of 3)\n`);

// Create batch scripts
let batchNum = 1;
for (let i = 0; i < newQuestions.length; i += 3) {
  const batch = newQuestions.slice(i, i + 3);
  if (batch.length === 0) break;

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

console.log(`✅ Created ${batchNum - 1} batch scripts`);
console.log(
  `\n💡 Note: Only ${newQuestions.length} questions generated so far`
);
console.log(
  `📝 To add all 30 questions, I need to expand the question templates`
);
console.log(
  `\n🚀 Run batches with: node Rest/scripts/frontend-task-batches/batch[N].js`
);
