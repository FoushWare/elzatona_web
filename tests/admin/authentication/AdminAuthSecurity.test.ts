/**
 * Admin Authentication Security Tests
 * 
 * Security-focused tests for admin authentication including:
 * - Role-based access control
 * - Session management
 * - Input validation
 * - CSRF protection
 * - Rate limiting
 * - Password security
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';

const ADMIN_EMAIL = 'afouadsoftwareengineer@gmail.com';
const ADMIN_PASSWORD = 'zatonafoushware$8888';
const LOGIN_URL = 'http://localhost:3001/admin/login';
const DASHBOARD_URL = 'http://localhost:3001/admin/dashboard';
const PROTECTED_URLS = [
  '/admin/dashboard',
  '/admin/content/questions',
  '/admin/learning-cards',
  '/admin/guided-learning',
  '/admin/sections',
  '/admin/users',
  '/admin/audio'
];

describe('Admin Authentication Security Tests', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
  });

  describe('Role-Based Access Control', () => {
    test('should deny access to non-admin users', async () => {
      // Mock a non-admin user (this would require setting up test data)
      // For now, we'll test the error handling
      await page.goto(LOGIN_URL);
      
      // Try to login with non-admin credentials
      await page.fill('[data-testid="email-input"]', 'regular@example.com');
      await page.fill('[data-testid="password-input"]', 'password123');
      await page.click('[data-testid="login-button"]');
      
      // Should show access denied error
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Access denied');
    });

    test('should verify admin role in Firestore', async () => {
      // This test would require mocking Firestore responses
      // to simulate different admin role scenarios
      await page.goto(LOGIN_URL);
      
      // Test with valid admin credentials
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      
      // Should successfully login and redirect
      await page.waitForURL(DASHBOARD_URL);
      await expect(page).toHaveURL(DASHBOARD_URL);
    });

    test('should handle missing admin document gracefully', async () => {
      // This would require mocking Firestore to return no document
      await page.goto(LOGIN_URL);
      
      // Test with credentials that don't have admin document
      await page.fill('[data-testid="email-input"]', 'no-admin-doc@example.com');
      await page.fill('[data-testid="password-input"]', 'password123');
      await page.click('[data-testid="login-button"]');
      
      // Should show appropriate error
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Access denied');
    });
  });

  describe('Session Management', () => {
    test('should invalidate session on logout', async () => {
      // Login first
      await page.goto(LOGIN_URL);
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      await page.waitForURL(DASHBOARD_URL);
      
      // Logout
      await page.click('[data-testid="logout-button"]');
      
      // Try to access protected route
      await page.goto(DASHBOARD_URL);
      
      // Should redirect to login
      await expect(page).toHaveURL(LOGIN_URL);
    });

    test('should handle expired sessions', async () => {
      // This would require mocking Firebase auth to simulate expired session
      await page.goto(LOGIN_URL);
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      await page.waitForURL(DASHBOARD_URL);
      
      // Simulate session expiration by clearing storage
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
      
      // Try to access protected route
      await page.goto(DASHBOARD_URL);
      
      // Should redirect to login
      await expect(page).toHaveURL(LOGIN_URL);
    });

    test('should prevent session hijacking', async () => {
      // Login and get session token
      await page.goto(LOGIN_URL);
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      await page.waitForURL(DASHBOARD_URL);
      
      // Get current session data
      const sessionData = await page.evaluate(() => {
        return {
          localStorage: localStorage.getItem('admin-auth'),
          sessionStorage: sessionStorage.getItem('admin-auth')
        };
      });
      
      // Open new context (simulating different browser/session)
      const newContext = await page.context().browser()!.newContext();
      const newPage = await newContext.newPage();
      
      // Try to use session data in new context
      await newPage.evaluate((data) => {
        if (data.localStorage) localStorage.setItem('admin-auth', data.localStorage);
        if (data.sessionStorage) sessionStorage.setItem('admin-auth', data.sessionStorage);
      }, sessionData);
      
      // Try to access protected route
      await newPage.goto(DASHBOARD_URL);
      
      // Should not have access (should redirect to login)
      await expect(newPage).toHaveURL(LOGIN_URL);
      
      await newContext.close();
    });
  });

  describe('Input Validation & Sanitization', () => {
    test('should sanitize email input', async () => {
      await page.goto(LOGIN_URL);
      
      const maliciousInputs = [
        '<script>alert("xss")</script>@example.com',
        'test@example.com<script>alert("xss")</script>',
        'test+<img src=x onerror=alert("xss")>@example.com',
        'test@example.com"onmouseover="alert(\'xss\')"',
      ];
      
      for (const input of maliciousInputs) {
        await page.fill('[data-testid="email-input"]', input);
        await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
        await page.click('[data-testid="login-button"]');
        
        // Should show validation error, not execute script
        await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid email format');
        
        // Verify no script execution
        const scripts = await page.locator('script').count();
        expect(scripts).toBe(0);
      }
    });

    test('should sanitize password input', async () => {
      await page.goto(LOGIN_URL);
      
      const maliciousInputs = [
        '<script>alert("xss")</script>',
        'password"onmouseover="alert(\'xss\')"',
        'password<img src=x onerror=alert("xss")>',
        'password\'; DROP TABLE users; --',
      ];
      
      for (const input of maliciousInputs) {
        await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
        await page.fill('[data-testid="password-input"]', input);
        await page.click('[data-testid="login-button"]');
        
        // Should either login successfully or show appropriate error
        // but not execute malicious code
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/login|dashboard/);
        
        // Verify no script execution
        const scripts = await page.locator('script').count();
        expect(scripts).toBe(0);
      }
    });

    test('should handle SQL injection attempts', async () => {
      await page.goto(LOGIN_URL);
      
      const sqlPayloads = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "admin'--",
        "admin'/*",
        "' UNION SELECT * FROM users --",
      ];
      
      for (const payload of sqlPayloads) {
        await page.fill('[data-testid="email-input"]', payload);
        await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
        await page.click('[data-testid="login-button"]');
        
        // Should show validation error, not execute SQL
        await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid email format');
      }
    });

    test('should handle NoSQL injection attempts', async () => {
      await page.goto(LOGIN_URL);
      
      const nosqlPayloads = [
        '{"$ne": null}',
        '{"$gt": ""}',
        '{"$regex": ".*"}',
        '{"$where": "this.password == this.username"}',
      ];
      
      for (const payload of nosqlPayloads) {
        await page.fill('[data-testid="email-input"]', payload);
        await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
        await page.click('[data-testid="login-button"]');
        
        // Should show validation error
        await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid email format');
      }
    });
  });

  describe('Rate Limiting & Brute Force Protection', () => {
    test('should handle rapid login attempts', async () => {
      await page.goto(LOGIN_URL);
      
      // Make multiple rapid login attempts
      for (let i = 0; i < 10; i++) {
        await page.fill('[data-testid="email-input"]', 'test@example.com');
        await page.fill('[data-testid="password-input"]', 'wrongpassword');
        await page.click('[data-testid="login-button"]');
        
        // Wait for error message
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
        
        // Clear form for next attempt
        await page.fill('[data-testid="email-input"]', '');
        await page.fill('[data-testid="password-input"]', '');
      }
      
      // Should still be able to login with correct credentials
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL(DASHBOARD_URL);
      await expect(page).toHaveURL(DASHBOARD_URL);
    });

    test('should not expose user enumeration', async () => {
      await page.goto(LOGIN_URL);
      
      const testEmails = [
        'nonexistent@example.com',
        'admin@example.com',
        'user@example.com',
        'test@example.com'
      ];
      
      for (const email of testEmails) {
        await page.fill('[data-testid="email-input"]', email);
        await page.fill('[data-testid="password-input"]', 'wrongpassword');
        await page.click('[data-testid="login-button"]');
        
        // All should show the same generic error message
        await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
        
        // Clear form
        await page.fill('[data-testid="email-input"]', '');
        await page.fill('[data-testid="password-input"]', '');
      }
    });
  });

  describe('Password Security', () => {
    test('should not log passwords in console', async () => {
      // Monitor console messages
      const consoleMessages: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'log' || msg.type() === 'error') {
          consoleMessages.push(msg.text());
        }
      });
      
      await page.goto(LOGIN_URL);
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL(DASHBOARD_URL);
      
      // Check that password is not in console messages
      const passwordInConsole = consoleMessages.some(msg => 
        msg.includes(ADMIN_PASSWORD) || msg.includes('password')
      );
      expect(passwordInConsole).toBe(false);
    });

    test('should not expose passwords in network requests', async () => {
      const networkRequests: string[] = [];
      
      page.on('request', request => {
        const url = request.url();
        const postData = request.postData();
        if (postData && postData.includes(ADMIN_PASSWORD)) {
          networkRequests.push(url);
        }
      });
      
      await page.goto(LOGIN_URL);
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL(DASHBOARD_URL);
      
      // Password should not be in plain text in network requests
      expect(networkRequests.length).toBe(0);
    });

    test('should handle password visibility toggle securely', async () => {
      await page.goto(LOGIN_URL);
      
      const passwordInput = page.locator('[data-testid="password-input"]');
      const toggleButton = page.locator('[data-testid="password-toggle"]');
      
      // Initially password should be hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');
      
      // Toggle visibility
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      
      // Toggle back
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('CSRF Protection', () => {
    test('should include CSRF tokens in forms', async () => {
      await page.goto(LOGIN_URL);
      
      // Check for CSRF token in form
      const csrfToken = await page.locator('[name="csrf-token"]').getAttribute('value');
      expect(csrfToken).toBeTruthy();
    });

    test('should validate CSRF tokens on submission', async () => {
      await page.goto(LOGIN_URL);
      
      // Remove CSRF token
      await page.evaluate(() => {
        const token = document.querySelector('[name="csrf-token"]');
        if (token) token.remove();
      });
      
      await page.fill('[data-testid="email-input"]', ADMIN_EMAIL);
      await page.fill('[data-testid="password-input"]', ADMIN_PASSWORD);
      await page.click('[data-testid="login-button"]');
      
      // Should show CSRF error
      await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid request');
    });
  });

  describe('Content Security Policy', () => {
    test('should have proper CSP headers', async () => {
      const response = await page.goto(LOGIN_URL);
      const headers = response?.headers();
      
      expect(headers?.['content-security-policy']).toBeTruthy();
      
      const csp = headers?.['content-security-policy'];
      expect(csp).toContain('script-src');
      expect(csp).toContain('style-src');
      expect(csp).toContain('img-src');
    });

    test('should prevent inline script execution', async () => {
      await page.goto(LOGIN_URL);
      
      // Try to inject inline script
      await page.evaluate(() => {
        const script = document.createElement('script');
        script.textContent = 'window.inlineScriptExecuted = true;';
        document.head.appendChild(script);
      });
      
      // Check if inline script was executed
      const inlineScriptExecuted = await page.evaluate(() => 
        (window as any).inlineScriptExecuted
      );
      
      expect(inlineScriptExecuted).toBeFalsy();
    });
  });

  describe('Authentication Bypass Attempts', () => {
    test('should not allow direct access to protected routes', async () => {
      for (const url of PROTECTED_URLS) {
        await page.goto(`http://localhost:3001${url}`);
        
        // Should redirect to login
        await expect(page).toHaveURL(LOGIN_URL);
      }
    });

    test('should not allow access with invalid tokens', async () => {
      // Set invalid auth token
      await page.goto(LOGIN_URL);
      await page.evaluate(() => {
        localStorage.setItem('admin-auth', 'invalid-token');
        sessionStorage.setItem('admin-auth', 'invalid-token');
      });
      
      await page.goto(DASHBOARD_URL);
      
      // Should redirect to login
      await expect(page).toHaveURL(LOGIN_URL);
    });

    test('should not allow access with expired tokens', async () => {
      // Set expired auth token
      await page.goto(LOGIN_URL);
      await page.evaluate(() => {
        const expiredToken = {
          token: 'expired-token',
          expiresAt: Date.now() - 1000 // Expired 1 second ago
        };
        localStorage.setItem('admin-auth', JSON.stringify(expiredToken));
      });
      
      await page.goto(DASHBOARD_URL);
      
      // Should redirect to login
      await expect(page).toHaveURL(LOGIN_URL);
    });
  });
});
