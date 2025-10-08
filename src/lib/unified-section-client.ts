// v1.0 - Unified Section Client Service
// Client-side service for managing admin sections with unified questions system

export interface UnifiedSection {
  id: string;
  name: string;
  description: string;
  learningPathId: string;
  questionCount: number;
  isActive: boolean;
  category: string;
}

interface QuestionData {
  id?: string;
  title: string;
  content: string;
  type: string;
  difficulty: string;
  category: string;
  learningPath?: string;
  isActive?: boolean;
  [key: string]: unknown;
}

export interface UnifiedSectionApiResult {
  success: boolean;
  data?: unknown;
  message?: string;
  error?: string;
}

export class UnifiedSectionClientService {
  private static readonly API_BASE = '/api/admin/sections/unified';

  /**
   * Get all admin sections with question counts from unified system
   */
  static async getSections(): Promise<UnifiedSectionApiResult> {
    try {
      const response = await fetch(this.API_BASE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Unified section client error:', error);
      return {
        success: false,
        error: 'Failed to retrieve admin sections',
      };
    }
  }

  /**
   * Get questions for a section using unified system
   */
  static async getSectionQuestions(
    sectionId: string
  ): Promise<UnifiedSectionApiResult> {
    try {
      const response = await fetch(
        `${this.API_BASE.replace('/unified', '')}/${sectionId}/unified-questions`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Unified section questions client error:', error);
      return {
        success: false,
        error: 'Failed to retrieve section questions',
      };
    }
  }

  /**
   * Add question to section using unified system
   */
  static async addQuestion(
    sectionId: string,
    questionData: QuestionData
  ): Promise<UnifiedSectionApiResult> {
    try {
      const response = await fetch(
        `${this.API_BASE.replace('/unified', '')}/${sectionId}/unified-questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(questionData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Add question to unified section client error:', error);
      return {
        success: false,
        error: 'Failed to add question to section',
      };
    }
  }

  /**
   * Delete question from section using unified system
   */
  static async deleteQuestion(
    sectionId: string,
    questionId: string
  ): Promise<UnifiedSectionApiResult> {
    try {
      const response = await fetch(
        `${this.API_BASE.replace('/unified', '')}/${sectionId}/unified-questions?questionId=${questionId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        'Delete question from unified section client error:',
        error
      );
      return {
        success: false,
        error: 'Failed to delete question from section',
      };
    }
  }

  /**
   * Bulk add questions to section using unified system
   */
  static async bulkAddQuestions(
    sectionId: string,
    questions: QuestionData[]
  ): Promise<UnifiedSectionApiResult> {
    try {
      const response = await fetch(
        `${this.API_BASE.replace('/unified', '')}/${sectionId}/unified-questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questions: questions.map(q => ({
              ...q,
              learningPath: sectionId,
              isActive: true,
            })),
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        'Bulk add questions to unified section client error:',
        error
      );
      return {
        success: false,
        error: 'Failed to bulk add questions to section',
      };
    }
  }
}

export default UnifiedSectionClientService;
