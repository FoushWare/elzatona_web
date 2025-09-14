import { SectionService } from '@/lib/section-service';
import { BackupService } from '@/lib/backup-service';
import fs from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('Section Management Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockImplementation((...args) => args.join('/'));
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
        options: ['Option 1', 'Option 2'],
        correctAnswers: [0],
        explanation: 'This is the explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      // Mock file system operations
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.mkdirSync.mockImplementation(() => {});

      // Step 1: Initialize default sections
      await SectionService.initializeDefaultSections();

      // Step 2: Add new section
      const addResult = await SectionService.addSection(newSection);
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
      const backupResult = await BackupService.backupQuestion(
        sectionId,
        mockQuestion
      );
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
      expect(backupStats.success).toBe(true);

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
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'Explanation 1',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
        {
          title: 'Bulk Question 2',
          content: 'What is the answer?',
          type: 'multiple' as const,
          difficulty: 'medium' as const,
          options: ['Option A', 'Option B', 'Option C'],
          correctAnswers: [0, 1],
          explanation: 'Explanation 2',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
        {
          title: 'Incomplete Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: ['Option 1'], // Missing second option
          correctAnswers: [0],
          explanation: '', // Empty explanation
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});

      // Add bulk questions
      const bulkResult = await SectionService.addBulkQuestions(
        sectionId,
        bulkQuestions
      );
      expect(bulkResult.success).toBe(true);
      expect(bulkResult.data).toHaveLength(3);

      // Verify incomplete question was handled
      const incompleteQuestion = (
        bulkResult.data as Array<{ title: string; options: string[] }>
      ).find(q => q.title === 'Incomplete Question');
      expect(incompleteQuestion.options).toHaveLength(2); // Should add empty second option
      expect(incompleteQuestion.options[1]).toBe('');

      // Backup all questions
      for (const question of bulkResult.data as Array<{
        id: string;
        title: string;
      }>) {
        const backupResult = await BackupService.backupQuestion(
          sectionId,
          question
        );
        expect(backupResult.success).toBe(true);
      }

      // Verify backup stats
      const backupStats = await BackupService.getBackupStats();
      expect(backupStats.success).toBe(true);
      expect(backupStats.data.totalQuestions).toBe(3);
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
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
          explanation: 'Explanation 1',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 'q2',
          title: 'Question 2',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'medium' as const,
          options: ['Option A', 'Option B'],
          correctAnswers: [1],
          explanation: 'Explanation 2',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
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
      const mockQuestions = [
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
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      // Backup question
      const backupResult = await BackupService.backupQuestion(
        sectionId,
        mockQuestions[0]
      );
      expect(backupResult.success).toBe(true);

      // Get backup stats
      const backupStats = await BackupService.getBackupStats();
      expect(backupStats.success).toBe(true);
      expect(backupStats.data.totalQuestions).toBe(1);

      // Get section backup
      const sectionBackup = await BackupService.getSectionBackup(sectionId);
      expect(sectionBackup.success).toBe(true);
      expect(sectionBackup.data).toHaveLength(1);

      // Restore from backup
      const restoreResult = await BackupService.restoreFromBackup(sectionId);
      expect(restoreResult.success).toBe(true);

      // Verify restore wrote to correct location
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'data/questions/backup-restore-section-questions.json',
        JSON.stringify(mockQuestions, null, 2)
      );
    });
  });

  describe('Error Recovery Integration', () => {
    it('should handle file system errors gracefully', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File system error');
      });

      const result = await SectionService.getSections();
      expect(result.success).toBe(false);
      expect(result.error).toContain('File system error');
    });

    it('should handle corrupted JSON files', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('invalid json content');

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
        options: ['Option 1', 'Option 2'],
        correctAnswers: [0],
        explanation: 'This is the explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      mockFs.existsSync.mockReturnValue(false);
      mockFs.mkdirSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = await BackupService.backupQuestion(
        'test-section',
        mockQuestion
      );
      expect(result.success).toBe(false);
      expect(result.error).toContain('Permission denied');
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
        title: 'Concurrent Question',
        content: 'What is the answer?',
        type: 'single' as const,
        difficulty: 'easy' as const,
        options: ['Option 1', 'Option 2'],
        correctAnswers: [0],
        explanation: 'This is the explanation',
        audioQuestionUrl: null,
        audioAnswerUrl: null,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue('[]');
      mockFs.writeFileSync.mockImplementation(() => {});

      // Run multiple operations concurrently
      const operations = [
        SectionService.addQuestion(sectionId, mockQuestion),
        BackupService.backupQuestion(sectionId, mockQuestion),
        SectionService.getSectionQuestions(sectionId),
        BackupService.getBackupStats(),
      ];

      const results = await Promise.all(operations);

      // All operations should succeed
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
    });
  });
});
