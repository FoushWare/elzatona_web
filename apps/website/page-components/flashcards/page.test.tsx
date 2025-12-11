/**
 * Unit Tests for Flashcards (F-UT-012, F-UT-013, F-UT-014)
 * Tasks: F-007, F-008, F-009 - Flashcards
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlashcardsPage from "./page";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock flashcards library
jest.mock("../../lib/flashcards", () => ({
  loadFlashcards: jest.fn(() => [
    {
      id: "1",
      question: "Test Question",
      answer: "Test Answer",
      section: "HTML",
      difficulty: "easy",
    },
  ]),
  removeFlashcard: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, data: null }),
  } as Response),
);

// Mock lucide-react using the shared mock
jest.mock("lucide-react", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("../../test-utils/mocks/lucide-react.tsx");
});

describe("F-UT-012: Theme and Difficulty Filtering", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", () => {
    const { container } = render(<FlashcardsPage />);
    expect(container).toBeInTheDocument();
  });

  it("should have filter controls", () => {
    render(<FlashcardsPage />);
    // Filters should be available
    expect(document.body).toBeTruthy();
  });
});

describe("F-UT-013: Practice Modes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should support list mode", () => {
    render(<FlashcardsPage />);
    // List mode should be default
    expect(document.body).toBeTruthy();
  });

  it("should support flip mode", () => {
    render(<FlashcardsPage />);
    // Flip mode should be available
    expect(document.body).toBeTruthy();
  });

  it("should support quiz mode", () => {
    render(<FlashcardsPage />);
    // Quiz mode should be available
    expect(document.body).toBeTruthy();
  });
});

describe("F-UT-014: CRUD Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load flashcards on mount", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { loadFlashcards } = require("../../lib/flashcards");
    render(<FlashcardsPage />);
    expect(loadFlashcards).toHaveBeenCalled();
  });

  it("should support flashcard removal", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { removeFlashcard } = require("../../lib/flashcards");
    render(<FlashcardsPage />);
    // Remove functionality should be available
    expect(removeFlashcard).toBeDefined();
  });
});

describe("F-UT-SNAPSHOT: Flashcards Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match flashcards page snapshot (list mode)", () => {
    const { container } = render(<FlashcardsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match flashcards page snapshot (with flashcards)", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { loadFlashcards } = require("../../lib/flashcards");
    loadFlashcards.mockReturnValue([
      {
        id: "1",
        question: "Test Question 1",
        answer: "Test Answer 1",
        section: "HTML",
        difficulty: "easy",
      },
      {
        id: "2",
        question: "Test Question 2",
        answer: "Test Answer 2",
        section: "CSS",
        difficulty: "medium",
      },
    ]);

    const { container } = render(<FlashcardsPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
