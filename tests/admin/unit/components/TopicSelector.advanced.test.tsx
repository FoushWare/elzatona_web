import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopicSelector } from '@/components/TopicSelector';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const mockTopics = [
  {
    id: '1',
    name: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts',
    category: 'JavaScript Core',
    questionCount: 5,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'React Hooks',
    description: 'React hooks and state management',
    category: 'React & Frontend',
    questionCount: 3,
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'CSS Grid',
    description: 'CSS Grid layout system',
    category: 'CSS & Styling',
    questionCount: 2,
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
  },
];

const defaultProps = {
  selectedTopics: [],
  onTopicsChange: jest.fn(),
  maxSelections: 5,
  disabled: false,
};

describe('TopicSelector Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockTopics,
    } as Response);
  });

  test('handles selection with special characters in topic names', async () => {
    const mockOnTopicsChange = jest.fn();
    const topicsWithSpecialChars = [
      ...mockTopics,
      {
        id: '4',
        name: 'Topic@#$%^&*()',
        description: 'Topic with special characters',
        category: 'JavaScript Core',
        questionCount: 1,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithSpecialChars,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Topic@#$%^&*()')).toBeInTheDocument();
    });

    const specialTopic = screen.getByText('Topic@#$%^&*()');
    fireEvent.click(specialTopic);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['4']);
  });

  test('handles selection with unicode characters in topic names', async () => {
    const mockOnTopicsChange = jest.fn();
    const topicsWithUnicode = [
      ...mockTopics,
      {
        id: '4',
        name: 'JavaScript 基础',
        description: 'JavaScript 基础概念',
        category: 'JavaScript Core',
        questionCount: 1,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithUnicode,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript 基础')).toBeInTheDocument();
    });

    const unicodeTopic = screen.getByText('JavaScript 基础');
    fireEvent.click(unicodeTopic);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['4']);
  });

  test('handles selection with emoji in topic names', async () => {
    const mockOnTopicsChange = jest.fn();
    const topicsWithEmoji = [
      ...mockTopics,
      {
        id: '4',
        name: 'JavaScript 🚀',
        description: 'JavaScript concepts with emoji',
        category: 'JavaScript Core',
        questionCount: 1,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithEmoji,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript 🚀')).toBeInTheDocument();
    });

    const emojiTopic = screen.getByText('JavaScript 🚀');
    fireEvent.click(emojiTopic);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['4']);
  });

  test('handles very long topic names', async () => {
    const mockOnTopicsChange = jest.fn();
    const longTopicName = 'a'.repeat(1000);
    const topicsWithLongName = [
      ...mockTopics,
      {
        id: '4',
        name: longTopicName,
        description: 'Topic with very long name',
        category: 'JavaScript Core',
        questionCount: 1,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithLongName,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText(longTopicName)).toBeInTheDocument();
    });

    const longTopic = screen.getByText(longTopicName);
    fireEvent.click(longTopic);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['4']);
  });

  test('handles rapid topic selections', async () => {
    const mockOnTopicsChange = jest.fn();
    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Rapid selections
    const topic1 = screen.getByText('JavaScript Fundamentals');
    const topic2 = screen.getByText('React Hooks');
    const topic3 = screen.getByText('CSS Grid');

    fireEvent.click(topic1);
    fireEvent.click(topic2);
    fireEvent.click(topic3);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1']);
    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1', '2']);
    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1', '2', '3']);
  });

  test('handles selection with maxSelections limit', async () => {
    const mockOnTopicsChange = jest.fn();
    render(
      <TopicSelector
        {...defaultProps}
        maxSelections={2}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Select first two topics
    const topic1 = screen.getByText('JavaScript Fundamentals');
    const topic2 = screen.getByText('React Hooks');
    const topic3 = screen.getByText('CSS Grid');

    fireEvent.click(topic1);
    fireEvent.click(topic2);

    // Try to select third topic (should not work)
    fireEvent.click(topic3);

    expect(mockOnTopicsChange).toHaveBeenLastCalledWith(['1', '2']);
  });

  test('handles removal of selected topics with special characters', async () => {
    const mockOnTopicsChange = jest.fn();
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Remove first topic
    const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
    fireEvent.click(removeButton);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['2']);
  });

  test('handles clear all with many selected topics', async () => {
    const mockOnTopicsChange = jest.fn();
    const selectedTopics = ['1', '2', '3'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        onTopicsChange={mockOnTopicsChange}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);

    expect(mockOnTopicsChange).toHaveBeenCalledWith([]);
  });

  test('handles category filter with all categories', async () => {
    render(<TopicSelector {...defaultProps} />);

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    fireEvent.change(categoryFilter, { target: { value: 'All Categories' } });

    // Should show all topics
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
    expect(screen.getByText('CSS Grid')).toBeInTheDocument();
  });

  test('handles category filter with specific category', async () => {
    render(<TopicSelector {...defaultProps} />);

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    fireEvent.change(categoryFilter, { target: { value: 'JavaScript Core' } });

    // Should only show JavaScript Core topics
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
      expect(screen.queryByText('CSS Grid')).not.toBeInTheDocument();
    });
  });

  test('handles keyboard navigation in dropdown', async () => {
    render(<TopicSelector {...defaultProps} />);

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Tab navigation
    const user = userEvent.setup();
    await user.tab();
    await user.tab();

    // Should be able to navigate through the interface
    expect(document.activeElement).toBeInTheDocument();
  });

  test('handles escape key to close dropdown', async () => {
    render(<TopicSelector {...defaultProps} />);

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Press Escape
    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    // Dropdown should be closed
    await waitFor(() => {
      expect(screen.queryByText('JavaScript Fundamentals')).not.toBeInTheDocument();
    });
  });

  test('handles enter key to select topic', async () => {
    const mockOnTopicsChange = jest.fn();
    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Focus on first topic and press Enter
    const topic = screen.getByText('JavaScript Fundamentals');
    topic.focus();
    
    const user = userEvent.setup();
    await user.keyboard('{Enter}');

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1']);
  });

  test('handles disabled state correctly', () => {
    render(<TopicSelector {...defaultProps} disabled />);

    const trigger = screen.getByText('Choose topics...');
    expect(trigger.closest('button')).toBeDisabled();
  });

  test('handles disabled state with selected topics', () => {
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector {...defaultProps} selectedTopics={selectedTopics} disabled />
    );

    const trigger = screen.getByText('Choose topics...');
    expect(trigger.closest('button')).toBeDisabled();

    // Selected topics should still be visible
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
  });

  test('handles very large number of topics', async () => {
    const mockOnTopicsChange = jest.fn();
    const manyTopics = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Topic ${i + 1}`,
      description: `Description for topic ${i + 1}`,
      category: 'JavaScript Core',
      questionCount: 1,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    }));

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => manyTopics,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Topic 1')).toBeInTheDocument();
    });

    // Should be able to select topics even with many options
    const topic1 = screen.getByText('Topic 1');
    fireEvent.click(topic1);

    expect(mockOnTopicsChange).toHaveBeenCalledWith(['1']);
  });

  test('handles topics with zero question count', async () => {
    const mockOnTopicsChange = jest.fn();
    const topicsWithZeroCount = [
      ...mockTopics,
      {
        id: '4',
        name: 'Empty Topic',
        description: 'Topic with no questions',
        category: 'JavaScript Core',
        questionCount: 0,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithZeroCount,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Empty Topic')).toBeInTheDocument();
      expect(screen.getByText('0 questions')).toBeInTheDocument();
    });
  });

  test('handles topics with very high question count', async () => {
    const mockOnTopicsChange = jest.fn();
    const topicsWithHighCount = [
      ...mockTopics,
      {
        id: '4',
        name: 'Popular Topic',
        description: 'Topic with many questions',
        category: 'JavaScript Core',
        questionCount: 999999,
        createdAt: '2023-01-04T00:00:00Z',
        updatedAt: '2023-01-04T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => topicsWithHighCount,
    } as Response);

    render(
      <TopicSelector {...defaultProps} onTopicsChange={mockOnTopicsChange} />
    );

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Popular Topic')).toBeInTheDocument();
      expect(screen.getByText('999999 questions')).toBeInTheDocument();
    });
  });

  test('handles rapid category filter changes', async () => {
    render(<TopicSelector {...defaultProps} />);

    const trigger = screen.getByText('Choose topics...');
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    
    // Rapid category changes
    fireEvent.change(categoryFilter, { target: { value: 'JavaScript Core' } });
    fireEvent.change(categoryFilter, { target: { value: 'React & Frontend' } });
    fireEvent.change(categoryFilter, { target: { value: 'CSS & Styling' } });
    fireEvent.change(categoryFilter, { target: { value: 'All Categories' } });

    // Should handle rapid changes gracefully
    expect(categoryFilter).toHaveValue('All Categories');
  });

  test('handles selection count display with maxSelections', async () => {
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        maxSelections={5}
      />
    );

    expect(screen.getByText('2/5 topics selected')).toBeInTheDocument();
  });

  test('handles selection count display without maxSelections', async () => {
    const selectedTopics = ['1', '2'];
    render(
      <TopicSelector
        {...defaultProps}
        selectedTopics={selectedTopics}
        maxSelections={undefined}
      />
    );

    expect(screen.getByText('2 topics selected')).toBeInTheDocument();
  });
});






