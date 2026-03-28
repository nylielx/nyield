/**
 * =============================================================================
 * AUTH CONTEXT — Global Authentication State Manager
 * =============================================================================
 *
 * PURPOSE:
 * React Context that provides authentication state to the entire app.
 * Any component can check if a user is logged in, get user details,
 * or trigger login/logout/register actions.
 *
 * HOW CONTEXT WORKS:
 * 1. AuthProvider wraps the app (in App.tsx)
 * 2. Any child component calls useAuth() to access auth state
 * 3. When state changes (login/logout), all consumers re-render
 *
 * WHY NOT JUST USE LOCALSTORAGE?
 * localStorage doesn't trigger re-renders. Context ensures the UI
 * updates immediately when auth state changes.
 *
 * PERSISTENCE:
 * Currently uses localStorage to survive page refreshes.
 * When you connect a real backend, replace this with token-based
 * session management (JWT in httpOnly cookies is most secure).
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

/* --------------------------------------------------------------------------
 * Context Type Definition
 * Describes everything the auth context provides to consumers
 * -------------------------------------------------------------------------- */
interface AuthContextType {
  /** The currently authenticated user, or null if logged out */
  user: AuthUser | null;
  /** True while an auth operation is in progress */
  isLoading: boolean;
  /** Register a new user account */
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  /** Log in with email and password */
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  /** Log the current user out */
  logout: () => Promise<void>;
  /** Send a password reset email */
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

/**
 * Create the context with undefined default.
 * We check for undefined in useAuth() to catch usage outside the provider.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* --------------------------------------------------------------------------
 * LOCAL STORAGE HELPERS
 * ⚠️ Replace these with secure token storage when connecting a real backend
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
 * Wraps the app and provides auth state + actions to all children
 * -------------------------------------------------------------------------- */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * On mount, check if there's a saved session.
   * With a real backend, you'd validate the token here:
   *   const response = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
   */
  useEffect(() => {
    const savedUser = getUserFromStorage();
    if (savedUser) setUser(savedUser);
    setIsLoading(false);
  }, []);

  /** Register handler — calls the service, then saves the user */
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

  /** Login handler */
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

  /** Logout handler */
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

  /** Password reset handler */
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

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

/* --------------------------------------------------------------------------
 * useAuth HOOK
 * Convenient way for components to access auth state and actions.
 *
 * Usage:
 *   const { user, login, logout } = useAuth();
 *   if (user) console.log('Logged in as', user.fullName);
 * -------------------------------------------------------------------------- */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider. Wrap your app in <AuthProvider>.");
  }
  return context;
}
