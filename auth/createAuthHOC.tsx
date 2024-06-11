// auth/hoc.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context";

const createAuthHOC = (
  WrappedComponent: React.ComponentType,
  options: {
    requiresAuth: boolean;
    requiredRole?: string | string[];
    redirectPath?: string;
  },
) => {
  const {
    requiresAuth,
    requiredRole,
    redirectPath: customRedirectPath,
  } = options;

  const ComponentWithAuth = (props: any) => {
    const {
      isAuthenticated,
      role,
      isLoading,
      redirectPath,
      noAccessRedirectPath,
      noAuthRedirectPath,
    } = useAuth();
    const router = useRouter();
    const finalRedirectPath =
      customRedirectPath || (requiresAuth ? redirectPath : noAuthRedirectPath);
    const finalNoAccessRedirectPath = noAccessRedirectPath || finalRedirectPath;

    useEffect(() => {
      if (!isLoading) {
        if (requiresAuth && !isAuthenticated) {
          router.push(finalRedirectPath);
        } else if (!requiresAuth && isAuthenticated) {
          router.push(finalRedirectPath);
        } else if (
          requiresAuth &&
          requiredRole &&
          !checkRole(role, requiredRole)
        ) {
          router.push(finalNoAccessRedirectPath);
        }
      }
    }, [
      isAuthenticated,
      role,
      isLoading,
      router,
      requiresAuth,
      finalRedirectPath,
      finalNoAccessRedirectPath,
      requiredRole,
    ]);

    if (
      isLoading ||
      (requiresAuth && !isAuthenticated) ||
      (!requiresAuth && isAuthenticated) ||
      (requiresAuth && requiredRole && !checkRole(role, requiredRole))
    ) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `With${requiresAuth ? "Auth" : "NoAuth"}(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};

const checkRole = (
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

const getDisplayName = (WrappedComponent: React.ComponentType): string => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default createAuthHOC;
