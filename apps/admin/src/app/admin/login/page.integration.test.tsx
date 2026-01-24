/**
 * Integration tests for Admin login page API interactions
 */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import AdminLoginPage from "./page";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the admin auth context with controlled behavior
let mockAuthState = {
  isAuthenticated: false,
  isLoading: false,
  login: vi.fn(),
};

vi.mock("@elzatona/contexts", () => ({
  useAdminAuth: () => mockAuthState,
}));

// Test setup
beforeEach(() => {
  vi.clearAllMocks();
  mockAuthState.login.mockReset();
});

describe("Admin login page - Integration", () => {
  it("renders login form with all fields", () => {
    render(<AdminLoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("submits login form with valid credentials", async () => {
    mockAuthState.login.mockResolvedValue({ success: true });

    render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAuthState.login).toHaveBeenCalledWith(
        "admin@example.com",
        "password123",
      );
    });

    expect(submitButton).toBeDisabled();
  });

  it("shows loading state during submission", async () => {
    mockAuthState.login.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true }), 100),
        ),
    );

    render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
  });

  it("displays error message on login failure", async () => {
    mockAuthState.login.mockResolvedValue({
      success: false,
      error: "Invalid credentials",
    });

    render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    expect(submitButton).not.toBeDisabled();
  });

  it("displays generic error on unexpected error", async () => {
    mockAuthState.login.mockRejectedValue(new Error("Network error"));

    render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "admin@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred"),
      ).toBeInTheDocument();
    });
  });

  it("clears error on new submission attempt", async () => {
    mockAuthState.login
      .mockResolvedValueOnce({ success: false, error: "Invalid credentials" })
      .mockResolvedValueOnce({ success: true });

    render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

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

  it("shows loading spinner when auth is loading", () => {
    mockAuthState.isLoading = true;

    render(<AdminLoginPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument(); // spinner

    mockAuthState.isLoading = false; // Reset for other tests
  });
});
