// Learning Cards Schema for Admin Panel
// v1.0 - Card-based structure for guided learning plans

export interface LearningCard {
  id: string;
  title: string;
  description: string;
  type: 'core-technologies' | 'framework-questions' | 'problem-solving' | 'system-design';
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  
  // Card-specific configuration
  config: {
    questionCount: number;
    timeLimit?: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    prerequisites?: string[]; // Other card IDs that should be completed first
  };
  
  // Content references
  content: {
    questionIds: string[]; // References to questions in the questions collection
    learningPathIds: string[]; // References to learning paths
    resources: {
      title: string;
      url: string;
      type: 'article' | 'video' | 'documentation' | 'tutorial';
    }[];
  };
  
  // Statistics
  stats?: {
    totalQuestions: number;
    averageTime: number;
    completionRate: number;
    difficultyRating: number;
  };
}

export interface LearningPlanCard {
  id: string;
  planId: string;
  cardId: string;
  order: number;
  isRequired: boolean;
  dayNumber: number; // Which day this card appears in the plan
  timeAllocation: number; // Minutes allocated for this card
  createdAt: string;
  updatedAt: string;
}

export interface CardProgress {
  id: string;
  userId: string;
  cardId: string;
  planId: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  progress: number; // 0-100
  timeSpent: number; // in minutes
  questionsCompleted: number;
  totalQuestions: number;
  lastAccessedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Card type definitions
export const CARD_TYPES = {
  CORE_TECHNOLOGIES: 'core-technologies',
  FRAMEWORK_QUESTIONS: 'framework-questions', 
  PROBLEM_SOLVING: 'problem-solving',
  SYSTEM_DESIGN: 'system-design'
} as const;

export const CARD_TYPE_CONFIG = {
  [CARD_TYPES.CORE_TECHNOLOGIES]: {
    title: 'Core Technologies',
    description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
    icon: 'code',
    color: 'blue',
    topics: ['html', 'css', 'javascript', 'typescript']
  },
  [CARD_TYPES.FRAMEWORK_QUESTIONS]: {
    title: 'Framework Questions',
    description: 'React.js, Next.js, Vue.js, Angular and more',
    icon: 'layers',
    color: 'green',
    topics: ['react', 'nextjs', 'vue', 'angular', 'svelte']
  },
  [CARD_TYPES.PROBLEM_SOLVING]: {
    title: 'Problem Solving',
    description: 'Frontend-specific coding challenges',
    icon: 'puzzle',
    color: 'purple',
    topics: ['algorithms', 'data-structures', 'frontend-challenges']
  },
  [CARD_TYPES.SYSTEM_DESIGN]: {
    title: 'System Design',
    description: 'Frontend system design patterns and architecture',
    icon: 'network',
    color: 'orange',
    topics: ['architecture', 'scalability', 'performance', 'design-patterns']
  }
} as const;

export type CardType = keyof typeof CARD_TYPE_CONFIG;
