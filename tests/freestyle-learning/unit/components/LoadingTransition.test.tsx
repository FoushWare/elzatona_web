/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingTransition } from '@/components/LoadingTransition';

describe('LoadingTransition Component', () => {
  test('renders loading message when visible', () => {
    render(
      <LoadingTransition isVisible={true} message="Loading learning paths..." />
    );

    expect(screen.getByText('Loading learning paths...')).toBeInTheDocument();
  });

  test('does not render when not visible', () => {
    render(<LoadingTransition isVisible={false} message="Loading..." />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('shows spinner animation', () => {
    render(<LoadingTransition isVisible={true} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('auto-hides after duration', async () => {
    render(<LoadingTransition isVisible={true} duration={100} />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      },
      { timeout: 200 }
    );
  });

  test('uses default message when not provided', () => {
    render(<LoadingTransition isVisible={true} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('uses default duration when not provided', async () => {
    render(<LoadingTransition isVisible={true} />);

    // Should still be visible after 100ms (default is 2000ms)
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<LoadingTransition isVisible={true} />);

    const container = screen.getByTestId('loading-transition');
    expect(container).toHaveClass(
      'fixed',
      'inset-0',
      'bg-black',
      'bg-opacity-75',
      'z-50',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  test('shows loading animation with correct classes', () => {
    render(<LoadingTransition isVisible={true} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-12',
      'w-12',
      'border-b-2',
      'border-indigo-600'
    );
  });
});
