"use client";

/**
 * IconButton — unified, single reusable component
 * Figma source: node 17799-7455 — IconButtons section
 *
 * Variants:  plain · soft · primary · outline
 * Sizes:     sm (32px) · md (40px) · lg (48px)
 * States:    enabled · hover (white/10 overlay) · disabled (opacity-40)
 *
 * Usage:
 *   <IconButton variant="soft" size="md" aria-label="Close" onClick={…}>
 *     <XIcon />
 *   </IconButton>
 */

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IconButtonVariant = "plain" | "soft" | "primary" | "outline";
export type IconButtonSize    = "sm" | "md" | "lg";

export interface IconButtonProps {
  /** Icon to render — any ReactNode */
  children:      React.ReactNode;
  /** Visual style variant — default "plain" */
  variant?:      IconButtonVariant;
  /** Size — sm 32px · md 40px · lg 48px. Default "md" */
  size?:         IconButtonSize;
  /** Disabled — opacity-40, pointer blocked */
  disabled?:     boolean;
  /** Required accessible label for icon-only buttons */
  "aria-label":  string;
  onClick?:      () => void;
  type?:         "button" | "submit" | "reset";
  className?:    string;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE: Record<IconButtonSize, { box: string; iconBox: string }> = {
  sm: { box: "size-8",  iconBox: "size-6" },  // 32px button, 24px icon
  md: { box: "size-10", iconBox: "size-6" },  // 40px button, 24px icon
  lg: { box: "size-12", iconBox: "size-7" },  // 48px button, 28px icon
};

// ─── Variant base styles ──────────────────────────────────────────────────────
// plain   — transparent bg, white/10 on hover
// soft    — white/5 bg,     white/10 on hover
// primary — brand-primary,  white/10 overlay on hover
// outline — transparent + border-secondary, white/10 on hover

const VARIANT_BASE: Record<IconButtonVariant, string> = {
  plain:   "",
  soft:    "bg-[rgba(255,255,255,0.05)]",
  primary: "bg-bg-brand-primary",
  outline: "border border-border-secondary",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function IconButton({
  children,
  variant   = "plain",
  size      = "md",
  disabled  = false,
  onClick,
  type      = "button",
  className = "",
  ...props
}: IconButtonProps) {
  const s = SIZE[size];
  const base = VARIANT_BASE[variant];

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={props["aria-label"]}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      className={`
        group relative inline-flex items-center justify-center flex-shrink-0
        ${s.box} p-[var(--space-1)]
        rounded-[var(--radius-9)]
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-bg-brand-primary focus-visible:ring-inset
        ${base}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Hover overlay for plain / soft / outline — white/10 fill */}
      {!disabled && variant !== "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[var(--radius-9)] bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-10"
        />
      )}

      {/* Hover overlay for primary — white/10 on top of brand color */}
      {!disabled && variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[var(--radius-9)] bg-white opacity-0 transition-opacity duration-150 group-hover:opacity-10"
        />
      )}

      {/* Icon slot */}
      <span className={`relative flex items-center justify-center ${s.iconBox} text-text-primary`}>
        {children}
      </span>
    </motion.button>
  );
}
