import { useContext } from "react";
import { AuthContext } from "@/feature/admin/contexts/authContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
