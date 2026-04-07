"use client";

/**
 * IconButton — Plain variant
 * Figma source: node 17784-3201 — IconButtons/Plain
 *
 * Sizes:  sm (32px) · md (40px) · lg (48px)
 * States: default (transparent) · hover (white/10 bg) · disabled (dimmed)
 *
 * Usage:
 *   <IconButton size="md" aria-label="Close" onClick={…}>
 *     <XIcon />
 *   </IconButton>
 */

import { motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps {
  /** The icon to render — any ReactNode (SVG, emoji, etc.) */
  children: React.ReactNode;
  /** Visual size — sm 32px · md 40px · lg 48px */
  size?: IconButtonSize;
  /** Disabled state — dimmed icon, no pointer events */
  disabled?: boolean;
  /** Accessible label (required for icon-only buttons) */
  "aria-label": string;
  /** Click handler */
  onClick?: () => void;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Extra classes forwarded to the root button */
  className?: string;
}

// ─── Size config ──────────────────────────────────────────────────────────────

const SIZE: Record<IconButtonSize, { box: string; iconBox: string }> = {
  sm: { box: "size-8",  iconBox: "size-6" },   // 32px button, 24px icon area
  md: { box: "size-10", iconBox: "size-6" },   // 40px button, 24px icon area
  lg: { box: "size-12", iconBox: "size-7" },   // 48px button, 28px icon area
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function IconButton({
  children,
  size      = "md",
  disabled  = false,
  onClick,
  type      = "button",
  className = "",
  ...props
}: IconButtonProps) {
  const s = SIZE[size];

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
        ${disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:bg-[rgba(255,255,255,0.10)]"
        }
        ${className}
      `}
    >
      {/* Icon slot */}
      <span className={`relative flex items-center justify-center ${s.iconBox} text-text-primary`}>
        {children}
      </span>
    </motion.button>
  );
}
