// auth/withAuth.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context";
import { checkRole } from "./utils";

const withAuth = (
  WrappedComponent: React.ComponentType,
  requiredRole?: string | string[],
) => {
  const ComponentWithAuth = (props: any) => {
    const {
      isAuthenticated,
      role,
      isLoading,
      redirectPath,
      noAccessRedirectPath,
    } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push(redirectPath);
        } else if (
          noAccessRedirectPath &&
          requiredRole &&
          !checkRole(role, requiredRole)
        ) {
          router.push(noAccessRedirectPath);
        }
      }
    }, [
      isAuthenticated,
      role,
      isLoading,
      router,
      redirectPath,
      noAccessRedirectPath,
    ]);

    if (
      isLoading ||
      !isAuthenticated ||
      (noAccessRedirectPath && requiredRole && !checkRole(role, requiredRole))
    ) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  // Set the display name for debugging purposes
  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return ComponentWithAuth;
};

const getDisplayName = (WrappedComponent: React.ComponentType): string => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withAuth;
