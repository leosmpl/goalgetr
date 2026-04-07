"use client";

import { motion, AnimatePresence } from "framer-motion";
import type {
  EditorTab,
  PlayerCardData,
  StatKey,
  BadgeType,
} from "@/lib/types";

import ColorsTab    from "./tabs/ColorsTab";
import IdentityTab  from "./tabs/IdentityTab";
import AvatarTab    from "./tabs/AvatarTab";
import PositionTab  from "./tabs/PositionTab";
import TeamTab      from "./tabs/TeamTab";

// ─── Tab config ───────────────────────────────────────────────────────────
interface TabConfig {
  id: EditorTab;
  label: string;
  icon: React.ReactNode;
}

function PaletteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const TABS: TabConfig[] = [
  { id: "colors",   label: "Colors",    icon: <PaletteIcon /> },
  { id: "identity", label: "Identity",  icon: <PersonIcon /> },
  { id: "avatar",   label: "Avatar",    icon: <CameraIcon /> },
  { id: "position", label: "Position",  icon: <StarIcon /> },
  { id: "team",     label: "Team",      icon: <ShieldIcon /> },
];

// ─── Tab panel slide variants ─────────────────────────────────────────────
const tabVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -16 },
};

// ─── Props ────────────────────────────────────────────────────────────────
interface EditorSheetProps {
  activeTab: EditorTab;
  card: PlayerCardData;
  overallRating: number;
  onTabChange: (tab: EditorTab) => void;
  onColorChange: (hex: string) => void;
  onFieldChange: (field: keyof PlayerCardData, value: string | number) => void;
  onStatChange: (key: StatKey, value: number) => void;
  onPhotoChange: (base64: string | null) => void;
  onTeamLogoChange: (base64: string | null) => void;
  onBadgeToggle: (badge: BadgeType) => void;
  onPositionChange: (pos: PlayerCardData["position"]) => void;
  onSave: () => void;
  isDirty: boolean;
}

export default function EditorSheet({
  activeTab,
  card,
  overallRating,
  onTabChange,
  onColorChange,
  onFieldChange,
  onStatChange,
  onPhotoChange,
  onTeamLogoChange,
  onBadgeToggle,
  onPositionChange,
  onSave,
  isDirty,
}: EditorSheetProps) {
  return (
    <motion.div
      className="flex flex-col bg-bg-secondary rounded-t-radius-8 overflow-hidden"
      style={{ height: "52dvh" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
    >
      {/* Drag indicator */}
      <div className="flex justify-center pt-space-2 pb-space-1 flex-shrink-0">
        <div className="w-10 h-1 rounded-radius-full bg-bg-quaternary" />
      </div>

      {/* ── Tab navigation ── */}
      <nav className="flex gap-space-1 px-space-3 pb-space-2 flex-shrink-0" aria-label="Editor sections">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative flex-1 flex flex-col items-center gap-[3px] py-space-2 rounded-radius-4
                transition-colors duration-150 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                ${isActive
                  ? "text-text-primary bg-bg-tertiary"
                  : "text-text-tertiary hover:text-text-secondary"
                }
              `}
            >
              {tab.icon}
              {/* Active underline */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-radius-full bg-bg-brand-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Tab panels ── */}
      <div className="flex-1 panel-scroll overflow-hidden relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="absolute inset-0 panel-scroll px-space-4 py-space-3"
          >
            {activeTab === "colors" && (
              <ColorsTab cardColor={card.cardColor} onColorChange={onColorChange} />
            )}
            {activeTab === "identity" && (
              <IdentityTab
                card={card}
                overallRating={overallRating}
                onFieldChange={onFieldChange}
                onStatChange={onStatChange}
              />
            )}
            {activeTab === "avatar" && (
              <AvatarTab
                photoUrl={card.photoUrl}
                teamLogoUrl={card.teamLogoUrl}
                onPhotoChange={onPhotoChange}
                onTeamLogoChange={onTeamLogoChange}
              />
            )}
            {activeTab === "position" && (
              <PositionTab
                position={card.position}
                badges={card.badges}
                onPositionChange={onPositionChange}
                onBadgeToggle={onBadgeToggle}
              />
            )}
            {activeTab === "team" && (
              <TeamTab
                teamName={card.teamName}
                teamLogoUrl={card.teamLogoUrl}
                onTeamNameChange={(v) => onFieldChange("teamName", v)}
                onTeamLogoChange={onTeamLogoChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Save button ── */}
      <div className="flex-shrink-0 px-space-4 pb-space-4 pt-space-2">
        <motion.button
          onClick={onSave}
          whileTap={{ scale: 0.97 }}
          disabled={!isDirty}
          className={`
            w-full py-space-4 rounded-radius-full text-size-base font-semibold
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-offset-bg-secondary focus-visible:ring-bg-brand-primary
            ${isDirty
              ? "bg-bg-brand-primary text-border-white"
              : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
            }
          `}
        >
          {isDirty ? "Save" : "No changes"}
        </motion.button>
      </div>
    </motion.div>
  );
}
