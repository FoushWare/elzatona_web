export * from "./lib/shared-types";

// Admin types
// Export admin content management types explicitly to avoid Category conflict
export type {
  LearningPlan,
  Topic,
  AddItemContext,
  ContentManagementStats,
  ContentManagementData,
  ContentManagementModalStates,
  ContentManagementFormHandlers,
  ContentManagementMutationStates,
  ContentManagementHierarchyActions,
  ContentManagementDeleteHandlers,
  ContentManagementPlanHierarchy,
} from "./lib/admin/content-management";
// Export Category from admin/content-management with an alias to avoid conflict with challenge Category
// Note: Use @elzatona/types/admin/content-management for Category in admin code
export type { Category as AdminCategory } from "./lib/admin/content-management";
export * from "./lib/admin/dashboard";
export * from "./lib/studyPlans";
export * from "./lib/unified-question-schema";
export * from "./lib/constants/homePage.constants";
export * from "./lib/types/homePage.types";
export * from "./lib/firestore";
export type { LearningPath } from "./lib/resource";
