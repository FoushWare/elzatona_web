import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  supabaseUserAtom,
  authLoadingAtom,
  authErrorAtom,
  userProfileAtom,
  isAuthenticatedAtom,
  signInAtom,
  signOutAtom,
  updateUserProfileAtom,
} from '@elzatona/shared-atoms';

export function useAuth() {
  const [user, setUser] = useAtom(supabaseUserAtom);
  const [loading, setLoading] = useAtom(authLoadingAtom);
  const [error, setError] = useAtom(authErrorAtom);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const signIn = useSetAtom(signInAtom);
  const signOut = useSetAtom(signOutAtom);
  const updateUserProfile = useSetAtom(updateUserProfileAtom);

  return {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    userProfile,
    setUserProfile,
    isAuthenticated,
    signIn,
    signOut,
    updateUserProfile,
  };
}
