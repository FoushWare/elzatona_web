import {
  LearningSection,
  SectionQuestion,
  BulkQuestionData,
} from './section-service';

export interface SectionApiResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export class SectionClientService {
  private static readonly API_BASE = '/api/admin/sections';

  /**
   * Get all sections
   */
  static async getSections(): Promise<SectionApiResult> {
    try {
      const response = await fetch(this.API_BASE);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to retrieve sections',
        message: 'Failed to retrieve sections',
      };
    }
  }

  /**
   * Add new section
   */
  static async addSection(
    name: string,
    description?: string
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to add section',
        message: 'Failed to add section',
      };
    }
  }

  /**
   * Update section
   */
  static async updateSection(
    sectionId: string,
    updates: Partial<LearningSection>
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sectionId, updates }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to update section',
        message: 'Failed to update section',
      };
    }
  }

  /**
   * Delete section
   */
  static async deleteSection(sectionId: string): Promise<SectionApiResult> {
    try {
      const response = await fetch(this.API_BASE, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sectionId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to delete section',
        message: 'Failed to delete section',
      };
    }
  }

  /**
   * Reorder sections
   */
  static async reorderSections(
    sectionIds: string[]
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sectionIds }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to reorder sections',
        message: 'Failed to reorder sections',
      };
    }
  }

  /**
   * Get questions for a section
   */
  static async getSectionQuestions(
    sectionId: string
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}/${sectionId}/questions`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to retrieve section questions',
        message: 'Failed to retrieve section questions',
      };
    }
  }

  /**
   * Add individual question to section
   */
  static async addQuestion(
    sectionId: string,
    questionData: Partial<SectionQuestion>
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}/${sectionId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to add question',
        message: 'Failed to add question',
      };
    }
  }

  /**
   * Add bulk questions to section
   */
  static async addBulkQuestions(
    sectionId: string,
    questions: BulkQuestionData[]
  ): Promise<SectionApiResult> {
    try {
      const response = await fetch(`${this.API_BASE}/${sectionId}/questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Section client error:', error);
      return {
        success: false,
        error: 'Failed to add bulk questions',
        message: 'Failed to add bulk questions',
      };
    }
  }

  /**
   * Format section name for display
   */
  static formatSectionName(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get section icon based on section name
   */
  static getSectionIcon(name: string): string {
    const iconMap: { [key: string]: string } = {
      'frontend fundamentals': '🎯',
      'advanced css mastery': '🎨',
      'javascript deep dive': '⚡',
      'react mastery': '⚛️',
      'typescript essentials': '📘',
      'testing strategies': '🧪',
      'performance optimization': '🚀',
      'security essentials': '🔒',
      'frontend system design': '🏗️',
      'build tools & devops': '🛠️',
      'api integration & communication': '🔗',
      'ai tools for frontend': '🤖',
      'frontend interview prep': '💼',
      'advanced frontend architectures': '🏛️',
      'javascript practice & interview prep': '📝',
      'css practice & layout mastery': '🎨',
      'html practice & semantic mastery': '📄',
      'react practice & advanced patterns': '⚛️',
      'comprehensive interview preparation': '🎓',
      'improve your english': '🌍',
    };

    return iconMap[name.toLowerCase()] || '📚';
  }

  /**
   * Get difficulty color class
   */
  static getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  }

  /**
   * Get question type color class
   */
  static getQuestionTypeColor(type: string): string {
    switch (type) {
      case 'single':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'multiple':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  }
}
