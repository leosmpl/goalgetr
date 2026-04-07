"use client";

import { useRef } from "react";
import ColorSwatch from "@/components/ui/ColorSwatch";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";

interface ColorsTabProps {
  cardColor: string;
  onColorChange: (hex: string) => void;
}

export default function ColorsTab({ cardColor, onColorChange }: ColorsTabProps) {
  const customPickerRef = useRef<HTMLInputElement>(null);

  const selectedPreset = CARD_COLOR_PRESETS.find(
    (p) => p.value.toLowerCase() === cardColor.toLowerCase()
  );

  return (
    <div className="flex flex-col gap-space-4">

      {/* ── Section label ── */}
      <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
        Card Background
      </p>

      {/* ── Colour grid — 3 columns, ColorSwatch cards ── */}
      <div className="grid grid-cols-3 gap-[var(--space-3)]">
        {CARD_COLOR_PRESETS.map((preset) => (
          <ColorSwatch
            key={preset.value}
            color={preset.value}
            label={preset.label}
            selected={preset.value.toLowerCase() === cardColor.toLowerCase()}
            onClick={() => onColorChange(preset.value)}
          />
        ))}
      </div>

      {/* ── Custom colour picker ── */}
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
