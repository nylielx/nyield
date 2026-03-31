/**
 * =============================================================================
 * AUTH SERVICE — Authentication API Layer
 * =============================================================================
 *
 * MOCK CREDENTIALS:
 *   Email: hassan@nyield.com
 *   Password: 123
 *
 * HOW TO CONNECT YOUR BACKEND:
 * Replace the placeholder logic in each function with real API calls.
 * =============================================================================
 */

import { userProfileMock } from "@/data/temp/8-user-profile-mock";
import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

/* --------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * -------------------------------------------------------------------------- */

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
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  message: string;
}

/* --------------------------------------------------------------------------
 * MOCK CREDENTIALS — Only this account can log in
 * -------------------------------------------------------------------------- */
const MOCK_EMAIL = "hassan@nyield.com";
const MOCK_PASSWORD = "123";

/* --------------------------------------------------------------------------
 * REGISTER USER
 * -------------------------------------------------------------------------- */
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: false,
    message: "Registration is disabled in mock mode. Use hassan@nyield.com / 123 to sign in.",
  };
}

/* --------------------------------------------------------------------------
 * LOGIN USER — Validates against mock credentials only
 * -------------------------------------------------------------------------- */
export async function loginUser(data: LoginData): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
    const mockUser: AuthUser = {
      id: userProfileMock.id,
      email: userProfileMock.email,
      fullName: userProfileMock.fullName,
      avatar: userProfileMock.avatar,
    };

    return {
      success: true,
      user: mockUser,
      message: "Welcome back, Hassan!",
    };
  }

  return {
    success: false,
    message: "Invalid email or password. Use hassan@nyield.com / 123",
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
