"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";

interface ColorsTabProps {
  cardColor: string;
  onColorChange: (hex: string) => void;
}

export default function ColorsTab({ cardColor, onColorChange }: ColorsTabProps) {
  const customPickerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-space-4">
      <p className="text-size-sm font-semibold text-text-secondary">Card Background</p>

      {/* ── Colour swatch grid ── */}
      <div className="grid grid-cols-4 gap-space-3">
        {CARD_COLOR_PRESETS.map((preset) => {
          const isSelected = cardColor === preset.value;
          return (
            <motion.button
              key={preset.value}
              onClick={() => onColorChange(preset.value)}
              whileTap={{ scale: 0.88 }}
              animate={{ scale: isSelected ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={preset.label}
              aria-pressed={isSelected}
              className={`
                w-full aspect-square rounded-radius-5 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                ${isSelected
                  ? "ring-2 ring-border-white ring-offset-2 ring-offset-bg-secondary"
                  : ""
                }
              `}
              style={{ backgroundColor: preset.value }}
            />
          );
        })}
      </div>

      {/* ── Colour label ── */}
      <p className="text-size-xs text-text-tertiary">
        {CARD_COLOR_PRESETS.find((p) => p.value === cardColor)?.label ?? "Custom"}
      </p>

      {/* ── Custom colour picker ── */}
      <div className="flex items-center gap-space-3">
        <button
          onClick={() => customPickerRef.current?.click()}
          className="flex items-center gap-space-2 px-space-4 py-space-2 rounded-radius-full bg-bg-tertiary text-size-sm text-text-secondary font-medium hover:bg-bg-quaternary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary"
          aria-label="Choose custom colour"
        >
          <span
            className="w-4 h-4 rounded-radius-full border border-border-secondary flex-shrink-0"
            style={{ backgroundColor: cardColor }}
          />
          Custom
        </button>
        {/* Hidden native colour picker */}
        <input
          ref={customPickerRef}
          type="color"
          value={cardColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
