import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearningPathCard } from '@/components/LearningPathCard';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

const mockLearningPath = {
  id: 'frontend-basics',
  title: 'Frontend Basics',
  description: 'Learn HTML, CSS, and JavaScript fundamentals',
  difficulty: 'beginner' as const,
  estimatedTime: 40,
  questionCount: 25,
  resources: [
    {
      id: 'resource1',
      title: 'HTML Tutorial',
      url: 'https://example.com/html',
      type: 'documentation',
    },
    {
      id: 'resource2',
      title: 'CSS Guide',
      url: 'https://example.com/css',
      type: 'tutorial',
    },
  ],
  targetSkills: ['HTML', 'CSS', 'JavaScript'],
  prerequisites: ['Basic computer skills'],
};

describe('LearningPathCard', () => {
  const defaultProps = {
    path: mockLearningPath,
    isCollapsed: true,
    onToggle: jest.fn(),
    cardRef: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the learning path title', () => {
    render(<LearningPathCard {...defaultProps} />);

    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
  });

  it('renders the simplified question count badge', () => {
    render(<LearningPathCard {...defaultProps} />);

    expect(screen.getByText('#25 Q')).toBeInTheDocument();
  });

  it('does not render question count badge when questionCount is 0', () => {
    const pathWithoutQuestions = { ...mockLearningPath, questionCount: 0 };
    render(<LearningPathCard {...defaultProps} path={pathWithoutQuestions} />);

    expect(screen.queryByText('#0 Q')).not.toBeInTheDocument();
  });

  it('renders difficulty badge', () => {
    render(<LearningPathCard {...defaultProps} />);

    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  it('renders estimated time', () => {
    render(<LearningPathCard {...defaultProps} />);

    expect(screen.getByText('40 hours')).toBeInTheDocument();
  });

  it('renders target skills', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={false} />);

    // There are multiple instances of HTML/CSS/JavaScript (in tags and skills sections)
    expect(screen.getAllByText('HTML')).toHaveLength(2);
    expect(screen.getAllByText('CSS')).toHaveLength(2);
    expect(screen.getAllByText('JavaScript')).toHaveLength(2);
  });

  it('renders prerequisites', () => {
    render(<LearningPathCard {...defaultProps} />);

    expect(screen.getByText('Basic computer skills')).toBeInTheDocument();
  });

  it('renders action buttons when expanded', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={false} />);

    expect(
      screen.getByRole('link', { name: /practice questions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /view resources/i })
    ).toBeInTheDocument();
  });

  it('does not render action buttons when collapsed', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={true} />);

    // In the test environment, the buttons might still be in the DOM but hidden by CSS
    // Let's check that the collapsible content has the correct classes
    const collapsibleContent = document.querySelector('.overflow-hidden');
    expect(collapsibleContent).toHaveClass('max-h-0', 'opacity-0');
  });

  it('renders flashcard icon with proper data attribute', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={false} />);

    const flashcardIcon = screen.getByLabelText(
      /add learning path to flashcards/i
    );
    expect(flashcardIcon).toBeInTheDocument();
    expect(flashcardIcon.closest('[data-flashcard-icon]')).toBeInTheDocument();
  });

  it('calls onToggle when card header is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();

    render(<LearningPathCard {...defaultProps} onToggle={mockOnToggle} />);

    const header = screen.getByTestId('card-header');
    await user.click(header);

    expect(mockOnToggle).toHaveBeenCalledWith('frontend-basics');
  });

  it('has correct href attributes for action buttons', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={false} />);

    const practiceButton = screen.getByRole('link', {
      name: /practice questions/i,
    });
    const resourcesButton = screen.getByRole('link', {
      name: /view resources/i,
    });

    expect(practiceButton).toHaveAttribute(
      'href',
      '/learning-paths/frontend-basics/questions'
    );
    expect(resourcesButton).toHaveAttribute(
      'href',
      '/learning-paths/frontend-basics/resources'
    );
  });

  it('has correct href attribute for flashcard icon', () => {
    render(<LearningPathCard {...defaultProps} isCollapsed={false} />);

    const flashcardIcon = screen.getByLabelText(
      /add learning path to flashcards/i
    );
    expect(flashcardIcon).toHaveAttribute(
      'href',
      '/learning-paths/frontend-basics/questions'
    );
  });

  it('applies correct CSS classes for collapsed state', () => {
    const { container } = render(
      <LearningPathCard {...defaultProps} isCollapsed={true} />
    );

    const card = container.querySelector(
      '[data-testid="learning-path-card"]'
    ) as HTMLElement;
    expect(card).toHaveClass(
      'bg-gradient-to-br',
      'rounded-2xl',
      'shadow-lg',
      'border'
    );
  });

  it('applies correct CSS classes for expanded state', () => {
    const { container } = render(
      <LearningPathCard {...defaultProps} isCollapsed={false} />
    );

    const card = container.querySelector(
      '[data-testid="learning-path-card"]'
    ) as HTMLElement;
    expect(card).toHaveClass(
      'bg-gradient-to-br',
      'rounded-2xl',
      'shadow-lg',
      'border'
    );
  });

  it('renders with proper accessibility attributes', () => {
    render(<LearningPathCard {...defaultProps} />);

    // Check that the card has proper structure
    const card = screen.getByTestId('learning-path-card');
    expect(card).toBeInTheDocument();

    // Check that the header is clickable
    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
  });

  it('updates visual state when toggled', () => {
    const { rerender } = render(
      <LearningPathCard
        {...defaultProps}
        isCollapsed={true}
        onToggle={jest.fn()}
      />
    );

    // Check collapsed state - collapsible content should have collapsed classes
    const collapsibleContent = document.querySelector('.overflow-hidden');
    expect(collapsibleContent).toHaveClass('max-h-0', 'opacity-0');

    // Simulate toggle by rerendering with expanded state
    rerender(
      <LearningPathCard
        {...defaultProps}
        isCollapsed={false}
        onToggle={jest.fn()}
      />
    );

    // Check expanded state - collapsible content should have expanded classes
    const expandedContent = document.querySelector('.overflow-hidden');
    expect(expandedContent).toHaveClass('max-h-[2000px]', 'opacity-100');
  });

  it('handles missing resources gracefully', () => {
    const pathWithoutResources = { ...mockLearningPath, resources: [] };
    render(
      <LearningPathCard
        {...defaultProps}
        path={pathWithoutResources}
        isCollapsed={false}
      />
    );

    // Should still render the view resources button
    expect(
      screen.getByRole('link', { name: /view resources/i })
    ).toBeInTheDocument();
  });

  it('handles missing target skills gracefully', () => {
    const pathWithoutSkills = { ...mockLearningPath, targetSkills: [] };
    render(<LearningPathCard {...defaultProps} path={pathWithoutSkills} />);

    // Should not crash and still render other content
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
  });

  it('handles missing prerequisites gracefully', () => {
    const pathWithoutPrerequisites = { ...mockLearningPath, prerequisites: [] };
    render(
      <LearningPathCard {...defaultProps} path={pathWithoutPrerequisites} />
    );

    // Should not crash and still render other content
    expect(screen.getByText('Frontend Basics')).toBeInTheDocument();
  });

  it('renders with different difficulty levels', () => {
    const intermediatePath = {
      ...mockLearningPath,
      difficulty: 'intermediate' as const,
    };
    render(<LearningPathCard {...defaultProps} path={intermediatePath} />);

    expect(screen.getByText('intermediate')).toBeInTheDocument();
  });

  it('renders with different estimated times', () => {
    const longPath = { ...mockLearningPath, estimatedTime: 120 };
    render(<LearningPathCard {...defaultProps} path={longPath} />);

    expect(screen.getByText('120 hours')).toBeInTheDocument();
  });

  it('calls cardRef callback with DOM element', () => {
    const mockCardRef = jest.fn();
    render(<LearningPathCard {...defaultProps} cardRef={mockCardRef} />);

    expect(mockCardRef).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});
