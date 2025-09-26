// Enhanced Question Schema with Topics and Sections
// v2.0 - Enhanced structure with configurable section limits

import { db } from './firebase-server';
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
  Timestamp 
} from 'firebase/firestore';

// Enhanced Question Interface
export interface EnhancedQuestion {
  id: string;
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'text' | 'code';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  learningPath: string;
  points: number;
  tags: string[];
  options: string[];
  correctAnswer: number | number[]; // Single answer or multiple answers
  explanation: string;
  isActive: boolean;
  isComplete: boolean;
  
  // Enhanced relationships
  topicId?: string; // Optional topic assignment
  sectionId?: string; // Optional section assignment
  orderInSection?: number; // Order within section
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastModifiedBy?: string;
}

// Topic Interface
export interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

// Section Interface with Configurable Limits
export interface Section {
  id: string;
  name: string;
  description: string;
  learningPath: string;
  topicId?: string; // Optional topic association
  questionLimit: number; // Configurable limit (default 15)
  currentQuestionCount: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

// Section Configuration Interface
export interface SectionConfig {
  id: string;
  defaultQuestionLimit: number;
  maxQuestionLimit: number;
  minQuestionLimit: number;
  allowOverflow: boolean; // Allow sections to exceed limit
  createdAt: string;
  updatedAt: string;
}

// Enhanced Question Service
export class EnhancedQuestionService {
  private static readonly QUESTIONS_COLLECTION = 'enhancedQuestions';
  private static readonly TOPICS_COLLECTION = 'topics';
  private static readonly SECTIONS_COLLECTION = 'sections';
  private static readonly SECTION_CONFIG_COLLECTION = 'sectionConfig';

  // Initialize default section configuration
  static async initializeSectionConfig(): Promise<void> {
    if (!db) throw new Error('Firestore not available');

    try {
      const configRef = collection(db, this.SECTION_CONFIG_COLLECTION);
      const snapshot = await getDocs(configRef);
      
      if (snapshot.empty) {
        const defaultConfig: Omit<SectionConfig, 'id'> = {
          defaultQuestionLimit: 15,
          maxQuestionLimit: 50,
          minQuestionLimit: 1,
          allowOverflow: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await addDoc(configRef, defaultConfig);
        console.log('✅ Section configuration initialized');
      }
    } catch (error) {
      console.error('Error initializing section config:', error);
      throw error;
    }
  }

  // Get section configuration
  static async getSectionConfig(): Promise<SectionConfig | null> {
    if (!db) throw new Error('Firestore not available');

    try {
      const configRef = collection(db, this.SECTION_CONFIG_COLLECTION);
      const snapshot = await getDocs(configRef);
      
      if (snapshot.empty) return null;
      
      const configDoc = snapshot.docs[0];
      return {
        id: configDoc.id,
        ...configDoc.data()
      } as SectionConfig;
    } catch (error) {
      console.error('Error getting section config:', error);
      return null;
    }
  }

  // Update section configuration
  static async updateSectionConfig(config: Partial<SectionConfig>): Promise<void> {
    if (!db) throw new Error('Firestore not available');

    try {
      const configRef = collection(db, this.SECTION_CONFIG_COLLECTION);
      const snapshot = await getDocs(configRef);
      
      if (snapshot.empty) {
        throw new Error('Section configuration not found');
      }
      
      const configDoc = snapshot.docs[0];
      await updateDoc(doc(db, this.SECTION_CONFIG_COLLECTION, configDoc.id), {
        ...config,
        updatedAt: new Date().toISOString()
      });
      
      console.log('✅ Section configuration updated');
    } catch (error) {
      console.error('Error updating section config:', error);
      throw error;
    }
  }

  // Create a new question
  static async createQuestion(question: Omit<EnhancedQuestion, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not available');

    try {
      const questionsRef = collection(db, this.QUESTIONS_COLLECTION);
      const now = new Date().toISOString();
      
      const questionData = {
        ...question,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(questionsRef, questionData);
      
      // Update topic question count if assigned
      if (question.topicId) {
        await this.updateTopicQuestionCount(question.topicId);
      }
      
      // Update section question count if assigned
      if (question.sectionId) {
        await this.updateSectionQuestionCount(question.sectionId);
      }
      
      console.log(`✅ Question created with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }

  // Get questions by topic
  static async getQuestionsByTopic(topicId: string): Promise<EnhancedQuestion[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const questionsRef = collection(db, this.QUESTIONS_COLLECTION);
      const q = query(
        questionsRef,
        where('topicId', '==', topicId),
        where('isActive', '==', true),
        orderBy('createdAt', 'asc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EnhancedQuestion[];
    } catch (error) {
      console.error('Error getting questions by topic:', error);
      return [];
    }
  }

  // Get questions by section
  static async getQuestionsBySection(sectionId: string): Promise<EnhancedQuestion[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const questionsRef = collection(db, this.QUESTIONS_COLLECTION);
      const q = query(
        questionsRef,
        where('sectionId', '==', sectionId),
        where('isActive', '==', true),
        orderBy('orderInSection', 'asc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EnhancedQuestion[];
    } catch (error) {
      console.error('Error getting questions by section:', error);
      return [];
    }
  }

  // Assign question to section with limit checking
  static async assignQuestionToSection(questionId: string, sectionId: string, order?: number): Promise<boolean> {
    if (!db) throw new Error('Firestore not available');

    try {
      // Get section and its current question count
      const section = await this.getSection(sectionId);
      if (!section) throw new Error('Section not found');

      const currentQuestions = await this.getQuestionsBySection(sectionId);
      
      // Check if section is at capacity
      if (currentQuestions.length >= section.questionLimit) {
        const config = await this.getSectionConfig();
        if (!config?.allowOverflow) {
          throw new Error(`Section "${section.name}" is at capacity (${section.questionLimit} questions)`);
        }
      }

      // Update question
      const questionRef = doc(db, this.QUESTIONS_COLLECTION, questionId);
      await updateDoc(questionRef, {
        sectionId,
        orderInSection: order || currentQuestions.length + 1,
        updatedAt: new Date().toISOString()
      });

      // Update section question count
      await this.updateSectionQuestionCount(sectionId);
      
      console.log(`✅ Question ${questionId} assigned to section ${sectionId}`);
      return true;
    } catch (error) {
      console.error('Error assigning question to section:', error);
      throw error;
    }
  }

  // Remove question from section
  static async removeQuestionFromSection(questionId: string): Promise<void> {
    if (!db) throw new Error('Firestore not available');

    try {
      const questionRef = doc(db, this.QUESTIONS_COLLECTION, questionId);
      const questionDoc = await getDoc(questionRef);
      
      if (!questionDoc.exists()) {
        throw new Error('Question not found');
      }

      const questionData = questionDoc.data() as EnhancedQuestion;
      const sectionId = questionData.sectionId;

      // Update question
      await updateDoc(questionRef, {
        sectionId: null,
        orderInSection: null,
        updatedAt: new Date().toISOString()
      });

      // Update section question count if it was assigned
      if (sectionId) {
        await this.updateSectionQuestionCount(sectionId);
      }
      
      console.log(`✅ Question ${questionId} removed from section`);
    } catch (error) {
      console.error('Error removing question from section:', error);
      throw error;
    }
  }

  // Create a new topic
  static async createTopic(topic: Omit<Topic, 'id' | 'questionCount' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not available');

    try {
      const topicsRef = collection(db, this.TOPICS_COLLECTION);
      const now = new Date().toISOString();
      
      const topicData = {
        ...topic,
        questionCount: 0,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(topicsRef, topicData);
      console.log(`✅ Topic created with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('Error creating topic:', error);
      throw error;
    }
  }

  // Create a new section
  static async createSection(section: Omit<Section, 'id' | 'currentQuestionCount' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!db) throw new Error('Firestore not available');

    try {
      const sectionsRef = collection(db, this.SECTIONS_COLLECTION);
      const now = new Date().toISOString();
      
      const sectionData = {
        ...section,
        currentQuestionCount: 0,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(sectionsRef, sectionData);
      console.log(`✅ Section created with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error('Error creating section:', error);
      throw error;
    }
  }

  // Get all topics
  static async getTopics(): Promise<Topic[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const topicsRef = collection(db, this.TOPICS_COLLECTION);
      const q = query(topicsRef, where('isActive', '==', true), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Topic[];
    } catch (error) {
      console.error('Error getting topics:', error);
      return [];
    }
  }

  // Get all sections
  static async getSections(): Promise<Section[]> {
    if (!db) throw new Error('Firestore not available');

    try {
      const sectionsRef = collection(db, this.SECTIONS_COLLECTION);
      const q = query(sectionsRef, where('isActive', '==', true), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Section[];
    } catch (error) {
      console.error('Error getting sections:', error);
      return [];
    }
  }

  // Get section by ID
  static async getSection(sectionId: string): Promise<Section | null> {
    if (!db) throw new Error('Firestore not available');

    try {
      const sectionRef = doc(db, this.SECTIONS_COLLECTION, sectionId);
      const sectionDoc = await getDoc(sectionRef);
      
      if (!sectionDoc.exists()) return null;
      
      return {
        id: sectionDoc.id,
        ...sectionDoc.data()
      } as Section;
    } catch (error) {
      console.error('Error getting section:', error);
      return null;
    }
  }

  // Update topic question count
  private static async updateTopicQuestionCount(topicId: string): Promise<void> {
    if (!db) return;

    try {
      const questions = await this.getQuestionsByTopic(topicId);
      const topicRef = doc(db, this.TOPICS_COLLECTION, topicId);
      
      await updateDoc(topicRef, {
        questionCount: questions.length,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating topic question count:', error);
    }
  }

  // Update section question count
  private static async updateSectionQuestionCount(sectionId: string): Promise<void> {
    if (!db) return;

    try {
      const questions = await this.getQuestionsBySection(sectionId);
      const sectionRef = doc(db, this.SECTIONS_COLLECTION, sectionId);
      
      await updateDoc(sectionRef, {
        currentQuestionCount: questions.length,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating section question count:', error);
    }
  }
}
