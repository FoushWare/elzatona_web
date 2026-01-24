/**
 * Unit tests for Admin login page.
 * Tests login form rendering, submission, error handling, and loading states.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminLoginPage from "./page";
import { useAdminAuth } from "@elzatona/contexts";

// Mock Next.js router
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

// Mock useAdminAuth hook
vi.mock("@elzatona/contexts", () => ({
  useAdminAuth: vi.fn(),
}));

describe("AdminLoginPage", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
    mockReplace.mockClear();
  });

  describe("Loading state", () => {
    it("should show loading spinner when auth is loading", () => {
      vi.mocked(useAdminAuth).mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: mockLogin,
      } as any);

      render(<AdminLoginPage />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Admin Login")).not.toBeInTheDocument();
    });
  });

  describe("Form rendering", () => {
    beforeEach(() => {
      vi.mocked(useAdminAuth).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
      } as any);
    });

    it("should render login form with all fields", () => {
      render(<AdminLoginPage />);

      expect(screen.getByText("Admin Login")).toBeInTheDocument();
      expect(screen.getByText("Access the admin dashboard")).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
      expect(screen.getByText("← Back to Home")).toBeInTheDocument();
    });

    it("should render email input with correct attributes", () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "Enter your email");
      expect(emailInput).toBeRequired();
    });

    it("should render password input with correct attributes", () => {
      render(<AdminLoginPage />);

      const passwordInput = screen.getByLabelText(/Password/i);
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(passwordInput).toHaveAttribute("placeholder", "Enter your password");
      expect(passwordInput).toBeRequired();
    });
  });

  describe("Form interaction", () => {
    beforeEach(() => {
      vi.mocked(useAdminAuth).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
      } as any);
    });

    it("should update email input value", () => {
      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });

      expect(emailInput).toHaveValue("admin@example.com");
    });

    it("should update password input value", () => {
      render(<AdminLoginPage />);

      const passwordInput = screen.getByLabelText(/Password/i);
      fireEvent.change(passwordInput, { target: { value: "password123" } });

      expect(passwordInput).toHaveValue("password123");
    });

    it("should call login on form submission with success", async () => {
      mockLogin.mockResolvedValue({ success: true });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith("admin@example.com", "password123");

      await waitFor(() => {
        expect(submitButton).toHaveTextContent("Sign In"); // Should reset after success
      });
    });

    it("should show loading state during submission", async () => {
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      expect(screen.getByText("Signing In...")).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText("Sign In")).toBeInTheDocument();
      });
    });

    it("should display error message on login failure", async () => {
      mockLogin.mockResolvedValue({ success: false, error: "Invalid credentials" });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });
    });

    it("should display generic error on unexpected error", async () => {
      mockLogin.mockRejectedValue(new Error("Network error"));

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });

      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("An unexpected error occurred")).toBeInTheDocument();
      });
    });

    it("should clear error on new submission attempt", async () => {
      mockLogin.mockResolvedValueOnce({ success: false, error: "Invalid credentials" })
              .mockResolvedValueOnce({ success: true });

      render(<AdminLoginPage />);

      const emailInput = screen.getByLabelText(/Email Address/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole("button", { name: /Sign In/i });

      // First failed attempt
      fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });

      // Second successful attempt
      fireEvent.change(passwordInput, { target: { value: "correctpassword" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
      });
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      vi.mocked(useAdminAuth).mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: mockLogin,
      } as any);
    });

    it("should render back to home link", () => {
      render(<AdminLoginPage />);

      const backLink = screen.getByText("← Back to Home");
      expect(backLink).toHaveAttribute("href", "/");
    });
  });
});