// v1.0 - Learning Path Mapping Utility
// Maps between learning path titles (used in admin sections) and IDs (used in unified system)

import { learningPaths } from './resources';

export interface LearningPathMapping {
  id: string;
  title: string;
  description: string;
}

/**
 * Get learning path mapping by title
 */
export function getLearningPathByTitle(title: string): LearningPathMapping | null {
  const path = learningPaths.find(p => p.title === title);
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
  const path = learningPaths.find(p => p.id === id);
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
  return learningPaths.map(path => ({
    id: path.id,
    title: path.title,
    description: path.description,
  }));
}

/**
 * Convert section name to learning path ID
 */
export function sectionNameToLearningPathId(sectionName: string): string | null {
  const mapping = getLearningPathByTitle(sectionName);
  return mapping?.id || null;
}

/**
 * Convert learning path ID to section name
 */
export function learningPathIdToSectionName(learningPathId: string): string | null {
  const mapping = getLearningPathById(learningPathId);
  return mapping?.title || null;
}

/**
 * Get default sections for admin (based on learning paths)
 */
export function getDefaultAdminSections(): Array<{
  id: string;
  name: string;
  description: string;
  learningPathId: string;
  questionCount: number;
}> {
  return learningPaths.map(path => ({
    id: path.id,
    name: path.title,
    description: path.description,
    learningPathId: path.id,
    questionCount: 0, // Will be populated dynamically
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
