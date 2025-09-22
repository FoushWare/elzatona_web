import { renderHook, act } from '@testing-library/react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useAdminAuth Hook - Advanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test('handles session validation timeout', async () => {
    // Mock slow session validation
    mockFetch.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({
                  valid: true,
                  user: {
                    id: '1',
                    email: 'admin@example.com',
                    name: 'Admin User',
                    role: 'super_admin',
                  },
                }),
              } as Response),
            2000
          )
        )
    );

    const { result } = renderHook(() => useAdminAuth());

    expect(result.current.isLoading).toBe(true);

    // Wait for timeout
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    expect(result.current.isLoading).toBe(false);
  });

  test('handles network errors during login', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles invalid credentials', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid credentials' }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'wrongpassword');
    });

    expect(result.current.error).toBe('Invalid credentials');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles server errors during login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal server error' }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.error).toBe('Internal server error');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles malformed login response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => null, // Malformed response
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.error).toBe('Invalid response format');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles expired token during session validation', async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000).toISOString(),
      })
    );

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Token expired' }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('adminSession');
  });

  test('handles concurrent login attempts', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    // Start multiple login attempts
    const login1 = act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    const login2 = act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    await Promise.all([login1, login2]);

    expect(result.current.isAuthenticated).toBe(true);
  });

  test('handles logout with network error', async () => {
    // First login successfully
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    // Mock logout network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      result.current.logout();
    });

    // Should still logout locally even if network fails
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('adminSession');
  });

  test('handles session validation with invalid token', async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        token: 'invalid-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      })
    );

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid token' }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('adminSession');
  });

  test('handles session validation with server error', async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        token: 'test-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      })
    );

    mockFetch.mockRejectedValueOnce(new Error('Server error'));

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('Server error');
  });

  test('handles localStorage errors', async () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe('localStorage error');
  });

  test('handles localStorage setItem errors during login', async () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('localStorage setItem error');
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.error).toBe('localStorage setItem error');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles rapid login/logout cycles', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          token: 'test-token',
          user: {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin User',
            role: 'super_admin',
          },
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ valid: true }),
      } as Response);

    const { result } = renderHook(() => useAdminAuth());

    // Rapid login/logout cycles
    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  test('handles different user roles correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: {
          id: '1',
          email: 'moderator@example.com',
          name: 'Moderator User',
          role: 'moderator',
        },
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('moderator@example.com', 'password');
    });

    expect(result.current.user?.role).toBe('moderator');
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('handles token refresh scenario', async () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify({
        token: 'old-token',
        expiresAt: new Date(Date.now() + 300000).toISOString(), // 5 minutes
      })
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        valid: true,
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'super_admin',
        },
        newToken: 'refreshed-token',
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      }),
    } as Response);

    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'adminSession',
      expect.stringContaining('refreshed-token')
    );
  });

  test('handles empty email/password during login', async () => {
    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('', '');
    });

    expect(result.current.error).toBe('Email and password are required');
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('handles invalid email format during login', async () => {
    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.login('invalid-email', 'password');
    });

    expect(result.current.error).toBe('Invalid email format');
    expect(result.current.isAuthenticated).toBe(false);
  });
});



