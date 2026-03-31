/**
 * =============================================================================
 * USER PROFILE MOCK DATA
 * =============================================================================
 * Contains the default mock user profile for the persistent auth system.
 * The mock login credentials are: hassan@nyield.com / 123
 * =============================================================================
 */

export type AvatarOption = "man" | "woman" | "dragon" | "fox" | "lion";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar: AvatarOption;
  memberSince: string;
}

/** The single mock user — used by the auth service for login validation */
export const userProfileMock: UserProfile = {
  id: "user-001",
  fullName: "Hassan",
  email: "hassan@nyield.com",
  avatar: "dragon",
  memberSince: "2025-09-14",
};

/** All available avatar options with labels */
export const avatarOptions: { value: AvatarOption; label: string; emoji: string }[] = [
  { value: "man", label: "Man", emoji: "👨" },
  { value: "woman", label: "Woman", emoji: "👩" },
  { value: "dragon", label: "Dragon", emoji: "🐉" },
  { value: "fox", label: "Fox", emoji: "🦊" },
  { value: "lion", label: "Lion", emoji: "🦁" },
];
