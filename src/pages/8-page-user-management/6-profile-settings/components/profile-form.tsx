/**
 * =============================================================================
 * PROFILE FORM — Editable fields with save lifecycle
 * =============================================================================
 */

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ProfileFormProps {
  profile: { fullName: string; email: string };
  onUpdate: (field: string, value: string) => void;
  onSave: () => void;
  saving: boolean;
  hasPendingChanges: boolean;
}

export const ProfileForm = ({ profile, onUpdate, onSave, saving, hasPendingChanges }: ProfileFormProps) => (
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
      <Input
        value={profile.fullName}
        onChange={(e) => onUpdate("fullName", e.target.value)}
        className="bg-background/50"
      />
      <p className="text-xs text-muted-foreground mt-1">
        This name appears in your dashboard greeting and across your account.
      </p>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
      <Input value={profile.email} disabled className="bg-background/50 opacity-60" />
      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed in demo mode</p>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
      <Input type="password" value="••••••••" disabled className="bg-background/50 opacity-60" />
      <p className="text-xs text-muted-foreground mt-1">Password changes are not available in demo mode</p>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
      <Input placeholder="Optional" className="bg-background/50" disabled />
      <p className="text-xs text-muted-foreground mt-1">Phone number support coming soon</p>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">Delivery Address</label>
      <Input placeholder="Address line 1" className="bg-background/50 mb-2" disabled />
      <Input placeholder="City, Postcode" className="bg-background/50" disabled />
      <p className="text-xs text-muted-foreground mt-1">Delivery address support coming soon</p>
    </div>

    <Button
      onClick={onSave}
      disabled={saving || !hasPendingChanges}
      className="mt-2"
      size="sm"
    >
      <Save className="h-4 w-4 mr-2" />
      {saving ? "Saving..." : hasPendingChanges ? "Save Changes" : "No Changes"}
    </Button>
  </div>
);
