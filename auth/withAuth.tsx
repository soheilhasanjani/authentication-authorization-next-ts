// auth/withAuth.tsx
import createAuthHOC from "./createAuthHOC";

const withAuth = (
  WrappedComponent: React.ComponentType,
  requiredRole?: string | string[],
  redirectPath?: string,
) => {
  return createAuthHOC(WrappedComponent, {
    requiresAuth: true,
    requiredRole,
    redirectPath,
  });
};

export default withAuth;
