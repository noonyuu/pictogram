import { useState } from "react";
import { AuthContext } from "../contexts/authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, login, logout, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
