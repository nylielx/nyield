/**
 * =============================================================================
 * USER AVATAR DISPLAY — Reusable avatar component showing uploaded image or emoji fallback
 * =============================================================================
 */

import { cn } from "@/lib/utils";
import { getAvatarById } from "@/data/temp/8-user-profile-mock";

interface UserAvatarDisplayProps {
  avatarUrl?: string;
  avatarEmoji?: string;
  avatarId?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-lg",
  lg: "w-20 h-20 text-4xl",
};

export const UserAvatarDisplay = ({
  avatarUrl,
  avatarEmoji,
  avatarId,
  size = "sm",
  className,
}: UserAvatarDisplayProps) => {
  const emoji = avatarEmoji ?? getAvatarById(avatarId ?? "man").emoji;

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden shrink-0",
        "bg-primary/15 border border-primary/30",
        sizeMap[size],
        className
      )}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{emoji}</span>
      )}
    </div>
  );
};
