/**
 * Admin Login API Tests
 *
 * Tests for the /api/admin/auth endpoint to ensure:
 * - Authentication works correctly
 * - Proper error handling
 * - JWT token generation
 * - Security measures
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/admin/auth/route';
import { AdminAuthService } from '@/lib/admin-auth';

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  },
}));

// Mock AdminAuthService
jest.mock('@/lib/admin-auth', () => ({
  AdminAuthService: {
    authenticateAdmin: jest.fn(),
  },
}));

describe('Admin Login API', () => {
  const mockAdminAuthService = AdminAuthService as jest.Mocked<
    typeof AdminAuthService
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables
    process.env.JWT_SECRET = 'test-jwt-secret';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  describe('POST /api/admin/auth', () => {
    it('should authenticate admin with valid credentials', async () => {
      // Mock successful authentication
      const mockAdmin = {
        id: 'admin_test@example.com',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
      };

      mockAdminAuthService.authenticateAdmin.mockResolvedValue({
        success: true,
        admin: mockAdmin,
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
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.admin).toEqual({
        id: mockAdmin.id,
        email: mockAdmin.email,
        name: mockAdmin.name,
        role: mockAdmin.role,
        token: expect.any(String),
        expiresAt: expect.any(String),
      });
      expect(data.admin.token).toMatch(
        /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
      );
    });

    it('should reject authentication with invalid credentials', async () => {
      // Mock failed authentication
      mockAdminAuthService.authenticateAdmin.mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
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
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Authentication failed');
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
      const data = await response.json();

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
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Email and password are required');
    });

    it('should reject authentication with invalid email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'invalid-email',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid email format');
    });

    it('should handle server errors gracefully', async () => {
      // Mock server error
      mockAdminAuthService.authenticateAdmin.mockRejectedValue(
        new Error('Database connection failed')
      );

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
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Internal server error');
    });

    it('should reject requests without Content-Type header', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Content-Type must be application/json');
    });

    it('should reject requests with invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid JSON');
    });

    it('should generate JWT token with correct expiration', async () => {
      const mockAdmin = {
        id: 'admin_test@example.com',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
      };

      mockAdminAuthService.authenticateAdmin.mockResolvedValue({
        success: true,
        admin: mockAdmin,
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
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.admin.token).toBeDefined();
      expect(data.admin.expiresAt).toBeDefined();

      // Check that expiration is in the future
      const expirationDate = new Date(data.admin.expiresAt);
      const now = new Date();
      expect(expirationDate.getTime()).toBeGreaterThan(now.getTime());
    });

    it('should handle rate limiting (if implemented)', async () => {
      // This test would be implemented if rate limiting is added
      // For now, we'll just ensure the endpoint doesn't crash under load
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

      const responses = await Promise.all(requests.map(req => POST(req)));

      // All requests should be handled (even if they fail)
      responses.forEach(response => {
        expect([400, 401, 429]).toContain(response.status);
      });
    });
  });
});
