import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import { adminConfig, getAdminApiUrl } from '@/config/admin';

// Types
export interface AdminCredential {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'super_admin' | 'admin';
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
  token: string;
  expiresAt: Date;
}

export interface AuthResult {
  success: boolean;
  admin?: AdminSession;
  error?: string;
}

export interface AdminCreationResult {
  success: boolean;
  adminId?: string;
  error?: string;
}

export interface AdminDeactivationResult {
  success: boolean;
  error?: string;
}

export class AdminAuthService {
  private static readonly COLLECTION_NAME = adminConfig.database.collectionName;

  /**
   * Initialize admin credentials (one-time setup)
   */
  static async initializeAdminCredentials(
    email: string,
    password: string,
    name: string,
    role: 'super_admin' | 'admin' = 'super_admin'
  ): Promise<AdminCreationResult> {
    try {
      // Check if admin already exists
      const existingAdmin = await this.getAdminByEmail(email);
      if (existingAdmin) {
        return {
          success: false,
          error: 'Admin with this email already exists',
        };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(
        password,
        adminConfig.security.saltRounds
      );

      // Create admin document
      if (!db) {
        return {
          success: false,
          error: 'Database not initialized',
        };
      }

      const adminId = this.generateAdminId();
      const adminData: Omit<AdminCredential, 'id'> = {
        email,
        passwordHash,
        name,
        role,
        isActive: true,
        createdAt: new Date(),
      };

      await setDoc(doc(db, this.COLLECTION_NAME, adminId), {
        ...adminData,
        createdAt: serverTimestamp(),
      });

      console.log(`✅ Admin account created: ${email} (${role})`);
      return { success: true, adminId };
    } catch (error) {
      console.error('Error initializing admin credentials:', error);
      return { success: false, error: 'Failed to create admin account' };
    }
  }

  /**
   * Authenticate admin login
   */
  static async authenticateAdmin(
    email: string,
    password: string
  ): Promise<AuthResult> {
    try {
      const response = await fetch(getAdminApiUrl('/admin/auth'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ Admin authenticated: ${email}`);
        return { success: true, admin: data.admin };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error authenticating admin:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Create new admin account
   */
  static async createAdmin(
    email: string,
    password: string,
    name: string,
    role: 'super_admin' | 'admin' = 'admin'
  ): Promise<AdminCreationResult> {
    try {
      // Check if admin already exists
      const existingAdmin = await this.getAdminByEmail(email);
      if (existingAdmin) {
        return {
          success: false,
          error: 'Admin with this email already exists',
        };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(
        password,
        adminConfig.security.saltRounds
      );

      // Create admin document
      if (!db) {
        return {
          success: false,
          error: 'Database not initialized',
        };
      }

      const adminId = this.generateAdminId();
      const adminData: Omit<AdminCredential, 'id'> = {
        email,
        passwordHash,
        name,
        role,
        isActive: true,
        createdAt: new Date(),
      };

      await setDoc(doc(db, this.COLLECTION_NAME, adminId), {
        ...adminData,
        createdAt: serverTimestamp(),
      });

      console.log(`✅ Admin account created: ${email} (${role})`);
      return { success: true, adminId };
    } catch (error) {
      console.error('Error creating admin:', error);
      return { success: false, error: 'Failed to create admin account' };
    }
  }

  /**
   * Deactivate admin account
   */
  static async deactivateAdmin(
    adminId: string
  ): Promise<AdminDeactivationResult> {
    try {
      if (!db) {
        return {
          success: false,
          error: 'Database not initialized',
        };
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, adminId), {
        isActive: false,
      });

      console.log(`✅ Admin deactivated: ${adminId}`);
      return { success: true };
    } catch (error) {
      console.error('Error deactivating admin:', error);
      return { success: false, error: 'Failed to deactivate admin' };
    }
  }

  /**
   * Get all admin accounts
   */
  static async getAllAdmins(): Promise<AdminCredential[]> {
    try {
      if (!db) {
        console.error('Database not initialized');
        return [];
      }

      const querySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
      const admins: AdminCredential[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        admins.push({
          id: doc.id,
          email: data.email,
          passwordHash: data.passwordHash,
          name: data.name,
          role: data.role,
          isActive: data.isActive,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate(),
        });
      });

      return admins.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    } catch (error) {
      console.error('Error getting all admins:', error);
      return [];
    }
  }

  /**
   * Validate admin session
   */
  static async validateSession(session: AdminSession): Promise<boolean> {
    try {
      // Check if session has expired
      if (new Date() > new Date(session.expiresAt)) {
        return false;
      }

      // Verify JWT token via API
      const response = await fetch(getAdminApiUrl('/admin/auth'), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Session validation failed:', error);
      return false;
    }
  }

  /**
   * Get admin by email
   */
  private static async getAdminByEmail(
    email: string
  ): Promise<AdminCredential | null> {
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
        passwordHash: data.passwordHash,
        name: data.name,
        role: data.role,
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate(),
      };
    } catch (error) {
      console.error('Error getting admin by email:', error);
      return null;
    }
  }

  /**
   * Update last login timestamp
   */
  private static async updateLastLogin(adminId: string): Promise<void> {
    try {
      if (!db) {
        console.error('Database not initialized');
        return;
      }

      await updateDoc(doc(db, this.COLLECTION_NAME, adminId), {
        lastLogin: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  /**
   * Generate unique admin ID
   */
  private static generateAdminId(): string {
    return `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
