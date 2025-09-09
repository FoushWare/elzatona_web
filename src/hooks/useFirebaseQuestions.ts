import { useState, useEffect } from 'react';

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/questions/${learningPath}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch questions');
      }

      if (data.success) {
        setQuestions(data.questions || []);
      } else {
        throw new Error(data.error || 'Failed to fetch questions');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (learningPath) {
      fetchQuestions();
    }
  }, [learningPath, fetchQuestions]);

  const refetch = () => {
    fetchQuestions();
  };

  return {
    questions,
    loading,
    error,
    refetch,
  };
}
