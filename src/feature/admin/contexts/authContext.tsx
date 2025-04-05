import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  setIsAdmin: () => {},
});
