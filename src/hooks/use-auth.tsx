"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types';
import { fetchWithAuth } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = fetchWithAuth.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetchWithAuth.get<{ user: User }>('/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      fetchWithAuth.clearToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth.post<AuthResponse>('/auth/login', credentials);
      const { user, token } = response.data;
      
      fetchWithAuth.setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      const response = await fetchWithAuth.post<AuthResponse>('/auth/register', credentials);
      const { user, token } = response.data;
      
      fetchWithAuth.setToken(token);
      setUser(user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetchWithAuth.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      fetchWithAuth.clearToken();
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      checkAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
