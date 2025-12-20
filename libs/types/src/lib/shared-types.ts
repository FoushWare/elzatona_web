// Export all types from the shared types library
export * from "./learning-cards";
export * from "./unified-question-schema";
export * from "./admin";
// Export challenge types but exclude TestCase to avoid conflict with admin.ts
export type { Difficulty, Category } from "./challenge";
export type {
  Challenge,
  ChallengeFilters,
  ChallengeListResponse,
} from "./challenge";
// Export resource types but exclude LearningPath to avoid conflict with unified-question-schema
export type { ResourceCategory, ResourceType } from "./resource";
export type { LearningResource, ResourceCategoryInfo } from "./resource";
export type { 
  LearningItem, 
  LearningGoal, 
  ProgressStats,
  LearningProgress, 
  LearningRecommendation, 
  LearningCategory as ProgressCategory,
  PriorityLevel 
} from "./progress";
