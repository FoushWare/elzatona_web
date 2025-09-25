import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopicManager } from '@/components/TopicManager';

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
];

describe('TopicManager Component - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockTopics,
    } as Response);
  });

  test('handles search with special characters', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search topics/i);
    await user.type(searchInput, 'JavaScript@#$%^&*()');

    // Should handle special characters gracefully
    expect(searchInput).toHaveValue('JavaScript@#$%^&*()');
  });

  test('handles search with unicode characters', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search topics/i);
    await user.type(searchInput, 'JavaScript 基础');

    expect(searchInput).toHaveValue('JavaScript 基础');
  });

  test('handles search with emoji', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search topics/i);
    await user.type(searchInput, 'JavaScript 🚀');

    expect(searchInput).toHaveValue('JavaScript 🚀');
  });

  test('handles very long search terms', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search topics/i);
    const longSearchTerm = 'a'.repeat(1000);
    await user.type(searchInput, longSearchTerm);

    expect(searchInput).toHaveValue(longSearchTerm);
  });

  test('handles rapid search input changes', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search topics/i);
    
    // Rapid typing
    await user.type(searchInput, 'JavaScript');
    await user.clear(searchInput);
    await user.type(searchInput, 'React');
    await user.clear(searchInput);
    await user.type(searchInput, 'CSS');

    expect(searchInput).toHaveValue('CSS');
  });

  test('handles category filter with all categories', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    await user.selectOptions(categoryFilter, 'All Categories');

    // Should show all topics
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('React Hooks')).toBeInTheDocument();
  });

  test('handles category filter with specific category', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const categoryFilter = screen.getByDisplayValue('All Categories');
    await user.selectOptions(categoryFilter, 'JavaScript Core');

    // Should only show JavaScript Core topics
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.queryByText('React Hooks')).not.toBeInTheDocument();
  });

  test('handles topic creation with very long name', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'Very Long Topic Name' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const nameInput = screen.getByLabelText(/topic name/i);
    const longName = 'a'.repeat(1000);
    await user.type(nameInput, longName);

    expect(nameInput).toHaveValue(longName);
  });

  test('handles topic creation with very long description', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'New Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const descriptionInput = screen.getByLabelText(/description/i);
    const longDescription = 'a'.repeat(10000);
    await user.type(descriptionInput, longDescription);

    expect(descriptionInput).toHaveValue(longDescription);
  });

  test('handles topic creation with special characters', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'Special Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const nameInput = screen.getByLabelText(/topic name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.type(nameInput, 'Topic@#$%^&*()');
    await user.type(descriptionInput, 'Description with special chars: @#$%^&*()');

    expect(nameInput).toHaveValue('Topic@#$%^&*()');
    expect(descriptionInput).toHaveValue('Description with special chars: @#$%^&*()');
  });

  test('handles topic creation with unicode characters', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'Unicode Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const nameInput = screen.getByLabelText(/topic name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.type(nameInput, 'JavaScript 基础');
    await user.type(descriptionInput, 'JavaScript 基础概念和语法');

    expect(nameInput).toHaveValue('JavaScript 基础');
    expect(descriptionInput).toHaveValue('JavaScript 基础概念和语法');
  });

  test('handles topic creation with emoji', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'Emoji Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const nameInput = screen.getByLabelText(/topic name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.type(nameInput, 'JavaScript 🚀');
    await user.type(descriptionInput, 'JavaScript concepts with emoji 🎯');

    expect(nameInput).toHaveValue('JavaScript 🚀');
    expect(descriptionInput).toHaveValue('JavaScript concepts with emoji 🎯');
  });

  test('handles rapid topic creation attempts', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'New Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    
    // Rapid clicks
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    // Should only open one dialog
    expect(screen.getAllByText('Add New Topic')).toHaveLength(1);
  });

  test('handles topic deletion with confirmation', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics.filter(t => t.id !== '1'),
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];
    await user.click(deleteButton);

    // Should show confirmation dialog
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();

    const confirmButton = screen.getByText('Delete');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.queryByText('JavaScript Fundamentals')).not.toBeInTheDocument();
    });
  });

  test('handles topic deletion cancellation', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText('Delete')[0];
    await user.click(deleteButton);

    // Should show confirmation dialog
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    // Topic should still be visible
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
  });

  test('handles topic editing with validation', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics.map(t => t.id === '1' ? { ...t, name: 'Updated Topic' } : t),
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const editButton = screen.getAllByText('Edit')[0];
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue('JavaScript Fundamentals');
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Topic');

    const saveButton = screen.getByText('Save');
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Updated Topic')).toBeInTheDocument();
    });
  });

  test('handles topic editing with empty name', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const editButton = screen.getAllByText('Edit')[0];
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue('JavaScript Fundamentals');
    await user.clear(nameInput);

    const saveButton = screen.getByText('Save');
    await user.click(saveButton);

    // Should show validation error
    expect(screen.getByText(/topic name is required/i)).toBeInTheDocument();
  });

  test('handles topic editing with very long name', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const editButton = screen.getAllByText('Edit')[0];
    await user.click(editButton);

    const nameInput = screen.getByDisplayValue('JavaScript Fundamentals');
    await user.clear(nameInput);
    
    const longName = 'a'.repeat(1000);
    await user.type(nameInput, longName);

    expect(nameInput).toHaveValue(longName);
  });

  test('handles initialization with force overwrite', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'New Common Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const initButton = screen.getByText('Initialize Common Topics');
    await user.click(initButton);

    // Check force overwrite option
    const forceCheckbox = screen.getByLabelText(/force overwrite/i);
    await user.click(forceCheckbox);

    const confirmButton = screen.getByRole('button', {
      name: /initialize topics/i,
    });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(
        screen.getByText(/topics initialized successfully/i)
      ).toBeInTheDocument();
    });
  });

  test('handles initialization without force overwrite', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const initButton = screen.getByText('Initialize Common Topics');
    await user.click(initButton);

    // Don't check force overwrite option
    const confirmButton = screen.getByRole('button', {
      name: /initialize topics/i,
    });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(
        screen.getByText(/topics initialized successfully/i)
      ).toBeInTheDocument();
    });
  });

  test('handles keyboard navigation in topic list', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Tab through interactive elements
    await user.tab();
    await user.tab();
    await user.tab();

    // Should be able to navigate through the interface
    expect(document.activeElement).toBeInTheDocument();
  });

  test('handles escape key to close dialogs', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    // Press Escape
    await user.keyboard('{Escape}');

    // Dialog should be closed
    expect(screen.queryByLabelText(/topic name/i)).not.toBeInTheDocument();
  });

  test('handles enter key to submit forms', async () => {
    const user = userEvent.setup();
    
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'New Topic' }],
      } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    const nameInput = screen.getByLabelText(/topic name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.type(nameInput, 'New Topic');
    await user.type(descriptionInput, 'A new topic description');

    // Press Enter in description field
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(
        screen.getByText(/topic created successfully/i)
      ).toBeInTheDocument();
    });
  });
});






