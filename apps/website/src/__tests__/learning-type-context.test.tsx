// v1.0
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('@/lib/supabase-client', () => ({
  supabaseClient: {
    auth: {
      getSession: jest
        .fn()
        .mockResolvedValue({ data: { session: { user: { id: 'user_123' } } } }),
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: () => {} } },
      })),
    },
  },
}));
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

describe('LearningTypeContext (app colocated)', () => {
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

  it('updates learning type', async () => {
    render(
      <LearningTypeProvider>
        <Consumer />
      </LearningTypeProvider>
    );
    await act(async () => {
      screen.getByText('set-free').click();
    });
    expect(screen.getByTestId('type')).toHaveTextContent('free-style');
  });

  it('persists learning type under user-scoped key when session exists', async () => {
    render(
      <LearningTypeProvider>
        <Consumer />
      </LearningTypeProvider>
    );
    // wait a tick for provider to initialize userId via getSession
    await act(async () => {});
    await act(async () => {
      screen.getByText('set-free').click();
    });
    expect(
      window.localStorage.getItem('learning-preferences:user_123:type')
    ).toBe('free-style');
  });
});
