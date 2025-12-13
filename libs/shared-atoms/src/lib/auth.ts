import { atom } from "jotai";

// Supabase user atom
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseUserAtom = atom<any | null>(null);

// Auth loading state
export const authLoadingAtom = atom(false);

// Auth error state
export const authErrorAtom = atom<string | null>(null);

// User profile type
type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
  preferences?: {
    theme: "light" | "dark";
    language: "en" | "ar";
    notifications: boolean;
  };
};

// User profile atom (extended user data)
export const userProfileAtom = atom<UserProfile | null>(null);

// Auth status atom
export const isAuthenticatedAtom = atom((get) => {
  const user = get(supabaseUserAtom);
  return user !== null;
});

// Sign in atom
export const signInAtom = atom(
  null,
  async (
    get,
    set,
    { email, password }: { email: string; password: string },
  ) => {
    set(authLoadingAtom, true);
    set(authErrorAtom, null);

    try {
      // This will be implemented with actual Firebase auth
      // For now, just a placeholder
      console.log("Sign in with:", { email, password });
    } catch (error) {
      set(
        authErrorAtom,
        error instanceof Error ? error.message : "Sign in failed",
      );
    } finally {
      set(authLoadingAtom, false);
    }
  },
);

// Sign out atom
export const signOutAtom = atom(null, async (get, set) => {
  set(authLoadingAtom, true);
  set(authErrorAtom, null);

  try {
    // This will be implemented with actual Firebase auth
    // For now, just a placeholder
    console.log("Sign out");
    set(supabaseUserAtom, null);
    set(userProfileAtom, null);
  } catch (error) {
    set(
      authErrorAtom,
      error instanceof Error ? error.message : "Sign out failed",
    );
  } finally {
    set(authLoadingAtom, false);
  }
});

// Update user profile atom
export const updateUserProfileAtom = atom(
  null,
  async (get, set, updates: Partial<UserProfile>) => {
    const currentProfile = get(userProfileAtom);
    if (currentProfile) {
      set(userProfileAtom, { ...currentProfile, ...updates });
    }
  },
);
