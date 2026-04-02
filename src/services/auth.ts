/**
 * =============================================================================
 * AUTH SERVICE — Authentication API Layer
 * =============================================================================
 *
 * MOCK USER REGISTRY:
 *   Default: hassan@nyield.com / 123
 *   Users can register and are persisted in localStorage.
 *
 * HOW TO CONNECT YOUR BACKEND:
 * Replace the placeholder logic in each function with real API calls.
 * =============================================================================
 */

import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

/* --------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * -------------------------------------------------------------------------- */

export type UserRole = "standard" | "business";

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatar: AvatarOption;
  role: UserRole;
  memberSince: string; // ISO date string
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  message: string;
}

/* --------------------------------------------------------------------------
 * LOCAL USER REGISTRY — Persisted in localStorage
 * -------------------------------------------------------------------------- */
const USERS_STORAGE_KEY = "nyield_user_registry";

interface StoredUser extends AuthUser {
  password: string;
}

function getRegistry(): StoredUser[] {
  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) return getDefaultRegistry();
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return getDefaultRegistry();
  }
}

function saveRegistry(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getDefaultRegistry(): StoredUser[] {
  const defaults: StoredUser[] = [
    {
      id: "user-001",
      email: "hassan@nyield.com",
      password: "123",
      fullName: "Hassan",
      avatar: "dragon",
      role: "admin",
      memberSince: "2025-09-14",
    },
    {
      id: "user-002",
      email: "demo@nyield.com",
      password: "demo",
      fullName: "Demo User",
      avatar: "fox",
      role: "user",
      memberSince: "2026-01-10",
    },
  ];
  saveRegistry(defaults);
  return defaults;
}

/* --------------------------------------------------------------------------
 * REGISTER USER
 * -------------------------------------------------------------------------- */
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const registry = getRegistry();
  const exists = registry.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  if (exists) {
    return { success: false, message: "An account with this email already exists." };
  }

  const newUser: StoredUser = {
    id: `user-${Date.now()}`,
    email: data.email.toLowerCase(),
    password: data.password,
    fullName: data.fullName,
    avatar: "man",
    role: "user",
    memberSince: new Date().toISOString().split("T")[0],
  };

  registry.push(newUser);
  saveRegistry(registry);

  const { password: _, ...authUser } = newUser;
  return {
    success: true,
    user: authUser,
    message: `Welcome to nYield, ${data.fullName}!`,
  };
}

/* --------------------------------------------------------------------------
 * LOGIN USER — Validates against persistent registry
 * -------------------------------------------------------------------------- */
export async function loginUser(data: LoginData): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const registry = getRegistry();
  const found = registry.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password
  );

  if (found) {
    const { password: _, ...authUser } = found;
    return {
      success: true,
      user: authUser,
      message: `Welcome back, ${found.fullName}!`,
    };
  }

  return {
    success: false,
    message: "Invalid email or password.",
  };
}

/* --------------------------------------------------------------------------
 * FORGOT PASSWORD
 * -------------------------------------------------------------------------- */
export async function forgotPassword(email: string): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "If an account exists with this email, a reset link has been sent.",
  };
}

/* --------------------------------------------------------------------------
 * LOGOUT USER
 * -------------------------------------------------------------------------- */
export async function logoutUser(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
}

/* --------------------------------------------------------------------------
 * UPDATE USER IN REGISTRY — Syncs profile changes back to storage
 * -------------------------------------------------------------------------- */
export function updateUserInRegistry(user: AuthUser): void {
  const registry = getRegistry();
  const idx = registry.findIndex((u) => u.id === user.id);
  if (idx !== -1) {
    registry[idx] = { ...registry[idx], ...user, password: registry[idx].password };
    saveRegistry(registry);
  }
}
