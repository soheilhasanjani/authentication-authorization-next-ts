// auth/context.tsx
import React, { createContext, useReducer, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContextType, AuthProviderProps } from "./types";
import { authReducer, initialState } from "./reducer";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  redirectPath,
  noAccessRedirectPath,
  noAuthRedirectPath,
}: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const storedRole = Cookies.get("role");
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          role: storedRole
            ? storedRole.includes(",")
              ? storedRole.split(",")
              : storedRole
            : null,
        },
      });
    }
  }, []);

  const login = async (token: string, role?: string | string[]) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      Cookies.set("authToken", token, { expires: 7 });
      if (role) {
        Cookies.set("role", Array.isArray(role) ? role.join(",") : role, {
          expires: 7,
        });
      }
      dispatch({ type: LOGIN_SUCCESS, payload: { role } });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw new Error("Invalid login data");
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("role");
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        redirectPath,
        noAccessRedirectPath,
        noAuthRedirectPath,
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
