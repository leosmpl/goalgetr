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
    <div className="flex flex-col h-full">

      {/* ── Section label + custom picker (padded) ── */}
      <div className="flex items-center justify-between px-[var(--space-4)] pt-[var(--space-4)] pb-[var(--space-3)]">
        <p className="text-size-xs text-text-secondary">
          {selectedPreset ? selectedPreset.label : "Custom"}
        </p>

        <button
          onClick={() => customPickerRef.current?.click()}
          className="flex items-center gap-[var(--space-2)] px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-full)] bg-bg-tertiary text-size-sm text-text-secondary font-medium hover:bg-bg-quaternary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary"
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

      {/* ── Horizontal scroll row — full-bleed, no clipping parent ── */}
      <div
        className="swatch-scroll"
        style={{
          display: "flex",
          gap: "var(--space-1)",
          overflowX: "scroll",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          touchAction: "pan-x",
          paddingLeft: "var(--space-4)",
          paddingRight: "var(--space-4)",
          paddingBottom: "var(--space-4)",
          flexShrink: 0,
        } as React.CSSProperties}
      >
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

    </div>
  );
}
