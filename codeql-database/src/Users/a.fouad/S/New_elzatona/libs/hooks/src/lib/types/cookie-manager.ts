// Type definitions for cookie-manager
// These types are used by shared-hooks but the service is app-specific

export const cookieManager = {
  async getCookie(_name: string): Promise<string | null> {
    return null;
  },
  async setCookie(
    _name: string,
    _value: string,
    _options?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  },
  async retryAuthCookie(_firebaseUser: {
    getIdToken: () => Promise<string>;
  }): Promise<boolean> {
    return false;
  },
};
