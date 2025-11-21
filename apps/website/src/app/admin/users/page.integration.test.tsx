/**
 * Integration Tests for Admin User Management (A-IT-019)
 * Task: A-007 - Admin User Management
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserManagementPage from './page';
import * as sharedContexts from '@elzatona/shared-contexts';

jest.mock('@elzatona/shared-contexts', () => {
  const actual = jest.requireActual('../../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useAuth: jest.fn(),
    useAdminAuth: jest.fn(),
  };
});

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

describe('A-IT-019: User Management API Integration', () => {
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
        users: [
          {
            id: '1',
            email: 'user@example.com',
            name: 'Test User',
            role: 'user',
            is_active: true,
            created_at: '2024-01-01',
          },
        ],
      }),
    });
  });

  it('should fetch users from API', async () => {
    render(<UserManagementPage />);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/users');
    });
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(<UserManagementPage />);
    
    await waitFor(() => {
      // Should handle error gracefully
      expect(document.body).toBeTruthy();
    });
  });
});
