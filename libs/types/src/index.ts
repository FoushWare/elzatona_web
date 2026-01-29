export * from "./lib/shared-types";
export * from "./lib/studyPlans";
export * from "./lib/unified-question-schema";
export * from "./lib/constants/homePage.constants";
export * from "./lib/types/homePage.types";
export * from "./lib/firestore";
export type { LearningPath } from "./lib/resource";

// Admin Content Management Types
export type {
  LearningPlan,
  Topic,
  AddItemContext,
  ContentManagementStats,
  Question as AdminQuestion,
} from "./lib/admin/content-management";
export type {
  Category as AdminCategory,
  LearningCard as AdminLearningCard,
} from "./lib/admin/content-management";
export * from "./lib/admin/questions";

// Frontend tasks types
export * from "./lib/frontend-tasks";
