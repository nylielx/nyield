/**
 * BUILD NAME EDITOR — Notion-style inline editable build name
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check } from "lucide-react";

interface BuildNameEditorProps {
  name: string;
  onChange: (name: string) => void;
}

const BuildNameEditor = ({ name, onChange }: BuildNameEditorProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleConfirm = () => {
    const trimmed = draft.trim();
    onChange(trimmed || "My Build");
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm();
                if (e.key === "Escape") { setDraft(name); setEditing(false); }
              }}
              onBlur={handleConfirm}
              className="bg-transparent border-b border-primary text-foreground font-heading text-lg font-bold outline-none px-1 py-0.5"
              maxLength={40}
            />
            <button onClick={handleConfirm} className="text-primary hover:text-primary/80 transition-colors">
              <Check size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="display"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => { setDraft(name); setEditing(true); }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-heading text-lg font-bold text-foreground">{name}</span>
            <Pencil size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuildNameEditor;
