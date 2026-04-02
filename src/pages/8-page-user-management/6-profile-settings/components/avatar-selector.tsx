/**
 * =============================================================================
 * AVATAR SELECTOR — Expandable modal with categorized emoji profile icons
 * =============================================================================
 */

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { avatarItems, avatarCategories, getAvatarById, type AvatarCategory, type AvatarOption } from "@/data/temp/8-user-profile-mock";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Save } from "lucide-react";

interface AvatarSelectorProps {
  current: AvatarOption;
  onSelect: (avatar: AvatarOption) => void;
}

export const AvatarSelector = ({ current, onSelect }: AvatarSelectorProps) => {
  const [open, setOpen] = useState(false);
  const currentAvatar = getAvatarById(current);
  const [selected, setSelected] = useState(current);
  const [category, setCategory] = useState<AvatarCategory>(currentAvatar.category);
  const selectedAvatar = getAvatarById(selected);
  const filtered = avatarItems.filter((a) => a.category === category);

  const handleSave = () => {
    onSelect(selected);
    setOpen(false);
  };

  const handleRandomize = () => {
    const pool = avatarItems.filter((a) => a.id !== selected);
    const random = pool[Math.floor(Math.random() * pool.length)];
    setSelected(random.id);
    setCategory(random.category);
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setSelected(current);
      setCategory(getAvatarById(current).category);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-3 block">Profile Icon</label>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogTrigger asChild>
          <button className="group flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2 border-primary/40 bg-primary/10 shadow-lg shadow-primary/10 transition-shadow group-hover:shadow-primary/20 group-hover:border-primary/60"
            >
              {currentAvatar.emoji}
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{currentAvatar.label}</p>
              <p className="text-xs text-primary cursor-pointer">Change avatar →</p>
            </div>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Choose Your Avatar</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            {/* Preview */}
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl border-2 border-primary bg-primary/10 shadow-[0_0_24px_hsl(var(--primary)/0.2)]"
                >
                  {selectedAvatar.emoji}
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="text-center text-sm text-muted-foreground">{selectedAvatar.label}</p>

            {/* Category tabs */}
            <div className="flex gap-1.5 justify-center flex-wrap">
              {avatarCategories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={category === cat.key ? "default" : "ghost"}
                  size="sm"
                  className="text-xs gap-1 h-8 px-3"
                  onClick={() => setCategory(cat.key)}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Grid */}
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-5 gap-2"
            >
              {filtered.map((avatar, i) => (
                <motion.button
                  key={avatar.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  onClick={() => setSelected(avatar.id)}
                  className={cn(
                    "w-full aspect-square rounded-xl flex flex-col items-center justify-center text-2xl border-2 transition-all duration-200",
                    selected === avatar.id
                      ? "border-primary bg-primary/15 shadow-md shadow-primary/20 ring-2 ring-primary/30"
                      : "border-border/50 bg-card hover:border-primary/50 hover:scale-105"
                  )}
                  title={avatar.label}
                >
                  {avatar.emoji}
                  <span className="text-[9px] text-muted-foreground mt-0.5 leading-none">{avatar.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-1">
              <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={handleRandomize}>
                <Shuffle className="h-3.5 w-3.5" />
                Randomize
              </Button>
              <Button size="sm" className="text-xs gap-1.5" onClick={handleSave}>
                <Save className="h-3.5 w-3.5" />
                Save Avatar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
