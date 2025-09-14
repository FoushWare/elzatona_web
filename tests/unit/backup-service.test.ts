import { BackupService } from '@/lib/backup-service';
import fs from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('BackupService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock path.join to return predictable paths
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  describe('backupQuestion', () => {
    it('should backup a question to the correct section file', async () => {
      const mockQuestion = {
        id: 'q1',
        title: 'Test Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: ['Option 1', 'Option 2'],
        correctAnswers: [0],
        explanation: 'This is the explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      const existingQuestions = [];
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await BackupService.backupQuestion(
        'frontend-fundamentals',
        mockQuestion
      );

      expect(result.success).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'backup/questions/frontend-fundamentals-questions.json',
        expect.stringContaining('Test Question')
      );
    });

    it('should create backup directory if it does not exist', async () => {
      const mockQuestion = {
        id: 'q1',
        title: 'Test Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: ['Option 1', 'Option 2'],
        correctAnswers: [0],
        explanation: 'This is the explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await BackupService.backupQuestion(
        'frontend-fundamentals',
        mockQuestion
      );

      expect(result.success).toBe(true);
      expect(mockFs.mkdirSync).toHaveBeenCalledWith('backup/questions', {
        recursive: true,
      });
    });

    it('should append to existing questions in backup file', async () => {
      const existingQuestions = [
        {
          id: 'q1',
          title: 'Existing Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'This is the explanation',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      const newQuestion = {
        id: 'q2',
        title: 'New Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'medium' as const,
        options: ['Option A', 'Option B'],
        correctAnswers: [1],
        explanation: 'This is the new explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await BackupService.backupQuestion(
        'frontend-fundamentals',
        newQuestion
      );

      expect(result.success).toBe(true);
      const writeCall = mockFs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string);
      expect(writtenData).toHaveLength(2);
      expect(writtenData[0].title).toBe('Existing Question');
      expect(writtenData[1].title).toBe('New Question');
    });
  });

  describe('getBackupStats', () => {
    it('should return backup statistics', async () => {
      const mockFiles = [
        'frontend-fundamentals-questions.json',
        'javascript-deep-dive-questions.json',
        'react-mastery-questions.json',
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(mockFiles as unknown as string[]);
      mockFs.readFileSync.mockImplementation(filePath => {
        if (filePath.includes('frontend-fundamentals')) {
          return JSON.stringify([{ id: 'q1' }, { id: 'q2' }]); // 2 questions
        } else if (filePath.includes('javascript-deep-dive')) {
          return JSON.stringify([{ id: 'q1' }]); // 1 question
        } else if (filePath.includes('react-mastery')) {
          return JSON.stringify([]); // 0 questions
        }
        return JSON.stringify([]);
      });

      const result = await BackupService.getBackupStats();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        totalSections: 3,
        totalQuestions: 3,
        sections: [
          { name: 'frontend-fundamentals', questionCount: 2 },
          { name: 'javascript-deep-dive', questionCount: 1 },
          { name: 'react-mastery', questionCount: 0 },
        ],
      });
    });

    it('should return empty stats if backup directory does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await BackupService.getBackupStats();

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        totalSections: 0,
        totalQuestions: 0,
        sections: [],
      });
    });
  });

  describe('getSectionBackup', () => {
    it('should return questions for a specific section', async () => {
      const mockQuestions = [
        {
          id: 'q1',
          title: 'Question 1',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'This is the explanation',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockQuestions));

      const result = await BackupService.getSectionBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockQuestions);
    });

    it('should return empty array if section backup does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await BackupService.getSectionBackup(
        'non-existent-section'
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });
  });

  describe('deleteSectionBackup', () => {
    it('should delete section backup file', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {});

      const result = await BackupService.deleteSectionBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(true);
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(
        'backup/questions/frontend-fundamentals-questions.json'
      );
    });

    it('should handle non-existent backup file', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await BackupService.deleteSectionBackup(
        'non-existent-section'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('should handle file deletion errors', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = await BackupService.deleteSectionBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Permission denied');
    });
  });

  describe('restoreFromBackup', () => {
    it('should restore questions from backup to main data', async () => {
      const mockBackupQuestions = [
        {
          id: 'q1',
          title: 'Backup Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'This is the explanation',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockBackupQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await BackupService.restoreFromBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(true);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'data/questions/frontend-fundamentals-questions.json',
        JSON.stringify(mockBackupQuestions, null, 2)
      );
    });

    it('should handle non-existent backup file during restore', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await BackupService.restoreFromBackup(
        'non-existent-section'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });
  });
});
