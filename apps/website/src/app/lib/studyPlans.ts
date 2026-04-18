// Import StudyPlan from the types package
import type { StudyPlan } from "@elzatona/types";

export const studyPlans: StudyPlan[] = [
  {
    id: "one-week-intensive",
    title: "1 Week Intensive Plan",
    subtitle: "2 hours daily for 7 days",
    description:
      "Fast-track your preparation with focused daily sessions covering all essential topics. Perfect for last-minute interview preparation.",
    duration: {
      weeks: 1,
      hoursPerWeek: 14,
      totalHours: 14,
    },
    difficulty: "advanced",
    color: "from-red-500 to-pink-500",
    features: [
      "Structured Learning Path",
      "Progress Tracking",
      "Practice Exercises",
      "Mock Interviews",
      "Daily Assessments",
    ],
    topics: [
      {
        id: "js-fundamentals",
        title: "JavaScript Fundamentals",
        description:
          "Core JavaScript concepts including hoisting, closures, promises, and async/await",
        category: "javascript",
        difficulty: "medium",
        estimatedHours: 4,
        resources: [
          {
            id: "js-hoisting",
            title: "Understanding Hoisting",
            type: "article",
            url: "/questions/quiz/explain-hoisting",
            description: "Learn how hoisting works in JavaScript",
            estimatedTime: 30,
          },
          {
            id: "js-closures",
            title: "Closures Deep Dive",
            type: "practice",
            url: "/questions/javascript/closure",
            description: "Practice closure problems",
            estimatedTime: 45,
          },
        ],
        practiceQuestions: [
          "Explain hoisting in JavaScript",
          "What are closures and how do they work?",
          "Implement Promise.all from scratch",
          "Explain event loop and async/await",
        ],
      },
      {
        id: "react-basics",
        title: "React Core Concepts",
        description:
          "Essential React concepts including hooks, state management, and component lifecycle",
        category: "react",
        difficulty: "medium",
        estimatedHours: 4,
        resources: [
          {
            id: "react-hooks",
            title: "React Hooks Mastery",
            type: "practice",
            url: "/questions/react/hooks",
            description: "Practice React hooks problems",
            estimatedTime: 60,
          },
        ],
        practiceQuestions: [
          "Implement useCounter hook",
          "Explain useEffect dependencies",
          "Build a custom useDebounce hook",
          "State management with useContext",
        ],
      },
      {
        id: "css-styling",
        title: "CSS & Styling",
        description:
          "Advanced CSS concepts including Flexbox, Grid, and responsive design",
        category: "css",
        difficulty: "medium",
        estimatedHours: 3,
        resources: [
          {
            id: "css-layout",
            title: "CSS Layout Techniques",
            type: "practice",
            url: "/questions/user-interface/layout",
            description: "Practice CSS layout problems",
            estimatedTime: 45,
          },
        ],
        practiceQuestions: [
          "Build a responsive navigation",
          "Create a CSS Grid layout",
          "Implement a modal dialog",
          "Build a carousel component",
        ],
      },
      {
        id: "system-design",
        title: "System Design Basics",
        description: "Introduction to frontend system design concepts",
        category: "system-design",
        difficulty: "hard",
        estimatedHours: 3,
        resources: [
          {
            id: "autocomplete",
            title: "Autocomplete System Design",
            type: "practice",
            url: "/questions/system-design/autocomplete",
            description: "Design an autocomplete system",
            estimatedTime: 90,
          },
        ],
        practiceQuestions: [
          "Design an autocomplete component",
          "Build a real-time chat interface",
          "Design a file upload system",
          "Create a search functionality",
        ],
      },
    ],
    milestones: [
      {
        id: "milestone-1",
        title: "Intensive Preparation",
        description: "Core essential topics for fast-track preparation",
        order: 1,
        topics: [
          "JavaScript Fundamentals",
          "React Core Concepts",
          "CSS & Styling",
          "System Design Basics",
        ],
        tasks: [
          {
            id: "js-hoisting-study",
            title: "Study Hoisting Concepts",
            description: "Read about hoisting and complete practice problems",
            type: "reading",
            estimatedTime: 30,
            resourceUrl: "/questions/quiz/explain-hoisting",
          },
          {
            id: "js-closures-practice",
            title: "Practice Closure Problems",
            description: "Complete closure-related coding challenges",
            type: "practice",
            estimatedTime: 45,
            resourceUrl: "/questions/javascript/closure",
          },
          {
            id: "js-promises-study",
            title: "Study Promises and Async/Await",
            description: "Learn about promises and async programming",
            type: "reading",
            estimatedTime: 45,
          },
          {
            id: "react-hooks-practice",
            title: "Practice React Hooks",
            description: "Complete React hooks problems",
            type: "practice",
            estimatedTime: 60,
            resourceUrl: "/questions/react/hooks",
          },
          {
            id: "css-layout-practice",
            title: "Practice CSS Layout",
            description: "Complete CSS layout challenges",
            type: "practice",
            estimatedTime: 45,
            resourceUrl: "/questions/user-interface/layout",
          },
          {
            id: "autocomplete-design",
            title: "Design Autocomplete System",
            description: "Practice autocomplete system design",
            type: "practice",
            estimatedTime: 90,
            resourceUrl: "/questions/system-design/autocomplete",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic JavaScript knowledge",
      "Familiarity with HTML and CSS",
      "Understanding of web development concepts",
    ],
    outcomes: [
      "Master JavaScript fundamentals",
      "Build React applications confidently",
      "Create responsive web designs",
      "Understand system design principles",
      "Ready for technical interviews",
    ],
    estimatedTotalTime: 14,
  },
  {
    id: "one-month-balanced",
    title: "1 Month Balanced Plan",
    subtitle: "6 hours weekly for 4 weeks",
    description:
      "Comprehensive preparation with a balanced approach to cover all essential topics thoroughly. Perfect for systematic learning.",
    duration: {
      weeks: 4,
      hoursPerWeek: 6,
      totalHours: 24,
    },
    difficulty: "intermediate",
    color: "from-blue-500 to-purple-500",
    features: [
      "Structured Learning Path",
      "Progress Tracking",
      "Practice Exercises",
      "Resource Library",
      "Community Support",
      "Weekly Assessments",
    ],
    topics: [
      {
        id: "js-comprehensive",
        title: "JavaScript Comprehensive",
        description:
          "Complete JavaScript mastery including ES6+, async programming, and advanced concepts",
        category: "javascript",
        difficulty: "medium",
        estimatedHours: 8,
        resources: [
          {
            id: "js-es6",
            title: "ES6+ Features",
            type: "article",
            url: "/questions/javascript/es6",
            description: "Learn modern JavaScript features",
            estimatedTime: 60,
          },
        ],
        practiceQuestions: [
          "Implement Promise.all from scratch",
          "Build a debounce function",
          "Create a deep clone function",
          "Implement event emitter",
        ],
      },
      {
        id: "react-advanced",
        title: "Advanced React",
        description:
          "Advanced React concepts including performance optimization and state management",
        category: "react",
        difficulty: "hard",
        estimatedHours: 8,
        resources: [
          {
            id: "react-performance",
            title: "React Performance",
            type: "practice",
            url: "/questions/react/performance",
            description: "Learn React performance optimization",
            estimatedTime: 90,
          },
        ],
        practiceQuestions: [
          "Optimize React component performance",
          "Implement custom hooks",
          "Build a state management solution",
          "Create a form validation system",
        ],
      },
      {
        id: "css-advanced",
        title: "Advanced CSS",
        description:
          "Advanced CSS techniques including animations, preprocessors, and architecture",
        category: "css",
        difficulty: "medium",
        estimatedHours: 4,
        resources: [
          {
            id: "css-animations",
            title: "CSS Animations",
            type: "practice",
            url: "/questions/css/animations",
            description: "Learn CSS animations and transitions",
            estimatedTime: 60,
          },
        ],
        practiceQuestions: [
          "Create complex CSS animations",
          "Build a responsive design system",
          "Implement CSS Grid layouts",
          "Create custom CSS components",
        ],
      },
      {
        id: "system-design-intermediate",
        title: "System Design Intermediate",
        description:
          "Intermediate system design concepts for frontend applications",
        category: "system-design",
        difficulty: "hard",
        estimatedHours: 4,
        resources: [
          {
            id: "modal-dialog-design",
            title: "Modal Dialog System Design",
            type: "practice",
            url: "/questions/system-design/modal-dialog",
            description: "Design a modal dialog system",
            estimatedTime: 90,
          },
        ],
        practiceQuestions: [
          "Design a modal dialog system",
          "Build a real-time notification system",
          "Create a file upload interface",
          "Design a search and filter system",
        ],
      },
    ],
    milestones: [
      {
        id: "month-m1",
        title: "JavaScript & React Foundations",
        description: "Core patterns and modern features",
        order: 1,
        topics: ["JavaScript Comprehensive", "React Advanced"],
        tasks: [
          {
            id: "es6-study",
            title: "Study ES6+ Features",
            description:
              "Learn about arrow functions, destructuring, and modules",
            type: "reading",
            estimatedTime: 45,
            resourceUrl: "/questions/javascript/es6",
          },
          {
            id: "hooks-practice",
            title: "Practice React Hooks",
            description: "Complete advanced hooks problems",
            type: "practice",
            estimatedTime: 90,
          },
          {
            id: "performance-study",
            title: "Study React Performance",
            description: "Learn about React.memo, useMemo, and useCallback",
            type: "reading",
            estimatedTime: 45,
            resourceUrl: "/questions/react/performance",
          },
        ],
      },
      {
        id: "month-m2",
        title: "Advanced State & Testing",
        description: "Professional patterns for state and quality",
        order: 2,
        topics: ["React Advanced"],
        tasks: [
          {
            id: "custom-hooks",
            title: "Build Custom Hooks",
            description: "Create reusable custom hooks",
            type: "project",
            estimatedTime: 90,
          },
          {
            id: "state-management",
            title: "State Management Practice",
            description: "Practice with Context API and state patterns",
            type: "practice",
            estimatedTime: 90,
          },
          {
            id: "react-testing",
            title: "React Testing Practice",
            description: "Practice testing React components",
            type: "practice",
            estimatedTime: 90,
          },
        ],
      },
      {
        id: "month-m3",
        title: "Advanced Styling & Systems",
        description: "Mastering the frontend architecture",
        order: 3,
        topics: ["CSS Advanced", "System Design Intermediate"],
        tasks: [
          {
            id: "css-animations-practice",
            title: "CSS Animations Practice",
            description: "Create complex CSS animations",
            type: "practice",
            estimatedTime: 90,
            resourceUrl: "/questions/css/animations",
          },
          {
            id: "modal-design",
            title: "Modal Dialog Design",
            description: "Design a modal dialog system",
            type: "practice",
            estimatedTime: 90,
            resourceUrl: "/questions/system-design/modal-dialog",
          },
        ],
      },
    ],
    prerequisites: [
      "Basic JavaScript knowledge",
      "Familiarity with React basics",
      "Understanding of HTML and CSS",
    ],
    outcomes: [
      "Master JavaScript and React",
      "Build complex web applications",
      "Understand system design principles",
      "Confident in technical interviews",
      "Ready for senior-level positions",
    ],
    estimatedTotalTime: 24,
  },
  {
    id: "three-months-comprehensive",
    title: "3 Months Comprehensive Plan",
    subtitle: "3 hours weekly for 12 weeks",
    description:
      "Deep dive into all aspects of frontend development with expert-level preparation and mastery. Perfect for career advancement.",
    duration: {
      weeks: 12,
      hoursPerWeek: 3,
      totalHours: 36,
    },
    difficulty: "advanced",
    color: "from-green-500 to-teal-500",
    features: [
      "Structured Learning Path",
      "Progress Tracking",
      "Practice Exercises",
      "Mock Interviews",
      "Resource Library",
      "Community Support",
      "Expert Mentorship",
      "Portfolio Building",
    ],
    topics: [
      {
        id: "js-mastery",
        title: "JavaScript Mastery",
        description:
          "Complete JavaScript mastery including advanced patterns and performance optimization",
        category: "javascript",
        difficulty: "hard",
        estimatedHours: 12,
        resources: [
          {
            id: "js-advanced-patterns",
            title: "Advanced JavaScript Patterns",
            type: "article",
            url: "/questions/javascript/advanced-patterns",
            description: "Learn advanced JavaScript patterns",
            estimatedTime: 90,
          },
        ],
        practiceQuestions: [
          "Implement a custom event system",
          "Build a module loader",
          "Create a virtual DOM",
          "Implement a state machine",
        ],
      },
      {
        id: "react-expert",
        title: "React Expert Level",
        description:
          "Expert-level React including advanced patterns and performance optimization",
        category: "react",
        difficulty: "hard",
        estimatedHours: 12,
        resources: [
          {
            id: "react-advanced-patterns",
            title: "Advanced React Patterns",
            type: "practice",
            url: "/questions/react/advanced-patterns",
            description: "Learn advanced React patterns",
            estimatedTime: 120,
          },
        ],
        practiceQuestions: [
          "Build a custom React renderer",
          "Implement advanced hooks",
          "Create a state management library",
          "Build a component library",
        ],
      },
      {
        id: "system-design-expert",
        title: "System Design Expert",
        description:
          "Expert-level system design for complex frontend applications",
        category: "system-design",
        difficulty: "hard",
        estimatedHours: 8,
        resources: [
          {
            id: "complex-system-design",
            title: "Complex System Design",
            type: "practice",
            url: "/questions/system-design/complex",
            description: "Practice complex system design problems",
            estimatedTime: 120,
          },
        ],
        practiceQuestions: [
          "Design a real-time collaboration system",
          "Build a scalable dashboard",
          "Create a recommendation engine",
          "Design a social media feed",
        ],
      },
      {
        id: "performance-optimization",
        title: "Performance Optimization",
        description: "Advanced performance optimization techniques",
        category: "performance",
        difficulty: "hard",
        estimatedHours: 4,
        resources: [
          {
            id: "performance-advanced",
            title: "Advanced Performance",
            type: "practice",
            url: "/questions/performance/advanced",
            description: "Learn advanced performance techniques",
            estimatedTime: 90,
          },
        ],
        practiceQuestions: [
          "Optimize bundle size",
          "Implement code splitting",
          "Optimize rendering performance",
          "Build a performance monitoring system",
        ],
      },
    ],
    milestones: [
      {
        id: "long-m1",
        title: "Advanced JavaScript & Patterns",
        description: "Mastering the language at scale",
        order: 1,
        topics: ["JavaScript Mastery"],
        tasks: [
          {
            id: "js-advanced-study",
            title: "Study Advanced Patterns",
            description:
              "Learn about design patterns and architectural decisions",
            type: "reading",
            estimatedTime: 120,
            resourceUrl: "/questions/javascript/advanced-patterns",
          },
        ],
      },
      {
        id: "long-m2",
        title: "Expert Systems & Architecture",
        description: "Designing for millions of users",
        order: 2,
        topics: ["System Design Expert"],
        tasks: [
          {
            id: "complex-design",
            title: "Complex System Design",
            description: "Practice designing enterprise-scale systems",
            type: "practice",
            estimatedTime: 180,
            resourceUrl: "/questions/system-design/complex",
          },
        ],
      },
      {
        id: "long-m3",
        title: "Enterprise Performance",
        description: "Zero to Hero in performance optimization",
        order: 3,
        topics: ["performance-optimization"],
        tasks: [
          {
            id: "performance-advanced",
            title: "Advanced Performance Audit",
            description: "Learn to audit and fix complex performance issues",
            type: "practice",
            estimatedTime: 120,
            resourceUrl: "/questions/performance/advanced",
          },
        ],
      },
    ],
    prerequisites: [
      "Strong JavaScript foundation",
      "React experience",
      "Understanding of web development",
      "Basic system design knowledge",
    ],
    outcomes: [
      "Expert-level JavaScript and React",
      "Master system design principles",
      "Build enterprise applications",
      "Lead technical interviews",
      "Ready for principal-level positions",
    ],
    estimatedTotalTime: 36,
  },
];

export const getStudyPlanById = (id: string): StudyPlan | undefined => {
  return studyPlans.find((plan) => plan.id === id);
};

export const getAllStudyPlans = (): StudyPlan[] => {
  return studyPlans;
};

export const getStudyPlansByDifficulty = (difficulty: string): StudyPlan[] => {
  return studyPlans.filter((plan) => plan.difficulty === difficulty);
};

export const getStudyPlansByDuration = (weeks: number): StudyPlan[] => {
  return studyPlans.filter((plan) => plan.duration.weeks === weeks);
};
