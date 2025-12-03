import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Enhanced user types with roles
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  is_active: boolean;
  created_at: Date;
  lastLogin?: Date;
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    emailUpdates: boolean;
  };
  progress?: {
    completedQuestions: string[];
    completedPaths: string[];
    streak: number;
    totalTimeSpent: number;
  };
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  token: string;
  expiresAt: Date;
}

export interface AuthResult {
  success: boolean;
  user?: UserSession;
  error?: string;
}

export interface UserCreationResult {
  success: boolean;
  userId?: string;
  error?: string;
}

export class UserAuthService {
  private static readonly COLLECTION_NAME = 'users';

  /**
   * Register a new user
   */
  static async registerUser(
    email: string,
    password: string,
    name: string,
    role: 'user' | 'premium_user' | 'admin' = 'user'
  ): Promise<UserCreationResult> {
    try {
      // Check if user already exists
      const existingUser = await this.getUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists',
        };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 12);

      // Create user document
      const userId = this.generateUserId();
      const userData: Omit<User, 'id'> = {
        email,
        name,
        role,
        is_active: true,
        created_at: new Date(),
        preferences: {
          theme: 'system',
          notifications: true,
          emailUpdates: true,
        },
        progress: {
          completedQuestions: [],
          completedPaths: [],
          streak: 0,
          totalTimeSpent: 0,
        },
      };

      await supabase.from('users').insert({
        id: userId,
        ...userData,
        passwordHash,
        created_at: new Date().toISOString(),
      });

      console.log(`✅ User account created: ${email} (${role})`);
      return { success: true, userId };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: 'Failed to create user account' };
    }
  }

  /**
   * Authenticate user login
   */
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<AuthResult> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      if (!user.is_active) {
        return { success: false, error: 'Account is deactivated' };
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid password' };
      }

      // Update last login
      await this.updateLastLogin(user.id);

      // Create session
      const session: UserSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: this.generateToken(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      };

      console.log(`✅ User authenticated: ${email} (${user.role})`);
      return { success: true, user: session };
    } catch (error) {
      console.error('Error authenticating user:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(
    email: string
  ): Promise<(User & { passwordHash: string }) | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        return null;
      }

      return data as User & { passwordHash: string };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return null;
      }

      return data as User;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(
    userId: string,
    preferences: Partial<User['preferences']>
  ): Promise<boolean> {
    try {
      await supabase
        .from('users')
        .update({
          preferences: preferences,
        })
        .eq('id', userId);

      return true;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }
  }

  /**
   * Update user progress
   */
  static async updateUserProgress(
    userId: string,
    progress: Partial<User['progress']>
  ): Promise<boolean> {
    try {
      await supabase
        .from('users')
        .update({
          progress: progress,
        })
        .eq('id', userId);

      return true;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return false;
    }
  }

  /**
   * Check if user has permission for a specific action
   */
  static hasPermission(
    userRole: User['role'],
    requiredRole: User['role']
  ): boolean {
    const roleHierarchy = {
      user: 0,
      premium_user: 1,
      admin: 2,
      super_admin: 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase.from('users').select('*');

      if (error || !data) {
        return [];
      }

      return data as User[];
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  /**
   * Update last login timestamp
   */
  private static async updateLastLogin(userId: string): Promise<void> {
    try {
      await supabase
        .from('users')
        .update({
          lastLogin: new Date().toISOString(),
        })
        .eq('id', userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Generate unique user ID
   */
  private static generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate JWT-like token (simplified)
   */
  private static generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
