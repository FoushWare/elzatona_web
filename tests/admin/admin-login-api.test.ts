/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Admin Login API Tests
 *
 * Tests for the /api/admin/auth endpoint to ensure:
 * - Authentication works correctly
 * - Proper error handling
 * - JWT token generation
 * - Security measures
 */

import { NextRequest, NextResponse } from 'next/server';
import { POST } from '@/app/api/admin/auth/route';

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
  // NextResponse.json() stores data in response._body or response.body
  // Check all possible locations

  // Method 1: Try json() method
  try {
    const data = await response.json();
    if (data && typeof data === 'object' && Object.keys(data).length > 0) {
      return data;
    }
  } catch (_e) {
    // Continue to other methods
  }

  // Method 2: Check internal _body property (NextResponse might use this)
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

  // Method 3: Try text() method
  try {
    const text = await response.text();
    if (text) {
      return JSON.parse(text);
    }
  } catch (_e) {
    // Continue
  }

  // Method 4: Try body ReadableStream
  if (response.body) {
    try {
      const reader = response.body.getReader();
      const { value, done } = await reader.read();
      if (!done && value) {
        const text = new TextDecoder().decode(value);
        return JSON.parse(text);
      }
    } catch (_e) {
      // Continue
    }
  }

  // Method 5: Check if response has data property directly
  if ((response as any).data) {
    return (response as any).data;
  }

  return {};
}

// Mock Supabase - this needs to be set up before the route module is imported
// The route handler creates the client at module load, so we need a shared instance
// Define the mock client inside the factory to avoid hoisting issues
const mockSupabaseClient = {
  from: jest.fn(),
};

jest.mock('@supabase/supabase-js', () => {
  // Create the mock client inside the factory
  const client = {
    from: jest.fn(),
  };
  return {
    createClient: jest.fn(() => client),
  };
});

// Export the mock client so tests can configure it
// We'll get it from the mocked module

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
      sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    },
    jwt: {
      secret: 'test-jwt-secret',
    },
  },
  getAdminApiUrl: jest.fn((path: string) => `http://localhost:3000${path}`),
}));

describe('Admin Login API', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bcrypt = require('bcryptjs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require('@supabase/supabase-js');

  let mockSupabaseClient: any;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error globally to suppress error output during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Get the mock client instance (same one used by the route handler)
    mockSupabaseClient = createClient();
    // Reset the from mock for each test
    mockSupabaseClient.from.mockClear();
    // Set up environment variables
    process.env.JWT_SECRET = 'test-jwt-secret';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    // Restore console.error after each test
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
    }
  });

  describe('POST /api/admin/auth', () => {
    it('should authenticate admin with valid credentials', async () => {
      // Mock Supabase response
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

      // Mock bcrypt compare
      bcrypt.compare.mockResolvedValue(true);

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(200);
      expect(data).toBeDefined();
      expect(data.success).toBe(true);
      expect(data.admin).toBeDefined();
      expect(data.admin.email).toBe(mockAdmin.email);
      expect(data.admin.token).toBeDefined();
      expect(data.admin.token).toMatch(
        /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
      );
    });

    it('should reject authentication with invalid credentials', async () => {
      // Mock Supabase - admin not found
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Not found' },
      });

      mockSupabaseClient.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: mockSingle,
          }),
        }),
      });

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid email or password');
    });

    it('should reject authentication with wrong password', async () => {
      // Mock Supabase - admin found but wrong password
      const mockAdmin = {
        id: 'admin_123',
        email: 'test@example.com',
        password_hash: 'hashed_password',
        is_active: true,
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
      });

      // Mock bcrypt compare - wrong password
      bcrypt.compare.mockResolvedValue(false);

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid email or password');
    });

    it('should reject authentication with missing email', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Email and password are required');
    });

    it('should reject authentication with missing password', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Email and password are required');
    });

    it('should handle server errors gracefully', async () => {
      // Mock Supabase error
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

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('should handle requests without Content-Type header', async () => {
      // Mock Supabase - admin not found
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

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      // The route should still process the request if body is valid JSON
      // It will fail authentication (401) since admin is not found
      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should generate JWT token with correct expiration', async () => {
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

      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await getResponseData(response);

      expect(response.status).toBe(200);
      expect(data.admin.token).toBeDefined();
      expect(data.admin.expiresAt).toBeDefined();

      // Check that expiration is in the future
      const expirationDate = new Date(data.admin.expiresAt);
      const now = new Date();
      expect(expirationDate.getTime()).toBeGreaterThan(now.getTime());
    });

    it('should handle multiple requests', async () => {
      // Mock Supabase - admin not found for all requests
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
                password: 'wrongpassword',
              }),
            })
        );

      const responses = await Promise.all(requests.map(req => POST(req)));

      // All requests should be handled (even if they fail)
      responses.forEach(response => {
        expect([400, 401]).toContain(response.status);
      });
    });
  });
});
