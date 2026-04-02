/**
 * =============================================================================
 * PROFILE SETTINGS — Save lifecycle with feedback
 * =============================================================================
 */

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

export const useProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});

  const profile = {
    fullName: pendingChanges.fullName ?? user?.fullName ?? "",
    email: user?.email ?? "",
    avatar: (user?.avatar ?? "dragon") as AvatarOption,
    avatarUrl: user?.avatarUrl,
  };

  const updateField = useCallback((field: string, value: string) => {
    setPendingChanges((prev) => ({ ...prev, [field]: value }));
  }, []);

  const saveChanges = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Simulate async save
      await new Promise((res) => setTimeout(res, 500));
      const updates: Partial<Pick<typeof user, "fullName">> = {};
      if (pendingChanges.fullName !== undefined) {
        updates.fullName = pendingChanges.fullName;
      }
      if (Object.keys(updates).length > 0) {
        updateProfile(updates);
      }
      setPendingChanges({});
      toast({ title: "Profile saved", description: "Your changes have been saved successfully." });
    } catch {
      toast({ title: "Save failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }, [user, pendingChanges, updateProfile]);

  const updateAvatar = useCallback((avatar: AvatarOption) => {
    updateProfile({ avatar });
    toast({ title: "Avatar updated" });
  }, [updateProfile]);

  const updateAvatarUrl = useCallback((url: string) => {
    updateProfile({ avatarUrl: url });
    toast({ title: "Profile picture updated" });
  }, [updateProfile]);

  const removeAvatarUrl = useCallback(() => {
    updateProfile({ avatarUrl: undefined });
    toast({ title: "Profile picture removed" });
  }, [updateProfile]);

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  return { profile, updateField, saveChanges, updateAvatar, updateAvatarUrl, removeAvatarUrl, saving, hasPendingChanges };
};
