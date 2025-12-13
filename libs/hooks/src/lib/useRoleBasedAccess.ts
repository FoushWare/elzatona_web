import { useAuth } from "@elzatona/contexts";
import { UserAuthService } from "./types/user-auth";

export function useRoleBasedAccess() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (
    requiredRole: "user" | "premium_user" | "admin" | "super_admin",
  ): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    // Use user role directly - no assertion needed since User interface already defines the correct type
    return UserAuthService.hasPermission(user.role, requiredRole);
  };

  const isUser = () => hasRole("user");
  const isPremiumUser = () => hasRole("premium_user");
  const isAdmin = () => hasRole("admin");
  const isSuperAdmin = () => hasRole("super_admin");

  const canAccess = (feature: string): boolean => {
    if (!isAuthenticated || !user) {
      return false;
    }

    // Use user role directly - no assertion needed since User interface already defines the correct type
    const userRole = user.role;

    // Define feature access rules
    const featureAccess: Record<
      string,
      "user" | "premium_user" | "admin" | "super_admin"
    > = {
      "basic-learning": "user",
      "premium-content": "premium_user",
      "admin-panel": "admin",
      "user-management": "admin",
      "system-settings": "super_admin",
      analytics: "admin",
      "content-management": "admin",
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

    // Use user role directly - no assertion needed since User interface already defines the correct type
    const _userRole = user.role;
    const features = [
      "basic-learning",
      "premium-content",
      "admin-panel",
      "user-management",
      "system-settings",
      "analytics",
      "content-management",
    ];

    return features.filter((feature) => canAccess(feature));
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
