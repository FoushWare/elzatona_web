import { useState, useRef } from 'react';

// Type definitions for learning path data
interface LearningPath {
  id: string;
  name: string;
  description: string;
  sectors: Sector[];
  createdAt: string;
  updatedAt: string;
}

interface Sector {
  id: string;
  name: string;
  order: number;
  totalQuestions: number;
  description?: string;
}

export interface SectorGrade {
  sectorId: string;
  sectorName: string;
  sectorOrder: number;
  totalQuestions: number;
  correctAnswers: number;
  grade: string;
  percentage: number;
  isCompleted: boolean;
}

export interface LearningPathSectors {
  pathId: string;
  pathName: string;
  sectors: SectorGrade[];
  overallGrade: string;
  overallPercentage: number;
  totalQuestions: number;
  totalCorrect: number;
}

export const useSectorGrading = (pathId?: string) => {
  const [sectors, setSectors] = useState<LearningPathSectors | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasStartedFetch = useRef(false);

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'A-';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 55) return 'C-';
    if (percentage >= 50) return 'D+';
    if (percentage >= 45) return 'D';
    if (percentage >= 40) return 'D-';
    return 'F';
  };

  const getGradeColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBgColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  // Use immediate execution instead of useEffect to avoid hydration issues
  if (isLoading && pathId && !hasStartedFetch.current) {
    console.log(
      '🚀 useSectorGrading immediate execution triggered with pathId:',
      pathId
    );
    hasStartedFetch.current = true;

    const fetchSectorData = async () => {
      try {
        console.log('🔄 Setting loading to true and error to null');
        setIsLoading(true);
        setError(null);

        // Fetch sectors for the learning path
        console.log('🔄 Fetching sectors for pathId:', pathId);
        const sectorsResponse = await fetch(
          `/api/sectors?learningPathId=${pathId}`
        );
        console.log('📡 Sectors response received');
        const sectorsData = await sectorsResponse.json();
        console.log('📊 Sectors data:', sectorsData);

        if (!sectorsData.success) {
          throw new Error(sectorsData.error || 'Failed to load sectors');
        }

        const sectorsList = sectorsData.data;
        console.log('📝 Sectors list:', sectorsList);

        // Fetch learning path details
        console.log('🔄 Fetching learning path details');
        const pathsResponse = await fetch('/api/questions/learning-paths');
        console.log('📡 Learning paths response received');
        const pathsData = await pathsResponse.json();
        console.log('📊 Learning paths data:', pathsData);

        if (!pathsData.success) {
          throw new Error(pathsData.error || 'Failed to load learning paths');
        }

        const currentPath = pathsData.data.find(
          (path: LearningPath) => path.id === pathId
        );
        console.log('🔍 Current path found:', currentPath);
        if (!currentPath) {
          throw new Error('Learning path not found');
        }

        // Convert sectors to SectorGrade format
        const sectorGrades: SectorGrade[] = sectorsList.map(
          (sector: Sector) => {
            const totalQuestions = sector.totalQuestions || 0;

            // TODO: Replace with real user progress data from Firebase
            // For now, initialize with 0 progress
            const correctAnswers = 0;
            const percentage = 0;

            return {
              sectorId: sector.id,
              sectorName: sector.name,
              sectorOrder: sector.order || 0,
              totalQuestions,
              correctAnswers,
              grade: calculateGrade(percentage),
              percentage,
              isCompleted: false, // Will be updated when user completes questions
            };
          }
        );

        // Sort sectors by order
        sectorGrades.sort((a, b) => a.sectorOrder - b.sectorOrder);

        // Calculate overall grade
        const totalQuestionsOverall = sectorGrades.reduce(
          (sum, sector) => sum + sector.totalQuestions,
          0
        );
        const totalCorrectOverall = sectorGrades.reduce(
          (sum, sector) => sum + sector.correctAnswers,
          0
        );
        const overallPercentage =
          totalQuestionsOverall > 0
            ? Math.round((totalCorrectOverall / totalQuestionsOverall) * 100)
            : 0;

        console.log('✅ Setting sectors data:', {
          pathId,
          pathName: currentPath.name || currentPath.title,
          sectors: sectorGrades,
          overallGrade: calculateGrade(overallPercentage),
          overallPercentage,
          totalQuestions: totalQuestionsOverall,
          totalCorrect: totalCorrectOverall,
        });

        setSectors({
          pathId,
          pathName: currentPath.name || currentPath.title,
          sectors: sectorGrades,
          overallGrade: calculateGrade(overallPercentage),
          overallPercentage,
          totalQuestions: totalQuestionsOverall,
          totalCorrect: totalCorrectOverall,
        });

        console.log('✅ Sectors data set successfully');
      } catch (err: unknown) {
        console.error('❌ Error fetching sector data:', err);
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load sector data';
        setError(errorMessage);
      } finally {
        console.log('🔄 Setting loading to false');
        setIsLoading(false);
      }
    };

    // Start the fetch immediately
    fetchSectorData();
  } else if (!pathId) {
    console.log('❌ No pathId provided, setting loading to false');
    setIsLoading(false);
  }

  return {
    sectors,
    isLoading,
    error,
    calculateGrade,
    getGradeColor,
    getGradeBgColor,
  };
};
