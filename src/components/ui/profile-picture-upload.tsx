/**
 * =============================================================================
 * PROFILE PICTURE UPLOAD — Image upload with preview, validation, and removal
 * =============================================================================
 */

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ProfilePictureUploadProps {
  currentUrl?: string;
  fallbackEmoji: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
  label?: string;
}

export const ProfilePictureUpload = ({
  currentUrl,
  fallbackEmoji,
  onUpload,
  onRemove,
  label = "Profile Picture",
}: ProfilePictureUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or WEBP image.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Image must be under 5MB.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        // Resize to 256x256 for storage efficiency
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = 256;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d")!;
          // Center crop
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          const resized = canvas.toDataURL("image/webp", 0.85);
          onUpload(resized);
          setIsProcessing(false);
          toast({ title: "Profile picture updated" });
        };
        img.onerror = () => {
          setIsProcessing(false);
          toast({
            title: "Failed to process image",
            variant: "destructive",
          });
        };
        img.src = dataUrl;
      };
      reader.onerror = () => {
        setIsProcessing(false);
        toast({ title: "Failed to read file", variant: "destructive" });
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-3 block">
        {label}
      </label>

      <div className="flex items-start gap-5">
        {/* Avatar preview */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "relative w-24 h-24 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all duration-200 shrink-0",
            isDragging
              ? "border-primary bg-primary/10 scale-105"
              : currentUrl
              ? "border-primary/40 bg-primary/5"
              : "border-border/50 bg-muted/30"
          )}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </motion.div>
            ) : currentUrl ? (
              <motion.img
                key="image"
                src={currentUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.span
                key="emoji"
                className="text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {fallbackEmoji}
              </motion.span>
            )}
          </AnimatePresence>

          {isDragging && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-full">
              <Upload className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-2 pt-1">
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            onClick={() => inputRef.current?.click()}
            disabled={isProcessing}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            {currentUrl ? "Change Image" : "Upload Image"}
          </Button>

          {currentUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs gap-1.5 text-destructive hover:text-destructive"
              onClick={() => {
                onRemove();
                toast({ title: "Profile picture removed" });
              }}
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </Button>
          )}

          <p className="text-[11px] text-muted-foreground leading-relaxed max-w-[200px]">
            JPG, PNG, or WEBP. Max 5MB. Image will be cropped to a circle.
          </p>
        </div>
      </div>
    </div>
  );
};
