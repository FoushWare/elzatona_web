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
const mockAuthState = {
  isAuthenticated: false,
  isLoading: false,
  login: vi.fn(),
};

// Small helper to simulate async delays in tests without nested callbacks
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Helper to fill login form and submit; returns elements for assertions
function fillAndSubmit(email: string, password: string) {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(submitButton);

  return { emailInput, passwordInput, submitButton };
}

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
    const { submitButton } = fillAndSubmit("admin@example.com", "password123");

    await waitFor(() => {
      expect(mockAuthState.login).toHaveBeenCalledWith(
        "admin@example.com",
        "password123",
      );
    });

    expect(submitButton).toBeDisabled();
  });

  it("shows loading state during submission", async () => {
    mockAuthState.login.mockImplementation(async () => {
      await sleep(100);
      return { success: true };
    });

    render(<AdminLoginPage />);
    const { submitButton } = fillAndSubmit("admin@example.com", "password123");

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
    fillAndSubmit("admin@example.com", "wrongpassword");

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).not.toBeDisabled();
  });

  it("displays generic error on unexpected error", async () => {
    mockAuthState.login.mockRejectedValue(new Error("Network error"));

    render(<AdminLoginPage />);
    fillAndSubmit("admin@example.com", "password123");

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

    // First failed attempt
    fillAndSubmit("admin@example.com", "wrongpassword");

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    // Second successful attempt
    fillAndSubmit("admin@example.com", "correctpassword");

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
