'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    // Load token from localStorage on mount
    const token = localStorage.getItem('userToken');
    if (token) {
      setAuth({ token });
      // optionally, fetch user info here
    }
  }, []);

  // Add login, logout functions if needed

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
