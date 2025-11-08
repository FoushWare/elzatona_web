// Type definitions for Firestore types
// These types are used by shared-hooks but the implementation is app-specific

export interface LearningPlanProgress {
  plan_id: string;
  user_id: string;
  progress: number;
  completed_sections: string[];
  last_accessed: string;
  created_at: string;
  updated_at: string;
}
