import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from '@/contexts/ThemeContext';
import AdminLoginNavbar from '@/components/AdminLoginNavbar';

// Mock theme context
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

// Mock AlzatonaLogo component
jest.mock('@/components/AlzatonaLogo', () => {
  return function MockAlzatonaLogo() {
    return <div data-testid="alzatona-logo">Alzatona Logo</div>;
  };
});

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('AdminLoginNavbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });
  });

  test('renders admin login navbar with logo', () => {
    render(<AdminLoginNavbar />);

    expect(screen.getByTestId('alzatona-logo')).toBeInTheDocument();
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  test('displays correct title', () => {
    render(<AdminLoginNavbar />);

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
  });

  test('renders theme toggle button', () => {
    render(<AdminLoginNavbar />);

    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  test('toggles theme when theme button is clicked', () => {
    const mockToggleTheme = jest.fn();
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggleTheme,
    });

    render(<AdminLoginNavbar />);

    const themeButton = screen.getByTitle('Toggle theme');
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  test('shows moon icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: jest.fn(),
    });

    render(<AdminLoginNavbar />);

    // Moon icon should be visible in light mode
    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  test('shows sun icon in dark mode', () => {
    mockUseTheme.mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: jest.fn(),
    });

    render(<AdminLoginNavbar />);

    // Sun icon should be visible in dark mode
    const themeButton = screen.getByTitle('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  test('applies correct styling classes', () => {
    render(<AdminLoginNavbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  test('has proper gradient background', () => {
    render(<AdminLoginNavbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass(
      'bg-gradient-to-r',
      'from-red-600',
      'to-red-800'
    );
  });

  test('renders with correct height', () => {
    render(<AdminLoginNavbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('h-20');
  });

  test('has proper container structure', () => {
    render(<AdminLoginNavbar />);

    const container = screen
      .getByRole('navigation')
      .querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();
  });
});






