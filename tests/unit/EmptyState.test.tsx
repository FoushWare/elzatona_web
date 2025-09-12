import React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/EmptyState';

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

describe('EmptyState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the empty state message', () => {
    render(<EmptyState />);

    expect(screen.getByText('No learning paths found')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<EmptyState />);

    expect(
      screen.getByText('Check out our other learning resources')
    ).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    render(<EmptyState />);

    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('renders the View Study Plans link', () => {
    render(<EmptyState />);

    const studyPlansLink = screen.getByRole('link', {
      name: /view study plans/i,
    });
    expect(studyPlansLink).toBeInTheDocument();
    expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
  });

  it('does not render clear filters button', () => {
    render(<EmptyState />);

    expect(
      screen.queryByRole('button', { name: /clear filters/i })
    ).not.toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<EmptyState />);

    const emptyState = container.firstChild as HTMLElement;
    expect(emptyState).toHaveClass('text-center', 'py-8', 'sm:py-12', 'px-4');
  });

  it('renders with proper heading structure', () => {
    render(<EmptyState />);

    const heading = screen.getByRole('heading', {
      name: 'No learning paths found',
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });

  it('renders with proper accessibility attributes', () => {
    render(<EmptyState />);

    const studyPlansLink = screen.getByRole('link', {
      name: /view study plans/i,
    });
    expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
  });

  it('has responsive design classes', () => {
    const { container } = render(<EmptyState />);

    const emptyState = container.firstChild as HTMLElement;
    expect(emptyState).toHaveClass('py-8', 'sm:py-12');
  });

  it('renders icon with correct size classes', () => {
    const { container } = render(<EmptyState />);

    const icon = container.querySelector('.text-4xl');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('sm:text-6xl', 'mb-4');
  });

  it('renders heading with correct size classes', () => {
    const { container } = render(<EmptyState />);

    const heading = container.querySelector('h3');
    expect(heading).toHaveClass(
      'text-lg',
      'sm:text-xl',
      'font-semibold',
      'text-foreground',
      'mb-2'
    );
  });

  it('renders description with correct size classes', () => {
    const { container } = render(<EmptyState />);

    const description = container.querySelector('p');
    expect(description).toHaveClass(
      'text-muted-foreground',
      'mb-4',
      'text-sm',
      'sm:text-base'
    );
  });

  it('renders link with correct styling classes', () => {
    const { container } = render(<EmptyState />);

    const link = container.querySelector('a');
    expect(link).toHaveClass(
      'px-4',
      'py-2',
      'border',
      'border-border',
      'text-foreground',
      'rounded-lg',
      'hover:bg-muted',
      'transition-colors',
      'text-sm',
      'sm:text-base'
    );
  });

  it('handles click on study plans link', () => {
    render(<EmptyState />);

    const studyPlansLink = screen.getByRole('link', {
      name: /view study plans/i,
    });
    expect(studyPlansLink).toBeInTheDocument();

    // Link should be clickable (no errors when rendered)
    expect(studyPlansLink).not.toBeDisabled();
  });

  it('renders with proper semantic structure', () => {
    const { container } = render(<EmptyState />);

    // Should have proper semantic structure
    const heading = container.querySelector('h3');
    const paragraph = container.querySelector('p');
    const link = container.querySelector('a');

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('has proper color contrast for accessibility', () => {
    const { container } = render(<EmptyState />);

    const heading = container.querySelector('h3');
    const description = container.querySelector('p');

    // Check that proper color classes are applied
    expect(heading).toHaveClass('text-foreground');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('renders without any props', () => {
    expect(() => {
      render(<EmptyState />);
    }).not.toThrow();
  });

  it('maintains consistent spacing', () => {
    const { container } = render(<EmptyState />);

    const emptyState = container.firstChild as HTMLElement;
    const icon = emptyState.querySelector('.text-4xl');
    const heading = emptyState.querySelector('h3');
    const description = emptyState.querySelector('p');

    expect(icon).toHaveClass('mb-4');
    expect(heading).toHaveClass('mb-2');
    expect(description).toHaveClass('mb-4');
  });

  it('has proper focus management for link', () => {
    render(<EmptyState />);

    const studyPlansLink = screen.getByRole('link', {
      name: /view study plans/i,
    });

    // Link should be focusable
    studyPlansLink.focus();
    expect(document.activeElement).toBe(studyPlansLink);
  });
});
