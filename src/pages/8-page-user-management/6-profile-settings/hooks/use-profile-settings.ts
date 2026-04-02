/**
 * =============================================================================
 * USE PROFILE SETTINGS — Hook for profile settings page
 * =============================================================================
 */

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

export const useProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const profile = {
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    avatar: (user?.avatar ?? "dragon") as AvatarOption,
    avatarUrl: user?.avatarUrl,
  };

  const updateField = (field: string, value: string) => {
    if (field === "fullName") {
      updateProfile({ fullName: value });
    }
  };

  const updateAvatar = (avatar: AvatarOption) => {
    updateProfile({ avatar });
  };

  const updateAvatarUrl = (url: string) => {
    updateProfile({ avatarUrl: url });
  };

  const removeAvatarUrl = () => {
    updateProfile({ avatarUrl: undefined });
  };

  return { profile, updateField, updateAvatar, updateAvatarUrl, removeAvatarUrl, saving };
};
