// Hybrid Firebase approach - use client SDK for reading, Admin SDK for writing
import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { FrontendTask, FrontendTaskFormData } from '../types/admin';

export class HybridFirestoreHelper {
  static async listDocuments<T>(
    collectionName: string,
    options: {
      limit?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
      where?: { field: string; operator: any; value: any }[];
    } = {}
  ): Promise<{ data: T[]; total: number }> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef);

      // Apply where clauses
      if (options.where) {
        options.where.forEach(({ field, operator, value }) => {
          q = query(q, where(field, operator, value));
        });
      }

      // Apply ordering
      if (options.orderBy) {
        q = query(
          q,
          orderBy(options.orderBy, options.orderDirection || 'desc')
        );
      }

      // Apply limit
      if (options.limit) {
        q = query(q, firestoreLimit(options.limit));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      // Get total count (for pagination)
      const totalSnapshot = await getDocs(collectionRef);
      const total = totalSnapshot.size;

      return { data, total };
    } catch (error) {
      console.error('Error in listDocuments:', error);
      throw error;
    }
  }

  static async createDocument<T>(
    collectionName: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const docRef = doc(collection(db, collectionName));
      const docData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await setDoc(docRef, docData);
      return docRef.id;
    } catch (error) {
      console.error('Error in createDocument:', error);
      throw error;
    }
  }

  static async getDocument<T>(
    collectionName: string,
    id: string
  ): Promise<T | null> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const docRef = doc(db, collectionName, id);
      const docSnap = await getDocs(
        query(collection(db, collectionName), where('__name__', '==', id))
      );

      if (docSnap.empty) return null;

      const docData = docSnap.docs[0];
      return {
        id: docData.id,
        ...docData.data(),
      } as T;
    } catch (error) {
      console.error('Error in getDocument:', error);
      throw error;
    }
  }

  static async updateDocument<T>(
    collectionName: string,
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error in updateDocument:', error);
      throw error;
    }
  }

  static async deleteDocument(
    collectionName: string,
    id: string
  ): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase not initialized');
      }

      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error in deleteDocument:', error);
      throw error;
    }
  }

  static async searchDocuments<T>(
    collectionName: string,
    searchTerm: string,
    searchFields: string[],
    options: {
      limit?: number;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
    } = {}
  ): Promise<T[]> {
    try {
      // For now, we'll do client-side filtering since Firestore doesn't support full-text search
      const { data } = await this.listDocuments<T>(collectionName, {
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
    } catch (error) {
      console.error('Error in searchDocuments:', error);
      throw error;
    }
  }
}

// Collection names
export const COLLECTIONS = {
  FRONTEND_TASKS: 'frontendTasks',
  PROBLEM_SOLVING_TASKS: 'problemSolvingTasks',
  ADMIN_CREDENTIALS: 'adminCredentials',
} as const;
