// auth/types.ts
export interface AuthContextType {
  isAuthenticated: boolean;
  role: string | string[] | null;
  isLoading: boolean;
  login: (token: string, role?: string | string[]) => Promise<void>;
  logout: () => void;
  redirectPath: string;
  noAccessRedirectPath?: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  redirectPath: string;
  noAccessRedirectPath?: string;
}
