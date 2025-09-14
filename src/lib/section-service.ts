import { promises as fs } from 'fs';
import path from 'path';

// Types
export interface LearningSection {
  id: string;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SectionQuestion {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  sectionId: string;
  options: QuestionOption[];
  correctAnswers: string[];
  explanation: string;
  audioQuestion?: string;
  audioAnswer?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
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
  type: 'single' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
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
    'data',
    'sections'
  );
  private static readonly QUESTIONS_DIR = path.join(
    process.cwd(),
    'data',
    'questions'
  );

  /**
   * Ensure data directories exist
   */
  private static async ensureDirectories(): Promise<void> {
    try {
      await fs.mkdir(this.SECTIONS_DIR, { recursive: true });
      await fs.mkdir(this.QUESTIONS_DIR, { recursive: true });
    } catch (error) {
      console.error('Failed to create data directories:', error);
      throw new Error('Failed to create data directories');
    }
  }

  /**
   * Get sections file path
   */
  private static getSectionsPath(): string {
    return path.join(this.SECTIONS_DIR, 'sections.json');
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
        const fileContent = await fs.readFile(sectionsPath, 'utf-8');
        sections = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist, return default sections
        sections = this.getDefaultSections();
        await this.saveSections(sections);
      }

      return {
        success: true,
        message: 'Sections retrieved successfully',
        data: sections,
      };
    } catch (error) {
      console.error('Failed to get sections:', error);
      return {
        success: false,
        message: 'Failed to retrieve sections',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get default sections
   */
  private static getDefaultSections(): LearningSection[] {
    const defaultSections = [
      'Frontend Fundamentals',
      'Advanced CSS Mastery',
      'JavaScript Deep Dive',
      'React Mastery',
      'TypeScript Essentials',
      'Testing Strategies',
      'Performance Optimization',
      'Security Essentials',
      'Frontend System Design',
      'Build Tools & DevOps',
      'API Integration & Communication',
      'AI Tools for Frontend',
      'Frontend Interview Prep',
      'Advanced Frontend Architectures',
      'JavaScript Practice & Interview Prep',
      'CSS Practice & Layout Mastery',
      'HTML Practice & Semantic Mastery',
      'React Practice & Advanced Patterns',
      'Comprehensive Interview Preparation',
      'Improve Your English',
    ];

    return defaultSections.map((name, index) => ({
      id: `section_${index + 1}`,
      name,
      description: `Learn and practice ${name.toLowerCase()}`,
      order: index + 1,
      isActive: true,
      questionCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  /**
   * Save sections to file
   */
  private static async saveSections(
    sections: LearningSection[]
  ): Promise<void> {
    const sectionsPath = this.getSectionsPath();
    await fs.writeFile(sectionsPath, JSON.stringify(sections, null, 2));
  }

  /**
   * Add new section
   */
  static async addSection(
    name: string,
    description?: string
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data;

      // Check if section name already exists
      const existingSection = sections.find(
        s => s.name.toLowerCase() === name.toLowerCase()
      );
      if (existingSection) {
        return {
          success: false,
          message: 'Section with this name already exists',
          error: 'Duplicate section name',
        };
      }

      // Create new section
      const newSection: LearningSection = {
        id: `section_${Date.now()}`,
        name: name.trim(),
        description:
          description?.trim() || `Learn and practice ${name.toLowerCase()}`,
        order: sections.length + 1,
        isActive: true,
        questionCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      sections.push(newSection);
      await this.saveSections(sections);

      return {
        success: true,
        message: 'Section added successfully',
        data: newSection,
      };
    } catch (error) {
      console.error('Failed to add section:', error);
      return {
        success: false,
        message: 'Failed to add section',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Update section
   */
  static async updateSection(
    sectionId: string,
    updates: Partial<LearningSection>
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSections();
      if (!result.success) {
        return result;
      }

      const sections: LearningSection[] = result.data;
      const sectionIndex = sections.findIndex(s => s.id === sectionId);

      if (sectionIndex === -1) {
        return {
          success: false,
          message: 'Section not found',
          error: 'Invalid section ID',
        };
      }

      // Check for duplicate name if name is being updated
      if (updates.name) {
        const existingSection = sections.find(
          s =>
            s.id !== sectionId &&
            s.name.toLowerCase() === updates.name.toLowerCase()
        );
        if (existingSection) {
          return {
            success: false,
            message: 'Section with this name already exists',
            error: 'Duplicate section name',
          };
        }
      }

      // Update section
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await this.saveSections(sections);

      return {
        success: true,
        message: 'Section updated successfully',
        data: sections[sectionIndex],
      };
    } catch (error) {
      console.error('Failed to update section:', error);
      return {
        success: false,
        message: 'Failed to update section',
        error: error instanceof Error ? error.message : 'Unknown error',
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

      const sections: LearningSection[] = result.data;
      const sectionIndex = sections.findIndex(s => s.id === sectionId);

      if (sectionIndex === -1) {
        return {
          success: false,
          message: 'Section not found',
          error: 'Invalid section ID',
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
      } catch (error) {
        console.log('No questions file found for section:', sectionId);
      }

      return {
        success: true,
        message: 'Section deleted successfully',
        data: deletedSection,
      };
    } catch (error) {
      console.error('Failed to delete section:', error);
      return {
        success: false,
        message: 'Failed to delete section',
        error: error instanceof Error ? error.message : 'Unknown error',
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

      const sections: LearningSection[] = result.data;

      // Create a map of new orders
      const newOrderMap = new Map<string, number>();
      sectionIds.forEach((id, index) => {
        newOrderMap.set(id, index + 1);
      });

      // Update section orders
      sections.forEach(section => {
        const newOrder = newOrderMap.get(section.id);
        if (newOrder !== undefined) {
          section.order = newOrder;
          section.updatedAt = new Date().toISOString();
        }
      });

      // Sort sections by new order
      sections.sort((a, b) => a.order - b.order);

      await this.saveSections(sections);

      return {
        success: true,
        message: 'Sections reordered successfully',
        data: sections,
      };
    } catch (error) {
      console.error('Failed to reorder sections:', error);
      return {
        success: false,
        message: 'Failed to reorder sections',
        error: error instanceof Error ? error.message : 'Unknown error',
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
        const fileContent = await fs.readFile(questionsPath, 'utf-8');
        questions = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist, return empty array
        console.log(`No questions found for section: ${sectionId}`);
      }

      return {
        success: true,
        message: 'Questions retrieved successfully',
        data: questions,
      };
    } catch (error) {
      console.error('Failed to get section questions:', error);
      return {
        success: false,
        message: 'Failed to retrieve questions',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Add individual question to section
   */
  static async addQuestion(
    sectionId: string,
    questionData: Partial<SectionQuestion>
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSectionQuestions(sectionId);
      if (!result.success) {
        return result;
      }

      const questions: SectionQuestion[] = result.data;

      // Create new question with incomplete structure handling
      const newQuestion: SectionQuestion = {
        id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: questionData.title || '',
        content: questionData.content || '',
        type: questionData.type || 'single',
        difficulty: questionData.difficulty || 'easy',
        sectionId,
        options: questionData.options || [
          { id: 'a', text: '', isCorrect: false },
          { id: 'b', text: '', isCorrect: false },
          { id: 'c', text: '', isCorrect: false },
          { id: 'd', text: '', isCorrect: false },
        ],
        correctAnswers: questionData.correctAnswers || [],
        explanation: questionData.explanation || '',
        audioQuestion: questionData.audioQuestion || '',
        audioAnswer: questionData.audioAnswer || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        isComplete: this.checkQuestionCompleteness({
          title: questionData.title || '',
          content: questionData.content || '',
          options: questionData.options || [],
          correctAnswers: questionData.correctAnswers || [],
          explanation: questionData.explanation || '',
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
        message: 'Question added successfully',
        data: newQuestion,
      };
    } catch (error) {
      console.error('Failed to add question:', error);
      return {
        success: false,
        message: 'Failed to add question',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Add bulk questions to section
   */
  static async addBulkQuestions(
    sectionId: string,
    questionsData: BulkQuestionData[]
  ): Promise<SectionResult> {
    try {
      await this.ensureDirectories();

      const result = await this.getSectionQuestions(sectionId);
      if (!result.success) {
        return result;
      }

      const existingQuestions: SectionQuestion[] = result.data;
      const newQuestions: SectionQuestion[] = [];

      questionsData.forEach((questionData, index) => {
        const newQuestion: SectionQuestion = {
          id: `question_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
          title: questionData.title || `Question ${index + 1}`,
          content: questionData.content || '',
          type: questionData.type || 'single',
          difficulty: questionData.difficulty || 'easy',
          sectionId,
          options: questionData.options || [
            { id: 'a', text: '', isCorrect: false },
            { id: 'b', text: '', isCorrect: false },
            { id: 'c', text: '', isCorrect: false },
            { id: 'd', text: '', isCorrect: false },
          ],
          correctAnswers: questionData.correctAnswers || [],
          explanation: questionData.explanation || '',
          audioQuestion: '', // Empty for later editing
          audioAnswer: '', // Empty for later editing
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
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
      console.error('Failed to add bulk questions:', error);
      return {
        success: false,
        message: 'Failed to add bulk questions',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Check if question structure is complete
   */
  private static checkQuestionCompleteness(
    questionData: Partial<BulkQuestionData>
  ): boolean {
    const hasTitle = questionData.title && questionData.title.trim() !== '';
    const hasContent =
      questionData.content && questionData.content.trim() !== '';
    const hasOptions = questionData.options && questionData.options.length > 0;
    const hasCorrectAnswers =
      questionData.correctAnswers && questionData.correctAnswers.length > 0;
    const hasExplanation =
      questionData.explanation && questionData.explanation.trim() !== '';

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
    count: number
  ): Promise<void> {
    try {
      const result = await this.getSections();
      if (result.success) {
        const sections: LearningSection[] = result.data;
        const sectionIndex = sections.findIndex(s => s.id === sectionId);

        if (sectionIndex !== -1) {
          sections[sectionIndex].questionCount = count;
          sections[sectionIndex].updatedAt = new Date().toISOString();
          await this.saveSections(sections);
        }
      }
    } catch (error) {
      console.error('Failed to update section question count:', error);
    }
  }
}
