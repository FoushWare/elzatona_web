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
// export * from './auth'; // Auth types moved to shared-contexts
// export * from './common'; // File does not exist
// export * from './frontend-tasks'; // File does not exist
// export * from './learning-paths'; // File does not exist
// export * from './problem-solving'; // File does not exist
export * from "./progress";
// export * from './user'; // File does not exist

// Backward compatibility aliases for admin types (renamed to avoid conflicts)
export type {
  AdminFrontendTask as FrontendTaskAdmin,
  AdminFrontendTaskFile as FrontendTaskFileAdmin,
  AdminFrontendTaskFormData as FrontendTaskFormDataAdmin,
} from "./admin";
