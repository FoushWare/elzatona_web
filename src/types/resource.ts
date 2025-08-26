export type ResourceCategory = 
  | 'ai-tools'
  | 'security'
  | 'performance'
  | 'css'
  | 'javascript'
  | 'react'
  | 'typescript'
  | 'testing'
  | 'git'
  | 'html'
  | 'tools'
  | 'interview'
  | 'system-design'
  | 'micro-frontend'
  | 'api'
  | 'build-tools'
  | 'browser'
  | 'problem-solving';

export type ResourceType = 'article' | 'video' | 'tool' | 'course' | 'book' | 'cheatsheet' | 'documentation';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  type: ResourceType;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  publishedDate?: string;
  estimatedReadTime?: number; // in minutes
  isBookmarked?: boolean;
  relatedChallenges?: string[]; // challenge IDs
  content?: string; // for embedded content
  thumbnail?: string;
  featured?: boolean;
}

export interface ResourceCategoryInfo {
  id: ResourceCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface ResourceFilter {
  category?: ResourceCategory;
  type?: ResourceType;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  searchTerm?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: string[]; // resource IDs in order
  estimatedTime: number; // in hours
  prerequisites?: string[];
  targetSkills: string[];
}
