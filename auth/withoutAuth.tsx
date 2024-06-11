// auth/withoutAuth.tsx
import createAuthHOC from "./createAuthHOC";

const withoutAuth = (
  WrappedComponent: React.ComponentType,
  redirectPath?: string,
) => {
  return createAuthHOC(WrappedComponent, { requiresAuth: false, redirectPath });
};

export default withoutAuth;
