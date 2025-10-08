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

  // Dynamic Port Configuration
  port: {
    // Use actual port from process.env.PORT or default to 3000
    web: process.env.PORT || process.env.WEB_PORT || '3000',
    // Admin port can be different or same as web port
    admin: process.env.ADMIN_PORT || process.env.PORT || '3000',
  },

  // Dynamic URL Configuration
  urls: {
    // Use actual host and port from environment
    web:
      process.env.WEB_URL ||
      `http://localhost:${process.env.PORT || process.env.WEB_PORT || '3000'}`,
    admin:
      process.env.ADMIN_URL ||
      `http://localhost:${process.env.ADMIN_PORT || process.env.PORT || '3000'}`,
  },

  // Dynamic API Configuration
  api: {
    // Use actual port for API base URL
    baseUrl:
      process.env.ADMIN_API_BASE_URL ||
      `http://localhost:${process.env.ADMIN_PORT || process.env.PORT || '3000'}/api`,
    timeout: parseInt(process.env.ADMIN_API_TIMEOUT || '10000'),
  },

  // Admin Credentials (for initialization only)
  credentials: {
    // These should only be used for initial setup
    // In production, admins should be created through the admin panel
    initialAdmin: {
      email: process.env.INITIAL_ADMIN_EMAIL,
      password: process.env.INITIAL_ADMIN_PASSWORD,
      name: process.env.INITIAL_ADMIN_NAME,
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

  // Required environment variables
  const requiredVars = [
    'JWT_SECRET',
    'INITIAL_ADMIN_EMAIL',
    'INITIAL_ADMIN_PASSWORD',
    'INITIAL_ADMIN_NAME',
  ];

  // Optional environment variables (with dynamic defaults)
  const optionalVars = [
    'ADMIN_PORT',
    'WEB_PORT',
    'ADMIN_URL',
    'WEB_URL',
    'ADMIN_API_BASE_URL',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      errors.push(`${varName} must be set in environment variables`);
    }
  }

  // Validate JWT_SECRET is not default
  if (
    process.env.JWT_SECRET === 'your-secret-key-change-in-production' ||
    process.env.JWT_SECRET === 'dev-secret-key-change-in-production'
  ) {
    errors.push('JWT_SECRET must be set to a secure value, not the default');
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
