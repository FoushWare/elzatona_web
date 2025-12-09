/**
 * Integration Tests for Admin Dashboard (A-IT-013, A-IT-014)
 * Task: A-003 - Admin Dashboard
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboard from './page';
import { useAdminAuth } from '@elzatona/contexts';

jest.mock('@elzatona/contexts', () => {
  const actual = jest.requireActual('@elzatona/contexts');
  return {
    ...actual,
    useAdminAuth: jest.fn(),
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    NotificationProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const mockRefetch = jest.fn();
jest.mock('@elzatona/hooks', () => ({
  useAdminStats: jest.fn(() => ({
    data: {
      questions: 100,
      categories: 10,
      topics: 50,
      learningCards: 5,
      learningPlans: 3,
      frontendTasks: 20,
      problemSolvingTasks: 15,
      totalContent: 200,
      totalUsers: 50,
    },
    isLoading: false,
    error: null,
    refetch: mockRefetch,
    isRefetching: false,
  })),
}));

jest.mock('lucide-react', () => ({
  BookOpen: () => <span>📖</span>,
  HelpCircle: () => <span>❓</span>,
  CreditCard: () => <span>💳</span>,
  FileText: () => <span>📄</span>,
  Settings: () => <span>⚙️</span>,
  Code: () => <span>💻</span>,
  Calculator: () => <span>🔢</span>,
  BarChart3: () => <span>📊</span>,
  FolderOpen: () => <span>📁</span>,
  Folder: () => <span>📁</span>,
  Tag: () => <span>🏷️</span>,
  Users: () => <span>👥</span>,
  Database: () => <span>🗄️</span>,
  TrendingUp: () => <span>📈</span>,
  CheckCircle: () => <span>✅</span>,
  Clock: () => <span>⏰</span>,
  Target: () => <span>🎯</span>,
  Activity: () => <span>📊</span>,
  Zap: () => <span>⚡</span>,
  Star: () => <span>⭐</span>,
  ArrowRight: () => <span>→</span>,
  Plus: () => <span>+</span>,
  Eye: () => <span>👁️</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  RefreshCw: () => <span>🔄</span>,
  AlertCircle: () => <span>⚠️</span>,
  Info: () => <span>ℹ️</span>,
  ExternalLink: () => <span>🔗</span>,
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('A-IT-013: Dashboard Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        email: 'admin@example.com',
        role: 'super_admin',
        name: 'Admin User',
      },
    });
  });

  it('should display all admin menu items', () => {
    render(<AdminDashboard />);
    
    // Check for quick actions that are actually displayed
    expect(screen.getByText(/Add New Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Frontend Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Problem Solving/i)).toBeInTheDocument();
  });

  it('should display quick actions', () => {
    render(<AdminDashboard />);
    
    expect(screen.getByText(/Add New Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage Learning Cards/i)).toBeInTheDocument();
  });
});

describe('A-IT-014: Stats Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        email: 'admin@example.com',
        role: 'super_admin',
        name: 'Admin User',
      },
    });
  });

  it('should display stats from useAdminStats hook', () => {
    render(<AdminDashboard />);
    
    // Stats should be displayed
    expect(screen.getByText(/100/)).toBeInTheDocument(); // questions count
  });

  it('should handle loading state', () => {
    const { useAdminStats } = require('@elzatona/hooks');
    useAdminStats.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: mockRefetch,
      isRefetching: false,
    });
    
    const { rerender } = render(<AdminDashboard />);
    rerender(<AdminDashboard />);
    
    // Should show loading state
    expect(screen.queryByText(/100/)).not.toBeInTheDocument();
  });
});
