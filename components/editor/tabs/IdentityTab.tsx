"use client";

import type { PlayerCardData, StatKey } from "@/lib/types";

interface IdentityTabProps {
  card: PlayerCardData;
  overallRating: number;
  onFieldChange: (field: keyof PlayerCardData, value: string | number) => void;
  onStatChange: (key: StatKey, value: number) => void;
}

const STAT_KEYS: StatKey[] = ["SKA", "SHO", "PUC", "GAM", "FIT", "CHA"];

const inputClass =
  "w-full bg-bg-tertiary border border-border-primary rounded-radius-4 px-space-3 py-space-2 text-size-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-bg-brand-primary focus:ring-1 focus:ring-bg-brand-primary transition-colors duration-150";

const labelClass = "block text-size-xs font-semibold text-text-secondary mb-space-1 uppercase tracking-wider";

export default function IdentityTab({
  card,
  overallRating,
  onFieldChange,
  onStatChange,
}: IdentityTabProps) {
  return (
    <div className="flex flex-col gap-space-5 pb-space-4">
      {/* ── Name row ── */}
      <div className="grid grid-cols-2 gap-space-3">
        <div>
          <label htmlFor="firstName" className={labelClass}>First name</label>
          <input
            id="firstName"
            type="text"
            value={card.firstName}
            onChange={(e) => onFieldChange("firstName", e.target.value.toUpperCase())}
            placeholder="FIRST"
            maxLength={12}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last name</label>
          <input
            id="lastName"
            type="text"
            value={card.lastName}
            onChange={(e) => onFieldChange("lastName", e.target.value.toUpperCase())}
            placeholder="LAST"
            maxLength={16}
            className={inputClass}
          />
        </div>
      </div>

      {/* ── Number + Overall ── */}
      <div className="grid grid-cols-2 gap-space-3">
        <div>
          <label htmlFor="jerseyNumber" className={labelClass}>Jersey #</label>
          <input
            id="jerseyNumber"
            type="number"
            value={card.number}
            onChange={(e) => {
              const v = Math.min(99, Math.max(1, parseInt(e.target.value) || 1));
              onFieldChange("number", v);
            }}
            min={1}
            max={99}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Overall (GG)</label>
          <div className={`${inputClass} flex items-center justify-between cursor-not-allowed opacity-60`}>
            <span className="text-size-xl font-black text-text-primary">{overallRating}</span>
            <span className="text-size-xs text-text-tertiary">auto</span>
          </div>
        </div>
      </div>

      {/* ── Stats sliders ── */}
      <div>
        <p className={labelClass}>Stats</p>
        <div className="flex flex-col gap-space-3">
          {STAT_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-space-3">
              <span className="text-size-xs font-bold text-text-secondary uppercase w-8 flex-shrink-0">
                {key}
              </span>
              <input
                type="range"
                min={0}
                max={99}
                value={card.stats[key]}
                onChange={(e) => onStatChange(key, parseInt(e.target.value))}
                aria-label={`${key} stat`}
                className="flex-1 h-1.5 rounded-radius-full appearance-none bg-bg-quaternary cursor-pointer"
              />
              <span className="text-size-sm font-bold text-text-primary w-6 text-right flex-shrink-0">
                {card.stats[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
