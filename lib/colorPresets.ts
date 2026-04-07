/**
 * Card background colour presets — full spectrum palette.
 * Hex values sourced directly from Figma node 17794-1959.
 */
export interface ColorPreset {
  label: string;
  value: string; // hex
}

export const CARD_COLOR_PRESETS: ColorPreset[] = [
  { label: "Red",     value: "#FF6467" },
  { label: "Orange",  value: "#FF8904" },
  { label: "Amber",   value: "#FFB900" },
  { label: "Yellow",  value: "#FDC700" },
  { label: "Lime",    value: "#9AE600" },
  { label: "Green",   value: "#05DF72" },
  { label: "Emerald", value: "#00D492" },
  { label: "Teal",    value: "#00D5BE" },
  { label: "Cyan",    value: "#00D3F2" },
  { label: "Sky",     value: "#00BCFF" },
  { label: "Blue",    value: "#51A2FF" },
  { label: "Indigo",  value: "#7C86FF" },
  { label: "Violet",  value: "#A684FF" },
  { label: "Purple",  value: "#C27AFF" },
  { label: "Fuchsia", value: "#ED6AFF" },
  { label: "Pink",    value: "#FB64B6" },
  { label: "Rose",    value: "#FF637E" },
];
