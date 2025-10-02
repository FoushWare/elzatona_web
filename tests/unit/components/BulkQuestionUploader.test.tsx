import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BulkQuestionUploader from '@/components/BulkQuestionUploader';

// Mock the MarkdownQuestionParser
jest.mock('@/lib/markdown-question-parser', () => ({
  MarkdownQuestionParser: {
    parseMarkdown: jest.fn(),
    convertToBulkData: jest.fn(),
  },
}));

// Mock the useUnifiedQuestions hook
jest.mock('@/hooks/useUnifiedQuestions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockMarkdownQuestionParser =
  require('@/lib/markdown-question-parser').MarkdownQuestionParser;
const mockUseUnifiedQuestions = require('@/hooks/useUnifiedQuestions').default;

describe('BulkQuestionUploader', () => {
  const mockBulkImportQuestions = jest.fn();
  const mockOnQuestionsAdded = jest.fn();

  const defaultProps = {
    onQuestionsAdded: mockOnQuestionsAdded,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUnifiedQuestions.mockReturnValue({
      bulkImportQuestions: mockBulkImportQuestions,
    });
  });

  it('should render the component', () => {
    render(<BulkQuestionUploader {...defaultProps} />);

    expect(screen.getByText('Bulk Import Questions')).toBeInTheDocument();
    expect(screen.getByText('Markdown Format')).toBeInTheDocument();
    expect(screen.getByText('JSON Format')).toBeInTheDocument();
  });

  it('should switch between markdown and JSON input modes', () => {
    render(<BulkQuestionUploader {...defaultProps} />);

    // Initially should show markdown input
    expect(screen.getByLabelText('Markdown Input')).toBeInTheDocument();

    // Switch to JSON mode
    const jsonTab = screen.getByText('JSON Format');
    fireEvent.click(jsonTab);

    expect(screen.getByLabelText('JSON Input')).toBeInTheDocument();
  });

  it('should parse markdown and show preview', async () => {
    const mockParsedQuestions = [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A library'],
        explanation: 'React is a library.',
        category: 'React',
        difficulty: 'easy',
      },
    ];

    mockMarkdownQuestionParser.parseMarkdown.mockReturnValue(
      mockParsedQuestions
    );
    mockMarkdownQuestionParser.convertToBulkData.mockReturnValue({
      questions: mockParsedQuestions,
      totalCount: 1,
    });

    render(<BulkQuestionUploader {...defaultProps} />);

    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: '# What is React?\nReact is a JavaScript library.' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
      expect(screen.getByText('What is React?')).toBeInTheDocument();
    });
  });

  it('should parse JSON and show preview', async () => {
    const mockJsonQuestions = [
      {
        title: 'What is Vue?',
        content: 'Vue is a progressive framework.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A framework'],
        explanation: 'Vue is a framework.',
        category: 'Vue',
        difficulty: 'easy',
      },
    ];

    render(<BulkQuestionUploader {...defaultProps} />);

    // Switch to JSON mode
    const jsonTab = screen.getByText('JSON Format');
    fireEvent.click(jsonTab);

    const jsonInput = screen.getByLabelText('JSON Input');
    fireEvent.change(jsonInput, {
      target: { value: JSON.stringify(mockJsonQuestions) },
    });

    const parseButton = screen.getByText('Parse JSON');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
      expect(screen.getByText('What is Vue?')).toBeInTheDocument();
    });
  });

  it('should handle markdown parsing errors', async () => {
    mockMarkdownQuestionParser.parseMarkdown.mockImplementation(() => {
      throw new Error('Invalid markdown format');
    });

    render(<BulkQuestionUploader {...defaultProps} />);

    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: 'Invalid markdown' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(
        screen.getByText('Error parsing markdown: Invalid markdown format')
      ).toBeInTheDocument();
    });
  });

  it('should handle JSON parsing errors', async () => {
    render(<BulkQuestionUploader {...defaultProps} />);

    // Switch to JSON mode
    const jsonTab = screen.getByText('JSON Format');
    fireEvent.click(jsonTab);

    const jsonInput = screen.getByLabelText('JSON Input');
    fireEvent.change(jsonInput, {
      target: { value: 'Invalid JSON' },
    });

    const parseButton = screen.getByText('Parse JSON');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Error parsing JSON:')).toBeInTheDocument();
    });
  });

  it('should save questions to database', async () => {
    const mockParsedQuestions = [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A library'],
        explanation: 'React is a library.',
        category: 'React',
        difficulty: 'easy',
      },
    ];

    mockMarkdownQuestionParser.parseMarkdown.mockReturnValue(
      mockParsedQuestions
    );
    mockMarkdownQuestionParser.convertToBulkData.mockReturnValue({
      questions: mockParsedQuestions,
      totalCount: 1,
    });

    mockBulkImportQuestions.mockResolvedValue({
      success: 1,
      failed: 0,
      errors: [],
    });

    render(<BulkQuestionUploader {...defaultProps} />);

    // Parse markdown
    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: '# What is React?\nReact is a JavaScript library.' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
    });

    // Save questions
    const saveButton = screen.getByText('Save Questions');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockBulkImportQuestions).toHaveBeenCalledWith(mockParsedQuestions);
      expect(mockOnQuestionsAdded).toHaveBeenCalledWith(mockParsedQuestions);
      expect(
        screen.getByText('Successfully imported 1 questions')
      ).toBeInTheDocument();
    });
  });

  it('should handle save errors', async () => {
    const mockParsedQuestions = [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A library'],
        explanation: 'React is a library.',
        category: 'React',
        difficulty: 'easy',
      },
    ];

    mockMarkdownQuestionParser.parseMarkdown.mockReturnValue(
      mockParsedQuestions
    );
    mockMarkdownQuestionParser.convertToBulkData.mockReturnValue({
      questions: mockParsedQuestions,
      totalCount: 1,
    });

    mockBulkImportQuestions.mockResolvedValue({
      success: 0,
      failed: 1,
      errors: ['Database error'],
    });

    render(<BulkQuestionUploader {...defaultProps} />);

    // Parse markdown
    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: '# What is React?\nReact is a JavaScript library.' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
    });

    // Save questions
    const saveButton = screen.getByText('Save Questions');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to import questions: Database error')
      ).toBeInTheDocument();
    });
  });

  it('should clear form after successful save', async () => {
    const mockParsedQuestions = [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A library'],
        explanation: 'React is a library.',
        category: 'React',
        difficulty: 'easy',
      },
    ];

    mockMarkdownQuestionParser.parseMarkdown.mockReturnValue(
      mockParsedQuestions
    );
    mockMarkdownQuestionParser.convertToBulkData.mockReturnValue({
      questions: mockParsedQuestions,
      totalCount: 1,
    });

    mockBulkImportQuestions.mockResolvedValue({
      success: 1,
      failed: 0,
      errors: [],
    });

    render(<BulkQuestionUploader {...defaultProps} />);

    // Parse markdown
    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: '# What is React?\nReact is a JavaScript library.' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
    });

    // Save questions
    const saveButton = screen.getByText('Save Questions');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText('Successfully imported 1 questions')
      ).toBeInTheDocument();
    });

    // Form should be cleared
    expect(markdownInput).toHaveValue('');
  });

  it('should show loading state during save', async () => {
    const mockParsedQuestions = [
      {
        title: 'What is React?',
        content: 'React is a JavaScript library.',
        type: 'single',
        options: ['A library', 'A framework'],
        correctAnswers: ['A library'],
        explanation: 'React is a library.',
        category: 'React',
        difficulty: 'easy',
      },
    ];

    mockMarkdownQuestionParser.parseMarkdown.mockReturnValue(
      mockParsedQuestions
    );
    mockMarkdownQuestionParser.convertToBulkData.mockReturnValue({
      questions: mockParsedQuestions,
      totalCount: 1,
    });

    // Mock a delayed response
    mockBulkImportQuestions.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ success: 1, failed: 0, errors: [] }), 100)
        )
    );

    render(<BulkQuestionUploader {...defaultProps} />);

    // Parse markdown
    const markdownInput = screen.getByLabelText('Markdown Input');
    fireEvent.change(markdownInput, {
      target: { value: '# What is React?\nReact is a JavaScript library.' },
    });

    const parseButton = screen.getByText('Parse Markdown');
    fireEvent.click(parseButton);

    await waitFor(() => {
      expect(screen.getByText('Preview (1 questions)')).toBeInTheDocument();
    });

    // Save questions
    const saveButton = screen.getByText('Save Questions');
    fireEvent.click(saveButton);

    // Should show loading state
    expect(screen.getByText('Saving questions...')).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
});
