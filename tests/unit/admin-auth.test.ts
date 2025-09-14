import { AdminAuthService } from '@/lib/admin-auth';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('AdminAuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('authenticateAdmin', () => {
    it('should authenticate admin with valid credentials', async () => {
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(true);
      expect(result.admin?.email).toBe('afouadsoftwareengineer@gmail.com');
    });

    it('should reject authentication with invalid credentials', async () => {
      const mockResponse = {
        success: false,
        error: 'Invalid email or password',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await AdminAuthService.authenticateAdmin(
        'wrong@email.com',
        'wrongpassword'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid email or password');
    });

    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication failed');
    });
  });

  describe('validateSession', () => {
    it('should validate a valid session', async () => {
      const mockSession = {
        id: 'admin-1',
        email: 'afouadsoftwareengineer@gmail.com',
        name: 'Admin User',
        role: 'super_admin' as const,
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await AdminAuthService.validateSession(mockSession);
      expect(result).toBe(true);
    });

    it('should reject an invalid session', async () => {
      const invalidSession = {
        id: 'admin-1',
        email: 'afouadsoftwareengineer@gmail.com',
        name: 'Admin User',
        role: 'super_admin' as const,
        token: 'invalid-token',
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired
      };

      const result = await AdminAuthService.validateSession(invalidSession);
      expect(result).toBe(false);
    });
  });
});
