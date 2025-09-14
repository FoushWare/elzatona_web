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

    expect(screen.getByText('Create New Question')).toBeInTheDocument();
    expect(
      screen.getByText('Section: Frontend Fundamentals')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Question title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Question content')).toBeInTheDocument();
    expect(screen.getByText('Single Choice')).toBeInTheDocument();
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
  });

  it('should create a single choice question', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Question content'),
      'What is the answer?'
    );

    // Select single choice
    const singleChoiceRadio = screen.getByLabelText('Single Choice');
    fireEvent.click(singleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Select correct answer
    const correctAnswerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(correctAnswerCheckbox);

    // Add explanation
    await user.type(
      screen.getByPlaceholderText('Explanation for the correct answer'),
      'This is correct'
    );

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSectionClientService.addQuestion).toHaveBeenCalledWith(
        'section-1',
        expect.objectContaining({
          title: 'Test Question',
          content: 'What is the answer?',
          type: 'single',
          options: ['Option 1', 'Option 2'],
          correctAnswers: [0],
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
      screen.getByPlaceholderText('Question title'),
      'Multiple Choice Question'
    );
    await user.type(
      screen.getByPlaceholderText('Question content'),
      'Select all correct answers'
    );

    // Select multiple choice
    const multipleChoiceRadio = screen.getByLabelText('Multiple Choice');
    fireEvent.click(multipleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    await user.type(optionInputs[0], 'Option A');
    await user.type(optionInputs[1], 'Option B');
    await user.type(optionInputs[2], 'Option C');

    // Select multiple correct answers
    const correctAnswerCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(correctAnswerCheckboxes[0]); // Option A
    fireEvent.click(correctAnswerCheckboxes[2]); // Option C

    // Add explanation
    await user.type(
      screen.getByPlaceholderText('Explanation for the correct answer'),
      'Both A and C are correct'
    );

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSectionClientService.addQuestion).toHaveBeenCalledWith(
        'section-1',
        expect.objectContaining({
          title: 'Multiple Choice Question',
          content: 'Select all correct answers',
          type: 'multiple',
          options: ['Option A', 'Option B', 'Option C'],
          correctAnswers: [0, 2],
          explanation: 'Both A and C are correct',
        })
      );
    });
  });

  it('should add and remove options dynamically', async () => {
    render(<QuestionCreator {...defaultProps} />);

    // Add a third option
    const addOptionButton = screen.getByText('Add Option');
    fireEvent.click(addOptionButton);

    // Should now have 3 option inputs
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    expect(optionInputs).toHaveLength(3);

    // Remove the third option
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[2]); // Remove third option

    // Should now have 2 option inputs
    const updatedOptionInputs = screen.getAllByPlaceholderText('Option text');
    expect(updatedOptionInputs).toHaveLength(2);
  });

  it('should upload question audio', async () => {
    const user = userEvent.setup();
    const mockFile = new File(['audio content'], 'question.mp3', {
      type: 'audio/mpeg',
    });

    mockAudioUploadService.uploadQuestionAudio.mockResolvedValue({
      success: true,
      data: { url: '/audio/questions/q1.mp3' },
    });

    render(<QuestionCreator {...defaultProps} />);

    // Upload question audio
    const questionAudioInput = screen.getByLabelText('Question Audio');
    await user.upload(questionAudioInput, mockFile);

    await waitFor(() => {
      expect(mockAudioUploadService.uploadQuestionAudio).toHaveBeenCalledWith(
        'q1',
        mockFile
      );
    });
  });

  it('should upload answer audio', async () => {
    const user = userEvent.setup();
    const mockFile = new File(['audio content'], 'answer.mp3', {
      type: 'audio/mpeg',
    });

    mockAudioUploadService.uploadAnswerAudio.mockResolvedValue({
      success: true,
      data: { url: '/audio/answers/q1.mp3' },
    });

    render(<QuestionCreator {...defaultProps} />);

    // Upload answer audio
    const answerAudioInput = screen.getByLabelText('Answer Audio');
    await user.upload(answerAudioInput, mockFile);

    await waitFor(() => {
      expect(mockAudioUploadService.uploadAnswerAudio).toHaveBeenCalledWith(
        'q1',
        mockFile
      );
    });
  });

  it('should validate required fields', async () => {
    render(<QuestionCreator {...defaultProps} />);

    // Try to submit without filling required fields
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Please fill in all required fields')
      ).toBeInTheDocument();
    });

    expect(mockSectionClientService.addQuestion).not.toHaveBeenCalled();
  });

  it('should handle single choice validation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Question content'),
      'What is the answer?'
    );

    // Select single choice
    const singleChoiceRadio = screen.getByLabelText('Single Choice');
    fireEvent.click(singleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Don't select any correct answer
    await user.type(
      screen.getByPlaceholderText('Explanation for the correct answer'),
      'Explanation'
    );

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please select exactly one correct answer for single choice questions'
        )
      ).toBeInTheDocument();
    });
  });

  it('should handle multiple choice validation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Question content'),
      'What is the answer?'
    );

    // Select multiple choice
    const multipleChoiceRadio = screen.getByLabelText('Multiple Choice');
    fireEvent.click(multipleChoiceRadio);

    // Add options
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Don't select any correct answers
    await user.type(
      screen.getByPlaceholderText('Explanation for the correct answer'),
      'Explanation'
    );

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Please select at least one correct answer for multiple choice questions'
        )
      ).toBeInTheDocument();
    });
  });

  it('should handle audio upload errors', async () => {
    const user = userEvent.setup();
    const mockFile = new File(['audio content'], 'question.mp3', {
      type: 'audio/mpeg',
    });

    mockAudioUploadService.uploadQuestionAudio.mockResolvedValue({
      success: false,
      error: 'File too large',
    });

    render(<QuestionCreator {...defaultProps} />);

    // Upload question audio
    const questionAudioInput = screen.getByLabelText('Question Audio');
    await user.upload(questionAudioInput, mockFile);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to upload question audio: File too large')
      ).toBeInTheDocument();
    });
  });

  it('should call onQuestionAdded and onClose after successful creation', async () => {
    const user = userEvent.setup();

    render(<QuestionCreator {...defaultProps} />);

    // Fill in question details
    await user.type(
      screen.getByPlaceholderText('Question title'),
      'Test Question'
    );
    await user.type(
      screen.getByPlaceholderText('Question content'),
      'What is the answer?'
    );

    // Add options
    const optionInputs = screen.getAllByPlaceholderText('Option text');
    await user.type(optionInputs[0], 'Option 1');
    await user.type(optionInputs[1], 'Option 2');

    // Select correct answer
    const correctAnswerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(correctAnswerCheckbox);

    // Add explanation
    await user.type(
      screen.getByPlaceholderText('Explanation for the correct answer'),
      'This is correct'
    );

    // Submit form
    const submitButton = screen.getByText('Create Question');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(defaultProps.onQuestionAdded).toHaveBeenCalled();
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('should close form when close button is clicked', () => {
    render(<QuestionCreator {...defaultProps} />);

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
