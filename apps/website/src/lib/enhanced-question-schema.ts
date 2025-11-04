// v1.0 - Enhanced Question Schema
// Schema for enhanced question structure with sections and topics

export interface Section {
  id: string;
  name: string;
  description: string;
  order: number;
  is_active: boolean;
  questionLimit: number;
  learningPath?: string;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  sectionId: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnhancedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'multiple-choice' | 'open-ended' | 'true-false' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sectionId: string;
  topicId?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
