// Type definitions for WebsiteFeature
// This type is used by shared-components but the implementation is app-specific
import React from 'react';

export interface WebsiteFeature {
  id: string;
  title: string;
  description: string;
  category: 'Website' | 'Admin';
  section: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  url?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  progress?: number;
  estimatedCompletion?: string;
  nextSteps?: string[];
  dependencies?: string[];
  estimatedEffort?: string;

  // Detailed information
  fullStory?: string;
  implementation?: {
    technologies?: string[];
    files?: string[];
    components?: string[];
    apis?: string[];
    database?: string[];
    deployment?: string[];
  };
  features?: string[];
  benefits?: string[];
  challenges?: string[];
  solutions?: string[];
  testing?: string[];
  performance?: string[];
  security?: string[];
  accessibility?: string[];
  futurePlans?: string[];
  relatedFeatures?: string[];
  completionDate?: string;
  lastUpdated?: string;
  contributors?: string[];
  documentation?: string[];
  screenshots?: string[];
  demoUrl?: string;
  githubUrl?: string;
}
