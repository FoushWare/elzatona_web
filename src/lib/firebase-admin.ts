// v1.0 - Firebase Admin helper for API routes

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    // Try to use service account from environment
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccount) {
      const serviceAccountKey = JSON.parse(serviceAccount);
      initializeApp({
        credential: cert(serviceAccountKey),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    } else {
      // Fallback to default credentials (for local development)
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'elzatona-web',
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    // Initialize with minimal config for development
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'elzatona-web',
    });
  }
}

export const db = getFirestore();

// Helper functions for common operations
export class AdminFirestoreHelper {
  static async createDocument<T>(
    collection: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const docRef = await db.collection(collection).add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return docRef.id;
  }

  static async getDocument<T>(
    collection: string,
    id: string
  ): Promise<T | null> {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...doc.data(),
    } as T;
  }

  static async updateDocument<T>(
    collection: string,
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<void> {
    await db
      .collection(collection)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date(),
      });
  }

  static async deleteDocument(collection: string, id: string): Promise<void> {
    await db.collection(collection).doc(id).delete();
  }

  static async listDocuments<T>(
    collection: string,
    options: {
      limit?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
      where?: { field: string; operator: any; value: any }[];
    } = {}
  ): Promise<{ data: T[]; total: number }> {
    let query: any = db.collection(collection);

    // Apply where clauses
    if (options.where) {
      options.where.forEach(({ field, operator, value }) => {
        query = query.where(field, operator, value);
      });
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.orderBy(options.orderBy, options.orderDirection || 'desc');
    }

    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    // Get total count (for pagination)
    const totalSnapshot = await db.collection(collection).get();
    const total = totalSnapshot.size;

    return { data, total };
  }

  static async searchDocuments<T>(
    collection: string,
    searchTerm: string,
    searchFields: string[],
    options: {
      limit?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
    } = {}
  ): Promise<T[]> {
    // For now, we'll do client-side filtering since Firestore doesn't support full-text search
    // In production, consider using Algolia or Elasticsearch
    const { data } = await this.listDocuments<T>(collection, {
      limit: options.limit || 100,
      orderBy: options.orderBy,
      orderDirection: options.orderDirection,
    });

    const lowerSearchTerm = searchTerm.toLowerCase();
    return data.filter(doc => {
      return searchFields.some(field => {
        const value = (doc as any)[field];
        return (
          value && value.toString().toLowerCase().includes(lowerSearchTerm)
        );
      });
    });
  }
}

// Collection names
export const COLLECTIONS = {
  FRONTEND_TASKS: 'frontendTasks',
  PROBLEM_SOLVING_TASKS: 'problemSolvingTasks',
  ADMIN_CREDENTIALS: 'adminCredentials',
} as const;
