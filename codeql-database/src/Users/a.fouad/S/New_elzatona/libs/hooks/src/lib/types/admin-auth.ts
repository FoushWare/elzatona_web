// Type definitions for admin-auth service
// These types are used by shared-hooks but the service is app-specific

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string;
  expiresAt: string;
}

export class AdminAuthService {
  static async login(_email: string, _password: string): Promise<AdminSession> {
    throw new Error("Not implemented");
  }
  static async authenticateAdmin(
    _email: string,
    _password: string,
  ): Promise<{ success: boolean; admin?: AdminSession; error?: string }> {
    throw new Error("Not implemented");
  }
  static async logout(): Promise<void> {
    throw new Error("Not implemented");
  }
  static async getSession(): Promise<AdminSession | null> {
    return null;
  }
}
