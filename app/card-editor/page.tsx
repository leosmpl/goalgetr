"use client";

import { motion } from "framer-motion";
import { usePlayerCard } from "@/hooks/usePlayerCard";
import EditorHeader  from "@/components/editor/EditorHeader";
import EditorSheet   from "@/components/editor/EditorSheet";
import PlayerCard    from "@/components/player-card/PlayerCard";
import StatusBar     from "@/components/device/StatusBar";
import HomeIndicator from "@/components/device/HomeIndicator";

export default function CardEditorPage() {
  const {
    card,
    isFlipped,
    activeTab,
    flipCard,
    setTab,
    setCardColor,
    setPhoto,
    setTemplate,
    setFilter,
    toggleTextRun,
    setBlur,
    overallRating,
  } = usePlayerCard();

  return (
    /* ── Workbench ── */
    <div className="editor-layout h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-bg-tertiary">

      {/* ── Device frame 402 × 874 ── */}
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
        {/* Safe Area overlays — float above all content */}
        <div className="absolute inset-x-0 top-0 z-10 pointer-events-none">
          <StatusBar colorMode="light" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
          <HomeIndicator colorMode="light" />
        </div>

        {/* App content — padded under safe areas */}
        <div className="flex flex-col h-full" style={{ paddingTop: "62px", paddingBottom: "34px" }}>
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

          {/* Editor sheet — 4 tabs */}
          <EditorSheet
            activeTab={activeTab}
            card={card}
            onTabChange={setTab}
            onColorChange={setCardColor}
            onPhotoChange={setPhoto}
            onTemplateChange={setTemplate}
            onFilterChange={setFilter}
            onTextRunToggle={toggleTextRun}
            onBlurChange={setBlur}
          />
        </div>
      </div>
    </div>
  );
}
