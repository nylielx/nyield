/**
 * =============================================================================
 * PROFILE SETTINGS PAGE — Edit user profile with save lifecycle
 * =============================================================================
 */

import { useProfileSettings } from "./hooks/use-profile-settings";
import { ProfileForm } from "./components/profile-form";
import { AvatarSelector } from "./components/avatar-selector";
import { ProfilePictureUpload } from "@/components/ui/profile-picture-upload";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";

const ProfileSettingsPage = () => {
  const { profile, updateField, saveChanges, updateAvatar, updateAvatarUrl, removeAvatarUrl, saving, hasPendingChanges } = useProfileSettings();
  const fallbackEmoji = getAvatarById(profile.avatar).emoji;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account details</p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-6">
        <ProfilePictureUpload
          currentUrl={profile.avatarUrl}
          fallbackEmoji={fallbackEmoji}
          onUpload={updateAvatarUrl}
          onRemove={removeAvatarUrl}
        />
        <div className="border-t border-border/30 pt-6">
          <AvatarSelector current={profile.avatar} onSelect={updateAvatar} />
          <p className="text-[11px] text-muted-foreground mt-2">
            The emoji icon is used as a fallback when no profile picture is uploaded.
          </p>
        </div>
        <ProfileForm
          profile={profile}
          onUpdate={updateField}
          onSave={saveChanges}
          saving={saving}
          hasPendingChanges={hasPendingChanges}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
