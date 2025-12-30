import React from "react";

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => children;

export const useAdminAuth = jest.fn(() => ({
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  user: null,
  error: null,
}));

export const AdminAuthContext = React.createContext(undefined);
