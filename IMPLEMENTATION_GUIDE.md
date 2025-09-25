# Implementation Guide: Linking Admin Components

## Overview

This guide shows how to implement the linking between `/admin/sections`, `/admin/content/questions`, and `/admin/guided-learning` based on the Firebase data structure.

## 1. Question Creation & Auto-Linking

### When a question is created in `/admin/content/questions`:

```typescript
// In the question creation form
const createQuestion = async (questionData: QuestionData) => {
  // 1. Create question in unifiedQuestions
  const questionRef = await addDoc(collection(db, 'unifiedQuestions'), {
    ...questionData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    isActive: true,
    isComplete: true,
  });

  // 2. Auto-link to relevant sections based on category + learningPath
  await linkQuestionToSections(
    questionRef.id,
    questionData.category,
    questionData.learningPath
  );

  // 3. Auto-link to relevant learning paths
  await linkQuestionToLearningPaths(
    questionRef.id,
    questionData.category,
    questionData.learningPath
  );
};

const linkQuestionToSections = async (
  questionId: string,
  category: string,
  learningPath: string
) => {
  // Find sections that match the question's category and learning path
  const sectionsQuery = query(
    collection(db, 'sections'),
    where('category', '==', category),
    where('learningPath', '==', learningPath),
    where('isActive', '==', true)
  );

  const sectionsSnapshot = await getDocs(sectionsQuery);

  // Add question to each matching section
  const updatePromises = sectionsSnapshot.docs.map(doc => {
    const sectionData = doc.data();
    const updatedQuestions = [...sectionData.questions, questionId];

    return updateDoc(doc.ref, {
      questions: updatedQuestions,
      updatedAt: Timestamp.now(),
    });
  });

  await Promise.all(updatePromises);
};
```

## 2. Section Management & Question Filtering

### In `/admin/sections`, show questions filtered by section's category and learning path:

```typescript
// Get questions for a specific section
const getSectionQuestions = async (sectionId: string) => {
  const sectionDoc = await getDoc(doc(db, 'sections', sectionId));
  const sectionData = sectionDoc.data();

  if (!sectionData) return [];

  // Get questions that match this section's category and learning path
  const questionsQuery = query(
    collection(db, 'unifiedQuestions'),
    where('category', '==', sectionData.category),
    where('learningPath', '==', sectionData.learningPath),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );

  const questionsSnapshot = await getDocs(questionsQuery);
  return questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add question to section
const addQuestionToSection = async (sectionId: string, questionId: string) => {
  const sectionRef = doc(db, 'sections', sectionId);
  const sectionDoc = await getDoc(sectionRef);
  const sectionData = sectionDoc.data();

  if (sectionData && !sectionData.questions.includes(questionId)) {
    await updateDoc(sectionRef, {
      questions: [...sectionData.questions, questionId],
      updatedAt: Timestamp.now(),
    });
  }
};
```

## 3. Learning Plan Creation & Section Linking

### In `/admin/guided-learning`, build plans from sections:

```typescript
// Get sections for plan creation (filtered by category/learning path)
const getSectionsForPlan = async (category?: string, learningPath?: string) => {
  let sectionsQuery = query(
    collection(db, 'sections'),
    where('isActive', '==', true),
    orderBy('order', 'asc')
  );

  if (category) {
    sectionsQuery = query(sectionsQuery, where('category', '==', category));
  }

  if (learningPath) {
    sectionsQuery = query(
      sectionsQuery,
      where('learningPath', '==', learningPath)
    );
  }

  const sectionsSnapshot = await getDocs(sectionsQuery);
  return sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create learning plan with sections
const createLearningPlan = async (planData: LearningPlanData) => {
  const planRef = await addDoc(collection(db, 'learningPlans'), {
    ...planData,
    planType: 'admin',
    createdBy: 'admin',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    isActive: true,
    isPublic: true,
  });

  return planRef.id;
};
```

## 4. Real-time Updates & Synchronization

### Implement real-time listeners for automatic updates:

```typescript
// Listen for question changes and update sections
const setupQuestionListeners = () => {
  const questionsQuery = query(
    collection(db, 'unifiedQuestions'),
    where('isActive', '==', true)
  );

  onSnapshot(questionsQuery, snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === 'added' || change.type === 'modified') {
        const questionData = change.doc.data();
        await updateRelevantSections(change.doc.id, questionData);
      } else if (change.type === 'removed') {
        await removeQuestionFromSections(change.doc.id);
      }
    });
  });
};

const updateRelevantSections = async (
  questionId: string,
  questionData: any
) => {
  // Find sections that should contain this question
  const sectionsQuery = query(
    collection(db, 'sections'),
    where('category', '==', questionData.category),
    where('learningPath', '==', questionData.learningPath),
    where('isActive', '==', true)
  );

  const sectionsSnapshot = await getDocs(sectionsQuery);

  // Update each section
  const updatePromises = sectionsSnapshot.docs.map(async doc => {
    const sectionData = doc.data();
    const questions = sectionData.questions || [];

    if (!questions.includes(questionId)) {
      await updateDoc(doc.ref, {
        questions: [...questions, questionId],
        updatedAt: Timestamp.now(),
      });
    }
  });

  await Promise.all(updatePromises);
};
```

## 5. Bulk Operations Implementation

### JSON Array Import for Questions:

```typescript
const importQuestionsFromJSON = async (jsonData: any[]) => {
  const batch = writeBatch(db);

  for (const questionData of jsonData) {
    const questionRef = doc(collection(db, 'unifiedQuestions'));
    batch.set(questionRef, {
      ...questionData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      isActive: true,
      isComplete: true,
    });
  }

  await batch.commit();

  // Auto-link to sections after import
  for (const questionData of jsonData) {
    await linkQuestionToSections(
      questionData.id,
      questionData.category,
      questionData.learningPath
    );
  }
};
```

### Markdown Bulk Import:

```typescript
const importQuestionsFromMarkdown = async (markdownContent: string) => {
  const questions = parseMarkdownQuestions(markdownContent);
  await importQuestionsFromJSON(questions);
};

const parseMarkdownQuestions = (markdown: string): QuestionData[] => {
  // Parse markdown and extract questions
  // This would use your existing MarkdownQuestionExtractor logic
  // Return array of question objects
};
```

## 6. User Custom Plan Creation

### Allow users to create custom plans:

```typescript
const createUserPlan = async (userId: string, planData: UserPlanData) => {
  const userPlanRef = await addDoc(collection(db, 'userPlans'), {
    ...planData,
    userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    isActive: true,
    isPublic: false,
  });

  return userPlanRef.id;
};

// Get available sections and questions for user plan creation
const getAvailableContentForUserPlan = async (
  category?: string,
  learningPath?: string
) => {
  const [sectionsSnapshot, questionsSnapshot] = await Promise.all([
    getDocs(
      query(
        collection(db, 'sections'),
        where('isActive', '==', true),
        where('isPublic', '==', true),
        ...(category ? [where('category', '==', category)] : []),
        ...(learningPath ? [where('learningPath', '==', learningPath)] : [])
      )
    ),
    getDocs(
      query(
        collection(db, 'unifiedQuestions'),
        where('isActive', '==', true),
        where('isPublic', '==', true),
        ...(category ? [where('category', '==', category)] : []),
        ...(learningPath ? [where('learningPath', '==', learningPath)] : [])
      )
    ),
  ]);

  return {
    sections: sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    questions: questionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })),
  };
};
```

## 7. Progress Tracking Implementation

### Track user progress through plans:

```typescript
const updateUserProgress = async (
  userId: string,
  planId: string,
  questionId: string,
  score: number
) => {
  const progressRef = doc(db, 'userProgress', `${userId}_${planId}`);
  const progressDoc = await getDoc(progressRef);

  if (progressDoc.exists()) {
    const progressData = progressDoc.data();
    const updatedScores = { ...progressData.scores, [questionId]: score };
    const completedQuestions = progressData.completedQuestions.includes(
      questionId
    )
      ? progressData.completedQuestions
      : [...progressData.completedQuestions, questionId];

    await updateDoc(progressRef, {
      scores: updatedScores,
      completedQuestions,
      averageScore: calculateAverageScore(updatedScores),
      lastActivityAt: Timestamp.now(),
    });
  } else {
    await setDoc(progressRef, {
      userId,
      planId,
      completedQuestions: [questionId],
      scores: { [questionId]: score },
      averageScore: score,
      startedAt: Timestamp.now(),
      lastActivityAt: Timestamp.now(),
    });
  }
};
```

## 8. API Endpoints Structure

### Create API endpoints for each admin interface:

```typescript
// /api/admin/questions
export async function POST(request: NextRequest) {
  // Create question and auto-link to sections
}

// /api/admin/sections
export async function GET(request: NextRequest) {
  // Get sections with their questions
}

export async function POST(request: NextRequest) {
  // Create section and link questions
}

// /api/admin/guided-learning/plans
export async function GET(request: NextRequest) {
  // Get learning plans with sections and questions
}

export async function POST(request: NextRequest) {
  // Create learning plan
}

// /api/user/plans
export async function GET(request: NextRequest) {
  // Get user's custom plans
}

export async function POST(request: NextRequest) {
  // Create user custom plan
}
```

This implementation ensures that:

1. Questions are automatically linked to relevant sections
2. Sections show appropriate questions based on category/learning path
3. Learning plans can be built from sections
4. Users can create custom plans
5. All changes are synchronized in real-time
6. Progress is tracked consistently



