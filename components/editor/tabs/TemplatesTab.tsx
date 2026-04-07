"use client";

import { motion } from "framer-motion";
import type { CardTemplate } from "@/lib/types";

interface TemplatesTabProps {
  template: CardTemplate;
  onTemplateChange: (t: CardTemplate) => void;
}

const TEMPLATES: {
  id: CardTemplate;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Header + photo + number",
    icon: (
      /* Tiny card sketch: header strip + photo block */
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="35" height="47" rx="3.5" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="32" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
        <rect x="2" y="14" width="32" height="30" rx="2" fill="currentColor" fillOpacity="0.12" />
        <rect x="3" y="36" width="10" height="7" rx="1" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "modern",
    label: "Modern",
    description: "Full-bleed image, text overlay",
    icon: (
      /* Tiny card sketch: full bleed photo + name overlay at bottom */
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="35" height="47" rx="3.5" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="32" height="44" rx="2" fill="currentColor" fillOpacity="0.12" />
        <rect x="2" y="35" width="32" height="11" rx="2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "stats",
    label: "Stats",
    description: "Image left, stats right",
    icon: (
      /* Tiny card sketch: left photo + right stat lines */
      <svg width="36" height="48" viewBox="0 0 36 48" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="35" height="47" rx="3.5" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="15" height="44" rx="2" fill="currentColor" fillOpacity="0.15" />
        <rect x="20" y="8"  width="14" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />
        <rect x="20" y="15" width="10" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
        <rect x="20" y="22" width="12" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />
        <rect x="20" y="29" width="9"  height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
        <rect x="20" y="36" width="11" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    ),
  },
];

export default function TemplatesTab({ template, onTemplateChange }: TemplatesTabProps) {
  return (
    <div className="flex flex-col gap-space-4">
      <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
        Card Layout
      </p>

      <div className="flex gap-space-3">
        {TEMPLATES.map((t) => {
          const isActive = t.id === template;
          return (
            <motion.button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              whileTap={{ scale: 0.96 }}
              aria-pressed={isActive}
              className={`
                flex-1 flex flex-col items-center gap-space-2 py-space-4 rounded-radius-5
                border transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                ${isActive
                  ? "bg-bg-brand-primary/10 border-bg-brand-primary text-text-primary"
                  : "bg-bg-tertiary border-transparent text-text-tertiary hover:text-text-secondary hover:bg-bg-quaternary"
                }
              `}
            >
              <span className={isActive ? "text-text-brand" : ""}>{t.icon}</span>
              <span className="text-size-xs font-semibold">{t.label}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="text-size-xs text-text-tertiary text-center">
        {TEMPLATES.find((t) => t.id === template)?.description}
      </p>
    </div>
  );
}
