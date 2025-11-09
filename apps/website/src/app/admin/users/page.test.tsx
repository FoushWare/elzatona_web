/**
 * Unit Tests for Admin User Management (A-UT-018)
 * Task: A-007 - Admin User Management
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserManagementPage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

// Mock shared contexts
jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useAuth: jest.fn(),
    useAdminAuth: jest.fn(),
  };
});

// Mock fetch
global.fetch = jest.fn();

jest.mock('lucide-react', () => ({
  Users: () => <span>👥</span>,
  UserPlus: () => <span>➕</span>,
  Shield: () => <span>🛡️</span>,
  Crown: () => <span>👑</span>,
  Star: () => <span>⭐</span>,
  Mail: () => <span>📧</span>,
  Calendar: () => <span>📅</span>,
  Activity: () => <span>📊</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>🔽</span>,
  MoreVertical: () => <span>⋮</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  Eye: () => <span>👁️</span>,
  RefreshCw: () => <span>🔄</span>,
}));

describe('A-UT-018: Component Renders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      user: { id: '1', email: 'admin@example.com' },
    });
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    });
  });

  it('should render without errors', async () => {
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it('should display access denied for non-admin users', () => {
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });
    
    render(<UserManagementPage />);
    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
  });

  it('should fetch users on mount', async () => {
    render(<UserManagementPage />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users');
    });
  });
});

describe('A-UT-SNAPSHOT: Admin User Management Snapshot Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      user: { id: '1', email: 'admin@example.com' },
    });
    
    (sharedContexts.useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
    
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [],
      }),
    });
  });

  it('should match admin user management page snapshot', async () => {
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should match admin user management page snapshot (with users)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        users: [
          { id: '1', email: 'user1@example.com', role: 'user' },
          { id: '2', email: 'user2@example.com', role: 'admin' },
        ],
      }),
    });
    
    const { container } = render(<UserManagementPage />);
    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
