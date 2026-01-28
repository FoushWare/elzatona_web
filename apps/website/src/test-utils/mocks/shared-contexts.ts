// Minimal test mocks for shared contexts (used by many tests)
export const useUserType = () => ({
  userType: "guided",
  setUserType: () => {},
});
export const useMobileMenu = () => ({ setIsMobileMenuOpen: () => {} });
export const useTheme = () => ({ isDarkMode: false, toggleDarkMode: () => {} });
export const useAuth = () => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  signOut: async () => {},
});
export const useAdminAuth = () => ({
  isAuthenticated: true,
  isLoading: false,
  user: { id: "1", email: "admin@example.com", role: "super_admin" },
  logout: () => {},
});

const sharedContextsMock = {
  useUserType,
  useMobileMenu,
  useTheme,
  useAuth,
  useAdminAuth,
};

export default sharedContextsMock;
