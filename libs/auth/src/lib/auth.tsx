// Auth library exports
export interface User {
  id: string;
  email: string;
  role: 'user' | 'premium_user' | 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  // This will be implemented with Supabase auth
  throw new Error('useAuth must be used within an AuthProvider');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // This will be implemented with Supabase auth
  return <>{children}</>;
};
