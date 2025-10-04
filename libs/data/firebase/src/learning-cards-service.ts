import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  Firestore,
} from 'firebase/firestore';
import { db } from './firebase';
import type { LearningCard, LearningPlanCard, CardProgress } from '@elzatona/shared/types/learning-cards';

class LearningCardsService {
  private db: Firestore;

  constructor() {
    this.db = db;
  }

  // Learning Cards CRUD operations
  async getLearningCards(): Promise<LearningCard[]> {
    try {
      const cardsRef = collection(this.db, 'learningCards');
      const q = query(cardsRef, where('isActive', '==', true), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as LearningCard[];
    } catch (error) {
      console.error('Error fetching learning cards:', error);
      throw error;
    }
  }

  async getLearningCard(cardId: string): Promise<LearningCard | null> {
    try {
      const cardRef = doc(this.db, 'learningCards', cardId);
      const cardSnap = await getDoc(cardRef);
      
      if (!cardSnap.exists()) {
        return null;
      }

      return {
        id: cardSnap.id,
        ...cardSnap.data(),
        createdAt: cardSnap.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: cardSnap.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as LearningCard;
    } catch (error) {
      console.error('Error fetching learning card:', error);
      throw error;
    }
  }

  async createLearningCard(cardData: Omit<LearningCard, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const cardsRef = collection(this.db, 'learningCards');
      const docRef = await addDoc(cardsRef, {
        ...cardData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating learning card:', error);
      throw error;
    }
  }

  async updateLearningCard(cardId: string, updates: Partial<LearningCard>): Promise<void> {
    try {
      const cardRef = doc(this.db, 'learningCards', cardId);
      await updateDoc(cardRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating learning card:', error);
      throw error;
    }
  }

  async deleteLearningCard(cardId: string): Promise<void> {
    try {
      const cardRef = doc(this.db, 'learningCards', cardId);
      await updateDoc(cardRef, {
        isActive: false,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error deleting learning card:', error);
      throw error;
    }
  }

  // Learning Plan Cards operations
  async getPlanCards(planId: string): Promise<LearningPlanCard[]> {
    try {
      const planCardsRef = collection(this.db, 'learningPlanCards');
      const q = query(
        planCardsRef,
        where('planId', '==', planId),
        orderBy('dayNumber', 'asc'),
        orderBy('order', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      })) as LearningPlanCard[];
    } catch (error) {
      console.error('Error fetching plan cards:', error);
      throw error;
    }
  }

  async addCardToPlan(planId: string, cardId: string, dayNumber: number, order: number, timeAllocation: number): Promise<string> {
    try {
      const planCardsRef = collection(this.db, 'learningPlanCards');
      const docRef = await addDoc(planCardsRef, {
        planId,
        cardId,
        dayNumber,
        order,
        timeAllocation,
        isRequired: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding card to plan:', error);
      throw error;
    }
  }

  async removeCardFromPlan(planCardId: string): Promise<void> {
    try {
      const planCardRef = doc(this.db, 'learningPlanCards', planCardId);
      await deleteDoc(planCardRef);
    } catch (error) {
      console.error('Error removing card from plan:', error);
      throw error;
    }
  }

  // Card Progress operations
  async getCardProgress(userId: string, cardId: string, planId: string): Promise<CardProgress | null> {
    try {
      const progressRef = collection(this.db, 'cardProgress');
      const q = query(
        progressRef,
        where('userId', '==', userId),
        where('cardId', '==', cardId),
        where('planId', '==', planId)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        lastAccessedAt: doc.data().lastAccessedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        completedAt: doc.data().completedAt?.toDate?.()?.toISOString(),
      } as CardProgress;
    } catch (error) {
      console.error('Error fetching card progress:', error);
      throw error;
    }
  }

  async updateCardProgress(progressData: Omit<CardProgress, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const progressRef = collection(this.db, 'cardProgress');
      const docRef = await addDoc(progressRef, {
        ...progressData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastAccessedAt: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error updating card progress:', error);
      throw error;
    }
  }

  async saveCardProgress(progressId: string, updates: Partial<CardProgress>): Promise<void> {
    try {
      const progressRef = doc(this.db, 'cardProgress', progressId);
      await updateDoc(progressRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        lastAccessedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving card progress:', error);
      throw error;
    }
  }
}

export const learningCardsService = new LearningCardsService();
