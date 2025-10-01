import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  Timestamp,
  writeBatch,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase-server';

export interface QuestionData {
  id?: string;
  title: string;
  content: string;
  type: 'single' | 'multiple' | 'open-ended' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  subcategory?: string;
  learningPath: string;
  sectionId?: string;
  tags: string[];
  options?: any[];
  correctAnswers?: string[];
  explanation: string;
  points: number;
  timeLimit: number;
  audioQuestion?: string;
  audioAnswer?: string;
  isActive?: boolean;
  isComplete?: boolean;
  createdBy?: string;
  lastModifiedBy?: string;
}

export interface SectionData {
  id: string;
  name: string;
  description: string;
  category:
    | 'foundation'
    | 'frontend'
    | 'advanced'
    | 'specialized'
    | 'career'
    | 'emerging';
  learningPath: string;
  questions: string[];
  order: number;
  isActive: boolean;
  createdBy?: string;
  lastModifiedBy?: string;
}

class AutoLinkingService {
  private COLLECTIONS = {
    QUESTIONS: 'unifiedQuestions',
    SECTIONS: 'sections',
    LEARNING_PATHS: 'learningPaths',
    LEARNING_PLANS: 'learningPlans',
  };

  /**
   * Auto-link a question to relevant sections based on category and learning path
   * Note: Admin sections are virtual (based on learning paths), so we don't need to update Firestore
   */
  async linkQuestionToSections(
    questionId: string,
    category: string,
    learningPath: string
  ): Promise<void> {
    try {
      console.log('🔗 Auto-linking question to sections:', {
        questionId,
        category,
        learningPath,
      });

      // For admin sections, the linking is automatic based on category and learningPath matching
      // The questions will be filtered by these fields when viewing sections
      console.log(
        `✅ Question ${questionId} will be automatically linked to sections with category: ${category}, learningPath: ${learningPath}`
      );
      console.log(
        'ℹ️ Admin sections are virtual - questions are filtered dynamically based on category and learningPath'
      );

      // No need to update Firestore as admin sections are virtual
      // The linking happens automatically when filtering questions by category and learningPath
    } catch (error) {
      console.error('❌ Error auto-linking question to sections:', error);
      throw new Error('Failed to auto-link question to sections');
    }
  }

  /**
   * Auto-link a question to relevant sectors based on category and learning path
   */
  async linkQuestionToSectors(
    questionId: string,
    category: string,
    learningPath: string
  ): Promise<void> {
    try {
      console.log('🔗 Auto-linking question to sectors:', {
        questionId,
        category,
        learningPath,
      });

      // Find sectors that match the question's learning path
      const sectorsQuery = query(
        collection(db, 'sectors'),
        where('learningPathId', '==', learningPath),
        where('isActive', '==', true)
      );

      const sectorsSnapshot = await getDocs(sectorsQuery);
      console.log(
        `📋 Found ${sectorsSnapshot.docs.length} sectors for learning path: ${learningPath}`
      );

      if (sectorsSnapshot.empty) {
        console.log('⚠️ No sectors found for learning path:', learningPath);
        return;
      }

      // Find the most appropriate sector based on category matching
      let targetSector = null;
      let bestMatch = 0;

      for (const doc of sectorsSnapshot.docs) {
        const sectorData = doc.data();
        const sectorName = sectorData.name.toLowerCase();
        const categoryLower = category.toLowerCase();

        // Check for category matches in sector name
        let matchScore = 0;
        if (
          sectorName.includes(categoryLower) ||
          categoryLower.includes(sectorName)
        ) {
          matchScore += 10;
        }

        // Check for common category keywords
        const categoryKeywords = {
          javascript: ['fundamentals', 'advanced', 'concepts', 'basics'],
          react: ['components', 'hooks', 'state', 'props'],
          css: ['styling', 'layout', 'responsive', 'flexbox', 'grid'],
          html: ['semantic', 'structure', 'elements'],
          performance: ['optimization', 'speed', 'efficiency'],
          testing: ['unit', 'integration', 'e2e', 'jest'],
        };

        for (const [key, keywords] of Object.entries(categoryKeywords)) {
          if (categoryLower.includes(key)) {
            for (const keyword of keywords) {
              if (sectorName.includes(keyword)) {
                matchScore += 5;
              }
            }
          }
        }

        if (matchScore > bestMatch) {
          bestMatch = matchScore;
          targetSector = { id: doc.id, ...sectorData };
        }
      }

      // If no specific match found, use the first available sector
      if (!targetSector) {
        targetSector = {
          id: sectorsSnapshot.docs[0].id,
          ...sectorsSnapshot.docs[0].data(),
        };
        console.log(
          'ℹ️ No specific category match found, using first available sector'
        );
      }

      // Add question to the target sector
      const currentQuestionIds = targetSector.questionIds || [];
      if (!currentQuestionIds.includes(questionId)) {
        const updatedQuestionIds = [...currentQuestionIds, questionId];

        await updateDoc(doc(db, 'sectors', targetSector.id), {
          questionIds: updatedQuestionIds,
          totalQuestions: updatedQuestionIds.length,
          updatedAt: Timestamp.now(),
          lastModifiedBy: 'system',
        });

        console.log(
          `✅ Added question to sector: ${targetSector.name} (${targetSector.id})`
        );
      } else {
        console.log(
          `ℹ️ Question already exists in sector: ${targetSector.name}`
        );
      }

      console.log('🎉 Auto-linking to sectors completed successfully');
    } catch (error) {
      console.error('❌ Error auto-linking question to sectors:', error);
      throw new Error('Failed to auto-link question to sectors');
    }
  }

  /**
   * Auto-link a question to relevant learning paths
   */
  async linkQuestionToLearningPaths(
    questionId: string,
    category: string,
    learningPath: string
  ): Promise<void> {
    try {
      console.log('🔗 Auto-linking question to learning paths:', {
        questionId,
        category,
        learningPath,
      });

      // Find learning paths that match the question's category and learning path
      const learningPathsQuery = query(
        collection(db, this.COLLECTIONS.LEARNING_PATHS),
        where('category', '==', category),
        where('learningPath', '==', learningPath),
        where('isActive', '==', true)
      );

      const learningPathsSnapshot = await getDocs(learningPathsQuery);
      console.log(
        `📋 Found ${learningPathsSnapshot.docs.length} matching learning paths`
      );

      if (learningPathsSnapshot.empty) {
        console.log('⚠️ No matching learning paths found for auto-linking');
        return;
      }

      // Add question to each matching learning path
      const updatePromises = learningPathsSnapshot.docs.map(async doc => {
        const learningPathData = doc.data();
        const questions = learningPathData.questions || [];

        if (!questions.includes(questionId)) {
          const updatedQuestions = [...questions, questionId];

          await updateDoc(doc.ref, {
            questions: updatedQuestions,
            updatedAt: Timestamp.now(),
            lastModifiedBy: 'system',
          });

          console.log(
            `✅ Added question to learning path: ${learningPathData.name}`
          );
        } else {
          console.log(
            `ℹ️ Question already exists in learning path: ${learningPathData.name}`
          );
        }
      });

      await Promise.all(updatePromises);
      console.log('🎉 Auto-linking to learning paths completed successfully');
    } catch (error) {
      console.error('❌ Error auto-linking question to learning paths:', error);
      throw new Error('Failed to auto-link question to learning paths');
    }
  }

  /**
   * Create a question and auto-link it to relevant sections and learning paths
   */
  async createQuestionWithAutoLinking(
    questionData: QuestionData
  ): Promise<string> {
    try {
      console.log('🚀 Creating question with auto-linking:', questionData);

      // 1. Create question in unifiedQuestions
      const questionRef = await addDoc(
        collection(db, this.COLLECTIONS.QUESTIONS),
        {
          ...questionData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          isActive: true,
          isComplete: true,
          createdBy: questionData.createdBy || 'admin',
          lastModifiedBy: questionData.lastModifiedBy || 'admin',
        }
      );

      console.log('✅ Question created with ID:', questionRef.id);

      // 2. Auto-link to relevant sections
      await this.linkQuestionToSections(
        questionRef.id,
        questionData.category,
        questionData.learningPath
      );

      // 3. Auto-link to relevant sectors
      await this.linkQuestionToSectors(
        questionRef.id,
        questionData.category,
        questionData.learningPath
      );

      // 4. Auto-link to relevant learning paths
      await this.linkQuestionToLearningPaths(
        questionRef.id,
        questionData.category,
        questionData.learningPath
      );

      return questionRef.id;
    } catch (error) {
      console.error('❌ Error creating question with auto-linking:', error);
      throw new Error('Failed to create question with auto-linking');
    }
  }

  /**
   * Bulk import questions with auto-linking
   */
  async bulkImportQuestionsWithAutoLinking(
    questionsData: QuestionData[]
  ): Promise<string[]> {
    try {
      console.log(
        `🚀 Bulk importing ${questionsData.length} questions with auto-linking`
      );

      const batch = writeBatch(db);
      const questionIds: string[] = [];

      // Create all questions in batch
      for (const questionData of questionsData) {
        const questionRef = doc(collection(db, this.COLLECTIONS.QUESTIONS));
        batch.set(questionRef, {
          ...questionData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          isActive: true,
          isComplete: true,
          createdBy: questionData.createdBy || 'admin',
          lastModifiedBy: questionData.lastModifiedBy || 'admin',
        });
        questionIds.push(questionRef.id);
      }

      await batch.commit();
      console.log('✅ All questions created in batch');

      // Auto-link each question to relevant sections and learning paths
      const linkingPromises = questionsData.map(async (questionData, index) => {
        const questionId = questionIds[index];

        await Promise.all([
          this.linkQuestionToSections(
            questionId,
            questionData.category,
            questionData.learningPath
          ),
          this.linkQuestionToLearningPaths(
            questionId,
            questionData.category,
            questionData.learningPath
          ),
        ]);
      });

      await Promise.all(linkingPromises);
      console.log('🎉 Bulk import with auto-linking completed successfully');

      return questionIds;
    } catch (error) {
      console.error(
        '❌ Error bulk importing questions with auto-linking:',
        error
      );
      throw new Error('Failed to bulk import questions with auto-linking');
    }
  }

  /**
   * Get the actual Firebase learning path ID by name
   */
  private async getFirebaseLearningPathIdByName(
    name: string
  ): Promise<string | null> {
    try {
      const pathsQuery = query(
        collection(db, this.COLLECTIONS.LEARNING_PATHS),
        where('name', '==', name),
        limit(1)
      );

      const pathsSnapshot = await getDocs(pathsQuery);
      if (!pathsSnapshot.empty) {
        const pathDoc = pathsSnapshot.docs[0];
        return pathDoc.id;
      }
      return null;
    } catch (error) {
      console.error(
        '❌ Error getting Firebase learning path ID by name:',
        error
      );
      return null;
    }
  }

  /**
   * Get questions filtered by section's category and learning path
   * For admin sections, we need to map the static sectionId to the actual Firebase learning path ID
   */
  async getQuestionsForSection(sectionId: string): Promise<QuestionData[]> {
    try {
      console.log('📋 Getting questions for section:', sectionId);

      // For admin sections, the sectionId now directly matches the Firebase learning path ID
      // No more complex mapping needed!
      console.log(
        `🔗 Using section ID directly as learning path: ${sectionId}`
      );

      // Get questions that match this learning path ID directly
      const questionsQuery = query(
        collection(db, this.COLLECTIONS.QUESTIONS),
        where('learningPath', '==', sectionId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );

      const questionsSnapshot = await getDocs(questionsQuery);
      const questions = questionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as QuestionData[];

      console.log(
        `📋 Found ${questions.length} questions for section "${sectionId}"`
      );
      return questions;
    } catch (error) {
      console.error('❌ Error getting questions for section:', error);
      throw new Error('Failed to get questions for section');
    }
  }

  /**
   * Get sections filtered by category and learning path
   * For admin sections, we return the learning paths that match the criteria
   */
  async getSectionsForPlan(
    category?: string,
    learningPath?: string
  ): Promise<SectionData[]> {
    try {
      console.log('📋 Getting sections for plan:', { category, learningPath });

      // For admin sections, we need to get the learning paths from the resources
      // and filter them based on category and learningPath
      const { getDefaultAdminSections } = await import(
        './learning-path-mapping'
      );
      const allSections = getDefaultAdminSections();

      let filteredSections = allSections;

      if (category) {
        filteredSections = filteredSections.filter(
          section => section.category === category
        );
      }

      if (learningPath) {
        filteredSections = filteredSections.filter(
          section => section.learningPathId === learningPath
        );
      }

      // Convert to SectionData format
      const sections: SectionData[] = filteredSections.map(section => ({
        id: section.id,
        name: section.name,
        description: section.description,
        category: section.category as any,
        learningPath: section.learningPathId,
        questions: [], // Will be populated dynamically
        order: 0, // Will be set based on learning path order
        isActive: section.isActive,
        createdBy: 'system',
        lastModifiedBy: 'system',
      }));

      console.log(`📋 Found ${sections.length} sections for plan`);
      return sections;
    } catch (error) {
      console.error('❌ Error getting sections for plan:', error);
      throw new Error('Failed to get sections for plan');
    }
  }

  /**
   * Remove a question from all sections and learning paths
   */
  async removeQuestionFromAllSections(questionId: string): Promise<void> {
    try {
      console.log('🗑️ Removing question from all sections:', questionId);

      // Get all sections that contain this question
      const sectionsQuery = query(
        collection(db, this.COLLECTIONS.SECTIONS),
        where('questions', 'array-contains', questionId),
        where('isActive', '==', true)
      );

      const sectionsSnapshot = await getDocs(sectionsQuery);
      console.log(
        `📋 Found ${sectionsSnapshot.docs.length} sections containing this question`
      );

      // Remove question from each section
      const updatePromises = sectionsSnapshot.docs.map(async doc => {
        const sectionData = doc.data() as SectionData;
        const updatedQuestions = sectionData.questions.filter(
          id => id !== questionId
        );

        await updateDoc(doc.ref, {
          questions: updatedQuestions,
          updatedAt: Timestamp.now(),
          lastModifiedBy: 'system',
        });

        console.log(`✅ Removed question from section: ${sectionData.name}`);
      });

      await Promise.all(updatePromises);
      console.log('🎉 Question removal completed successfully');
    } catch (error) {
      console.error('❌ Error removing question from sections:', error);
      throw new Error('Failed to remove question from sections');
    }
  }
}

export const autoLinkingService = new AutoLinkingService();
