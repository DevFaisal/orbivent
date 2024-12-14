"use client";

import { authToken } from "@/actions/user";
import React, { createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const isValidToken = () => {
      authToken().then((res) => {
        if (res?.success) {
          setUser(JSON.parse(res.user));
          setIsAuthenticated(true);
        }
      });
    };
    isValidToken();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
