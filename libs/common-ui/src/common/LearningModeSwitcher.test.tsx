/**
 * Unit Tests for LearningModeSwitcher Component
 * Tests learning mode switching functionality
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LearningModeSwitcher } from "./LearningModeSwitcher";

// Mock contexts
const mockSetUserType = jest.fn();

jest.mock("@elzatona/contexts", () => ({
  useUserType: jest.fn(() => ({
    userType: "guided",
    setUserType: mockSetUserType,
  })),
}));

describe("LearningModeSwitcher Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render learning mode switcher when userType is set", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const switcher = screen.getByLabelText(/learning mode switcher/i);
      expect(switcher).toBeInTheDocument();
    });

    it("should not render when userType is null", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: null,
        setUserType: mockSetUserType,
      });

      const { container } = render(
        <LearningModeSwitcher isScrolled={false} variant="desktop" />,
      );
      expect(container.firstChild).toBeNull();
    });

    it("should display current mode (guided) in button", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      expect(screen.getByText(/guided/i)).toBeInTheDocument();
    });

    it("should display current mode (self-directed) in button", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: "self-directed",
        setUserType: mockSetUserType,
      });

      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      expect(screen.getByText(/free style/i)).toBeInTheDocument();
    });
  });

  describe("Desktop Variant", () => {
    it("should open dropdown when button is clicked", async () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const button = screen.getByLabelText(/learning mode switcher/i);
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/guided learning/i)).toBeInTheDocument();
        expect(screen.getByText(/free style learning/i)).toBeInTheDocument();
      });
    });

    it("should close dropdown when clicking outside", async () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <LearningModeSwitcher isScrolled={false} variant="desktop" />
        </div>,
      );

      const button = screen.getByLabelText(/learning mode switcher/i);
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText(/guided learning/i)).toBeInTheDocument();
      });

      const outside = screen.getByTestId("outside");
      fireEvent.mouseDown(outside);

      await waitFor(() => {
        expect(screen.queryByText(/guided learning/i)).not.toBeInTheDocument();
      });
    });

    it("should change mode to guided when guided option is clicked", async () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: "self-directed",
        setUserType: mockSetUserType,
      });

      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const button = screen.getByLabelText(/learning mode switcher/i);
      fireEvent.click(button);

      await waitFor(() => {
        const guidedOption = screen.getByText(/guided learning/i);
        fireEvent.click(guidedOption);
      });

      expect(mockSetUserType).toHaveBeenCalledWith("guided");
    });

    it("should change mode to self-directed when free style option is clicked", async () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const button = screen.getByLabelText(/learning mode switcher/i);
      fireEvent.click(button);

      await waitFor(() => {
        const freeStyleOption = screen.getByText(/free style learning/i);
        fireEvent.click(freeStyleOption);
      });

      expect(mockSetUserType).toHaveBeenCalledWith("self-directed");
    });

    it("should apply correct styles when scrolled", () => {
      const { container } = render(
        <LearningModeSwitcher isScrolled={true} variant="desktop" />,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-white", "dark:bg-gray-800");
    });

    it("should apply correct styles when not scrolled", () => {
      const { container } = render(
        <LearningModeSwitcher isScrolled={false} variant="desktop" />,
      );
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-white/20", "text-white");
    });
  });

  describe("Mobile Variant", () => {
    it("should render mobile variant with two buttons", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="mobile" />);
      expect(
        screen.getByLabelText(/switch to guided learning/i),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(/switch to free style learning/i),
      ).toBeInTheDocument();
    });

    it("should change mode to guided when guided button is clicked", () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      jest.spyOn(require("@elzatona/contexts"), "useUserType").mockReturnValue({
        userType: "self-directed",
        setUserType: mockSetUserType,
      });

      render(<LearningModeSwitcher isScrolled={false} variant="mobile" />);
      const guidedButton = screen.getByLabelText(/switch to guided learning/i);
      fireEvent.click(guidedButton);

      expect(mockSetUserType).toHaveBeenCalledWith("guided");
    });

    it("should change mode to self-directed when free style button is clicked", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="mobile" />);
      const freeStyleButton = screen.getByLabelText(
        /switch to free style learning/i,
      );
      fireEvent.click(freeStyleButton);

      expect(mockSetUserType).toHaveBeenCalledWith("self-directed");
    });

    it("should highlight active mode in mobile variant", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="mobile" />);
      const guidedButton = screen.getByLabelText(/switch to guided learning/i);
      expect(guidedButton).toHaveClass(
        "bg-indigo-100",
        "dark:bg-indigo-900/30",
      );
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const button = screen.getByLabelText(/learning mode switcher/i);
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-haspopup", "true");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      render(<LearningModeSwitcher isScrolled={false} variant="desktop" />);
      const button = screen.getByLabelText(/learning mode switcher/i);
      fireEvent.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute("aria-expanded", "true");
      });
    });
  });
});
