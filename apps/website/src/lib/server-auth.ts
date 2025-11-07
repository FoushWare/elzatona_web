/**
 * Server-side authentication utilities using Supabase
 */

import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// JWT secret for admin tokens
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  name?: string;
  avatar?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name?: string;
  permissions?: string[];
}

/**
 * Verify Supabase JWT token
 */
export async function verifySupabaseToken(
  token: string
): Promise<AuthUser | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    // Get user profile from users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
      role: profile.role || 'user',
      name: profile.name,
      avatar: profile.avatar_url,
    };
  } catch (error) {
    console.error('Error verifying Supabase token:', error);
    return null;
  }
}

/**
 * Verify admin JWT token
 */
export function verifyAdminToken(token: string): AdminUser | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (!decoded || !decoded.id || !decoded.email) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'admin',
      name: decoded.name,
      permissions: decoded.permissions || [],
    };
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

/**
 * Create admin JWT token
 */
export function createAdminToken(adminUser: AdminUser): string {
  return jwt.sign(
    {
      id: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      name: adminUser.name,
      permissions: adminUser.permissions || [],
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

/**
 * Get user from request headers
 */
export async function getUserFromRequest(
  request: Request
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);

    // Try Supabase token first
    const supabaseUser = await verifySupabaseToken(token);
    if (supabaseUser) {
      return supabaseUser;
    }

    // Try admin token
    const adminUser = verifyAdminToken(token);
    if (adminUser) {
      return {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        name: adminUser.name,
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: AuthUser): boolean {
  return user.role === 'admin' || user.role === 'super_admin';
}

/**
 * Check if user has super admin role
 */
export function isSuperAdmin(user: AuthUser): boolean {
  return user.role === 'super_admin';
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: AuthUser, permission: string): boolean {
  if (isSuperAdmin(user)) {
    return true;
  }

  if (user.role === 'admin') {
    // Add specific permission checks for admin users
    const adminPermissions = [
      'read:questions',
      'write:questions',
      'delete:questions',
      'read:users',
      'write:users',
      'read:analytics',
    ];
    return adminPermissions.includes(permission);
  }

  return false;
}

/**
 * Middleware for protecting admin routes
 */
export function requireAdmin(user: AuthUser): void {
  if (!isAdmin(user)) {
    throw new Error('Admin access required');
  }
}

/**
 * Middleware for protecting super admin routes
 */
export function requireSuperAdmin(user: AuthUser): void {
  if (!isSuperAdmin(user)) {
    throw new Error('Super admin access required');
  }
}

/**
 * Get admin user by email
 */
export async function getAdminByEmail(
  email: string
): Promise<AdminUser | null> {
  try {
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return null;
    }

    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
      permissions: admin.permissions || [],
    };
  } catch (error) {
    console.error('Error getting admin by email:', error);
    return null;
  }
}

/**
 * Create admin user
 */
export async function createAdminUser(adminData: {
  email: string;
  password: string;
  name?: string;
  role?: 'admin' | 'super_admin';
}): Promise<AdminUser | null> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: adminData.email,
        name: adminData.name,
        role: adminData.role || 'admin',
        permissions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      name: data.name,
      permissions: data.permissions || [],
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return null;
  }
}
