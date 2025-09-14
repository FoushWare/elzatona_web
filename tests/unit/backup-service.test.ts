import { BackupService } from '@/lib/backup-service';

// Mock fs module using promises API
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn().mockResolvedValue('[]'),
    writeFile: jest.fn().mockResolvedValue(undefined),
    access: jest.fn().mockResolvedValue(undefined),
    readdir: jest.fn().mockResolvedValue([]),
    stat: jest.fn().mockResolvedValue({ isDirectory: () => true }),
    unlink: jest.fn().mockResolvedValue(undefined),
  },
  mkdirSync: jest.fn().mockImplementation(() => {}),
  readFileSync: jest.fn().mockReturnValue('[]'),
  writeFileSync: jest.fn().mockImplementation(() => {}),
  existsSync: jest.fn().mockReturnValue(false),
  readdirSync: jest.fn().mockReturnValue([]),
  statSync: jest.fn().mockReturnValue({ isDirectory: () => true }),
  unlinkSync: jest.fn().mockImplementation(() => {}),
}));

jest.mock('path', () => ({
  join: jest.fn().mockImplementation((...args) => args.join('/')),
  resolve: jest.fn().mockImplementation((...args) => args.join('/')),
}));

// Get mocked modules
const mockFs = jest.mocked(require('fs'));
const mockPath = jest.mocked(require('path'));

describe('BackupService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset all fs mocks to default successful state
    Object.values(mockFs.promises).forEach(mock => {
      if (typeof mock === 'function' && 'mockResolvedValue' in mock) {
        mock.mockResolvedValue(undefined);
      }
    });
    
    // Reset synchronous fs mocks
    mockFs.mkdirSync.mockImplementation(() => {});
    mockFs.readFileSync.mockReturnValue('[]');
    mockFs.writeFileSync.mockImplementation(() => {});
    mockFs.existsSync.mockReturnValue(false);
    mockFs.readdirSync.mockReturnValue([]);
    mockFs.statSync.mockReturnValue({ isDirectory: () => true });
    mockFs.unlinkSync.mockImplementation(() => {});
    
    // Reset path mocks
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockPath.resolve.mockImplementation((...args) => args.join('/'));
  });

  describe('backupQuestion', () => {
    it('should backup a question to the correct section file', async () => {
      const mockQuestion = {
        id: 'q1',
        title: 'Test Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        section: 'frontend-fundamentals',
        options: [
          { id: 'a', text: 'Option 1', isCorrect: true },
          { id: 'b', text: 'Option 2', isCorrect: false }
        ],
        correctAnswers: ['a'],
        explanation: 'This is the explanation',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      const existingQuestions = [];
      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(existingQuestions));
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await BackupService.backupQuestion(mockQuestion);

      expect(result.success).toBe(true);
      expect(mockFs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('backup/questions/frontend-fundamentals-questions.json'),
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
        section: 'frontend-fundamentals',
        options: [
          { id: 'a', text: 'Option 1', isCorrect: true },
          { id: 'b', text: 'Option 2', isCorrect: false }
        ],
        correctAnswers: ['a'],
        explanation: 'This is the explanation',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      // Mock readFile to throw (file doesn't exist)
      mockFs.promises.readFile.mockRejectedValue(new Error('File not found'));
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await BackupService.backupQuestion(mockQuestion);

      expect(result.success).toBe(true);
      expect(mockFs.promises.mkdir).toHaveBeenCalledWith(
        expect.stringContaining('backup/questions'),
        { recursive: true }
      );
    });

    it('should append to existing questions in backup file', async () => {
      const existingQuestions = [
        {
          id: 'q1',
          title: 'Existing Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          section: 'frontend-fundamentals',
          options: [
            { id: 'a', text: 'Option 1', isCorrect: true },
            { id: 'b', text: 'Option 2', isCorrect: false }
          ],
          correctAnswers: ['a'],
          explanation: 'This is the explanation',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isActive: true,
        },
      ];

      const newQuestion = {
        id: 'q2',
        title: 'New Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'medium' as const,
        section: 'frontend-fundamentals',
        options: [
          { id: 'a', text: 'Option A', isCorrect: false },
          { id: 'b', text: 'Option B', isCorrect: true }
        ],
        correctAnswers: ['b'],
        explanation: 'This is the new explanation',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(existingQuestions));
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await BackupService.backupQuestion(newQuestion);

      expect(result.success).toBe(true);
      const writeCall = mockFs.promises.writeFile.mock.calls[0];
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

      mockFs.promises.readdir.mockResolvedValue(mockFiles as unknown as string[]);
      mockFs.promises.readFile.mockImplementation(filePath => {
        if (filePath.includes('frontend-fundamentals')) {
          return Promise.resolve(JSON.stringify([{ id: 'q1' }, { id: 'q2' }])); // 2 questions
        } else if (filePath.includes('javascript-deep-dive')) {
          return Promise.resolve(JSON.stringify([{ id: 'q1' }])); // 1 question
        } else if (filePath.includes('react-mastery')) {
          return Promise.resolve(JSON.stringify([])); // 0 questions
        }
        return Promise.resolve(JSON.stringify([]));
      });

      const result = await BackupService.getBackupStats();

      expect(result).toEqual({
        totalFiles: 3,
        totalQuestions: 3,
        sections: {
          'frontend-fundamentals': 2,
          'javascript-deep-dive': 1,
          'react-mastery': 0,
        },
      });
    });

    it('should return empty stats if backup directory does not exist', async () => {
      mockFs.promises.readdir.mockRejectedValue(new Error('Directory not found'));

      const result = await BackupService.getBackupStats();

      expect(result).toEqual({
        totalFiles: 0,
        totalQuestions: 0,
        sections: {},
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
          section: 'frontend-fundamentals',
          options: [
            { id: 'a', text: 'Option 1', isCorrect: true },
            { id: 'b', text: 'Option 2', isCorrect: false }
          ],
          correctAnswers: ['a'],
          explanation: 'This is the explanation',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isActive: true,
        },
      ];

      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(mockQuestions));

      const result = await BackupService.getSectionBackup(
        'frontend-fundamentals'
      );

      expect(result).toEqual(mockQuestions);
    });

    it('should return empty array if section backup does not exist', async () => {
      mockFs.promises.readFile.mockRejectedValue(new Error('File not found'));

      const result = await BackupService.getSectionBackup(
        'non-existent-section'
      );

      expect(result).toEqual([]);
    });
  });

  describe('deleteSectionBackup', () => {
    it('should delete section backup file', async () => {
      mockFs.promises.unlink.mockResolvedValue(undefined);

      const result = await BackupService.deleteSectionBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(true);
      expect(mockFs.promises.unlink).toHaveBeenCalledWith(
        expect.stringContaining('backup/questions/frontend-fundamentals-questions.json')
      );
    });

    it('should handle non-existent backup file', async () => {
      mockFs.promises.unlink.mockRejectedValue(new Error('File not found'));

      const result = await BackupService.deleteSectionBackup(
        'non-existent-section'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('should handle file deletion errors', async () => {
      mockFs.promises.unlink.mockRejectedValue(new Error('Permission denied'));

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
          section: 'frontend-fundamentals',
          options: [
            { id: 'a', text: 'Option 1', isCorrect: true },
            { id: 'b', text: 'Option 2', isCorrect: false }
          ],
          correctAnswers: ['a'],
          explanation: 'This is the explanation',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isActive: true,
        },
      ];

      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(mockBackupQuestions));

      const result = await BackupService.restoreFromBackup(
        'frontend-fundamentals'
      );

      expect(result.success).toBe(true);
      expect(result.questionsRestored).toBe(1);
    });

    it('should handle non-existent backup file during restore', async () => {
      mockFs.promises.readFile.mockRejectedValue(new Error('File not found'));

      const result = await BackupService.restoreFromBackup(
        'non-existent-section'
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain('No backup questions found');
    });
  });
});
