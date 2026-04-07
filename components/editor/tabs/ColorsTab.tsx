"use client";

import ColorSwatch from "@/components/ui/ColorSwatch";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";

interface ColorsTabProps {
  cardColor: string;
  onColorChange: (hex: string) => void;
}

export default function ColorsTab({ cardColor, onColorChange }: ColorsTabProps) {
  return (
    <div className="flex flex-col h-full">

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
