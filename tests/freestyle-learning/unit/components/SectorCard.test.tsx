/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectorCard } from '@/components/SectorCard';

const mockSector = {
  id: 'fundamentals',
  name: 'JavaScript Fundamentals',
  description: 'Variables, functions, and basic concepts',
  questionCount: 8,
  difficulty: 'easy',
  order: 1,
  isActive: true,
};

describe('SectorCard Component', () => {
  test('renders sector information correctly', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(
      screen.getByText('Variables, functions, and basic concepts')
    ).toBeInTheDocument();
    expect(screen.getByText('8 questions')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Order number
  });

  test('shows correct difficulty badge', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    const difficultyBadge = screen.getByText('easy');
    expect(difficultyBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  test('calls onStart when start button is clicked', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    fireEvent.click(screen.getByText('Start Sector'));
    expect(onStart).toHaveBeenCalledWith('fundamentals');
  });

  test('shows completion state when completed', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={85}
      />
    );

    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('Review Again')).toBeInTheDocument();
    expect(screen.getByTestId('completion-check')).toBeInTheDocument();
  });

  test('shows correct button text based on completion state', () => {
    const onStart = jest.fn();

    const { rerender } = render(
      <SectorCard sector={mockSector} onStart={onStart} isCompleted={false} />
    );

    expect(screen.getByText('Start Sector')).toBeInTheDocument();

    rerender(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={90}
      />
    );

    expect(screen.getByText('Review Again')).toBeInTheDocument();
  });

  test('handles different difficulty levels', () => {
    const onStart = jest.fn();

    const mediumSector = { ...mockSector, difficulty: 'medium' };
    const { rerender } = render(
      <SectorCard sector={mediumSector} onStart={onStart} />
    );

    expect(screen.getByText('medium')).toHaveClass(
      'bg-yellow-100',
      'text-yellow-800'
    );

    const hardSector = { ...mockSector, difficulty: 'hard' };
    rerender(<SectorCard sector={hardSector} onStart={onStart} />);

    expect(screen.getByText('hard')).toHaveClass('bg-red-100', 'text-red-800');
  });

  test('shows estimated time based on question count', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    // 8 questions * 2 minutes per question = 16 minutes
    expect(screen.getByText('~16 min')).toBeInTheDocument();
  });

  test('applies correct CSS classes to card container', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    const card = screen.getByTestId('sector-card');
    expect(card).toHaveClass(
      'bg-white',
      'dark:bg-gray-800',
      'rounded-lg',
      'shadow-md',
      'p-6',
      'hover:shadow-lg',
      'transition-all'
    );
  });

  test('applies completion ring when completed', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={85}
      />
    );

    const card = screen.getByTestId('sector-card');
    expect(card).toHaveClass('ring-2', 'ring-green-500');
  });

  test('shows correct button classes for completed state', () => {
    const onStart = jest.fn();

    render(
      <SectorCard
        sector={mockSector}
        onStart={onStart}
        isCompleted={true}
        score={85}
      />
    );

    const button = screen.getByText('Review Again');
    expect(button).toHaveClass(
      'bg-green-600',
      'hover:bg-green-700',
      'text-white'
    );
  });

  test('shows correct button classes for not completed state', () => {
    const onStart = jest.fn();

    render(
      <SectorCard sector={mockSector} onStart={onStart} isCompleted={false} />
    );

    const button = screen.getByText('Start Sector');
    expect(button).toHaveClass(
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'text-white'
    );
  });

  test('displays question count with correct icon', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    const questionCountElement = screen.getByText('8 questions');
    expect(questionCountElement).toBeInTheDocument();
    expect(questionCountElement.closest('div')).toHaveClass(
      'flex',
      'items-center',
      'space-x-1'
    );
  });

  test('displays estimated time with correct icon', () => {
    const onStart = jest.fn();

    render(<SectorCard sector={mockSector} onStart={onStart} />);

    const timeElement = screen.getByText('~16 min');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.closest('div')).toHaveClass(
      'flex',
      'items-center',
      'space-x-1'
    );
  });

  test('handles missing score when completed', () => {
    const onStart = jest.fn();

    render(
      <SectorCard sector={mockSector} onStart={onStart} isCompleted={true} />
    );

    expect(screen.getByText('Review Again')).toBeInTheDocument();
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
  });
});
