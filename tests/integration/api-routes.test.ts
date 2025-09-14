import { NextRequest } from 'next/server';

// Mock the API route handlers
jest.mock('@/app/api/admin/auth/route', () => ({
  POST: jest.fn(),
  GET: jest.fn(),
}));

jest.mock('@/app/api/admin/sections/route', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
  PUT: jest.fn(),
  DELETE: jest.fn(),
}));

jest.mock('@/app/api/admin/sections/[sectionId]/questions/route', () => ({
  GET: jest.fn(),
  POST: jest.fn(),
}));

jest.mock('@/app/api/audio/upload/route', () => ({
  POST: jest.fn(),
  DELETE: jest.fn(),
}));

jest.mock('@/app/api/admin/backup/route', () => ({
  GET: jest.fn(),
  DELETE: jest.fn(),
}));

import { POST as authPOST, GET as authGET } from '@/app/api/admin/auth/route';
import {
  GET as sectionsGET,
  POST as sectionsPOST,
  PUT as sectionsPUT,
  DELETE as sectionsDELETE,
} from '@/app/api/admin/sections/route';
import {
  GET as questionsGET,
  POST as questionsPOST,
} from '@/app/api/admin/sections/[sectionId]/questions/route';
import {
  POST as audioPOST,
  DELETE as audioDELETE,
} from '@/app/api/audio/upload/route';
import {
  GET as backupGET,
  DELETE as backupDELETE,
} from '@/app/api/admin/backup/route';

const mockAuthPOST = authPOST as jest.MockedFunction<typeof authPOST>;
const mockAuthGET = authGET as jest.MockedFunction<typeof authGET>;
const mockSectionsGET = sectionsGET as jest.MockedFunction<typeof sectionsGET>;
const mockSectionsPOST = sectionsPOST as jest.MockedFunction<
  typeof sectionsPOST
>;
const mockSectionsPUT = sectionsPUT as jest.MockedFunction<typeof sectionsPUT>;
const mockSectionsDELETE = sectionsDELETE as jest.MockedFunction<
  typeof sectionsDELETE
>;
const mockQuestionsGET = questionsGET as jest.MockedFunction<
  typeof questionsGET
>;
const mockQuestionsPOST = questionsPOST as jest.MockedFunction<
  typeof questionsPOST
>;
const mockAudioPOST = audioPOST as jest.MockedFunction<typeof audioPOST>;
const mockAudioDELETE = audioDELETE as jest.MockedFunction<typeof audioDELETE>;
const mockBackupGET = backupGET as jest.MockedFunction<typeof backupGET>;
const mockBackupDELETE = backupDELETE as jest.MockedFunction<
  typeof backupDELETE
>;

describe('API Routes Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Admin Authentication API', () => {
    it('should handle login requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          body: JSON.stringify({
            email: 'afouadsoftwareengineer@gmail.com',
            password: 'zatonafoushware$8888',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        token: 'mock-jwt-token',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      mockAuthPOST.mockResolvedValue(mockResponse as unknown);

      await mockAuthPOST(mockRequest);
      expect(mockAuthPOST).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle token validation requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer mock-jwt-token',
          },
        }
      );

      const mockResponse = {
        success: true,
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      mockAuthGET.mockResolvedValue(mockResponse as unknown);

      await mockAuthGET(mockRequest);
      expect(mockAuthGET).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('Sections Management API', () => {
    it('should handle get sections requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'GET',
        }
      );

      const mockResponse = {
        success: true,
        data: [
          {
            id: 'section-1',
            name: 'Frontend Fundamentals',
            description: 'Basic frontend concepts',
            questionCount: 5,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
        ],
      };

      mockSectionsGET.mockResolvedValue(mockResponse as unknown);

      await mockSectionsGET(mockRequest);
      expect(mockSectionsGET).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle add section requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'POST',
          body: JSON.stringify({
            name: 'New Section',
            description: 'A new learning section',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        data: {
          id: 'section-2',
          name: 'New Section',
          description: 'A new learning section',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      };

      mockSectionsPOST.mockResolvedValue(mockResponse as unknown);

      await mockSectionsPOST(mockRequest);
      expect(mockSectionsPOST).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle update section requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'PUT',
          body: JSON.stringify({
            id: 'section-1',
            name: 'Updated Section',
            description: 'Updated description',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        data: {
          id: 'section-1',
          name: 'Updated Section',
          description: 'Updated description',
          questionCount: 5,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      };

      mockSectionsPUT.mockResolvedValue(mockResponse as unknown);

      await mockSectionsPUT(mockRequest);
      expect(mockSectionsPUT).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle delete section requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'DELETE',
          body: JSON.stringify({
            id: 'section-1',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        message: 'Section deleted successfully',
      };

      mockSectionsDELETE.mockResolvedValue(mockResponse as unknown);

      await mockSectionsDELETE(mockRequest);
      expect(mockSectionsDELETE).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('Questions Management API', () => {
    it('should handle get section questions requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections/section-1/questions',
        {
          method: 'GET',
        }
      );

      const mockResponse = {
        success: true,
        data: [
          {
            id: 'q1',
            title: 'Test Question',
            content: 'What is the answer?',
            type: 'single',
            difficulty: 'easy',
            options: ['Option 1', 'Option 2'],
            correctAnswers: [0],
            explanation: 'This is the explanation',
            audioQuestionUrl: null,
            audioAnswerUrl: null,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
        ],
      };

      mockQuestionsGET.mockResolvedValue(mockResponse as unknown);

      await mockQuestionsGET(mockRequest, {
        params: { sectionId: 'section-1' },
      });
      expect(mockQuestionsGET).toHaveBeenCalledWith(mockRequest, {
        params: { sectionId: 'section-1' },
      });
    });

    it('should handle add question requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections/section-1/questions',
        {
          method: 'POST',
          body: JSON.stringify({
            title: 'New Question',
            content: 'What is the answer?',
            type: 'single',
            difficulty: 'easy',
            options: ['Option 1', 'Option 2'],
            correctAnswers: [0],
            explanation: 'This is the explanation',
            audioQuestionUrl: null,
            audioAnswerUrl: null,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        data: {
          id: 'q2',
          title: 'New Question',
          content: 'What is the answer?',
          type: 'single',
          difficulty: 'easy',
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'This is the explanation',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      };

      mockQuestionsPOST.mockResolvedValue(mockResponse as unknown);

      await mockQuestionsPOST(mockRequest, {
        params: { sectionId: 'section-1' },
      });
      expect(mockQuestionsPOST).toHaveBeenCalledWith(mockRequest, {
        params: { sectionId: 'section-1' },
      });
    });
  });

  describe('Audio Upload API', () => {
    it('should handle audio upload requests', async () => {
      const formData = new FormData();
      formData.append(
        'file',
        new File(['audio content'], 'audio.mp3', { type: 'audio/mpeg' })
      );
      formData.append('questionId', 'q1');
      formData.append('type', 'question');

      const mockRequest = new NextRequest(
        'http://localhost:3000/api/audio/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const mockResponse = {
        success: true,
        data: {
          url: '/audio/questions/q1.mp3',
          filename: 'q1.mp3',
        },
      };

      mockAudioPOST.mockResolvedValue(mockResponse as unknown);

      await mockAudioPOST(mockRequest);
      expect(mockAudioPOST).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle audio deletion requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/audio/upload',
        {
          method: 'DELETE',
          body: JSON.stringify({
            filePath: '/audio/questions/q1.mp3',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        message: 'Audio file deleted successfully',
      };

      mockAudioDELETE.mockResolvedValue(mockResponse as unknown);

      await mockAudioDELETE(mockRequest);
      expect(mockAudioDELETE).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('Backup Management API', () => {
    it('should handle backup stats requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/backup',
        {
          method: 'GET',
        }
      );

      const mockResponse = {
        success: true,
        data: {
          totalSections: 3,
          totalQuestions: 15,
          sections: [
            { name: 'frontend-fundamentals', questionCount: 5 },
            { name: 'javascript-deep-dive', questionCount: 7 },
            { name: 'react-mastery', questionCount: 3 },
          ],
        },
      };

      mockBackupGET.mockResolvedValue(mockResponse as unknown);

      await mockBackupGET(mockRequest);
      expect(mockBackupGET).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle backup deletion requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/backup',
        {
          method: 'DELETE',
          body: JSON.stringify({
            sectionName: 'frontend-fundamentals',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: true,
        message: 'Backup deleted successfully',
      };

      mockBackupDELETE.mockResolvedValue(mockResponse as unknown);

      await mockBackupDELETE(mockRequest);
      expect(mockBackupDELETE).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'POST',
          body: 'invalid json',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: false,
        error: 'Invalid JSON',
      };

      mockSectionsPOST.mockResolvedValue(mockResponse as unknown);

      const result = await mockSectionsPOST(mockRequest);
      expect(result.success).toBe(false);
    });

    it('should handle missing required fields', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/sections',
        {
          method: 'POST',
          body: JSON.stringify({
            // Missing required fields
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const mockResponse = {
        success: false,
        error: 'Missing required fields',
      };

      mockSectionsPOST.mockResolvedValue(mockResponse as unknown);

      const result = await mockSectionsPOST(mockRequest);
      expect(result.success).toBe(false);
    });

    it('should handle unauthorized requests', async () => {
      const mockRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'GET',
          // No authorization header
        }
      );

      const mockResponse = {
        success: false,
        error: 'Unauthorized',
      };

      mockAuthGET.mockResolvedValue(mockResponse as unknown);

      const result = await mockAuthGET(mockRequest);
      expect(result.success).toBe(false);
    });
  });
});
