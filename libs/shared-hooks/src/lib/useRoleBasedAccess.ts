import { useAuth } from '@elzatona/shared-contexts';
import { UserAuthService } from './types/user-auth';

export function useRoleBasedAccess() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (
    requiredRole: 'user' | 'premium_user' | 'admin' | 'super_admin'
  ): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    // Cast user role to the expected type
    const userRole = user.role as
      | 'user'
      | 'premium_user'
      | 'admin'
      | 'super_admin';
    return UserAuthService.hasPermission(userRole, requiredRole);
  };

  const isUser = () => hasRole('user');
  const isPremiumUser = () => hasRole('premium_user');
  const isAdmin = () => hasRole('admin');
  const isSuperAdmin = () => hasRole('super_admin');

  const canAccess = (feature: string): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    const userRole = user.role as
      | 'user'
      | 'premium_user'
      | 'admin'
      | 'super_admin';

    // Define feature access rules
    const featureAccess: Record<
      string,
      'user' | 'premium_user' | 'admin' | 'super_admin'
    > = {
      'basic-learning': 'user',
      'premium-content': 'premium_user',
      'admin-panel': 'admin',
      'user-management': 'admin',
      'system-settings': 'super_admin',
      analytics: 'admin',
      'content-management': 'admin',
    };

    const requiredRole = featureAccess[feature];
    if (!requiredRole) {
      return false; // Unknown feature
    }

    return UserAuthService.hasPermission(userRole, requiredRole);
  };

  const getAccessibleFeatures = (): string[] => {
    if (!isAuthenticated || !user) {
      return [];
    }

    const userRole = user.role as
      | 'user'
      | 'premium_user'
      | 'admin'
      | 'super_admin';
    const features = [
      'basic-learning',
      'premium-content',
      'admin-panel',
      'user-management',
      'system-settings',
      'analytics',
      'content-management',
    ];

    return features.filter(feature => canAccess(feature));
  };

  return {
    hasRole,
    isUser,
    isPremiumUser,
    isAdmin,
    isSuperAdmin,
    canAccess,
    getAccessibleFeatures,
    userRole: user?.role,
    isAuthenticated,
  };
}
