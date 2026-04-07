"use client";

/**
 * ColorSwatch — reusable color selector card
 * Figma source: node 17794-1927
 *
 * Shows a colored square swatch + label inside a rounded card.
 * Two states: unselected (dark border) · selected (white border + white/10 bg).
 *
 * Usage:
 *   <ColorSwatch color="#EF4444" label="Red" selected={active === "red"} onClick={…} />
 */

import { motion } from "framer-motion";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ColorSwatchProps {
  /** Hex color displayed as the inner square swatch */
  color: string;
  /** Visible label rendered below the swatch */
  label: string;
  /** Whether this swatch is the active/selected one */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ColorSwatch({
  color,
  label,
  selected = false,
  onClick,
  className = "",
}: ColorSwatchProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      aria-label={label}
      aria-pressed={selected}
      className={`
        relative flex flex-col items-stretch overflow-hidden
        w-full aspect-square
        rounded-[var(--radius-5)]
        border transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-bg-brand-primary focus-visible:ring-inset
        ${selected
          ? "border-white bg-[rgba(255,255,255,0.10)]"
          : "border-border-primary bg-transparent"
        }
        ${className}
      `}
    >
      {/* ── Swatch area — fills remaining height ── */}
      <span className="flex flex-1 items-center justify-center min-h-0">
        <span
          className="w-10 h-10 rounded-[var(--radius-4)] flex-shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      </span>

      {/* ── Label ── */}
      <span
        className={`
          w-full px-[var(--space-1)] py-[6px]
          text-size-xs text-center
          whitespace-nowrap overflow-hidden text-ellipsis
          transition-colors duration-150
          ${selected ? "text-text-primary" : "text-text-tertiary"}
        `}
      >
        {label}
      </span>
    </motion.button>
  );
}
