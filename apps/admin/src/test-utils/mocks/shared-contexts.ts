// Minimal test mocks for shared contexts (admin app)
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

export default {
  useUserType,
  useMobileMenu,
  useTheme,
  useAuth,
const sharedContextsMock = {
  useUserType,
  useMobileMenu,
  useTheme,
  useAuth,
  useAdminAuth,
};

export default sharedContextsMock;
