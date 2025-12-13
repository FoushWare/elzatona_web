// Type definitions for resources
// These types are used by shared-hooks but the service is app-specific

export interface LearningPath {
  id: string;
  title: string;
  description: string;
}

export const learningPaths: LearningPath[] = [];
