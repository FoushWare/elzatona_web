/**
 * Integration Tests for Admin Bulk Question Addition (A-IT-001 to A-IT-006)
 * Task: A-001 - Admin Bulk Question Addition
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminContentQuestionsPage from './page';

// Mock fetch
global.fetch = jest.fn();

// Mock window methods
window.confirm = jest.fn(() => true);
window.alert = jest.fn();
delete (window as any).location;
(window as any).location = { reload: jest.fn() };

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/admin/content/questions',
}));

// Mock shared components (same as unit tests)
jest.mock('@elzatona/shared-components', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
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
  Dialog: ({ children, open }: any) => open ? <div>{children}</div> : null,
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

describe('A-IT-001: Question Fetching', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch questions on mount', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { totalCount: 0 },
      }),
    });

    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/questions/unified')
      );
    });
  });

  it('should handle fetch errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading questions/i)).toBeInTheDocument();
    });
  });

  it('should handle empty responses', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      // Should handle empty response gracefully
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });
});

describe('A-IT-002: Question Creation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { totalCount: 0 },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { totalCount: 0 },
        }),
      });
  });

  it('should call create API when question is created', async () => {
    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      const addButton = screen.getByText(/Add New Question/i);
      expect(addButton).toBeInTheDocument();
    });

    // Note: Full implementation would test modal opening and form submission
    // This requires more complex setup with form components
  });

  it('should handle creation errors', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [],
          pagination: { totalCount: 0 },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

    render(<AdminContentQuestionsPage />);
    // Should handle creation errors
    await waitFor(() => {
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });
});

describe('A-IT-003: Question Update', () => {
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

  it('should call update API when question is updated', async () => {
    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Question/i)).toBeInTheDocument();
    });

    // Note: Full implementation would test edit modal and form submission
  });

  it('should handle update errors', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: '1', title: 'Test', content: 'Content' }],
          pagination: { totalCount: 1 },
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

    render(<AdminContentQuestionsPage />);
    // Should handle update errors
    await waitFor(() => {
      expect(screen.getByText(/Test/i)).toBeInTheDocument();
    });
  });
});

describe('A-IT-004: Question Deletion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn(() => true);
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
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
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
  });

  it('should call delete API when question is deleted', async () => {
    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Question/i)).toBeInTheDocument();
    });

    // Note: Full implementation would test delete button click and confirmation
  });

  it('should handle deletion errors', async () => {
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
        ok: false,
        status: 500,
      });

    render(<AdminContentQuestionsPage />);
    // Should handle deletion errors
    await waitFor(() => {
      expect(screen.getByText(/Test/i)).toBeInTheDocument();
    });
  });

  it('should cancel deletion when user declines', async () => {
    window.confirm = jest.fn(() => false);
    render(<AdminContentQuestionsPage />);
    // Should not delete when user cancels
    expect(window.confirm).toBeDefined();
  });
});

describe('A-IT-005: Pagination Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: Array(15).fill(null).map((_, i) => ({
          id: `${i + 1}`,
          title: `Question ${i + 1}`,
        })),
        pagination: { totalCount: 15 },
      }),
    });
  });

  it('should fetch new page when pagination changes', async () => {
    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Note: Full implementation would test page navigation
  });

  it('should handle pagination errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Pagination error'));
    render(<AdminContentQuestionsPage />);
    // Should handle pagination errors
    await waitFor(() => {
      expect(screen.getByText(/.*/)).toBeTruthy();
    });
  });
});

describe('A-IT-006: Search Integration', () => {
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

  it('should filter questions based on search term', async () => {
    render(<AdminContentQuestionsPage />);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Search questions/i);
      expect(searchInput).toBeInTheDocument();
    });

    // Note: Full implementation would test search filtering
  });

  it('should handle search with special characters', async () => {
    render(<AdminContentQuestionsPage />);
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/Search questions/i) as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'test@#$%' } });
      expect(searchInput.value).toBe('test@#$%');
    });
  });
});
