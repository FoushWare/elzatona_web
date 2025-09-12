import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageHeader } from '@/components/PageHeader';

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

describe('PageHeader', () => {
  const defaultProps = {
    title: 'Test Page',
    description: 'Test description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and description', () => {
    render(<PageHeader {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Test Page' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders default navigation links', () => {
    render(<PageHeader {...defaultProps} />);

    expect(
      screen.getByRole('link', { name: /view study plans/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /preparation guides/i })
    ).toBeInTheDocument();
  });

  it('renders custom navigation links when provided', () => {
    const customLinks = [
      {
        href: '/custom-link',
        label: 'Custom Link',
        icon: '🔗',
        variant: 'primary' as const,
      },
      {
        href: '/another-link',
        label: 'Another Link',
        icon: '📎',
        variant: 'secondary' as const,
      },
    ];

    render(<PageHeader {...defaultProps} links={customLinks} />);

    expect(
      screen.getByRole('link', { name: '🔗 Custom Link' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '📎 Another Link' })
    ).toBeInTheDocument();
  });

  it('does not show mobile buttons when showMobileButtons is false', () => {
    render(<PageHeader {...defaultProps} showMobileButtons={false} />);

    expect(
      screen.queryByRole('button', { name: /show stats/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /filters/i })
    ).not.toBeInTheDocument();
  });

  it('shows mobile buttons when showMobileButtons is true', () => {
    render(<PageHeader {...defaultProps} showMobileButtons={true} />);

    expect(
      screen.getByRole('button', { name: /show stats/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /filters/i })
    ).toBeInTheDocument();
  });

  it('toggles statistics visibility when mobile button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggleStatistics = jest.fn();

    render(
      <PageHeader
        {...defaultProps}
        showMobileButtons={true}
        onToggleStatistics={mockOnToggleStatistics}
        showStatistics={false}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /show stats/i });
    await user.click(toggleButton);

    expect(mockOnToggleStatistics).toHaveBeenCalled();
  });

  it('toggles filters visibility when mobile button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggleFilters = jest.fn();

    render(
      <PageHeader
        {...defaultProps}
        showMobileButtons={true}
        onToggleFilters={mockOnToggleFilters}
        showFilters={false}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /filters/i });
    await user.click(toggleButton);

    expect(mockOnToggleFilters).toHaveBeenCalled();
  });

  it('shows correct button text based on statistics visibility', () => {
    render(
      <PageHeader
        {...defaultProps}
        showMobileButtons={true}
        showStatistics={true}
      />
    );

    expect(
      screen.getByRole('button', { name: /hide stats/i })
    ).toBeInTheDocument();
  });

  it('shows correct button text based on filters visibility', () => {
    render(
      <PageHeader
        {...defaultProps}
        showMobileButtons={true}
        showFilters={true}
      />
    );

    expect(
      screen.getByRole('button', { name: /hide filters/i })
    ).toBeInTheDocument();
  });

  it('renders icons in navigation links', () => {
    render(<PageHeader {...defaultProps} />);

    // Check that icons are rendered (they should be in the DOM as text)
    expect(screen.getByText('📅')).toBeInTheDocument(); // Study Plans icon
    expect(screen.getByText('🎯')).toBeInTheDocument(); // Preparation Guides icon
  });

  it('applies correct CSS classes for different link variants', () => {
    const customLinks = [
      {
        href: '/primary-link',
        label: 'Primary Link',
        icon: '🔗',
        variant: 'primary' as const,
      },
      {
        href: '/secondary-link',
        label: 'Secondary Link',
        icon: '📎',
        variant: 'secondary' as const,
      },
      {
        href: '/tertiary-link',
        label: 'Tertiary Link',
        icon: '📌',
        variant: 'tertiary' as const,
      },
    ];

    render(<PageHeader {...defaultProps} links={customLinks} />);

    const primaryLink = screen.getByRole('link', { name: '🔗 Primary Link' });
    const secondaryLink = screen.getByRole('link', {
      name: '📎 Secondary Link',
    });
    const tertiaryLink = screen.getByRole('link', { name: '📌 Tertiary Link' });

    // Check for gradient classes instead of solid colors
    expect(primaryLink).toHaveClass(
      'bg-gradient-to-r',
      'from-gray-600',
      'to-gray-700'
    );
    expect(secondaryLink).toHaveClass(
      'bg-gradient-to-r',
      'from-slate-600',
      'to-slate-700'
    );
    expect(tertiaryLink).toHaveClass(
      'bg-gradient-to-r',
      'from-zinc-600',
      'to-zinc-700'
    );
  });

  it('handles empty links array', () => {
    render(<PageHeader {...defaultProps} links={[]} />);

    // Should not crash and still render title and description
    expect(
      screen.getByRole('heading', { name: 'Test Page' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-header-class';
    const { container } = render(
      <PageHeader {...defaultProps} className={customClass} />
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass(customClass);
  });

  it('renders with proper accessibility attributes', () => {
    render(<PageHeader {...defaultProps} />);

    const heading = screen.getByRole('heading', { name: 'Test Page' });
    expect(heading).toBeInTheDocument();

    // Check that links have proper href attributes
    const studyPlansLink = screen.getByRole('link', {
      name: /view study plans/i,
    });
    expect(studyPlansLink).toHaveAttribute('href', '/study-plans');
  });

  it('handles long titles gracefully', () => {
    const longTitle =
      'This is a very long title that might cause layout issues if not handled properly';
    render(<PageHeader {...defaultProps} title={longTitle} />);

    expect(
      screen.getByRole('heading', { name: longTitle })
    ).toBeInTheDocument();
  });

  it('handles long descriptions gracefully', () => {
    const longDescription =
      'This is a very long description that might cause layout issues if not handled properly and should wrap correctly';
    render(<PageHeader {...defaultProps} description={longDescription} />);

    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('renders mobile menu correctly', async () => {
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
        {...defaultProps}
        links={customLinks}
        showMobileButtons={true}
      />
    );

    // Should show "More" button when there are more than 2 links
    const moreButton = screen.getByRole('button', { name: /more/i });
    expect(moreButton).toBeInTheDocument();

    // Click to open menu
    await user.click(moreButton);

    // Should show additional links in the dropdown (use getAllByRole to get all instances)
    const link3Elements = screen.getAllByRole('link', { name: '🔗 Link 3' });
    const link4Elements = screen.getAllByRole('link', { name: '🔗 Link 4' });
    const link5Elements = screen.getAllByRole('link', { name: '🔗 Link 5' });

    // Should have at least 2 instances (main nav + dropdown)
    expect(link3Elements.length).toBeGreaterThanOrEqual(2);
    expect(link4Elements.length).toBeGreaterThanOrEqual(2);
    expect(link5Elements.length).toBeGreaterThanOrEqual(2);
  });

  it('closes mobile menu when clicking outside', async () => {
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
        {...defaultProps}
        links={customLinks}
        showMobileButtons={true}
      />
    );

    const moreButton = screen.getByRole('button', { name: /more/i });
    await user.click(moreButton);

    // Click outside the menu
    await user.click(document.body);

    // Additional links should be hidden from dropdown (but main nav links still exist)
    const link3Elements = screen.getAllByRole('link', { name: '🔗 Link 3' });
    // Should only have 1 instance (main nav), not 2 (main nav + dropdown)
    expect(link3Elements.length).toBe(1);
  });

  it('handles missing optional props gracefully', () => {
    expect(() => {
      render(<PageHeader title="Test" description="Test" />);
    }).not.toThrow();
  });
});
