import { SectionService } from '@/lib/section-service';
import fs from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('SectionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock path.join to return predictable paths
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  describe('initializeDefaultSections', () => {
    it('should create default sections file if it does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);
      mockFs.writeFileSync.mockImplementation(() => {});

      await SectionService.initializeDefaultSections();

      expect(mockFs.existsSync).toHaveBeenCalledWith(
        'data/sections/sections.json'
      );
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        'data/sections/sections.json',
        expect.stringContaining('Frontend Fundamentals')
      );
    });

    it('should not overwrite existing sections file', async () => {
      mockFs.existsSync.mockReturnValue(true);

      await SectionService.initializeDefaultSections();

      expect(mockFs.writeFileSync).not.toHaveBeenCalled();
    });
  });

  describe('getSections', () => {
    it('should return sections from file', async () => {
      const mockSections = [
        {
          id: 'section-1',
          name: 'Frontend Fundamentals',
          description: 'Basic frontend concepts',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockSections));

      const result = await SectionService.getSections();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSections);
    });

    it('should return empty array if file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await SectionService.getSections();

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should handle file read errors', async () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      const result = await SectionService.getSections();

      expect(result.success).toBe(false);
      expect(result.error).toContain('File read error');
    });
  });

  describe('addSection', () => {
    it('should add a new section', async () => {
      const existingSections = [];
      const newSection = {
        name: 'New Section',
        description: 'A new learning section',
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await SectionService.addSection(newSection);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        name: 'New Section',
        description: 'A new learning section',
        questionCount: 0,
      });
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('should prevent duplicate section names', async () => {
      const existingSections = [
        {
          id: 'section-1',
          name: 'Existing Section',
          description: 'An existing section',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));

      const result = await SectionService.addSection({
        name: 'Existing Section',
        description: 'Duplicate section',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('already exists');
    });
  });

  describe('updateSection', () => {
    it('should update an existing section', async () => {
      const existingSections = [
        {
          id: 'section-1',
          name: 'Old Name',
          description: 'Old description',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await SectionService.updateSection('section-1', {
        name: 'New Name',
        description: 'New description',
      });

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        id: 'section-1',
        name: 'New Name',
        description: 'New description',
      });
    });

    it('should return error for non-existent section', async () => {
      const existingSections = [];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));

      const result = await SectionService.updateSection('non-existent', {
        name: 'New Name',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });
  });

  describe('deleteSection', () => {
    it('should delete a section and its questions file', async () => {
      const existingSections = [
        {
          id: 'section-1',
          name: 'Section to Delete',
          description: 'This section will be deleted',
          questionCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));
      mockFs.writeFileSync.mockImplementation(() => {});
      mockFs.unlinkSync.mockImplementation(() => {});

      const result = await SectionService.deleteSection('section-1');

      expect(result.success).toBe(true);
      expect(mockFs.unlinkSync).toHaveBeenCalledWith(
        'data/questions/section-1-questions.json'
      );
    });

    it('should return error for non-existent section', async () => {
      const existingSections = [];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingSections));

      const result = await SectionService.deleteSection('non-existent');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });
  });

  describe('getSectionQuestions', () => {
    it('should return questions for a section', async () => {
      const mockQuestions = [
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
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockQuestions));

      const result = await SectionService.getSectionQuestions('section-1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockQuestions);
    });

    it('should return empty array if questions file does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false);

      const result = await SectionService.getSectionQuestions('section-1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });
  });

  describe('addQuestion', () => {
    it('should add a question to a section', async () => {
      const existingQuestions = [];
      const newQuestion = {
        title: 'New Question',
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
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await SectionService.addQuestion('section-1', newQuestion);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        title: 'New Question',
        content: 'What is the answer?',
        type: 'single',
        difficulty: 'easy',
      });
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('addBulkQuestions', () => {
    it('should add multiple questions to a section', async () => {
      const existingQuestions = [];
      const newQuestions = [
        {
          title: 'Question 1',
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
          title: 'Question 2',
          content: 'What is the answer?',
          type: 'multiple' as const,
          difficulty: 'medium' as const,
          options: ['Option A', 'Option B', 'Option C'],
          correctAnswers: [0, 1],
          explanation: 'Explanation 2',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await SectionService.addBulkQuestions(
        'section-1',
        newQuestions
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    it('should handle incomplete questions', async () => {
      const existingQuestions = [];
      const incompleteQuestions = [
        {
          title: 'Incomplete Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: ['Option 1'], // Missing second option
          correctAnswers: [0],
          explanation: '',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
      ];

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(existingQuestions));
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = await SectionService.addBulkQuestions(
        'section-1',
        incompleteQuestions
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      // Should add empty second option for incomplete question
      expect(result.data[0].options).toHaveLength(2);
      expect(result.data[0].options[1]).toBe('');
    });
  });
});
