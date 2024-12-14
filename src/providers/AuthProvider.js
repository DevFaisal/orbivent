import { AuthProvider } from "@/context/AuthContext";

export const AuthenticationProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
