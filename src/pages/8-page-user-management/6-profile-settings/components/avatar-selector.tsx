/**
 * =============================================================================
 * AVATAR SELECTOR — Selectable profile icons
 * =============================================================================
 */

import { cn } from "@/lib/utils";
import { avatarOptions } from "@/data/temp/8-user-profile-mock";
import type { AvatarOption } from "@/data/temp/8-user-profile-mock";

interface AvatarSelectorProps {
  current: AvatarOption;
  onSelect: (avatar: AvatarOption) => void;
}

export const AvatarSelector = ({ current, onSelect }: AvatarSelectorProps) => (
  <div>
    <label className="text-sm font-medium text-foreground mb-3 block">Profile Icon</label>
    <div className="flex gap-3 flex-wrap">
      {avatarOptions.map(({ value, label, emoji }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={cn(
            "w-14 h-14 rounded-full flex flex-col items-center justify-center text-xl border-2 transition-all",
            current === value
              ? "border-primary bg-primary/15 shadow-md shadow-primary/20"
              : "border-border/50 bg-card hover:border-primary/50"
          )}
          title={label}
        >
          {emoji}
        </button>
      ))}
    </div>
  </div>
);
