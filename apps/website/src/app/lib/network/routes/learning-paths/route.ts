import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

import { SectionService } from "../../../section-service";

interface LearningPath {
  id: string;
  name: string;
  order?: number;
  questionCount?: number;
  [key: string]: unknown; // Allow additional properties
}

interface Section {
  id: string;
  name: string;
  questionCount?: number;
  [key: string]: unknown; // Allow additional properties
}

interface LearningPathWithSections extends LearningPath {
  sectors: Array<{
    id: string;
    name: string;
    question_count: number;
  }>;
}

// Mapping of learning paths to their relevant sections
const learningPathSections: Record<string, string[]> = {
  "performance-optimization": ["performance-optimization"],
  "typescript-essentials": ["typescript-essentials"],
  "security-essentials": ["frontend-security"],
  "css-practice-layout": ["css-fundamentals", "advanced-css-mastery"],
  "build-tools-devops": ["build-tools-devops"],
  "testing-strategies": ["testing-strategies"],
  "javascript-practice-interview": [
    "javascript-fundamentals",
    "problem-solving-javascript",
  ],
  "advanced-frontend-architectures": [
    "design-patterns-architecture",
    "system-design-frontend",
  ],
  "react-practice-advanced": ["react-fundamentals", "advanced-react-patterns"],
  "css-mastery": ["css-fundamentals", "advanced-css-mastery"],
  "react-mastery": ["react-fundamentals", "advanced-react-patterns"],
  "html-practice": ["html-fundamentals"],
  "html-practice-semantic": ["html-fundamentals"],
  "css-practice": ["css-fundamentals", "advanced-css-mastery"],
  "javascript-practice": [
    "javascript-fundamentals",
    "problem-solving-javascript",
  ],
  "react-practice": ["react-fundamentals", "advanced-react-patterns"],
  "frontend-system-design": [
    "system-design-frontend",
    "design-patterns-architecture",
  ],
  "frontend-basics": [
    "html-fundamentals",
    "css-fundamentals",
    "javascript-fundamentals",
  ],
  "javascript-deep-dive": [
    "javascript-fundamentals",
    "javascript-deep-dive",
    "problem-solving-javascript",
  ],
  "api-integration": ["api-integration-communication"],
  "ai-tools-frontend": ["ai-tools-frontend"],
};

export async function GET(_request: NextRequest) {
  try {
    // Fetch learning paths from Supabase with ordering
    const { data: learningPathsData, error: learningPathsError } =
      await supabase
        .from("learning_paths")
        .select("*")
        .order("order_index", { ascending: true });

    if (learningPathsError) {
      throw learningPathsError;
    }

    const learningPaths = (learningPathsData || [])
      .map((doc) => ({
        id: doc.id,
        ...doc,
      }))
      .sort((a: any, b: any) => {
        // Sort by order field if it exists, otherwise by name
        const orderA = a.order || 999;
        const orderB = b.order || 999;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        // If order is the same, prioritize JavaScript Deep Dive
        if (a.id === "javascript-deep-dive") return -1;
        if (b.id === "javascript-deep-dive") return 1;
        return (a.name || "").localeCompare(b.name || "");
      });

    // Fetch sections using SectionService
    const sectionsResult = await SectionService.getSections();

    if (!sectionsResult.success) {
      throw new Error(sectionsResult.error || "Failed to fetch sections");
    }

    const sections: Section[] = (sectionsResult.data as Section[]) || [];

    // Create a map of sections for quick lookup
    const sectionsMap = sections.reduce(
      (acc: Record<string, Section>, section: Section) => {
        acc[section.id] = section;
        return acc;
      },
      {} as Record<string, Section>,
    );

    // Deduplicate learning paths by ID and add sections data
    const uniqueLearningPaths = learningPaths.reduce(
      (acc: LearningPathWithSections[], path: any) => {
        if (!acc.find((existingPath) => existingPath.id === path.id)) {
          // Get relevant sections for this learning path
          const relevantSectionIds = learningPathSections[path.id] || [];
          const pathSections = relevantSectionIds
            .map((sectionId) => sectionsMap[sectionId])
            .filter(Boolean)
            .map((section) => ({
              id: section.id,
              name: section.name,
              question_count: section.questionCount || 0,
            }));

          acc.push({
            ...path,
            sectors: pathSections,
            // Use the questionCount from the learning path itself
            question_count: path.questionCount || 0,
          });
        }
        return acc;
      },
      [] as LearningPathWithSections[],
    );

    return NextResponse.json({
      success: true,
      data: uniqueLearningPaths,
    });
  } catch (error) {
    console.error("Error fetching learning paths:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch learning paths",
      },
      { status: 500 },
    );
  }
}
