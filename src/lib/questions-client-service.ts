// v1.0 - Questions Client Service
// Client-side service for managing questions via API endpoints

export interface QuestionsResult {
  questions: any[];
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
  currentPage: number;
}

export interface QuestionUpdateResult {
  success: boolean;
  question?: any;
  error?: string;
}

export interface QuestionDeleteResult {
  success: boolean;
  error?: string;
}

export class QuestionsClientService {
  /**
   * Get questions with pagination and filters
   */
  static async getQuestions(params: {
    page?: number;
    pageSize?: number;
    category?: string;
    search?: string;
  } = {}): Promise<QuestionsResult> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());
      if (params.category && params.category !== 'all') searchParams.append('category', params.category);
      if (params.search) searchParams.append('search', params.search);

      const response = await fetch(`/api/questions/unified?${searchParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        return {
          questions: data.data || [],
          totalCount: data.pagination?.totalCount || 0,
          totalPages: data.pagination?.totalPages || 0,
          hasMore: data.pagination?.hasNextPage || false,
          currentPage: data.pagination?.page || 1,
        };
      } else {
        throw new Error(data.error || 'Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      return {
        questions: [],
        totalCount: 0,
        totalPages: 0,
        hasMore: false,
        currentPage: 1,
      };
    }
  }

  /**
   * Update a question
   */
  static async updateQuestion(questionId: string, updates: any): Promise<QuestionUpdateResult> {
    try {
      const response = await fetch(`/api/questions/unified/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          question: data.data,
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to update question',
        };
      }
    } catch (error) {
      console.error('Error updating question:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Delete a question
   */
  static async deleteQuestion(questionId: string): Promise<QuestionDeleteResult> {
    try {
      const response = await fetch(`/api/questions/unified/${questionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to delete question',
        };
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get a single question by ID
   */
  static async getQuestion(questionId: string): Promise<{ success: boolean; question?: any; error?: string }> {
    try {
      const response = await fetch(`/api/questions/unified/${questionId}`);
      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          question: data.data,
        };
      } else {
        return {
          success: false,
          error: data.error || 'Failed to fetch question',
        };
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
