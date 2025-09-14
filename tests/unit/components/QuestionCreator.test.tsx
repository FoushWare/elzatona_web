import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionCreator from '@/components/QuestionCreator';

// Mock the client services
jest.mock('@/lib/section-client', () => ({
  SectionClientService: {
    addQuestion: jest.fn(),
  },
}));

jest.mock('@/lib/audio-upload-client', () => ({
  ClientAudioUploadService: {
    uploadQuestionAudio: jest.fn(),
    uploadAnswerAudio: jest.fn(),
    validateAudioFile: jest.fn(),
  },
}));

import { SectionClientService } from '@/lib/section-client';
import { ClientAudioUploadService } from '@/lib/audio-upload-client';

const mockSectionClientService = SectionClientService as jest.Mocked<
  typeof SectionClientService
>;
const mockAudioUploadService = ClientAudioUploadService as jest.Mocked<
  typeof ClientAudioUploadService
>;

describe('QuestionCreator', () => {
  const defaultProps = {
    sectionId: 'section-1',
    sectionName: 'Frontend Fundamentals',
    onQuestionAdded: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSectionClientService.addQuestion.mockResolvedValue({
      success: true,
      data: { id: 'q1' },
    });
    mockAudioUploadService.validateAudioFile.mockReturnValue({
      isValid: true,
      error: null,
    });
  });

  it('should render question creation form', () => {
    render(<QuestionCreator {...defaultProps} />);

    expect(
      screen.getByText('Add Question to Frontend Fundamentals')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Create a new question for this learning section')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter question title')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter the question content...')
    ).toBeInTheDocument();
    expect(screen.getByText('Single Choice')).toBeInTheDocument();
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
  });

  it('should create a single choice question', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Select single choice
    const singleChoiceRadio = screen.getByLabelText('Single Choice');
    fireEvent.click(singleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Select correct answer
    const correctAnswerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(correctAnswerCheckbox);

    // Add explanation
    await user.type(
      screen.getByPlaceholderText(
        'Explain why the correct answer is correct...'
      ),
      'This is correct'
    );

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSectionClientService.addQuestion).toHaveBeenCalledWith(
        'section-1',
        expect.objectContaining({
          title: 'Test Question',
          content: 'What is the answer?',
          type: 'single',
          options: expect.arrayContaining([
            expect.objectContaining({ text: 'Option 1', isCorrect: true }),
            expect.objectContaining({ text: 'Option 2', isCorrect: false }),
          ]),
          correctAnswers: ['a'],
          explanation: 'This is correct',
        })
      );
    });
  });

  it('should create a multiple choice question', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Multiple Choice Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'Select all correct answers'
    );

    // Select multiple choice
    const multipleChoiceRadio = screen.getByLabelText('Multiple Choice');
    fireEvent.click(multipleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option A');
    await user.type(optionInputs[1], 'Option B');
    await user.type(optionInputs[2], 'Option C');

    // Select multiple correct answers
    const correctAnswerCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(correctAnswerCheckboxes[0]); // Option A
    fireEvent.click(correctAnswerCheckboxes[2]); // Option C

    // Add explanation
    await user.type(
      screen.getByPlaceholderText(
        'Explain why the correct answer is correct...'
      ),
      'Both A and C are correct'
    );

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSectionClientService.addQuestion).toHaveBeenCalledWith(
        'section-1',
        expect.objectContaining({
          title: 'Multiple Choice Question',
          content: 'Select all correct answers',
          type: 'multiple',
          options: expect.arrayContaining([
            expect.objectContaining({ text: 'Option A', isCorrect: true }),
            expect.objectContaining({ text: 'Option B', isCorrect: false }),
            expect.objectContaining({ text: 'Option C', isCorrect: true }),
          ]),
          correctAnswers: ['a', 'c'],
          explanation: 'Both A and C are correct',
        })
      );
    });
  });

  it('should add and remove options dynamically', async () => {
    render(<QuestionCreator {...defaultProps} />);

    // Component starts with 4 options (A, B, C, D)
    const initialOptionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    expect(initialOptionInputs).toHaveLength(4);

    // Add a fifth option
    const addOptionButton = screen.getByText('Add Option');
    fireEvent.click(addOptionButton);

    // Should now have 5 option inputs
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    expect(optionInputs).toHaveLength(5);

    // Remove the fifth option (index 4)
    const removeButtons = screen.getAllByRole('button').filter(
      button => button.querySelector('svg') // Trash icon
    );
    fireEvent.click(removeButtons[4]); // Remove fifth option

    // Should now have 4 option inputs again
    const updatedOptionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    expect(updatedOptionInputs).toHaveLength(4);
  });

  it('should render audio upload inputs', () => {
    render(<QuestionCreator {...defaultProps} />);

    // Check that audio upload sections are rendered
    expect(screen.getByText('Question Audio (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Answer Audio (Optional)')).toBeInTheDocument();

    // Check that file inputs are present
    const fileInputs = screen
      .getAllByDisplayValue('')
      .filter(input => input.getAttribute('accept') === 'audio/*');
    expect(fileInputs).toHaveLength(2);
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<QuestionCreator {...defaultProps} />);

    // Fill in title and content
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Add options but don't mark any as correct
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Try to submit without selecting correct answer
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('At least one correct answer is required')
      ).toBeInTheDocument();
    });

    expect(mockSectionClientService.addQuestion).not.toHaveBeenCalled();
  });

  it('should handle single choice validation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Select single choice
    const singleChoiceRadio = screen.getByLabelText('Single Choice');
    fireEvent.click(singleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Don't select any correct answer
    await user.type(
      screen.getByPlaceholderText(
        'Explain why the correct answer is correct...'
      ),
      'Explanation'
    );

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('At least one correct answer is required')
      ).toBeInTheDocument();
    });
  });

  it('should handle multiple choice validation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Select multiple choice
    const multipleChoiceRadio = screen.getByLabelText('Multiple Choice');
    fireEvent.click(multipleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Don't select any correct answers
    await user.type(
      screen.getByPlaceholderText(
        'Explain why the correct answer is correct...'
      ),
      'Explanation'
    );

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('At least one correct answer is required')
      ).toBeInTheDocument();
    });
  });

  it('should handle form submission errors', async () => {
    const user = userEvent.setup();

    // Mock the service to return an error
    mockSectionClientService.addQuestion.mockResolvedValue({
      success: false,
      error: 'Failed to add question',
    });

    render(<QuestionCreator {...defaultProps} />);

    // Fill in all required fields
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Add options and mark one as correct
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    const correctAnswerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(correctAnswerCheckbox);

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to add question')).toBeInTheDocument();
    });
  });

  it('should call onQuestionAdded and onClose after successful creation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Enter question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Enter the question content...'),
      'What is the answer?'
    );

    // Add options
    const optionInputs = screen.getAllByPlaceholderText(/Option [A-Z]/);
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Select correct answer
    const correctAnswerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(correctAnswerCheckbox);

    // Add explanation
    await user.type(
      screen.getByPlaceholderText(
        'Explain why the correct answer is correct...'
      ),
      'This is correct'
    );

    // Submit form
    const submitButton = screen.getByText('Add Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(defaultProps.onQuestionAdded).toHaveBeenCalled();
      // onClose is not automatically called after successful creation
      expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
  });

  it('should close form when close button is clicked', () => {
    render(<QuestionCreator {...defaultProps} />);

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
