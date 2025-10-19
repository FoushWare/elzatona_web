#!/usr/bin/env node

/**
 * Seed Categories and Topics Structure
 * Creates the foundational categories and topics for the learning system
 */

import 'dotenv/config';

console.log('🌱 Seeding Categories and Topics Structure...\n');

const API_BASE_URL = 'http://localhost:3000';

// Define the 5 main categories with their topics
const CATEGORIES_AND_TOPICS = [
  {
    name: 'Core Technologies',
    description:
      'Fundamental web technologies including HTML, CSS, JavaScript, and core programming concepts',
    slug: 'core-technologies',
    color: '#3B82F6',
    icon: '💻',
    order_index: 1,
    topics: [
      {
        name: 'HTML Fundamentals',
        description: 'Semantic HTML, accessibility, and document structure',
        slug: 'html-fundamentals',
        order_index: 1,
      },
      {
        name: 'CSS Styling',
        description:
          'CSS layouts, animations, responsive design, and modern CSS features',
        slug: 'css-styling',
        order_index: 2,
      },
      {
        name: 'JavaScript Basics',
        description:
          'Variables, functions, control structures, and ES6+ features',
        slug: 'javascript-basics',
        order_index: 3,
      },
      {
        name: 'DOM Manipulation',
        description: 'Working with the Document Object Model and browser APIs',
        slug: 'dom-manipulation',
        order_index: 4,
      },
      {
        name: 'Web APIs',
        description:
          'Fetch API, localStorage, Web Workers, and other browser APIs',
        slug: 'web-apis',
        order_index: 5,
      },
    ],
  },
  {
    name: 'Framework Questions',
    description:
      'React, Next.js, Vue, Angular and modern framework concepts, patterns, and best practices',
    slug: 'framework-questions',
    color: '#10B981',
    icon: '⚛️',
    order_index: 2,
    topics: [
      {
        name: 'React Fundamentals',
        description: 'Components, JSX, props, state, and React basics',
        slug: 'react-fundamentals',
        order_index: 1,
      },
      {
        name: 'React Hooks',
        description: 'useState, useEffect, custom hooks, and hook patterns',
        slug: 'react-hooks',
        order_index: 2,
      },
      {
        name: 'React Patterns',
        description:
          'Higher-order components, render props, and composition patterns',
        slug: 'react-patterns',
        order_index: 3,
      },
      {
        name: 'Next.js',
        description: 'Server-side rendering, routing, and Next.js features',
        slug: 'nextjs',
        order_index: 4,
      },
      {
        name: 'State Management',
        description:
          'Redux, Context API, Zustand, and state management patterns',
        slug: 'state-management',
        order_index: 5,
      },
    ],
  },
  {
    name: 'Problem Solving',
    description:
      'Algorithmic thinking, data structures, coding challenges, and problem-solving patterns',
    slug: 'problem-solving',
    color: '#F59E0B',
    icon: '🧩',
    order_index: 3,
    topics: [
      {
        name: 'Data Structures',
        description: 'Arrays, objects, linked lists, trees, and graphs',
        slug: 'data-structures',
        order_index: 1,
      },
      {
        name: 'Algorithms',
        description: 'Sorting, searching, recursion, and algorithm patterns',
        slug: 'algorithms',
        order_index: 2,
      },
      {
        name: 'Time Complexity',
        description:
          'Big O notation, space complexity, and performance analysis',
        slug: 'time-complexity',
        order_index: 3,
      },
      {
        name: 'Coding Patterns',
        description:
          'Two pointers, sliding window, and common problem-solving patterns',
        slug: 'coding-patterns',
        order_index: 4,
      },
      {
        name: 'Dynamic Programming',
        description:
          'Memoization, tabulation, and DP problem-solving strategies',
        slug: 'dynamic-programming',
        order_index: 5,
      },
    ],
  },
  {
    name: 'System Design',
    description:
      'Large-scale system architecture, design patterns, scalability, and distributed systems',
    slug: 'system-design',
    color: '#8B5CF6',
    icon: '🏗️',
    order_index: 4,
    topics: [
      {
        name: 'Architecture Patterns',
        description:
          'MVC, MVP, MVVM, microservices, and architectural patterns',
        slug: 'architecture-patterns',
        order_index: 1,
      },
      {
        name: 'Scalability',
        description:
          'Horizontal vs vertical scaling, load balancing, and performance optimization',
        slug: 'scalability',
        order_index: 2,
      },
      {
        name: 'Database Design',
        description: 'SQL vs NoSQL, database optimization, and data modeling',
        slug: 'database-design',
        order_index: 3,
      },
      {
        name: 'Caching Strategies',
        description: 'Redis, CDN, browser caching, and cache invalidation',
        slug: 'caching-strategies',
        order_index: 4,
      },
      {
        name: 'Security',
        description:
          'Authentication, authorization, encryption, and security best practices',
        slug: 'security',
        order_index: 5,
      },
    ],
  },
  {
    name: 'Frontend Tasks',
    description:
      'Practical frontend development tasks, implementations, UI/UX challenges, and real-world projects',
    slug: 'frontend-tasks',
    color: '#EF4444',
    icon: '🎨',
    order_index: 5,
    topics: [
      {
        name: 'UI/UX Design',
        description: 'Design principles, user experience, and interface design',
        slug: 'ui-ux-design',
        order_index: 1,
      },
      {
        name: 'Responsive Design',
        description: 'Mobile-first design, breakpoints, and responsive layouts',
        slug: 'responsive-design',
        order_index: 2,
      },
      {
        name: 'Performance Optimization',
        description:
          'Bundle optimization, lazy loading, and performance metrics',
        slug: 'performance-optimization',
        order_index: 3,
      },
      {
        name: 'Testing',
        description:
          'Unit testing, integration testing, and testing strategies',
        slug: 'testing',
        order_index: 4,
      },
      {
        name: 'Build Tools',
        description: 'Webpack, Vite, Babel, and modern build tooling',
        slug: 'build-tools',
        order_index: 5,
      },
    ],
  },
];

async function createCategory(categoryData) {
  try {
    console.log(`📁 Creating category: ${categoryData.name}`);

    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `✅ Created category: ${categoryData.name} (ID: ${result.data?.id || 'unknown'})`
      );
      return result.data?.id;
    } else {
      const error = await response.text();
      console.log(
        `❌ Failed to create category ${categoryData.name}: ${error}`
      );
      return null;
    }
  } catch (error) {
    console.log(
      `❌ Error creating category ${categoryData.name}: ${error.message}`
    );
    return null;
  }
}

async function createTopic(topicData, categoryId) {
  try {
    console.log(`  📝 Creating topic: ${topicData.name}`);

    const topicPayload = {
      ...topicData,
      categoryId: categoryId,
    };

    const response = await fetch(`${API_BASE_URL}/api/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicPayload),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(
        `  ✅ Created topic: ${topicData.name} (ID: ${result.data?.id || 'unknown'})`
      );
      return result.data?.id;
    } else {
      const error = await response.text();
      console.log(`  ❌ Failed to create topic ${topicData.name}: ${error}`);
      return null;
    }
  } catch (error) {
    console.log(
      `  ❌ Error creating topic ${topicData.name}: ${error.message}`
    );
    return null;
  }
}

async function seedCategoriesAndTopics() {
  console.log('🌱 Starting Categories and Topics Seeding...\n');

  let categoriesCreated = 0;
  let topicsCreated = 0;
  let errors = 0;

  for (const categoryData of CATEGORIES_AND_TOPICS) {
    try {
      // Create category
      const categoryId = await createCategory(categoryData);

      if (categoryId) {
        categoriesCreated++;

        // Create topics for this category
        for (const topicData of categoryData.topics) {
          const topicId = await createTopic(topicData, categoryId);
          if (topicId) {
            topicsCreated++;
          } else {
            errors++;
          }
        }
      } else {
        errors++;
      }

      console.log(''); // Empty line for readability
    } catch (error) {
      console.log(
        `❌ Error processing category ${categoryData.name}: ${error.message}`
      );
      errors++;
    }
  }

  console.log('📊 Categories and Topics Seeding Summary:');
  console.log(`✅ Categories created: ${categoriesCreated}`);
  console.log(`✅ Topics created: ${topicsCreated}`);
  console.log(`❌ Errors: ${errors}`);

  return { categoriesCreated, topicsCreated, errors };
}

async function verifySeeding() {
  console.log('\n🧪 Verifying Categories and Topics...\n');

  try {
    // Check categories
    const categoriesResponse = await fetch(`${API_BASE_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();

    if (categoriesData.success) {
      console.log(`📁 Categories found: ${categoriesData.data?.length || 0}`);
      categoriesData.data?.forEach((category, index) => {
        console.log(`  ${index + 1}. ${category.name} (${category.slug})`);
      });
    } else {
      console.log('❌ Failed to fetch categories');
    }

    // Check topics
    const topicsResponse = await fetch(`${API_BASE_URL}/api/topics`);
    const topicsData = await topicsResponse.json();

    if (topicsData.success) {
      console.log(`\n📝 Topics found: ${topicsData.data?.length || 0}`);
      topicsData.data?.forEach((topic, index) => {
        console.log(
          `  ${index + 1}. ${topic.name} (${topic.slug}) - Category: ${topic.categoryId}`
        );
      });
    } else {
      console.log('❌ Failed to fetch topics');
    }
  } catch (error) {
    console.log(`❌ Error verifying seeding: ${error.message}`);
  }
}

async function main() {
  try {
    console.log('🌱 Categories and Topics Seeding Plan:');
    console.log('1. Create 5 main categories');
    console.log('2. Create 5 topics for each category (25 total)');
    console.log('3. Verify the seeding results\n');

    // Step 1: Seed categories and topics
    const result = await seedCategoriesAndTopics();

    // Step 2: Verify
    await verifySeeding();

    console.log('\n🎉 Categories and Topics Seeding Complete!');
    console.log(`📁 Categories: ${result.categoriesCreated}/5`);
    console.log(`📝 Topics: ${result.topicsCreated}/25`);

    if (result.errors === 0) {
      console.log('✅ Perfect! No errors during seeding.');
    } else {
      console.log(`⚠️ ${result.errors} errors occurred during seeding.`);
    }

    console.log('\n🔗 Test your categories and topics:');
    console.log(`   Categories API: ${API_BASE_URL}/api/categories`);
    console.log(`   Topics API: ${API_BASE_URL}/api/topics`);
    console.log(`   Admin Dashboard: ${API_BASE_URL}/admin/content-management`);

    console.log('\n🚀 Next step: Seed the 5 learning cards');
  } catch (error) {
    console.error(
      '❌ Error during categories and topics seeding:',
      error.message
    );
    process.exit(1);
  }
}

// Run the main function
main();
