"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface ColorPreset {
  label: string;
  value: string;
}

// 5 specified swatches — all map to project design tokens
const COLOR_PRESETS: ColorPreset[] = [
  { label: "Orange",     value: "#FFB938" }, // Yellow/500 = Ember
  { label: "Royal Blue", value: "#2C7FFF" }, // Blue/500 = bg-brand-primary
  { label: "Deep Red",   value: "#C0392B" }, // Red/700
  { label: "Forest",     value: "#1A7A4A" }, // Green/700
  { label: "Slate",      value: "#64748B" }, // Slate/500
];

interface ColorsTabProps {
  cardColor: string;
  onColorChange: (hex: string) => void;
}

export default function ColorsTab({ cardColor, onColorChange }: ColorsTabProps) {
  const customPickerRef = useRef<HTMLInputElement>(null);

  const selectedPreset = COLOR_PRESETS.find(
    (p) => p.value.toLowerCase() === cardColor.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-space-4">
      <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
        Card Background
      </p>

      {/* ── Color swatches ── */}
      <div className="grid grid-cols-5 gap-space-3">
        {COLOR_PRESETS.map((preset) => {
          const isSelected = preset.value.toLowerCase() === cardColor.toLowerCase();
          return (
            <motion.button
              key={preset.value}
              onClick={() => onColorChange(preset.value)}
              whileTap={{ scale: 0.88 }}
              animate={{ scale: isSelected ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={preset.label}
              aria-pressed={isSelected}
              className={`
                aspect-square rounded-radius-4 transition-shadow duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                ${isSelected ? "ring-2 ring-border-white ring-offset-2 ring-offset-bg-secondary" : ""}
              `}
              style={{ backgroundColor: preset.value }}
            />
          );
        })}
      </div>

      {/* ── Label + custom picker ── */}
      <div className="flex items-center justify-between">
        <span className="text-size-xs text-text-tertiary">
          {selectedPreset ? selectedPreset.label : "Custom"}
        </span>

        <button
          onClick={() => customPickerRef.current?.click()}
          className="flex items-center gap-space-2 px-space-4 py-space-2 rounded-radius-full bg-bg-tertiary text-size-sm text-text-secondary font-medium hover:bg-bg-quaternary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary"
        >
          <span
            className="w-4 h-4 rounded-full border border-border-secondary flex-shrink-0"
            style={{ backgroundColor: cardColor }}
          />
          Custom
        </button>

        <input
          ref={customPickerRef}
          type="color"
          defaultValue={cardColor}
          className="sr-only"
          onChange={(e) => onColorChange(e.target.value)}
          aria-label="Custom card color"
        />
      </div>
    </div>
  );
}
