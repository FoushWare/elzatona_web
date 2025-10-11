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

export interface PlanQuestion {
  id: string;
  planId: string;
  questionId: string;
  cardId: string;
  sectionId?: string;
  topicId?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanQuestionFormData {
  planId: string;
  questionId: string;
  cardId: string;
  sectionId?: string;
  topicId?: string;
  order?: number;
}

const PLAN_QUESTIONS_COLLECTION = 'planQuestions';

export class PlanQuestionsService {
  // Get all plan questions for a specific plan
  static async getPlanQuestions(planId: string): Promise<PlanQuestion[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionsRef = collection(db, PLAN_QUESTIONS_COLLECTION);
      const q = query(
        planQuestionsRef,
        where('planId', '==', planId),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PlanQuestion[];
    } catch (error) {
      console.error('Error fetching plan questions:', error);
      throw error;
    }
  }

  // Get plan questions for a specific card
  static async getCardQuestions(
    planId: string,
    cardId: string
  ): Promise<PlanQuestion[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionsRef = collection(db, PLAN_QUESTIONS_COLLECTION);
      const q = query(
        planQuestionsRef,
        where('planId', '==', planId),
        where('cardId', '==', cardId),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PlanQuestion[];
    } catch (error) {
      console.error('Error fetching card questions:', error);
      throw error;
    }
  }

  // Get plan questions for a specific topic
  static async getTopicQuestions(
    planId: string,
    cardId: string,
    topicId: string
  ): Promise<PlanQuestion[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionsRef = collection(db, PLAN_QUESTIONS_COLLECTION);
      const q = query(
        planQuestionsRef,
        where('planId', '==', planId),
        where('cardId', '==', cardId),
        where('topicId', '==', topicId),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PlanQuestion[];
    } catch (error) {
      console.error('Error fetching topic questions:', error);
      throw error;
    }
  }

  // Add a question to a plan
  static async addQuestionToPlan(
    planQuestionData: PlanQuestionFormData
  ): Promise<string> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      // Check if question is already assigned to this plan
      const existingQuery = query(
        collection(db, PLAN_QUESTIONS_COLLECTION),
        where('planId', '==', planQuestionData.planId),
        where('questionId', '==', planQuestionData.questionId)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        throw new Error('Question is already assigned to this plan');
      }

      const planQuestionsRef = collection(db, PLAN_QUESTIONS_COLLECTION);
      const docRef = await addDoc(planQuestionsRef, {
        ...planQuestionData,
        order: planQuestionData.order || 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return docRef.id;
    } catch (error) {
      console.error('Error adding question to plan:', error);
      throw error;
    }
  }

  // Remove a question from a plan
  static async removeQuestionFromPlan(planQuestionId: string): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionRef = doc(
        db,
        PLAN_QUESTIONS_COLLECTION,
        planQuestionId
      );
      await deleteDoc(planQuestionRef);
    } catch (error) {
      console.error('Error removing question from plan:', error);
      throw error;
    }
  }

  // Update question order in a plan
  static async updateQuestionOrder(
    planQuestionId: string,
    newOrder: number
  ): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionRef = doc(
        db,
        PLAN_QUESTIONS_COLLECTION,
        planQuestionId
      );
      await updateDoc(planQuestionRef, {
        order: newOrder,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating question order:', error);
      throw error;
    }
  }

  // Move question to different card/section/topic
  static async moveQuestion(
    planQuestionId: string,
    newCardId: string,
    newSectionId?: string,
    newTopicId?: string
  ): Promise<void> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionRef = doc(
        db,
        PLAN_QUESTIONS_COLLECTION,
        planQuestionId
      );
      await updateDoc(planQuestionRef, {
        cardId: newCardId,
        sectionId: newSectionId || null,
        topicId: newTopicId || null,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error moving question:', error);
      throw error;
    }
  }

  // Get question statistics for a plan
  static async getPlanStatistics(planId: string): Promise<{
    totalQuestions: number;
    questionsByCard: { [cardId: string]: number };
    questionsBySection: { [sectionId: string]: number };
    questionsByTopic: { [topicId: string]: number };
  }> {
    try {
      const planQuestions = await this.getPlanQuestions(planId);

      const statistics = {
        totalQuestions: planQuestions.length,
        questionsByCard: {} as { [cardId: string]: number },
        questionsBySection: {} as { [sectionId: string]: number },
        questionsByTopic: {} as { [topicId: string]: number },
      };

      planQuestions.forEach(pq => {
        // Count by card
        statistics.questionsByCard[pq.cardId] =
          (statistics.questionsByCard[pq.cardId] || 0) + 1;

        // Count by section (if exists)
        if (pq.sectionId) {
          statistics.questionsBySection[pq.sectionId] =
            (statistics.questionsBySection[pq.sectionId] || 0) + 1;
        }

        // Count by topic (if exists)
        if (pq.topicId) {
          statistics.questionsByTopic[pq.topicId] =
            (statistics.questionsByTopic[pq.topicId] || 0) + 1;
        }
      });

      return statistics;
    } catch (error) {
      console.error('Error getting plan statistics:', error);
      throw error;
    }
  }

  // Bulk operations
  static async addMultipleQuestionsToPlan(
    questions: PlanQuestionFormData[]
  ): Promise<string[]> {
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      const planQuestionsRef = collection(db, PLAN_QUESTIONS_COLLECTION);
      const docIds: string[] = [];

      for (const questionData of questions) {
        const docRef = await addDoc(planQuestionsRef, {
          ...questionData,
          order: questionData.order || 1,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        docIds.push(docRef.id);
      }

      return docIds;
    } catch (error) {
      console.error('Error adding multiple questions to plan:', error);
      throw error;
    }
  }

  static async removeAllQuestionsFromPlan(planId: string): Promise<void> {
    try {
      const planQuestions = await this.getPlanQuestions(planId);

      for (const planQuestion of planQuestions) {
        await this.removeQuestionFromPlan(planQuestion.id);
      }
    } catch (error) {
      console.error('Error removing all questions from plan:', error);
      throw error;
    }
  }
}
