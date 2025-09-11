#!/usr/bin/env node

/**
 * Script to create multiple-choice questions from open-ended QuestionsBank content
 * This will create additional multiple-choice questions based on the existing content
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// Configuration
// const QUESTIONS_BANK_DIR = path.join(__dirname, '..', 'QuestionsBank'); // Unused
const API_BASE_URL = 'http://localhost:3000';

// Learning path mapping
const LEARNING_PATH_MAPPING = {
  'frontend-basics': 'frontend-basics',
  'advanced-css': 'advanced-css',
  'javascript-deep-dive': 'javascript-deep-dive',
  'react-mastery': 'react-mastery',
  'typescript-essentials': 'typescript-essentials',
  'web-performance': 'performance-optimization',
  security: 'security',
  'testing-strategies': 'testing-strategies',
  'system-design': 'system-design',
  accessibility: 'accessibility',
  'api-design': 'api-integration',
  'api-integration': 'api-integration',
  'git-version-control': 'git-version-control',
  'english-learning': 'english-learning',
  'deployment-devops': 'performance-optimization',
};

// Pre-defined multiple-choice questions for each learning path
const ADDITIONAL_QUESTIONS = {
  'advanced-css': [
    {
      id: 'css-grid-1',
      question: 'What is the main difference between CSS Grid and Flexbox?',
      options: [
        'Grid is 1-dimensional, Flexbox is 2-dimensional',
        'Grid is 2-dimensional, Flexbox is 1-dimensional',
        'Grid is for layouts, Flexbox is for styling',
        'There is no difference',
      ],
      correctAnswer: 1,
      explanation:
        'CSS Grid is a 2-dimensional layout system (rows and columns), while Flexbox is 1-dimensional (either row OR column).',
      category: 'CSS',
      difficulty: 'intermediate',
      tags: ['css', 'grid', 'flexbox', 'layout'],
    },
    {
      id: 'css-variables-1',
      question: 'How do you define a CSS custom property (variable)?',
      options: [
        'var(--name: value)',
        '--name: value',
        'custom(--name, value)',
        'variable(--name: value)',
      ],
      correctAnswer: 1,
      explanation:
        'CSS custom properties are defined using the syntax --name: value, typically within the :root selector.',
      category: 'CSS',
      difficulty: 'intermediate',
      tags: ['css', 'variables', 'custom-properties'],
    },
  ],
  'javascript-deep-dive': [
    {
      id: 'js-closure-1',
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that returns another function',
        'A function that has access to variables in its outer scope',
        'A function that takes no parameters',
        'A function that is defined inside another function',
      ],
      correctAnswer: 1,
      explanation:
        'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function returns.',
      category: 'JavaScript',
      difficulty: 'intermediate',
      tags: ['javascript', 'closure', 'scope'],
    },
    {
      id: 'js-promise-1',
      question: 'What does Promise.all() do?',
      options: [
        'Returns the first resolved promise',
        'Returns all promises when they are all resolved',
        'Returns the last resolved promise',
        'Returns promises in the order they were created',
      ],
      correctAnswer: 1,
      explanation:
        'Promise.all() returns a single Promise that resolves when all input promises have resolved, or rejects if any input promise rejects.',
      category: 'JavaScript',
      difficulty: 'intermediate',
      tags: ['javascript', 'promise', 'async'],
    },
  ],
  'react-mastery': [
    {
      id: 'react-hooks-1',
      question: 'What is the main rule of React Hooks?',
      options: [
        'Only call hooks in class components',
        'Only call hooks at the top level of functions',
        'Only call hooks in useEffect',
        'Only call hooks in event handlers',
      ],
      correctAnswer: 1,
      explanation:
        'The main rule of React Hooks is to only call hooks at the top level of React functions, not inside loops, conditions, or nested functions.',
      category: 'React',
      difficulty: 'intermediate',
      tags: ['react', 'hooks', 'rules'],
    },
    {
      id: 'react-useeffect-1',
      question: 'What does the dependency array in useEffect control?',
      options: [
        'When the component renders',
        'When the effect runs',
        'When the component unmounts',
        'When props change',
      ],
      correctAnswer: 1,
      explanation:
        'The dependency array in useEffect controls when the effect runs - it will re-run whenever any value in the dependency array changes.',
      category: 'React',
      difficulty: 'intermediate',
      tags: ['react', 'useeffect', 'dependencies'],
    },
  ],
  'typescript-essentials': [
    {
      id: 'ts-interfaces-1',
      question: 'What is the main purpose of TypeScript interfaces?',
      options: [
        'To create classes',
        'To define the shape of objects',
        'To import modules',
        'To handle errors',
      ],
      correctAnswer: 1,
      explanation:
        'TypeScript interfaces define the shape or structure of objects, specifying what properties and methods an object should have.',
      category: 'TypeScript',
      difficulty: 'intermediate',
      tags: ['typescript', 'interfaces', 'types'],
    },
    {
      id: 'ts-generics-1',
      question: 'What are TypeScript generics used for?',
      options: [
        'To create functions that work with any type',
        'To create type-safe functions that work with multiple types',
        'To create classes only',
        'To handle runtime errors',
      ],
      correctAnswer: 1,
      explanation:
        'TypeScript generics allow you to create reusable components that work with multiple types while maintaining type safety.',
      category: 'TypeScript',
      difficulty: 'intermediate',
      tags: ['typescript', 'generics', 'types'],
    },
  ],
  security: [
    {
      id: 'security-xss-1',
      question: 'What is XSS (Cross-Site Scripting)?',
      options: [
        'A way to style websites',
        'A security vulnerability where malicious scripts are injected',
        'A method to share data between sites',
        'A type of database attack',
      ],
      correctAnswer: 1,
      explanation:
        'XSS is a security vulnerability where attackers inject malicious scripts into web pages viewed by other users.',
      category: 'Security',
      difficulty: 'intermediate',
      tags: ['security', 'xss', 'vulnerability'],
    },
    {
      id: 'security-csrf-1',
      question: 'What is CSRF (Cross-Site Request Forgery)?',
      options: [
        'A way to prevent attacks',
        'An attack that tricks users into performing unwanted actions',
        'A method to encrypt data',
        'A type of SQL injection',
      ],
      correctAnswer: 1,
      explanation:
        'CSRF is an attack that tricks users into performing unwanted actions on a web application where they are authenticated.',
      category: 'Security',
      difficulty: 'intermediate',
      tags: ['security', 'csrf', 'attack'],
    },
  ],
  'testing-strategies': [
    {
      id: 'testing-unit-1',
      question: 'What is unit testing?',
      options: [
        'Testing the entire application',
        'Testing individual components or functions in isolation',
        'Testing user interfaces only',
        'Testing database connections',
      ],
      correctAnswer: 1,
      explanation:
        'Unit testing involves testing individual components or functions in isolation to ensure they work correctly.',
      category: 'Testing',
      difficulty: 'intermediate',
      tags: ['testing', 'unit', 'isolation'],
    },
    {
      id: 'testing-integration-1',
      question: 'What is integration testing?',
      options: [
        'Testing individual functions',
        'Testing how different parts of the system work together',
        'Testing only the frontend',
        'Testing only the backend',
      ],
      correctAnswer: 1,
      explanation:
        'Integration testing verifies that different parts of the system work together correctly.',
      category: 'Testing',
      difficulty: 'intermediate',
      tags: ['testing', 'integration', 'system'],
    },
  ],
  'system-design': [
    {
      id: 'system-load-balancer-1',
      question: 'What is the purpose of a load balancer?',
      options: [
        'To store data',
        'To distribute incoming requests across multiple servers',
        'To encrypt data',
        'To cache responses',
      ],
      correctAnswer: 1,
      explanation:
        'A load balancer distributes incoming requests across multiple servers to improve performance and reliability.',
      category: 'System Design',
      difficulty: 'intermediate',
      tags: ['system-design', 'load-balancer', 'scalability'],
    },
    {
      id: 'system-caching-1',
      question: 'What is the main benefit of caching?',
      options: [
        'To store data permanently',
        'To improve performance by reducing data access time',
        'To encrypt sensitive data',
        'To backup data',
      ],
      correctAnswer: 1,
      explanation:
        'Caching improves performance by storing frequently accessed data in fast storage, reducing the time needed to retrieve it.',
      category: 'System Design',
      difficulty: 'intermediate',
      tags: ['system-design', 'caching', 'performance'],
    },
  ],
  accessibility: [
    {
      id: 'a11y-aria-1',
      question: 'What is ARIA in web accessibility?',
      options: [
        'A programming language',
        'A set of attributes that make web content more accessible',
        'A CSS framework',
        'A JavaScript library',
      ],
      correctAnswer: 1,
      explanation:
        'ARIA (Accessible Rich Internet Applications) provides attributes that make web content more accessible to users with disabilities.',
      category: 'Accessibility',
      difficulty: 'intermediate',
      tags: ['accessibility', 'aria', 'a11y'],
    },
    {
      id: 'a11y-semantic-1',
      question: 'Why are semantic HTML elements important for accessibility?',
      options: [
        'They make the code shorter',
        'They provide meaning and structure that assistive technologies can understand',
        'They improve performance',
        'They make styling easier',
      ],
      correctAnswer: 1,
      explanation:
        'Semantic HTML elements provide meaning and structure that assistive technologies can understand and communicate to users.',
      category: 'Accessibility',
      difficulty: 'intermediate',
      tags: ['accessibility', 'semantic', 'html'],
    },
  ],
  'git-version-control': [
    {
      id: 'git-commit-1',
      question: 'What does git commit do?',
      options: [
        'Downloads changes from remote repository',
        'Saves changes to the local repository with a message',
        'Creates a new branch',
        'Merges two branches',
      ],
      correctAnswer: 1,
      explanation:
        'git commit saves your staged changes to the local repository with a descriptive message.',
      category: 'Git',
      difficulty: 'beginner',
      tags: ['git', 'commit', 'version-control'],
    },
    {
      id: 'git-branch-1',
      question: 'What is a git branch?',
      options: [
        'A backup of your code',
        'A parallel version of your repository',
        'A way to delete files',
        'A way to rename files',
      ],
      correctAnswer: 1,
      explanation:
        'A git branch is a parallel version of your repository that allows you to work on features without affecting the main code.',
      category: 'Git',
      difficulty: 'beginner',
      tags: ['git', 'branch', 'version-control'],
    },
  ],
};

/**
 * Send questions to Firebase via API
 */
async function sendQuestionsToFirebase(questions, learningPath) {
  if (questions.length === 0) {
    console.log(`No questions to send for ${learningPath}`);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/questions/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(
        `✅ Successfully added ${questions.length} questions for ${learningPath}`
      );
    } else {
      console.error(
        `❌ Failed to add questions for ${learningPath}:`,
        result.error
      );
    }
  } catch (err) {
    console.error(
      `❌ Error sending questions for ${learningPath}:`,
      err.message
    );
  }
}

/**
 * Process all learning paths and add additional questions
 */
async function processAllLearningPaths() {
  console.log(
    '🚀 Adding additional multiple-choice questions to Firebase...\n'
  );

  const learningPaths = Object.keys(ADDITIONAL_QUESTIONS);
  let totalQuestions = 0;

  for (const learningPath of learningPaths) {
    const questions = ADDITIONAL_QUESTIONS[learningPath];
    const firebaseLearningPath = LEARNING_PATH_MAPPING[learningPath];

    if (questions && questions.length > 0) {
      console.log(`📁 Processing ${learningPath}...`);
      console.log(`   Adding ${questions.length} additional questions`);

      // Add learningPath and type to each question
      const formattedQuestions = questions.map(q => ({
        ...q,
        learningPath: firebaseLearningPath,
        type: 'multiple-choice',
      }));

      await sendQuestionsToFirebase(formattedQuestions, firebaseLearningPath);
      totalQuestions += questions.length;
      console.log('');
    }
  }

  console.log(
    `🎉 Additional questions added! Total questions processed: ${totalQuestions}`
  );
}

/**
 * Check if development server is running
 */
async function checkServer() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/questions/frontend-basics`
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Checking if development server is running...');

  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log(
      '❌ Development server is not running. Please start it with: npm run dev'
    );
    process.exit(1);
  }

  console.log('✅ Development server is running\n');

  await processAllLearningPaths();
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  sendQuestionsToFirebase,
  processAllLearningPaths,
};
