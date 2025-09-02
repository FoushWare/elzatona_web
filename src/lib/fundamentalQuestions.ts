import {
  multipleChoiceQuestions,
  MultipleChoiceQuestion,
} from './multipleChoiceQuestions';

// Organized fundamental questions by category
export interface FundamentalCategory {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: MultipleChoiceQuestion[];
  difficultyBreakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
}

// Get questions organized by category
export const getFundamentalCategories = (): FundamentalCategory[] => {
  const categories = [
    {
      id: 'javascript',
      name: 'javascript',
      title: 'JavaScript Fundamentals',
      description:
        'Master JavaScript core concepts, ES6+ features, and advanced patterns',
      icon: '⚡',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      questions: multipleChoiceQuestions.filter(
        q => q.category === 'javascript'
      ),
      difficultyBreakdown: {
        easy: multipleChoiceQuestions.filter(
          q => q.category === 'javascript' && q.difficulty === 'easy'
        ).length,
        medium: multipleChoiceQuestions.filter(
          q => q.category === 'javascript' && q.difficulty === 'medium'
        ).length,
        hard: multipleChoiceQuestions.filter(
          q => q.category === 'javascript' && q.difficulty === 'hard'
        ).length,
      },
    },
    {
      id: 'css',
      name: 'css',
      title: 'CSS Fundamentals',
      description:
        'Learn layouts, animations, responsive design, and modern CSS techniques',
      icon: '🎨',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      questions: multipleChoiceQuestions.filter(q => q.category === 'css'),
      difficultyBreakdown: {
        easy: multipleChoiceQuestions.filter(
          q => q.category === 'css' && q.difficulty === 'easy'
        ).length,
        medium: multipleChoiceQuestions.filter(
          q => q.category === 'css' && q.difficulty === 'medium'
        ).length,
        hard: multipleChoiceQuestions.filter(
          q => q.category === 'css' && q.difficulty === 'hard'
        ).length,
      },
    },
    {
      id: 'html',
      name: 'html',
      title: 'HTML Fundamentals',
      description:
        'Master semantic HTML, accessibility, forms, and modern markup',
      icon: '🌐',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      questions: multipleChoiceQuestions.filter(q => q.category === 'html'),
      difficultyBreakdown: {
        easy: multipleChoiceQuestions.filter(
          q => q.category === 'html' && q.difficulty === 'easy'
        ).length,
        medium: multipleChoiceQuestions.filter(
          q => q.category === 'html' && q.difficulty === 'medium'
        ).length,
        hard: multipleChoiceQuestions.filter(
          q => q.category === 'html' && q.difficulty === 'hard'
        ).length,
      },
    },
    {
      id: 'react',
      name: 'react',
      title: 'React Fundamentals',
      description:
        'Build components, hooks, state management, and modern React applications',
      icon: '⚛️',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/20',
      questions: multipleChoiceQuestions.filter(q => q.category === 'react'),
      difficultyBreakdown: {
        easy: multipleChoiceQuestions.filter(
          q => q.category === 'react' && q.difficulty === 'easy'
        ).length,
        medium: multipleChoiceQuestions.filter(
          q => q.category === 'react' && q.difficulty === 'medium'
        ).length,
        hard: multipleChoiceQuestions.filter(
          q => q.category === 'react' && q.difficulty === 'hard'
        ).length,
      },
    },
  ];

  return categories;
};

// Get questions by category and difficulty
export const getQuestionsByCategoryAndDifficulty = (
  category: string,
  difficulty?: 'easy' | 'medium' | 'hard'
): MultipleChoiceQuestion[] => {
  let questions = multipleChoiceQuestions.filter(q => q.category === category);

  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }

  return questions;
};

// Get random questions for practice
export const getRandomQuestions = (
  category: string,
  count: number = 10,
  difficulty?: 'easy' | 'medium' | 'hard'
): MultipleChoiceQuestion[] => {
  const questions = getQuestionsByCategoryAndDifficulty(category, difficulty);
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get statistics for all categories
export const getFundamentalsStatistics = () => {
  const categories = getFundamentalCategories();

  return {
    totalQuestions: multipleChoiceQuestions.length,
    totalCategories: categories.length,
    categoryBreakdown: categories.map(cat => ({
      name: cat.title,
      count: cat.questions.length,
      icon: cat.icon,
      color: cat.color,
      bgColor: cat.bgColor,
      difficultyBreakdown: cat.difficultyBreakdown,
    })),
  };
};
