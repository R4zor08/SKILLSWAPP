import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const stored = localStorage.getItem('token');
    if (!stored) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await authService.me();
      setUser(data.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(async (payload) => {
    const { data } = await authService.login(payload);
    const t = data.data.token;
    localStorage.setItem('token', t);
    setToken(t);
    setUser(data.data.user);
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    const { data } = await authService.register(payload);
    const t = data.data.token;
    localStorage.setItem('token', t);
    setToken(t);
    setUser(data.data.user);
    return data;
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
