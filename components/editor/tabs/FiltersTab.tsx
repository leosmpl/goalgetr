"use client";

import { motion } from "framer-motion";
import type { CardFilter } from "@/lib/types";

interface FiltersTabProps {
  filter: CardFilter;
  textRun: boolean;
  blurAmount: number;
  onFilterChange: (f: CardFilter) => void;
  onTextRunToggle: () => void;
  onBlurChange: (v: number) => void;
}

const FILTERS: { id: CardFilter; label: string }[] = [
  { id: "none",     label: "Off" },
  { id: "noir",     label: "Noir" },
  { id: "heritage", label: "Heritage" },
  { id: "gameday",  label: "Game Day" },
];

export default function FiltersTab({
  filter,
  textRun,
  blurAmount,
  onFilterChange,
  onTextRunToggle,
  onBlurChange,
}: FiltersTabProps) {
  return (
    <div className="flex flex-col gap-space-5">

      {/* ── Filter pills ── */}
      <div className="flex flex-col gap-space-2">
        <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Photo Filter
        </p>
        <div className="flex gap-space-2 flex-wrap">
          {FILTERS.map((f) => {
            const isActive = f.id === filter;
            return (
              <motion.button
                key={f.id}
                onClick={() => onFilterChange(f.id)}
                whileTap={{ scale: 0.94 }}
                aria-pressed={isActive}
                className={`
                  px-space-4 py-space-2 rounded-radius-full text-size-sm font-semibold
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                  ${isActive
                    ? "bg-bg-brand-primary text-border-white"
                    : "bg-bg-tertiary text-text-secondary hover:bg-bg-quaternary"
                  }
                `}
              >
                {f.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Blur slider ── */}
      <div className="flex flex-col gap-space-2">
        <div className="flex items-center justify-between">
          <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Background Blur
          </p>
          <span className="text-size-xs text-text-secondary font-medium tabular-nums">
            {blurAmount}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={20}
          step={1}
          value={blurAmount}
          onChange={(e) => onBlurChange(Number(e.target.value))}
          className="w-full"
          aria-label="Background blur amount"
        />
        <div className="flex justify-between">
          <span className="text-[10px] text-text-tertiary">None</span>
          <span className="text-[10px] text-text-tertiary">Max</span>
        </div>
      </div>

      {/* ── Text Run toggle ── */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <p className="text-size-sm font-semibold text-text-primary">Text Run</p>
          <p className="text-size-xs text-text-tertiary">Scrolls player name on card</p>
        </div>
        <button
          role="switch"
          aria-checked={textRun}
          onClick={onTextRunToggle}
          className={`
            relative w-[44px] h-[26px] rounded-radius-full transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary
            ${textRun ? "bg-bg-brand-primary" : "bg-bg-quaternary"}
          `}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 700, damping: 35 }}
            className="absolute top-[3px] w-5 h-5 rounded-radius-full bg-border-white shadow-sm"
            style={{ left: textRun ? "21px" : "3px" }}
          />
        </button>
      </div>

    </div>
  );
}
