import { SectionService } from '@/lib/section-service';
import fs from 'fs';
import path from 'path';

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
  readFileSync: jest.fn().mockReturnValue('[]'),
  writeFileSync: jest.fn().mockImplementation(() => {}),
  existsSync: jest.fn().mockReturnValue(false),
  readdirSync: jest.fn().mockReturnValue([]),
  statSync: jest.fn().mockReturnValue({ isDirectory: () => true }),
  unlinkSync: jest.fn().mockImplementation(() => {}),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => {
    // Return the expected path format for tests
    if (args.includes('sections.json')) {
      return 'data/sections/sections.json';
    }
    if (args.includes('questions') && args.includes('.json')) {
      return `data/questions/${args[args.length - 1]}`;
    }
    return args.join('/');
  }),
  resolve: jest.fn((...args) => args.join('/')),
}));

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('SectionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset all mocks to their default successful state
    mockFs.promises.mkdir.mockResolvedValue(undefined);
    mockFs.promises.readFile.mockResolvedValue('[]');
    mockFs.promises.writeFile.mockResolvedValue(undefined);
    mockFs.promises.access.mockResolvedValue(undefined);
    mockFs.promises.readdir.mockResolvedValue([]);
    mockFs.promises.stat.mockResolvedValue({ isDirectory: () => true });
    mockFs.promises.unlink.mockResolvedValue(undefined);

    // Mock path.join to return predictable paths
    mockPath.join.mockImplementation((...args) => {
      const pathStr = args.join('/');
      if (pathStr.includes('sections.json')) {
        return 'data/sections/sections.json';
      }
      if (pathStr.includes('questions') && pathStr.includes('.json')) {
        return 'data/questions/section-1-questions.json';
      }
      return pathStr;
    });
  });

  describe('initializeDefaultSections', () => {
    it('should create default sections file if it does not exist', async () => {
      mockFs.promises.access.mockRejectedValue(
        new Error('File does not exist')
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      await SectionService.initializeDefaultSections();

      expect(mockFs.promises.access).toHaveBeenCalledWith(
        'data/sections/sections.json'
      );
      expect(mockFs.promises.writeFile).toHaveBeenCalledWith(
        'data/sections/sections.json',
        expect.stringContaining('Frontend Fundamentals')
      );
    });

    it('should not overwrite existing sections file', async () => {
      mockFs.promises.access.mockResolvedValue(undefined);

      await SectionService.initializeDefaultSections();

      expect(mockFs.promises.writeFile).not.toHaveBeenCalled();
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

      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(mockSections));
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.getSections();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockSections);
    });

    it('should return default sections if file does not exist', async () => {
      mockFs.promises.readFile.mockRejectedValue(
        new Error('File does not exist')
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.getSections();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should handle file read errors', async () => {
      // Mock ensureDirectories to throw an error
      mockFs.promises.mkdir.mockRejectedValue(
        new Error('Directory creation failed')
      );

      const result = await SectionService.getSections();

      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed to create data directories');
    });
  });

  describe('addSection', () => {
    it('should add a new section', async () => {
      const existingSections = [];

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.addSection(
        'New Section',
        'A new learning section'
      );

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        name: 'New Section',
        description: 'A new learning section',
        questionCount: 0,
      });
      expect(mockFs.promises.writeFile).toHaveBeenCalled();
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

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );

      const result = await SectionService.addSection(
        'Existing Section',
        'Duplicate section'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Duplicate section name');
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

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

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

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );

      const result = await SectionService.updateSection('non-existent', {
        name: 'New Name',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid section ID');
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

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);
      mockFs.promises.unlink.mockResolvedValue(undefined);

      const result = await SectionService.deleteSection('section-1');

      expect(result.success).toBe(true);
      expect(mockFs.promises.unlink).toHaveBeenCalledWith(
        'data/questions/section-1-questions.json'
      );
    });

    it('should return error for non-existent section', async () => {
      const existingSections = [];

      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingSections)
      );

      const result = await SectionService.deleteSection('non-existent');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid section ID');
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

      mockFs.promises.readFile.mockResolvedValue(JSON.stringify(mockQuestions));

      const result = await SectionService.getSectionQuestions('section-1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockQuestions);
    });

    it('should return empty array if questions file does not exist', async () => {
      mockFs.promises.readFile.mockRejectedValue(
        new Error('File does not exist')
      );

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

      mockFs.promises.access.mockResolvedValue(undefined);
      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingQuestions)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.addQuestion('section-1', newQuestion);

      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        title: 'New Question',
        content: 'What is the answer?',
        type: 'single',
        difficulty: 'easy',
      });
      expect(mockFs.promises.writeFile).toHaveBeenCalled();
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

      mockFs.promises.access.mockResolvedValue(undefined);
      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingQuestions)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.addBulkQuestions(
        'section-1',
        newQuestions
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(mockFs.promises.writeFile).toHaveBeenCalled();
    });

    it('should handle incomplete questions', async () => {
      const existingQuestions = [];
      const incompleteQuestions = [
        {
          title: 'Incomplete Question',
          content: 'What is the answer?',
          type: 'single' as const,
          difficulty: 'easy' as const,
          options: [
            { id: 'a', text: 'Option 1', isCorrect: false },
            { id: 'b', text: '', isCorrect: false }, // Empty second option
          ],
          correctAnswers: ['a'],
          explanation: '',
          audioQuestionUrl: null,
          audioAnswerUrl: null,
        },
      ];

      mockFs.promises.access.mockResolvedValue(undefined);
      mockFs.promises.readFile.mockResolvedValue(
        JSON.stringify(existingQuestions)
      );
      mockFs.promises.writeFile.mockResolvedValue(undefined);

      const result = await SectionService.addBulkQuestions(
        'section-1',
        incompleteQuestions
      );

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      // Should preserve the provided options structure
      expect(result.data[0].options).toHaveLength(2);
      expect(result.data[0].options[0].text).toBe('Option 1');
      expect(result.data[0].options[1].text).toBe('');
    });
  });
});
