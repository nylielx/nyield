/**
 * =============================================================================
 * AUTH CONTEXT — Global Authentication State Manager
 * =============================================================================
 *
 * Mock credentials: hassan@nyield.com / 123
 * Persists user in localStorage across page refreshes.
 * =============================================================================
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  AuthUser,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  RegisterData,
  LoginData,
} from "@/services/auth";
import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

/* --------------------------------------------------------------------------
 * Context Type Definition
 * -------------------------------------------------------------------------- */
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<Pick<AuthUser, "fullName" | "avatar">>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* --------------------------------------------------------------------------
 * LOCAL STORAGE HELPERS
 * -------------------------------------------------------------------------- */
const STORAGE_KEY = "nyield_auth_user";

function saveUserToStorage(user: AuthUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function getUserFromStorage(): AuthUser | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

function clearUserFromStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/* --------------------------------------------------------------------------
 * AUTH PROVIDER COMPONENT
 * -------------------------------------------------------------------------- */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) setUser(savedUser);
    setIsLoading(false);
  }, []);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      if (response.success && response.user) {
        setUser(response.user);
        saveUserToStorage(response.user);
      }
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success && response.user) {
        setUser(response.user);
        saveUserToStorage(response.user);
      }
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setUser(null);
      clearUserFromStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      return { success: response.success, message: response.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Password reset failed";
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  /** Update user profile fields locally (name, avatar) */
  const updateProfile = (updates: Partial<Pick<AuthUser, "fullName" | "avatar">>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    saveUserToStorage(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

/* --------------------------------------------------------------------------
 * useAuth HOOK
 * -------------------------------------------------------------------------- */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider. Wrap your app in <AuthProvider>.");
  }
  return context;
}
