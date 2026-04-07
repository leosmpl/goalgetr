"use client";

import { motion } from "framer-motion";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import type { PlayerCardData } from "@/lib/types";

interface PlayerCardProps {
  card: PlayerCardData;
  isFlipped: boolean;
  overallRating: number;
  onFlip: () => void;
}

/**
 * 3-D flip card using Framer Motion.
 *
 * Architecture:
 *  - Outer wrapper sets perspective via className="card-scene"
 *  - motion.div uses animate={{ rotateY }} with spring physics
 *  - CardFront/CardBack each use style={{ backfaceVisibility:"hidden" }}
 *    and the back face is pre-rotated 180° so it appears after the flip
 *
 * iOS Safari note: preserve-3d on a scrollable ancestor collapses the 3D
 * context. The card must not be inside overflow:hidden, so the card-scene
 * wrapper is kept outside the EditorSheet scroll container.
 */
export default function PlayerCard({
  card,
  isFlipped,
  overallRating,
  onFlip,
}: PlayerCardProps) {
  return (
    <div
      className="card-scene w-[220px] h-[340px] cursor-pointer select-none"
      onClick={onFlip}
      role="button"
      aria-label={isFlipped ? "Flip to card front" : "Flip to card back"}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onFlip()}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-radius-5 shadow-2xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <CardFront card={card} />
        </div>

        {/* Back face — pre-rotated so it faces away initially */}
        <div
          className="absolute inset-0 rounded-radius-5 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardBack card={card} overallRating={overallRating} />
        </div>
      </motion.div>
    </div>
  );
}
