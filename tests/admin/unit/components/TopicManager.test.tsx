import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopicManager } from '@/components/TopicManager';

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to avoid noise in tests
const originalConsoleError = console.error;
const originalConsoleLog = console.log;

beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.log = originalConsoleLog;
});

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('TopicManager Component', () => {
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockTopics,
    } as Response);
  });

  test('renders topic manager with title and buttons', async () => {
    render(<TopicManager />);

    expect(screen.getByText('Topic Management')).toBeInTheDocument();
    expect(screen.getByText('Add New Topic')).toBeInTheDocument();
    expect(screen.getByText('Initialize Common Topics')).toBeInTheDocument();
  });

  test('loads and displays topics on mount', async () => {
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('React Hooks')).toBeInTheDocument();
    });
  });

  test('opens add topic dialog when Add New Topic is clicked', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    expect(screen.getByText('Add New Topic')).toBeInTheDocument();
    expect(screen.getByLabelText(/topic name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('opens initialize topics dialog when Initialize Common Topics is clicked', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    const initButton = screen.getByText('Initialize Common Topics');
    await user.click(initButton);

    expect(screen.getByText('Initialize Common Topics')).toBeInTheDocument();
    expect(
      screen.getByText(/this will create common topics/i)
    ).toBeInTheDocument();
  });

  test('creates new topic successfully', async () => {
    const user = userEvent.setup();

    // Mock successful topic creation
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '3', name: 'New Topic' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [...mockTopics, { id: '3', name: 'New Topic' }],
      } as Response);

    render(<TopicManager />);

    // Wait for topics to load
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Open add topic dialog
    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    // Fill form
    await user.type(screen.getByLabelText(/topic name/i), 'New Topic');
    await user.type(
      screen.getByLabelText(/description/i),
      'A new topic description'
    );

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add topic/i });
    await user.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(
        screen.getByText(/topic created successfully/i)
      ).toBeInTheDocument();
    });
  });

  test('handles topic creation error', async () => {
    const user = userEvent.setup();

    // Mock failed topic creation
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockRejectedValueOnce(new Error('Network error'));

    render(<TopicManager />);

    // Wait for topics to load
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Open add topic dialog
    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    // Fill form
    await user.type(screen.getByLabelText(/topic name/i), 'New Topic');
    await user.type(
      screen.getByLabelText(/description/i),
      'A new topic description'
    );

    // Submit form
    const submitButton = screen.getByRole('button', { name: /add topic/i });
    await user.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/failed to create topic/i)).toBeInTheDocument();
    });
  });

  test('initializes common topics successfully', async () => {
    const user = userEvent.setup();

    // Mock successful initialization
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Topics initialized successfully' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          ...mockTopics,
          { id: '3', name: 'New Common Topic' },
        ],
      } as Response);

    render(<TopicManager />);

    // Wait for topics to load
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Open initialize dialog
    const initButton = screen.getByText('Initialize Common Topics');
    await user.click(initButton);

    // Confirm initialization
    const confirmButton = screen.getByRole('button', {
      name: /initialize topics/i,
    });
    await user.click(confirmButton);

    // Should show success message
    await waitFor(() => {
      expect(
        screen.getByText(/topics initialized successfully/i)
      ).toBeInTheDocument();
    });
  });

  test('handles initialization error', async () => {
    const user = userEvent.setup();

    // Mock failed initialization
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      } as Response)
      .mockRejectedValueOnce(new Error('Initialization failed'));

    render(<TopicManager />);

    // Wait for topics to load
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Open initialize dialog
    const initButton = screen.getByText('Initialize Common Topics');
    await user.click(initButton);

    // Confirm initialization
    const confirmButton = screen.getByRole('button', {
      name: /initialize topics/i,
    });
    await user.click(confirmButton);

    // Should show error message
    await waitFor(() => {
      expect(
        screen.getByText(/failed to initialize topics/i)
      ).toBeInTheDocument();
    });
  });

  test('displays topic information correctly', async () => {
    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
      expect(screen.getByText('Basic JavaScript concepts')).toBeInTheDocument();
      expect(screen.getByText('JavaScript Core')).toBeInTheDocument();
      expect(screen.getByText('5 questions')).toBeInTheDocument();
    });
  });

  test('shows loading state while fetching topics', () => {
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

    render(<TopicManager />);

    expect(screen.getByText(/loading topics/i)).toBeInTheDocument();
  });

  test('handles empty topics list', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText(/no topics found/i)).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<TopicManager />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load topics/i)).toBeInTheDocument();
    });
  });

  test('closes dialogs when cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    // Open add topic dialog
    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    // Click cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    // Dialog should be closed
    expect(screen.queryByLabelText(/topic name/i)).not.toBeInTheDocument();
  });

  test('validates required fields in add topic form', async () => {
    const user = userEvent.setup();
    render(<TopicManager />);

    // Wait for topics to load
    await waitFor(() => {
      expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    });

    // Open add topic dialog
    const addButton = screen.getByText('Add New Topic');
    await user.click(addButton);

    // Try to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /add topic/i });
    await user.click(submitButton);

    // Should show validation errors
    expect(screen.getByText(/topic name is required/i)).toBeInTheDocument();
  });
});
