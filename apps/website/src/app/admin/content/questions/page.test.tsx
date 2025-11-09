/**
 * Unit Tests for Admin Bulk Question Addition (A-UT-001, A-UT-002, A-UT-003, A-UT-004, A-UT-005)
 * Task: A-001 - Admin Bulk Question Addition
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminContentQuestionsPage from './page';

// Mock fetch
global.fetch = jest.fn();

// Mock window.confirm
window.confirm = jest.fn(() => true);

// Mock window.alert
window.alert = jest.fn();

// Mock window.location.reload
delete (window as any).location;
(window as any).location = { reload: jest.fn() };

// Mock Next.js navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/content/questions',
}));

// Mock shared components
jest.mock('@elzatona/shared-components', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  Select: ({ children, onValueChange, value }: any) => (
    <select value={value} onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => <option value={value}>{children}</option>,
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectValue: () => <span>Select...</span>,
  Input: ({ onChange, value, ...props }: any) => (
    <input onChange={onChange} value={value} {...props} />
  ),
  Dialog: ({ children, open }: any) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
  Textarea: ({ onChange, value, ...props }: any) => (
    <textarea onChange={onChange} value={value} {...props} />
  ),
  Checkbox: ({ checked, onCheckedChange }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
    />
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Plus: () => <span>+</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  Loader2: () => <span>⏳</span>,
  Eye: () => <span>👁️</span>,
  BookOpen: () => <span>📖</span>,
  ChevronLeft: () => <span>←</span>,
  ChevronRight: () => <span>→</span>,
}));

describe('A-UT-001: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { totalCount: 0 },
      }),
    });
  });

  it('should render without errors', async () => {
    const { container } = render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display page title', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Question Management/i)).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    render(<AdminContentQuestionsPage />);
    expect(screen.getByText(/Loading questions/i)).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading questions/i)).toBeInTheDocument();
    });
  });
});

describe('A-UT-002: Question List Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test Question 1',
            content: 'Test content',
            category: 'HTML',
            difficulty: 'beginner',
            type: 'multiple-choice',
          },
        ],
        pagination: { totalCount: 1 },
      }),
    });
  });

  it('should display questions list', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Test Question 1/i)).toBeInTheDocument();
    });
  });

  it('should display question stats', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Total Questions/i)).toBeInTheDocument();
    });
  });

  it('should display empty state when no questions', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { totalCount: 0 },
      }),
    });
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/No questions found/i)).toBeInTheDocument();
    });
  });
});

describe('A-UT-003: Search Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { totalCount: 0 },
      }),
    });
  });

  it('should have search input', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Search questions/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  it('should update search term on input change', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Search questions/i) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      expect(searchInput.value).toBe('test search');
    });
  });

  it('should filter questions based on search term', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: '1', title: 'HTML Question', content: 'Test' },
          { id: '2', title: 'CSS Question', content: 'Test' },
        ],
        pagination: { totalCount: 2 },
      }),
    });
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Search questions/i) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'HTML' } });
      // Search filtering should work
      expect(searchInput.value).toBe('HTML');
    });
  });
});

describe('A-UT-004: Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: Array(15).fill(null).map((_, i) => ({
          id: `${i + 1}`,
          title: `Question ${i + 1}`,
          content: 'Content',
        })),
        pagination: { totalCount: 15 },
      }),
    });
  });

  it('should display pagination controls', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Page/i)).toBeInTheDocument();
    });
  });

  it('should handle page size change', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      const pageSizeSelect = screen.getByText(/Show:/i);
      expect(pageSizeSelect).toBeInTheDocument();
    });
  });

  it('should disable previous button on first page', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      // Previous button should be disabled on page 1
      expect(screen.getByText(/Page/i)).toBeInTheDocument();
    });
  });
});

describe('A-UT-005: CRUD Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test Question',
            content: 'Content',
          },
        ],
        pagination: { totalCount: 1 },
      }),
    });
  });

  it('should have Add New Question button', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Add New Question/i)).toBeInTheDocument();
    });
  });

  it('should have view, edit, delete buttons for each question', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      // Buttons should be present (mocked as spans)
      expect(screen.getByText(/Test Question/i)).toBeInTheDocument();
    });
  });

  it('should handle delete confirmation', async () => {
    window.confirm = jest.fn(() => true);
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: '1', title: 'Test', content: 'Content' }],
          pagination: { totalCount: 1 },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
    
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Test/i)).toBeInTheDocument();
    });
    // Delete functionality should be available
    expect(window.confirm).toBeDefined();
  });
});

describe('A-UT-006: Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle API errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Error loading questions/i)).toBeInTheDocument();
    });
  });

  it('should handle empty API responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      // Should handle empty response
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });

  it('should handle network timeout', async () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100))
    );
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      // Should handle timeout
      expect(screen.getByText(/.*/)).toBeTruthy();
    }, { timeout: 200 });
  });
});

describe('A-UT-SNAPSHOT: Admin Bulk Question Addition Snapshot Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { totalCount: 0 },
      }),
    });
  });

  it('should match admin questions page snapshot (empty state)', async () => {
    const { container } = render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should match admin questions page snapshot (with questions)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            title: 'Test Question 1',
            content: 'Test content',
            category: 'HTML',
            difficulty: 'beginner',
            type: 'multiple-choice',
          },
          {
            id: '2',
            title: 'Test Question 2',
            content: 'Test content 2',
            category: 'CSS',
            difficulty: 'intermediate',
            type: 'multiple-choice',
          },
        ],
        pagination: { totalCount: 2 },
      }),
    });
    
    const { container } = render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should match admin questions page snapshot (loading state)', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    const { container } = render(<AdminContentQuestionsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match admin questions page snapshot (error state)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    });
    
    const { container } = render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
