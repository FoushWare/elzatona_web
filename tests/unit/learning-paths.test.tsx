import React from 'react';
import { render, screen } from '@testing-library/react';
import LearningPathsPage from '@/app/learning-paths/page';

// Mock the API response
jest.mock(
  '@/app/api/questions/[pathId]/route',
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

  it('renders statistics section', () => {
    render(<LearningPathsPage />);

    // Check for statistics numbers
    expect(screen.getByText('20')).toBeInTheDocument(); // Learning Paths count
    expect(screen.getByText('286')).toBeInTheDocument(); // Total Hours
    expect(screen.getByText('66')).toBeInTheDocument(); // Total Resources
    expect(screen.getByText('12')).toBeInTheDocument(); // Total Skills
  });

  it('renders filter buttons', () => {
    render(<LearningPathsPage />);

    // Check for difficulty filter buttons
    expect(
      screen.getByRole('button', { name: /all levels/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /beginner/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /intermediate/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /advanced/i })
    ).toBeInTheDocument();

    // Check for category filter buttons
    expect(
      screen.getByRole('button', { name: /all categories/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /javascript/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /react/i })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<LearningPathsPage />);

    // Check for navigation links (use getAllByRole to handle duplicates)
    const studyPlansLinks = screen.getAllByRole('link', {
      name: /view study plans/i,
    });
    const preparationGuidesLinks = screen.getAllByRole('link', {
      name: /preparation guides/i,
    });
    const enhancedLearningLinks = screen.getAllByRole('link', {
      name: /enhanced learning/i,
    });

    expect(studyPlansLinks.length).toBeGreaterThan(0);
    expect(preparationGuidesLinks.length).toBeGreaterThan(0);
    expect(enhancedLearningLinks.length).toBeGreaterThan(0);
  });

  it('renders mobile buttons', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByRole('button', { name: /show stats/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /filters/i })
    ).toBeInTheDocument();
  });

  it('renders page description', () => {
    render(<LearningPathsPage />);

    expect(
      screen.getByText(/curated educational journeys/i)
    ).toBeInTheDocument();
  });
});
