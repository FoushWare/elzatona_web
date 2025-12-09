/**
 * Integration Tests for Get Started Page (G-IT-003, G-IT-004, G-IT-005)
 * Task: G-002 - Get Started Page
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetStartedPage from './page';
import * as sharedContexts from '@elzatona/contexts';

// Mock shared contexts
jest.mock('@elzatona/contexts', () => {
  const actual = jest.requireActual('../../test-utils/mocks/shared-contexts');
  return {
    ...actual,
    useUserType: jest.fn(),
  };
});

// Mock LearningTypeContext
const mockSetLearningType = jest.fn();
jest.mock('../../context/LearningTypeContext', () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: mockSetLearningType,
  })),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  Play: () => <span data-testid="play-icon">▶</span>,
  Code: () => <span data-testid="code-icon">💻</span>,
  Target: () => <span data-testid="target-icon">🎯</span>,
  BookOpen: () => <span data-testid="book-icon">📖</span>,
  CheckCircle: () => <span data-testid="check-icon">✓</span>,
  Star: () => <span data-testid="star-icon">⭐</span>,
  Users: () => <span data-testid="users-icon">👥</span>,
  Award: () => <span data-testid="award-icon">🏆</span>,
  Map: () => <span data-testid="map-icon">🗺️</span>,
  Compass: () => <span data-testid="compass-icon">🧭</span>,
  ExternalLink: () => <span data-testid="external-icon">🔗</span>,
}));

const mockPush = jest.fn();
const mockSetUserType = jest.fn();
const mockUseRouter = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => mockUseRouter(),
}));

describe('G-IT-003: User Type Selection Updates State', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: mockSetUserType,
    });
    
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call setUserType when "I need guidance" is selected', async () => {
    render(<GetStartedPage />);
    
    const guidedOption = screen.getByText(/I need guidance/i).closest('div[class*="cursor-pointer"]');
    if (guidedOption) {
      fireEvent.click(guidedOption);
      
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        expect(mockSetUserType).toHaveBeenCalledWith('guided');
      });
    }
  });

  it('should call setUserType when "I\'m self-directed" is selected', async () => {
    render(<GetStartedPage />);
    
    const selfDirectedOption = screen.getByText(/I'm self-directed/i).closest('div[class*="cursor-pointer"]');
    if (selfDirectedOption) {
      fireEvent.click(selfDirectedOption);
      
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        expect(mockSetUserType).toHaveBeenCalledWith('self-directed');
      });
    }
  });
});

describe('G-IT-004: "I need guidance" Navigates to Guided Learning', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: mockSetUserType,
    });
    
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should navigate to /features/guided-learning when "I need guidance" is selected', async () => {
    render(<GetStartedPage />);
    
    const guidedOption = screen.getByText(/I need guidance/i).closest('div[class*="cursor-pointer"]');
    if (guidedOption) {
      fireEvent.click(guidedOption);
      
      // Advance timers to trigger navigation (1500ms delay)
      jest.advanceTimersByTime(1800);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/features/guided-learning');
      });
    }
  });

  it('should set learning type to "guided" when navigating', async () => {
    render(<GetStartedPage />);
    
    const guidedOption = screen.getByText(/I need guidance/i).closest('div[class*="cursor-pointer"]');
    if (guidedOption) {
      fireEvent.click(guidedOption);
      
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        expect(mockSetLearningType).toHaveBeenCalledWith('guided');
      });
    }
  });
});

describe('G-IT-005: "I\'m self-directed" Navigates to Browse Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: null,
      setUserType: mockSetUserType,
    });
    
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should navigate to /browse-practice-questions when "I\'m self-directed" is selected', async () => {
    render(<GetStartedPage />);
    
    const selfDirectedOption = screen.getByText(/I'm self-directed/i).closest('div[class*="cursor-pointer"]');
    if (selfDirectedOption) {
      fireEvent.click(selfDirectedOption);
      
      // Advance timers to trigger navigation (1500ms delay)
      jest.advanceTimersByTime(1800);
      
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/browse-practice-questions');
      });
    }
  });

  it('should set learning type to "free-style" when navigating', async () => {
    render(<GetStartedPage />);
    
    const selfDirectedOption = screen.getByText(/I'm self-directed/i).closest('div[class*="cursor-pointer"]');
    if (selfDirectedOption) {
      fireEvent.click(selfDirectedOption);
      
      jest.advanceTimersByTime(300);
      
      await waitFor(() => {
        expect(mockSetLearningType).toHaveBeenCalledWith('free-style');
      });
    }
  });
});

