export const checkRole = (
  userRole: string | string[] | null,
  requiredRole: string | string[],
): boolean => {
  if (Array.isArray(requiredRole)) {
    return Array.isArray(userRole)
      ? requiredRole.some((role) => userRole.includes(role))
      : requiredRole.includes(userRole as string);
  }
  return Array.isArray(userRole)
    ? userRole.includes(requiredRole)
    : userRole === requiredRole;
};
