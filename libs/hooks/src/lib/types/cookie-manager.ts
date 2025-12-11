// Type definitions for cookie-manager
// These types are used by shared-hooks but the service is app-specific

export const cookieManager = {
  async getCookie(name: string): Promise<string | null> {
    return null;
  },
  async setCookie(
    name: string,
    value: string,
    options?: Record<string, unknown>,
  ): Promise<void> {
    // Stub implementation
  },
  async retryAuthCookie(firebaseUser: {
    getIdToken: () => Promise<string>;
  }): Promise<boolean> {
    return false;
  },
};
