"use client";

/**
 * TabBar + TabButton
 * Figma source: node 17791-1956 (section "tabs")
 *   - Tab container:  border-b border-border-primary, flex row
 *   - TapButton:      h-14, px-6, py-4, gap-2.5
 *   - Selected state: text-text-brand-primary + border-b-2 border-border-brand-primary
 *   - Inactive state: text-text-tertiary, hover → text-text-secondary
 *
 * Usage:
 *   <TabBar>
 *     <TabButton id="upload" active={activeTab === "upload"} label="Upload" onClick={…}>
 *       <CameraIcon />
 *     </TabButton>
 *     …
 *   </TabBar>
 */

import { motion } from "framer-motion";

// ─── TabButton ────────────────────────────────────────────────────────────────

interface TabButtonProps {
  id:       string;
  active:   boolean;
  label:    string;
  onClick:  () => void;
  children: React.ReactNode;   // icon (or text)
}

export function TabButton({ id, active, label, onClick, children }: TabButtonProps) {
  return (
    <button
      key={id}
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`
        relative flex flex-1 flex-col items-center justify-center
        h-14 gap-[var(--space-1)] px-[var(--space-6)] py-[var(--space-4)]
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-bg-brand-primary focus-visible:ring-inset
        ${active
          ? "text-text-brand-primary"
          : "text-text-tertiary hover:text-text-secondary"
        }
      `}
    >
      {/* Icon / label slot */}
      <span className="flex items-center justify-center">{children}</span>

      {/* Active underline — Figma: border-b border-border-brand-primary */}
      {active && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-bg-brand-primary"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </button>
  );
}

// ─── TabBar ───────────────────────────────────────────────────────────────────

interface TabBarProps {
  children: React.ReactNode;
  className?: string;
}

export function TabBar({ children, className = "" }: TabBarProps) {
  return (
    <nav
      aria-label="Editor sections"
      className={`
        flex flex-shrink-0 items-start
        border-b border-border-primary
        ${className}
      `}
    >
      {children}
    </nav>
  );
}
