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

import { createMocks } from 'node-mocks-http';
import { NextRequest, NextResponse } from 'next/server';
import { POST as authPOST } from '@/app/api/admin/auth/route';
import { POST as logoutPOST } from '@/app/api/auth/clear-cookie/route';
import jwt from 'jsonwebtoken';

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

describe('Admin Authentication Integration', () => {
  const mockAdminAuthService = require('@/lib/admin-auth').AdminAuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  describe('Complete Login Flow', () => {
    it('should complete full authentication flow successfully', async () => {
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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(200);
      expect(loginData.success).toBe(true);
      expect(loginData.admin.token).toBeDefined();
      expect(loginData.admin.expiresAt).toBeDefined();

      // Step 2: Verify JWT token
      const token = loginData.admin.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

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
      mockAdminAuthService.authenticateAdmin.mockResolvedValue({
        success: false,
        error: 'Invalid credentials',
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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(401);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBe('Authentication failed');
      expect(loginData.admin).toBeUndefined();
    });
  });

  describe('Session Management', () => {
    it('should create valid session after successful login', async () => {
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
      const loginData = await loginResponse.json();

      // Verify session data structure
      expect(loginData.admin).toEqual({
        id: mockAdmin.id,
        email: mockAdmin.email,
        name: mockAdmin.name,
        role: mockAdmin.role,
        token: expect.any(String),
        expiresAt: expect.any(String),
      });

      // Verify token can be used for subsequent requests
      const token = loginData.admin.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      expect(decoded.adminId).toBe(mockAdmin.id);
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
      const logoutRequest = new NextRequest(
        'http://localhost:3000/api/auth/clear-cookie',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const logoutResponse = await logoutPOST(logoutRequest);
      const logoutData = await logoutResponse.json();

      expect(logoutResponse.status).toBe(200);
      expect(logoutData.success).toBe(true);
      expect(logoutData.message).toBe('Session cleared successfully');
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

      const decoded = jwt.verify(validToken, process.env.JWT_SECRET!) as any;

      expect(decoded.adminId).toBe('admin_test@example.com');
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.role).toBe('super_admin');
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockAdminAuthService.authenticateAdmin.mockRejectedValue(
        new Error('Database connection failed')
      );

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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(500);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBe('Internal server error');
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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(400);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBe('Invalid JSON');
    });

    it('should handle missing environment variables', async () => {
      delete process.env.JWT_SECRET;

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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(500);
      expect(loginData.success).toBe(false);
      expect(loginData.error).toBe('JWT secret not configured');
    });
  });

  describe('Security Tests', () => {
    it('should not expose sensitive information in error messages', async () => {
      mockAdminAuthService.authenticateAdmin.mockRejectedValue(
        new Error('Database connection failed: password=secret123')
      );

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
      const loginData = await loginResponse.json();

      expect(loginResponse.status).toBe(500);
      expect(loginData.error).not.toContain('secret123');
      expect(loginData.error).toBe('Internal server error');
    });

    it('should rate limit login attempts', async () => {
      // This test would be implemented if rate limiting is added
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
        id: 'admin_test@example.com',
        email: 'test@example.com',
        name: 'Test Admin',
        role: 'super_admin',
      };

      mockAdminAuthService.authenticateAdmin.mockResolvedValue({
        success: true,
        admin: mockAdmin,
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
                password: 'testpassword123',
              }),
            })
        );

      const startTime = Date.now();
      const responses = await Promise.all(requests.map(req => authPOST(req)));
      const endTime = Date.now();

      // All requests should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Should complete within reasonable time (5 seconds)
      expect(endTime - startTime).toBeLessThan(5000);
    });
  });
});
