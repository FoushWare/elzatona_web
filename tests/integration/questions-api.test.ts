import { NextRequest } from 'next/server';
import { GET } from '@/app/api/questions/[pathId]/route';
import fs from 'fs';

// Mock fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('Questions API Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return questions for valid learning path', async () => {
    // Mock markdown content
    const mockMarkdownContent = `
# Frontend Basics Questions

## Question 1: What is HTML?
HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages.

## Question 2: What is CSS?
CSS stands for Cascading Style Sheets. It's used to style HTML elements.

## Question 3: What is JavaScript?
JavaScript is a programming language that enables interactive web pages.
`;

    // Mock fs.readFileSync to return our mock content
    mockedFs.readFileSync.mockReturnValue(mockMarkdownContent);

    // Mock fs.existsSync to return true
    mockedFs.existsSync.mockReturnValue(true);

    // Create a mock request
    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );

    // Create mock params
    const params = { pathId: 'frontend-basics' };

    // Call the API route
    const response = await GET(request, { params });
    const data = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(3);
    expect(data.totalQuestions).toBe(3);
    expect(data.groups).toBe(1);

    // Check first question
    expect(data.questions[0]).toEqual({
      id: 1,
      question: 'What is HTML?',
      answer:
        "HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages.",
    });
  });

  it('should group questions into chunks of 20', async () => {
    // Create 25 questions
    let mockMarkdownContent = '# Frontend Basics Questions\n\n';
    for (let i = 1; i <= 25; i++) {
      mockMarkdownContent += `## Question ${i}: Test Question ${i}?\nTest Answer ${i}.\n\n`;
    }

    mockedFs.readFileSync.mockReturnValue(mockMarkdownContent);
    mockedFs.existsSync.mockReturnValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );
    const params = { pathId: 'frontend-basics' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(25);
    expect(data.totalQuestions).toBe(25);
    expect(data.groups).toBe(2); // 20 + 5 = 2 groups
  });

  it('should return 404 for non-existent learning path', async () => {
    // Mock fs.existsSync to return false
    mockedFs.existsSync.mockReturnValue(false);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/non-existent'
    );
    const params = { pathId: 'non-existent' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Learning path not found');
  });

  it('should handle malformed markdown gracefully', async () => {
    // Mock malformed markdown content
    const mockMarkdownContent = `
# Frontend Basics Questions

This is not a proper question format.

## Question 1: What is HTML?
HTML stands for HyperText Markup Language.

## Not a question
This is just some text.

## Question 2: What is CSS?
CSS stands for Cascading Style Sheets.
`;

    mockedFs.readFileSync.mockReturnValue(mockMarkdownContent);
    mockedFs.existsSync.mockReturnValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );
    const params = { pathId: 'frontend-basics' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(2); // Only 2 valid questions
    expect(data.totalQuestions).toBe(2);
  });

  it('should handle file read errors', async () => {
    // Mock fs.readFileSync to throw an error
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('File read error');
    });
    mockedFs.existsSync.mockReturnValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );
    const params = { pathId: 'frontend-basics' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to load questions');
  });

  it('should handle empty markdown file', async () => {
    // Mock empty markdown content
    mockedFs.readFileSync.mockReturnValue('');
    mockedFs.existsSync.mockReturnValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );
    const params = { pathId: 'frontend-basics' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(0);
    expect(data.totalQuestions).toBe(0);
    expect(data.groups).toBe(0);
  });

  it('should handle questions with complex formatting', async () => {
    const mockMarkdownContent = `
# Frontend Basics Questions

## Question 1: What is HTML?
HTML stands for **HyperText Markup Language**. It's the standard markup language for creating web pages.

### Key Features:
- Semantic markup
- Accessibility support
- SEO friendly

## Question 2: What is CSS?
CSS stands for *Cascading Style Sheets*. It's used to style HTML elements.

\`\`\`css
body {
  font-family: Arial, sans-serif;
}
\`\`\`
`;

    mockedFs.readFileSync.mockReturnValue(mockMarkdownContent);
    mockedFs.existsSync.mockReturnValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/questions/frontend-basics'
    );
    const params = { pathId: 'frontend-basics' };

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.questions).toHaveLength(2);

    // Check that complex formatting is preserved
    expect(data.questions[0].answer).toContain('**HyperText Markup Language**');
    expect(data.questions[1].answer).toContain('*Cascading Style Sheets*');
    expect(data.questions[1].answer).toContain('```css');
  });
});
