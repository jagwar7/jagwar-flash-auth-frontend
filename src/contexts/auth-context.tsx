'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback, useEffect, useContext } from 'react';
import { Storage } from '@/Storage/Storage';
import { jwtDecode } from 'jwt-decode';
import { HandleTokenExpiry } from '@/utils/utility';

type User = {
  id: string;
  name: string;
  email: string;
  authType: 'local' | 'google';
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: ()=> void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@flashauth.com',
  authType: 'local'
};

export const useAuth = ()=>{
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}



export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  // INITIAL CHECKING IF AUTHENTICATED====================================
  useEffect(() => {
    if(HandleTokenExpiry() === false) Storage.RemoveToken();
    const token = Storage.GetToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          authType: decoded.authType
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        Storage.RemoveToken();
      }
    }
  }, []);
  //----------------------------------------------------------------------





  // RENDER COMPONENTS====================================================
  const login = useCallback(() => {
    const token = Storage.GetToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          authType: decoded.authType
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Login failed to decode token");
      }
    }
  }, []);
  //-----------------------------------------------------------------------



  // LOGOUT AND REMOVE TOKEN===============================================
  const logout = useCallback(() => {
    Storage.RemoveToken();
    setIsLoggedIn(false);
    setUser(null);
  }, []);
  //-----------------------------------------------------------------------


  const value = {user, isLoggedIn, logout, login};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}