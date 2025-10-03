/**
 * Utility function to determine the appropriate redirect URL after authentication
 * based on the user's stored learning mode preference
 */
export function getAuthRedirectUrl(): string {
  if (typeof window === 'undefined') {
    return '/'; // Default fallback for SSR
  }

  // Get the stored learning mode from localStorage
  const userType = localStorage.getItem('userType') as 'guided' | 'self-directed' | null;
  
  // Redirect based on the stored learning mode
  switch (userType) {
    case 'guided':
      return '/features/learning/guided-learning';
    case 'self-directed':
      return '/features/learning/free-style-roadmap';
    default:
      // If no learning mode is stored, redirect to learning mode selection
      return '/features/learning/learning-mode';
  }
}

/**
 * Utility function to store the intended redirect URL before authentication
 * This can be used to redirect users back to where they were before login
 */
export function setIntendedRedirectUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('intendedRedirectUrl', url);
  }
}

/**
 * Utility function to get and clear the intended redirect URL
 * This should be called after successful authentication
 */
export function getAndClearIntendedRedirectUrl(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const intendedUrl = localStorage.getItem('intendedRedirectUrl');
  if (intendedUrl) {
    localStorage.removeItem('intendedRedirectUrl');
    return intendedUrl;
  }
  
  return null;
}
