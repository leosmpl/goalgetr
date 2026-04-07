import Image from "next/image";
import type { PlayerCardData } from "@/lib/types";

interface CardFrontProps {
  card: PlayerCardData;
}

// Silhouette SVG shown when no photo is uploaded
function PlayerSilhouette() {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3/4 h-3/4 opacity-20"
    >
      <ellipse cx="60" cy="45" rx="28" ry="28" fill="currentColor" />
      <path
        d="M10 160c0-33.137 22.386-60 50-60s50 26.863 50 60"
        fill="currentColor"
      />
    </svg>
  );
}

// Team badge — dark square with team logo or initials
function TeamBadge({ teamName, logoUrl }: { teamName: string; logoUrl: string | null }) {
  const initials = teamName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

export default function CardFront({ card }: CardFrontProps) {
  return (
    <div className="w-full h-full flex flex-col rounded-radius-5 overflow-hidden bg-fg-secondary">
      {/* ── Header strip ── */}
      <div className="flex items-center gap-space-3 px-space-3 py-space-3 bg-fg-secondary">
        <TeamBadge teamName={card.teamName} logoUrl={card.teamLogoUrl} />
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-size-3xl font-black uppercase leading-none tracking-tight text-fg-inverse truncate">
            {card.firstName || "FIRST"}
          </span>
          <span className="text-size-sm font-semibold uppercase tracking-wider text-fg-inverse/70 truncate">
            {card.lastName || "LAST"}
          </span>
        </div>
      </div>

      {/* ── Photo area ── */}
      <div
        className="flex-1 relative overflow-hidden flex items-end justify-start"
        style={{ backgroundColor: card.cardColor }}
      >
        {card.photoUrl ? (
          <Image
            src={card.photoUrl}
            alt={`${card.firstName} ${card.lastName}`}
            fill
            className="object-cover object-top"
            sizes="280px"
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
