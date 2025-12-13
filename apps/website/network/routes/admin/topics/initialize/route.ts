import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
import { QuestionTopic } from "../route";

// ==========================================
// Topics Library for Interview Questions
// Organized by category for easy seeding
// ==========================================

const topicsLibrary = {
  // ==============================
  // Core JavaScript Concepts
  // ==============================
  "JavaScript Core": [
    "Variables & Scope", // let, const, var
    "Hoisting", // variable/function hoisting behavior
    "Closures", // lexical scope & closure patterns
    "Execution Context", // call stack, global vs function context
    "Prototype & Inheritance", // prototypal OOP
    "this Keyword", // dynamic vs lexical this
    "Strict Mode", // ES5 strict rules
    "Event Loop", // call stack, task queue, micro/macro tasks
    "Callbacks",
    "Promises",
    "Async/Await",
    "Generators",
    "Iterators",
    "Symbols",
    "Modules (ESM, CommonJS)",
    "Dynamic Imports",
    "Error Handling",
    "Memory Management",
    "Garbage Collection",
    "Event Emitters",
    "Debounce & Throttle",
    "Polyfills",
    "Shallow vs Deep Copy",
    "Nullish Coalescing & Optional Chaining",
    "Immutable Data Structures",
    "Functional Programming",
    "Object-Oriented Programming",
  ],

  // ==============================
  // Data Structures & Algorithms
  // ==============================
  "Data Structures & Algorithms": [
    "Arrays",
    "Objects",
    "Sets & Maps",
    "WeakMap & WeakSet",
    "Stacks",
    "Queues",
    "Priority Queues",
    "Linked Lists",
    "Doubly Linked Lists",
    "Hash Tables",
    "Binary Trees",
    "Binary Search Trees",
    "AVL Trees", // self-balancing tree
    "Red-Black Trees", // balanced BST
    "Heaps", // min/max heap
    "Graphs",
    "DFS & BFS",
    "Topological Sort",
    "Sorting Algorithms", // bubble, quicksort, mergesort
    "Searching Algorithms", // linear, binary
    "Dynamic Programming",
    "Greedy Algorithms",
    "Divide & Conquer",
    "Backtracking",
    "Big-O Complexity",
    "Recursion",
    "Memoization",
    "Bit Manipulation",
    "String Algorithms",
    "Sliding Window",
  ],

  // ==============================
  // Browser APIs & DOM
  // ==============================
  "Browser & DOM": [
    "DOM Manipulation",
    "DOM Events",
    "Event Bubbling & Capturing",
    "Event Delegation",
    "Shadow DOM",
    "Custom Elements",
    "Web Components",
    "Browser Storage (LocalStorage, SessionStorage, Cookies)",
    "IndexedDB",
    "History API",
    "Web Workers",
    "Service Workers",
    "WebSockets",
    "Fetch & AJAX",
    "CORS",
    "SSE (Server-Sent Events)",
    "Browser Rendering & Reflow",
    "Paint & Composite",
    "Cross-Origin Isolation",
    "Performance Optimization",
    "Accessibility (a11y)",
    "ARIA Roles",
    "SEO Basics",
    "WebRTC",
    "Geolocation API",
    "Canvas API",
    "WebGL",
    "WebGPU", // modern GPU rendering
    "Battery API",
    "Clipboard API",
    "Fullscreen API",
    "Notifications API",
    "Pointer Lock API",
    "Gamepad API",
    "Media Devices API",
  ],

  // ==============================
  // CSS & Styling
  // ==============================
  "CSS & Styling": [
    "Box Model",
    "Specificity",
    "Flexbox",
    "CSS Grid",
    "Positioning",
    "Z-Index",
    "Animations & Transitions",
    "Responsive Design",
    "Media Queries",
    "CSS Variables",
    "Pseudo Classes & Elements",
    "Preprocessors (Sass, Less)",
    "PostCSS",
    "BEM Methodology",
    "Atomic CSS",
    "Utility-First CSS",
    "CSS-in-JS",
    "TailwindCSS",
    "Styled Components",
    "CSS Modules",
    "Theming",
    "Dark Mode",
    "Print Styles",
    "Critical CSS",
    "Cascading Layers (CSS @layer)",
    "Container Queries",
    "Subgrid",
    "Aspect-Ratio",
    "Clamp & Min/Max",
    "Logical Properties",
    "CSS Houdini",
  ],

  // ==============================
  // React Ecosystem
  // ==============================
  React: [
    "React Basics",
    "JSX",
    "Components (Functional & Class)",
    "Props & State",
    "Lifecycle Methods",
    "React Hooks",
    "useState",
    "useEffect",
    "useReducer",
    "useContext",
    "useRef",
    "useMemo",
    "useCallback",
    "Custom Hooks",
    "Refs & Forwarding",
    "Controlled vs Uncontrolled Components",
    "React Router",
    "Code Splitting",
    "Suspense",
    "Error Boundaries",
    "React Portals",
    "Server Components",
    "Concurrent Rendering",
    "Hydration",
    "React Query",
    "TanStack Table",
    "Formik",
    "React Hook Form",
    "React Performance Optimization",
    "State Management (Redux, Zustand, Recoil, Jotai)",
    "Virtual DOM",
    "Diffing Algorithm",
    "Fiber Architecture",
  ],

  // ==============================
  // Next.js & Modern Frameworks
  // ==============================
  "Next.js & Frameworks": [
    "Next.js Basics",
    "Next.js Routing",
    "Next.js Data Fetching (SSR, SSG, ISR)",
    "Next.js API Routes",
    "Next.js Middleware",
    "Static Exports",
    "App Router vs Pages Router",
    "Image Optimization",
    "Internationalization (i18n)",
    "Authentication in Next.js",
    "Deployment on Vercel",
    "Remix Basics",
    "Gatsby Basics",
    "Astro Basics",
    "Qwik Basics",
    "SvelteKit Basics",
    "SolidJS Basics",
  ],

  // ==============================
  // TypeScript
  // ==============================
  TypeScript: [
    "TypeScript Basics",
    "Interfaces vs Types",
    "Generics",
    "Enums",
    "Type Inference",
    "Union & Intersection Types",
    "Utility Types",
    "Mapped Types",
    "Conditional Types",
    "Type Narrowing",
    "Never & Unknown Types",
    "Decorators",
    "Modules in TS",
    "Namespaces",
    "TypeScript with React",
    "tsconfig.json",
    "Type Guards",
    "Ambient Declarations",
    "Advanced Types",
    "Type-Only Imports",
    "Declaration Merging",
    "Structural Typing",
    "Discriminated Unions",
  ],

  // ==============================
  // Testing
  // ==============================
  Testing: [
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
    "Test Pyramid",
    "Jest",
    "Mocha & Chai",
    "React Testing Library",
    "Cypress",
    "Playwright",
    "Vitest",
    "Mocking & Spies",
    "Test Coverage",
    "Snapshot Testing",
    "TDD (Test Driven Development)",
    "BDD (Behavior Driven Development)",
    "Smoke Testing",
    "Regression Testing",
    "Mutation Testing",
  ],

  // ==============================
  // Tooling, CI/CD & DevOps
  // ==============================
  "Build Tools & Workflow": [
    "Webpack",
    "Vite",
    "Rollup",
    "Parcel",
    "SWC",
    "Babel",
    "ESLint",
    "Prettier",
    "Husky & Lint-Staged",
    "Git Hooks",
    "CI/CD Basics",
    "Git & Version Control",
    "GitHub Actions",
    "GitLab CI",
    "Docker Basics",
    "Kubernetes Basics",
    "Package Managers (npm, yarn, pnpm)",
    "Semantic Versioning",
    "Monorepos",
    "NX",
    "Turborepo",
  ],

  // ==============================
  // Security
  // ==============================
  Security: [
    "XSS (Cross-Site Scripting)",
    "CSRF",
    "Clickjacking",
    "CSP (Content Security Policy)",
    "JWT & Authentication",
    "OAuth2",
    "OpenID Connect",
    "Secure Cookies",
    "HTTPS & TLS",
    "Input Validation",
    "SQL Injection",
    "Session Hijacking",
    "SameSite Cookies",
    "Helmet Middleware",
    "Security Headers",
    "Rate Limiting",
    "Brute Force Protection",
    "Password Hashing",
    "Encryption Basics",
  ],

  // ==============================
  // Software Engineering Practices
  // ==============================
  "Software Engineering": [
    "Design Patterns",
    "Singleton Pattern",
    "Factory Pattern",
    "Observer Pattern",
    "Module Pattern",
    "Strategy Pattern",
    "Proxy Pattern",
    "Adapter Pattern",
    "MVC & MVVM",
    "SOLID Principles",
    "Clean Code",
    "Refactoring",
    "Agile & Scrum",
    "Kanban",
    "Code Reviews",
    "Pair Programming",
    "System Design Basics",
    "Scalability",
    "API Design (REST, GraphQL, gRPC)",
    "Event-Driven Architecture",
    "Domain-Driven Design",
    "CQRS",
    "Micro Frontends",
    "Microservices Basics",
  ],

  // ==============================
  // Performance & Monitoring
  // ==============================
  "Performance & Monitoring": [
    "Web Performance Metrics (LCP, TTI, CLS, FID)",
    "Lazy Loading",
    "Code Splitting",
    "Bundle Analysis",
    "Tree Shaking",
    "Caching Strategies",
    "CDN Basics",
    "Compression (Gzip, Brotli)",
    "Image Optimization",
    "Preloading & Prefetching",
    "RUM (Real User Monitoring)",
    "Logging & Monitoring",
    "Error Tracking (Sentry)",
    "Synthetic Monitoring",
    "APM (Application Performance Monitoring)",
  ],

  // ==============================
  // Advanced / Future Trends
  // ==============================
  "Advanced & Future": [
    "PWAs (Progressive Web Apps)",
    "Service Worker Caching",
    "Background Sync",
    "Push Notifications",
    "Edge Computing",
    "Cloud Functions (Serverless)",
    "GraphQL Basics",
    "GraphQL Resolvers",
    "Apollo Client",
    "URQL",
    "WebAssembly (WASM)",
    "Rust + WASM in Frontend",
    "AI in Frontend",
    "LLM Integration",
    "Internationalization (i18n)",
    "Feature Flags",
    "A/B Testing",
    "Canary Releases",
    "Blockchain in Frontend",
    "Decentralized Apps (dApps)",
    "Web3.js",
    "Ethers.js",
    "Smart Contract Basics",
  ],
};

// Get comprehensive common topics from the library
function getCommonTopics(): Omit<QuestionTopic, "id">[] {
  const now = new Date().toISOString();
  const topics: Omit<QuestionTopic, "id">[] = [];

  // Category color mapping
  const categoryColors: Record<string, string> = {
    "JavaScript Core": "#F7DF1E",
    "Data Structures & Algorithms": "#FF6B6B",
    "Browser & DOM": "#4ECDC4",
    "CSS & Styling": "#45B7D1",
    React: "#61DAFB",
    "Next.js & Frameworks": "#000000",
    TypeScript: "#3178C6",
    Testing: "#99425B",
    "Build Tools & Workflow": "#6C757D",
    Security: "#FF4757",
    "Software Engineering": "#2ED573",
    "Performance & Monitoring": "#FFA502",
    "Advanced & Future": "#9C88FF",
  };

  // Convert topics library to QuestionTopic format
  Object.entries(topicsLibrary).forEach(([category, topicNames]) => {
    topicNames.forEach((topicName) => {
      // Create a clean ID from the topic name
      const _id = topicName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/\([^)]*\)/g, "") // Remove parentheses content
        .trim();

      topics.push({
        name: topicName,
        description: `Interview questions and concepts related to ${topicName}`,
        category: category
          .toLowerCase()
          .replace(/\s+/g, "-") as QuestionTopic["category"],
        color: categoryColors[category] || "#3B82F6",
        created_at: now,
        updated_at: now,
        question_count: 0,
      });
    });
  });

  return topics;
}

// Check if topics already exist in Supabase
async function topicsExist(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from("topics").select("*");
    if (error) {
      console.error("Error checking if topics exist:", error);
      return false;
    }
    return data && data.length > 0;
  } catch (error) {
    console.error("Error checking if topics exist:", error);
    return false;
  }
}

// POST /api/admin/topics/initialize
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { force = false } = body;

    const existingTopics = await topicsExist();

    if (existingTopics && !force) {
      return NextResponse.json(
        {
          success: false,
          error: "Topics already exist. Use force=true to overwrite.",
        },
        { status: 400 },
      );
    }

    const commonTopics = getCommonTopics();
    const _topicsRef = supabase.from("topics");
    const createdTopics: QuestionTopic[] = [];

    // If force is true, we need to clear existing topics first
    if (force && existingTopics) {
      const { error: deleteError } = await supabase
        .from("topics")
        .delete()
        .neq("id", 0);
      if (deleteError) {
        console.error("Error clearing existing topics:", deleteError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to clear existing topics",
          },
          { status: 500 },
        );
      }
    }

    // Add all topics to Supabase
    for (const topic of commonTopics) {
      const { data: newTopic, error } = await supabase
        .from("topics")
        .insert({
          ...topic,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating topic:", error);
        continue;
      }

      createdTopics.push(newTopic as QuestionTopic);
    }

    return NextResponse.json({
      success: true,
      data: {
        message: `Successfully initialized ${createdTopics.length} common topics`,
        topics: createdTopics,
        count: createdTopics.length,
      },
    });
  } catch (error) {
    console.error("Error initializing topics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize topics",
      },
      { status: 500 },
    );
  }
}
