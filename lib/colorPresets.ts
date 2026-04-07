/**
 * Card background colour presets — full spectrum palette.
 * 17 colours covering the complete hue wheel.
 * Values match the colour selector screenshot (Figma node 17794-1927).
 */
export interface ColorPreset {
  label: string;
  value: string; // hex
}

export const CARD_COLOR_PRESETS: ColorPreset[] = [
  { label: "Red",     value: "#EF4444" },
  { label: "Orange",  value: "#F97316" },
  { label: "Amber",   value: "#F59E0B" },
  { label: "Yellow",  value: "#FACC15" },
  { label: "Lime",    value: "#A3E635" },
  { label: "Green",   value: "#22C55E" },
  { label: "Emerald", value: "#10B981" },
  { label: "Teal",    value: "#14B8A6" },
  { label: "Cyan",    value: "#06B6D4" },
  { label: "Sky",     value: "#38BDF8" },
  { label: "Blue",    value: "#3B82F6" },
  { label: "Indigo",  value: "#6366F1" },
  { label: "Violet",  value: "#8B5CF6" },
  { label: "Purple",  value: "#A855F7" },
  { label: "Fuchsia", value: "#D946EF" },
  { label: "Pink",    value: "#EC4899" },
  { label: "Rose",    value: "#F43F5E" },
];
