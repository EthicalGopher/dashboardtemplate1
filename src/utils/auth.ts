import { useState, useEffect } from "react";

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  avatar?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  user: User;
}

const AUTH_KEY = "dashboard-template-auth";

export const saveSession = (session: AuthSession) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("auth-change"));
};

export const getSession = (): AuthSession | null => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  try {
    return JSON.parse(session);
  } catch (e) {
    console.error("Failed to parse session from localStorage", e);
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("auth-change"));
};

export const isAuthenticated = (): boolean => {
  return !!getSession();
};

export const useAuth = () => {
  const [session, setSession] = useState<AuthSession | null>(getSession());

  useEffect(() => {
    const handleAuthChange = () => {
      setSession(getSession());
    };

    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  return {
    session,
    user: session?.user ?? null,
    userId: session?.user?.id ?? null,
    role: session?.user?.role ?? null,
    isAuthenticated: !!session,
    signOut: clearSession,
  };
};
