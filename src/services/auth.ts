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

/** Application status for seller conversion flow */
export type SellerApplicationStatus = "none" | "pending" | "approved" | "rejected";

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
  /** Canonical username for public profile URL (/user/:username) */
  username: string;
  avatar: AvatarOption;
  avatarUrl?: string;
  role: UserRole;
  memberSince: string;
  /** Business slug for /business/:slug (only set for business accounts) */
  businessSlug?: string;
  /** Business display name (only set for business accounts) */
  businessName?: string;
  /** Seller application status for standard users */
  sellerApplicationStatus: SellerApplicationStatus;
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
    const parsed = JSON.parse(raw) as StoredUser[];
    // Migration: ensure all users have username + sellerApplicationStatus
    let needsSave = false;
    for (const u of parsed) {
      if (!u.username) {
        u.username = deriveUsername(u.fullName, u.id);
        needsSave = true;
      }
      if (!u.sellerApplicationStatus) {
        u.sellerApplicationStatus = "none";
        needsSave = true;
      }
    }
    if (needsSave) saveRegistry(parsed);
    return parsed;
  } catch {
    return getDefaultRegistry();
  }
}

function saveRegistry(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

/** Derive a URL-safe username from full name + id suffix for uniqueness */
function deriveUsername(fullName: string, id: string): string {
  const base = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const suffix = id.replace("user-", "").slice(-4);
  return base ? `${base}-${suffix}` : `user-${suffix}`;
}

function getDefaultRegistry(): StoredUser[] {
  const defaults: StoredUser[] = [
    {
      id: "user-001",
      email: "hassan@nyield.com",
      password: "123",
      fullName: "Hassan",
      username: "hassan",
      avatar: "dragon",
      role: "standard",
      memberSince: "2025-09-14",
      sellerApplicationStatus: "none",
    },
    {
      id: "user-002",
      email: "demo@nyield.com",
      password: "demo",
      fullName: "Demo User",
      username: "demouser",
      avatar: "fox",
      role: "standard",
      memberSince: "2026-01-10",
      sellerApplicationStatus: "none",
    },
    {
      id: "user-003",
      email: "hassan@business.com",
      password: "123",
      fullName: "Hassan",
      username: "hassan-biz",
      avatar: "dragon",
      role: "business",
      memberSince: "2025-06-01",
      businessSlug: "probuilder-pcs",
      businessName: "ProBuilder PCs",
      sellerApplicationStatus: "approved",
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

  const id = `user-${Date.now()}`;
  const newUser: StoredUser = {
    id,
    email: data.email.toLowerCase(),
    password: data.password,
    fullName: data.fullName,
    username: deriveUsername(data.fullName, id),
    avatar: "man",
    role: "standard",
    memberSince: new Date().toISOString().split("T")[0],
    sellerApplicationStatus: "none",
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

/* --------------------------------------------------------------------------
 * SELLER APPLICATION — Submit and manage application state
 * -------------------------------------------------------------------------- */
export async function submitSellerApplication(
  userId: string,
  _data: { sellType: string; description: string }
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const registry = getRegistry();
  const idx = registry.findIndex((u) => u.id === userId);
  if (idx === -1) return { success: false, message: "User not found." };

  registry[idx].sellerApplicationStatus = "pending";
  saveRegistry(registry);

  return {
    success: true,
    message: "Application submitted! We'll review it within 24–48 hours.",
  };
}

/* --------------------------------------------------------------------------
 * LOOKUP HELPERS — Resolve users by various identifiers
 * -------------------------------------------------------------------------- */
export function getUserByUsername(username: string): Omit<StoredUser, "password"> | undefined {
  const registry = getRegistry();
  const found = registry.find((u) => u.username === username);
  if (!found) return undefined;
  const { password: _, ...user } = found;
  return user;
}

export function getUserById(id: string): Omit<StoredUser, "password"> | undefined {
  const registry = getRegistry();
  const found = registry.find((u) => u.id === id);
  if (!found) return undefined;
  const { password: _, ...user } = found;
  return user;
}

export function getBusinessBySlug(slug: string): Omit<StoredUser, "password"> | undefined {
  const registry = getRegistry();
  const found = registry.find((u) => u.role === "business" && u.businessSlug === slug);
  if (!found) return undefined;
  const { password: _, ...user } = found;
  return user;
}
