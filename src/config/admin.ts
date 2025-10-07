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
    admin:
      process.env.ADMIN_PORT ||
      (() => {
        throw new Error('ADMIN_PORT environment variable must be set');
      })(),
    web:
      process.env.WEB_PORT ||
      (() => {
        throw new Error('WEB_PORT environment variable must be set');
      })(),
  },

  // Admin URLs
  urls: {
    admin:
      process.env.ADMIN_URL ||
      (() => {
        throw new Error('ADMIN_URL environment variable must be set');
      })(),
    web:
      process.env.WEB_URL ||
      (() => {
        throw new Error('WEB_URL environment variable must be set');
      })(),
  },

  // Admin API Configuration
  api: {
    baseUrl:
      process.env.ADMIN_API_BASE_URL ||
      (() => {
        throw new Error('ADMIN_API_BASE_URL environment variable must be set');
      })(),
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
export function validateAdminConfig() {
  const errors: string[] = [];

  // Required environment variables
  const requiredVars = [
    'ADMIN_PORT',
    'WEB_PORT',
    'ADMIN_URL',
    'WEB_URL',
    'ADMIN_API_BASE_URL',
    'JWT_SECRET',
  ];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      errors.push(`${varName} must be set`);
    }
  });

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
