import type { Config } from "tailwindcss";

/**
 * All colour, spacing, radius, and typography values come directly from
 * /Tokens/*.json (design-tokens skill).  No hardcoded values live in component files.
 *
 * Token source → Tailwind utility class mapping:
 *   bg-primary       → bg-bg-primary / text-bg-primary / etc.
 *   fg-primary       → bg-fg-primary / text-fg-primary / etc.
 *   text-primary     → text-text-primary / etc.
 *   border-primary   → border-border-primary / etc.
 *   yellow-500       → bg-yellow-500 (Primitive: Yellow/500 #FFB938)
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors from Tokens/1.Color Modes.json + _Primitive colors.json ──
      colors: {
        // Backgrounds
        "bg-primary":          "#0C0A09", // Neutral/950
        "bg-secondary":        "#1B1917", // Neutral/900
        "bg-tertiary":         "#282524", // Neutral/800
        "bg-quaternary":       "#44403C", // Neutral/700
        "bg-inverse":          "#FFFFFF", // Common/White
        "bg-brand-primary":    "#2C7FFF", // Blue/500
        "bg-brand-secondary":  "#BFDBFF", // Blue/200
        "bg-error-primary":    "#FD603D", // Red/500
        "bg-error-secondary":  "#FFB690", // Red/200
        "bg-success-primary":  "#21A77C", // Teal/500
        "bg-success-secondary":"#8FEFC8", // Teal/200
        // Foregrounds
        "fg-primary":          "#FAFAF9", // Neutral/50
        "fg-secondary":        "#F5F5F4", // Neutral/100
        "fg-tertiary":         "#E7E5E4", // Neutral/200
        "fg-quaternary":       "#D6D3D1", // Neutral/300
        "fg-inverse":          "#0C0A09", // Neutral/950
        "fg-brand":            "#DBEAFE", // Blue/100
        "fg-brand-secondary":  "#2C7FFF", // Blue/500
        "fg-error-primary":    "#FFD1AD", // Red/100
        "fg-error-secondary":  "#FD603D", // Red/500
        "fg-success-primary":  "#B0FFE0", // Teal/100
        "fg-success-secondary":"#21A77C", // Teal/500
        // Text
        "text-primary":        "#F5F5F4", // Neutral/100
        "text-secondary":      "#D6D3D1", // Neutral/300
        "text-tertiary":       "#A5A09C", // Neutral/400
        "text-inverse":        "#0C0A09", // Neutral/950
        "text-brand":          "#2C7FFF", // Blue/500
        "text-error":          "#FD603D", // Red/500
        "text-success":        "#21A77C", // Teal/500
        // Borders
        "border-primary":      "#282524", // Neutral/800
        "border-secondary":    "#57534E", // Neutral/600
        "border-tertiary":     "#A5A09C", // Neutral/400
        "border-white":        "#FFFFFF", // Common/White
        // Primitive Yellow scale (card background accent presets)
        "yellow-300":          "#FFDD87", // Yellow/300
        "yellow-400":          "#FFCF69", // Yellow/400
        "yellow-500":          "#FFB938", // Yellow/500 — matches design reference orange
        "yellow-600":          "#DB9628", // Yellow/600
        "yellow-700":          "#B7751C", // Yellow/700
      },

      // ── Spacing from Tokens/3.Spacing.json ──
      spacing: {
        "space-0":  "0px",
        "space-1":  "4px",
        "space-2":  "8px",
        "space-3":  "12px",
        "space-4":  "16px",
        "space-5":  "20px",
        "space-6":  "24px",
        "space-7":  "28px",
        "space-8":  "32px",
        "space-9":  "36px",
        "space-10": "40px",
        "space-11": "44px",
        "space-12": "48px",
        "space-14": "56px",
        "space-16": "64px",
        "space-20": "80px",
        "space-24": "96px",
        "space-27": "108px",
        "space-32": "128px",
      },

      // ── Border radius from Tokens/2.Radius.json ──
      borderRadius: {
        "radius-0":    "0px",
        "radius-1":    "2px",
        "radius-2":    "4px",
        "radius-3":    "6px",
        "radius-4":    "8px",
        "radius-5":    "12px",
        "radius-6":    "16px",
        "radius-7":    "20px",
        "radius-8":    "24px",
        "radius-9":    "32px",
        "radius-11":   "48px",
        "radius-full": "9999px",
      },

      // ── Typography from Tokens/4.Typography.json ──
      fontFamily: {
        geist: ["var(--font-geist-sans)", "sans-serif"],
      },
      fontSize: {
        "size-3xs":  ["8px",  { lineHeight: "12px" }],
        "size-2xs":  ["10px", { lineHeight: "14px" }],
        "size-xs":   ["12px", { lineHeight: "16px" }],
        "size-sm":   ["14px", { lineHeight: "20px" }],
        "size-base": ["16px", { lineHeight: "24px" }],
        "size-lg":   ["18px", { lineHeight: "28px" }],
        "size-xl":   ["20px", { lineHeight: "28px" }],
        "size-2xl":  ["24px", { lineHeight: "32px" }],
        "size-3xl":  ["30px", { lineHeight: "36px" }],
        "size-4xl":  ["36px", { lineHeight: "40px" }],
        "size-5xl":  ["48px", { lineHeight: "48px" }],
        "size-6xl":  ["60px", { lineHeight: "60px" }],
        "size-7xl":  ["72px", { lineHeight: "72px" }],
      },
    },
  },
  plugins: [],
};

export default config;
