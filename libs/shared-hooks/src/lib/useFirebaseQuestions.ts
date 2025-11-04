import { useQuestionsByLearningPath } from './useTanStackQuery';

interface Question {
  id: string;
  title: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: string;
  category: string;
  options: string[];
  correctAnswer: number;
  learningPath: string;
  order: number;
  type?: string;
}

interface UseFirebaseQuestionsResult {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFirebaseQuestions(
  learningPath: string
): UseFirebaseQuestionsResult {
  const {
    data: questionsData,
    isLoading: loading,
    error,
    refetch,
  } = useQuestionsByLearningPath(learningPath);

  const questions = questionsData?.questions || [];

  return {
    questions,
    loading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
}
