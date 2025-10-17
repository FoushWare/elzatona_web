export interface LearningCard {
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

export interface LearningCardCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  topics: LearningCardTopic[];
}

export interface LearningCardTopic {
  id: string;
  name: string;
  description: string;
  order: number;
  questionIds: string[];
}

export interface LearningPlanCard {
  id: string;
  planId: string;
  cardId: string;
  card: LearningCard;
  questionCount: number;
  timeLimit: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardProgress {
  id: string;
  userId: string;
  planId: string;
  cardId: string;
  completedQuestions: string[];
  totalQuestions: number;
  score: number;
  timeSpent: number; // in minutes
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningCardFormData {
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
  metadata: {
    questionCount: number;
    estimatedTime: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
    categories: Omit<LearningCardCategory, 'id'>[];
  };
}

// Predefined card types with their configurations
export const CARD_TYPES = {
  'core-technologies': {
    title: 'Core Technologies',
    color: '#3B82F6', // Blue
    icon: '💻',
    description: 'HTML, CSS, JavaScript, TypeScript fundamentals',
    defaultTopics: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'DOM', 'ES6+'],
  },
  'framework-questions': {
    title: 'Framework Questions',
    color: '#10B981', // Green
    icon: '⚛️',
    description: 'React, Next.js, Vue, Angular, Svelte',
    defaultTopics: [
      'React',
      'Next.js',
      'Vue',
      'Angular',
      'Svelte',
      'State Management',
    ],
  },
  'problem-solving': {
    title: 'Problem Solving',
    color: '#8B5CF6', // Purple
    icon: '🧩',
    description: 'Frontend coding challenges and algorithms',
    defaultTopics: [
      'Algorithms',
      'Data Structures',
      'Problem Solving',
      'Coding Challenges',
    ],
  },
  'system-design': {
    title: 'System Design',
    color: '#F59E0B', // Orange
    icon: '🏗️',
    description: 'Frontend architecture patterns',
    defaultTopics: [
      'Architecture',
      'Scalability',
      'Performance',
      'Design Patterns',
    ],
  },
} as const;

export type CardType = keyof typeof CARD_TYPES;
