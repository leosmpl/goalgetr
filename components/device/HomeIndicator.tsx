/**
 * HomeIndicator
 *
 * Transparent, edge-to-edge iOS home indicator.
 * Content scrolls behind it — no background of its own.
 *
 * Adaptive pill color:
 *   "light" → white pill  (for dark backgrounds)
 *   "dark"  → black pill  (for light backgrounds)
 *
 * Figma node 17781:2366 · 402 × 34px
 * Pill: 144 × 5px, border-radius 100px, 8px from bottom edge
 */

export interface HomeIndicatorProps {
  /**
   * Pill color mode.
   * "light" = white pill  (use on dark backgrounds)
   * "dark"  = black pill  (use on light backgrounds)
   */
  colorMode?: "light" | "dark";
}

export default function HomeIndicator({ colorMode = "light" }: HomeIndicatorProps) {
  const pillColor = colorMode === "light" ? "var(--fg-primary)" : "var(--fg-inverse)";

  return (
    <div
      className="relative flex-shrink-0 w-full pointer-events-none select-none"
      style={{ height: "34px", background: "transparent", zIndex: 10 }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "8px",
          width: "144px",
          height: "5px",
          borderRadius: "100px",
          background: pillColor,
        }}
      />
    </div>
  );
}
