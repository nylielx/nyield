/**
 * =============================================================================
 * AUTH SERVICE — Authentication API Layer
 * =============================================================================
 *
 * PURPOSE:
 * This file acts as the single point of contact between your frontend
 * and your backend authentication system. All auth-related API calls
 * go through here.
 *
 * WHY A SERVICE LAYER?
 * By abstracting auth logic into a service, you can:
 * 1. Swap backends easily (Firebase → custom API → Supabase)
 * 2. Keep components clean — they just call functions
 * 3. Centralize error handling and data transformation
 *
 * HOW TO CONNECT YOUR BACKEND:
 * Replace the placeholder logic in each function with real API calls.
 * For example, if using a REST API:
 *   const response = await fetch('https://your-api.com/auth/register', { ... })
 *
 * If using Firebase:
 *   import { createUserWithEmailAndPassword } from 'firebase/auth';
 *   const result = await createUserWithEmailAndPassword(auth, email, password);
 *
 * If using Supabase:
 *   const { data, error } = await supabase.auth.signUp({ email, password });
 * =============================================================================
 */

/* --------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * These interfaces define the shape of data flowing through the auth system.
 * Your backend responses should be mapped to these types.
 * -------------------------------------------------------------------------- */

/** Data required to register a new user */
export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

/** Data required to log in an existing user */
export interface LoginData {
  email: string;
  password: string;
}

/** Standardized user object returned after successful auth */
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

/** Standardized response from all auth operations */
export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  message: string;
}

/* --------------------------------------------------------------------------
 * REGISTER USER
 * Called when a new user submits the sign-up form.
 *
 * REPLACE THIS with your actual backend call. The current implementation
 * simulates a network request with a 1-second delay.
 * -------------------------------------------------------------------------- */
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  /**
   * ⚠️ PLACEHOLDER — Replace with your backend API call
   *
   * Example with fetch():
   *   const response = await fetch('/api/auth/register', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(data),
   *   });
   *   const result = await response.json();
   *   if (!response.ok) throw new Error(result.message);
   *   return { success: true, user: result.user, message: 'Account created!' };
   */

  // Simulate network delay (remove this when connecting real backend)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful registration
  // In production, the backend would create the user and return their data
  const mockUser: AuthUser = {
    id: crypto.randomUUID(),   // Backend would generate a real ID
    email: data.email,
    fullName: data.fullName,
  };

  return {
    success: true,
    user: mockUser,
    message: "Account created successfully! Welcome to nYield.",
  };
}

/* --------------------------------------------------------------------------
 * LOGIN USER
 * Called when a user submits the sign-in form.
 *
 * REPLACE THIS with your actual backend call.
 * -------------------------------------------------------------------------- */
export async function loginUser(data: LoginData): Promise<AuthResponse> {
  /**
   * ⚠️ PLACEHOLDER — Replace with your backend API call
   *
   * Example with fetch():
   *   const response = await fetch('/api/auth/login', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify(data),
   *   });
   *   const result = await response.json();
   *   if (!response.ok) throw new Error(result.message);
   *   return { success: true, user: result.user, message: 'Logged in!' };
   */

  // Simulate network delay (remove this when connecting real backend)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful login
  const mockUser: AuthUser = {
    id: crypto.randomUUID(),
    email: data.email,
    fullName: "nYield User",  // Backend would return the real name
  };

  return {
    success: true,
    user: mockUser,
    message: "Welcome back!",
  };
}

/* --------------------------------------------------------------------------
 * FORGOT PASSWORD
 * Sends a password reset email to the user.
 *
 * REPLACE THIS with your actual backend call.
 * -------------------------------------------------------------------------- */
export async function forgotPassword(email: string): Promise<AuthResponse> {
  /**
   * ⚠️ PLACEHOLDER — Replace with your backend API call
   *
   * Example:
   *   await fetch('/api/auth/forgot-password', {
   *     method: 'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body: JSON.stringify({ email }),
   *   });
   */

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "If an account exists with this email, a reset link has been sent.",
  };
}

/* --------------------------------------------------------------------------
 * LOGOUT USER
 * Clears the user session.
 *
 * REPLACE THIS with your actual backend call (clear tokens, cookies, etc.)
 * -------------------------------------------------------------------------- */
export async function logoutUser(): Promise<void> {
  /**
   * ⚠️ PLACEHOLDER — Replace with your backend logout call
   *
   * Example:
   *   await fetch('/api/auth/logout', { method: 'POST' });
   *   localStorage.removeItem('authToken');
   */

  await new Promise((resolve) => setTimeout(resolve, 300));
}
