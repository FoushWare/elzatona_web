// Import StudyPlan directly since it's not exported from shared-types index
import type { StudyPlan } from "../../../../libs/types/src/lib/studyPlans";

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
    schedule: [
      {
        weekNumber: 1,
        title: "Intensive Preparation Week",
        description: "Daily focused sessions covering all essential topics",
        topics: [
          "JavaScript Fundamentals",
          "React Core Concepts",
          "CSS & Styling",
          "System Design Basics",
        ],
        totalHours: 14,
        dailySchedule: [
          {
            day: 1,
            title: "JavaScript Fundamentals Day 1",
            description: "Focus on hoisting, closures, and scope",
            topics: ["JavaScript Fundamentals"],
            estimatedHours: 2,
            tasks: [
              {
                id: "js-hoisting-study",
                title: "Study Hoisting Concepts",
                description:
                  "Read about hoisting and complete practice problems",
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
            ],
          },
          {
            day: 2,
            title: "React Core Concepts",
            description: "Focus on React hooks and state management",
            topics: ["React Core Concepts"],
            estimatedHours: 2,
            tasks: [
              {
                id: "react-hooks-practice",
                title: "Practice React Hooks",
                description: "Complete React hooks problems",
                type: "practice",
                estimatedTime: 60,
                resourceUrl: "/questions/react/hooks",
              },
              {
                id: "react-state-study",
                title: "Study State Management",
                description: "Learn about useState and useContext",
                type: "reading",
                estimatedTime: 60,
              },
            ],
          },
          {
            day: 3,
            title: "CSS & Styling",
            description: "Focus on layout and responsive design",
            topics: ["CSS & Styling"],
            estimatedHours: 2,
            tasks: [
              {
                id: "css-layout-practice",
                title: "Practice CSS Layout",
                description: "Complete CSS layout challenges",
                type: "practice",
                estimatedTime: 45,
                resourceUrl: "/questions/user-interface/layout",
              },
              {
                id: "responsive-design",
                title: "Responsive Design Practice",
                description: "Build responsive components",
                type: "project",
                estimatedTime: 75,
              },
            ],
          },
          {
            day: 4,
            title: "System Design Introduction",
            description: "Learn basic system design concepts",
            topics: ["System Design Basics"],
            estimatedHours: 2,
            tasks: [
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
          {
            day: 5,
            title: "Advanced JavaScript",
            description: "Focus on advanced JavaScript concepts",
            topics: ["JavaScript Fundamentals"],
            estimatedHours: 2,
            tasks: [
              {
                id: "js-advanced-practice",
                title: "Advanced JavaScript Problems",
                description: "Complete advanced JavaScript challenges",
                type: "practice",
                estimatedTime: 60,
              },
              {
                id: "js-algorithms",
                title: "JavaScript Algorithms",
                description: "Practice algorithm problems in JavaScript",
                type: "practice",
                estimatedTime: 60,
              },
            ],
          },
          {
            day: 6,
            title: "Practice & Review",
            description: "Review all concepts and practice problems",
            topics: [
              "JavaScript Fundamentals",
              "React Core Concepts",
              "CSS & Styling",
            ],
            estimatedHours: 2,
            tasks: [
              {
                id: "comprehensive-review",
                title: "Comprehensive Review",
                description: "Review all learned concepts",
                type: "review",
                estimatedTime: 60,
              },
              {
                id: "mock-practice",
                title: "Mock Interview Practice",
                description: "Practice with mock interview questions",
                type: "practice",
                estimatedTime: 60,
              },
            ],
          },
          {
            day: 7,
            title: "Mock Interview & Final Prep",
            description: "Final preparation and mock interview",
            topics: ["System Design Basics", "All Topics"],
            estimatedHours: 2,
            tasks: [
              {
                id: "mock-interview",
                title: "Mock Interview",
                description: "Complete a full mock interview",
                type: "practice",
                estimatedTime: 90,
              },
              {
                id: "final-review",
                title: "Final Review",
                description: "Quick review of key concepts",
                type: "review",
                estimatedTime: 30,
              },
            ],
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
    estimatedTimePerDay: 2,
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
    schedule: [
      {
        weekNumber: 1,
        title: "JavaScript Fundamentals & React Basics",
        description: "Build strong foundation in JavaScript and React",
        topics: ["JavaScript Comprehensive", "React Advanced"],
        totalHours: 6,
        dailySchedule: [
          {
            day: 1,
            title: "JavaScript ES6+ Features",
            description: "Learn modern JavaScript features",
            topics: ["JavaScript Comprehensive"],
            estimatedHours: 1.5,
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
                id: "es6-practice",
                title: "Practice ES6+ Problems",
                description: "Complete ES6+ coding challenges",
                type: "practice",
                estimatedTime: 45,
              },
            ],
          },
          {
            day: 2,
            title: "React Hooks Deep Dive",
            description: "Master React hooks and state management",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "hooks-practice",
                title: "Practice React Hooks",
                description: "Complete advanced hooks problems",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 3,
            title: "Async JavaScript",
            description: "Learn async programming patterns",
            topics: ["JavaScript Comprehensive"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "async-practice",
                title: "Async Programming Practice",
                description: "Practice promises, async/await, and callbacks",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 4,
            title: "React Performance",
            description: "Learn React performance optimization",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "performance-study",
                title: "Study React Performance",
                description: "Learn about React.memo, useMemo, and useCallback",
                type: "reading",
                estimatedTime: 45,
                resourceUrl: "/questions/react/performance",
              },
              {
                id: "performance-practice",
                title: "Performance Optimization Practice",
                description: "Practice optimizing React components",
                type: "practice",
                estimatedTime: 45,
              },
            ],
          },
        ],
      },
      {
        weekNumber: 2,
        title: "Advanced React & State Management",
        description: "Master advanced React concepts and state management",
        topics: ["React Advanced"],
        totalHours: 6,
        dailySchedule: [
          {
            day: 1,
            title: "Custom Hooks",
            description: "Build custom React hooks",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "custom-hooks",
                title: "Build Custom Hooks",
                description: "Create reusable custom hooks",
                type: "project",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 2,
            title: "State Management",
            description: "Learn advanced state management patterns",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "state-management",
                title: "State Management Practice",
                description: "Practice with Context API and state patterns",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 3,
            title: "React Forms",
            description: "Build complex form systems",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "form-validation",
                title: "Form Validation System",
                description: "Build a comprehensive form validation system",
                type: "project",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 4,
            title: "React Testing",
            description: "Learn React testing strategies",
            topics: ["React Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "react-testing",
                title: "React Testing Practice",
                description: "Practice testing React components",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
        ],
      },
      {
        weekNumber: 3,
        title: "CSS, Styling & System Design",
        description: "Master advanced CSS and system design concepts",
        topics: ["CSS Advanced", "System Design Intermediate"],
        totalHours: 6,
        dailySchedule: [
          {
            day: 1,
            title: "Advanced CSS",
            description: "Learn advanced CSS techniques",
            topics: ["CSS Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "css-animations-practice",
                title: "CSS Animations Practice",
                description: "Create complex CSS animations",
                type: "practice",
                estimatedTime: 90,
                resourceUrl: "/questions/css/animations",
              },
            ],
          },
          {
            day: 2,
            title: "CSS Architecture",
            description: "Learn CSS architecture patterns",
            topics: ["CSS Advanced"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "css-architecture",
                title: "CSS Architecture Study",
                description:
                  "Learn about BEM, CSS modules, and styled-components",
                type: "reading",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 3,
            title: "System Design Basics",
            description: "Introduction to system design",
            topics: ["System Design Intermediate"],
            estimatedHours: 1.5,
            tasks: [
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
          {
            day: 4,
            title: "Advanced System Design",
            description: "Complex system design problems",
            topics: ["System Design Intermediate"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "advanced-design",
                title: "Advanced System Design",
                description: "Practice complex system design problems",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
        ],
      },
      {
        weekNumber: 4,
        title: "Practice, Mock Interviews & Review",
        description: "Final preparation and mock interviews",
        topics: ["All Topics"],
        totalHours: 6,
        dailySchedule: [
          {
            day: 1,
            title: "Comprehensive Review",
            description: "Review all learned concepts",
            topics: ["All Topics"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "comprehensive-review",
                title: "Comprehensive Review",
                description: "Review all concepts and practice problems",
                type: "review",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 2,
            title: "Mock Interview 1",
            description: "First mock interview session",
            topics: ["All Topics"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "mock-interview-1",
                title: "Mock Interview Session 1",
                description: "Complete a full mock interview",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 3,
            title: "Practice Problems",
            description: "Focus on weak areas",
            topics: ["All Topics"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "weak-areas",
                title: "Weak Areas Practice",
                description: "Focus on identified weak areas",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
          {
            day: 4,
            title: "Mock Interview 2",
            description: "Final mock interview session",
            topics: ["All Topics"],
            estimatedHours: 1.5,
            tasks: [
              {
                id: "mock-interview-2",
                title: "Mock Interview Session 2",
                description: "Complete final mock interview",
                type: "practice",
                estimatedTime: 90,
              },
            ],
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
    estimatedTimePerDay: 1.5,
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
    schedule: [
      {
        weekNumber: 1,
        title: "Month 1: Core Fundamentals & React Mastery",
        description: "Build strong foundation and master React",
        topics: ["JavaScript Mastery", "React Expert Level"],
        totalHours: 12,
        dailySchedule: [
          {
            day: 1,
            title: "JavaScript Deep Dive",
            description: "Advanced JavaScript concepts",
            topics: ["JavaScript Mastery"],
            estimatedHours: 3,
            tasks: [
              {
                id: "js-advanced-study",
                title: "Study Advanced JavaScript",
                description: "Learn advanced JavaScript patterns and concepts",
                type: "reading",
                estimatedTime: 90,
                resourceUrl: "/questions/javascript/advanced-patterns",
              },
              {
                id: "js-advanced-practice",
                title: "Advanced JavaScript Practice",
                description: "Practice advanced JavaScript problems",
                type: "practice",
                estimatedTime: 90,
              },
            ],
          },
        ],
      },
      {
        weekNumber: 2,
        title: "Month 2: Advanced Concepts & System Design",
        description: "Master advanced concepts and system design",
        topics: ["System Design Expert", "Performance Optimization"],
        totalHours: 12,
        dailySchedule: [
          {
            day: 1,
            title: "System Design Deep Dive",
            description: "Complex system design problems",
            topics: ["System Design Expert"],
            estimatedHours: 3,
            tasks: [
              {
                id: "complex-design",
                title: "Complex System Design",
                description: "Practice complex system design problems",
                type: "practice",
                estimatedTime: 180,
                resourceUrl: "/questions/system-design/complex",
              },
            ],
          },
        ],
      },
      {
        weekNumber: 3,
        title: "Month 3: Expert Preparation & Mock Interviews",
        description: "Expert-level preparation and mock interviews",
        topics: ["All Topics"],
        totalHours: 12,
        dailySchedule: [
          {
            day: 1,
            title: "Expert Mock Interviews",
            description: "Expert-level mock interviews",
            topics: ["All Topics"],
            estimatedHours: 3,
            tasks: [
              {
                id: "expert-mock",
                title: "Expert Mock Interview",
                description: "Complete expert-level mock interview",
                type: "practice",
                estimatedTime: 180,
              },
            ],
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
    estimatedTimePerDay: 0.75,
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
