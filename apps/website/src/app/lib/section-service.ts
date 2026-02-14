import { promises as fs } from "fs";
import path from "path";
import { generateId } from "@elzatona/utilities";

// Types
export interface LearningSection {
  id: string;
  name: string;
  description: string;
  category?:
    | "foundation"
    | "frontend"
    | "advanced"
    | "specialized"
    | "career"
    | "emerging";
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  order: number;
  is_active: boolean;
  question_count: number;
  created_at: string;
  updated_at: string;
}

export interface SectionQuestion {
  id: string;
  title: string;
  content: string;
  type: "single" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  sectionId: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  audioQuestion?: string;
  audioAnswer?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  isComplete: boolean; // New field to track if question structure is complete
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface BulkQuestionData {
  title: string;
  content: string;
  type: "single" | "multiple";
  difficulty: "easy" | "medium" | "hard";
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
}

export interface SectionResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export class SectionService {
  private static readonly SECTIONS_DIR = path.join(
    process.cwd(),
    "data",
    "sections",
  );
  private static readonly QUESTIONS_DIR = path.join(
    process.cwd(),
    "data",
    "questions",
  );

  /**
   * Ensure data directories exist
   */
  private static async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.SECTIONS_DIR, { recursive: true });
      await fs.mkdir(this.QUESTIONS_DIR, { recursive: true });
    } catch (error) {
      console.error("Failed to create data directories:", error);
      throw new Error("Failed to create data directories");
    }
  }

  /**
   * Get sections file path
   */
  private static getSectionsPath(): string {
    return path.join(this.SECTIONS_DIR, "sections.json");
  }

  /**
   * Get questions file path for a section
   */
  private static getSectionQuestionsPath(sectionId: string): string {
    return path.join(this.QUESTIONS_DIR, `${sectionId}-questions.json`);
  }

  /**
   * Get all sections
   */
  static async getSections(): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const sectionsPath = this.getSectionsPath();
      let sections: LearningSection[] = [];

      try {
        const fileContent = await fs.readFile(sectionsPath, "utf-8");
        sections = JSON.parse(fileContent);
      } catch (_error) {
        // File doesn't exist, return default sections
        sections = this.getDefaultSections();
        await this.saveSections(sections);
      }

      return {
        success: true,
        message: "Sections retrieved successfully",
        data: sections,
      };
    } catch (error) {
      console.error("Failed to get sections:", error);
      return {
        success: false,
        message: "Failed to retrieve sections",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Initialize default sections
   */
  static async initializeDefaultSections(): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const sectionsPath = this.getSectionsPath();

      // Check if sections file already exists
      try {
        await fs.access(sectionsPath);
        // File exists, don't overwrite
        return {
          success: true,
          message: "Sections file already exists",
          data: null,
        };
      } catch (_error) {
        // File doesn't exist, create it with default sections
        const defaultSections = this.getDefaultSections();
        await this.saveSections(defaultSections);

        return {
          success: true,
          message: "Default sections initialized successfully",
          data: defaultSections,
        };
      }
    } catch (error) {
      console.error("Failed to initialize default sections:", error);
      return {
        success: false,
        message: "Failed to initialize default sections",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get default sections - Comprehensive frontend development curriculum
   */
  private static getDefaultSections(): LearningSection[] {
    const comprehensiveSections = [
      // Foundation Level (Beginner)
      {
        id: "html-fundamentals",
        name: "HTML Fundamentals",
        description:
          "Master HTML semantics, structure, accessibility, and modern HTML5 features",
        category: "foundation",
        difficulty: "beginner",
        estimatedTime: "2-3 weeks",
        question_count: 0,
        order: 1,
      },
      {
        id: "css-fundamentals",
        name: "CSS Fundamentals",
        description:
          "Learn CSS basics, selectors, layouts, and responsive design principles",
        category: "foundation",
        difficulty: "beginner",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 2,
      },
      {
        id: "javascript-fundamentals",
        name: "JavaScript Fundamentals",
        description:
          "Master JavaScript basics, ES6+, and core programming concepts",
        category: "foundation",
        difficulty: "beginner",
        estimatedTime: "4-5 weeks",
        question_count: 0,
        order: 3,
      },

      // Intermediate Level
      {
        id: "advanced-css-mastery",
        name: "Advanced CSS Mastery",
        description:
          "Deep dive into advanced CSS techniques and modern layouts",
        category: "frontend",
        difficulty: "intermediate",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 4,
      },
      {
        id: "javascript-deep-dive",
        name: "JavaScript Deep Dive",
        description:
          "Advanced JavaScript concepts and modern development patterns",
        category: "frontend",
        difficulty: "intermediate",
        estimatedTime: "4-5 weeks",
        question_count: 0,
        order: 5,
      },
      {
        id: "typescript-essentials",
        name: "TypeScript Essentials",
        description: "Learn TypeScript for type-safe JavaScript development",
        category: "frontend",
        difficulty: "intermediate",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 6,
      },
      {
        id: "react-fundamentals",
        name: "React Fundamentals",
        description:
          "Master React core concepts and modern development patterns",
        category: "frontend",
        difficulty: "intermediate",
        estimatedTime: "4-5 weeks",
        question_count: 0,
        order: 7,
      },

      // Advanced Level
      {
        id: "advanced-react-patterns",
        name: "Advanced React Patterns",
        description: "Advanced React concepts and enterprise-level patterns",
        category: "advanced",
        difficulty: "advanced",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 8,
      },
      {
        id: "nextjs-mastery",
        name: "Next.js Mastery",
        description: "Full-stack React development with Next.js",
        category: "advanced",
        difficulty: "advanced",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 9,
      },
      {
        id: "design-patterns-architecture",
        name: "Design Patterns & Architecture",
        description:
          "Software design patterns and frontend architecture principles",
        category: "advanced",
        difficulty: "advanced",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 10,
      },
      {
        id: "problem-solving-javascript",
        name: "Problem Solving with JavaScript",
        description: "Algorithmic thinking and problem-solving skills",
        category: "advanced",
        difficulty: "advanced",
        estimatedTime: "4-5 weeks",
        question_count: 0,
        order: 11,
      },

      // Specialized Topics
      {
        id: "frontend-security",
        name: "Frontend Security",
        description:
          "Security best practices and vulnerabilities in frontend development",
        category: "specialized",
        difficulty: "intermediate",
        estimatedTime: "2-3 weeks",
        question_count: 0,
        order: 12,
      },
      {
        id: "performance-optimization",
        name: "Performance Optimization",
        description: "Frontend performance optimization techniques and tools",
        category: "specialized",
        difficulty: "intermediate",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 13,
      },
      {
        id: "testing-strategies",
        name: "Testing Strategies",
        description:
          "Comprehensive testing approaches for frontend applications",
        category: "specialized",
        difficulty: "intermediate",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 14,
      },
      {
        id: "build-tools-devops",
        name: "Build Tools & DevOps",
        description: "Modern build tools and deployment strategies",
        category: "specialized",
        difficulty: "intermediate",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 15,
      },
      {
        id: "api-integration-communication",
        name: "API Integration & Communication",
        description: "Working with APIs and data communication",
        category: "specialized",
        difficulty: "intermediate",
        estimatedTime: "2-3 weeks",
        question_count: 0,
        order: 16,
      },

      // Interview & Career Preparation
      {
        id: "system-design-frontend",
        name: "System Design for Frontend",
        description: "Frontend system design and architecture decisions",
        category: "career",
        difficulty: "advanced",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 17,
      },
      {
        id: "frontend-interview-prep",
        name: "Frontend Interview Preparation",
        description:
          "Comprehensive preparation for frontend technical interviews",
        category: "career",
        difficulty: "intermediate",
        estimatedTime: "4-5 weeks",
        question_count: 0,
        order: 18,
      },
      {
        id: "behavioral-soft-skills",
        name: "Behavioral & Soft Skills",
        description: "Non-technical skills essential for frontend developers",
        category: "career",
        difficulty: "beginner",
        estimatedTime: "2-3 weeks",
        question_count: 0,
        order: 19,
      },

      // Emerging Technologies
      {
        id: "ai-tools-frontend",
        name: "AI Tools for Frontend",
        description:
          "Leveraging AI tools and technologies in frontend development",
        category: "emerging",
        difficulty: "intermediate",
        estimatedTime: "2-3 weeks",
        question_count: 0,
        order: 20,
      },
      {
        id: "web3-blockchain-frontend",
        name: "Web3 & Blockchain Frontend",
        description:
          "Frontend development for Web3 and blockchain applications",
        category: "emerging",
        difficulty: "advanced",
        estimatedTime: "3-4 weeks",
        question_count: 0,
        order: 21,
      },
    ];

    return comprehensiveSections.map((section) => ({
      id: section.id,
      name: section.name,
      description: section.description,
      category: section.category as
        | "frontend"
        | "advanced"
        | "foundation"
        | "specialized"
        | "career"
        | "emerging"
        | undefined,
      difficulty: section.difficulty as
        | "beginner"
        | "intermediate"
        | "advanced"
        | undefined,
      estimatedTime: section.estimatedTime,
      order: section.order,
      is_active: true,
      question_count: section.question_count,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }

  /**
   * Save sections to file
   */
  private static async saveSections(
    sections: LearningSection[],
  ): Promise<void> {
    const sectionsPath = this.getSectionsPath();
    await fs.writeFile(sectionsPath, JSON.stringify(sections, null, 2));
  }

  /**
   * Add new section
   */
  static async addSection(
    name: string,
    description?: string,
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data as LearningSection[];

      // Check if section name already exists
      const existingSection = sections.find(
        (s) => s.name.toLowerCase() === name.toLowerCase(),
      );
      if (existingSection) {
        return {
          success: false,
          message: "Section with this name already exists",
          error: "Duplicate section name",
        };
      }

      // Create new section
      const newSection: LearningSection = {
        id: `section_${Date.now()}`,
        name: name.trim(),
        description:
          description?.trim() || `Learn and practice ${name.toLowerCase()}`,
        order: sections.length + 1,
        is_active: true,
        question_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      sections.push(newSection);
      await this.saveSections(sections);

      return {
        success: true,
        message: "Section added successfully",
        data: newSection,
      };
    } catch (error) {
      console.error("Failed to add section:", error);
      return {
        success: false,
        message: "Failed to add section",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Update section
   */
  static async updateSection(
    sectionId: string,
    updates: Partial<LearningSection>,
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data as LearningSection[];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);

      if (sectionIndex === -1) {
        return {
          success: false,
          message: "Section not found",
          error: "Invalid section ID",
        };
      }

      // Check for duplicate name if name is being updated
      if (updates.name) {
        const existingSection = sections.find(
          (s) =>
            s.id !== sectionId &&
            s.name.toLowerCase() === updates.name?.toLowerCase(),
        );
        if (existingSection) {
          return {
            success: false,
            message: "Section with this name already exists",
            error: "Duplicate section name",
          };
        }
      }

      // Update section
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        ...updates,
        updated_at: new Date().toISOString(),
      };

      await this.saveSections(sections);

      return {
        success: true,
        message: "Section updated successfully",
        data: sections[sectionIndex],
      };
    } catch (error) {
      console.error("Failed to update section:", error);
      return {
        success: false,
        message: "Failed to update section",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Delete section
   */
  static async deleteSection(sectionId: string): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data as LearningSection[];
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);

      if (sectionIndex === -1) {
        return {
          success: false,
          message: "Section not found",
          error: "Invalid section ID",
        };
      }

      // Remove section
      const deletedSection = sections.splice(sectionIndex, 1)[0];

      // Update order for remaining sections
      sections.forEach((section, index) => {
        section.order = index + 1;
      });

      await this.saveSections(sections);

      // Delete associated questions file
      try {
        const questionsPath = this.getSectionQuestionsPath(sectionId);
        await fs.unlink(questionsPath);
      } catch (_error) {
        console.log("No questions file found for section:", sectionId);
      }

      return {
        success: true,
        message: "Section deleted successfully",
        data: deletedSection,
      };
    } catch (error) {
      console.error("Failed to delete section:", error);
      return {
        success: false,
        message: "Failed to delete section",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Reorder sections
   */
  static async reorderSections(sectionIds: string[]): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data as LearningSection[];

      // Create a map of new orders
      const newOrderMap = new Map<string, number>();
      sectionIds.forEach((id, index) => {
        newOrderMap.set(id, index + 1);
      });

      // Update section orders
      sections.forEach((section) => {
        const newOrder = newOrderMap.get(section.id);
        if (newOrder !== undefined) {
          section.order = newOrder;
          section.updated_at = new Date().toISOString();
        }
      });

      // Sort sections by new order
      sections.sort((a, b) => a.order - b.order);

      await this.saveSections(sections);

      return {
        success: true,
        message: "Sections reordered successfully",
        data: sections,
      };
    } catch (error) {
      console.error("Failed to reorder sections:", error);
      return {
        success: false,
        message: "Failed to reorder sections",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get questions for a section
   */
  static async getSectionQuestions(sectionId: string): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const questionsPath = this.getSectionQuestionsPath(sectionId);
      let questions: SectionQuestion[] = [];

      try {
        const fileContent = await fs.readFile(questionsPath, "utf-8");
        questions = JSON.parse(fileContent);
      } catch (_error) {
        // File doesn't exist, return empty array
        console.log(`No questions found for section: ${sectionId}`);
      }

      return {
        success: true,
        message: "Questions retrieved successfully",
        data: questions,
      };
    } catch (error) {
      console.error("Failed to get section questions:", error);
      return {
        success: false,
        message: "Failed to retrieve questions",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Add individual question to section
   */
  static async addQuestion(
    sectionId: string,
    questionData: Partial<SectionQuestion>,
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSectionQuestions(sectionId);
      if (!result.success) {
        return result;
      }

      const questions: SectionQuestion[] = result.data as SectionQuestion[];

      // Create new question with incomplete structure handling
      const newQuestion: SectionQuestion = {
        id: `question_${Date.now()}_${generateId()}`,
        title: questionData.title || "",
        content: questionData.content || "",
        type: questionData.type || "single",
        difficulty: questionData.difficulty || "easy",
        sectionId,
        options: questionData.options || [
          { id: "a", text: "", isCorrect: false },
          { id: "b", text: "", isCorrect: false },
          { id: "c", text: "", isCorrect: false },
          { id: "d", text: "", isCorrect: false },
        ],
        correctAnswers: questionData.correctAnswers || [],
        explanation: questionData.explanation || "",
        audioQuestion: questionData.audioQuestion || "",
        audioAnswer: questionData.audioAnswer || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
        isComplete: this.checkQuestionCompleteness({
          title: questionData.title || "",
          content: questionData.content || "",
          options: questionData.options || [],
          correctAnswers: questionData.correctAnswers || [],
          explanation: questionData.explanation || "",
        }),
      };

      questions.push(newQuestion);

      // Save questions
      const questionsPath = this.getSectionQuestionsPath(sectionId);
      await fs.writeFile(questionsPath, JSON.stringify(questions, null, 2));

      // Update section question count
      await this.updateSectionQuestionCount(sectionId, questions.length);

      return {
        success: true,
        message: "Question added successfully",
        data: newQuestion,
      };
    } catch (error) {
      console.error("Failed to add question:", error);
      return {
        success: false,
        message: "Failed to add question",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Add bulk questions to section
   */
  static async addBulkQuestions(
    sectionId: string,
    questionsData: BulkQuestionData[],
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSectionQuestions(sectionId);
      if (!result.success) {
        return result;
      }

      const existingQuestions: SectionQuestion[] =
        result.data as SectionQuestion[];
      const newQuestions: SectionQuestion[] = [];

      questionsData.forEach((questionData, index) => {
        const newQuestion: SectionQuestion = {
          id: `question_${Date.now()}_${index}_${generateId()}`,
          title: questionData.title || `Question ${index + 1}`,
          content: questionData.content || "",
          type: questionData.type || "single",
          difficulty: questionData.difficulty || "easy",
          sectionId,
          options: questionData.options || [
            { id: "a", text: "", isCorrect: false },
            { id: "b", text: "", isCorrect: false },
            { id: "c", text: "", isCorrect: false },
            { id: "d", text: "", isCorrect: false },
          ],
          correctAnswers: questionData.correctAnswers || [],
          explanation: questionData.explanation || "",
          audioQuestion: "", // Empty for later editing
          audioAnswer: "", // Empty for later editing
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true,
          isComplete: this.checkQuestionCompleteness(questionData),
        };

        newQuestions.push(newQuestion);
      });

      const allQuestions = [...existingQuestions, ...newQuestions];

      // Save questions
      const questionsPath = this.getSectionQuestionsPath(sectionId);
      await fs.writeFile(questionsPath, JSON.stringify(allQuestions, null, 2));

      // Update section question count
      await this.updateSectionQuestionCount(sectionId, allQuestions.length);

      return {
        success: true,
        message: `${newQuestions.length} questions added successfully`,
        data: newQuestions,
      };
    } catch (error) {
      console.error("Failed to add bulk questions:", error);
      return {
        success: false,
        message: "Failed to add bulk questions",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Check if question structure is complete
   */
  private static checkQuestionCompleteness(
    questionData: Partial<BulkQuestionData>,
  ): boolean {
    const hasTitle = Boolean(
      questionData.title && questionData.title.trim() !== "",
    );
    const hasContent = Boolean(
      questionData.content && questionData.content.trim() !== "",
    );
    const hasOptions = Boolean(
      questionData.options && questionData.options.length > 0,
    );
    const hasCorrectAnswers = Boolean(
      questionData.correctAnswers && questionData.correctAnswers.length > 0,
    );
    const hasExplanation = Boolean(
      questionData.explanation && questionData.explanation.trim() !== "",
    );

    return (
      hasTitle &&
      hasContent &&
      hasOptions &&
      hasCorrectAnswers &&
      hasExplanation
    );
  }

  /**
   * Update section question count
   */
  private static async updateSectionQuestionCount(
    sectionId: string,
    count: number,
  ): Promise<void> {
    try {
      const result = await this.getSections();
      if (result.success) {
        const sections: LearningSection[] = result.data as LearningSection[];
        const sectionIndex = sections.findIndex((s) => s.id === sectionId);

        if (sectionIndex !== -1) {
          sections[sectionIndex].question_count = count;
          sections[sectionIndex].updated_at = new Date().toISOString();
          await this.saveSections(sections);
        }
      }
    } catch (error) {
      console.error("Failed to update section question count:", error);
    }
  }
}
