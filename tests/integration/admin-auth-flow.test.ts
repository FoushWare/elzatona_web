import { AdminAuthService } from '@/lib/admin-auth';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Admin Authentication Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Reset fetch mock to default behavior
    (global.fetch as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Complete Authentication Flow', () => {
    it('should complete full authentication flow from login to session validation', async () => {
      // Mock successful login response
      const loginResponse = {
        success: true,
        token: 'mock-jwt-token-123',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      // Mock successful session validation response
      const validationResponse = {
        success: true,
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      // Mock login API call
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => loginResponse,
        })
        // Mock session validation API call
        .mockResolvedValueOnce({
          ok: true,
          json: async () => validationResponse,
        });

      // Step 1: Authenticate admin
      const loginResult = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(loginResult.success).toBe(true);
      expect(loginResult.admin?.email).toBe('afouadsoftwareengineer@gmail.com');

      // Step 2: Validate session
      const mockSession = {
        id: 'admin-1',
        email: 'afouadsoftwareengineer@gmail.com',
        name: 'Admin User',
        role: 'super_admin' as const,
        token: 'mock-jwt-token-123',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      const validationResult =
        await AdminAuthService.validateSession(mockSession);

      expect(validationResult).toBe(true);

      // Verify API calls were made correctly
      expect(global.fetch).toHaveBeenCalledTimes(2);

      // Check login API call
      expect(global.fetch).toHaveBeenNthCalledWith(1, '/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'afouadsoftwareengineer@gmail.com',
          password: 'zatonafoushware$8888',
        }),
      });

      // Check validation API call
      expect(global.fetch).toHaveBeenNthCalledWith(2, '/api/admin/auth', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer mock-jwt-token-123',
        },
      });
    });

    it('should handle authentication failure and retry', async () => {
      // Mock failed login response
      const failedLoginResponse = {
        success: false,
        error: 'Invalid email or password',
      };

      // Mock successful login response on retry
      const successLoginResponse = {
        success: true,
        token: 'mock-jwt-token-456',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => failedLoginResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => successLoginResponse,
        });

      // First attempt - should fail
      const firstAttempt = await AdminAuthService.authenticateAdmin(
        'wrong@email.com',
        'wrongpassword'
      );

      expect(firstAttempt.success).toBe(false);
      expect(firstAttempt.error).toBe('Invalid email or password');

      // Second attempt - should succeed
      const secondAttempt = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(secondAttempt.success).toBe(true);
      expect(secondAttempt.admin?.email).toBe('afouadsoftwareengineer@gmail.com');
    });

    it('should handle session expiration and re-authentication', async () => {
      // Mock expired session response
      const expiredSessionResponse = {
        success: false,
        error: 'Token expired',
      };

      // Mock successful re-authentication
      const reAuthResponse = {
        success: true,
        token: 'new-jwt-token-789',
        admin: {
          id: 'admin-1',
          email: 'afouadsoftwareengineer@gmail.com',
          name: 'Admin User',
          role: 'super_admin',
        },
      };

      (global.fetch as jest.Mock).mockReset();
      (global.fetch as jest.Mock).mockImplementation((url, options) => {
        if (options?.method === 'GET') {
          // Session validation call
          return Promise.resolve({
            ok: true,
            json: async () => expiredSessionResponse,
          });
        } else if (options?.method === 'POST') {
          // Authentication call
          return Promise.resolve({
            ok: true,
            json: async () => reAuthResponse,
          });
        }
        return Promise.resolve({
          ok: false,
          json: async () => ({ success: false, error: 'Unknown method' }),
        });
      });

      // Try to validate expired session
      const expiredSession = {
        id: 'admin-1',
        email: 'afouadsoftwareengineer@gmail.com',
        name: 'Admin User',
        role: 'super_admin' as const,
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired
      };

      const validationResult = await AdminAuthService.validateSession(expiredSession);

      expect(validationResult).toBe(false);

      // Re-authenticate
      const reAuthResult = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(reAuthResult.success).toBe(true);
      expect(reAuthResult.admin?.email).toBe('afouadsoftwareengineer@gmail.com');
    });
  });

  describe('Session Management Integration', () => {
    it('should validate session correctly', async () => {
      // Mock successful session validation response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const validSession = {
        id: 'admin-1',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin' as const,
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      const isValid = await AdminAuthService.validateSession(validSession);
      expect(isValid).toBe(true);
    });

    it('should reject expired sessions', async () => {
      const expiredSession = {
        id: 'admin-1',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin' as const,
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Expired
      };

      const isValid = await AdminAuthService.validateSession(expiredSession);
      expect(isValid).toBe(false);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network errors gracefully', async () => {
      (global.fetch as jest.Mock).mockReset();
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication failed');
    });

    it('should handle malformed API responses', async () => {
      (global.fetch as jest.Mock).mockReset();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Authentication failed');
    });

    it('should handle HTTP error responses', async () => {
      (global.fetch as jest.Mock).mockReset();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      });

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Server error');
    });
  });

  describe('Security Integration', () => {
    it('should not expose sensitive data in error messages', async () => {
      const mockResponse = {
        success: false,
        error: 'Invalid credentials',
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await AdminAuthService.authenticateAdmin(
        'afouadsoftwareengineer@gmail.com',
        'zatonafoushware$8888'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
      // Should not expose password or other sensitive data
      expect(result.error).not.toContain('zatonafoushware$8888');
    });

    it('should handle token validation securely', async () => {
      const mockResponse = {
        success: false,
        error: 'Invalid token',
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const invalidSession = {
        id: 'admin-1',
        email: 'afouadsoftwareengineer@gmail.com',
        name: 'Admin User',
        role: 'super_admin' as const,
        token: 'invalid-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };

      const result = await AdminAuthService.validateSession(invalidSession);

      expect(result).toBe(false);
    });
  });
});
