/**
 * Unit Tests for Admin Dashboard (A-UT-011, A-UT-012, A-UT-013)
 * Task: A-003 - Admin Dashboard
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminDashboard from "./page";
import { useAdminAuth } from "@elzatona/contexts";

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

// Mock shared hooks
const mockRefetch = jest.fn();
jest.mock("@elzatona/hooks", () => ({
  useAdminStats: jest.fn(() => ({
    data: {
      questions: 100,
      categories: 10,
      topics: 50,
      learningCards: 5,
      learningPlans: 3,
      frontendTasks: 20,
      problemSolvingTasks: 15,
      totalContent: 200,
      totalUsers: 50,
    },
    isLoading: false,
    error: null,
    refetch: mockRefetch,
    isRefetching: false,
  })),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  BookOpen: () => <span>📖</span>,
  HelpCircle: () => <span>❓</span>,
  CreditCard: () => <span>💳</span>,
  FileText: () => <span>📄</span>,
  Settings: () => <span>⚙️</span>,
  Code: () => <span>💻</span>,
  Calculator: () => <span>🔢</span>,
  BarChart3: () => <span>📊</span>,
  FolderOpen: () => <span>📁</span>,
  Folder: () => <span>📁</span>,
  Tag: () => <span>🏷️</span>,
  Users: () => <span>👥</span>,
  Database: () => <span>🗄️</span>,
  TrendingUp: () => <span>📈</span>,
  CheckCircle: () => <span>✅</span>,
  Clock: () => <span>⏰</span>,
  Target: () => <span>🎯</span>,
  Activity: () => <span>📊</span>,
  Zap: () => <span>⚡</span>,
  Star: () => <span>⭐</span>,
  ArrowRight: () => <span>→</span>,
  Plus: () => <span>+</span>,
  Eye: () => <span>👁️</span>,
  Edit: () => <span>✏️</span>,
  Trash2: () => <span>🗑️</span>,
  RefreshCw: () => <span>🔄</span>,
  AlertCircle: () => <span>⚠️</span>,
  Info: () => <span>ℹ️</span>,
  ExternalLink: () => <span>🔗</span>,
}));

describe("A-UT-011: Dashboard Renders", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });
  });

  it("should render without errors", () => {
    const { container } = render(<AdminDashboard />);
    expect(container).toBeInTheDocument();
  });

  it("should display dashboard title", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });

  it("should display welcome message with user name", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin User/i)).toBeInTheDocument();
  });
});

describe("A-UT-012: Stats Display", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });
  });

  it("should display total questions stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Questions/i)).toBeInTheDocument();
  });

  it("should display learning cards stat", () => {
    render(<AdminDashboard />);
    // Learning Cards appears multiple times, check that it exists
    expect(screen.getAllByText(/Learning Cards/i).length).toBeGreaterThan(0);
  });

  it("should display learning plans stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Learning Plans/i)).toBeInTheDocument();
  });

  it("should display topics stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/^Topics$/i)).toBeInTheDocument();
  });

  it("should display categories stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/^Categories$/i)).toBeInTheDocument();
  });

  it("should display total tasks stat", () => {
    render(<AdminDashboard />);
    expect(screen.getByText(/Total Tasks/i)).toBeInTheDocument();
  });

  it("should display admin menu items", () => {
    render(<AdminDashboard />);
    // Check for quick actions that are actually displayed
    expect(screen.getByText(/Add New Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Frontend Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Problem Solving/i)).toBeInTheDocument();
  });
});

describe("A-UT-013: Refresh Functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRefetch.mockClear();

    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });
  });

  it("should have refresh button", () => {
    render(<AdminDashboard />);
    const refreshButton = screen.getByText(/Refresh/i);
    expect(refreshButton).toBeInTheDocument();
  });

  it("should call refetch when refresh button is clicked", () => {
    render(<AdminDashboard />);
    const refreshButton = screen.getByText(/Refresh/i);
    fireEvent.click(refreshButton);

    expect(mockRefetch).toHaveBeenCalled();
  });
});

describe("A-UT-SNAPSHOT: Admin Dashboard Snapshot Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAdminAuth as jest.Mock).mockReturnValue({
      user: {
        id: "1",
        email: "admin@example.com",
        role: "super_admin",
        name: "Admin User",
      },
    });
  });

  it("should match admin dashboard snapshot (with stats)", () => {
    const { container } = render(<AdminDashboard />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
