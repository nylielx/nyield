/**
 * =============================================================================
 * PROFILE FORM — Editable fields for user profile
 * =============================================================================
 */

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ProfileFormProps {
  profile: { fullName: string; email: string };
  onUpdate: (field: string, value: string) => void;
  saving: boolean;
}

export const ProfileForm = ({ profile, onUpdate, saving }: ProfileFormProps) => (
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
      <Input
        value={profile.fullName}
        onChange={(e) => onUpdate("fullName", e.target.value)}
        className="bg-background/50"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
      <Input value={profile.email} disabled className="bg-background/50 opacity-60" />
      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed in mock mode</p>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
      <Input type="password" value="••••••••" disabled className="bg-background/50 opacity-60" />
      <p className="text-xs text-muted-foreground mt-1">Password changes are not available in mock mode</p>
    </div>

    <Button disabled={saving} className="mt-2" size="sm">
      <Save className="h-4 w-4 mr-2" />
      {saving ? "Saving..." : "Save Changes"}
    </Button>
  </div>
);
