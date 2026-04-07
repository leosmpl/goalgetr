"use client";

import { motion } from "framer-motion";
import { usePlayerCard } from "@/hooks/usePlayerCard";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSheet  from "@/components/editor/EditorSheet";
import PlayerCard   from "@/components/player-card/PlayerCard";

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
    <main className="editor-layout flex flex-col h-[100dvh] bg-bg-primary overflow-hidden max-w-sm mx-auto">
      {/* Header */}
      <EditorHeader />

      {/* Card preview — flex-1, no overflow clipping so 3D flip works */}
      <motion.div
        className="flex-1 flex items-center justify-center"
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

        {/* Flip hint */}
        {!isFlipped && (
          <motion.span
            className="absolute bottom-[53dvh] text-size-xs text-text-tertiary pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            Tap card to flip
          </motion.span>
        )}
      </motion.div>

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
    </main>
  );
}
