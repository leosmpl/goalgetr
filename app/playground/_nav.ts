// Shared playground navigation — single source of truth for the left sidebar.
// Every playground page imports NAV_ITEMS from here.
// Rule: SYSTEM_NAV is permanent; COMPONENT_NAV mirrors the ui-components Component Index.

export interface NavItem {
  name: string;
  href: string;
  description: string;
  system?: boolean;
}

// ── System pages — always pinned at top, never removed ──────────────────
export const SYSTEM_NAV: NavItem[] = [
  {
    name: "Tokens",
    href: "/playground/tokens",
    description: "Design token reference — colors, spacing, radius, typography",
    system: true,
  },
];

// ── Component pages — mirrors ui-components Component Index ─────────────
export const COMPONENT_NAV: NavItem[] = [
  {
    name: "Player Card",
    href: "/playground/player-card",
    description: "Flippable trading card with front/back faces",
  },
];

export const NAV_ITEMS: NavItem[] = [...SYSTEM_NAV, ...COMPONENT_NAV];
