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
} from "../../lib/test-env-loader";
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
import { useAdminAuth } from "@elzatona/contexts";

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

// Mock shared contexts
jest.mock("@elzatona/contexts", () => {
  const actual = jest.requireActual("@elzatona/contexts");
  return {
    ...actual,
    useAdminAuth: jest.fn(),
    AdminAuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    NotificationProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// Mock shared components
jest.mock("@elzatona/components", () => {
  const React = require("react");
  return {
    AdminLoginNavbar: () => (
      <nav data-testid="admin-login-navbar">Admin Navbar</nav>
    ),
    AdminLoginPageTemplate: ({
      children,
      isLoading,
    }: {
      children: React.ReactNode;
      isLoading?: boolean;
    }) => {
      if (isLoading) {
        return (
          <div data-testid="admin-login-page-template-loading">
            <nav data-testid="admin-login-navbar">Admin Navbar</nav>
            <div>Loading...</div>
          </div>
        );
      }
      return (
        <div data-testid="admin-login-page-template">
          <nav data-testid="admin-login-navbar">Admin Navbar</nav>
          <h1>Admin Login</h1>
          <p>Access the admin dashboard</p>
          <div>{children}</div>
          <a href="/">← Back to Home</a>
        </div>
      );
    },
    AdminLoginFormMolecule: () => {
      const React = require("react");
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      return (
        <form data-testid="admin-login-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email Address"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button type="submit">Sign In</button>
        </form>
      );
    },
  };
});

// Mock Next.js Link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
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

    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should render without errors", () => {
    const { container } = render(<AdminLoginPage />);
    expect(container).toBeInTheDocument();
  });

  it("should render login form", () => {
    render(<AdminLoginPage />);
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("should have email input field", () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should have password input field", () => {
    render(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should have Sign In button", () => {
    render(<AdminLoginPage />);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should have Back to Home link", () => {
    render(<AdminLoginPage />);
    const homeLink = screen.getByRole("link", { name: /Back to Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});

describe("A-UT-007: Form Inputs Handle Changes", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should update email input on change", async () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: ADMIN_EMAIL } });
    });

    expect(emailInput.value).toBe(ADMIN_EMAIL);
  });

  it("should update password input on change", async () => {
    render(<AdminLoginPage />);
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: ADMIN_PASSWORD } });
    });

    expect(passwordInput.value).toBe(ADMIN_PASSWORD);
  });

  it("should update state correctly on input changes", async () => {
    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(
      /Email Address/i,
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i,
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "testpass" } });
    });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("testpass");
  });
});

describe("A-UT-008: Form Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should show error for empty email", async () => {
    render(<AdminLoginPage />);
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
    render(<AdminLoginPage />);
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
    render(<AdminLoginPage />);
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
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: ADMIN_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: ADMIN_PASSWORD } });
      fireEvent.submit(form!);
    });

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("should show loading spinner when isLoading is true", () => {
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    render(<AdminLoginPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});

describe("A-UT-010: Error Message Display", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should display error message on login failure", async () => {
    mockLogin.mockResolvedValue({
      success: false,
      error: "Invalid credentials",
    });

    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: ADMIN_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.submit(form!);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid credentials|Login failed/i),
      ).toBeInTheDocument();
    });
  });

  it("should clear error message on new submission", async () => {
    mockLogin
      .mockResolvedValueOnce({ success: false, error: "First error" })
      .mockResolvedValueOnce({ success: true });

    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    // First submission - error
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: ADMIN_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: "wrong" } });
      fireEvent.submit(form!);
    });

    await waitFor(() => {
      expect(screen.queryByText(/First error/i)).toBeInTheDocument();
    });

    // Second submission - should clear error
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "correctpassword" } });
      fireEvent.submit(form!);
    });

    // Error should be cleared on new submission attempt
    await waitFor(
      () => {
        expect(screen.queryByText(/First error/i)).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("should handle network errors", async () => {
    mockLogin.mockRejectedValue(new Error("Network error"));

    render(<AdminLoginPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    const form = submitButton.closest("form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: ADMIN_EMAIL } });
      fireEvent.change(passwordInput, { target: { value: ADMIN_PASSWORD } });
      fireEvent.submit(form!);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/An unexpected error occurred|Login failed/i),
      ).toBeInTheDocument();
    });
  });
});

describe("A-UT-SNAPSHOT: Admin Login Page Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });
  });

  it("should match admin login page snapshot (default state)", () => {
    const { container } = render(<AdminLoginPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match admin login page snapshot (loading state)", () => {
    (useAdminAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      login: mockLogin,
      logout: jest.fn(),
      user: null,
    });

    const { container } = render(<AdminLoginPage />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match admin login page snapshot (with form values)", () => {
    const { container } = render(<AdminLoginPage />);

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    // Use mock credentials for snapshots to avoid committing real credentials
    // This is a security best practice - snapshots should never contain real credentials
    const MOCK_EMAIL = "test-admin@example.com";
    const MOCK_PASSWORD = "test-password-123";

    fireEvent.change(emailInput, { target: { value: MOCK_EMAIL } });
    fireEvent.change(passwordInput, { target: { value: MOCK_PASSWORD } });

    expect(container.firstChild).toMatchSnapshot();
  });
});
