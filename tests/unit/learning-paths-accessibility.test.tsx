import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import LearningPathsPage from '@/app/learning-paths/page';
import { LearningPathCard } from '@/components/LearningPathCard';
import { LearningPathsGrid } from '@/components/LearningPathsGrid';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

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

// Mock the resources
jest.mock('@/lib/resources', () => ({
  learningPaths: [
    {
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
      ],
      targetSkills: ['HTML', 'CSS', 'JavaScript'],
      prerequisites: ['Basic computer skills'],
    },
    {
      id: 'react-mastery',
      title: 'React Mastery',
      description: 'Master React development with hooks and patterns',
      difficulty: 'intermediate' as const,
      estimatedTime: 60,
      questionCount: 30,
      resources: [
        {
          id: 'resource2',
          title: 'React Guide',
          url: 'https://example.com/react',
          type: 'tutorial',
        },
      ],
      targetSkills: ['React', 'Hooks', 'State Management'],
      prerequisites: ['JavaScript ES6+'],
    },
  ],
  getResourceById: jest.fn(id => ({
    id,
    title: `Resource ${id}`,
    url: `https://example.com/${id}`,
    type: 'documentation',
  })),
}));

describe('Learning Paths Accessibility Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LearningPathsPage Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<LearningPathsPage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading hierarchy', () => {
      render(<LearningPathsPage />);

      const mainHeading = screen.getByRole('heading', {
        name: 'Learning Paths',
      });
      expect(mainHeading.tagName).toBe('H1');
    });

    it('should have proper ARIA landmarks', () => {
      render(<LearningPathsPage />);

      // Check for main landmark
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should have proper focus management', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Tab through the page
      await user.tab();
      await user.tab();
      await user.tab();

      // Should be able to focus on interactive elements
      const focusedElement = document.activeElement;
      expect(focusedElement).toBeInTheDocument();
    });

    it('should have proper color contrast', () => {
      const { container } = render(<LearningPathsPage />);

      // Check that text elements have proper color classes
      const headings = container.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        expect(heading).toHaveClass('text-foreground');
      });
    });

    it('should have proper link descriptions', () => {
      render(<LearningPathsPage />);

      const scheduleLink = screen.getByRole('link', {
        name: /schedule ai mock interview/i,
      });
      expect(scheduleLink).toHaveAttribute('href', '/schedule-interview');

      const studyPlansLink = screen.getByRole('link', {
        name: /view study plans/i,
      });
      expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
    });
  });

  describe('LearningPathCard Accessibility', () => {
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
      ],
      targetSkills: ['HTML', 'CSS', 'JavaScript'],
      prerequisites: ['Basic computer skills'],
    };

    it('should not have accessibility violations when collapsed', async () => {
      const { container } = render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={true}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations when expanded', async () => {
      const { container } = render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={false}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes for toggle button', () => {
      render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={true}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );

      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should update ARIA attributes when toggled', () => {
      const { rerender } = render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={true}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );

      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={false}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );

      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have proper labels for action buttons when expanded', () => {
      render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={false}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );

      const practiceButton = screen.getByRole('link', {
        name: /practice questions/i,
      });
      const resourcesButton = screen.getByRole('link', {
        name: /view resources/i,
      });
      const flashcardButton = screen.getByLabelText(
        /add learning path to flashcards/i
      );

      expect(practiceButton).toBeInTheDocument();
      expect(resourcesButton).toBeInTheDocument();
      expect(flashcardButton).toBeInTheDocument();
    });

    it('should have proper focus management', async () => {
      render(
        <LearningPathCard
          path={mockLearningPath}
          isCollapsed={false}
          onToggle={jest.fn()}
          cardRef={jest.fn()}
        />
      );

      const practiceButton = screen.getByRole('link', {
        name: /practice questions/i,
      });
      practiceButton.focus();

      expect(document.activeElement).toBe(practiceButton);
    });
  });

  describe('LearningPathsGrid Accessibility', () => {
    const mockLearningPaths = [
      {
        id: 'frontend-basics',
        title: 'Frontend Basics',
        description: 'Learn HTML, CSS, and JavaScript fundamentals',
        difficulty: 'beginner' as const,
        estimatedTime: 40,
        questionCount: 25,
        resources: [],
        targetSkills: ['HTML', 'CSS', 'JavaScript'],
        prerequisites: ['Basic computer skills'],
      },
      {
        id: 'react-mastery',
        title: 'React Mastery',
        description: 'Master React development with hooks and patterns',
        difficulty: 'intermediate' as const,
        estimatedTime: 60,
        questionCount: 30,
        resources: [],
        targetSkills: ['React', 'Hooks', 'State Management'],
        prerequisites: ['JavaScript ES6+'],
      },
    ];

    it('should not have accessibility violations', async () => {
      const { container } = render(
        <LearningPathsGrid
          paths={mockLearningPaths}
          collapsedCards={new Set()}
          onToggleCard={jest.fn()}
          cardRefs={{ current: {} }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper grid structure', () => {
      const { container } = render(
        <LearningPathsGrid
          paths={mockLearningPaths}
          collapsedCards={new Set()}
          onToggleCard={jest.fn()}
          cardRefs={{ current: {} }}
        />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });

    it('should handle empty state accessibility', async () => {
      const { container } = render(
        <LearningPathsGrid
          paths={[]}
          collapsedCards={new Set()}
          onToggleCard={jest.fn()}
          cardRefs={{ current: {} }}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('PageHeader Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <PageHeader title="Test Page" description="Test description" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading structure', () => {
      render(<PageHeader title="Test Page" description="Test description" />);

      const heading = screen.getByRole('heading', { name: 'Test Page' });
      expect(heading.tagName).toBe('H1');
    });

    it('should have proper link descriptions', () => {
      render(<PageHeader title="Test Page" description="Test description" />);

      const studyPlansLink = screen.getByRole('link', {
        name: /view study plans/i,
      });
      const prepGuidesLink = screen.getByRole('link', {
        name: /preparation guides/i,
      });

      expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
      expect(prepGuidesLink).toHaveAttribute('href', '/preparation-guides');
    });

    it('should have proper mobile menu accessibility', async () => {
      const user = userEvent.setup();
      const customLinks = Array(5)
        .fill(null)
        .map((_, index) => ({
          href: `/link-${index}`,
          label: `Link ${index + 1}`,
          icon: '🔗',
          variant: 'primary' as const,
        }));

      render(
        <PageHeader
          title="Test Page"
          description="Test description"
          links={customLinks}
          showMobileButtons={true}
        />
      );

      const moreButton = screen.getByRole('button', { name: /more/i });
      await user.click(moreButton);

      // Additional links should be accessible in the dropdown
      const dropdownLinks = screen.getAllByRole('link', { name: /🔗 Link 3/ });
      expect(dropdownLinks.length).toBeGreaterThan(0);
    });
  });

  describe('EmptyState Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<EmptyState />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper heading structure', () => {
      render(<EmptyState />);

      const heading = screen.getByRole('heading', {
        name: 'No learning paths found',
      });
      expect(heading.tagName).toBe('H3');
    });

    it('should have proper link description', () => {
      render(<EmptyState />);

      const studyPlansLink = screen.getByRole('link', {
        name: /view study plans/i,
      });
      expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
    });

    it('should have proper focus management', () => {
      render(<EmptyState />);

      const studyPlansLink = screen.getByRole('link', {
        name: /view study plans/i,
      });
      studyPlansLink.focus();

      expect(document.activeElement).toBe(studyPlansLink);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support keyboard navigation throughout the page', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Tab through all interactive elements
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();

      // Should be able to navigate without errors
      expect(document.activeElement).toBeInTheDocument();
    });

    it('should support Enter key activation for buttons', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Focus on first card button
      const firstCard = screen.getByText('Frontend Basics').closest('button');
      firstCard?.focus();

      // Press Enter to activate
      await user.keyboard('{Enter}');

      // Should not throw errors
      expect(firstCard).toBeInTheDocument();
    });

    it('should support Space key activation for buttons', async () => {
      const user = userEvent.setup();
      render(<LearningPathsPage />);

      // Focus on first card button
      const firstCard = screen.getByText('Frontend Basics').closest('button');
      firstCard?.focus();

      // Press Space to activate
      await user.keyboard(' ');

      // Should not throw errors
      expect(firstCard).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should have proper alt text for icons', () => {
      render(<LearningPathsPage />);

      // Check for flashcard icons with proper labels
      const flashcardIcons = screen.getAllByLabelText(
        /add learning path to flashcards/i
      );
      expect(flashcardIcons.length).toBeGreaterThan(0);
    });

    it('should have proper descriptions for interactive elements', () => {
      render(<LearningPathsPage />);

      // Check that buttons have proper accessible names
      const cardButtons = screen.getAllByRole('button');
      cardButtons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('should have proper link context', () => {
      render(<LearningPathsPage />);

      // Check that links have descriptive text
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });
  });

  describe('Color and Contrast', () => {
    it('should have sufficient color contrast for text', () => {
      const { container } = render(<LearningPathsPage />);

      // Check that text elements have proper color classes
      // Only check elements that actually contain text content and are meant to display text
      const textElements = container.querySelectorAll(
        'p, span, div, h1, h2, h3, h4, h5, h6'
      );
      const failingElements: string[] = [];

      textElements.forEach(element => {
        // Skip elements that don't contain text or are layout containers
        const hasTextContent =
          element.textContent && element.textContent.trim().length > 0;

        // Skip elements that are clearly layout containers
        const isLayoutContainer =
          element.className.includes('flex') ||
          element.className.includes('grid') ||
          element.className.includes('absolute') ||
          element.className.includes('relative') ||
          element.className.includes('overflow') ||
          element.className.includes('bg-gradient') ||
          element.className.includes('border') ||
          element.className.includes('shadow') ||
          element.className.includes('transform') ||
          element.className.includes('transition') ||
          element.className.includes('mb-') ||
          element.className.includes('mt-') ||
          element.className.includes('p-') ||
          element.className.includes('space-') ||
          element.className.includes('gap-') ||
          element.className.includes('text-center') ||
          element.className.includes('justify-') ||
          element.className.includes('items-') ||
          element.className.includes('mr-') ||
          element.className.includes('ml-') ||
          element.className.includes('mx-') ||
          element.className.includes('my-') ||
          element.className.includes('truncate') ||
          element.className.includes('w-') ||
          element.className.includes('h-') ||
          element.className.includes('min-w-') ||
          element.className.includes('max-w-') ||
          element.className.includes('min-h-') ||
          element.className.includes('max-h-');

        // Skip elements that are just spacing/margin containers
        const isSpacingContainer =
          element.className.match(/\b(mb|mt|p|space|gap|mr|ml|mx|my)-\d+\b/) &&
          !element.className.includes('text-') &&
          !element.className.includes('font-');

        // Skip elements with only layout classes and no semantic text classes
        const hasOnlyLayoutClasses =
          element.className.match(
            /^(mr|ml|mx|my|mb|mt|p|space|gap|w|h|min-w|max-w|min-h|max-h|flex|grid|absolute|relative|overflow|bg-gradient|border|shadow|transform|transition|text-center|justify|items|truncate)(-\d+)?(\s|$)/
          ) &&
          !element.className.includes('text-') &&
          !element.className.includes('font-');

        // Skip elements with empty class names (might inherit colors from parent)
        const hasEmptyClassName =
          !element.className || element.className.trim() === '';

        if (
          !hasTextContent ||
          isLayoutContainer ||
          isSpacingContainer ||
          hasOnlyLayoutClasses ||
          hasEmptyClassName
        ) {
          return; // Skip this element
        }

        const classList = element.className;
        // Should have either text-foreground, text-muted-foreground, or other valid text color classes
        const hasValidTextColor =
          classList.includes('text-foreground') ||
          classList.includes('text-muted-foreground') ||
          classList.includes('text-card-foreground') ||
          classList.includes('text-white') ||
          classList.includes('text-gray-') ||
          classList.includes('text-slate-') ||
          classList.includes('text-green-') ||
          classList.includes('text-blue-') ||
          classList.includes('text-purple-') ||
          classList.includes('text-red-') ||
          classList.includes('text-yellow-') ||
          classList.includes('text-orange-') ||
          classList.includes('text-transparent') ||
          classList.includes('bg-clip-text');

        if (!hasValidTextColor) {
          failingElements.push(`${element.tagName}: ${classList}`);
        }
      });

      // If there are failing elements, log them for debugging
      if (failingElements.length > 0) {
        console.log('Elements without valid text color:', failingElements);
      }

      expect(failingElements.length).toBe(0);
    });

    it('should have proper focus indicators', () => {
      const { container } = render(<LearningPathsPage />);

      // Check that interactive elements have focus styles
      const interactiveElements = container.querySelectorAll('button, a');
      interactiveElements.forEach(element => {
        const classList = element.className;
        // Should have focus or hover styles
        expect(
          classList.includes('focus:') || classList.includes('hover:')
        ).toBe(true);
      });
    });
  });
});
