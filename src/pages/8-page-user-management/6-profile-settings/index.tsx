/**
 * =============================================================================
 * PROFILE SETTINGS PAGE — Edit user profile
 * =============================================================================
 * Allows editing: full name, email (display only), avatar selection.
 * =============================================================================
 */

import { useProfileSettings } from "./hooks/use-profile-settings";
import { ProfileForm } from "./components/profile-form";
import { AvatarSelector } from "./components/avatar-selector";

const ProfileSettingsPage = () => {
  const { profile, updateField, updateAvatar, saving } = useProfileSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account details</p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-6">
        <AvatarSelector current={profile.avatar} onSelect={updateAvatar} />
        <ProfileForm profile={profile} onUpdate={updateField} saving={saving} />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
