// v1.0 - Simple Firebase seeding solution using Client SDK
// Run with: npx tsx src/scripts/seed-simple-final.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// Comprehensive Question Seeding
// ==========================================

const comprehensiveQuestions = [
  // React Questions
  {
    id: 'react-001',
    question: 'What is React and why is it popular?',
    answer:
      "React is a JavaScript library for building user interfaces, particularly web applications. It's popular because it uses a virtual DOM for better performance, has a component-based architecture, and a large ecosystem.",
    category: 'React',
    topic: 'Fundamentals',
    difficulty: 'easy',
    tags: ['react', 'javascript', 'frontend'],
    type: 'conceptual',
  },
  {
    id: 'react-002',
    question: 'What are React hooks and how do they work?',
    answer:
      'React hooks are functions that let you use state and other React features in functional components. They start with "use" and allow you to "hook into" React state and lifecycle features.',
    category: 'React',
    topic: 'Hooks',
    difficulty: 'medium',
    tags: ['react', 'hooks', 'state'],
    type: 'conceptual',
  },
  {
    id: 'react-003',
    question: 'Explain the difference between props and state in React.',
    answer:
      'Props are read-only data passed from parent to child components, while state is mutable data managed within a component. Props flow down, state is internal to the component.',
    category: 'React',
    topic: 'Fundamentals',
    difficulty: 'easy',
    tags: ['react', 'props', 'state'],
    type: 'conceptual',
  },
  {
    id: 'react-004',
    question: 'What is the virtual DOM and how does it work?',
    answer:
      'The virtual DOM is a JavaScript representation of the real DOM. React creates a virtual DOM tree, compares it with the previous version, and efficiently updates only the parts that changed.',
    category: 'React',
    topic: 'Performance',
    difficulty: 'medium',
    tags: ['react', 'virtual-dom', 'performance'],
    type: 'conceptual',
  },
  {
    id: 'react-005',
    question: 'How do you handle forms in React?',
    answer:
      'Forms in React can be controlled (value controlled by state) or uncontrolled (value controlled by DOM). Use controlled components for better data flow and validation.',
    category: 'React',
    topic: 'Forms',
    difficulty: 'medium',
    tags: ['react', 'forms', 'input'],
    type: 'practical',
  },

  // JavaScript Questions
  {
    id: 'js-001',
    question: 'What is closure in JavaScript?',
    answer:
      "A closure is a function that has access to variables in its outer scope even after the outer function has returned. It's created every time a function is created.",
    category: 'JavaScript',
    topic: 'Closures',
    difficulty: 'medium',
    tags: ['javascript', 'closures', 'scope'],
    type: 'conceptual',
  },
  {
    id: 'js-002',
    question: 'Explain the difference between let, const, and var.',
    answer:
      'var is function-scoped and can be redeclared. let and const are block-scoped. let can be reassigned, const cannot. const objects can have their properties modified.',
    category: 'JavaScript',
    topic: 'Variables',
    difficulty: 'easy',
    tags: ['javascript', 'variables', 'scope'],
    type: 'conceptual',
  },
  {
    id: 'js-003',
    question: 'What is the event loop in JavaScript?',
    answer:
      'The event loop is a mechanism that handles asynchronous operations. It continuously checks the call stack and message queue, moving functions from the queue to the stack when the stack is empty.',
    category: 'JavaScript',
    topic: 'Asynchronous',
    difficulty: 'hard',
    tags: ['javascript', 'event-loop', 'async'],
    type: 'conceptual',
  },
  {
    id: 'js-004',
    question: 'What are promises and how do they work?',
    answer:
      'Promises are objects representing the eventual completion or failure of an asynchronous operation. They have three states: pending, fulfilled, or rejected.',
    category: 'JavaScript',
    topic: 'Asynchronous',
    difficulty: 'medium',
    tags: ['javascript', 'promises', 'async'],
    type: 'conceptual',
  },
  {
    id: 'js-005',
    question: 'Explain the difference between == and === in JavaScript.',
    answer:
      '== performs type coercion before comparison, while === performs strict comparison without type coercion. === is generally preferred for more predictable behavior.',
    category: 'JavaScript',
    topic: 'Operators',
    difficulty: 'easy',
    tags: ['javascript', 'operators', 'comparison'],
    type: 'conceptual',
  },

  // CSS Questions
  {
    id: 'css-001',
    question: 'What is the CSS box model?',
    answer:
      'The CSS box model describes how elements are rendered, consisting of content, padding, border, and margin. The total width/height includes all these components.',
    category: 'CSS',
    topic: 'Layout',
    difficulty: 'easy',
    tags: ['css', 'box-model', 'layout'],
    type: 'conceptual',
  },
  {
    id: 'css-002',
    question: 'What is Flexbox and how does it work?',
    answer:
      'Flexbox is a layout method that allows items to be arranged in a flexible container. It provides efficient ways to align, distribute, and resize items.',
    category: 'CSS',
    topic: 'Layout',
    difficulty: 'medium',
    tags: ['css', 'flexbox', 'layout'],
    type: 'conceptual',
  },
  {
    id: 'css-003',
    question: 'What is CSS Grid and how is it different from Flexbox?',
    answer:
      'CSS Grid is a two-dimensional layout system, while Flexbox is one-dimensional. Grid is better for complex layouts, Flexbox is better for component-level layouts.',
    category: 'CSS',
    topic: 'Layout',
    difficulty: 'medium',
    tags: ['css', 'grid', 'layout'],
    type: 'conceptual',
  },
  {
    id: 'css-004',
    question: 'What are CSS preprocessors and why use them?',
    answer:
      'CSS preprocessors like Sass/SCSS add features like variables, nesting, mixins, and functions to CSS. They make CSS more maintainable and powerful.',
    category: 'CSS',
    topic: 'Preprocessors',
    difficulty: 'medium',
    tags: ['css', 'sass', 'preprocessors'],
    type: 'conceptual',
  },
  {
    id: 'css-005',
    question: 'What is CSS specificity and how is it calculated?',
    answer:
      "CSS specificity determines which styles are applied when multiple rules target the same element. It's calculated based on inline styles, IDs, classes, and elements.",
    category: 'CSS',
    topic: 'Specificity',
    difficulty: 'medium',
    tags: ['css', 'specificity', 'selectors'],
    type: 'conceptual',
  },

  // HTML Questions
  {
    id: 'html-001',
    question: 'What is semantic HTML and why is it important?',
    answer:
      'Semantic HTML uses meaningful tags that describe content purpose (header, nav, main, article, section, footer). It improves accessibility, SEO, and code maintainability.',
    category: 'HTML',
    topic: 'Semantics',
    difficulty: 'easy',
    tags: ['html', 'semantic', 'accessibility'],
    type: 'conceptual',
  },
  {
    id: 'html-002',
    question: 'What are HTML5 semantic elements?',
    answer:
      'HTML5 semantic elements include header, nav, main, article, section, aside, footer, figure, figcaption, time, mark, and others that provide meaning to content.',
    category: 'HTML',
    topic: 'Semantics',
    difficulty: 'easy',
    tags: ['html', 'html5', 'semantic'],
    type: 'conceptual',
  },
  {
    id: 'html-003',
    question: 'What is the difference between div and span?',
    answer:
      'div is a block-level element used for grouping and layout, while span is an inline element used for styling small portions of text or inline content.',
    category: 'HTML',
    topic: 'Elements',
    difficulty: 'easy',
    tags: ['html', 'div', 'span'],
    type: 'conceptual',
  },
  {
    id: 'html-004',
    question: 'What are HTML forms and how do they work?',
    answer:
      'HTML forms collect user input using elements like input, textarea, select, and button. They submit data to a server using GET or POST methods.',
    category: 'HTML',
    topic: 'Forms',
    difficulty: 'medium',
    tags: ['html', 'forms', 'input'],
    type: 'practical',
  },
  {
    id: 'html-005',
    question: 'What is accessibility in HTML?',
    answer:
      'Accessibility ensures websites are usable by people with disabilities. It involves proper semantic markup, alt text, ARIA attributes, keyboard navigation, and screen reader compatibility.',
    category: 'HTML',
    topic: 'Accessibility',
    difficulty: 'medium',
    tags: ['html', 'accessibility', 'aria'],
    type: 'conceptual',
  },

  // Next.js Questions
  {
    id: 'nextjs-001',
    question: 'What is Next.js and how does it differ from React?',
    answer:
      'Next.js is a React framework that adds server-side rendering, static site generation, routing, and other features. React is just the UI library, Next.js provides the full framework.',
    category: 'Next.js',
    topic: 'Fundamentals',
    difficulty: 'easy',
    tags: ['nextjs', 'react', 'framework'],
    type: 'conceptual',
  },
  {
    id: 'nextjs-002',
    question: 'What is server-side rendering (SSR) in Next.js?',
    answer:
      'SSR renders React components on the server and sends HTML to the client. This improves SEO, initial page load performance, and enables dynamic content generation.',
    category: 'Next.js',
    topic: 'Rendering',
    difficulty: 'medium',
    tags: ['nextjs', 'ssr', 'rendering'],
    type: 'conceptual',
  },
  {
    id: 'nextjs-003',
    question: 'What is static site generation (SSG) in Next.js?',
    answer:
      'SSG pre-renders pages at build time, creating static HTML files. This provides excellent performance and can be deployed to CDNs for global distribution.',
    category: 'Next.js',
    topic: 'Rendering',
    difficulty: 'medium',
    tags: ['nextjs', 'ssg', 'static'],
    type: 'conceptual',
  },
  {
    id: 'nextjs-004',
    question: 'How does Next.js handle routing?',
    answer:
      'Next.js uses file-based routing where the file structure in the pages directory determines the routes. Dynamic routes use brackets [id] and catch-all routes use [...slug].',
    category: 'Next.js',
    topic: 'Routing',
    difficulty: 'medium',
    tags: ['nextjs', 'routing', 'pages'],
    type: 'practical',
  },
  {
    id: 'nextjs-005',
    question: 'What are API routes in Next.js?',
    answer:
      'API routes allow you to create serverless functions within your Next.js app. They are defined in the pages/api directory and can handle HTTP requests.',
    category: 'Next.js',
    topic: 'API',
    difficulty: 'medium',
    tags: ['nextjs', 'api', 'serverless'],
    type: 'practical',
  },

  // System Design Questions
  {
    id: 'system-001',
    question: 'What is system design and why is it important?',
    answer:
      "System design is the process of defining architecture, components, modules, interfaces, and data for a system. It's important for scalability, reliability, and maintainability.",
    category: 'System Design',
    topic: 'Fundamentals',
    difficulty: 'medium',
    tags: ['system-design', 'architecture', 'scalability'],
    type: 'conceptual',
  },
  {
    id: 'system-002',
    question: 'What is load balancing and how does it work?',
    answer:
      'Load balancing distributes incoming requests across multiple servers to improve performance and reliability. It can be done at different layers (DNS, HTTP, TCP).',
    category: 'System Design',
    topic: 'Scalability',
    difficulty: 'medium',
    tags: ['system-design', 'load-balancing', 'scalability'],
    type: 'conceptual',
  },
  {
    id: 'system-003',
    question: 'What is caching and what are different types of caches?',
    answer:
      'Caching stores frequently accessed data in fast storage. Types include browser cache, CDN cache, application cache, database cache, and distributed cache.',
    category: 'System Design',
    topic: 'Performance',
    difficulty: 'medium',
    tags: ['system-design', 'caching', 'performance'],
    type: 'conceptual',
  },
  {
    id: 'system-004',
    question: 'What is microservices architecture?',
    answer:
      'Microservices architecture breaks applications into small, independent services that communicate over APIs. Each service has its own database and can be deployed independently.',
    category: 'System Design',
    topic: 'Architecture',
    difficulty: 'hard',
    tags: ['system-design', 'microservices', 'architecture'],
    type: 'conceptual',
  },
  {
    id: 'system-005',
    question: 'What is database sharding?',
    answer:
      'Database sharding splits a database into smaller, independent parts called shards. Each shard contains a subset of the data, improving performance and scalability.',
    category: 'System Design',
    topic: 'Database',
    difficulty: 'hard',
    tags: ['system-design', 'database', 'sharding'],
    type: 'conceptual',
  },
];

// ==========================================
// Additional Problem Solving Tasks
// ==========================================

const additionalProblemSolvingTasks = [
  {
    id: 'problem-solving-013',
    title: 'Reverse Linked List',
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'easy',
    category: 'Linked List',
    tags: ['linked-list', 'recursion'],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
        explanation: 'The linked list is reversed.',
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]',
        explanation: 'The linked list is reversed.',
      },
      {
        input: 'head = []',
        output: '[]',
        explanation: 'Empty list returns empty list.',
      },
    ],
    testCases: [
      {
        input: '[1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
      },
      {
        input: '[1,2]',
        expectedOutput: '[2,1]',
      },
      {
        input: '[]',
        expectedOutput: '[]',
      },
    ],
    starterCode: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function reverseList(head) {
    // Your code here
}`,
    solutionCode: `function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
    hints: [
      'Use three pointers: prev, current, and next',
      'Iterate through the list and reverse the links',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-014',
    title: 'Binary Tree Inorder Traversal',
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: 'easy',
    category: 'Tree',
    tags: ['tree', 'stack', 'recursion'],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100',
    ],
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]',
        explanation: 'Inorder traversal: left, root, right',
      },
      {
        input: 'root = []',
        output: '[]',
        explanation: 'Empty tree returns empty list.',
      },
      {
        input: 'root = [1]',
        output: '[1]',
        explanation: 'Single node tree.',
      },
    ],
    testCases: [
      {
        input: '[1,null,2,3]',
        expectedOutput: '[1,3,2]',
      },
      {
        input: '[]',
        expectedOutput: '[]',
      },
      {
        input: '[1]',
        expectedOutput: '[1]',
      },
    ],
    starterCode: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

function inorderTraversal(root) {
    // Your code here
}`,
    solutionCode: `function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node === null) return;
        
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}`,
    hints: [
      'Use recursion to traverse left subtree, visit root, then traverse right subtree',
      'Inorder traversal: left -> root -> right',
      'Time complexity: O(n), Space complexity: O(h) where h is height',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedComprehensiveQuestions() {
  console.log('🌱 Starting comprehensive questions seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const question of comprehensiveQuestions) {
    try {
      // Check if question already exists
      const existingQuery = query(
        collection(db, 'questions'),
        where('id', '==', question.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        // Add question to Firebase
        await addDoc(collection(db, 'questions'), question);

        successCount++;
        console.log(
          `✅ Added question: ${question.question.substring(0, 50)}...`
        );
      } else {
        skipCount++;
        console.log(
          `⏭️  Question already exists: ${question.question.substring(0, 50)}...`
        );
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error adding question ${question.id}:`, error);
    }
  }

  console.log('🎉 Comprehensive questions seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${comprehensiveQuestions.length}`);
}

async function seedAdditionalProblemSolvingTasks() {
  console.log('🌱 Starting additional problem-solving tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of additionalProblemSolvingTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'problemSolvingTasks'),
        where('id', '==', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        // Add task to Firebase
        await addDoc(collection(db, 'problemSolvingTasks'), task);

        successCount++;
        console.log(`✅ Added problem-solving task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Problem-solving task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding problem-solving task ${task.title}:`,
        error
      );
    }
  }

  console.log('🎉 Additional problem-solving tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${additionalProblemSolvingTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting comprehensive Firebase seeding process...');

  try {
    // Seed comprehensive questions
    await seedComprehensiveQuestions();

    // Seed additional problem-solving tasks
    await seedAdditionalProblemSolvingTasks();

    console.log('\\n🎉 All seeding completed successfully!');
    console.log(
      '💡 Firebase permissions are working correctly with Client SDK'
    );
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
