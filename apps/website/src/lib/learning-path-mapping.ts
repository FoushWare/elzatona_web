// v1.0 - Learning Path Mapping Utility
// Maps between learning path titles (used in admin sections) and IDs (used in unified system)

import { learningPaths } from "./resources";

export interface LearningPathMapping {
  id: string;
  title: string;
  description: string;
}

/**
 * Get learning path mapping by title
 */
export function getLearningPathByTitle(
  title: string,
): LearningPathMapping | null {
  const path = learningPaths.find((p) => p.title === title);
  if (!path) return null;

  return {
    id: path.id,
    title: path.title,
    description: path.description,
  };
}

/**
 * Get learning path mapping by ID
 */
export function getLearningPathById(id: string): LearningPathMapping | null {
  const path = learningPaths.find((p) => p.id === id);
  if (!path) return null;

  return {
    id: path.id,
    title: path.title,
    description: path.description,
  };
}

/**
 * Get all learning path mappings
 */
export function getAllLearningPathMappings(): LearningPathMapping[] {
  return learningPaths.map((path) => ({
    id: path.id,
    title: path.title,
    description: path.description,
  }));
}

/**
 * Convert section name to learning path ID
 */
export function sectionNameToLearningPathId(
  sectionName: string,
): string | null {
  const mapping = getLearningPathByTitle(sectionName);
  return mapping?.id || null;
}

/**
 * Convert learning path ID to section name
 */
export function learningPathIdToSectionName(
  learningPathId: string,
): string | null {
  const mapping = getLearningPathById(learningPathId);
  return mapping?.title || null;
}

/**
 * Map learning path names to categories
 */
function getCategoryForLearningPath(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("javascript") || titleLower.includes("js")) {
    return "javascript";
  } else if (titleLower.includes("react")) {
    return "react";
  } else if (titleLower.includes("css") || titleLower.includes("styling")) {
    return "css";
  } else if (titleLower.includes("typescript") || titleLower.includes("ts")) {
    return "typescript";
  } else if (
    titleLower.includes("html") ||
    titleLower.includes("fundamentals")
  ) {
    return "html";
  } else if (titleLower.includes("testing")) {
    return "testing";
  } else if (
    titleLower.includes("performance") ||
    titleLower.includes("optimization")
  ) {
    return "performance";
  } else if (titleLower.includes("security")) {
    return "security";
  } else if (titleLower.includes("ai") || titleLower.includes("tools")) {
    return "ai-tools";
  } else if (
    titleLower.includes("system") ||
    titleLower.includes("design") ||
    titleLower.includes("architecture")
  ) {
    return "system-design";
  } else if (titleLower.includes("api") || titleLower.includes("integration")) {
    return "api";
  } else if (titleLower.includes("build") || titleLower.includes("devops")) {
    return "build-tools";
  } else if (
    titleLower.includes("interview") ||
    titleLower.includes("preparation")
  ) {
    return "interview";
  } else {
    return "general";
  }
}

/**
 * Get default sections for admin (based on learning paths)
 */
export function getDefaultAdminSections(): Array<{
  id: string;
  name: string;
  description: string;
  learningPathId: string;
  question_count: number;
  is_active: boolean;
  category: string;
}> {
  return learningPaths.map((path) => ({
    id: path.id,
    name: path.title,
    description: path.description,
    learningPathId: path.id,
    question_count: 0, // Will be populated dynamically
    is_active: true, // All sections are active by default
    category: getCategoryForLearningPath(path.title), // Map based on title
  }));
}

export default {
  getLearningPathByTitle,
  getLearningPathById,
  getAllLearningPathMappings,
  sectionNameToLearningPathId,
  learningPathIdToSectionName,
  getDefaultAdminSections,
};
