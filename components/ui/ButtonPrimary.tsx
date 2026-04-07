"use client";

/**
 * ButtonPrimary
 * Figma source: node 17786-9790 — Buttons/Primary
 *
 * Sizes:  sm (32px) · md (40px) · lg (48px)
 * States: enabled · hover (white/10 overlay) · disabled
 * Slots:  iconLeft + iconRight — pass any ReactNode (SVG, emoji, etc.)
 *
 * Note (from Figma): the brand colour is always --bg-brand-primary,
 * which will shift hue automatically when the league theme changes.
 */

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonPrimaryProps {
  /** Button label text */
  label?: string;
  /** Visual size — sm 32px · md 40px · lg 48px */
  size?: ButtonSize;
  /** Icon rendered to the left of the label */
  iconLeft?: React.ReactNode;
  /** Icon rendered to the right of the label */
  iconRight?: React.ReactNode;
  /** Disabled state — white/5 bg, tertiary text, pointer-events none */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Stretch to fill parent width */
  fullWidth?: boolean;
  /** Extra classes forwarded to the root button */
  className?: string;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE: Record<ButtonSize, {
  minH:     string;
  px:       string;
  iconSize: string;
  text:     string;
}> = {
  sm: { minH: "min-h-[32px]", px: "px-[var(--space-2)]",  iconSize: "size-5", text: "text-size-sm"   },
  md: { minH: "min-h-[40px]", px: "px-[var(--space-2)]",  iconSize: "size-6", text: "text-size-sm"   },
  lg: { minH: "min-h-[48px]", px: "px-[var(--space-3)]",  iconSize: "size-7", text: "text-size-base" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ButtonPrimary({
  label     = "Button",
  size      = "md",
  iconLeft,
  iconRight,
  disabled  = false,
  onClick,
  type      = "button",
  fullWidth = false,
  className = "",
}: ButtonPrimaryProps) {
  const s = SIZE[size];

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`
        group relative inline-flex items-center justify-center gap-0
        ${s.minH} ${s.px} py-[var(--space-1)]
        rounded-radius-full
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-bg-brand-primary focus-visible:ring-offset-2
        focus-visible:ring-offset-bg-primary
        ${fullWidth ? "w-full" : ""}
        ${disabled
          ? "bg-[rgba(255,255,255,0.05)] cursor-not-allowed"
          : "bg-bg-brand-primary cursor-pointer"
        }
        ${className}
      `}
    >
      {/* Hover overlay — white/10 tint matching Figma hover state */}
      {!disabled && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-radius-full bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-10"
        />
      )}

      {/* Icon left */}
      {iconLeft && (
        <span className={`relative flex items-center justify-center flex-shrink-0 ${s.iconSize} ${disabled ? "text-text-tertiary" : "text-text-primary"}`}>
          {iconLeft}
        </span>
      )}

      {/* Label */}
      <span
        className={`
          relative px-[var(--space-1-5,6px)] font-medium whitespace-nowrap
          ${s.text} leading-snug
          ${disabled ? "text-text-tertiary" : "text-text-primary"}
        `}
      >
        {label}
      </span>

      {/* Icon right */}
      {iconRight && (
        <span className={`relative flex items-center justify-center flex-shrink-0 ${s.iconSize} ${disabled ? "text-text-tertiary" : "text-text-primary"}`}>
          {iconRight}
        </span>
      )}
    </motion.button>
  );
}
