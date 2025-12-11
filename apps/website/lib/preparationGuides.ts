export interface PreparationGuideSection {
  title: string;
  description: string;
  readingTime: number;
  topics: string[];
}

export interface PreparationGuide {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all-levels";
  estimatedTime: number;
  color: string;
  icon: string;
  sections: PreparationGuideSection[];
  features: string[];
  targetSkills: string[];
  featured?: boolean;
}

export const preparationGuides: PreparationGuide[] = [
  {
    id: "complete-frontend-interview-guide",
    title: "Complete Frontend Interview Mastery",
    description:
      "A comprehensive guide covering all aspects of frontend interviews - from fundamentals to advanced concepts, system design, and behavioral questions.",
    difficulty: "all-levels",
    estimatedTime: 60,
    color: "from-blue-600 to-purple-600",
    icon: "🎯",
    sections: [
      {
        title: "Interview Fundamentals",
        description:
          "Understanding the interview process and preparation strategies",
        readingTime: 15,
        topics: [
          "Interview types and formats",
          "Preparation timeline",
          "Company research",
          "Portfolio preparation",
          "Mock interview strategies",
        ],
      },
      {
        title: "Core Technologies Deep Dive",
        description: "Master HTML, CSS, and JavaScript fundamentals",
        readingTime: 25,
        topics: [
          "HTML5 semantic elements",
          "CSS Grid and Flexbox",
          "JavaScript ES6+ features",
          "DOM manipulation",
          "Event handling",
          "Async programming",
        ],
      },
      {
        title: "Modern Frontend Frameworks",
        description: "React, Vue, and Angular concepts and best practices",
        readingTime: 20,
        topics: [
          "React hooks and lifecycle",
          "State management",
          "Component patterns",
          "Performance optimization",
          "Testing strategies",
        ],
      },
      {
        title: "System Design for Frontend",
        description:
          "Design scalable frontend architectures and user interfaces",
        readingTime: 30,
        topics: [
          "Component architecture",
          "State management patterns",
          "Performance optimization",
          "Accessibility",
          "Mobile-first design",
        ],
      },
      {
        title: "Coding Challenges",
        description: "Practice with real-world coding problems and algorithms",
        readingTime: 25,
        topics: [
          "DOM manipulation challenges",
          "CSS layout problems",
          "JavaScript algorithms",
          "React component building",
          "Debugging techniques",
        ],
      },
      {
        title: "Behavioral & Leadership",
        description:
          "Master behavioral questions and demonstrate leadership skills",
        readingTime: 15,
        topics: [
          "STAR method",
          "Project leadership",
          "Team collaboration",
          "Conflict resolution",
          "Technical decision making",
        ],
      },
    ],
    features: [
      "500+ practice questions",
      "Real interview scenarios",
      "Step-by-step solutions",
      "Performance optimization tips",
      "System design patterns",
      "Behavioral question strategies",
      "Mock interview templates",
      "Company-specific insights",
    ],
    targetSkills: [
      "Interview Skills",
      "Technical Knowledge",
      "System Design",
      "Problem Solving",
      "Communication",
      "Leadership",
    ],
  },
  {
    id: "javascript-mastery-guide",
    title: "JavaScript Deep Dive & Advanced Concepts",
    description:
      "Master JavaScript from fundamentals to advanced patterns, including modern ES6+ features, async programming, and performance optimization.",
    difficulty: "intermediate",
    estimatedTime: 45,
    color: "from-yellow-500 to-orange-500",
    icon: "⚡",
    sections: [
      {
        title: "JavaScript Fundamentals",
        description: "Core concepts and language features",
        readingTime: 20,
        topics: [
          "Variables and scope",
          "Functions and closures",
          "Objects and prototypes",
          "Arrays and methods",
          "Error handling",
        ],
      },
      {
        title: "ES6+ Modern Features",
        description: "Latest JavaScript features and best practices",
        readingTime: 25,
        topics: [
          "Arrow functions",
          "Destructuring",
          "Template literals",
          "Modules",
          "Classes",
          "Symbols and iterators",
        ],
      },
      {
        title: "Asynchronous JavaScript",
        description: "Master async programming patterns",
        readingTime: 30,
        topics: [
          "Callbacks and promises",
          "Async/await",
          "Event loop",
          "Web APIs",
          "Error handling in async code",
        ],
      },
      {
        title: "Advanced Patterns",
        description: "Design patterns and advanced concepts",
        readingTime: 25,
        topics: [
          "Functional programming",
          "Object-oriented patterns",
          "Module patterns",
          "Memory management",
          "Performance optimization",
        ],
      },
      {
        title: "DOM Manipulation",
        description: "Advanced DOM techniques and optimization",
        readingTime: 20,
        topics: [
          "DOM traversal",
          "Event delegation",
          "Virtual DOM",
          "Performance optimization",
          "Accessibility",
        ],
      },
      {
        title: "Testing & Debugging",
        description: "Testing strategies and debugging techniques",
        readingTime: 15,
        topics: [
          "Unit testing",
          "Integration testing",
          "Debugging tools",
          "Performance profiling",
          "Error tracking",
        ],
      },
    ],
    features: [
      "300+ JavaScript questions",
      "Real-world code examples",
      "Performance optimization tips",
      "Modern ES6+ patterns",
      "Async programming mastery",
      "Testing strategies",
      "Debugging techniques",
      "Best practices guide",
    ],
    targetSkills: [
      "JavaScript",
      "ES6+",
      "Async Programming",
      "Performance",
      "Testing",
      "Debugging",
    ],
  },
  {
    id: "react-ecosystem-guide",
    title: "React Ecosystem & Advanced Patterns",
    description:
      "Comprehensive React guide covering hooks, state management, performance optimization, testing, and modern React patterns.",
    difficulty: "intermediate",
    estimatedTime: 50,
    color: "from-cyan-500 to-blue-500",
    icon: "⚛️",
    sections: [
      {
        title: "React Fundamentals",
        description: "Core React concepts and component patterns",
        readingTime: 20,
        topics: [
          "Components and props",
          "State and lifecycle",
          "Event handling",
          "Conditional rendering",
          "Lists and keys",
        ],
      },
      {
        title: "Hooks Deep Dive",
        description: "Master React hooks and custom hooks",
        readingTime: 25,
        topics: [
          "useState and useEffect",
          "useContext and useReducer",
          "Custom hooks",
          "Hook rules",
          "Performance optimization",
        ],
      },
      {
        title: "State Management",
        description: "Advanced state management patterns",
        readingTime: 30,
        topics: [
          "Redux and Redux Toolkit",
          "Context API",
          "Zustand",
          "React Query",
          "State architecture patterns",
        ],
      },
      {
        title: "Performance Optimization",
        description: "Optimize React applications for speed",
        readingTime: 25,
        topics: [
          "React.memo and useMemo",
          "useCallback optimization",
          "Code splitting",
          "Lazy loading",
          "Bundle optimization",
        ],
      },
      {
        title: "Testing React Apps",
        description: "Comprehensive testing strategies",
        readingTime: 20,
        topics: [
          "Jest and React Testing Library",
          "Component testing",
          "Integration testing",
          "E2E testing",
          "Testing best practices",
        ],
      },
      {
        title: "Advanced Patterns",
        description: "Modern React patterns and architecture",
        readingTime: 20,
        topics: [
          "Compound components",
          "Render props",
          "Higher-order components",
          "Error boundaries",
          "Suspense and concurrent features",
        ],
      },
    ],
    features: [
      "250+ React questions",
      "Hook patterns and examples",
      "State management solutions",
      "Performance optimization",
      "Testing strategies",
      "Modern React patterns",
      "Real-world examples",
      "Best practices guide",
    ],
    targetSkills: [
      "React",
      "Hooks",
      "State Management",
      "Performance",
      "Testing",
      "Modern Patterns",
    ],
  },
  {
    id: "frontend-system-design",
    title: "Frontend System Design & Architecture",
    description:
      "Master frontend system design, component architecture, performance optimization, and scalable application patterns.",
    difficulty: "advanced",
    estimatedTime: 40,
    color: "from-green-500 to-teal-500",
    icon: "🏗️",
    sections: [
      {
        title: "System Design Fundamentals",
        description: "Core principles of frontend system design",
        readingTime: 20,
        topics: [
          "Scalability principles",
          "Performance metrics",
          "User experience design",
          "Accessibility standards",
          "Cross-browser compatibility",
        ],
      },
      {
        title: "Component Architecture",
        description: "Design scalable component systems",
        readingTime: 25,
        topics: [
          "Component hierarchy",
          "Props and state design",
          "Composition patterns",
          "Reusability principles",
          "Component libraries",
        ],
      },
      {
        title: "State Management Architecture",
        description: "Design robust state management systems",
        readingTime: 30,
        topics: [
          "Global state patterns",
          "Local state strategies",
          "Data flow design",
          "Caching strategies",
          "State persistence",
        ],
      },
      {
        title: "Performance Optimization",
        description: "Optimize for speed and user experience",
        readingTime: 25,
        topics: [
          "Bundle optimization",
          "Code splitting",
          "Lazy loading",
          "Caching strategies",
          "CDN implementation",
          "Performance monitoring",
        ],
      },
      {
        title: "Security & Best Practices",
        description: "Implement security and follow best practices",
        readingTime: 20,
        topics: [
          "XSS prevention",
          "CSRF protection",
          "Input validation",
          "Secure coding practices",
          "Privacy compliance",
        ],
      },
      {
        title: "Deployment & DevOps",
        description: "Deploy and maintain frontend applications",
        readingTime: 15,
        topics: [
          "CI/CD pipelines",
          "Environment management",
          "Monitoring and logging",
          "Error tracking",
          "Performance monitoring",
        ],
      },
    ],
    features: [
      "100+ system design questions",
      "Architecture patterns",
      "Performance optimization",
      "Security best practices",
      "Deployment strategies",
      "Real-world case studies",
      "Scalability solutions",
      "Best practices guide",
    ],
    targetSkills: [
      "System Design",
      "Architecture",
      "Performance",
      "Security",
      "DevOps",
      "Scalability",
    ],
  },
  {
    id: "css-mastery-guide",
    title: "CSS Mastery & Modern Layouts",
    description:
      "Master CSS from fundamentals to advanced techniques, including Grid, Flexbox, animations, and responsive design.",
    difficulty: "intermediate",
    estimatedTime: 35,
    color: "from-pink-500 to-purple-500",
    icon: "🎨",
    sections: [
      {
        title: "CSS Fundamentals",
        description: "Core CSS concepts and selectors",
        readingTime: 15,
        topics: [
          "Selectors and specificity",
          "Box model",
          "Positioning",
          "Display properties",
          "CSS units",
        ],
      },
      {
        title: "Modern Layout Systems",
        description: "Master Flexbox and CSS Grid",
        readingTime: 25,
        topics: [
          "Flexbox fundamentals",
          "CSS Grid basics",
          "Layout patterns",
          "Responsive grids",
          "Complex layouts",
        ],
      },
      {
        title: "Responsive Design",
        description: "Create responsive and mobile-first designs",
        readingTime: 20,
        topics: [
          "Media queries",
          "Mobile-first approach",
          "Responsive images",
          "Viewport units",
          "Breakpoint strategies",
        ],
      },
      {
        title: "CSS Animations & Transitions",
        description: "Create smooth animations and interactions",
        readingTime: 20,
        topics: [
          "Transitions",
          "Keyframe animations",
          "Transform properties",
          "Animation performance",
          "CSS variables",
        ],
      },
      {
        title: "CSS Architecture",
        description: "Organize and maintain CSS code",
        readingTime: 15,
        topics: [
          "CSS methodologies",
          "Component-based CSS",
          "CSS-in-JS",
          "Preprocessors",
          "CSS organization",
        ],
      },
      {
        title: "Advanced Techniques",
        description: "Advanced CSS techniques and optimization",
        readingTime: 15,
        topics: [
          "CSS custom properties",
          "CSS Grid advanced",
          "Performance optimization",
          "Browser compatibility",
          "CSS debugging",
        ],
      },
    ],
    features: [
      "200+ CSS questions",
      "Layout challenges",
      "Animation examples",
      "Responsive design",
      "Performance tips",
      "Modern techniques",
      "Best practices",
      "Real-world examples",
    ],
    targetSkills: [
      "CSS",
      "Layout Systems",
      "Responsive Design",
      "Animations",
      "Performance",
      "Architecture",
    ],
  },
  {
    id: "behavioral-leadership-guide",
    title: "Behavioral & Leadership Interview Prep",
    description:
      "Master behavioral questions, demonstrate leadership skills, and showcase your ability to work in teams and lead projects.",
    difficulty: "all-levels",
    estimatedTime: 25,
    color: "from-indigo-500 to-purple-500",
    icon: "👥",
    sections: [
      {
        title: "Behavioral Question Framework",
        description: "Master the STAR method and behavioral responses",
        readingTime: 15,
        topics: [
          "STAR method",
          "Common behavioral questions",
          "Response structure",
          "Story preparation",
          "Follow-up questions",
        ],
      },
      {
        title: "Leadership & Teamwork",
        description: "Demonstrate leadership and collaboration skills",
        readingTime: 20,
        topics: [
          "Team leadership",
          "Conflict resolution",
          "Project management",
          "Mentoring others",
          "Cross-functional collaboration",
        ],
      },
      {
        title: "Technical Leadership",
        description: "Showcase technical decision-making abilities",
        readingTime: 20,
        topics: [
          "Technical decisions",
          "Architecture choices",
          "Code review leadership",
          "Technical mentoring",
          "Innovation and improvement",
        ],
      },
      {
        title: "Communication Skills",
        description: "Improve communication and presentation skills",
        readingTime: 15,
        topics: [
          "Technical communication",
          "Presentation skills",
          "Documentation",
          "Stakeholder communication",
          "Remote collaboration",
        ],
      },
      {
        title: "Problem Solving & Innovation",
        description: "Demonstrate problem-solving and innovation abilities",
        readingTime: 15,
        topics: [
          "Problem-solving approach",
          "Innovation examples",
          "Process improvement",
          "Creative solutions",
          "Learning from failure",
        ],
      },
      {
        title: "Company & Culture Fit",
        description: "Show alignment with company values and culture",
        readingTime: 10,
        topics: [
          "Company research",
          "Culture alignment",
          "Values demonstration",
          "Growth mindset",
          "Long-term vision",
        ],
      },
    ],
    features: [
      "100+ behavioral questions",
      "STAR method guide",
      "Leadership examples",
      "Communication tips",
      "Company research",
      "Mock interview scenarios",
      "Response templates",
      "Success strategies",
    ],
    targetSkills: [
      "Communication",
      "Leadership",
      "Teamwork",
      "Problem Solving",
      "Innovation",
      "Culture Fit",
    ],
  },
];

export function getPreparationGuideById(
  id: string,
): PreparationGuide | undefined {
  return preparationGuides.find((guide) => guide.id === id);
}

export function getPreparationGuidesByDifficulty(
  difficulty: string,
): PreparationGuide[] {
  return preparationGuides.filter((guide) => guide.difficulty === difficulty);
}

export function getFeaturedPreparationGuides(): PreparationGuide[] {
  return preparationGuides.filter((guide) => guide.featured);
}
