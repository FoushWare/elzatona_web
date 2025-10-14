import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

// Enhanced user types with roles
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: Date;
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
    role: 'user' | 'premium_user' = 'user'
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
      if (!db) {
        return {
          success: false,
          error: 'Database not initialized',
        };
      }

      const userId = this.generateUserId();
      const userData: Omit<User, 'id'> = {
        email,
        name,
        role,
        isActive: true,
        createdAt: new Date(),
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

      await setDoc(doc(db, this.COLLECTION_NAME, userId), {
        ...userData,
        passwordHash,
        createdAt: serverTimestamp(),
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

      if (!user.isActive) {
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
      if (!db) {
        console.error('Database not initialized');
        return null;
      }

      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('email', '==', email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        role: data.role,
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate(),
        preferences: data.preferences,
        progress: data.progress,
        passwordHash: data.passwordHash,
      };
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
      if (!db) {
        console.error('Database not initialized');
        return null;
      }

      const docRef = doc(db, this.COLLECTION_NAME, userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      return {
        id: docSnap.id,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        role: data.role,
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate(),
        preferences: data.preferences,
        progress: data.progress,
      };
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
      if (!db) {
        return false;
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, userId), {
        preferences: preferences,
      });

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
      if (!db) {
        return false;
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, userId), {
        progress: progress,
      });

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
      if (!db) {
        console.error('Database not initialized');
        return [];
      }

      const querySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      const users: User[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        users.push({
          id: doc.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
          role: data.role,
          isActive: data.isActive,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate(),
          preferences: data.preferences,
          progress: data.progress,
        });
      });

      return users.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
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
      if (!db) {
        console.error('Database not initialized');
        return;
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, userId), {
        lastLogin: serverTimestamp(),
      });
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
