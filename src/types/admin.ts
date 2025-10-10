// v1.0 - Admin types for frontend tasks and problem solving

export interface FrontendTaskTestCase {
  id: string;
  description: string;
  input: any;
  expectedOutput: any;
  type: 'function' | 'component' | 'css' | 'html';
  timeout?: number;
}

export interface FrontendTaskFile {
  id: string;
  name: string;
  type: 'tsx' | 'ts' | 'css' | 'html' | 'json' | 'js';
  content: string;
  isEntryPoint?: boolean; // For main component files
}

export interface FrontendTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'React', 'JavaScript', 'CSS'
  estimatedTime: number; // minutes
  author: string;
  company?: string;
  requirements: string;
  hints: string[];
  solution: string;
  starterCode: string; // Legacy field for backward compatibility
  files: FrontendTaskFile[]; // New dynamic files structure
  testCases?: FrontendTaskTestCase[]; // Added test cases
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ProblemSolvingTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., 'Arrays', 'Strings', 'Dynamic Programming'
  functionName: string; // e.g., 'twoSum'
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface TestCase {
  id: string;
  input: unknown[];
  expected: unknown;
  isHidden?: boolean; // for submission vs test run
}

export interface TestResult {
  id: string;
  passed: boolean;
  actual: unknown;
  expected: unknown;
  error?: string;
  elapsedMs?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form data types
export interface FrontendTaskFormData {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
  author: string;
  company?: string;
  requirements: string;
  hints: string[];
  solution: string;
  starterCode: string; // Legacy field for backward compatibility
  files: FrontendTaskFile[]; // New dynamic files structure
  testCases?: FrontendTaskTestCase[]; // Added test cases
  tags: string[];
  isActive: boolean;
}

export interface ProblemSolvingTaskFormData {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  functionName: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  tags: string[];
}
