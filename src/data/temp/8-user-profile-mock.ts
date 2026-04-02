/**
 * =============================================================================
 * USER PROFILE MOCK DATA — Categorized avatar system
 * =============================================================================
 */

export type AvatarCategory = "animals" | "male" | "female" | "mythical" | "flags";

export interface AvatarItem {
  id: string;
  category: AvatarCategory;
  emoji: string;
  label: string;
}

/** Legacy compat — now just the avatar id string */
export type AvatarOption = string;

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatar: AvatarOption;
  memberSince: string;
}

export const userProfileMock: UserProfile = {
  id: "user-001",
  fullName: "Hassan",
  email: "hassan@nyield.com",
  avatar: "dragon",
  memberSince: "2025-09-14",
};

export const avatarCategories: { key: AvatarCategory; label: string; emoji: string }[] = [
  { key: "animals", label: "Animals", emoji: "🐾" },
  { key: "male", label: "Male", emoji: "👨" },
  { key: "female", label: "Female", emoji: "👩" },
  { key: "mythical", label: "Mythical", emoji: "🐉" },
  { key: "flags", label: "Flags", emoji: "🏳️" },
];

export const avatarItems: AvatarItem[] = [
  // Animals
  { id: "lion", category: "animals", emoji: "🦁", label: "Lion" },
  { id: "tiger", category: "animals", emoji: "🐯", label: "Tiger" },
  { id: "fox", category: "animals", emoji: "🦊", label: "Fox" },
  { id: "wolf", category: "animals", emoji: "🐺", label: "Wolf" },
  { id: "bear", category: "animals", emoji: "🐻", label: "Bear" },
  { id: "cat", category: "animals", emoji: "🐱", label: "Cat" },
  { id: "dog", category: "animals", emoji: "🐶", label: "Dog" },
  { id: "eagle", category: "animals", emoji: "🦅", label: "Eagle" },
  { id: "owl", category: "animals", emoji: "🦉", label: "Owl" },
  { id: "panda", category: "animals", emoji: "🐼", label: "Panda" },

  // Male
  { id: "man", category: "male", emoji: "👨", label: "Man" },
  { id: "man-curly", category: "male", emoji: "👨‍🦱", label: "Curly" },
  { id: "man-bald", category: "male", emoji: "👨‍🦲", label: "Bald" },
  { id: "man-beard", category: "male", emoji: "🧔", label: "Beard" },
  { id: "man-dark", category: "male", emoji: "👨🏿", label: "Dark" },
  { id: "man-medium", category: "male", emoji: "👨🏽", label: "Medium" },
  { id: "man-light", category: "male", emoji: "👨🏻", label: "Light" },
  { id: "man-red", category: "male", emoji: "👨‍🦰", label: "Red Hair" },
  { id: "boy", category: "male", emoji: "👦", label: "Boy" },
  { id: "man-white", category: "male", emoji: "👨‍🦳", label: "White Hair" },

  // Female
  { id: "woman", category: "female", emoji: "👩", label: "Woman" },
  { id: "woman-curly", category: "female", emoji: "👩‍🦱", label: "Curly" },
  { id: "woman-red", category: "female", emoji: "👩‍🦰", label: "Red Hair" },
  { id: "woman-dark", category: "female", emoji: "👩🏿", label: "Dark" },
  { id: "woman-medium", category: "female", emoji: "👩🏽", label: "Medium" },
  { id: "woman-light", category: "female", emoji: "👩🏻", label: "Light" },
  { id: "woman-blonde", category: "female", emoji: "👱‍♀️", label: "Blonde" },
  { id: "woman-white", category: "female", emoji: "👩‍🦳", label: "White Hair" },
  { id: "girl", category: "female", emoji: "👧", label: "Girl" },
  { id: "woman-headscarf", category: "female", emoji: "🧕", label: "Headscarf" },

  // Mythical
  { id: "dragon", category: "mythical", emoji: "🐉", label: "Dragon" },
  { id: "phoenix", category: "mythical", emoji: "🔥", label: "Phoenix" },
  { id: "demon", category: "mythical", emoji: "👹", label: "Oni" },
  { id: "alien", category: "mythical", emoji: "👾", label: "Alien" },
  { id: "robot", category: "mythical", emoji: "🤖", label: "Robot" },
  { id: "ghost", category: "mythical", emoji: "👻", label: "Ghost" },
  { id: "unicorn", category: "mythical", emoji: "🦄", label: "Unicorn" },
  { id: "skull", category: "mythical", emoji: "💀", label: "Skull" },
  { id: "wizard", category: "mythical", emoji: "🧙", label: "Wizard" },
  { id: "ninja", category: "mythical", emoji: "🥷", label: "Ninja" },

  // Flags
  { id: "flag-gb", category: "flags", emoji: "🇬🇧", label: "UK" },
  { id: "flag-us", category: "flags", emoji: "🇺🇸", label: "USA" },
  { id: "flag-eu", category: "flags", emoji: "🇪🇺", label: "EU" },
  { id: "flag-de", category: "flags", emoji: "🇩🇪", label: "Germany" },
  { id: "flag-fr", category: "flags", emoji: "🇫🇷", label: "France" },
  { id: "flag-jp", category: "flags", emoji: "🇯🇵", label: "Japan" },
  { id: "flag-kr", category: "flags", emoji: "🇰🇷", label: "Korea" },
  { id: "flag-br", category: "flags", emoji: "🇧🇷", label: "Brazil" },
  { id: "flag-ca", category: "flags", emoji: "🇨🇦", label: "Canada" },
  { id: "flag-pk", category: "flags", emoji: "🇵🇰", label: "Pakistan" },
];

/** Helper: find avatar item by id, fallback to dragon */
export function getAvatarById(id: string): AvatarItem {
  return avatarItems.find((a) => a.id === id) ?? avatarItems.find((a) => a.id === "dragon")!;
}

/** Legacy compat: flat list for old references */
export const avatarOptions = avatarItems.map((a) => ({ value: a.id as AvatarOption, label: a.label, emoji: a.emoji }));
