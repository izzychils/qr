"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  label,
  children,
  size = "md",
  tone = "cream",
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "cream" | "forest";
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-forest/55 backdrop-blur-[3px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "no-scrollbar relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[22px] border shadow-plate sm:rounded-[14px]",
          tone === "forest" ? "border-line-dark bg-forest text-cream" : "border-line bg-cream text-ink",
          size === "sm" ? "sm:max-w-[440px]" : size === "lg" ? "sm:max-w-[760px]" : "sm:max-w-[560px]",
        )}
      >
        <div
          className={cn(
            "sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-5 py-4 backdrop-blur-xl sm:px-6",
            tone === "forest"
              ? "border-line-dark bg-forest/95"
              : "border-line bg-cream/95",
          )}
        >
          <p className={cn("label", tone === "forest" ? "text-cream/45" : "text-muted")}>{label}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
              tone === "forest"
                ? "border-line-dark text-cream/60 hover:border-cream/40 hover:text-cream"
                : "border-line text-muted hover:border-forest/30 hover:text-forest",
            )}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
