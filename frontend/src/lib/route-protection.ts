/**
 * Route Protection Utilities
 * Centralized role-based access control helpers for the frontend
 */

export type UserRole = "CLIENT" | "PRACTITIONER" | "ADMIN";

/**
 * Map user roles to their default landing page
 */
export const roleDefaultPaths: Record<UserRole, string> = {
  CLIENT: "/compte",
  PRACTITIONER: "/praticien",
  ADMIN: "/admin",
};

/**
 * Protected route path patterns by role
 */
export const protectedPaths: Record<UserRole, string[]> = {
  CLIENT: ["/compte"],
  PRACTITIONER: ["/praticien", "/praticien/*"],
  ADMIN: ["/admin", "/admin/*"],
};

/**
 * Check if a user has a specific role
 */
export const hasRole = (userRole: string | undefined, requiredRole: UserRole): boolean => {
  return userRole === requiredRole;
};

/**
 * Check if a user has any of the required roles
 */
export const hasAnyRole = (userRole: string | undefined, requiredRoles: UserRole[]): boolean => {
  return requiredRoles.includes(userRole as UserRole);
};

/**
 * Check if a path is accessible to a given role
 * @returns true if the role can access the path, false otherwise
 */
export const canAccessPath = (path: string, userRole: string | undefined): boolean => {
  if (!userRole) return false;

  const role = userRole as UserRole;
  const allowedPaths = protectedPaths[role];

  // Simple prefix matching and wildcard support
  return allowedPaths.some((allowedPath) => {
    if (allowedPath.endsWith("/*")) {
      const prefix = allowedPath.slice(0, -2);
      return path === prefix || path.startsWith(prefix + "/");
    }
    return path === allowedPath;
  });
};

/**
 * Get the appropriate redirect destination for a role
 * If the requested path is accessible to the user's role, return it.
 * Otherwise, return the role's default path.
 */
export const getRedirectPath = (
  userRole: string | undefined,
  requestedPath?: string,
): string => {
  if (!userRole) {
    return "/connexion";
  }

  const role = userRole as UserRole;

  // If a specific path was requested and it's accessible, go there
  if (requestedPath && canAccessPath(requestedPath, role)) {
    return requestedPath;
  }

  // Otherwise, go to the role's default page
  return roleDefaultPaths[role];
};

/**
 * Determine if a route requires authentication
 */
export const requiresAuth = (path: string): boolean => {
  // Public routes that don't require auth
  const publicRoutes = ["/", "/connexion", "/soins", "/reservation", "/paiement", "/confirmation"];
  return !publicRoutes.some((route) => path === route || path.startsWith(route));
};

/**
 * Determine if a route requires a specific role
 */
export const getRequiredRole = (path: string): UserRole | null => {
  if (path.startsWith("/admin")) return "ADMIN";
  if (path.startsWith("/praticien")) return "PRACTITIONER";
  if (path === "/compte") return "CLIENT";
  return null;
};
