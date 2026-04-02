/**
 * =============================================================================
 * SECTION INFO CARD — Context box for each dashboard section
 * =============================================================================
 * Provides a brief explanation of the section's purpose.
 * =============================================================================
 */

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface SectionInfoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SectionInfoCard = ({ title, description, icon: Icon }: SectionInfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    <Card className="border-border/40 bg-muted/10">
      <CardContent className="p-4 flex items-start gap-3">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-lg bg-primary/10 shrink-0"
        >
          <Icon className="h-4 w-4 text-primary" />
        </motion.div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
