export type Difficulty = "easy" | "medium" | "hard";
export type Category = "html" | "css" | "javascript" | "react";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  starterCode: {
    html: string;
    css: string;
    javascript: string;
  };
  testCases: TestCase[];
  solution: {
    html: string;
    css: string;
    javascript: string;
  };
  explanation: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  input: Record<string, unknown> | null;
  expectedOutput: string | boolean | number | null;
  type: "html" | "css" | "javascript";
}

export interface ChallengeFilters {
  category?: Category;
  difficulty?: Difficulty;
  search?: string;
}

export interface ChallengeListResponse {
  challenges: Challenge[];
  total: number;
  page: number;
  limit: number;
}
