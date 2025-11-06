'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback } from 'react';

type User = {
  name: string;
  email: string;
  role: 'User' | 'Admin';
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  name: 'Demo User',
  email: 'demo@flashauth.com',
  role: 'Admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ isLoggedIn, user, login, logout }),
    [isLoggedIn, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
