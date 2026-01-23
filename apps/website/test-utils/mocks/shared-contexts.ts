// Shared contexts mock used by tests in the website app
// Export commonly-used hooks as jest.fn so tests can spy/mockReturnValue
export const useUserType = jest.fn(() => ({
  userType: null,
  setUserType: jest.fn(),
}));

export const useAuth = jest.fn(() => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
}));

export const useUserPreferences = jest.fn(() => ({
  theme: "light",
  notifications: false,
  emailUpdates: false,
}));

export default {
  useUserType,
  useAuth,
  useUserPreferences,
};
