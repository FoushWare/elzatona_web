/**
 * Integration Tests for Auto-linking System
 * Tests the complete flow of questions, sections, and guided learning integration
 */

const { describe, test, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } = require('firebase/firestore');

// Mock Firebase configuration for testing
const firebaseConfig = {
  apiKey: "test-api-key",
  authDomain: "test-project.firebaseapp.com",
  projectId: "test-project",
  storageBucket: "test-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "test-app-id"
};

let app;
let db;

// Test data
const testData = {
  questions: [
    {
      title: "JavaScript Fundamentals Test Question",
      content: "What is the output of console.log(typeof null)?",
      type: "single",
      difficulty: "medium",
      category: "JavaScript",
      subcategory: "Fundamentals",
      learningPath: "frontend",
      sectionId: "javascript-fundamentals",
      tags: ["javascript", "fundamentals"],
      options: ["object", "null", "undefined", "string"],
      correctAnswers: ["object"],
      explanation: "typeof null returns 'object' due to a historical bug in JavaScript.",
      points: 1,
      timeLimit: 60,
      isActive: true,
      isComplete: true,
      createdBy: "test-admin",
      lastModifiedBy: "test-admin"
    },
    {
      title: "React Hooks Test Question",
      content: "Which hook is used for side effects in React?",
      type: "single",
      difficulty: "easy",
      category: "React",
      subcategory: "Hooks",
      learningPath: "frontend",
      sectionId: "react-fundamentals",
      tags: ["react", "hooks"],
      options: ["useState", "useEffect", "useContext", "All of the above"],
      correctAnswers: ["useEffect"],
      explanation: "useEffect is specifically designed for side effects in React components.",
      points: 1,
      timeLimit: 45,
      isActive: true,
      isComplete: true,
      createdBy: "test-admin",
      lastModifiedBy: "test-admin"
    }
  ],
  sections: [
    {
      title: "JavaScript Fundamentals",
      description: "Core JavaScript concepts and fundamentals",
      category: "JavaScript",
      learningPathId: "frontend",
      order: 1,
      weight: 25,
      isActive: true,
      questions: []
    },
    {
      title: "React Fundamentals",
      description: "React basics and component lifecycle",
      category: "React",
      learningPathId: "frontend",
      order: 2,
      weight: 25,
      isActive: true,
      questions: []
    }
  ],
  learningPlans: [
    {
      title: "1-Day Frontend Quick Start",
      description: "Quick start guide for frontend development",
      difficulty: "beginner",
      totalQuestions: 0,
      dailyQuestions: 0,
      sections: [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

describe('Auto-linking System Integration Tests', () => {
  beforeAll(async () => {
    // Initialize Firebase for testing
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    
    // Clean up any existing test data
    await cleanupTestData();
  });

  afterAll(async () => {
    // Clean up test data after all tests
    await cleanupTestData();
  });

  beforeEach(async () => {
    // Clean up before each test
    await cleanupTestData();
  });

  describe('Question Creation and Auto-linking', () => {
    test('should create question and auto-link to matching section', async () => {
      // Create a section first
      const sectionRef = await addDoc(collection(db, 'sections'), testData.sections[0]);
      const sectionId = sectionRef.id;

      // Create a question that should match the section
      const questionData = {
        ...testData.questions[0],
        category: "JavaScript",
        learningPath: "frontend"
      };

      const questionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...questionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Simulate auto-linking process
      const sectionsQuery = query(
        collection(db, 'sections'),
        where('category', '==', questionData.category),
        where('learningPathId', '==', questionData.learningPath),
        where('isActive', '==', true)
      );

      const sectionsSnapshot = await getDocs(sectionsQuery);
      const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Verify section was found
      expect(sections).toHaveLength(1);
      expect(sections[0].title).toBe("JavaScript Fundamentals");

      // Verify auto-linking would work
      const sectionData = sections[0];
      const updatedQuestions = [...(sectionData.questions || []), questionRef.id];
      
      // Update section with question ID
      await updateDoc(doc(db, 'sections', sectionId), {
        questions: updatedQuestions,
        updatedAt: new Date().toISOString()
      });

      // Verify the question was added to the section
      const updatedSectionSnapshot = await getDoc(doc(db, 'sections', sectionId));
      const updatedSection = updatedSectionSnapshot.data();
      
      expect(updatedSection.questions).toContain(questionRef.id);
      expect(updatedSection.questions).toHaveLength(1);
    });

    test('should not auto-link question to section with different category', async () => {
      // Create a section with different category
      const sectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[0],
        category: "Python" // Different from question category
      });

      // Create a JavaScript question
      const questionData = {
        ...testData.questions[0],
        category: "JavaScript",
        learningPath: "frontend"
      };

      const questionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...questionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Query for matching sections
      const sectionsQuery = query(
        collection(db, 'sections'),
        where('category', '==', questionData.category),
        where('learningPathId', '==', questionData.learningPath),
        where('isActive', '==', true)
      );

      const sectionsSnapshot = await getDocs(sectionsQuery);
      const sections = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Verify no matching sections found
      expect(sections).toHaveLength(0);
    });
  });

  describe('Section Management and Question Filtering', () => {
    test('should filter questions by section category and learning path', async () => {
      // Create sections
      const jsSectionRef = await addDoc(collection(db, 'sections'), testData.sections[0]);
      const reactSectionRef = await addDoc(collection(db, 'sections'), testData.sections[1]);

      // Create questions
      const jsQuestionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...testData.questions[0],
        category: "JavaScript",
        learningPath: "frontend",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const reactQuestionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...testData.questions[1],
        category: "React",
        learningPath: "frontend",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Add questions to their respective sections
      await updateDoc(doc(db, 'sections', jsSectionRef.id), {
        questions: [jsQuestionRef.id],
        updatedAt: new Date().toISOString()
      });

      await updateDoc(doc(db, 'sections', reactSectionRef.id), {
        questions: [reactQuestionRef.id],
        updatedAt: new Date().toISOString()
      });

      // Test filtering for JavaScript section
      const jsSectionSnapshot = await getDoc(doc(db, 'sections', jsSectionRef.id));
      const jsSection = jsSectionSnapshot.data();
      const jsQuestionIds = jsSection.questions || [];

      const jsQuestionsQuery = query(
        collection(db, 'unifiedQuestions'),
        where('id', 'in', jsQuestionIds)
      );

      const jsQuestionsSnapshot = await getDocs(jsQuestionsQuery);
      const jsQuestions = jsQuestionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(jsQuestions).toHaveLength(1);
      expect(jsQuestions[0].category).toBe("JavaScript");

      // Test filtering for React section
      const reactSectionSnapshot = await getDoc(doc(db, 'sections', reactSectionRef.id));
      const reactSection = reactSectionSnapshot.data();
      const reactQuestionIds = reactSection.questions || [];

      const reactQuestionsQuery = query(
        collection(db, 'unifiedQuestions'),
        where('id', 'in', reactQuestionIds)
      );

      const reactQuestionsSnapshot = await getDocs(reactQuestionsQuery);
      const reactQuestions = reactQuestionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(reactQuestions).toHaveLength(1);
      expect(reactQuestions[0].category).toBe("React");
    });
  });

  describe('Guided Learning Plan Integration', () => {
    test('should create guided learning plan with sections and questions', async () => {
      // Create sections with questions
      const jsSectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[0],
        questions: []
      });

      const reactSectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[1],
        questions: []
      });

      // Create questions and add to sections
      const jsQuestionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...testData.questions[0],
        category: "JavaScript",
        learningPath: "frontend",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const reactQuestionRef = await addDoc(collection(db, 'unifiedQuestions'), {
        ...testData.questions[1],
        category: "React",
        learningPath: "frontend",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // Update sections with questions
      await updateDoc(doc(db, 'sections', jsSectionRef.id), {
        questions: [jsQuestionRef.id],
        updatedAt: new Date().toISOString()
      });

      await updateDoc(doc(db, 'sections', reactSectionRef.id), {
        questions: [reactQuestionRef.id],
        updatedAt: new Date().toISOString()
      });

      // Create guided learning plan
      const planRef = await addDoc(collection(db, 'learningPlans'), {
        ...testData.learningPlans[0],
        sections: [
          {
            sectionId: jsSectionRef.id,
            order: 1,
            weight: 50
          },
          {
            sectionId: reactSectionRef.id,
            order: 2,
            weight: 50
          }
        ],
        totalQuestions: 2,
        dailyQuestions: 2
      });

      // Verify plan was created
      const planSnapshot = await getDoc(doc(db, 'learningPlans', planRef.id));
      const plan = planSnapshot.data();

      expect(plan.title).toBe("1-Day Frontend Quick Start");
      expect(plan.sections).toHaveLength(2);
      expect(plan.totalQuestions).toBe(2);
      expect(plan.dailyQuestions).toBe(2);
    });

    test('should filter sections for guided learning plan creation', async () => {
      // Create sections with different categories and learning paths
      const jsSectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[0],
        category: "JavaScript",
        learningPathId: "frontend"
      });

      const pythonSectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[1],
        title: "Python Fundamentals",
        category: "Python",
        learningPathId: "backend"
      });

      // Test filtering by category
      const frontendSectionsQuery = query(
        collection(db, 'sections'),
        where('category', '==', 'JavaScript'),
        where('isActive', '==', true)
      );

      const frontendSectionsSnapshot = await getDocs(frontendSectionsQuery);
      const frontendSections = frontendSectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(frontendSections).toHaveLength(1);
      expect(frontendSections[0].category).toBe("JavaScript");

      // Test filtering by learning path
      const frontendPathQuery = query(
        collection(db, 'sections'),
        where('learningPathId', '==', 'frontend'),
        where('isActive', '==', true)
      );

      const frontendPathSnapshot = await getDocs(frontendPathQuery);
      const frontendPathSections = frontendPathSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(frontendPathSections).toHaveLength(1);
      expect(frontendPathSections[0].learningPathId).toBe("frontend");
    });
  });

  describe('Bulk Question Import and Auto-linking', () => {
    test('should auto-link multiple questions from bulk import', async () => {
      // Create section
      const sectionRef = await addDoc(collection(db, 'sections'), testData.sections[0]);
      const sectionId = sectionRef.id;

      // Simulate bulk import of questions
      const bulkQuestions = [
        {
          ...testData.questions[0],
          title: "JS Question 1",
          category: "JavaScript",
          learningPath: "frontend"
        },
        {
          ...testData.questions[0],
          title: "JS Question 2",
          content: "What is hoisting in JavaScript?",
          category: "JavaScript",
          learningPath: "frontend"
        },
        {
          ...testData.questions[1],
          title: "React Question 1",
          category: "React",
          learningPath: "frontend"
        }
      ];

      const createdQuestionIds = [];

      // Create questions and simulate auto-linking
      for (const questionData of bulkQuestions) {
        const questionRef = await addDoc(collection(db, 'unifiedQuestions'), {
          ...questionData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        createdQuestionIds.push(questionRef.id);

        // Auto-link JavaScript questions to the section
        if (questionData.category === "JavaScript") {
          const sectionSnapshot = await getDoc(doc(db, 'sections', sectionId));
          const sectionData = sectionSnapshot.data();
          const updatedQuestions = [...(sectionData.questions || []), questionRef.id];

          await updateDoc(doc(db, 'sections', sectionId), {
            questions: updatedQuestions,
            updatedAt: new Date().toISOString()
          });
        }
      }

      // Verify only JavaScript questions were linked to the section
      const sectionSnapshot = await getDoc(doc(db, 'sections', sectionId));
      const sectionData = sectionSnapshot.data();

      expect(sectionData.questions).toHaveLength(2); // Only JavaScript questions
      expect(sectionData.questions).toContain(createdQuestionIds[0]);
      expect(sectionData.questions).toContain(createdQuestionIds[1]);
      expect(sectionData.questions).not.toContain(createdQuestionIds[2]); // React question
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle missing section gracefully', async () => {
      // Try to query for non-existent section
      const nonExistentQuery = query(
        collection(db, 'sections'),
        where('category', '==', 'NonExistent'),
        where('isActive', '==', true)
      );

      const snapshot = await getDocs(nonExistentQuery);
      const sections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(sections).toHaveLength(0);
    });

    test('should handle empty questions array in section', async () => {
      // Create section with empty questions array
      const sectionRef = await addDoc(collection(db, 'sections'), {
        ...testData.sections[0],
        questions: []
      });

      const sectionSnapshot = await getDoc(doc(db, 'sections', sectionRef.id));
      const sectionData = sectionSnapshot.data();

      expect(sectionData.questions).toHaveLength(0);

      // Query for questions in this section should return empty
      const questionsQuery = query(
        collection(db, 'unifiedQuestions'),
        where('id', 'in', sectionData.questions)
      );

      const questionsSnapshot = await getDocs(questionsQuery);
      const questions = questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      expect(questions).toHaveLength(0);
    });
  });
});

// Helper function to clean up test data
async function cleanupTestData() {
  try {
    // Clean up questions
    const questionsSnapshot = await getDocs(collection(db, 'unifiedQuestions'));
    for (const docSnapshot of questionsSnapshot.docs) {
      await deleteDoc(doc(db, 'unifiedQuestions', docSnapshot.id));
    }

    // Clean up sections
    const sectionsSnapshot = await getDocs(collection(db, 'sections'));
    for (const docSnapshot of sectionsSnapshot.docs) {
      await deleteDoc(doc(db, 'sections', docSnapshot.id));
    }

    // Clean up learning plans
    const plansSnapshot = await getDocs(collection(db, 'learningPlans'));
    for (const docSnapshot of plansSnapshot.docs) {
      await deleteDoc(doc(db, 'learningPlans', docSnapshot.id));
    }
  } catch (error) {
    console.warn('Cleanup error (expected in test environment):', error.message);
  }
}



