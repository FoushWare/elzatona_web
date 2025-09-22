import { renderHook, act } from '@testing-library/react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { AdminAuthService } from '@/lib/admin-auth';

// Mock the AdminAuthService
jest.mock('@/lib/admin-auth', () => ({
  AdminAuthService: {
    authenticateAdmin: jest.fn(),
    validateSession: jest.fn(),
  },
}));

const mockAdminAuthService = AdminAuthService as jest.Mocked<
  typeof AdminAuthService
>;

describe('useAdminAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear localStorage
    localStorage.clear();
  });

  test('should initialize with correct default state', () => {
    const { result } = renderHook(() => useAdminAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('should handle successful login', async () => {
    const mockAdmin = {
      id: 'admin_123',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'super_admin',
      token: 'jwt_token',
      expiresAt: '2025-12-31T23:59:59.999Z',
    };

    mockAdminAuthService.authenticateAdmin.mockResolvedValue({
      success: true,
      admin: mockAdmin,
    });

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      const loginResult = await result.current.login(
        'admin@example.com',
        'admin123'
      );
      expect(loginResult.success).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockAdmin);
    expect(result.current.error).toBeNull();
  });

  test('should handle failed login', async () => {
    mockAdminAuthService.authenticateAdmin.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      const loginResult = await result.current.login(
        'admin@example.com',
        'wrongpassword'
      );
      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe('Invalid credentials');
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe('Invalid credentials');
  });

  test('should handle login error', async () => {
    mockAdminAuthService.authenticateAdmin.mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      const loginResult = await result.current.login(
        'admin@example.com',
        'admin123'
      );
      expect(loginResult.success).toBe(false);
      expect(loginResult.error).toBe(
        'An unexpected error occurred during login'
      );
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBe(
      'An unexpected error occurred during login'
    );
  });

  test('should handle logout correctly', async () => {
    const mockAdmin = {
      id: 'admin_123',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'super_admin',
      token: 'jwt_token',
      expiresAt: '2025-12-31T23:59:59.999Z',
    };

    // First login to set authenticated state
    mockAdminAuthService.authenticateAdmin.mockResolvedValue({
      success: true,
      admin: mockAdmin,
    });

    const { result } = renderHook(() => useAdminAuth());

    // Login first
    await act(async () => {
      await result.current.login('admin@example.com', 'admin123');
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockAdmin);

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('should restore session from localStorage on mount', async () => {
    const mockAdmin = {
      id: 'admin_123',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'super_admin',
      token: 'jwt_token',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    };

    // Set session in localStorage
    localStorage.setItem('admin_session', JSON.stringify(mockAdmin));

    const { result } = renderHook(() => useAdminAuth());

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockAdmin);
  });

  test('should clear expired session from localStorage', async () => {
    const expiredAdmin = {
      id: 'admin_123',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'super_admin',
      token: 'jwt_token',
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    };

    // Set expired session in localStorage
    localStorage.setItem('admin_session', JSON.stringify(expiredAdmin));

    const { result } = renderHook(() => useAdminAuth());

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('admin_session')).toBeNull();
  });

  test('should handle localStorage errors gracefully', async () => {
    // Mock localStorage to throw an error
    const originalLocalStorage = global.localStorage;
    global.localStorage = {
      ...originalLocalStorage,
      getItem: jest.fn(() => {
        throw new Error('localStorage error');
      }),
    };

    const { result } = renderHook(() => useAdminAuth());

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();

    // Restore localStorage
    global.localStorage = originalLocalStorage;
  });

  test('should handle invalid session data in localStorage', async () => {
    // Set invalid session data
    localStorage.setItem('admin_session', 'invalid json');

    const { result } = renderHook(() => useAdminAuth());

    // Wait for the effect to run
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('admin_session')).toBeNull();
  });

  test('should set loading state during login', async () => {
    let resolveLogin: (value: any) => void;
    const loginPromise = new Promise(resolve => {
      resolveLogin = resolve;
    });

    mockAdminAuthService.authenticateAdmin.mockReturnValue(loginPromise);

    const { result } = renderHook(() => useAdminAuth());

    // Start login
    act(() => {
      result.current.login('admin@example.com', 'admin123');
    });

    // Should be loading
    expect(result.current.isLoading).toBe(true);

    // Resolve login
    await act(async () => {
      resolveLogin!({
        success: true,
        admin: {
          id: 'admin_123',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
          token: 'jwt_token',
          expiresAt: '2025-12-31T23:59:59.999Z',
        },
      });
    });

    // Should not be loading anymore
    expect(result.current.isLoading).toBe(false);
  });
});
