/**
 * Admin Configuration
 * 
 * This file contains admin-specific configuration that can be overridden
 * by environment variables for different environments.
 */

export const adminConfig = {
  // Admin email - can be overridden by NEXT_PUBLIC_ADMIN_EMAIL
  adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'afouadsoftwareengineer@gmail.com',
  
  // Admin role configuration
  defaultRole: 'admin',
  defaultPermissions: ['all'],
  
  // Admin document settings
  adminDocumentSettings: {
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} as const;

export type AdminConfig = typeof adminConfig;
