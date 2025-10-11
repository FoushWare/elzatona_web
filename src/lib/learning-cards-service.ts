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
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  LearningCard,
  LearningCardFormData,
  LearningPlanCard,
  CardProgress,
  CardType,
} from '@/types/learning-cards';

const LEARNING_CARDS_COLLECTION = 'learningCards';
const LEARNING_PLAN_CARDS_COLLECTION = 'learningPlanCards';
const CARD_PROGRESS_COLLECTION = 'cardProgress';

export class LearningCardsService {
  // Learning Cards CRUD operations
  static async getAllCards(): Promise<LearningCard[]> {
    try {
      const cardsRef = collection(db, LEARNING_CARDS_COLLECTION);
      const q = query(cardsRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as LearningCard[];
    } catch (error) {
      console.error('Error fetching learning cards:', error);
      throw error;
    }
  }

  static async getCardById(cardId: string): Promise<LearningCard | null> {
    try {
      const cardRef = doc(db, LEARNING_CARDS_COLLECTION, cardId);
      const cardSnap = await getDoc(cardRef);

      if (!cardSnap.exists()) {
        return null;
      }

      return {
        id: cardSnap.id,
        ...cardSnap.data(),
        createdAt: cardSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: cardSnap.data().updatedAt?.toDate() || new Date(),
      } as LearningCard;
    } catch (error) {
      console.error('Error fetching learning card:', error);
      throw error;
    }
  }

  static async createCard(cardData: LearningCardFormData): Promise<string> {
    try {
      const cardsRef = collection(db, LEARNING_CARDS_COLLECTION);
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

  static async updateCard(
    cardId: string,
    cardData: Partial<LearningCardFormData>
  ): Promise<void> {
    try {
      const cardRef = doc(db, LEARNING_CARDS_COLLECTION, cardId);
      await updateDoc(cardRef, {
        ...cardData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating learning card:', error);
      throw error;
    }
  }

  static async deleteCard(cardId: string): Promise<void> {
    try {
      const cardRef = doc(db, LEARNING_CARDS_COLLECTION, cardId);
      await deleteDoc(cardRef);
    } catch (error) {
      console.error('Error deleting learning card:', error);
      throw error;
    }
  }

  // Learning Plan Cards operations
  static async getCardsForPlan(planId: string): Promise<LearningPlanCard[]> {
    try {
      const planCardsRef = collection(db, LEARNING_PLAN_CARDS_COLLECTION);
      const q = query(
        planCardsRef,
        where('planId', '==', planId),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      const planCards: LearningPlanCard[] = [];

      for (const docSnap of snapshot.docs) {
        const planCardData = docSnap.data();
        const card = await this.getCardById(planCardData.cardId);

        if (card) {
          planCards.push({
            id: docSnap.id,
            ...planCardData,
            card,
            createdAt: planCardData.createdAt?.toDate() || new Date(),
            updatedAt: planCardData.updatedAt?.toDate() || new Date(),
          } as LearningPlanCard);
        }
      }

      return planCards;
    } catch (error) {
      console.error('Error fetching cards for plan:', error);
      throw error;
    }
  }

  static async addCardToPlan(
    planId: string,
    cardId: string,
    config: {
      questionCount: number;
      timeLimit: number;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    }
  ): Promise<string> {
    try {
      const planCardsRef = collection(db, LEARNING_PLAN_CARDS_COLLECTION);
      const docRef = await addDoc(planCardsRef, {
        planId,
        cardId,
        ...config,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding card to plan:', error);
      throw error;
    }
  }

  static async removeCardFromPlan(planCardId: string): Promise<void> {
    try {
      const planCardRef = doc(db, LEARNING_PLAN_CARDS_COLLECTION, planCardId);
      await deleteDoc(planCardRef);
    } catch (error) {
      console.error('Error removing card from plan:', error);
      throw error;
    }
  }

  // Card Progress operations
  static async getCardProgress(
    userId: string,
    planId: string,
    cardId: string
  ): Promise<CardProgress | null> {
    try {
      const progressRef = collection(db, CARD_PROGRESS_COLLECTION);
      const q = query(
        progressRef,
        where('userId', '==', userId),
        where('planId', '==', planId),
        where('cardId', '==', cardId)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        completedAt: doc.data().completedAt?.toDate(),
      } as CardProgress;
    } catch (error) {
      console.error('Error fetching card progress:', error);
      throw error;
    }
  }

  static async updateCardProgress(
    progressData: Partial<CardProgress>
  ): Promise<void> {
    try {
      if (!progressData.id) {
        throw new Error('Progress ID is required for update');
      }

      const progressRef = doc(db, CARD_PROGRESS_COLLECTION, progressData.id);
      await updateDoc(progressRef, {
        ...progressData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating card progress:', error);
      throw error;
    }
  }

  static async createCardProgress(
    progressData: Omit<CardProgress, 'id'>
  ): Promise<string> {
    try {
      const progressRef = collection(db, CARD_PROGRESS_COLLECTION);
      const docRef = await addDoc(progressRef, {
        ...progressData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating card progress:', error);
      throw error;
    }
  }

  // Utility methods
  static async getCardsByType(type: CardType): Promise<LearningCard[]> {
    try {
      const cardsRef = collection(db, LEARNING_CARDS_COLLECTION);
      const q = query(
        cardsRef,
        where('type', '==', type),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as LearningCard[];
    } catch (error) {
      console.error('Error fetching cards by type:', error);
      throw error;
    }
  }

  static async getActiveCards(): Promise<LearningCard[]> {
    try {
      const cardsRef = collection(db, LEARNING_CARDS_COLLECTION);
      const q = query(
        cardsRef,
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as LearningCard[];
    } catch (error) {
      console.error('Error fetching active cards:', error);
      throw error;
    }
  }
}
