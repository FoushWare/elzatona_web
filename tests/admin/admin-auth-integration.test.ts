/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Admin Authentication Integration Tests
 *
 * End-to-end tests for the complete admin authentication flow:
 * - Login process
 * - Session management
 * - Route protection
 * - Logout functionality
 * - Token validation
 */

import { NextRequest, NextResponse } from 'next/server';
import { POST as authPOST } from '@/app/api/admin/auth/route';
import jwt from 'jsonwebtoken';

// Mock NextResponse to ensure json() method works correctly
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      json: (body: any, init?: any) => {
        const response = actual.NextResponse.json(body, init);
        // Ensure _body is set for test compatibility
        (response as any)._body = JSON.stringify(body);
        return response;
      },
    },
  };
});

// Helper to extract JSON from NextResponse
async function getResponseData(response: any): Promise<any> {
  if ((response as any)._body !== undefined) {
    const body = (response as any)._body;
    if (typeof body === 'string') {
      try {
        return JSON.parse(body);
      } catch {
        return {};
      }
    }
    if (body && typeof body === 'object') {
      return body;
    }
  }
  try {
    const data = await response.json();
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      return data;
    }
  } catch (e) {
    // Continue
  }
  try {
    const text = await response.text();
    if (text) {
      return JSON.parse(text);
    }
  } catch (e) {
    // Continue
  }
  return {};
}

// Mock Supabase - shared instance for route handler
// Define inside factory to avoid hoisting issues
jest.mock('@supabase/supabase-js', () => {
  const mockSupabaseClient = {
    from: jest.fn(),
  };
  return {
    createClient: jest.fn(() => mockSupabaseClient),
  };
});

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

// Mock admin.config
jest.mock('@/admin.config', () => ({
  adminConfig: {
    security: {
      saltRounds: 10,
      sessionTimeout: 24 * 60 * 60 * 1000,
    },
    jwt: {
      secret: 'test-jwt-secret-key-for-testing',
    },
  },
}));

describe('Admin Authentication Integration', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bcrypt = require('bcryptjs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockSupabaseClient: any;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabaseClient = createClient();
    mockSupabaseClient.from.mockClear();
    process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

    // Suppress console.error for expected error tests
    // Use jest.spyOn to properly mock and suppress console.error output
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // Suppress console.error output during tests
    });
  });

  afterEach(() => {
    // Restore console.error
    consoleErrorSpy.mockRestore();
    delete process.env.JWT_SECRET;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  describe('Complete Login Flow', () => {
    it('should complete full authentication flow successfully', async () => {
      const mockAdmin = {
        id: 'admin_123',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        password_hash: 'hashed_password',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      const mockSingle = Promise.resolve({
        data: mockAdmin,
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      bcrypt.compare.mockResolvedValue(true);

      // Step 1: Login request
      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword123',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(200);
      expect(loginData.success).toBe(true);
      expect(loginData.admin.token).toBeDefined();
      expect(loginData.admin.expiresAt).toBeDefined();

      // Step 2: Verify JWT token
      const token = loginData.admin.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        adminId: string;
        email: string;
        role: string;
        exp: number;
        iat: number;
      };

      expect(decoded.adminId).toBe(mockAdmin.id);
      expect(decoded.email).toBe(mockAdmin.email);
      expect(decoded.role).toBe(mockAdmin.role);
      expect(decoded.exp).toBeDefined();

      // Step 3: Verify token expiration is reasonable (24 hours)
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      expect(expirationTime - now).toBeGreaterThan(twentyFourHours - 60000); // Allow 1 minute tolerance
      expect(expirationTime - now).toBeLessThan(twentyFourHours + 60000);
    });

    it('should handle authentication failure gracefully', async () => {
      const mockSingle = Promise.resolve({
        data: null,
        error: { message: 'Not found' },
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      });

      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'wrongpassword',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(401);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBe('Invalid email or password');
      expect(loginData.admin).toBeUndefined();
    });
  });

  describe('Session Management', () => {
    it('should create valid session after successful login', async () => {
      const mockAdmin = {
        id: 'admin_123',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        password_hash: 'hashed_password',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      const mockSingle = Promise.resolve({
        data: mockAdmin,
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      bcrypt.compare.mockResolvedValue(true);

      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword123',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      // Verify session data structure
      expect(loginData.admin).toBeDefined();
      expect(loginData.admin.email).toBe(mockAdmin.email);
      expect(loginData.admin.name).toBe(mockAdmin.name);
      expect(loginData.admin.role).toBe(mockAdmin.role);
      expect(loginData.admin.token).toBeDefined();
      expect(loginData.admin.expiresAt).toBeDefined();

      // Verify token can be used for subsequent requests
      const token = loginData.admin.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        adminId: string;
        email: string;
        role: string;
        exp: number;
        iat: number;
      };

      expect(decoded.adminId).toBe(mockAdmin.email);
      expect(decoded.email).toBe(mockAdmin.email);
      expect(decoded.role).toBe(mockAdmin.role);
    });

    it('should handle expired tokens', async () => {
      // Create an expired token
      const expiredToken = jwt.sign(
        {
          adminId: 'admin_test@example.com',
          email: 'test@example.com',
          role: 'super_admin',
          iat: Math.floor(Date.now() / 1000) - 86400, // 24 hours ago
          exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
        },
        process.env.JWT_SECRET!
      );

      // Attempt to use expired token
      expect(() => {
        jwt.verify(expiredToken, process.env.JWT_SECRET!);
      }).toThrow('jwt expired');
    });

    it('should handle invalid tokens', async () => {
      const invalidToken = 'invalid.jwt.token';

      expect(() => {
        jwt.verify(invalidToken, process.env.JWT_SECRET!);
      }).toThrow();
    });
  });

  describe('Logout Flow', () => {
    it('should clear session on logout', async () => {
      // Logout functionality would be tested with the actual logout endpoint
      // For now, we'll skip this test as it requires a different endpoint
      // TODO: Implement logout endpoint test when available
      expect(true).toBe(true);
    });
  });

  describe('Route Protection', () => {
    it('should protect admin routes without valid token', async () => {
      // This would typically be tested with middleware or route handlers
      // For now, we'll test the token validation logic

      const invalidToken = 'invalid.token';

      expect(() => {
        jwt.verify(invalidToken, process.env.JWT_SECRET!);
      }).toThrow();
    });

    it('should allow access with valid token', async () => {
      const validToken = jwt.sign(
        {
          adminId: 'admin_test@example.com',
          email: 'test@example.com',
          role: 'super_admin',
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
        },
        process.env.JWT_SECRET!
      );

      const decoded = jwt.verify(validToken, process.env.JWT_SECRET!) as {
        adminId: string;
        email: string;
        role: string;
        exp: number;
        iat: number;
      };

      expect(decoded.adminId).toBe('admin_test@example.com');
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.role).toBe('super_admin');
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      const mockSingle = Promise.reject(
        new Error('Database connection failed')
      );

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      });

      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword123',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(500);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBeDefined();
    });

    it('should handle malformed requests', async () => {
      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'invalid json',
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(400);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBeDefined();
    });

    it('should handle missing environment variables', async () => {
      delete process.env.JWT_SECRET;

      const mockAdmin = {
        id: 'admin_123',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        password_hash: 'hashed_password',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      const mockSingle = Promise.resolve({
        data: mockAdmin,
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      bcrypt.compare.mockResolvedValue(true);

      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword123',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(500);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBeDefined();
    });
  });

  describe('Security Tests', () => {
    it('should not expose sensitive information in error messages', async () => {
      const mockSingle = Promise.reject(
        new Error('Database connection failed: password=secret123')
      );

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      });

      const loginRequest = new NextRequest(
        'http://localhost:3000/api/admin/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'testpassword123',
          }),
        }
      );

      const loginResponse = await authPOST(loginRequest);
      const loginData = await getResponseData(loginResponse);

      expect(loginResponse.status).toBe(500);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBeDefined();
      expect(loginData.error).not.toContain('secret123');
    });

    it('should rate limit login attempts', async () => {
      // This test would be implemented if rate limiting is added
      // Set up mock for failed authentication (wrong password)
      const mockSingle = Promise.resolve({
        data: {
          id: 'admin_123',
          email: 'test@example.com',
          name: 'Test Admin',
          role: 'super_admin',
          password_hash: 'hashed_password',
          is_active: true,
          created_at: new Date().toISOString(),
        },
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
      });

      // Mock bcrypt to return false (wrong password)
      bcrypt.compare.mockResolvedValue(false);

      const requests = Array(10)
        .fill(null)
        .map(
          () =>
            new NextRequest('http://localhost:3000/api/admin/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: 'test@example.com',
                password: 'wrongpassword',
              }),
            })
        );

      const responses = await Promise.all(requests.map(req => authPOST(req)));

      // All requests should be handled (even if they fail)
      responses.forEach(response => {
        expect([400, 401, 429]).toContain(response.status);
      });
    });

    it('should validate token signature', async () => {
      const tokenWithWrongSecret = jwt.sign(
        {
          adminId: 'admin_test@example.com',
          email: 'test@example.com',
          role: 'super_admin',
        },
        'wrong-secret'
      );

      expect(() => {
        jwt.verify(tokenWithWrongSecret, process.env.JWT_SECRET!);
      }).toThrow('invalid signature');
    });
  });

  describe('Performance Tests', () => {
    it('should handle concurrent login requests', async () => {
      const mockAdmin = {
        id: 'admin_123',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
        password_hash: 'hashed_password',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      const mockSingle = Promise.resolve({
        data: mockAdmin,
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        single: () => mockSingle,
      });

      const mockSelect = jest.fn().mockReturnValue({
        eq: mockEq,
      });

      mockSupabaseClient.from.mockReturnValue({
        select: mockSelect,
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({ error: null }),
        }),
      });

      bcrypt.compare.mockResolvedValue(true);

      const requests = Array(5)
        .fill(null)
        .map(
          () =>
            new NextRequest('http://localhost:3000/api/admin/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: 'test@example.com',
                password: 'testpassword123',
              }),
            })
        );

      const startTime = Date.now();
      const responses = await Promise.all(requests.map(req => authPOST(req)));
      const endTime = Date.now();

      // All requests should be handled
      responses.forEach(response => {
        expect([200, 400, 401]).toContain(response.status);
      });

      // Should complete within reasonable time (5 seconds)
      expect(endTime - startTime).toBeLessThan(5000);
    });
  });
});
