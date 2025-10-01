import { SectionService } from '@/lib/section-service';
import { BackupService } from '@/lib/backup-service';

// Mock fs module
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
  mkdir: jest.fn().mockImplementation((path, options, callback) => {
    if (callback) callback(null);
  }),
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

const mockFs = jest.mocked(require('fs'));
const mockPath = jest.mocked(require('path'));

describe('Section Management Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset all fs.promises mocks to successful defaults
    mockFs.promises.mkdir.mockResolvedValue(undefined);
    mockFs.promises.readFile.mockResolvedValue('[]');
    mockFs.promises.writeFile.mockResolvedValue(undefined);
    mockFs.promises.access.mockResolvedValue(undefined);
    mockFs.promises.readdir.mockResolvedValue([]);
    mockFs.promises.stat.mockResolvedValue({ isDirectory: () => true });
    mockFs.promises.unlink.mockResolvedValue(undefined);

    // Reset synchronous fs mocks
    mockFs.mkdir.mockImplementation((path, options, callback) => {
      if (callback) callback(null);
    });
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

  describe('Complete Section Management Flow', () => {
    it('should complete full section lifecycle from creation to deletion', async () => {
      const newSection = {
        name: 'Integration Test Section',
        description: 'A section for integration testing',
      };

      const mockQuestion = {
        id: 'q1',
        title: 'Integration Test Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: [
          { id: 'opt1', text: 'Option 1', isCorrect: true },
          { id: 'opt2', text: 'Option 2', isCorrect: false },
        ],
        correctAnswers: ['opt1'],
        explanation: 'This is the explanation',
        audioQuestion: null,
        audioAnswer: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      // Track sections state
      let sectionsState: unknown[] = [];

      // Mock file system operations
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation((path, data) => {
        if (path.includes('sections.json')) {
          sectionsState = JSON.parse(data);
        }
      });
      mockFs.mkdirSync.mockImplementation(() => {});
      mockFs.promises.readFile.mockImplementation(filePath => {
        if (filePath.includes('sections.json')) {
          return Promise.resolve(JSON.stringify(sectionsState));
        } else if (filePath.includes('-questions.json')) {
          return Promise.resolve(JSON.stringify([mockQuestion]));
        }
        return Promise.resolve('[]');
      });
      mockFs.promises.writeFile.mockImplementation(async (path, data) => {
        if (path.includes('sections.json')) {
          sectionsState = JSON.parse(data);
        }
      });
      mockFs.promises.mkdir.mockResolvedValue(undefined);
      mockFs.promises.readdir.mockImplementation(path => {
        if (path.includes('backup') || path.includes('questions')) {
          return Promise.resolve([`${sectionId}-questions.json`]);
        }
        return Promise.resolve([]);
      });

      // Step 1: Initialize default sections
      await SectionService.initializeDefaultSections();

      // Step 2: Add new section
      const addResult = await SectionService.addSection(
        newSection.name,
        newSection.description
      );
      expect(addResult.success).toBe(true);
      expect(addResult.data).toMatchObject({
        name: 'Integration Test Section',
        description: 'A section for integration testing',
        questionCount: 0,
      });

      const sectionId = (addResult.data as { id: string }).id;

      // Step 3: Add question to section
      const questionResult = await SectionService.addQuestion(
        sectionId,
        mockQuestion
      );
      expect(questionResult.success).toBe(true);

      // Step 4: Backup question
      const backupQuestion = { ...mockQuestion, section: sectionId };
      const backupResult = await BackupService.backupQuestion(backupQuestion);
      expect(backupResult.success).toBe(true);

      // Step 5: Get section questions
      const questionsResult =
        await SectionService.getSectionQuestions(sectionId);
      expect(questionsResult.success).toBe(true);
      expect(questionsResult.data).toHaveLength(1);

      // Step 6: Update section
      const updateResult = await SectionService.updateSection(sectionId, {
        name: 'Updated Integration Test Section',
        description: 'Updated description',
      });
      expect(updateResult.success).toBe(true);

      // Step 7: Get backup stats
      const backupStats = await BackupService.getBackupStats();
      expect(backupStats.totalQuestions).toBe(1);

      // Step 8: Delete section
      mockFs.unlinkSync.mockImplementation(() => {});
      const deleteResult = await SectionService.deleteSection(sectionId);
      expect(deleteResult.success).toBe(true);
    });

    it('should handle bulk question operations', async () => {
      const sectionId = 'bulk-test-section';
      const bulkQuestions = [
        {
          title: 'Bulk Question 1',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: [
            { id: 'opt1', text: 'Option 1', isCorrect: true },
            { id: 'opt2', text: 'Option 2', isCorrect: false },
          ],
          correctAnswers: ['opt1'],
          explanation: 'Explanation 1',
          audioQuestion: null,
          audioAnswer: null,
        },
        {
          title: 'Bulk Question 2',
          content: 'What is the answer?',
          type: 'multiple' as const,
          difficulty: 'medium' as const,
          options: [
            { id: 'opt1', text: 'Option A', isCorrect: true },
            { id: 'opt2', text: 'Option B', isCorrect: true },
            { id: 'opt3', text: 'Option C', isCorrect: false },
          ],
          correctAnswers: ['opt1', 'opt2'],
          explanation: 'Explanation 2',
          audioQuestion: null,
          audioAnswer: null,
        },
        {
          title: 'Incomplete Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: [
            { id: 'opt1', text: 'Option 1', isCorrect: true },
            { id: 'opt2', text: '', isCorrect: false }, // Empty second option
          ],
          correctAnswers: ['opt1'],
          explanation: '', // Empty explanation
          audioQuestion: null,
          audioAnswer: null,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.promises.readFile.mockImplementation(filePath => {
        if (filePath.includes('sections.json')) {
          return Promise.resolve('[]');
        } else if (filePath.includes('-questions.json')) {
          return Promise.resolve(JSON.stringify(bulkQuestions));
        }
        return Promise.resolve('[]');
      });
      mockFs.promises.writeFile.mockResolvedValue(undefined);
      mockFs.promises.mkdir.mockResolvedValue(undefined);
      mockFs.promises.readdir.mockResolvedValue([
        'bulk-test-section-questions.json',
      ]);

      // Add bulk questions
      const bulkResult = await SectionService.addBulkQuestions(
        sectionId,
        bulkQuestions
      );
      expect(bulkResult.success).toBe(true);
      expect(bulkResult.data).toHaveLength(3);

      // Verify incomplete question was handled
      const incompleteQuestion = (
        bulkResult.data as Array<{
          title: string;
          options: Array<{ text: string }>;
        }>
      ).find(q => q.title === 'Incomplete Question');
      expect(incompleteQuestion.options).toHaveLength(2); // Should add empty second option
      expect(incompleteQuestion.options[1].text).toBe('');

      // Backup all questions
      for (const question of bulkResult.data as Array<{
        id: string;
        title: string;
      }>) {
        const backupQuestion = { ...question, section: sectionId };
        const backupResult = await BackupService.backupQuestion(backupQuestion);
        expect(backupResult.success).toBe(true);
      }

      // Verify backup stats
      const backupStats = await BackupService.getBackupStats();
      expect(backupStats.totalQuestions).toBe(3);
    });
  });

  describe('Data Consistency Integration', () => {
    it('should maintain consistency between sections and questions', async () => {
      const sectionId = 'consistency-test-section';
      const mockQuestions = [
        {
          id: 'q1',
          title: 'Question 1',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: [
            { id: 'opt1', text: 'Option 1', isCorrect: true },
            { id: 'opt2', text: 'Option 2', isCorrect: false },
          ],
          correctAnswers: ['opt1'],
          explanation: 'Explanation 1',
          audioQuestion: null,
          audioAnswer: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isActive: true,
        },
        {
          id: 'q2',
          title: 'Incomplete Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'medium' as const,
          options: [
            { id: 'opt1', text: 'Option A', isCorrect: false },
            { id: 'opt2', text: '', isCorrect: false }, // Empty second option
          ],
          correctAnswers: ['opt1'],
          explanation: 'Explanation 2',
          audioQuestion: null,
          audioAnswer: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          isActive: true,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(filePath => {
        if (filePath.includes('sections.json')) {
          return JSON.stringify([
            {
              id: sectionId,
              name: 'Test Section',
              description: 'Test description',
              questionCount: 2,
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
            },
          ]);
        } else if (filePath.includes('questions.json')) {
          return JSON.stringify(mockQuestions);
        }
        return '[]';
      });
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.promises.readFile.mockImplementation(filePath => {
        if (filePath.includes('sections.json')) {
          return Promise.resolve(
            JSON.stringify([
              {
                id: sectionId,
                name: 'Test Section',
                description: 'Test description',
                questionCount: 2,
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
              },
            ])
          );
        } else if (filePath.includes('questions.json')) {
          return Promise.resolve(JSON.stringify(mockQuestions));
        }
        return Promise.resolve('[]');
      });
      mockFs.promises.writeFile.mockResolvedValue(undefined);
      mockFs.promises.mkdir.mockResolvedValue(undefined);

      // Get sections
      const sectionsResult = await SectionService.getSections();
      expect(sectionsResult.success).toBe(true);
      expect(sectionsResult.data).toHaveLength(1);
      expect(
        (sectionsResult.data as Array<{ questionCount: number }>)[0]
          .questionCount
      ).toBe(2);

      // Get questions for section
      const questionsResult =
        await SectionService.getSectionQuestions(sectionId);
      expect(questionsResult.success).toBe(true);
      expect(questionsResult.data).toHaveLength(2);

      // Verify question count matches
      const section = (
        sectionsResult.data as Array<{ questionCount: number }>
      )[0];
      const questions = questionsResult.data as Array<{ id: string }>;
      expect(section.questionCount).toBe(questions.length);
    });

    it('should handle backup and restore operations', async () => {
      const sectionId = 'backup-restore-section';
      const mockQuestion = {
        id: 'q1',
        title: 'Backup Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        section: sectionId,
        options: [
          { id: 'opt1', text: 'Option 1', isCorrect: true },
          { id: 'opt2', text: 'Option 2', isCorrect: false },
        ],
        correctAnswers: ['opt1'],
        explanation: 'This is the explanation',
        audioQuestion: null,
        audioAnswer: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify([]));
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.promises.readFile.mockImplementation(filePath => {
        if (filePath.includes('sections.json')) {
          return Promise.resolve('[]');
        } else if (filePath.includes('-questions.json')) {
          return Promise.resolve(JSON.stringify([mockQuestion]));
        }
        return Promise.resolve('[]');
      });
      mockFs.promises.writeFile.mockResolvedValue(undefined);
      mockFs.promises.mkdir.mockResolvedValue(undefined);
      mockFs.promises.readdir.mockResolvedValue([
        'backup-restore-section-questions.json',
      ]);

      // Backup question
      const backupResult = await BackupService.backupQuestion(mockQuestion);
      expect(backupResult.success).toBe(true);

      // Get backup stats
      const backupStats = await BackupService.getBackupStats();
      expect(backupStats.totalQuestions).toBe(1);

      // Get section backup
      const sectionBackup = await BackupService.getSectionBackup(sectionId);
      expect(sectionBackup).toHaveLength(1);

      // Restore from backup
      const restoreResult = await BackupService.restoreFromBackup(sectionId);
      expect(restoreResult.success).toBe(true);
      expect(restoreResult.questionsRestored).toBe(1);
    });
  });

  describe('Error Recovery Integration', () => {
    it('should handle file system errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.promises.mkdir.mockRejectedValue(new Error('File system error'));

      const result = await SectionService.getSections();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to create data directories');
    });

    it('should handle corrupted JSON files', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.promises.mkdir.mockResolvedValue(undefined);
      mockFs.promises.readFile.mockResolvedValue('invalid json content');
      mockFs.promises.writeFile.mockRejectedValue(
        new Error('JSON parsing failed')
      );

      const result = await SectionService.getSections();
      expect(result.success).toBe(false);
      expect(result.error).toContain('JSON');
    });

    it('should recover from backup errors', async () => {
      const mockQuestion = {
        id: 'q1',
        title: 'Test Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: [
          { id: 'opt1', text: 'Option 1', isCorrect: true },
          { id: 'opt2', text: 'Option 2', isCorrect: false },
        ],
        correctAnswers: ['opt1'],
        explanation: 'This is the explanation',
        audioQuestion: null,
        audioAnswer: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      mockFs.existsSync.mockReturnValue(false);
      mockFs.promises.mkdir.mockRejectedValue(new Error('Permission denied'));

      const backupQuestion = { ...mockQuestion, section: 'test-section' };
      const result = await BackupService.backupQuestion(backupQuestion);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to create backup directories');
    });
  });

  describe('Performance Integration', () => {
    it('should handle large numbers of questions efficiently', async () => {
      const sectionId = 'performance-test-section';
      const largeQuestionSet = Array.from({ length: 100 }, (_, i) => ({
        title: `Question ${i + 1}`,
        content: `What is the answer to question ${i + 1}?`,
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: [`Option A${i}`, `Option B${i}`],
        correctAnswers: [0],
        explanation: `Explanation for question ${i + 1}`,
        audioQuestionUrl: null,
        audioAnswerUrl: null,
      }));

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});

      const startTime = Date.now();
      const result = await SectionService.addBulkQuestions(
        sectionId,
        largeQuestionSet
      );
      const endTime = Date.now();

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should handle concurrent operations', async () => {
      const sectionId = 'concurrent-test-section';
      const mockQuestion = {
        id: 'q1',
        title: 'Concurrent Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: [
          { id: 'opt1', text: 'Option 1', isCorrect: true },
          { id: 'opt2', text: 'Option 2', isCorrect: false },
        ],
        correctAnswers: ['opt1'],
        explanation: 'This is the explanation',
        audioQuestion: null,
        audioAnswer: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        isActive: true,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.promises.readFile.mockResolvedValue('[]');
      mockFs.promises.writeFile.mockResolvedValue(undefined);
      mockFs.promises.mkdir.mockResolvedValue(undefined);

      // Run multiple operations concurrently
      const operations = [
        SectionService.addQuestion(sectionId, mockQuestion),
        BackupService.backupQuestion({ ...mockQuestion, section: sectionId }),
        SectionService.getSectionQuestions(sectionId),
        BackupService.getBackupStats(),
      ];

      const results = await Promise.all(operations);

      // All operations should succeed
      results.forEach((result, index) => {
        if (index === 3) {
          // getBackupStats returns a plain object, not a result object
          expect(result).toHaveProperty('totalQuestions');
        } else {
          expect(result.success).toBe(true);
        }
      });
    });
  });
});
