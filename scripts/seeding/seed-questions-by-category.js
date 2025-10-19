#!/usr/bin/env node

/**
 * Seed Questions for Each Category
 * Creates sample questions for each of the 5 categories
 */

import 'dotenv/config';

console.log('❓ Seeding Questions for Each Category...\n');

const API_BASE_URL = 'http://localhost:3000';

// Sample questions for each category
const QUESTIONS_BY_CATEGORY = {
  'core-technologies': [
    {
      question: 'What is the purpose of the HTML `<meta>` tag?',
      explanation:
        'The meta tag provides metadata about the HTML document, including character encoding, viewport settings, and SEO information.',
      difficulty: 'easy',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'To create visual elements', isCorrect: false },
        { id: 'b', text: 'To provide document metadata', isCorrect: true },
        { id: 'c', text: 'To add JavaScript functionality', isCorrect: false },
        { id: 'd', text: 'To create CSS styles', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['html', 'metadata', 'seo']),
    },
    {
      question: 'What does CSS Grid Layout provide?',
      explanation:
        'CSS Grid Layout provides a two-dimensional grid-based layout system for creating complex web layouts.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'One-dimensional layout system', isCorrect: false },
        {
          id: 'b',
          text: 'Two-dimensional grid-based layout system',
          isCorrect: true,
        },
        { id: 'c', text: 'Only horizontal layouts', isCorrect: false },
        { id: 'd', text: 'Only vertical layouts', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['css', 'grid', 'layout']),
    },
    {
      question: 'What is the difference between `let` and `var` in JavaScript?',
      explanation:
        '`let` has block scope and is not hoisted, while `var` has function scope and is hoisted.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        {
          id: 'a',
          text: 'No difference, they are identical',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'let has block scope, var has function scope',
          isCorrect: true,
        },
        { id: 'c', text: 'var is newer than let', isCorrect: false },
        { id: 'd', text: 'let can only be used in loops', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['javascript', 'variables', 'scope']),
    },
  ],
  'framework-questions': [
    {
      question: 'What is JSX in React?',
      explanation:
        'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript.',
      difficulty: 'easy',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'A templating engine', isCorrect: false },
        { id: 'b', text: 'A syntax extension for JavaScript', isCorrect: true },
        { id: 'c', text: 'A CSS preprocessor', isCorrect: false },
        { id: 'd', text: 'A database query language', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['react', 'jsx', 'syntax']),
    },
    {
      question: 'What is the purpose of React Hooks?',
      explanation:
        'React Hooks allow you to use state and other React features in functional components.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        {
          id: 'a',
          text: 'To replace class components entirely',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'To use state and lifecycle in functional components',
          isCorrect: true,
        },
        { id: 'c', text: 'To improve performance only', isCorrect: false },
        { id: 'd', text: 'To replace Redux', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['react', 'hooks', 'functional-components']),
    },
    {
      question: 'What is Next.js used for?',
      explanation:
        'Next.js is a React framework that provides server-side rendering, static site generation, and other features.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        {
          id: 'a',
          text: 'Only client-side React applications',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'React applications with SSR and SSG',
          isCorrect: true,
        },
        { id: 'c', text: 'Only static websites', isCorrect: false },
        { id: 'd', text: 'Only mobile applications', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['nextjs', 'react', 'ssr', 'ssg']),
    },
  ],
  'problem-solving': [
    {
      question: 'What is the time complexity of binary search?',
      explanation:
        'Binary search has O(log n) time complexity because it eliminates half of the search space in each iteration.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'O(n)', isCorrect: false },
        { id: 'b', text: 'O(log n)', isCorrect: true },
        { id: 'c', text: 'O(n²)', isCorrect: false },
        { id: 'd', text: 'O(1)', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['algorithms', 'binary-search', 'complexity']),
    },
    {
      question: 'What is a hash table?',
      explanation:
        'A hash table is a data structure that uses a hash function to map keys to values for efficient lookup.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'A sorted array', isCorrect: false },
        {
          id: 'b',
          text: 'A data structure using hash functions for key-value mapping',
          isCorrect: true,
        },
        { id: 'c', text: 'A linked list', isCorrect: false },
        { id: 'd', text: 'A binary tree', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['data-structures', 'hash-table', 'algorithms']),
    },
    {
      question: 'What is the space complexity of merge sort?',
      explanation:
        'Merge sort has O(n) space complexity because it requires additional space to store the merged arrays.',
      difficulty: 'hard',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'O(1)', isCorrect: false },
        { id: 'b', text: 'O(log n)', isCorrect: false },
        { id: 'c', text: 'O(n)', isCorrect: true },
        { id: 'd', text: 'O(n²)', isCorrect: false },
      ]),
      correct_answer: 'c',
      tags: JSON.stringify(['algorithms', 'merge-sort', 'complexity']),
    },
  ],
  'system-design': [
    {
      question: 'What is horizontal scaling?',
      explanation:
        'Horizontal scaling involves adding more machines or nodes to handle increased load.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        {
          id: 'a',
          text: 'Adding more CPU cores to existing machines',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Adding more machines to handle increased load',
          isCorrect: true,
        },
        {
          id: 'c',
          text: 'Increasing RAM on existing machines',
          isCorrect: false,
        },
        { id: 'd', text: 'Upgrading to faster processors', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['scaling', 'architecture', 'distributed-systems']),
    },
    {
      question: 'What is the purpose of a load balancer?',
      explanation:
        'A load balancer distributes incoming requests across multiple servers to improve performance and reliability.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'To store user data', isCorrect: false },
        {
          id: 'b',
          text: 'To distribute requests across multiple servers',
          isCorrect: true,
        },
        { id: 'c', text: 'To encrypt data', isCorrect: false },
        { id: 'd', text: 'To backup data', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['load-balancer', 'architecture', 'performance']),
    },
    {
      question: 'What is microservices architecture?',
      explanation:
        'Microservices architecture is an approach where applications are built as a collection of loosely coupled services.',
      difficulty: 'hard',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'A single large application', isCorrect: false },
        {
          id: 'b',
          text: 'A collection of loosely coupled services',
          isCorrect: true,
        },
        { id: 'c', text: 'A database design pattern', isCorrect: false },
        { id: 'd', text: 'A frontend framework', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify([
        'microservices',
        'architecture',
        'distributed-systems',
      ]),
    },
  ],
  'frontend-tasks': [
    {
      question: 'What is responsive web design?',
      explanation:
        'Responsive web design is an approach that makes web pages render well on various devices and screen sizes.',
      difficulty: 'easy',
      type: 'multiple_choice',
      options: JSON.stringify([
        {
          id: 'a',
          text: 'Designing only for mobile devices',
          isCorrect: false,
        },
        {
          id: 'b',
          text: 'Making web pages work well on various devices',
          isCorrect: true,
        },
        { id: 'c', text: 'Using only CSS Grid', isCorrect: false },
        {
          id: 'd',
          text: 'Creating separate websites for each device',
          isCorrect: false,
        },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['responsive-design', 'css', 'mobile-first']),
    },
    {
      question: 'What is the purpose of CSS preprocessors?',
      explanation:
        'CSS preprocessors extend CSS with features like variables, nesting, and functions to make stylesheets more maintainable.',
      difficulty: 'medium',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'To replace CSS entirely', isCorrect: false },
        {
          id: 'b',
          text: 'To extend CSS with variables, nesting, and functions',
          isCorrect: true,
        },
        { id: 'c', text: 'To make CSS run faster', isCorrect: false },
        { id: 'd', text: 'To add JavaScript functionality', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['css', 'preprocessors', 'sass', 'less']),
    },
    {
      question: 'What is the purpose of webpack?',
      explanation:
        'Webpack is a module bundler that takes modules with dependencies and generates static assets.',
      difficulty: 'hard',
      type: 'multiple_choice',
      options: JSON.stringify([
        { id: 'a', text: 'A CSS framework', isCorrect: false },
        {
          id: 'b',
          text: 'A module bundler for JavaScript applications',
          isCorrect: true,
        },
        { id: 'c', text: 'A database management system', isCorrect: false },
        { id: 'd', text: 'A testing framework', isCorrect: false },
      ]),
      correct_answer: 'b',
      tags: JSON.stringify(['webpack', 'bundler', 'build-tools', 'javascript']),
    },
  ],
};

async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`);
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.log('❌ Failed to fetch categories');
      return [];
    }
  } catch (error) {
    console.log(`❌ Error fetching categories: ${error.message}`);
    return [];
  }
}

async function getTopicsForCategory(categoryId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/topics?categoryId=${categoryId}`
    );
    const data = await response.json();

    if (data.success) {
      return data.data;
    } else {
      console.log(`❌ Failed to fetch topics for category ${categoryId}`);
      return [];
    }
  } catch (error) {
    console.log(
      `❌ Error fetching topics for category ${categoryId}: ${error.message}`
    );
    return [];
  }
}

async function createQuestion(questionData, topicId) {
  try {
    console.log(
      `  ❓ Creating question: ${questionData.question.substring(0, 50)}...`
    );

    const questionPayload = {
      ...questionData,
      topicId: topicId,
    };

    const response = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionPayload),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `  ✅ Created question: ${questionData.question.substring(0, 50)}...`
      );
      return result.data?.id;
    } else {
      const error = await response.text();
      console.log(`  ❌ Failed to create question: ${error}`);
      return null;
    }
  } catch (error) {
    console.log(`  ❌ Error creating question: ${error.message}`);
    return null;
  }
}

async function seedQuestionsForCategory(category, questions) {
  console.log(`📚 Seeding questions for category: ${category.name}`);

  // Get topics for this category
  const topics = await getTopicsForCategory(category.id);

  if (topics.length === 0) {
    console.log(`  ⚠️ No topics found for category ${category.name}`);
    return { questionsCreated: 0, errors: 0 };
  }

  let questionsCreated = 0;
  let errors = 0;

  // Distribute questions across topics
  const questionsPerTopic = Math.ceil(questions.length / topics.length);

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const topicIndex = Math.floor(i / questionsPerTopic) % topics.length;
    const topic = topics[topicIndex];

    const questionId = await createQuestion(question, topic.id);

    if (questionId) {
      questionsCreated++;
    } else {
      errors++;
    }
  }

  console.log(
    `  📊 Category ${category.name}: ${questionsCreated} questions created, ${errors} errors\n`
  );

  return { questionsCreated, errors };
}

async function seedAllQuestions() {
  console.log('❓ Starting Questions Seeding...\n');

  // Get all categories
  const categories = await getCategories();

  if (categories.length === 0) {
    console.log('❌ No categories found. Please seed categories first.');
    return { totalQuestionsCreated: 0, totalErrors: 0 };
  }

  let totalQuestionsCreated = 0;
  let totalErrors = 0;

  // Seed questions for each category
  for (const category of categories) {
    const categorySlug =
      category.slug || category.name.toLowerCase().replace(/\s+/g, '-');
    const questions = QUESTIONS_BY_CATEGORY[categorySlug] || [];

    if (questions.length > 0) {
      const result = await seedQuestionsForCategory(category, questions);
      totalQuestionsCreated += result.questionsCreated;
      totalErrors += result.errors;
    } else {
      console.log(`⚠️ No questions defined for category: ${category.name}\n`);
    }
  }

  console.log('📊 Questions Seeding Summary:');
  console.log(`✅ Total questions created: ${totalQuestionsCreated}`);
  console.log(`❌ Total errors: ${totalErrors}`);

  return { totalQuestionsCreated, totalErrors };
}

async function verifySeeding() {
  console.log('\n🧪 Verifying Questions Seeding...\n');

  try {
    const response = await fetch(`${API_BASE_URL}/api/questions?limit=10`);
    const data = await response.json();

    if (data.success) {
      console.log(`❓ Questions found: ${data.data?.length || 0}`);

      if (data.data && data.data.length > 0) {
        console.log('Sample questions:');
        data.data.slice(0, 5).forEach((question, index) => {
          console.log(
            `  ${index + 1}. ${question.question_text?.substring(0, 60) || question.question?.substring(0, 60)}...`
          );
          console.log(`     Difficulty: ${question.difficulty}`);
          console.log(`     Type: ${question.question_type}`);
          console.log('');
        });
      }
    } else {
      console.log('❌ Failed to fetch questions');
    }
  } catch (error) {
    console.log(`❌ Error verifying questions: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('❓ Questions Seeding Plan:');
    console.log('1. Get all categories');
    console.log('2. Get topics for each category');
    console.log('3. Create questions for each category');
    console.log('4. Verify the seeding results\n');

    // Step 1: Seed questions
    const result = await seedAllQuestions();

    // Step 2: Verify
    await verifySeeding();

    console.log('\n🎉 Questions Seeding Complete!');
    console.log(`❓ Questions created: ${result.totalQuestionsCreated}`);

    if (result.totalErrors === 0) {
      console.log('✅ Perfect! No errors during seeding.');
    } else {
      console.log(`⚠️ ${result.totalErrors} errors occurred during seeding.`);
    }

    console.log('\n🔗 Test your questions:');
    console.log(`   Questions API: ${API_BASE_URL}/api/questions`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content-management`);

    console.log('\n🚀 Next step: Seed learning plans');
  } catch (error) {
    console.error('❌ Error during questions seeding:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
