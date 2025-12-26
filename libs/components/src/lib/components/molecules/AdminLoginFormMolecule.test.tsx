/**
 * Unit Tests for AdminLoginFormMolecule Component
 * Tests form submission, validation, error handling, and loading states
 */

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AdminLoginFormMolecule } from "./AdminLoginFormMolecule";
import { useAdminAuth } from "@elzatona/contexts";

// Mock the useAdminAuth hook
jest.mock("@elzatona/contexts", () => ({
  useAdminAuth: jest.fn(),
}));

const mockLogin = jest.fn();

describe("AdminLoginFormMolecule", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAdminAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  describe("Rendering", () => {
    it("should render email input field", () => {
      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should render password input field", () => {
      render(<AdminLoginFormMolecule />);
      const passwordInput = screen.getByLabelText(/Password/i);
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute("type", "password");
    });

    it("should render submit button", () => {
      render(<AdminLoginFormMolecule />);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });
      expect(submitButton).toBeInTheDocument();
    });

    it("should not show error message initially", () => {
      render(<AdminLoginFormMolecule />);
      expect(screen.queryByText(/error|failed/i)).not.toBeInTheDocument();
    });
  });

  describe("Form Input Handling", () => {
    it("should update email input value on change", async () => {
      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(
        /Email Address/i,
      ) as HTMLInputElement;

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      });

      expect(emailInput.value).toBe("test@example.com");
    });

    it("should update password input value on change", async () => {
      render(<AdminLoginFormMolecule />);
      const passwordInput = screen.getByLabelText(
        /Password/i,
      ) as HTMLInputElement;

      await act(async () => {
        fireEvent.change(passwordInput, { target: { value: "password123" } });
      });

      expect(passwordInput.value).toBe("password123");
    });
  });

  describe("Form Submission", () => {
    it("should call login function on form submit", async () => {
      mockLogin.mockResolvedValue({ success: true });

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          "test@example.com",
          "password123",
        );
      });
    });

    it("should call onSuccess callback on successful login", async () => {
      const onSuccess = jest.fn();
      mockLogin.mockResolvedValue({ success: true });

      render(<AdminLoginFormMolecule onSuccess={onSuccess} />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it("should not call onSuccess callback on failed login", async () => {
      const onSuccess = jest.fn();
      mockLogin.mockResolvedValue({
        success: false,
        error: "Invalid credentials",
      });

      render(<AdminLoginFormMolecule onSuccess={onSuccess} />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(onSuccess).not.toHaveBeenCalled();
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error message on login failure", async () => {
      mockLogin.mockResolvedValue({
        success: false,
        error: "Invalid credentials",
      });

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
      });
    });

    it("should display default error message when login fails without error", async () => {
      mockLogin.mockResolvedValue({ success: false });

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
      });
    });

    it("should display error message on network error", async () => {
      mockLogin.mockRejectedValue(new Error("Network error"));

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(
          screen.getByText(/An unexpected error occurred/i),
        ).toBeInTheDocument();
      });
    });

    it("should clear error message on new submission", async () => {
      mockLogin
        .mockResolvedValueOnce({ success: false, error: "First error" })
        .mockResolvedValueOnce({ success: true });

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      // First submission - error
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrong" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(screen.getByText(/First error/i)).toBeInTheDocument();
      });

      // Second submission - should clear error
      await act(async () => {
        fireEvent.change(passwordInput, {
          target: { value: "correctpassword" },
        });
        fireEvent.submit(form!);
      });

      await waitFor(
        () => {
          expect(screen.queryByText(/First error/i)).not.toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("Loading State", () => {
    it("should disable submit button during submission", async () => {
      mockLogin.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100),
          ),
      );

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      expect(submitButton).toBeDisabled();
    });

    it("should show loading spinner during submission", async () => {
      mockLogin.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100),
          ),
      );

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(screen.getByText(/Signing In/i)).toBeInTheDocument();
      });
    });

    it("should re-enable submit button after submission completes", async () => {
      mockLogin.mockResolvedValue({ success: true });

      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });
      const form = emailInput.closest("form");

      await act(async () => {
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.submit(form!);
      });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe("Form Validation", () => {
    it("should require email field", () => {
      render(<AdminLoginFormMolecule />);
      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toHaveAttribute("required");
    });

    it("should require password field", () => {
      render(<AdminLoginFormMolecule />);
      const passwordInput = screen.getByLabelText(/Password/i);
      expect(passwordInput).toHaveAttribute("required");
    });
  });
});
