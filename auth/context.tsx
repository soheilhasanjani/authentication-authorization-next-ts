// auth/context.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContextType, AuthProviderProps } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  redirectPath,
  noAccessRedirectPath,
}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsAuthenticated(true);
      const storedRole = Cookies.get("role");
      if (storedRole) {
        setRole(storedRole.includes(",") ? storedRole.split(",") : storedRole);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string, role?: string | string[]) => {
    try {
      Cookies.set("authToken", token, { expires: 7 });
      if (role) {
        Cookies.set("role", Array.isArray(role) ? role.join(",") : role, {
          expires: 7,
        });
        setRole(role);
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid login data");
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        isLoading,
        login,
        logout,
        redirectPath,
        noAccessRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
