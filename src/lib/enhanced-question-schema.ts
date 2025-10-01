// v1.0 - Enhanced Question Schema
// Schema for enhanced question structure with sections and topics

export interface Section {
  id: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  questionLimit: number;
  learningPath?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  sectionId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EnhancedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sectionId: string;
  topicId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswers?: string[];
  explanation?: string;
  tags?: string[];
  points?: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
  questions: EnhancedQuestion[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
