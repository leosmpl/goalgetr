"use client";

import { motion } from "framer-motion";
import { usePlayerCard } from "@/hooks/usePlayerCard";
import EditorHeader    from "@/components/editor/EditorHeader";
import EditorSheet     from "@/components/editor/EditorSheet";
import PlayerCard      from "@/components/player-card/PlayerCard";
import StatusBar       from "@/components/device/StatusBar";
import HomeIndicator   from "@/components/device/HomeIndicator";

/**
 * Player Card Editor page.
 *
 * Layout (fixed 100dvh, no page scroll):
 *   ┌──────────────────────┐
 *   │  EditorHeader h-14   │
 *   ├──────────────────────┤
 *   │                      │
 *   │  Card preview flex-1 │  ← tap card to flip
 *   │                      │
 *   ├──────────────────────┤
 *   │  EditorSheet ~52dvh  │  ← tab nav + panel + save
 *   └──────────────────────┘
 *
 * The card-scene wrapper must NOT be inside an overflow:hidden container
 * to preserve the 3-D context on iOS Safari.
 */
export default function CardEditorPage() {
  const {
    card,
    isFlipped,
    activeTab,
    isDirty,
    overallRating,
    flipCard,
    setTab,
    updateField,
    updateStat,
    setPosition,
    setCardColor,
    setPhoto,
    setTeamLogo,
    toggleBadge,
    save,
  } = usePlayerCard();

  return (
    /* ── Workbench ──────────────────────────────────────────────────────
       Full-screen container with contrasting background. Centers the
       device frame on desktop; fills the screen on real phones.        */
    <div className="editor-layout min-h-[100dvh] w-full flex items-center justify-center bg-bg-tertiary">

      {/* ── Device frame ──────────────────────────────────────────────
          Fixed 402 × 874 px — mimics a phone viewport.
          Content inside scrolls; the frame itself stays anchored.      */}
      <div
        className="relative bg-bg-primary overflow-hidden"
        style={{
          width: "402px",
          height: "874px",
          maxWidth: "100vw",
          maxHeight: "100dvh",
          borderRadius: "var(--radius-11)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* ── Safe Area overlays — float above all content ── */}
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
          <StatusBar colorMode="light" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
          <HomeIndicator colorMode="light" />
        </div>

        {/* ── App content — fills full frame, padded under safe areas ── */}
        <div
          className="flex flex-col h-full"
          style={{ paddingTop: "62px", paddingBottom: "34px" }}
        >
          {/* Header */}
          <EditorHeader />

          {/* Card preview */}
          <div className="flex-1 flex flex-col items-center justify-center gap-space-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 22 }}
            >
              <PlayerCard
                card={card}
                isFlipped={isFlipped}
                overallRating={overallRating}
                onFlip={flipCard}
              />
            </motion.div>

            {/* Flip hint */}
            <motion.span
              className="text-size-xs text-text-tertiary pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFlipped ? 0 : 0.6 }}
              transition={{ delay: isFlipped ? 0 : 1.5, duration: 0.4 }}
            >
              Tap card to flip
            </motion.span>
          </div>

          {/* Editor bottom sheet */}
          <EditorSheet
            activeTab={activeTab}
            card={card}
            overallRating={overallRating}
            onTabChange={setTab}
            onColorChange={setCardColor}
            onFieldChange={updateField}
            onStatChange={updateStat}
            onPhotoChange={setPhoto}
            onTeamLogoChange={setTeamLogo}
            onBadgeToggle={toggleBadge}
            onPositionChange={setPosition}
            onSave={save}
            isDirty={isDirty}
          />
        </div>
      </div>
    </div>
  );
}
