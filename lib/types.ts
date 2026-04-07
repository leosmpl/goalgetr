// ─── Player Card Data ──────────────────────────────────────────────────────
export type BadgeType = "Captain" | "Dangler" | "Sniper" | "Playmaker" | "Enforcer";

export type StatKey = "SKA" | "SHO" | "PUC" | "GAM" | "FIT" | "CHA";

export interface PlayerStats {
  SKA: number;
  SHO: number;
  PUC: number;
  GAM: number;
  FIT: number;
  CHA: number;
}

export interface PlayerCardData {
  firstName: string;
  lastName: string;
  number: number;
  position: "C" | "LW" | "RW" | "D" | "G";
  teamName: string;
  teamLogoUrl: string | null;
  photoUrl: string | null;
  /** hex string — must be one of CARD_COLOR_PRESETS or a custom value */
  cardColor: string;
  stats: PlayerStats;
  badges: BadgeType[];
}

// ─── Editor State ──────────────────────────────────────────────────────────
export type EditorTab = "colors" | "identity" | "avatar" | "position" | "team";

// ─── Reducer Actions ──────────────────────────────────────────────────────
export type EditorAction =
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_NUMBER"; payload: number }
  | { type: "SET_POSITION"; payload: PlayerCardData["position"] }
  | { type: "SET_TEAM_NAME"; payload: string }
  | { type: "SET_CARD_COLOR"; payload: string }
  | { type: "SET_PHOTO"; payload: string | null }
  | { type: "SET_TEAM_LOGO"; payload: string | null }
  | { type: "SET_STAT"; payload: { key: StatKey; value: number } }
  | { type: "TOGGLE_BADGE"; payload: BadgeType }
  | { type: "TOGGLE_FLIP" }
  | { type: "SET_TAB"; payload: EditorTab }
  | { type: "MARK_SAVED" }
  | { type: "HYDRATE"; payload: PlayerCardData };

export interface EditorState {
  card: PlayerCardData;
  isFlipped: boolean;
  activeTab: EditorTab;
  isDirty: boolean;
}
