export interface LearningCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LearningPlan {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  is_public: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  learning_card_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  estimated_questions: number;
  order_index: number;
  category_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  type: string;
  difficulty: string;
  category_id: string;
  topic_id: string;
  learning_card_id: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  hints: string[];
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Stats {
  totalCards: number;
  totalPlans: number;
  totalCategories: number;
  totalTopics: number;
  totalQuestions: number;
}
