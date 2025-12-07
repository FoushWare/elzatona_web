export interface PreparationGuideSection {
  title: string;
  description: string;
  readingTime: number;
  topics: string[];
}

export interface PreparationGuide {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "all-levels";
  estimatedTime: number;
  color: string;
  icon: string;
  sections: PreparationGuideSection[];
  features: string[];
  targetSkills: string[];
  featured?: boolean;
}
