"use client";

import { useReducer, useMemo, useEffect, useCallback } from "react";
import type {
  EditorState,
  EditorAction,
  EditorTab,
  PlayerCardData,
  StatKey,
  BadgeType,
} from "@/lib/types";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";

// ─── Default seed card ────────────────────────────────────────────────────
const DEFAULT_CARD: PlayerCardData = {
  firstName: "ALEX",
  lastName: "MERCER",
  number: 96,
  position: "C",
  teamName: "GOALGETR FC",
  teamLogoUrl: null,
  photoUrl: null,
  cardColor: CARD_COLOR_PRESETS[0].value, // Ember / Yellow/500
  stats: { SKA: 82, SHO: 79, PUC: 85, GAM: 88, FIT: 74, CHA: 91 },
  badges: ["Captain", "Dangler"],
};

const INITIAL_STATE: EditorState = {
  card: DEFAULT_CARD,
  isFlipped: false,
  activeTab: "colors",
  isDirty: false,
};

const STORAGE_KEY = "goalgetr-card";
const MAX_BADGES = 3;

// ─── Reducer ─────────────────────────────────────────────────────────────
function reducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, isDirty: true, card: { ...state.card, firstName: action.payload } };
    case "SET_LAST_NAME":
      return { ...state, isDirty: true, card: { ...state.card, lastName: action.payload } };
    case "SET_NUMBER":
      return { ...state, isDirty: true, card: { ...state.card, number: action.payload } };
    case "SET_POSITION":
      return { ...state, isDirty: true, card: { ...state.card, position: action.payload } };
    case "SET_TEAM_NAME":
      return { ...state, isDirty: true, card: { ...state.card, teamName: action.payload } };
    case "SET_CARD_COLOR":
      return { ...state, isDirty: true, card: { ...state.card, cardColor: action.payload } };
    case "SET_PHOTO":
      return { ...state, isDirty: true, card: { ...state.card, photoUrl: action.payload } };
    case "SET_TEAM_LOGO":
      return { ...state, isDirty: true, card: { ...state.card, teamLogoUrl: action.payload } };
    case "SET_STAT":
      return {
        ...state,
        isDirty: true,
        card: {
          ...state.card,
          stats: { ...state.card.stats, [action.payload.key]: action.payload.value },
        },
      };
    case "TOGGLE_BADGE": {
      const { badges } = state.card;
      const exists = badges.includes(action.payload);
      if (!exists && badges.length >= MAX_BADGES) return state; // max enforced silently
      const next = exists
        ? badges.filter((b) => b !== action.payload)
        : [...badges, action.payload];
      return { ...state, isDirty: true, card: { ...state.card, badges: next } };
    }
    case "TOGGLE_FLIP":
      return { ...state, isFlipped: !state.isFlipped };
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    case "MARK_SAVED":
      return { ...state, isDirty: false };
    case "HYDRATE":
      return { ...state, card: action.payload, isDirty: false };
    default:
      return state;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────
export function usePlayerCard() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PlayerCardData;
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // Malformed data — use defaults
    }
  }, []);

  // Derived: overall rating (weighted average of 6 stats)
  const overallRating = useMemo(() => {
    const weights: Record<StatKey, number> = {
      SKA: 0.2, SHO: 0.2, PUC: 0.2,
      GAM: 0.15, FIT: 0.1, CHA: 0.15,
    };
    return Math.round(
      (Object.entries(state.card.stats) as [StatKey, number][]).reduce(
        (sum, [key, val]) => sum + val * weights[key],
        0
      )
    );
  }, [state.card.stats]);

  // Actions
  const flipCard    = useCallback(() => dispatch({ type: "TOGGLE_FLIP" }), []);
  const setTab      = useCallback((tab: EditorTab) => dispatch({ type: "SET_TAB", payload: tab }), []);
  const setCardColor = useCallback((hex: string) => dispatch({ type: "SET_CARD_COLOR", payload: hex }), []);
  const setPhoto    = useCallback((b64: string | null) => dispatch({ type: "SET_PHOTO", payload: b64 }), []);
  const setTeamLogo = useCallback((b64: string | null) => dispatch({ type: "SET_TEAM_LOGO", payload: b64 }), []);
  const toggleBadge = useCallback((badge: BadgeType) => dispatch({ type: "TOGGLE_BADGE", payload: badge }), []);

  const updateField = useCallback(
    (field: keyof PlayerCardData, value: string | number | null) => {
      switch (field) {
        case "firstName": dispatch({ type: "SET_FIRST_NAME", payload: value as string }); break;
        case "lastName":  dispatch({ type: "SET_LAST_NAME",  payload: value as string }); break;
        case "number":    dispatch({ type: "SET_NUMBER",     payload: value as number }); break;
        case "teamName":  dispatch({ type: "SET_TEAM_NAME",  payload: value as string }); break;
      }
    },
    []
  );

  const updateStat = useCallback(
    (key: StatKey, value: number) => dispatch({ type: "SET_STAT", payload: { key, value } }),
    []
  );

  const setPosition = useCallback(
    (pos: PlayerCardData["position"]) => dispatch({ type: "SET_POSITION", payload: pos }),
    []
  );

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.card));
    } catch {
      // Storage unavailable — continue silently
    }
    dispatch({ type: "MARK_SAVED" });
  }, [state.card]);

  return {
    card:          state.card,
    isFlipped:     state.isFlipped,
    activeTab:     state.activeTab,
    isDirty:       state.isDirty,
    overallRating,
    flipCard,
    setTab,
    updateField,
    updateStat,
    setPosition,
    setCardColor,
    setPhoto,
    setTeamLogo,
    toggleBadge,
    save,
  };
}
