import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopicSelector } from '@/components/TopicSelector';

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('TopicSelector Component', () => {
  const mockTopics = [
    {
      id: '1',
      name: 'JavaScript Fundamentals',
      description: 'Basic JavaScript concepts',
      category: 'JavaScript Core',
      questionCount: 5,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'React Hooks',
      description: 'React hooks and state management',
      category: 'React & Libraries',
      questionCount: 3,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
    {
      id: '3',
      name: 'CSS Grid',
      description: 'CSS Grid layout system',
      category: 'CSS & Styling',
      questionCount: 2,
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
    },
  ];

  const defaultProps = {
    selectedTopics: [],
    onTopicsChange: jest.fn(),
    maxQuestionsPerTopic: 10,
    totalQuestionsLimit: 50,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockTopics,
    } as Response);
  });

  test('renders topic selector with label and placeholder', async () => {
    render(<TopicSelector {...defaultProps} />);

    expect(screen.getByText('Select Topics')).toBeInTheDocument();
    expect(screen.getByText('Choose topics...')).toBeInTheDocument();
  });

  test('loads and displays topics in dropdown', async () => {
    render(<TopicSelector {...defaultProps} />);

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('React Hooks')).toBeInTheDocument();
      expect(screen.getByText('CSS Grid')).toBeInTheDocument();
    });
  });

  test('displays topic categories correctly', async () => {
    render(<TopicSelector {...defaultProps} />);

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Core')).toBeInTheDocument();
      expect(screen.getByText('React & Libraries')).toBeInTheDocument();
      expect(screen.getByText('CSS & Styling')).toBeInTheDocument();
    });
  });

  test('selects topic when clicked', async () => {
    const mockOnTopicsChange = jest.fn();
    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    // Click on a topic
    await waitFor(() => {
      const topicOption = screen.getByText('JavaScript Fundamentals');
      fireEvent.click(topicOption);
    });

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1']);
  });

  test('displays selected topics as tags', async () => {
    const selectedTopics = ['1', '2'];
    render(<TopicSelector {...defaultProps} selectedTopics={selectedTopics} />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });
  });

  test('removes topic when tag is clicked', async () => {
    const mockOnTopicsChange = jest.fn();
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    // Find and click the remove button for the first topic
    const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
    fireEvent.click(removeButton);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['2']);
  });

  test('filters topics by category', async () => {
    render(<TopicSelector {...defaultProps} />);

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    // Select category filter
    await waitFor(() => {
      const categoryFilter = screen.getByDisplayValue('All Categories');
      fireEvent.change(categoryFilter, {
        target: { value: 'JavaScript Core' },
      });
    });

    // Should only show JavaScript Core topics
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
    });
  });

  test('respects max selections limit', async () => {
    const mockOnTopicsChange = jest.fn();
    render(
      <TopicSelector
        {...defaultProps}
        maxSelections={2}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    // Select first topic
    await waitFor(() => {
      const topic1 = screen.getByText('JavaScript Fundamentals');
      fireEvent.click(topic1);
    });

    // Select second topic
    await waitFor(() => {
      const topic2 = screen.getByText('React Hooks');
      fireEvent.click(topic2);
    });

    // Try to select third topic (should not work)
    await waitFor(() => {
      const topic3 = screen.getByText('CSS Grid');
      fireEvent.click(topic3);
    });

    // Should only have 2 topics selected
    expect(mockOnTopicsChange).toHaveBeenLastCalledWith(['1', '2']);
  });

  test('shows selection count when max is reached', async () => {
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        maxSelections={2}
      />
    );

    expect(screen.getByText('2/2 topics selected')).toBeInTheDocument();
  });

  test('handles loading state', () => {
    // Mock slow response
    mockFetch.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => mockTopics,
              } as Response),
            100
          )
        )
    );

    render(<TopicSelector {...defaultProps} />);

    expect(screen.getByText('Loading topics...')).toBeInTheDocument();
  });

  test('handles empty topics list', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(<TopicSelector {...defaultProps} />);

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('No topics available')).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<TopicSelector {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load topics')).toBeInTheDocument();
    });
  });

  test('displays topic question count', async () => {
    render(<TopicSelector {...defaultProps} />);

    // Click to open dropdown
    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('5 questions')).toBeInTheDocument();
      expect(screen.getByText('3 questions')).toBeInTheDocument();
      expect(screen.getByText('2 questions')).toBeInTheDocument();
    });
  });

  test('shows clear all button when topics are selected', async () => {
    const mockOnTopicsChange = jest.fn();
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    const clearAllButton = screen.getByText('Clear All');
    expect(clearAllButton).toBeInTheDocument();

    fireEvent.click(clearAllButton);
    expect(mockOnTopicsChange).toHaveBeenCalledWith([]);
  });

  test('does not show clear all button when no topics selected', () => {
    render(<TopicSelector {...defaultProps} selectedTopics={[]} />);

    expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
  });

  test('applies correct styling classes', () => {
    render(<TopicSelector {...defaultProps} />);

    const container = screen.getByText('Select Topics').closest('div');
    expect(container).toHaveClass('space-y-2');
  });

  test('handles disabled state', () => {
    render(<TopicSelector {...defaultProps} disabled />);

    const trigger = screen.getByText('Choose topics...');
    expect(trigger.closest('button')).toBeDisabled();
  });
});
