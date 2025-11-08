/**
 * Unit Tests for Browse Practice Questions
 * Task: 10
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrowsePracticeQuestionsPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/browse-practice-questions',
}));

describe('10: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<BrowsePracticeQuestionsPage />);
    expect(container).toBeInTheDocument();
  });
});
