/**
 * Unit Tests for Flashcards CRUD Operations
 * Task: 16
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlashcardsPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/flashcards',
}));

describe('16: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<FlashcardsPage />);
    expect(container).toBeInTheDocument();
  });
});
