import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SectionManager from '@/components/SectionManager';

// Mock the client service
jest.mock('@/lib/section-client', () => ({
  SectionClientService: {
    getSections: jest.fn(),
    addSection: jest.fn(),
    updateSection: jest.fn(),
    deleteSection: jest.fn(),
    getSectionQuestions: jest.fn(),
    addQuestion: jest.fn(),
    addBulkQuestions: jest.fn(),
    getSectionIcon: jest.fn(() => '📚'), // Mock icon function
  },
}));

// Mock the components that are imported
jest.mock('@/components/QuestionCreator', () => {
  return function MockQuestionCreator({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="question-creator">
        <button onClick={onClose}>Close Question Creator</button>
      </div>
    );
  };
});

jest.mock('@/components/BulkQuestionUploader', () => {
  return function MockBulkQuestionUploader({
    onClose,
  }: {
    onClose: () => void;
  }) {
    return (
      <div data-testid="bulk-question-uploader">
        <button onClick={onClose}>Close Bulk Uploader</button>
      </div>
    );
  };
});

import { SectionClientService } from '@/lib/section-client';

const mockSectionClientService = SectionClientService as jest.Mocked<
  typeof SectionClientService
>;

describe('SectionManager', () => {
  const mockSections = [
    {
      id: 'section-1',
      name: 'Frontend Fundamentals',
      description: 'Basic frontend concepts',
      questionCount: 5,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'section-2',
      name: 'JavaScript Deep Dive',
      description: 'Advanced JavaScript concepts',
      questionCount: 10,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockSectionClientService.getSections.mockResolvedValue({
      success: true,
      data: mockSections,
    });
  });

  it('should render sections list', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
    });

    expect(screen.getByText('5 questions')).toBeInTheDocument();
    expect(screen.getByText('10 questions')).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    render(<SectionManager />);
    expect(screen.getByText('Loading sections...')).toBeInTheDocument();
  });

  it('should show error state when sections fail to load', async () => {
    mockSectionClientService.getSections.mockResolvedValue({
      success: false,
      error: 'Failed to load sections',
    });

    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load sections')).toBeInTheDocument();
    });
  });

  it('should open add section modal when add button is clicked', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add Section');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Section')).toBeInTheDocument();
    });
    expect(
      screen.getByPlaceholderText('Enter section name')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter section description')
    ).toBeInTheDocument();
  });

  it('should add a new section', async () => {
    const user = userEvent.setup();
    mockSectionClientService.addSection.mockResolvedValue({
      success: true,
      data: {
        id: 'section-3',
        name: 'New Section',
        description: 'A new section',
        questionCount: 0,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    });

    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Open add section modal
    const addButton = screen.getByText('Add Section');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Section')).toBeInTheDocument();
    });

    // Fill form
    await user.type(
      screen.getByPlaceholderText('Enter section name'),
      'New Section'
    );
    await user.type(
      screen.getByPlaceholderText('Enter section description'),
      'A new section'
    );

    // Submit form - get the submit button from the modal (second "Add Section" button)
    const submitButtons = screen.getAllByText('Add Section');
    const submitButton = submitButtons[1]; // Second button is the modal submit button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSectionClientService.addSection).toHaveBeenCalledWith(
        'New Section',
        'A new section'
      );
    });
  });

  it('should open question creator modal', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Find and click the "Add One" button for the first section
    const addOneButtons = screen.getAllByText('Add One');
    fireEvent.click(addOneButtons[0]);

    expect(screen.getByTestId('question-creator')).toBeInTheDocument();
  });

  it('should open bulk question uploader modal', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Find and click the "Bulk Add" button for the first section
    const bulkAddButtons = screen.getAllByText('Bulk Add');
    fireEvent.click(bulkAddButtons[0]);

    expect(screen.getByTestId('bulk-question-uploader')).toBeInTheDocument();
  });

  it('should delete a section', async () => {
    mockSectionClientService.deleteSection.mockResolvedValue({
      success: true,
      message: 'Section deleted successfully',
    });

    // Mock window.confirm
    window.confirm = jest.fn(() => true);

    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Find and click the delete button (trash icon) for the first section
    const deleteButtons = screen.getAllByTitle('Delete section');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "Frontend Fundamentals"? This will also delete all associated questions.'
    );

    await waitFor(() => {
      expect(mockSectionClientService.deleteSection).toHaveBeenCalledWith(
        'section-1'
      );
    });
  });

  it('should show section statistics', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Check that statistics are displayed
    expect(screen.getByText('Total Sections')).toBeInTheDocument();
    expect(screen.getByText('Total Questions')).toBeInTheDocument();
  });

  it('should handle empty sections list', async () => {
    mockSectionClientService.getSections.mockResolvedValue({
      success: true,
      data: [],
    });

    render(<SectionManager />);

    await waitFor(() => {
      // When there are no sections, the grid should be empty but still show the header
      expect(
        screen.getByText('📚 Learning Paths Management')
      ).toBeInTheDocument();
      expect(screen.getByText('Total Sections')).toBeInTheDocument();
    });
  });

  it('should close modals when close buttons are clicked', async () => {
    render(<SectionManager />);

    await waitFor(() => {
      expect(screen.getByText('Frontend Fundamentals')).toBeInTheDocument();
    });

    // Open question creator modal
    const addOneButtons = screen.getAllByText('Add One');
    fireEvent.click(addOneButtons[0]);

    expect(screen.getByTestId('question-creator')).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByText('Close Question Creator');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('question-creator')).not.toBeInTheDocument();
    });
  });
});
