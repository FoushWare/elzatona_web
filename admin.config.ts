/**
 * Admin Configuration
 *
 * This file contains all admin-related configuration that should be
 * environment-based and not hardcoded.
 */

export const adminConfig = {
  // JWT Configuration
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (() => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('JWT_SECRET must be set in production environment');
        }
        return 'dev-secret-key-change-in-production';
      })(),
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Admin Port Configuration
  port: {
    admin: process.env.ADMIN_PORT || '3001',
    web: process.env.WEB_PORT || '3000',
  },

  // Admin URLs
  urls: {
    admin: process.env.ADMIN_URL || 'http://localhost:3001',
    web: process.env.WEB_URL || 'http://localhost:3000',
  },

  // Admin API Configuration
  api: {
    baseUrl: process.env.ADMIN_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(process.env.ADMIN_API_TIMEOUT || '10000'),
  },

  // Admin Credentials (for initialization only)
  credentials: {
    // These should only be used for initial setup
    // In production, admins should be created through the admin panel
    initialAdmin: {
      email: process.env.INITIAL_ADMIN_EMAIL || '',
      password: process.env.INITIAL_ADMIN_PASSWORD || '',
      name: process.env.INITIAL_ADMIN_NAME || 'Super Admin',
      role:
        (process.env.INITIAL_ADMIN_ROLE as 'super_admin' | 'admin') ||
        'super_admin',
    },
  },

  // Security Configuration
  security: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'),
    sessionTimeout: parseInt(process.env.ADMIN_SESSION_TIMEOUT || '86400000'), // 24 hours in ms
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5'),
    lockoutDuration: parseInt(process.env.LOCKOUT_DURATION || '900000'), // 15 minutes in ms
  },

  // Database Configuration
  database: {
    collectionName: process.env.ADMIN_COLLECTION_NAME || 'admins',
  },

  // Feature Flags
  features: {
    allowAdminCreation: process.env.ALLOW_ADMIN_CREATION === 'true',
    requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === 'true',
    enableAuditLogging: process.env.ENABLE_AUDIT_LOGGING === 'true',
  },
} as const;

// Validation function to ensure required environment variables are set
// Only runs on server side to avoid client-side errors
export function validateAdminConfig() {
  // Only validate on server side
  if (typeof window !== 'undefined') {
    return; // Skip validation on client side
  }

  const errors: string[] = [];

  // Only validate JWT_SECRET as it's the most critical
  if (
    !process.env.JWT_SECRET ||
    process.env.JWT_SECRET === 'your-secret-key-change-in-production'
  ) {
    errors.push('JWT_SECRET must be set and should not be the default value');
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.INITIAL_ADMIN_EMAIL) {
      errors.push('INITIAL_ADMIN_EMAIL must be set in production');
    }

    if (!process.env.INITIAL_ADMIN_PASSWORD) {
      errors.push('INITIAL_ADMIN_PASSWORD must be set in production');
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Admin configuration validation failed:\n${errors.join('\n')}`
    );
  }
}

// Helper function to get admin API URL
export function getAdminApiUrl(endpoint: string = '') {
  return `${adminConfig.api.baseUrl}${endpoint}`;
}

// Helper function to get admin dashboard URL
export function getAdminDashboardUrl() {
  return `${adminConfig.urls.admin}/admin/dashboard`;
}

// Helper function to get admin login URL
export function getAdminLoginUrl() {
  return `${adminConfig.urls.admin}/admin/login`;
}
