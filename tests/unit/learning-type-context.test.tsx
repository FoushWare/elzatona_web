// v1.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  LearningTypeProvider,
  useLearningType,
} from '@/context/LearningTypeContext';

function Consumer() {
  const { learningType, setLearningType } = useLearningType();
  return (
    <div>
      <span data-testid='type'>{learningType}</span>
      <button onClick={() => setLearningType('free-style')}>set-free</button>
    </div>
  );
}

describe('LearningTypeContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('provides default guided type', () => {
    render(
      <LearningTypeProvider>
        <Consumer />
      </LearningTypeProvider>
    );
    expect(screen.getByTestId('type').textContent).toBe('guided');
  });

  it('updates learning type', () => {
    render(
      <LearningTypeProvider>
        <Consumer />
      </LearningTypeProvider>
    );
    screen.getByText('set-free').click();
    expect(screen.getByTestId('type')).toHaveTextContent('free-style');
  });
});
