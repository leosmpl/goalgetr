"use client";

import { motion } from "framer-motion";
import type { PlayerCardData, BadgeType } from "@/lib/types";

interface PositionTabProps {
  position: PlayerCardData["position"];
  badges: BadgeType[];
  onPositionChange: (pos: PlayerCardData["position"]) => void;
  onBadgeToggle: (badge: BadgeType) => void;
}

const POSITIONS: PlayerCardData["position"][] = ["C", "LW", "RW", "D", "G"];

const POSITION_LABELS: Record<PlayerCardData["position"], string> = {
  C: "Centre", LW: "Left Wing", RW: "Right Wing", D: "Defence", G: "Goalie",
};

const ALL_BADGES: BadgeType[] = ["Captain", "Dangler", "Sniper", "Playmaker", "Enforcer"];
const MAX_BADGES = 3;

const BADGE_DESCRIPTIONS: Record<BadgeType, string> = {
  Captain:   "Team leader on and off the ice",
  Dangler:   "Elite puck handling skills",
  Sniper:    "Deadly accuracy in front of goal",
  Playmaker: "Sets up teammates for success",
  Enforcer:  "Physical presence and toughness",
};

export default function PositionTab({
  position,
  badges,
  onPositionChange,
  onBadgeToggle,
}: PositionTabProps) {
  const atMax = badges.length >= MAX_BADGES;

  return (
    <div className="flex flex-col gap-space-5 pb-space-4">
      {/* ── Position chips ── */}
      <div>
        <p className="text-size-xs font-semibold text-text-secondary uppercase tracking-wider mb-space-2">
          Position
        </p>
        <div className="flex gap-space-2 flex-wrap">
          {POSITIONS.map((pos) => {
            const isActive = position === pos;
            return (
              <motion.button
                key={pos}
                onClick={() => onPositionChange(pos)}
                whileTap={{ scale: 0.93 }}
                aria-pressed={isActive}
                aria-label={POSITION_LABELS[pos]}
                className={`
                  px-space-4 py-space-2 rounded-radius-full text-size-sm font-bold
                  transition-colors duration-150 focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                  ${isActive
                    ? "bg-bg-brand-primary text-border-white"
                    : "bg-bg-tertiary text-text-secondary border border-border-secondary hover:border-border-tertiary"
                  }
                `}
              >
                {pos}
              </motion.button>
            );
          })}
        </div>
        <p className="text-size-xs text-text-tertiary mt-space-2">
          {POSITION_LABELS[position]}
        </p>
      </div>

      {/* ── Trait badges ── */}
      <div>
        <div className="flex items-center justify-between mb-space-2">
          <p className="text-size-xs font-semibold text-text-secondary uppercase tracking-wider">
            Trait Badges
          </p>
          <span className={`text-size-xs font-bold ${atMax ? "text-bg-error-primary" : "text-text-tertiary"}`}>
            {badges.length} / {MAX_BADGES}
          </span>
        </div>

        {atMax && (
          <p className="text-size-xs text-bg-error-primary mb-space-3">
            Maximum {MAX_BADGES} badges selected.
          </p>
        )}

        <div className="flex flex-col gap-space-2">
          {ALL_BADGES.map((badge) => {
            const isSelected = badges.includes(badge);
            const isDisabled = !isSelected && atMax;
            return (
              <motion.button
                key={badge}
                onClick={() => onBadgeToggle(badge)}
                whileTap={{ scale: isDisabled ? 1 : 0.97 }}
                disabled={isDisabled}
                aria-pressed={isSelected}
                className={`
                  flex items-center gap-space-3 px-space-3 py-space-3 rounded-radius-5
                  border transition-colors duration-150 text-left
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                  ${isSelected
                    ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                    : isDisabled
                    ? "bg-bg-tertiary border-border-primary text-text-tertiary opacity-40 cursor-not-allowed"
                    : "bg-bg-tertiary border-border-primary text-text-secondary hover:border-border-secondary"
                  }
                `}
              >
                {/* Mini hex */}
                <div className={`hex-clip w-7 h-8 flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-yellow-500" : "bg-bg-quaternary"}`}>
                  <span className={`text-size-xs font-black leading-none ${isSelected ? "text-bg-primary" : "text-text-tertiary"}`}>
                    {badge[0]}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-size-sm font-bold leading-tight">{badge}</span>
                  <span className="text-size-xs text-text-tertiary leading-tight">{BADGE_DESCRIPTIONS[badge]}</span>
                </div>
                {isSelected && (
                  <svg className="ml-auto flex-shrink-0 text-yellow-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
