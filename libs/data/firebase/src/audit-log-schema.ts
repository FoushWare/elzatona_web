// Audit Log Schema and Service
// v1.0 - Comprehensive admin action logging

import { db } from './firebase-server';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from 'firebase/firestore';

export interface AuditLog {
  id?: string;
  action: string; // 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT'
  resource: string; // 'TOPIC', 'CATEGORY', 'QUESTION', 'SECTION', 'LEARNING_PATH', 'USER', 'SYSTEM'
  resourceId?: string; // ID of the affected resource
  resourceName?: string; // Human-readable name of the resource
  details: string; // Detailed description of the action
  changes?: Record<string, any>; // Before/after values for updates
  userId?: string; // Admin user ID who performed the action
  userEmail?: string; // Admin user email
  ipAddress?: string; // IP address of the user
  userAgent?: string; // User agent string
  timestamp: string; // ISO timestamp
  success: boolean; // Whether the action was successful
  errorMessage?: string; // Error message if action failed
  metadata?: Record<string, any>; // Additional metadata
}

export class AuditLogService {
  private static readonly COLLECTION = 'admin-audit-logs';

  // Create a new audit log entry
  static async logAction(
    logData: Omit<AuditLog, 'id' | 'timestamp'>
  ): Promise<string> {
    if (!db) throw new Error('Firestore not available');

    try {
      const auditRef = collection(db, this.COLLECTION);
      const now = new Date().toISOString();

      const logEntry: Omit<AuditLog, 'id'> = {
        ...logData,
        timestamp: now,
      };

      const docRef = await addDoc(auditRef, logEntry);
      console.log(
        `📝 Audit log created: ${logData.action} on ${logData.resource} (${docRef.id})`
      );
      return docRef.id;
    } catch (error) {
      console.error('Error creating audit log:', error);
      throw error;
    }
  }

  // Get recent audit logs
  static async getRecentLogs(limitCount: number = 100): Promise<AuditLog[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const logsRef = collection(db, this.COLLECTION);
      const q = query(logsRef, orderBy('timestamp', 'desc'), limit(limitCount));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as AuditLog[];
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  }

  // Get audit logs for a specific resource
  static async getLogsForResource(
    resource: string,
    resourceId?: string
  ): Promise<AuditLog[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const logsRef = collection(db, this.COLLECTION);
      let q;

      if (resourceId) {
        q = query(
          logsRef,
          where('resource', '==', resource),
          where('resourceId', '==', resourceId),
          orderBy('timestamp', 'desc')
        );
      } else {
        q = query(
          logsRef,
          where('resource', '==', resource),
          orderBy('timestamp', 'desc')
        );
      }

      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as AuditLog[];
    } catch (error) {
      console.error('Error fetching resource audit logs:', error);
      return [];
    }
  }

  // Get audit logs by action type
  static async getLogsByAction(action: string): Promise<AuditLog[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const logsRef = collection(db, this.COLLECTION);
      const q = query(
        logsRef,
        where('action', '==', action),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as AuditLog[];
    } catch (error) {
      console.error('Error fetching action audit logs:', error);
      return [];
    }
  }

  // Get audit logs by user
  static async getLogsByUser(userId: string): Promise<AuditLog[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const logsRef = collection(db, this.COLLECTION);
      const q = query(
        logsRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as AuditLog[];
    } catch (error) {
      console.error('Error fetching user audit logs:', error);
      return [];
    }
  }

  // Get audit logs within a date range
  static async getLogsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<AuditLog[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const logsRef = collection(db, this.COLLECTION);
      const q = query(
        logsRef,
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as AuditLog[];
    } catch (error) {
      console.error('Error fetching date range audit logs:', error);
      return [];
    }
  }
}
