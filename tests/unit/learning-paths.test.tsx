import React from 'react';
import { render, screen } from '@testing-library/react';
import LearningPathsPage from '@/app/learning-paths/page';

// Mock the API response
jest.mock(
  '@/app/api/questions/[learningPath]/route',
  () => ({
    GET: jest.fn().mockResolvedValue({
      json: () =>
        Promise.resolve({
          questions: Array.from({ length: 116 }, (_, i) => ({
            id: i + 1,
            question: `Question ${i + 1}`,
            answer: `Answer ${i + 1}`,
          })),
          totalQuestions: 116,
          groups: 6,
        }),
    }),
  }),
  { virtual: true }
);

describe('Learning Paths Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders learning paths page with main heading', () => {
    render(<LearningPathsPage />);

    // Check for main heading
    const headings = screen.getAllByText('Learning Paths');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders AI mock interview button', () => {
    render(<LearningPathsPage />);

    // Check for AI mock interview button
    expect(
      screen.getByRole('link', { name: /schedule ai mock interview/i })
    ).toBeInTheDocument();
  });

  it('renders learning path cards', () => {
    render(<LearningPathsPage />);

    // Check for learning path cards (should be collapsed by default)
    const cards = screen.getAllByTestId('learning-path-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders page description', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByText(/your path to success in interviews/i)
    ).toBeInTheDocument();
  });

  it('does not render statistics section', () => {
    render(<LearningPathsPage />);

    // Statistics section should not be present in simplified version
    expect(screen.queryByText('20')).not.toBeInTheDocument();
    expect(screen.queryByText('286')).not.toBeInTheDocument();
  });

  it('does not render filter buttons', () => {
    render(<LearningPathsPage />);

    // Filter buttons should not be present in simplified version
    expect(
      screen.queryByRole('button', { name: /all levels/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /beginner/i })
    ).not.toBeInTheDocument();
  });
});
