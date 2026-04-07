import Image from "next/image";
import type { PlayerCardData, CardFilter } from "@/lib/types";

interface CardFrontProps {
  card: PlayerCardData;
}

// CSS filter strings for each preset
const FILTER_MAP: Record<CardFilter, string> = {
  none:      "none",
  vivid:     "contrast(1.4) saturate(1.4) brightness(1.05)",
  noir:      "grayscale(1)",
  golden:    "sepia(0.35) saturate(1.9) brightness(1.1) contrast(1.05)",
  chrome:    "contrast(1.25) saturate(1.5) brightness(1.08) hue-rotate(8deg)",
  faded:     "brightness(1.2) saturate(0.4) contrast(0.85)",
  matte:     "saturate(0.7) contrast(1.12) brightness(1.02)",
  cinematic: "contrast(1.45) saturate(0.9) brightness(0.92)",
};

// Silhouette SVG shown when no photo is uploaded
function PlayerSilhouette() {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/4 h-3/4 opacity-20">
      <ellipse cx="60" cy="45" rx="28" ry="28" fill="currentColor" />
      <path d="M10 160c0-33.137 22.386-60 50-60s50 26.863 50 60" fill="currentColor" />
    </svg>
  );
}

// Team badge — dark square with team logo or initials
function TeamBadge({ teamName, logoUrl }: { teamName: string; logoUrl: string | null }) {
  const initials = teamName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-radius-3 bg-bg-primary flex items-center justify-center overflow-hidden flex-shrink-0">
      {logoUrl ? (
        <Image src={logoUrl} alt={teamName} width={40} height={40} className="object-cover" />
      ) : (
        <span className="text-[9px] font-black text-yellow-500 tracking-wide leading-none text-center">
          {initials}
        </span>
      )}
    </div>
  );
}

// ─── Classic template ─────────────────────────────────────────────────────
function ClassicFront({ card }: { card: PlayerCardData }) {
  const cssFilter = FILTER_MAP[card.filter ?? "none"];
  return (
    <div className="w-full h-full flex flex-col rounded-radius-5 overflow-hidden bg-fg-secondary transition-template">
      {/* Header strip */}
      <div className="flex items-center gap-space-3 px-space-3 py-space-3 bg-fg-secondary flex-shrink-0">
        <TeamBadge teamName={card.teamName} logoUrl={card.teamLogoUrl} />
        <div className="flex flex-col justify-center min-w-0">
          {card.textRun ? (
            <div className="marquee-container">
              <span className="marquee-text text-size-3xl font-black uppercase leading-none tracking-tight text-fg-inverse">
                {card.firstName || "FIRST"}
              </span>
            </div>
          ) : (
            <span className="text-size-3xl font-black uppercase leading-none tracking-tight text-fg-inverse truncate">
              {card.firstName || "FIRST"}
            </span>
          )}
          <span className="text-size-sm font-semibold uppercase tracking-wider text-fg-inverse/70 truncate">
            {card.lastName || "LAST"}
          </span>
        </div>
      </div>

      {/* Photo area */}
      <div
        className="flex-1 relative overflow-hidden flex items-end justify-start transition-template"
        style={{
          backgroundColor: card.cardColor,
          backdropFilter: card.blurAmount > 0 ? `blur(${card.blurAmount}px)` : undefined,
        }}
      >
        {card.photoUrl ? (
          <Image
            src={card.photoUrl}
            alt={`${card.firstName} ${card.lastName}`}
            fill
            className="object-cover object-top transition-template"
            sizes="280px"
            style={{ filter: cssFilter }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-fg-inverse">
            <PlayerSilhouette />
          </div>
        )}
        {/* Jersey number */}
        <span className="relative z-10 text-size-5xl font-black text-border-white drop-shadow-lg px-space-3 pb-space-3 leading-none">
          {card.number}
        </span>
        {/* Position badge */}
        <span className="absolute top-space-2 right-space-2 z-10 text-[10px] font-bold uppercase tracking-wider bg-bg-primary/60 text-fg-primary px-space-2 py-[3px] rounded-radius-full">
          {card.position}
        </span>
      </div>
    </div>
  );
}

// ─── Modern template ──────────────────────────────────────────────────────
function ModernFront({ card }: { card: PlayerCardData }) {
  const cssFilter = FILTER_MAP[card.filter ?? "none"];
  return (
    <div
      className="w-full h-full relative rounded-radius-5 overflow-hidden transition-template"
      style={{ backgroundColor: card.cardColor }}
    >
      {/* Full-bleed photo */}
      {card.photoUrl ? (
        <Image
          src={card.photoUrl}
          alt={`${card.firstName} ${card.lastName}`}
          fill
          className="object-cover object-top transition-template"
          sizes="280px"
          style={{ filter: cssFilter }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-fg-inverse">
          <PlayerSilhouette />
        </div>
      )}

      {/* Gradient overlay at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
      />

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-space-3 pb-space-3 flex items-end justify-between">
        <div className="flex flex-col min-w-0">
          {card.textRun ? (
            <div className="marquee-container">
              <span className="marquee-text text-size-2xl font-black uppercase leading-none text-border-white drop-shadow">
                {card.firstName || "FIRST"}
              </span>
            </div>
          ) : (
            <span className="text-size-2xl font-black uppercase leading-none text-border-white drop-shadow truncate">
              {card.firstName || "FIRST"}
            </span>
          )}
          <span className="text-size-xs font-semibold uppercase tracking-wider text-border-white/80 truncate">
            {card.lastName || "LAST"}
          </span>
        </div>
        <span className="text-size-5xl font-black text-border-white/70 leading-none drop-shadow">
          {card.number}
        </span>
      </div>

      {/* Position badge */}
      <span className="absolute top-space-2 right-space-2 z-20 text-[10px] font-bold uppercase tracking-wider bg-bg-primary/60 text-fg-primary px-space-2 py-[3px] rounded-radius-full">
        {card.position}
      </span>
    </div>
  );
}

// ─── Stats template ───────────────────────────────────────────────────────
function StatsFront({ card }: { card: PlayerCardData }) {
  const cssFilter = FILTER_MAP[card.filter ?? "none"];
  const stats = Object.entries(card.stats) as [string, number][];
  return (
    <div className="w-full h-full flex rounded-radius-5 overflow-hidden bg-fg-secondary transition-template">
      {/* Left: photo 40% */}
      <div
        className="relative overflow-hidden flex-shrink-0 transition-template"
        style={{ width: "40%", backgroundColor: card.cardColor }}
      >
        {card.photoUrl ? (
          <Image
            src={card.photoUrl}
            alt={`${card.firstName} ${card.lastName}`}
            fill
            className="object-cover object-top transition-template"
            sizes="120px"
            style={{ filter: cssFilter }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-fg-inverse">
            <PlayerSilhouette />
          </div>
        )}
      </div>

      {/* Right: info + stats 60% */}
      <div className="flex-1 flex flex-col bg-fg-secondary px-space-3 py-space-3 gap-space-2 min-w-0">
        {/* Name */}
        <div className="flex flex-col min-w-0">
          {card.textRun ? (
            <div className="marquee-container">
              <span className="marquee-text text-size-xl font-black uppercase leading-none tracking-tight text-fg-inverse">
                {card.firstName || "FIRST"}
              </span>
            </div>
          ) : (
            <span className="text-size-xl font-black uppercase leading-none tracking-tight text-fg-inverse truncate">
              {card.firstName || "FIRST"}
            </span>
          )}
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-inverse/60 truncate">
            {card.lastName || "LAST"}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-fg-inverse/10" />

        {/* Stats list */}
        <div className="flex flex-col gap-[5px] flex-1 justify-center">
          {stats.map(([key, val]) => (
            <div key={key} className="flex items-center justify-between gap-space-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-fg-inverse/50 flex-shrink-0">{key}</span>
              <div className="flex-1 h-[3px] rounded-full bg-fg-inverse/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-fg-inverse/60 transition-all duration-300"
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-fg-inverse tabular-nums flex-shrink-0">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────
export default function CardFront({ card }: CardFrontProps) {
  const template = card.template ?? "classic";

  if (template === "modern") return <ModernFront card={card} />;
  if (template === "stats")  return <StatsFront card={card} />;
  return <ClassicFront card={card} />;
}
