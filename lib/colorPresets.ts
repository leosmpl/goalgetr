/**
 * Card background colour presets.
 * Every hex value is sourced directly from Tokens/_Primitive colors.json.
 * No invented values — see token source column.
 */
export interface ColorPreset {
  label: string;
  value: string;       // hex from token file
  tokenSource: string; // token reference for traceability
}

export const CARD_COLOR_PRESETS: ColorPreset[] = [
  { label: "Ember",   value: "#FFB938", tokenSource: "Yellow/500" },
  { label: "Sunrise", value: "#FFCF69", tokenSource: "Yellow/400" },
  { label: "Gold",    value: "#DB9628", tokenSource: "Yellow/600" },
  { label: "Ocean",   value: "#2C7FFF", tokenSource: "Blue/500 = bg-brand-primary" },
  { label: "Teal",    value: "#21A77C", tokenSource: "Teal/500 = bg-success-primary" },
  { label: "Flame",   value: "#FD603D", tokenSource: "Red/500 = bg-error-primary" },
  { label: "Ash",     value: "#44403C", tokenSource: "Neutral/700 = bg-quaternary" },
  { label: "Ice",     value: "#E7E5E4", tokenSource: "Neutral/200 = fg-tertiary" },
];
