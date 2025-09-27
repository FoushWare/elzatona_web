const fetch = require('node-fetch');

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Focused frontend data structure based on user requirements
const focusedData = {
  categories: [
    { name: 'HTML & Web Fundamentals', description: 'Core HTML concepts and web fundamentals' },
    { name: 'CSS & Styling', description: 'CSS styling, layout, and modern techniques' },
    { name: 'JavaScript (Core)', description: 'Core JavaScript concepts and features' },
    { name: 'DOM & Browser', description: 'DOM manipulation and browser APIs' },
    { name: 'React.js (Core)', description: 'Core React concepts and patterns' },
    { name: 'Next.js (Framework)', description: 'Next.js framework and features' },
    { name: 'State Management', description: 'State management solutions and patterns' },
    { name: 'TypeScript for Frontend', description: 'TypeScript in frontend development' },
    { name: 'Performance Optimization', description: 'Frontend performance optimization techniques' },
    { name: 'Security', description: 'Frontend security best practices' },
    { name: 'Testing & Quality', description: 'Testing strategies and quality assurance' },
    { name: 'System Design & Architecture', description: 'Frontend architecture and system design' },
    { name: 'Soft Skills & Interview Prep', description: 'Interview preparation and soft skills' },
  ],

  topics: [
    // HTML & Web Fundamentals
    { name: 'Semantic HTML', category: 'HTML & Web Fundamentals', description: 'Using semantic HTML elements for better accessibility and SEO', difficulty: 'beginner' },
    { name: 'Forms & Validation', category: 'HTML & Web Fundamentals', description: 'HTML forms, input types, and validation techniques', difficulty: 'intermediate' },
    { name: 'Accessibility (a11y)', category: 'HTML & Web Fundamentals', description: 'Web accessibility guidelines and ARIA attributes', difficulty: 'intermediate' },
    { name: 'SEO basics', category: 'HTML & Web Fundamentals', description: 'Search engine optimization fundamentals for web pages', difficulty: 'beginner' },
    { name: 'HTML APIs (localStorage, sessionStorage)', category: 'HTML & Web Fundamentals', description: 'Browser storage APIs and data persistence', difficulty: 'intermediate' },

    // CSS & Styling
    { name: 'Box Model & Positioning', category: 'CSS & Styling', description: 'CSS box model, positioning, and layout fundamentals', difficulty: 'beginner' },
    { name: 'Flexbox, Grid', category: 'CSS & Styling', description: 'Modern CSS layout systems: Flexbox and CSS Grid', difficulty: 'intermediate' },
    { name: 'Responsive Design', category: 'CSS & Styling', description: 'Mobile-first design and responsive layouts', difficulty: 'intermediate' },
    { name: 'CSS Variables & Custom Properties', category: 'CSS & Styling', description: 'CSS custom properties and theming systems', difficulty: 'intermediate' },
    { name: 'Animations & Transitions', category: 'CSS & Styling', description: 'CSS animations, transitions, and keyframes', difficulty: 'intermediate' },
    { name: 'CSS-in-JS (Styled Components, Emotion, Tailwind basics)', category: 'CSS & Styling', description: 'CSS-in-JS libraries and utility-first CSS', difficulty: 'advanced' },

    // JavaScript (Core)
    { name: 'Variables (var, let, const)', category: 'JavaScript (Core)', description: 'JavaScript variable declarations and scope', difficulty: 'beginner' },
    { name: 'Hoisting', category: 'JavaScript (Core)', description: 'JavaScript hoisting behavior and temporal dead zone', difficulty: 'intermediate' },
    { name: 'Closures', category: 'JavaScript (Core)', description: 'JavaScript closures and lexical scoping', difficulty: 'intermediate' },
    { name: 'Scope & this', category: 'JavaScript (Core)', description: 'JavaScript scope chain and this binding', difficulty: 'intermediate' },
    { name: 'Event Loop & Async/Await', category: 'JavaScript (Core)', description: 'JavaScript event loop and asynchronous programming', difficulty: 'advanced' },
    { name: 'Prototypes & Inheritance', category: 'JavaScript (Core)', description: 'Prototype-based inheritance in JavaScript', difficulty: 'advanced' },
    { name: 'ES6+ Features (spread, destructuring, modules)', category: 'JavaScript (Core)', description: 'Modern JavaScript features and syntax', difficulty: 'intermediate' },
    { name: 'Promises & Callbacks', category: 'JavaScript (Core)', description: 'Asynchronous JavaScript with promises and callbacks', difficulty: 'intermediate' },

    // DOM & Browser
    { name: 'DOM Manipulation', category: 'DOM & Browser', description: 'Working with the Document Object Model', difficulty: 'intermediate' },
    { name: 'Event Delegation', category: 'DOM & Browser', description: 'Event delegation patterns and performance optimization', difficulty: 'intermediate' },
    { name: 'Web APIs (Fetch, Storage, History, IntersectionObserver)', category: 'DOM & Browser', description: 'Modern browser APIs and their usage', difficulty: 'intermediate' },
    { name: 'Browser Rendering (Critical Path)', category: 'DOM & Browser', description: 'How browsers render web pages and critical rendering path', difficulty: 'advanced' },

    // React.js (Core)
    { name: 'Components (Functional vs Class)', category: 'React.js (Core)', description: 'React component types and when to use each', difficulty: 'beginner' },
    { name: 'Props & State', category: 'React.js (Core)', description: 'React props and state management', difficulty: 'beginner' },
    { name: 'Lifecycle vs Hooks', category: 'React.js (Core)', description: 'React lifecycle methods vs modern hooks', difficulty: 'intermediate' },
    { name: 'useEffect, useMemo, useCallback', category: 'React.js (Core)', description: 'Essential React hooks for side effects and optimization', difficulty: 'intermediate' },
    { name: 'Context API', category: 'React.js (Core)', description: 'React Context for state management', difficulty: 'intermediate' },
    { name: 'Controlled vs Uncontrolled Components', category: 'React.js (Core)', description: 'Form handling patterns in React', difficulty: 'intermediate' },
    { name: 'Forms in React', category: 'React.js (Core)', description: 'Building and handling forms in React applications', difficulty: 'intermediate' },
    { name: 'Error Boundaries', category: 'React.js (Core)', description: 'Error handling and error boundaries in React', difficulty: 'advanced' },

    // Next.js (Framework)
    { name: 'File-based Routing', category: 'Next.js (Framework)', description: 'Next.js routing system and navigation', difficulty: 'beginner' },
    { name: 'Server Components vs Client Components', category: 'Next.js (Framework)', description: 'Understanding React Server and Client Components', difficulty: 'advanced' },
    { name: 'Data Fetching (getServerSideProps, getStaticProps, fetch in Server Components)', category: 'Next.js (Framework)', description: 'Data fetching strategies in Next.js', difficulty: 'intermediate' },
    { name: 'API Routes', category: 'Next.js (Framework)', description: 'Building API endpoints in Next.js', difficulty: 'intermediate' },
    { name: 'Middleware', category: 'Next.js (Framework)', description: 'Next.js middleware for request handling', difficulty: 'advanced' },
    { name: 'Image Optimization', category: 'Next.js (Framework)', description: 'Next.js Image component and optimization', difficulty: 'intermediate' },
    { name: 'SEO in Next.js', category: 'Next.js (Framework)', description: 'Search engine optimization with Next.js', difficulty: 'intermediate' },
    { name: 'Deployment (Vercel basics)', category: 'Next.js (Framework)', description: 'Deploying Next.js applications to Vercel', difficulty: 'beginner' },

    // State Management
    { name: 'Redux (Core Concepts)', category: 'State Management', description: 'Redux state management fundamentals', difficulty: 'advanced' },
    { name: 'Zustand, Jotai, Recoil basics', category: 'State Management', description: 'Modern state management libraries', difficulty: 'intermediate' },
    { name: 'Context API vs Redux', category: 'State Management', description: 'Choosing between Context API and Redux', difficulty: 'intermediate' },
    { name: 'Global vs Local State', category: 'State Management', description: 'State management patterns and best practices', difficulty: 'intermediate' },

    // TypeScript for Frontend
    { name: 'Basic Types', category: 'TypeScript for Frontend', description: 'TypeScript basic types and type annotations', difficulty: 'beginner' },
    { name: 'Interfaces vs Types', category: 'TypeScript for Frontend', description: 'TypeScript interfaces and type aliases', difficulty: 'intermediate' },
    { name: 'Generics', category: 'TypeScript for Frontend', description: 'TypeScript generics and reusable types', difficulty: 'advanced' },
    { name: 'Utility Types', category: 'TypeScript for Frontend', description: 'TypeScript utility types and type manipulation', difficulty: 'advanced' },
    { name: 'Typing React Components & Hooks', category: 'TypeScript for Frontend', description: 'TypeScript with React components and hooks', difficulty: 'intermediate' },
    { name: 'Next.js + TS patterns', category: 'TypeScript for Frontend', description: 'TypeScript patterns in Next.js applications', difficulty: 'intermediate' },

    // Performance Optimization
    { name: 'Code Splitting & Lazy Loading', category: 'Performance Optimization', description: 'Code splitting strategies and lazy loading', difficulty: 'intermediate' },
    { name: 'Memoization (React.memo, useMemo)', category: 'Performance Optimization', description: 'React performance optimization with memoization', difficulty: 'intermediate' },
    { name: 'Avoiding Re-renders', category: 'Performance Optimization', description: 'Preventing unnecessary re-renders in React', difficulty: 'intermediate' },
    { name: 'Virtualization (react-window, react-virtualized)', category: 'Performance Optimization', description: 'Virtual scrolling for large lists', difficulty: 'advanced' },
    { name: 'Browser Caching', category: 'Performance Optimization', description: 'Browser caching strategies and optimization', difficulty: 'intermediate' },
    { name: 'Lighthouse / Web Vitals', category: 'Performance Optimization', description: 'Performance measurement and Core Web Vitals', difficulty: 'intermediate' },

    // Security
    { name: 'XSS (Cross-site scripting)', category: 'Security', description: 'Cross-site scripting attacks and prevention', difficulty: 'intermediate' },
    { name: 'CSRF', category: 'Security', description: 'Cross-site request forgery attacks and protection', difficulty: 'intermediate' },
    { name: 'CORS', category: 'Security', description: 'Cross-origin resource sharing and security', difficulty: 'intermediate' },
    { name: 'Content Security Policy (CSP)', category: 'Security', description: 'Content Security Policy implementation', difficulty: 'advanced' },
    { name: 'Handling Tokens (JWT, cookies vs localStorage)', category: 'Security', description: 'Secure token handling and storage', difficulty: 'intermediate' },

    // Testing & Quality
    { name: 'Unit Testing (Jest)', category: 'Testing & Quality', description: 'Unit testing with Jest framework', difficulty: 'intermediate' },
    { name: 'Component Testing (React Testing Library)', category: 'Testing & Quality', description: 'Testing React components with RTL', difficulty: 'intermediate' },
    { name: 'E2E Testing (Playwright, Cypress)', category: 'Testing & Quality', description: 'End-to-end testing with modern tools', difficulty: 'intermediate' },
    { name: 'Mocking APIs', category: 'Testing & Quality', description: 'API mocking strategies for testing', difficulty: 'intermediate' },
    { name: 'Snapshot Testing', category: 'Testing & Quality', description: 'Snapshot testing for UI consistency', difficulty: 'intermediate' },

    // System Design & Architecture
    { name: 'Monolith vs Microfrontend', category: 'System Design & Architecture', description: 'Architecture patterns for frontend applications', difficulty: 'advanced' },
    { name: 'SSR vs CSR vs SSG vs ISR', category: 'System Design & Architecture', description: 'Rendering strategies and their trade-offs', difficulty: 'advanced' },
    { name: 'CDN & Edge Rendering', category: 'System Design & Architecture', description: 'Content delivery networks and edge computing', difficulty: 'advanced' },
    { name: 'Caching Strategies', category: 'System Design & Architecture', description: 'Caching strategies for web applications', difficulty: 'intermediate' },
    { name: 'Design Patterns (Observer, Singleton in frontend)', category: 'System Design & Architecture', description: 'Design patterns in frontend development', difficulty: 'advanced' },

    // Soft Skills & Interview Prep
    { name: 'Explaining Code Simply', category: 'Soft Skills & Interview Prep', description: 'Communication skills for technical interviews', difficulty: 'beginner' },
    { name: 'Whiteboard Interview Tips', category: 'Soft Skills & Interview Prep', description: 'Strategies for whiteboard coding interviews', difficulty: 'beginner' },
    { name: 'Common Frontend Interview Questions', category: 'Soft Skills & Interview Prep', description: 'Frequently asked frontend interview questions', difficulty: 'intermediate' },
    { name: 'How to Approach System Design in Frontend', category: 'Soft Skills & Interview Prep', description: 'System design thinking for frontend interviews', difficulty: 'advanced' },
  ],

  sections: [
    // HTML & Web Fundamentals
    { name: 'HTML Fundamentals', category: 'HTML & Web Fundamentals', description: 'Core HTML concepts and semantic markup', difficulty: 'beginner', estimatedTime: '1-2 weeks', order: 1 },
    { name: 'Forms & Validation', category: 'HTML & Web Fundamentals', description: 'HTML forms, validation, and user input handling', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 2 },
    { name: 'Accessibility & SEO', category: 'HTML & Web Fundamentals', description: 'Web accessibility and search engine optimization', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 3 },
    { name: 'Web APIs & Storage', category: 'HTML & Web Fundamentals', description: 'Browser APIs and data storage solutions', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 4 },

    // CSS & Styling
    { name: 'CSS Layout Fundamentals', category: 'CSS & Styling', description: 'Box model, positioning, and basic layout concepts', difficulty: 'beginner', estimatedTime: '2-3 weeks', order: 5 },
    { name: 'Modern CSS Layout', category: 'CSS & Styling', description: 'Flexbox, Grid, and responsive design techniques', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 6 },
    { name: 'CSS Advanced Features', category: 'CSS & Styling', description: 'Variables, animations, and CSS-in-JS', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 7 },

    // JavaScript (Core)
    { name: 'JavaScript Fundamentals', category: 'JavaScript (Core)', description: 'Variables, scope, and basic JavaScript concepts', difficulty: 'beginner', estimatedTime: '3-4 weeks', order: 8 },
    { name: 'Advanced JavaScript', category: 'JavaScript (Core)', description: 'Closures, prototypes, and advanced concepts', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 9 },
    { name: 'Async JavaScript', category: 'JavaScript (Core)', description: 'Promises, async/await, and asynchronous programming', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 10 },
    { name: 'Modern JavaScript', category: 'JavaScript (Core)', description: 'ES6+ features and modern JavaScript patterns', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 11 },

    // DOM & Browser
    { name: 'DOM Manipulation', category: 'DOM & Browser', description: 'Working with the Document Object Model', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 12 },
    { name: 'Browser APIs', category: 'DOM & Browser', description: 'Web APIs and browser capabilities', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 13 },
    { name: 'Browser Performance', category: 'DOM & Browser', description: 'Browser rendering and performance optimization', difficulty: 'advanced', estimatedTime: '2-3 weeks', order: 14 },

    // React.js (Core)
    { name: 'React Components', category: 'React.js (Core)', description: 'React components, props, and state', difficulty: 'beginner', estimatedTime: '3-4 weeks', order: 15 },
    { name: 'React Hooks', category: 'React.js (Core)', description: 'React hooks and modern patterns', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 16 },
    { name: 'React Advanced', category: 'React.js (Core)', description: 'Context API, forms, and error handling', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 17 },

    // Next.js (Framework)
    { name: 'Next.js Basics', category: 'Next.js (Framework)', description: 'Next.js fundamentals and file-based routing', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 18 },
    { name: 'Next.js Advanced', category: 'Next.js (Framework)', description: 'Server components, data fetching, and optimization', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 19 },
    { name: 'Next.js Deployment', category: 'Next.js (Framework)', description: 'Deployment and production optimization', difficulty: 'intermediate', estimatedTime: '1-2 weeks', order: 20 },

    // State Management
    { name: 'State Management Fundamentals', category: 'State Management', description: 'State management patterns and Context API', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 21 },
    { name: 'Redux & Modern Libraries', category: 'State Management', description: 'Redux, Zustand, and other state management solutions', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 22 },

    // TypeScript for Frontend
    { name: 'TypeScript Basics', category: 'TypeScript for Frontend', description: 'TypeScript fundamentals and basic types', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 23 },
    { name: 'TypeScript Advanced', category: 'TypeScript for Frontend', description: 'Advanced TypeScript features and React integration', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 24 },

    // Performance Optimization
    { name: 'Performance Fundamentals', category: 'Performance Optimization', description: 'Performance measurement and basic optimization', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 25 },
    { name: 'Advanced Performance', category: 'Performance Optimization', description: 'Code splitting, memoization, and virtualization', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 26 },

    // Security
    { name: 'Frontend Security', category: 'Security', description: 'XSS, CSRF, and security best practices', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 27 },

    // Testing & Quality
    { name: 'Testing Fundamentals', category: 'Testing & Quality', description: 'Unit testing and component testing', difficulty: 'intermediate', estimatedTime: '3-4 weeks', order: 28 },
    { name: 'Advanced Testing', category: 'Testing & Quality', description: 'E2E testing and testing strategies', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 29 },

    // System Design & Architecture
    { name: 'Frontend Architecture', category: 'System Design & Architecture', description: 'Architecture patterns and system design', difficulty: 'advanced', estimatedTime: '3-4 weeks', order: 30 },

    // Soft Skills & Interview Prep
    { name: 'Interview Preparation', category: 'Soft Skills & Interview Prep', description: 'Technical interview skills and preparation', difficulty: 'intermediate', estimatedTime: '2-3 weeks', order: 31 },
  ]
};

async function clearAllData() {
  try {
    console.log('🧹 Clearing all existing data...');
    
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
    
    console.log('✅ All existing data cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

async function createCategories() {
  try {
    console.log('📁 Creating focused categories...');
    const categoryMap = new Map();
    
    for (const categoryData of focusedData.categories) {
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
    console.log('🏷️  Creating focused topics...');
    const topicMap = new Map();
    
    for (const topicData of focusedData.topics) {
      const categoryId = categoryMap.get(topicData.category.toLowerCase());
      if (!categoryId) {
        console.warn(`⚠️  Category not found for topic: ${topicData.name}`);
        continue;
      }
      
      const response = await fetch(`${BASE_URL}/api/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...topicData,
          categoryId,
        }),
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
    console.log('📚 Creating focused sections...');
    const sectionMap = new Map();
    
    for (const sectionData of focusedData.sections) {
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

async function createFocusedData() {
  try {
    console.log('🚀 Starting focused frontend data creation...');
    console.log('📡 Using API endpoints (make sure the server is running)');
    
    // Clear all existing data
    await clearAllData();
    
    // Create categories first
    const categoryMap = await createCategories();
    
    // Create topics
    const topicMap = await createTopics(categoryMap);
    
    // Create sections
    const sectionMap = await createSections(categoryMap);
    
    console.log('🎉 Successfully created focused frontend data!');
    console.log(`📊 Created ${categoryMap.size} categories, ${topicMap.size} topics, and ${sectionMap.size} sections`);
    
    // Print summary
    console.log('\n📋 Summary:');
    console.log('Categories:', Array.from(categoryMap.keys()));
    console.log('Topics:', Array.from(topicMap.keys()).slice(0, 10), '...');
    console.log('Sections:', Array.from(sectionMap.keys()).slice(0, 10), '...');
    
  } catch (error) {
    console.error('❌ Error creating focused data:', error);
    process.exit(1);
  }
}

// Run the script
createFocusedData().then(() => {
  console.log('✨ Script completed successfully!');
  process.exit(0);
});
