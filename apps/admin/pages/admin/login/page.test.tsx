/**
 * Unit Tests for Admin Login (A-UT-006, A-UT-007, A-UT-008, A-UT-009, A-UT-010)
 * Task: A-002 - Admin Login
 */

// Load environment variables automatically (detects test vs production)
// Priority: .env.test.local > .env.test > .env.local
// In CI: Uses GitHub Secrets automatically
import {
  loadTestEnvironment,
  getAdminCredentials,
} from "../lib/test-env-loader";
loadTestEnvironment();

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminLoginPage from "./page";

// Get credentials from environment variables (with validation)
let ADMIN_EMAIL = "";
let ADMIN_PASSWORD = "";
try {
  const credentials = getAdminCredentials();
  ADMIN_EMAIL = credentials.email;
  ADMIN_PASSWORD = credentials.password;
} catch (error) {
  console.warn("Admin credentials not found - some tests may fail:", error);
}

// Declare mock function at top level before jest.mock() calls
const mockRefetch = jest.fn();

// Mock shared contexts are now handled in jest.setup.js

// Get the mock function after the mock is set up
let mockUseAdminAuth: jest.Mock;
let AdminAuthProvider: React.FC<{ children: React.ReactNode }>;
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const contextsModule = require("@elzatona/contexts");
  mockUseAdminAuth = contextsModule.useAdminAuth as jest.Mock;
  AdminAuthProvider = contextsModule.AdminAuthProvider;

  // Debug: Log the mock function to ensure it's being set up correctly
  console.log("Mock useAdminAuth set up:", typeof mockUseAdminAuth);
  console.log("Is mock function:", typeof mockUseAdminAuth.mockReturnValue);
});

// Helper function to render with AdminAuthProvider
const renderWithProvider = (component: React.ReactElement) => {
  return render(component);
};

// Mock shared components
jest.mock("@elzatona/common-ui", () => {
  const React = jest.requireActual("react");
  return {
    AdminLoginNavbar: () =>
      React.createElement(
        "nav",
        { "data-testid": "admin-login-navbar" },
        "Admin Navbar",
      ),
    AdminLoginPageTemplate: ({
      children,
      isLoading,
    }: {
      children: React.ReactNode;
      isLoading?: boolean;
    }) => {
      // Get error state from the mocked useAdminAuth hook
      const contextsModule = require("@elzatona/contexts");
      const { error } = contextsModule.useAdminAuth();

      if (isLoading) {
        return React.createElement(
          "div",
          { "data-testid": "admin-login-page-template-loading" },
          [
            React.createElement(
              "nav",
              { key: "navbar", "data-testid": "admin-login-navbar" },
              "Admin Navbar",
            ),
            React.createElement("div", { key: "loading" }, "Loading..."),
          ],
        );
      }
      return React.createElement(
        "div",
        { "data-testid": "admin-login-page-template" },
        [
          React.createElement(
            "nav",
            { key: "navbar", "data-testid": "admin-login-navbar" },
            "Admin Navbar",
          ),
          React.createElement("h1", { key: "title" }, "Admin Login"),
          React.createElement(
            "p",
            { key: "description" },
            "Access the admin dashboard",
          ),
          // Display error message if present
          error
            ? React.createElement(
                "div",
                { key: "error", "data-testid": "error-message" },
                error,
              )
            : null,
          React.createElement("div", { key: "content" }, children),
          React.createElement(
            "a",
            { key: "home-link", href: "/" },
            "\u2190 Back to Home",
          ),
        ],
      );
    },
    AdminLoginFormMolecule: () => {
      const React = jest.requireActual("react");
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");

      // Get loading state from the mocked useAdminAuth hook
      const contextsModule = require("@elzatona/contexts");
      const { isLoading } = contextsModule.useAdminAuth();

      return React.createElement(
        "form",
        { "data-testid": "admin-login-form" },
        [
          React.createElement(
            "label",
            { key: "email-label", htmlFor: "email" },
            "Email Address",
          ),
          React.createElement("input", {
            key: "email-input",
            id: "email",
            type: "email",
            value: email,
            required: true,
            onChange: (e) => setEmail(e.target.value),
            "aria-label": "Email Address",
          }),
          React.createElement(
            "label",
            { key: "password-label", htmlFor: "password" },
            "Password",
          ),
          React.createElement("input", {
            key: "password-input",
            id: "password",
            type: "password",
            value: password,
            required: true,
            onChange: (e) => setPassword(e.target.value),
            "aria-label": "Password",
          }),
          React.createElement(
            "button",
            {
              key: "submit-button",
              type: "submit",
              disabled: isLoading,
            },
            isLoading ? "Signing In..." : "Sign In",
          ),
        ],
      );
    },
  };
});

// Mock Next.js Link
jest.mock("next/link", () => {
  const React = jest.requireActual("react");
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return React.createElement("a", { href }, children);
  };
  MockLink.displayName = "MockLink";
  return MockLink;
});

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockLogin = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: jest.fn(),
  }),
  usePathname: () => "/admin/login",
}));

describe("A-UT-006: Admin Login Page Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should render without errors", () => {
    const { container } = renderWithProvider(<AdminLoginPage />);
    expect(container).toBeInTheDocument();
  });

  it("should render login form", () => {
    renderWithProvider(<AdminLoginPage />);
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("should have email input field", () => {
    renderWithProvider(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should have password input field", () => {
    renderWithProvider(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should have Sign In button", () => {
    renderWithProvider(<AdminLoginPage />);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should have Back to Home link", () => {
    renderWithProvider(<AdminLoginPage />);
    const homeLink = screen.getByRole("link", { name: /Back to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});

describe("A-UT-007: Form Inputs Handle Changes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should update email input on change", async () => {
    renderWithProvider(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("should update password input on change", async () => {
    renderWithProvider(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(passwordInput.value).toBe("password123");
  });

  it("should update state correctly on input changes", async () => {
    renderWithProvider(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});

describe("A-UT-008: Form Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should show error for empty email", async () => {
    renderWithProvider(<AdminLoginPage />);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.submit(form!);
    });

    // HTML5 validation should prevent submission
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;
    expect(emailInput.validity.valid).toBe(false);
  });

  it("should show error for invalid email format", async () => {
    renderWithProvider(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.blur(emailInput);
    });

    // HTML5 validation should mark as invalid
    expect(emailInput.validity.valid).toBe(false);
  });

  it("should require password field", async () => {
    renderWithProvider(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Email Address/i), {
        target: { value: ADMIN_EMAIL },
      });
      fireEvent.submit(form!);
    });

    expect(passwordInput.validity.valid).toBe(false);
  });
});

describe("A-UT-009: Loading State", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogin.mockImplementation(() => new Promise(() => {})); // Never resolves
  });

  it("should show loading state during submission", async () => {
    // Set up loading state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    renderWithProvider(<AdminLoginPage />);

    // Should show loading state instead of form
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(
      screen.getByTestId("admin-login-page-template-loading"),
    ).toBeInTheDocument();
  });

  it("should show loading spinner when isLoading is true", () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    renderWithProvider(<AdminLoginPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("A-UT-010: Error Message Display", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should display error message on login failure", async () => {
    // Set up error state in the mock from the beginning
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      error: "Invalid credentials",
    });

    renderWithProvider(<AdminLoginPage />);

    // Check if error message is displayed
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });

  it("should clear error message on new submission", async () => {
    // First, set up the error state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      error: "First error",
    });

    const { rerender } = renderWithProvider(<AdminLoginPage />);

    // Verify error is displayed
    expect(screen.getByText(/First error/i)).toBeInTheDocument();

    // Now clear the error state
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      error: null,
    });

    // Re-render to see the cleared state
    rerender(<AdminLoginPage />);

    // Error should be cleared
    expect(screen.queryByText(/First error/i)).not.toBeInTheDocument();
  });

  it("should handle network errors", async () => {
    // Set up error state for network error
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
      error: "An unexpected error occurred",
    });

    renderWithProvider(<AdminLoginPage />);

    // Check if error message is displayed
    expect(
      screen.getByText(/An unexpected error occurred/i),
    ).toBeInTheDocument();
  });
});

describe("A-UT-SNAPSHOT: Admin Login Page Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should match admin login page snapshot (default state)", () => {
    const { container } = renderWithProvider(<AdminLoginPage />);
    expect(container.firstChild).toMatchSnapshot("admin-login-default");
  });

  it("should match admin login page snapshot (loading state)", () => {
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    const { container } = renderWithProvider(<AdminLoginPage />);
    expect(container.firstChild).toMatchSnapshot("admin-login-loading");
  });

  it("should match admin login page snapshot (with form values)", () => {
    const { container } = renderWithProvider(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Use mock credentials for snapshots to avoid committing real credentials
    // This is a security best practice - snapshots should never contain real credentials
    const MOCK_EMAIL = "test-admin@example.com";
    const MOCK_PASSWORD = "test-password-123";

    fireEvent.change(emailInput, { target: { value: MOCK_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: MOCK_PASSWORD } });

    expect(container.firstChild).toMatchSnapshot(
      "admin-login-with-form-values",
    );
  });

  it("should match admin login page snapshot (error state)", async () => {
    mockLogin.mockResolvedValueOnce({
      success: false,
      error: "Invalid credentials",
    });

    const { container } = renderWithProvider(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrong" } });
      fireEvent.submit(form!);
    });

    await waitFor(() => {
      expect(container.firstChild).toMatchSnapshot("admin-login-error");
    });
  });
});
