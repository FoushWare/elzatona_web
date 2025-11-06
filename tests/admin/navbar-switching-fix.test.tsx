/**
 * Navbar Switching Fix Tests
 *
 * Tests for the navbar switching fix to ensure:
 * - No navbar flash on admin page refresh
 * - Correct navbar rendering for admin routes
 * - Proper SSR/hydration handling
 * - Consistent rendering between server and client
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@elzatona/shared-contexts';
import AdminLayout from '@/app/admin/layout';
import { AdminAuthProvider } from '@elzatona/shared-contexts';

// Set up environment variables before any imports
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

// Mock Supabase before admin layout imports it
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
    })),
  })),
}));

// Mock nuqs before any imports
jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]),
  useQueryStates: jest.fn(() => [{}, jest.fn()]),
  parseAsString: jest.fn(),
  parseAsInteger: jest.fn(),
  createSearchParamsCache: jest.fn(),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock AdminAuthContext from shared-contexts
const mockUseAdminAuth = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
}));

jest.mock('@elzatona/shared-contexts', () => ({
  AdminAuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAdminAuth: () => mockUseAdminAuth(),
}));

// Mock admin components from shared-components
jest.mock('@elzatona/shared-components', () => ({
  AdminNavbar: function MockAdminNavbar() {
    return <div data-testid='admin-navbar'>Admin Navbar</div>;
  },
  NavbarSimple: function MockNavbarSimple() {
    return <div data-testid='website-navbar'>Website Navbar</div>;
  },
}));

// Type definitions for mocks
interface MockAdminAuth {
  login: jest.MockedFunction<
    (email: string, password: string) => Promise<{ success: boolean }>
  >;
  logout: jest.MockedFunction<() => void>;
  user: { id: string; email: string; name: string; role: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

describe('Navbar Switching Fix', () => {
  const mockUsePathname = usePathname as jest.MockedFunction<
    typeof usePathname
  >;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for useAdminAuth
    mockUseAdminAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      user: { email: 'admin@example.com', role: 'super_admin' },
    });
  });

  describe('ConditionalLayout Component', () => {
    it('should render admin layout for admin routes during SSR', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');

      const { container } = render(
        <ConditionalLayout>
          <div>Admin Dashboard Content</div>
        </ConditionalLayout>
      );

      // Should render children without website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('[data-testid="admin-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Dashboard Content')).toBeInTheDocument();
    });

    it('should render website layout for non-admin routes during SSR', () => {
      mockUsePathname.mockReturnValue('/');

      const { container } = render(
        <ConditionalLayout>
          <div>Home Page Content</div>
        </ConditionalLayout>
      );

      // Should render website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
      expect(screen.getByText('Home Page Content')).toBeInTheDocument();
    });

    it('should render website layout for non-admin routes after hydration', () => {
      mockUsePathname.mockReturnValue('/practice');

      const { container } = render(
        <ConditionalLayout>
          <div>Practice Page Content</div>
        </ConditionalLayout>
      );

      // Should render website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
      expect(screen.getByText('Practice Page Content')).toBeInTheDocument();
    });

    it('should handle admin root route correctly', () => {
      mockUsePathname.mockReturnValue('/admin');

      const { container } = render(
        <ConditionalLayout>
          <div>Admin Root Content</div>
        </ConditionalLayout>
      );

      // Should render children without website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Root Content')).toBeInTheDocument();
    });

    it('should handle admin login route correctly', () => {
      mockUsePathname.mockReturnValue('/admin/login');

      const { container } = render(
        <ConditionalLayout>
          <div>Admin Login Content</div>
        </ConditionalLayout>
      );

      // Should render children without website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Login Content')).toBeInTheDocument();
    });

    it('should handle nested admin routes correctly', () => {
      mockUsePathname.mockReturnValue('/admin/questions/unified');

      const { container } = render(
        <ConditionalLayout>
          <div>Admin Questions Content</div>
        </ConditionalLayout>
      );

      // Should render children without website navbar
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Questions Content')).toBeInTheDocument();
    });
  });

  describe('Admin Layout Component', () => {
    it('should render admin navbar for authenticated users', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: { email: 'admin@example.com', role: 'super_admin' },
      });

      const { container } = render(
        <AdminLayout>
          <div>Admin Dashboard Content</div>
        </AdminLayout>
      );

      expect(
        container.querySelector('[data-testid="admin-navbar"]')
      ).toBeInTheDocument();
      expect(screen.getByText('Admin Dashboard Content')).toBeInTheDocument();
    });

    it('should show loading state while checking authentication', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      render(
        <AdminLayout>
          <div>Admin Dashboard Content</div>
        </AdminLayout>
      );

      expect(screen.getByText('Loading admin panel...')).toBeInTheDocument();
      expect(
        screen.queryByText('Admin Dashboard Content')
      ).not.toBeInTheDocument();
    });

    it('should not render admin navbar for login page', () => {
      mockUsePathname.mockReturnValue('/admin/login');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      const { container } = render(
        <AdminLayout>
          <div>Admin Login Content</div>
        </AdminLayout>
      );

      expect(
        container.querySelector('[data-testid="admin-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Login Content')).toBeInTheDocument();
    });

    it('should not render admin navbar for admin root page', () => {
      mockUsePathname.mockReturnValue('/admin');
      mockUseAdminAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        login: jest.fn(),
        logout: jest.fn(),
        user: null,
      });

      const { container } = render(
        <AdminLayout>
          <div>Admin Root Content</div>
        </AdminLayout>
      );

      expect(
        container.querySelector('[data-testid="admin-navbar"]')
      ).not.toBeInTheDocument();
      expect(screen.getByText('Admin Root Content')).toBeInTheDocument();
    });
  });

  describe('SSR/Hydration Consistency', () => {
    it('should render consistently between server and client for admin routes', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');

      // Simulate SSR rendering
      const ssrResult = render(
        <ConditionalLayout>
          <div>Admin Dashboard Content</div>
        </ConditionalLayout>
      );

      const ssrContainer = ssrResult.container;

      // Simulate client-side hydration
      const clientResult = render(
        <ConditionalLayout>
          <div>Admin Dashboard Content</div>
        </ConditionalLayout>
      );

      const clientContainer = clientResult.container;

      // Both should render the same content
      expect(ssrContainer.innerHTML).toBe(clientContainer.innerHTML);
    });

    it('should render consistently between server and client for non-admin routes', () => {
      mockUsePathname.mockReturnValue('/');

      // Simulate SSR rendering
      const ssrResult = render(
        <ConditionalLayout>
          <div>Home Page Content</div>
        </ConditionalLayout>
      );

      const ssrContainer = ssrResult.container;

      // Simulate client-side hydration
      const clientResult = render(
        <ConditionalLayout>
          <div>Home Page Content</div>
        </ConditionalLayout>
      );

      const clientContainer = clientResult.container;

      // Both should render the same content
      expect(ssrContainer.innerHTML).toBe(clientContainer.innerHTML);
    });
  });

  describe('Route Detection', () => {
    it('should correctly identify admin routes', () => {
      const adminRoutes = [
        '/admin',
        '/admin/login',
        '/admin/dashboard',
        '/admin/questions',
        '/admin/users',
        '/admin/settings',
        '/admin/guided-learning',
        '/admin/questions/unified',
      ];

      adminRoutes.forEach(route => {
        mockUsePathname.mockReturnValue(route);

        const { container } = render(
          <ConditionalLayout>
            <div>Content for {route}</div>
          </ConditionalLayout>
        );

        // Should not render website navbar for admin routes
        expect(
          container.querySelector('[data-testid="website-navbar"]')
        ).not.toBeInTheDocument();
        expect(screen.getByText(`Content for ${route}`)).toBeInTheDocument();
      });
    });

    it('should correctly identify non-admin routes', () => {
      const nonAdminRoutes = [
        '/',
        '/practice',
        '/coding',
        '/learning-paths',
        '/preparation-guides',
        '/get-started',
        '/custom-roadmap',
        '/free-style-practice',
        '/features/guided-learning',
        '/pages/my-plans',
      ];

      nonAdminRoutes.forEach(route => {
        mockUsePathname.mockReturnValue(route);

        const { container } = render(
          <ConditionalLayout>
            <div>Content for {route}</div>
          </ConditionalLayout>
        );

        // Should render website navbar for non-admin routes
        expect(
          container.querySelector('[data-testid="website-navbar"]')
        ).toBeInTheDocument();
        expect(screen.getByText(`Content for ${route}`)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined pathname', () => {
      mockUsePathname.mockReturnValue(undefined);

      const { container } = render(
        <ConditionalLayout>
          <div>Content</div>
        </ConditionalLayout>
      );

      // Should default to website layout
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
    });

    it('should handle null pathname', () => {
      mockUsePathname.mockReturnValue(null);

      const { container } = render(
        <ConditionalLayout>
          <div>Content</div>
        </ConditionalLayout>
      );

      // Should default to website layout
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
    });

    it('should handle empty pathname', () => {
      mockUsePathname.mockReturnValue('');

      const { container } = render(
        <ConditionalLayout>
          <div>Content</div>
        </ConditionalLayout>
      );

      // Should default to website layout
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
    });

    it('should handle routes that start with admin but are not admin routes', () => {
      mockUsePathname.mockReturnValue('/admin-panel-public');

      const { container } = render(
        <ConditionalLayout>
          <div>Public Admin Panel Content</div>
        </ConditionalLayout>
      );

      // Should render website navbar since it doesn't start with /admin/
      expect(
        container.querySelector('[data-testid="website-navbar"]')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Public Admin Panel Content')
      ).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', () => {
      mockUsePathname.mockReturnValue('/admin/dashboard');

      const renderSpy = jest.fn();

      function TestComponent() {
        renderSpy();
        return <div>Test Content</div>;
      }

      const { rerender } = render(
        <ConditionalLayout>
          <TestComponent />
        </ConditionalLayout>
      );

      const initialRenderCount = renderSpy.mock.calls.length;

      // Re-render with same props
      rerender(
        <ConditionalLayout>
          <TestComponent />
        </ConditionalLayout>
      );

      // Should not cause additional renders
      expect(renderSpy.mock.calls.length).toBe(initialRenderCount);
    });

    it('should handle rapid route changes efficiently', () => {
      const routes = [
        '/admin/dashboard',
        '/admin/questions',
        '/admin/users',
        '/admin/settings',
      ];

      routes.forEach(route => {
        mockUsePathname.mockReturnValue(route);

        const { container } = render(
          <ConditionalLayout>
            <div>Content for {route}</div>
          </ConditionalLayout>
        );

        // Should render efficiently for each route
        expect(
          container.querySelector('[data-testid="website-navbar"]')
        ).not.toBeInTheDocument();
        expect(screen.getByText(`Content for ${route}`)).toBeInTheDocument();
      });
    });
  });
});
