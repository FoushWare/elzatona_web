/**
 * Unit Tests for Custom Roadmap Creation
 * Task: 8
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomRoadmapPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/custom-roadmap',
}));

describe('8: Component Renders', () => {
  it('should render without errors', () => {
    const { container } = render(<CustomRoadmapPage />);
    expect(container).toBeInTheDocument();
  });
});
