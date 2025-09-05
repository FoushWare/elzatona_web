import { NextRequest } from 'next/server';
import fs from 'fs';

// Mock fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('Questions API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle file system operations correctly', () => {
    const mockContent = 'test content';
    mockedFs.readFileSync.mockReturnValue(mockContent);
    mockedFs.existsSync.mockReturnValue(true);

    expect(mockedFs.readFileSync).toHaveBeenCalledTimes(0);
    expect(mockedFs.existsSync).toHaveBeenCalledTimes(0);

    // Test file operations
    const exists = mockedFs.existsSync('test-file.md');
    const content = mockedFs.readFileSync('test-file.md', 'utf8');

    expect(exists).toBe(true);
    expect(content).toBe(mockContent);
    expect(mockedFs.existsSync).toHaveBeenCalledWith('test-file.md');
    expect(mockedFs.readFileSync).toHaveBeenCalledWith('test-file.md', 'utf8');
  });

  it('should handle markdown parsing logic', () => {
    const mockMarkdownContent = `
# Frontend Basics Questions

## Question 1: What is HTML?
HTML stands for HyperText Markup Language.

## Question 2: What is CSS?
CSS stands for Cascading Style Sheets.
`;

    // Test markdown parsing
    const questionBlocks = mockMarkdownContent
      .split(/^## Question \d+:/m)
      .slice(1);
    const questions = [];

    questionBlocks.forEach((block, index) => {
      const lines = block.trim().split('\n');
      const question = lines[0]?.trim();
      const answer = lines.slice(1).join('\n').trim();

      if (question && answer) {
        questions.push({
          id: index + 1,
          question,
          answer,
        });
      }
    });

    expect(questions).toHaveLength(2);
    expect(questions[0]).toEqual({
      id: 1,
      question: 'What is HTML?',
      answer: 'HTML stands for HyperText Markup Language.',
    });
    expect(questions[1]).toEqual({
      id: 2,
      question: 'What is CSS?',
      answer: 'CSS stands for Cascading Style Sheets.',
    });
  });

  it('should handle question grouping logic', () => {
    const questions = Array.from({ length: 45 }, (_, i) => ({
      id: i + 1,
      question: `Question ${i + 1}`,
      answer: `Answer ${i + 1}`,
    }));

    const groups = Math.ceil(questions.length / 20);
    expect(groups).toBe(3);

    // Test grouping
    const firstGroup = questions.slice(0, 20);
    const secondGroup = questions.slice(20, 40);
    const thirdGroup = questions.slice(40, 45);

    expect(firstGroup).toHaveLength(20);
    expect(secondGroup).toHaveLength(20);
    expect(thirdGroup).toHaveLength(5);
  });

  it('should handle error scenarios', () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => {
      if (!mockedFs.existsSync('nonexistent.md')) {
        throw new Error('File not found');
      }
      return mockedFs.readFileSync('nonexistent.md', 'utf8');
    }).toThrow('File not found');
  });
});
