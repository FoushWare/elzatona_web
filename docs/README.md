# Elzatona Web - Database Schema Documentation

This document contains the complete database schemas for all entities in the Elzatona Web learning platform.

## Table of Contents

- [Questions](#questions)
- [Categories](#categories)
- [Topics](#topics)
- [Learning Cards](#learning-cards)
- [Learning Plans](#learning-plans)
- [Frontend Tasks](#frontend-tasks)
- [Problem Solving Tasks](#problem-solving-tasks)
- [User Analytics](#user-analytics)
- [Admin Stats](#admin-stats)
- [Validation Rules](#validation-rules)

---

## Questions

### UnifiedQuestion Interface

```typescript
interface UnifiedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  category?: string; // Made optional
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningPath?: string; // Already optional
  sectionId?: string; // Already optional
  topic?: string; // Added topic field
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  tags?: string[];
  explanation?: string;
  hints?: string[];
  timeLimit?: number; // in seconds
  points?: number;
  metadata?: {
    source?: string;
    version?: string;
    references?: string[];
    [key: string]: unknown;
  };
  // For multiple choice questions
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  // For code questions
  codeTemplate?: string;
  testCases?: {
    input: string;
    expectedOutput: string;
    description?: string;
  }[];
  // For open-ended questions
  sampleAnswers?: string[];
  // Statistics
  stats?: {
    totalAttempts: number;
    correctAttempts: number;
    averageTime: number;
    difficultyRating: number;
  };
}
```

### Question Types

```typescript
type QuestionType = 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';
```

### Question Validation Rules

```typescript
const QUESTION_VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 200,
    required: true,
  },
  content: {
    minLength: 20,
    maxLength: 2000,
    required: true,
  },
  options: {
    minCount: 2,
    maxCount: 6,
    requiredFor: ['multiple-choice'],
  },
  timeLimit: {
    min: 30, // 30 seconds
    max: 1800, // 30 minutes
    default: 300, // 5 minutes
  },
  points: {
    min: 1,
    max: 100,
    default: 10,
  },
};
```

---

## Categories

### Category Interface

```typescript
interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### LearningCardCategory Interface

```typescript
interface LearningCardCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}
```

---

## Topics

### Topic Interface

```typescript
interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### LearningCardTopic Interface

```typescript
interface LearningCardTopic {
  id: string;
  name: string;
  description: string;
  order: number;
  questionIds: string[];
}
```

---

## Learning Cards

### LearningCard Interface

```typescript
interface LearningCard {
  id: string;
  title: string;
  type:
    | 'core-technologies'
    | 'framework-questions'
    | 'problem-solving'
    | 'system-design';
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    questionCount: number;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    categories: LearningCardCategory[];
  };
}
```

### Card Types

```typescript
const CARD_TYPES = {
  'core-technologies': {
    title: 'Core Technologies',
    description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
    color: '#3B82F6',
    icon: 'Code',
  },
  'framework-questions': {
    title: 'Framework Questions',
    description: 'React, Next.js, Vue, Angular, Svelte',
    color: '#10B981',
    icon: 'Layers',
  },
  'problem-solving': {
    title: 'Problem Solving',
    description: 'Frontend coding challenges and algorithms',
    color: '#F59E0B',
    icon: 'Brain',
  },
  'system-design': {
    title: 'System Design',
    description: 'Frontend architecture patterns',
    color: '#EF4444',
    icon: 'Network',
  },
} as const;
```

---

## Learning Plans

### LearningPlan Interface

```typescript
interface LearningPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in days
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: {
    id: string;
    name: string;
    questions: number;
    weight: number; // percentage of total
  }[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  completionRate?: number;
  enrolledUsers?: number;
}
```

### LearningPlanTemplate Interface

```typescript
interface LearningPlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalQuestions: number;
  dailyQuestions: number;
  sections: LearningSection[];
  features: string[];
  estimatedTime: string;
  isRecommended: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  completionRate?: number;
  enrolledUsers?: number;
}
```

### LearningSection Interface

```typescript
interface LearningSection {
  id: string;
  name: string;
  questions: number;
  weight: number;
  estimatedTime: number;
}
```

---

## Frontend Tasks

### FrontendTask Interface

```typescript
interface FrontendTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'React', 'JavaScript', 'CSS'
  estimatedTime: number; // minutes
  author: string;
  company?: string;
  requirements: string;
  hints: string[];
  solution: string;
  starterCode: string; // Legacy field for backward compatibility
  files: FrontendTaskFile[]; // New dynamic files structure
  testCases?: FrontendTaskTestCase[]; // Added test cases
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### FrontendTaskFile Interface

```typescript
interface FrontendTaskFile {
  id: string;
  name: string;
  type: 'tsx' | 'ts' | 'css' | 'html' | 'json' | 'js';
  content: string;
  isEntryPoint?: boolean; // For main component files
}
```

### FrontendTaskTestCase Interface

```typescript
interface FrontendTaskTestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  type: 'function' | 'component' | 'css' | 'html';
  timeout?: number;
}
```

---

## Problem Solving Tasks

### ProblemSolvingTask Interface

```typescript
interface ProblemSolvingTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'Arrays', 'Strings', 'Dynamic Programming'
  functionName: string; // e.g., 'twoSum'
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
```

### TestCase Interface

```typescript
interface TestCase {
  id: string;
  input: unknown[];
  expected: unknown;
  isHidden?: boolean; // for submission vs test run
}
```

### TestResult Interface

```typescript
interface TestResult {
  id: string;
  passed: boolean;
  actual: unknown;
  expected: unknown;
  error?: string;
  elapsedMs?: number;
}
```

---

## User Analytics

### UserProgress Interface

```typescript
interface UserProgress {
  id: string;
  userId: string;
  userEmail: string;
  contentType:
    | 'cards'
    | 'plans'
    | 'categories'
    | 'topics'
    | 'questions'
    | 'frontend-tasks'
    | 'problem-solving';
  contentId: string;
  contentName: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  progress: number; // 0-100
  timeSpent: number; // in minutes
  attempts: number;
  lastAccessed: Timestamp;
  completedAt?: Timestamp;
  score?: number; // for questions/tasks
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  metadata: {
    learningPath?: string;
    sessionId?: string;
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    notes?: string;
  };
}
```

### LearningSession Interface

```typescript
interface LearningSession {
  id: string;
  userId: string;
  userEmail: string;
  sessionType: 'guided' | 'freestyle' | 'interview' | 'practice';
  startTime: Timestamp;
  endTime?: Timestamp;
  duration?: number; // in minutes
  learningPath?: string;
  contentCompleted: string[];
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
  metadata: {
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    browser?: string;
    notes?: string;
  };
}
```

### UserAnalytics Interface

```typescript
interface UserAnalytics {
  id: string;
  userId: string;
  userEmail: string;
  overallProgress: number; // 0-100
  totalTimeSpent: number; // in hours
  totalQuestionsAnswered: number;
  averageScore: number;
  learningPathsCompleted: number;
  currentStreak: number; // days
  longestStreak: number; // days
  lastActiveDate: Timestamp;
  strengths: string[];
  improvementAreas: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
  generatedAt: Timestamp;
  expiresAt: Timestamp;
}
```

### LearningInsights Interface

```typescript
interface LearningInsights {
  userId: string;
  strengths: string[];
  improvementAreas: string[];
  recommendedLearningPaths: string[];
  studySchedule: {
    optimalStudyTime: string;
    recommendedSessionLength: number; // minutes
    frequency: 'daily' | 'weekly' | 'custom';
  };
  performanceTrends: {
    period: 'week' | 'month' | 'quarter';
    trend: 'improving' | 'stable' | 'declining';
    scoreChange: number;
  };
  generatedAt: Timestamp;
}
```

### SystemAnalytics Interface

```typescript
interface SystemAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  totalTimeSpent: number; // in hours
  averageSessionLength: number; // in minutes
  completionRates: {
    questions: number;
    learningPaths: number;
    frontendTasks: number;
    problemSolving: number;
  };
  popularContent: Array<{
    id: string;
    name: string;
    type: string;
    usageCount: number;
  }>;
  userEngagement: {
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    retentionRate: number;
  };
  learningPathAnalytics: Array<{
    pathId: string;
    pathName: string;
    enrolledUsers: number;
    completionRate: number;
    averageRating: number;
  }>;
  generatedAt: Timestamp;
}
```

---

## Admin Stats

### AdminStats Interface

```typescript
interface AdminStats {
  questions: number;
  categories: number;
  topics: number;
  learningCards: number;
  learningPlans: number;
  frontendTasks: number;
  problemSolvingTasks: number;
  totalContent: number;
  recentActivity: Array<{
    id: string;
    action: string;
    timestamp: any;
    user: string;
    details: string;
  }>;
  systemHealth: {
    databaseConnected: boolean;
    lastUpdated: string;
    apiResponseTime: number;
  };
}
```

---

## API Response Types

### ApiResponse Interface

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### PaginatedResponse Interface

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

---

## Validation Rules

### Question Validation Rules

```typescript
const QUESTION_VALIDATION_RULES = {
  title: {
    minLength: 10,
    maxLength: 200,
    required: true,
  },
  content: {
    minLength: 20,
    maxLength: 2000,
    required: true,
  },
  options: {
    minCount: 2,
    maxCount: 6,
    requiredFor: ['multiple-choice'],
  },
  timeLimit: {
    min: 30, // 30 seconds
    max: 1800, // 30 minutes
    default: 300, // 5 minutes
  },
  points: {
    min: 1,
    max: 100,
    default: 10,
  },
};
```

### Default Metadata

```typescript
const DEFAULT_QUESTION_METADATA = {
  source: 'manual',
  version: '1.0.0',
  references: [],
};
```

---

## Database Collections

The following collections are used in Firebase Firestore:

- `unifiedQuestions` - All learning questions
- `categories` - Question categories
- `topics` - Question topics
- `learningCards` - Learning card definitions
- `learningPlans` - Learning plan templates
- `frontendTasks` - Frontend coding challenges
- `problemSolvingTasks` - Algorithmic challenges
- `userProgress` - User learning progress tracking
- `learningSessions` - User learning sessions
- `userAnalytics` - User analytics and insights
- `systemAnalytics` - System-wide analytics
- `adminStats` - Admin dashboard statistics

---

## Usage Examples

### Creating a Question

```typescript
const question: Omit<UnifiedQuestion, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'What is React?',
  content: 'Explain what React is and its main features.',
  type: 'open-ended',
  category: 'React',
  difficulty: 'beginner',
  isActive: true,
  explanation: 'React is a JavaScript library for building user interfaces.',
  tags: ['react', 'javascript', 'frontend'],
  points: 10,
  timeLimit: 300,
};
```

### Creating a Frontend Task

```typescript
const frontendTask: Omit<FrontendTask, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Build a Todo App',
  description: 'Create a simple todo application using React',
  difficulty: 'medium',
  category: 'React',
  estimatedTime: 120,
  author: 'Admin',
  requirements: 'Use React hooks and local state',
  hints: [
    'Use useState for state management',
    'Create components for TodoItem',
  ],
  solution: '// Solution code here',
  starterCode: '// Starter code here',
  files: [
    {
      id: '1',
      name: 'App.tsx',
      type: 'tsx',
      content: '// App component code',
      isEntryPoint: true,
    },
  ],
  tags: ['react', 'hooks', 'state'],
  isActive: true,
};
```

---

## Notes

- All timestamps are stored as Firestore Timestamps
- All IDs are auto-generated by Firestore unless specified
- The `isActive` field is used for soft deletion
- Validation rules are enforced both client-side and server-side
- All schemas support metadata fields for extensibility
- User analytics are generated periodically and cached for performance

---

_Last updated: December 2024_
_Version: 1.0.0_
