import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-server';
import { collection, getDocs } from 'firebase/firestore';
import { SectionService } from '@/lib/section-service';

// Mapping of learning paths to their relevant sections
const learningPathSections: Record<string, string[]> = {
  'performance-optimization': ['performance-optimization'],
  'typescript-essentials': ['typescript-essentials'],
  'security-essentials': ['frontend-security'],
  'css-practice-layout': ['css-fundamentals', 'advanced-css-mastery'],
  'build-tools-devops': ['build-tools-devops'],
  'testing-strategies': ['testing-strategies'],
  'javascript-practice-interview': [
    'javascript-fundamentals',
    'problem-solving-javascript',
  ],
  'advanced-frontend-architectures': [
    'design-patterns-architecture',
    'system-design-frontend',
  ],
  'react-practice-advanced': ['react-fundamentals', 'advanced-react-patterns'],
  'css-mastery': ['css-fundamentals', 'advanced-css-mastery'],
  'react-mastery': ['react-fundamentals', 'advanced-react-patterns'],
  'html-practice': ['html-fundamentals'],
  'html-practice-semantic': ['html-fundamentals'],
  'css-practice': ['css-fundamentals', 'advanced-css-mastery'],
  'javascript-practice': [
    'javascript-fundamentals',
    'problem-solving-javascript',
  ],
  'react-practice': ['react-fundamentals', 'advanced-react-patterns'],
  'frontend-system-design': [
    'system-design-frontend',
    'design-patterns-architecture',
  ],
  'frontend-basics': [
    'html-fundamentals',
    'css-fundamentals',
    'javascript-fundamentals',
  ],
  'javascript-deep-dive': [
    'javascript-fundamentals',
    'javascript-deep-dive',
    'problem-solving-javascript',
  ],
  'api-integration': ['api-integration-communication'],
  'ai-tools-frontend': ['ai-tools-frontend'],
};

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    // Fetch learning paths from Firebase with ordering
    const learningPathsRef = collection(db, 'learningPaths');
    const snapshot = await getDocs(learningPathsRef);

    const learningPaths = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => {
        // Sort by order field if it exists, otherwise by name
        const orderA = a.order || 999;
        const orderB = b.order || 999;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        // If order is the same, prioritize JavaScript Deep Dive
        if (a.id === 'javascript-deep-dive') return -1;
        if (b.id === 'javascript-deep-dive') return 1;
        return (a.name || '').localeCompare(b.name || '');
      });

    // Fetch sections using SectionService
    const sectionsResult = await SectionService.getSections();

    if (!sectionsResult.success) {
      throw new Error(sectionsResult.error || 'Failed to fetch sections');
    }

    const sections = sectionsResult.data || [];

    // Create a map of sections for quick lookup
    const sectionsMap = sections.reduce(
      (acc, section) => {
        acc[section.id] = section;
        return acc;
      },
      {} as Record<string, any>
    );

    // Deduplicate learning paths by ID and add sections data
    const uniqueLearningPaths = learningPaths.reduce((acc, path) => {
      if (!acc.find(existingPath => existingPath.id === path.id)) {
        // Get relevant sections for this learning path
        const relevantSectionIds = learningPathSections[path.id] || [];
        const pathSections = relevantSectionIds
          .map(sectionId => sectionsMap[sectionId])
          .filter(Boolean)
          .map(section => ({
            id: section.id,
            name: section.name,
            questionCount: section.questionCount || 0,
          }));

        acc.push({
          ...path,
          sectors: pathSections,
          // Use the questionCount from the learning path itself
          questionCount: path.questionCount || 0,
        });
      }
      return acc;
    }, [] as any[]);

    return NextResponse.json({
      success: true,
      data: uniqueLearningPaths,
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch learning paths',
      },
      { status: 500 }
    );
  }
}
