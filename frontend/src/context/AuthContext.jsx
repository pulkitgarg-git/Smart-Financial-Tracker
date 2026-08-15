import { createContext, useContext, useMemo, useState } from 'react';
import { api, clearToken, getToken, setToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken);

  const login = async (email, password) => {
    const { token: jwt } = await api.login({ email, password });
    setToken(jwt);
    setTokenState(jwt);
  };

  const signUp = async (fullName, email, password) => {
    await api.signUp({ fullName, email, password });
    await login(email, password);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      signUp,
      logout,
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
