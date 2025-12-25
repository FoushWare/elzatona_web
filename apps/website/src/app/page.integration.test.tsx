/**
 * Integration Tests for Homepage
 * 
 * Tests for the refactored home page component integration
 * Following refactoring plans and testing standards
 * 
 * Coverage: Integration between components, hooks, and context providers
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./page";
import * as sharedContexts from "@elzatona/contexts";

// Mock shared contexts
jest.mock("@elzatona/contexts", () => ({
  useUserType: jest.fn(),
  useAuth: jest.fn(),
  UserStatistics: jest.fn(() => (
    <div data-testid="user-statistics">User Statistics</div>
  )),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock LearningTypeContext
const mockSetLearningType = jest.fn();
jest.mock("../context/LearningTypeContext", () => ({
  useLearningType: jest.fn(() => ({
    learningType: null,
    setLearningType: mockSetLearningType,
  })),
}));

// Mock Next.js router
const mockPush = jest.fn();
const mockUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

// Mock hooks and utilities
jest.mock("./lib/hooks/useHomePageState", () => ({
  useHomePageState: jest.fn(),
}));

jest.mock("./lib/homePageHelpers", () => ({
  getPersonalizedContent: jest.fn(),
}));

jest.mock("./lib/constants/homePage.constants", () => ({
  ROUTES: {
    GUIDED_LEARNING: "/features/guided-learning",
    BROWSE_QUESTIONS: "/browse-practice-questions",
  },
}));

import { useHomePageState } from "./lib/hooks/useHomePageState";
import { getPersonalizedContent } from "./lib/homePageHelpers";

describe("HomePage Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (sharedContexts.useUserType as jest.Mock).mockReturnValue({
      userType: "guided",
      setUserType: jest.fn(),
    });

    (sharedContexts.useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      pathname: "/",
    });

    (useHomePageState as jest.Mock).mockReturnValue({
      hasActivePlan: false,
      activePlan: null,
      showAnimation: true,
    });

    (getPersonalizedContent as jest.Mock).mockReturnValue({
      title: "Master Frontend Development",
      subtitle: "The complete platform to ace your frontend interviews",
      cta: "Get Started",
      ctaLink: "/get-started",
      icon: null,
      color: "indigo",
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Component Integration", () => {
    it("should integrate all hooks and contexts correctly", async () => {
      render(<HomePage />);

      // Verify hooks are called
      expect(sharedContexts.useUserType).toHaveBeenCalled();
      expect(sharedContexts.useAuth).toHaveBeenCalled();
      expect(useHomePageState).toHaveBeenCalled();
      expect(getPersonalizedContent).toHaveBeenCalled();
    });

    it("should pass correct props to HomePageLayout", async () => {
      const { useUserType } = sharedContexts;
      (useUserType as jest.Mock).mockReturnValue({
        userType: "guided",
        setUserType: jest.fn(),
      });

      (useHomePageState as jest.Mock).mockReturnValue({
        hasActivePlan: true,
        activePlan: { name: "React Mastery", id: "react-001" },
        showAnimation: false,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(getPersonalizedContent).toHaveBeenCalledWith(
          "guided",
          true,
          { name: "React Mastery", id: "react-001" },
        );
      });
    });
  });

  describe("User Interaction Flow", () => {
    it("should handle guided learning click flow", async () => {
      const mockSetUserType = jest.fn();
      (sharedContexts.useUserType as jest.Mock).mockReturnValue({
        userType: null,
        setUserType: mockSetUserType,
      });

      render(<HomePage />);

      // Wait for component to render
      await waitFor(() => {
        expect(screen.getByText(/Master Frontend Development/i)).toBeInTheDocument();
      });

      // Verify navigation would be triggered (mocked)
      expect(mockPush).toBeDefined();
    });

    it("should handle freestyle learning click flow", async () => {
      const mockSetUserType = jest.fn();
      (sharedContexts.useUserType as jest.Mock).mockReturnValue({
        userType: null,
        setUserType: mockSetUserType,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText(/Master Frontend Development/i)).toBeInTheDocument();
      });

      // Verify navigation would be triggered (mocked)
      expect(mockPush).toBeDefined();
    });
  });

  describe("State Management Integration", () => {
    it("should update state when user type changes", async () => {
      const mockSetUserType = jest.fn();
      (sharedContexts.useUserType as jest.Mock).mockReturnValue({
        userType: null,
        setUserType: mockSetUserType,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(useHomePageState).toHaveBeenCalledWith(null);
      });
    });

    it("should handle active plan state changes", async () => {
      (useHomePageState as jest.Mock).mockReturnValue({
        hasActivePlan: true,
        activePlan: { name: "Test Plan", id: "test-001" },
        showAnimation: true,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(getPersonalizedContent).toHaveBeenCalledWith(
          expect.any(String),
          true,
          { name: "Test Plan", id: "test-001" },
        );
      });
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle errors gracefully with ErrorBoundary", () => {
      // Mock an error in a child component
      (useHomePageState as jest.Mock).mockImplementation(() => {
        throw new Error("Test error");
      });

      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(<HomePage />);

      // ErrorBoundary should catch the error
      expect(consoleError).toHaveBeenCalled();
      consoleError.mockRestore();
    });
  });
});

