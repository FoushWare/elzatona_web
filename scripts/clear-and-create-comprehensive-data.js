const fetch = require('node-fetch');

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Comprehensive frontend-focused data structure
const comprehensiveData = {
  categories: [
    // Core Web Technologies
    { name: 'HTML', description: 'HyperText Markup Language - Structure and semantics' },
    { name: 'CSS', description: 'Cascading Style Sheets - Styling and layout' },
    { name: 'JavaScript', description: 'JavaScript programming language and ecosystem' },
    { name: 'TypeScript', description: 'Typed superset of JavaScript' },
    
    // Frontend Frameworks & Libraries
    { name: 'React', description: 'React library and ecosystem' },
    { name: 'Next.js', description: 'React framework for production' },
    { name: 'Vue.js', description: 'Progressive JavaScript framework' },
    { name: 'Angular', description: 'Platform for building mobile and desktop web applications' },
    { name: 'Svelte', description: 'Cybernetically enhanced web apps' },
    
    // State Management
    { name: 'State Management', description: 'Redux, Zustand, Context API, and state patterns' },
    { name: 'Data Fetching', description: 'React Query, SWR, Apollo, and data management' },
    
    // Styling & UI
    { name: 'CSS Frameworks', description: 'Tailwind, Bootstrap, Material-UI, and design systems' },
    { name: 'Component Libraries', description: 'Ant Design, Chakra UI, Mantine, and UI components' },
    { name: 'Animation', description: 'Framer Motion, Lottie, CSS animations, and transitions' },
    
    // Performance & Optimization
    { name: 'Performance', description: 'Web performance optimization and Core Web Vitals' },
    { name: 'Bundle Optimization', description: 'Webpack, Vite, code splitting, and lazy loading' },
    { name: 'Caching', description: 'Browser caching, CDN, and cache strategies' },
    
    // Testing & Quality
    { name: 'Testing', description: 'Unit testing, integration testing, and E2E testing' },
    { name: 'Code Quality', description: 'ESLint, Prettier, TypeScript, and code standards' },
    { name: 'Accessibility', description: 'WCAG guidelines, ARIA, and inclusive design' },
    
    // Security & Best Practices
    { name: 'Security', description: 'Web security, authentication, and security best practices' },
    { name: 'SEO', description: 'Search Engine Optimization and meta tags' },
    { name: 'PWA', description: 'Progressive Web Apps and offline functionality' },
    
    // DevOps & Deployment
    { name: 'Build Tools', description: 'Webpack, Vite, Rollup, and build optimization' },
    { name: 'CI/CD', description: 'GitHub Actions, GitLab CI, and deployment pipelines' },
    { name: 'Docker', description: 'Containerization for frontend applications' },
    { name: 'Cloud Platforms', description: 'Vercel, Netlify, AWS, and cloud deployment' },
    
    // Advanced Topics
    { name: 'Design Patterns', description: 'Frontend design patterns and architecture' },
    { name: 'Micro Frontends', description: 'Micro frontend architecture and module federation' },
    { name: 'WebAssembly', description: 'WebAssembly and high-performance web applications' },
    { name: 'Web APIs', description: 'Browser APIs, Web Workers, and advanced web features' },
    
    // Career & Soft Skills
    { name: 'Career Development', description: 'Career growth, interviews, and professional development' },
    { name: 'Communication', description: 'Technical communication and team collaboration' },
    { name: 'Project Management', description: 'Agile methodologies and project planning' },
  ],

  topics: [
    // HTML Topics
    { name: 'HTML5 Semantics', category: 'html', description: 'Semantic HTML elements and accessibility', difficulty: 'beginner' },
    { name: 'Forms & Validation', category: 'html', description: 'HTML forms, input types, and validation', difficulty: 'intermediate' },
    { name: 'Accessibility (HTML)', category: 'html', description: 'ARIA attributes and accessible markup', difficulty: 'intermediate' },
    { name: 'SEO Fundamentals', category: 'html', description: 'Meta tags, structured data, and SEO', difficulty: 'beginner' },
    
    // CSS Topics
    { name: 'CSS Grid', category: 'css', description: 'CSS Grid layout system' },
    { name: 'Flexbox', category: 'css', description: 'Flexible box layout' },
    { name: 'CSS Variables', category: 'css', description: 'Custom properties and theming' },
    { name: 'CSS Animations', category: 'css', description: 'Keyframes, transitions, and transforms' },
    { name: 'Responsive Design', category: 'css', description: 'Mobile-first and responsive layouts' },
    { name: 'CSS Preprocessors', category: 'css', description: 'Sass, Less, and PostCSS' },
    { name: 'CSS-in-JS', category: 'css', description: 'Styled-components, Emotion, and CSS-in-JS' },
    
    // JavaScript Topics
    { name: 'ES6+ Features', category: 'javascript', description: 'Modern JavaScript features' },
    { name: 'Async Programming', category: 'javascript', description: 'Promises, async/await, and callbacks' },
    { name: 'Closures & Scope', category: 'javascript', description: 'JavaScript closures and scope chain' },
    { name: 'Prototypes & Inheritance', category: 'javascript', description: 'Prototype-based inheritance' },
    { name: 'Event Handling', category: 'javascript', description: 'DOM events and event delegation' },
    { name: 'Modules & Imports', category: 'javascript', description: 'ES6 modules and module systems' },
    { name: 'Error Handling', category: 'javascript', description: 'Try-catch, error boundaries, and debugging' },
    { name: 'Functional Programming', category: 'javascript', description: 'Higher-order functions and immutability' },
    
    // TypeScript Topics
    { name: 'TypeScript Basics', category: 'typescript', description: 'Types, interfaces, and basic concepts' },
    { name: 'Advanced Types', category: 'typescript', description: 'Generics, utility types, and advanced patterns' },
    { name: 'TypeScript with React', category: 'typescript', description: 'TypeScript in React applications' },
    { name: 'Type Safety', category: 'typescript', description: 'Type guards, assertions, and strict mode' },
    
    // React Topics
    { name: 'React Components', category: 'react', description: 'Functional and class components' },
    { name: 'React Hooks', category: 'react', description: 'useState, useEffect, and custom hooks' },
    { name: 'React Context', category: 'react', description: 'Context API and state management' },
    { name: 'React Router', category: 'react', description: 'Client-side routing and navigation' },
    { name: 'React Performance', category: 'react', description: 'Optimization techniques and best practices' },
    { name: 'React Testing', category: 'react', description: 'Testing React components and hooks' },
    { name: 'React Server Components', category: 'react', description: 'Server components and RSC' },
    { name: 'React Suspense', category: 'react', description: 'Suspense and concurrent features' },
    
    // Next.js Topics
    { name: 'Next.js Routing', category: 'next.js', description: 'File-based routing and navigation' },
    { name: 'Next.js API Routes', category: 'next.js', description: 'API routes and serverless functions' },
    { name: 'Next.js SSR/SSG', category: 'next.js', description: 'Server-side rendering and static generation' },
    { name: 'Next.js Optimization', category: 'next.js', description: 'Image optimization and performance' },
    { name: 'Next.js Deployment', category: 'next.js', description: 'Vercel deployment and configuration' },
    
    // State Management Topics
    { name: 'Redux Toolkit', category: 'state management', description: 'Modern Redux with RTK' },
    { name: 'Zustand', category: 'state management', description: 'Lightweight state management' },
    { name: 'Jotai', category: 'state management', description: 'Atomic state management' },
    { name: 'Recoil', category: 'state management', description: 'Experimental state management' },
    { name: 'Context API', category: 'state management', description: 'React Context for state management' },
    
    // Data Fetching Topics
    { name: 'React Query', category: 'data fetching', description: 'Data fetching and caching with TanStack Query' },
    { name: 'SWR', category: 'data fetching', description: 'Data fetching with SWR' },
    { name: 'Apollo Client', category: 'data fetching', description: 'GraphQL client for React' },
    { name: 'Axios', category: 'data fetching', description: 'HTTP client and interceptors' },
    { name: 'Fetch API', category: 'data fetching', description: 'Native fetch API and alternatives' },
    
    // Performance Topics
    { name: 'Core Web Vitals', category: 'performance', description: 'LCP, FID, CLS, and performance metrics' },
    { name: 'Code Splitting', category: 'performance', description: 'Dynamic imports and lazy loading' },
    { name: 'Bundle Analysis', category: 'performance', description: 'Webpack bundle analyzer and optimization' },
    { name: 'Image Optimization', category: 'performance', description: 'WebP, lazy loading, and responsive images' },
    { name: 'Caching Strategies', category: 'performance', description: 'Browser caching and CDN optimization' },
    
    // Testing Topics
    { name: 'Jest Testing', category: 'testing', description: 'Unit testing with Jest' },
    { name: 'React Testing Library', category: 'testing', description: 'Testing React components' },
    { name: 'Cypress E2E', category: 'testing', description: 'End-to-end testing with Cypress' },
    { name: 'Playwright', category: 'testing', description: 'Cross-browser testing with Playwright' },
    { name: 'Testing Strategies', category: 'testing', description: 'Testing pyramid and best practices' },
    
    // Security Topics
    { name: 'XSS Prevention', category: 'security', description: 'Cross-site scripting prevention' },
    { name: 'CSRF Protection', category: 'security', description: 'Cross-site request forgery protection' },
    { name: 'Authentication', category: 'security', description: 'JWT, OAuth, and authentication patterns' },
    { name: 'Content Security Policy', category: 'security', description: 'CSP headers and security policies' },
    
    // Design Patterns Topics
    { name: 'Component Patterns', category: 'design patterns', description: 'HOC, render props, and compound components' },
    { name: 'Architecture Patterns', category: 'design patterns', description: 'MVC, MVVM, and component architecture' },
    { name: 'Design Systems', category: 'design patterns', description: 'Building and maintaining design systems' },
    { name: 'Micro Frontends', category: 'design patterns', description: 'Micro frontend architecture patterns' },
  ],

  sections: [
    // HTML Sections
    { name: 'HTML Fundamentals', category: 'html', description: 'Basic HTML structure, elements, and semantics', difficulty: 'beginner', estimatedTime: '1-2 weeks', order: 1 },
    { name: 'HTML5 Advanced', category: 'html', description: 'Advanced HTML5 features and APIs', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 2 },
    { name: 'HTML Forms & Validation', category: 'html', description: 'Form elements, validation, and accessibility', difficulty: 'intermediate', estimatedTime: '1 week', order: 3 },
    { name: 'HTML Accessibility', category: 'html', description: 'ARIA attributes and accessible markup', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 4 },
    
    // CSS Sections
    { name: 'CSS Basics', category: 'css', description: 'Selectors, properties, and basic styling', difficulty: 'beginner', estimatedTime: '2-3 weeks', order: 5 },
    { name: 'CSS Layout', category: 'css', description: 'Flexbox, Grid, and positioning', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 6 },
    { name: 'CSS Responsive Design', category: 'css', description: 'Mobile-first design and media queries', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 7 },
    { name: 'CSS Animations', category: 'css', description: 'Transitions, transforms, and keyframes', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 8 },
    { name: 'CSS Preprocessors', category: 'css', description: 'Sass, Less, and PostCSS', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 9 },
    { name: 'CSS-in-JS', category: 'css', description: 'Styled-components and CSS-in-JS libraries', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 10 },
    
    // JavaScript Sections
    { name: 'JavaScript Basics', category: 'javascript', description: 'Variables, functions, and control structures', difficulty: 'beginner', estimatedTime: '3-4 weeks', order: 11 },
    { name: 'JavaScript Advanced', category: 'javascript', description: 'Closures, prototypes, and advanced concepts', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 12 },
    { name: 'ES6+ Features', category: 'javascript', description: 'Modern JavaScript features and syntax', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 13 },
    { name: 'Async JavaScript', category: 'javascript', description: 'Promises, async/await, and asynchronous programming', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 14 },
    { name: 'DOM Manipulation', category: 'javascript', description: 'Working with the Document Object Model', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 15 },
    { name: 'JavaScript Testing', category: 'javascript', description: 'Unit testing and debugging JavaScript', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 16 },
    
    // TypeScript Sections
    { name: 'TypeScript Fundamentals', category: 'typescript', description: 'Types, interfaces, and basic TypeScript', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 17 },
    { name: 'Advanced TypeScript', category: 'typescript', description: 'Generics, utility types, and advanced patterns', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 18 },
    { name: 'TypeScript with React', category: 'typescript', description: 'TypeScript in React applications', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 19 },
    
    // React Sections
    { name: 'React Fundamentals', category: 'react', description: 'Components, JSX, and basic React concepts', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 20 },
    { name: 'React Hooks', category: 'react', description: 'useState, useEffect, and custom hooks', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 21 },
    { name: 'React State Management', category: 'react', description: 'Context API, Redux, and state patterns', difficulty: 'advanced', estimatedTime: '4-5 weeks', order: 22 },
    { name: 'React Router', category: 'react', description: 'Client-side routing and navigation', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 23 },
    { name: 'React Performance', category: 'react', description: 'Optimization techniques and best practices', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 24 },
    { name: 'React Testing', category: 'react', description: 'Testing React components and hooks', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 25 },
    { name: 'React Server Components', category: 'react', description: 'Server components and React 18 features', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 26 },
    
    // Next.js Sections
    { name: 'Next.js Basics', category: 'next.js', description: 'File-based routing and basic concepts', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 27 },
    { name: 'Next.js API Routes', category: 'next.js', description: 'API routes and serverless functions', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 28 },
    { name: 'Next.js SSR/SSG', category: 'next.js', description: 'Server-side rendering and static generation', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 29 },
    { name: 'Next.js Optimization', category: 'next.js', description: 'Image optimization and performance', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 30 },
    
    // State Management Sections
    { name: 'Redux Toolkit', category: 'state management', description: 'Modern Redux with RTK and RTK Query', difficulty: 'advanced', estimatedTime: '4-5 weeks', order: 31 },
    { name: 'Zustand', category: 'state management', description: 'Lightweight state management library', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 32 },
    { name: 'Context API', category: 'state management', description: 'React Context for state management', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 33 },
    
    // Data Fetching Sections
    { name: 'React Query', category: 'data fetching', description: 'Data fetching and caching with TanStack Query', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 34 },
    { name: 'SWR', category: 'data fetching', description: 'Data fetching with SWR library', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 35 },
    { name: 'GraphQL', category: 'data fetching', description: 'GraphQL queries and Apollo Client', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 36 },
    
    // Performance Sections
    { name: 'Web Performance', category: 'performance', description: 'Core Web Vitals and performance metrics', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 37 },
    { name: 'Bundle Optimization', category: 'performance', description: 'Code splitting and lazy loading', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 38 },
    { name: 'Image Optimization', category: 'performance', description: 'WebP, lazy loading, and responsive images', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 39 },
    
    // Testing Sections
    { name: 'Unit Testing', category: 'testing', description: 'Jest and React Testing Library', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 40 },
    { name: 'E2E Testing', category: 'testing', description: 'Cypress and Playwright testing', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 41 },
    { name: 'Testing Strategies', category: 'testing', description: 'Testing pyramid and best practices', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 42 },
    
    // Security Sections
    { name: 'Web Security', category: 'security', description: 'XSS, CSRF, and security best practices', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 43 },
    { name: 'Authentication', category: 'security', description: 'JWT, OAuth, and authentication patterns', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 44 },
    
    // Design Patterns Sections
    { name: 'Component Patterns', category: 'design patterns', description: 'HOC, render props, and compound components', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 45 },
    { name: 'Architecture Patterns', category: 'design patterns', description: 'MVC, MVVM, and component architecture', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 46 },
    { name: 'Design Systems', category: 'design patterns', description: 'Building and maintaining design systems', difficulty: 'advanced', estimatedTime: '4-5 weeks', order: 47 },
    
    // Career & Soft Skills Sections
    { name: 'Interview Preparation', category: 'career development', description: 'Technical interviews and coding challenges', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 48 },
    { name: 'Technical Communication', category: 'communication', description: 'Documentation and team collaboration', difficulty: 'beginner', estimatedTime: '1-2 weeks', order: 49 },
    { name: 'Project Management', category: 'project management', description: 'Agile methodologies and project planning', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 50 },
  ]
};

async function clearExistingData() {
  try {
    console.log('🧹 Clearing existing data...');
    
    // Clear sections
    const sectionsResponse = await fetch(`${BASE_URL}/api/admin/sections`);
    const sectionsData = await sectionsResponse.json();
    
    if (sectionsData.success) {
      for (const section of sectionsData.data) {
        await fetch(`${BASE_URL}/api/admin/sections`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId: section.id }),
        });
        console.log(`🗑️  Deleted section: ${section.name}`);
      }
    }
    
    // Clear categories
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesData.success) {
      for (const category of categoriesData.data) {
        await fetch(`${BASE_URL}/api/categories/${category.id}`, {
          method: 'DELETE',
        });
        console.log(`🗑️  Deleted category: ${category.name}`);
      }
    }
    
    // Clear topics
    const topicsResponse = await fetch(`${BASE_URL}/api/topics`);
    const topicsData = await topicsResponse.json();
    
    if (topicsData.success) {
      for (const topic of topicsData.data) {
        await fetch(`${BASE_URL}/api/topics/${topic.id}`, {
          method: 'DELETE',
        });
        console.log(`🗑️  Deleted topic: ${topic.name}`);
      }
    }
    
    console.log('✅ Existing data cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

async function createCategories() {
  try {
    console.log('📁 Creating categories...');
    const categoryMap = new Map();
    
    for (const categoryData of comprehensiveData.categories) {
      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
      
      const data = await response.json();
      if (data.success) {
        categoryMap.set(categoryData.name.toLowerCase(), data.data.id);
        console.log(`✅ Created category: ${categoryData.name}`);
      } else {
        console.error(`❌ Failed to create category ${categoryData.name}:`, data.error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return categoryMap;
  } catch (error) {
    console.error('❌ Error creating categories:', error);
    return new Map();
  }
}

async function createTopics(categoryMap) {
  try {
    console.log('🏷️  Creating topics...');
    const topicMap = new Map();
    
    for (const topicData of comprehensiveData.topics) {
      const categoryId = categoryMap.get(topicData.category.toLowerCase());
      if (!categoryId) {
        console.warn(`⚠️  Category not found for topic: ${topicData.name}`);
        continue;
      }
      
      // Add default difficulty if not provided
      const topicWithDifficulty = {
        ...topicData,
        difficulty: topicData.difficulty || 'intermediate',
        categoryId,
      };
      
      const response = await fetch(`${BASE_URL}/api/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(topicWithDifficulty),
      });
      
      const data = await response.json();
      if (data.success) {
        topicMap.set(topicData.name, data.data.id);
        console.log(`✅ Created topic: ${topicData.name}`);
      } else {
        console.error(`❌ Failed to create topic ${topicData.name}:`, data.error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return topicMap;
  } catch (error) {
    console.error('❌ Error creating topics:', error);
    return new Map();
  }
}

async function createSections(categoryMap) {
  try {
    console.log('📚 Creating sections...');
    const sectionMap = new Map();
    
    for (const sectionData of comprehensiveData.sections) {
      const categoryId = categoryMap.get(sectionData.category.toLowerCase());
      if (!categoryId) {
        console.warn(`⚠️  Category not found for section: ${sectionData.name}`);
        continue;
      }
      
      const response = await fetch(`${BASE_URL}/api/admin/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sectionData,
          categoryId,
          isActive: true,
          questionCount: 0,
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        sectionMap.set(sectionData.name, data.data.id);
        console.log(`✅ Created section: ${sectionData.name}`);
      } else {
        console.error(`❌ Failed to create section ${sectionData.name}:`, data.error);
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return sectionMap;
  } catch (error) {
    console.error('❌ Error creating sections:', error);
    return new Map();
  }
}

async function createComprehensiveData() {
  try {
    console.log('🚀 Starting comprehensive data creation...');
    console.log('📡 Using API endpoints (make sure the server is running)');
    
    // Clear existing data
    await clearExistingData();
    
    // Create categories first
    const categoryMap = await createCategories();
    
    // Create topics
    const topicMap = await createTopics(categoryMap);
    
    // Create sections
    const sectionMap = await createSections(categoryMap);
    
    console.log('🎉 Successfully created comprehensive data!');
    console.log(`📊 Created ${categoryMap.size} categories, ${topicMap.size} topics, and ${sectionMap.size} sections`);
    
    // Print summary
    console.log('\n📋 Summary:');
    console.log('Categories:', Array.from(categoryMap.keys()));
    console.log('Topics:', Array.from(topicMap.keys()).slice(0, 10), '...');
    console.log('Sections:', Array.from(sectionMap.keys()).slice(0, 10), '...');
    
  } catch (error) {
    console.error('❌ Error creating comprehensive data:', error);
    process.exit(1);
  }
}

// Run the script
createComprehensiveData().then(() => {
  console.log('✨ Script completed successfully!');
  process.exit(0);
});
