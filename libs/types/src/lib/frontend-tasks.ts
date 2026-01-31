export type FrontendTaskFile = {
  id: string;
  path: string;
  language?: string;
  content: string;
  starterContent?: string;
  solutionContent?: string;
};

export type FrontendTask = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTimeMinutes?: number;
  author: { id: string; name: string; company?: string };
  category?: string;
  tags: string[];
  files: FrontendTaskFile[];
  description: string;
};
