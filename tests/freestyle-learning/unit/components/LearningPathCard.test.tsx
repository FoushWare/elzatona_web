/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LearningPathCard } from '@/components/LearningPathCard';

const mockLearningPath = {
  id: 'javascript-deep-dive',
  name: 'JavaScript Deep Dive',
  description: 'Master JavaScript fundamentals and advanced concepts',
  difficulty: 'intermediate',
  questionCount: 45,
  estimatedTime: 180,
  category: 'programming',
  sectors: [
    { id: 'fundamentals', name: 'Fundamentals', questionCount: 8 },
    { id: 'advanced', name: 'Advanced', questionCount: 12 },
  ],
};

describe('LearningPathCard Component', () => {
  test('renders learning path information correctly', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    expect(screen.getByText('JavaScript Deep Dive')).toBeInTheDocument();
    expect(
      screen.getByText('Master JavaScript fundamentals and advanced concepts')
    ).toBeInTheDocument();
    expect(screen.getByText('45 questions')).toBeInTheDocument();
    expect(screen.getByText('180 min')).toBeInTheDocument();
    expect(screen.getByText('2 sectors')).toBeInTheDocument();
  });

  test('shows correct difficulty badge', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    const difficultyBadge = screen.getByText('intermediate');
    expect(difficultyBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  test('calls onSelect when start button is clicked', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByText('Start Learning Path'));
    expect(onSelect).toHaveBeenCalledWith('javascript-deep-dive');
  });

  test('handles different difficulty levels', () => {
    const onSelect = jest.fn();

    const beginnerPath = { ...mockLearningPath, difficulty: 'beginner' };
    const { rerender } = render(
      <LearningPathCard learningPath={beginnerPath} onSelect={onSelect} />
    );

    expect(screen.getByText('beginner')).toHaveClass(
      'bg-green-100',
      'text-green-800'
    );

    const advancedPath = { ...mockLearningPath, difficulty: 'advanced' };
    rerender(
      <LearningPathCard learningPath={advancedPath} onSelect={onSelect} />
    );

    expect(screen.getByText('advanced')).toHaveClass(
      'bg-red-100',
      'text-red-800'
    );
  });

  test('handles missing sectors array', () => {
    const onSelect = jest.fn();
    const pathWithoutSectors = { ...mockLearningPath, sectors: undefined };

    render(
      <LearningPathCard learningPath={pathWithoutSectors} onSelect={onSelect} />
    );

    expect(screen.getByText('0 sectors')).toBeInTheDocument();
  });

  test('handles empty sectors array', () => {
    const onSelect = jest.fn();
    const pathWithEmptySectors = { ...mockLearningPath, sectors: [] };

    render(
      <LearningPathCard
        learningPath={pathWithEmptySectors}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('0 sectors')).toBeInTheDocument();
  });

  test('applies correct CSS classes to card container', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    const card = screen.getByTestId('learning-path-card');
    expect(card).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'rounded-lg',
      'shadow-md',
      'p-6',
      'hover:shadow-lg',
      'transition-shadow'
    );
  });

  test('applies correct CSS classes to start button', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    const button = screen.getByText('Start Learning Path');
    expect(button).toHaveClass(
      'w-full',
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'text-white',
      'font-medium',
      'py-2',
      'px-4',
      'rounded-lg',
      'transition-colors'
    );
  });

  test('displays question count with correct icon', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    const questionCountElement = screen.getByText('45 questions');
    expect(questionCountElement).toBeInTheDocument();
    expect(questionCountElement.closest('div')).toHaveClass(
      'flex',
      'items-center',
      'space-x-1'
    );
  });

  test('displays estimated time with correct icon', () => {
    const onSelect = jest.fn();

    render(
      <LearningPathCard learningPath={mockLearningPath} onSelect={onSelect} />
    );

    const timeElement = screen.getByText('180 min');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.closest('div')).toHaveClass(
      'flex',
      'items-center',
      'space-x-1'
    );
  });
});
