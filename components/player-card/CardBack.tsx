import type { PlayerCardData, StatKey, BadgeType } from "@/lib/types";

interface CardBackProps {
  card: PlayerCardData;
  overallRating: number;
}

const STAT_ROWS: [StatKey, StatKey, StatKey][] = [
  ["SKA", "SHO", "PUC"],
  ["GAM", "FIT", "CHA"],
];

const STAT_LABELS: Record<StatKey, string> = {
  SKA: "SKA", SHO: "SHO", PUC: "PUC",
  GAM: "GAM", FIT: "FIT", CHA: "CHA",
};

const BADGE_ICONS: Record<BadgeType, string> = {
  Captain:   "C",
  Dangler:   "D",
  Sniper:    "S",
  Playmaker: "P",
  Enforcer:  "E",
};

function HexBadge({ badge }: { badge: BadgeType }) {
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <div className="hex-clip w-11 h-12 bg-yellow-500 flex items-center justify-center">
        <span className="text-size-lg font-black text-bg-primary leading-none">
          {BADGE_ICONS[badge]}
        </span>
      </div>
      <span className="text-size-3xs font-bold uppercase tracking-wider text-fg-tertiary">
        {badge}
      </span>
    </div>
  );
}

export default function CardBack({ card, overallRating }: CardBackProps) {
  return (
    <div className="w-full h-full flex flex-col rounded-radius-5 overflow-hidden bg-fg-secondary">
      {/* ── Name header ── */}
      <div className="flex flex-col items-center pt-space-4 pb-space-2 px-space-4">
        <span className="text-size-sm font-black uppercase tracking-widest text-fg-inverse/60 leading-none">
          {card.firstName || "FIRST"}
        </span>
        <span className="text-size-base font-black uppercase tracking-widest text-fg-inverse leading-tight">
          {card.lastName || "LAST"}
        </span>
      </div>

      {/* ── Overall rating ── */}
      <div className="flex flex-col items-center pb-space-3">
        <span className="text-size-7xl font-black leading-none text-fg-inverse">
          {overallRating}
        </span>
        <span className="text-size-2xs font-bold tracking-[0.2em] text-text-brand uppercase">
          GG
        </span>
      </div>

      {/* ── Divider ── */}
      <div className="mx-space-4 border-t border-fg-inverse/10" />

      {/* ── Stats grid ── */}
      <div className="flex-1 flex flex-col justify-center gap-space-2 px-space-4 py-space-3">
        {STAT_ROWS.map((row, ri) => (
          <div key={ri} className="grid grid-cols-3 gap-space-2">
            {row.map((key, ci) => (
              <div key={key} className="flex flex-col items-center">
                {/* divider between columns */}
                {ci === 1 && (
                  <div className="hidden" />
                )}
                <span className="text-size-xl font-black text-fg-inverse leading-none">
                  {card.stats[key]}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                  {STAT_LABELS[key]}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Vertical divider row */}
        <div className="flex justify-center gap-space-3 opacity-20">
          <div className="w-px h-8 bg-fg-inverse" />
        </div>
      </div>

      {/* ── Badge strip ── */}
      <div className="bg-bg-primary px-space-3 py-space-3 flex justify-center gap-space-4 rounded-b-radius-5">
        {card.badges.length > 0 ? (
          card.badges.map((badge) => (
            <HexBadge key={badge} badge={badge} />
          ))
        ) : (
          <span className="text-size-xs text-text-secondary opacity-50 py-space-2">
            No badges selected
          </span>
        )}
      </div>
    </div>
  );
}
