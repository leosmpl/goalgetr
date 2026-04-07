/**
 * StatusBar
 *
 * Transparent, edge-to-edge iOS status bar.
 * Content bleeds behind it — no background of its own.
 *
 * Color modes:
 *   "light" → white icons/text  (for dark backgrounds)
 *   "dark"  → black icons/text  (for light backgrounds)
 *
 * Figma node 17781:2399 · 402 × 62px
 * padding: 21px top / 19px bottom / 24px horizontal
 */

export interface StatusBarProps {
  /** Clock string to display. Defaults to "9:41". */
  time?: string;
  /**
   * Icon/text color mode.
   * "light" = white  (use on dark backgrounds)
   * "dark"  = black  (use on light backgrounds)
   */
  colorMode?: "light" | "dark";
}

export default function StatusBar({ time = "9:41", colorMode = "light" }: StatusBarProps) {
  const color = colorMode === "light" ? "var(--fg-primary)" : "var(--fg-inverse)";

  return (
    <div
      className="flex items-center justify-between w-full flex-shrink-0 pointer-events-none select-none"
      style={{
        height: "62px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingTop: "21px",
        paddingBottom: "19px",
        background: "transparent",
        position: "relative",
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      {/* Time */}
      <span
        style={{
          color,
          fontFamily: "var(--font-geist-sans, var(--font-sans))",
          fontWeight: 500,
          fontSize: "var(--text-base)",
          lineHeight: 1,
        }}
      >
        {time}
      </span>

      {/* System icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", color }}>
        {/* Cellular signal */}
        <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0"  y="9"  width="3" height="4"  rx="1" fill="currentColor" />
          <rect x="4"  y="6"  width="3" height="7"  rx="1" fill="currentColor" />
          <rect x="8"  y="3"  width="3" height="10" rx="1" fill="currentColor" />
          <rect x="12" y="0"  width="3" height="13" rx="1" fill="currentColor" />
          <rect x="16" y="0"  width="3" height="13" rx="1" fill="currentColor" fillOpacity="0.3" />
        </svg>

        {/* Wi-Fi */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 10.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" fill="currentColor" />
          <path d="M5.2 7.9a4.7 4.7 0 0 1 6.6 0l1.1-1.2a6.3 6.3 0 0 0-8.8 0l1.1 1.2Z" fill="currentColor" />
          <path d="M2.1 4.6a9.1 9.1 0 0 1 12.8 0l1.1-1.2A10.7 10.7 0 0 0 1 3.4l1.1 1.2Z" fill="currentColor" />
        </svg>

        {/* Battery */}
        <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
