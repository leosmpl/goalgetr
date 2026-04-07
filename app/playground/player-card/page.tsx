"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import { NAV_ITEMS } from "../_nav";
import PlayerCard from "@/components/player-card/PlayerCard";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";
import type { PlayerCardData, BadgeType } from "@/lib/types";

// ─── TOC ─────────────────────────────────────────────────────────────────
const TOC = [
  { id: "preview",       label: "Preview"       },
  { id: "code",          label: "Code"          },
  { id: "props",         label: "Props"         },
  { id: "tokens",        label: "Tokens"        },
  { id: "accessibility", label: "Accessibility" },
];

// ─── Knob state = a subset of PlayerCardData + editor state ──────────────
interface KnobState {
  firstName: string;
  lastName: string;
  number: number;
  position: PlayerCardData["position"];
  cardColor: string;
  isFlipped: boolean;
  skaStat: number;
  shoStat: number;
  pucStat: number;
  gamStat: number;
  fitStat: number;
  chaStat: number;
  badges: BadgeType[];
}

const DEFAULTS: KnobState = {
  firstName: "ALEX",
  lastName: "MERCER",
  number: 96,
  position: "C",
  cardColor: CARD_COLOR_PRESETS[0].value,
  isFlipped: false,
  skaStat: 82,
  shoStat: 79,
  pucStat: 85,
  gamStat: 88,
  fitStat: 74,
  chaStat: 91,
  badges: ["Captain", "Dangler"],
};

// Build a PlayerCardData from knobs
function buildCard(k: KnobState): PlayerCardData {
  return {
    firstName: k.firstName,
    lastName: k.lastName,
    number: k.number,
    position: k.position,
    teamName: "GOALGETR FC",
    teamLogoUrl: null,
    photoUrl: null,
    cardColor: k.cardColor,
    stats: { SKA: k.skaStat, SHO: k.shoStat, PUC: k.pucStat, GAM: k.gamStat, FIT: k.fitStat, CHA: k.chaStat },
    badges: k.badges,
    template: "classic",
    filter: "none",
    textRun: false,
    blurAmount: 0,
  };
}

// Compute overall rating
function computeRating(k: KnobState) {
  const w = { SKA: 0.2, SHO: 0.2, PUC: 0.2, GAM: 0.15, FIT: 0.1, CHA: 0.15 };
  return Math.round(
    k.skaStat * w.SKA + k.shoStat * w.SHO + k.pucStat * w.PUC +
    k.gamStat * w.GAM + k.fitStat * w.FIT + k.chaStat * w.CHA
  );
}

// Build the JSX snippet
function buildSnippet(k: KnobState): string {
  const lines: string[] = ["<PlayerCard"];
  if (k.firstName !== DEFAULTS.firstName) lines.push(`  firstName="${k.firstName}"`);
  if (k.lastName  !== DEFAULTS.lastName)  lines.push(`  lastName="${k.lastName}"`);
  if (k.number    !== DEFAULTS.number)    lines.push(`  number={${k.number}}`);
  if (k.position  !== DEFAULTS.position)  lines.push(`  position="${k.position}"`);
  if (k.cardColor !== DEFAULTS.cardColor) lines.push(`  cardColor="${k.cardColor}"`);
  if (k.isFlipped)                        lines.push(`  isFlipped`);
  lines.push(`  onFlip={() => setFlipped(!flipped)}`);
  lines.push(`  overallRating={${computeRating(k)}}`);
  lines.push("/>");
  return lines.join("\n");
}

// ─── Toggle pill ─────────────────────────────────────────────────────────
function TogglePill({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className={styles.knobToggle}>
      <div className={styles.knobTogglePill} data-on={on} onClick={() => onChange(!on)}>
        <div className={styles.knobToggleThumb} />
      </div>
      <span className={styles.knobToggleLabel}>{label}</span>
    </label>
  );
}

// ─── Range row ───────────────────────────────────────────────────────────
function RangeRow({ label, value, min = 0, max = 99, onChange }: {
  label: string; value: number; min?: number; max?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className={styles.knobRow}>
      <span className={styles.knobLabel}>{label}</span>
      <div className={styles.knobRangeRow}>
        <input type="range" min={min} max={max} value={value}
          onChange={(e) => onChange(parseInt(e.target.value))} />
        <span className={styles.knobRangeValue}>{value}</span>
      </div>
    </div>
  );
}

// ─── Swatch ──────────────────────────────────────────────────────────────
function Swatch({ hex, size = 32 }: { hex: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: "var(--radius-3)",
      background: hex,
      border: "1px solid rgba(255,255,255,0.1)",
      flexShrink: 0,
    }} />
  );
}

// ─── Main playground page ─────────────────────────────────────────────────
export default function PlayerCardPlayground() {
  const pathname = usePathname();
  const [knobs, setKnobs] = useState<KnobState>(DEFAULTS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);

  const patch = useCallback(<K extends keyof KnobState>(key: K, value: KnobState[K]) => {
    setKnobs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setKnobs(DEFAULTS), []);

  const copy = () => {
    navigator.clipboard.writeText(buildSnippet(knobs)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const card = buildCard(knobs);
  const overallRating = computeRating(knobs);

  const toggleBadge = (badge: BadgeType) => {
    setKnobs((prev) => {
      const has = prev.badges.includes(badge);
      if (!has && prev.badges.length >= 3) return prev;
      return { ...prev, badges: has ? prev.badges.filter((b) => b !== badge) : [...prev.badges, badge] };
    });
  };

  return (
    <div className={styles.shell}>
      {/* ── LEFT SIDEBAR ── */}
      <nav className={styles.leftSidebar}>
        <span className={styles.sidebarTitle}>Design System</span>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ""}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── CENTER CONTENT ── */}
      <main className={styles.content}>
        {/* Header */}
        <header id="overview" className={styles.header}>
          <h1 className={styles.componentName}>Player Card</h1>
          <p className={styles.componentDesc}>
            A flippable trading card with a front face (photo + name + jersey
            number) and back face (overall rating + 6-stat grid + trait badges).
            Animated with Framer Motion spring physics.
          </p>
          <code className={styles.sourceBadge}>components/player-card/PlayerCard.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar}>
              <button
                className={styles.themeBtn}
                data-active={theme === "dark"}
                onClick={() => setTheme("dark")}
              >Dark</button>
              <button
                className={styles.themeBtn}
                data-active={theme === "light"}
                onClick={() => setTheme("light")}
              >Light</button>
              <button className={styles.resetBtn} onClick={reset}>Reset</button>
            </div>
            <div className={styles.previewCanvas} data-theme={theme}>
              <PlayerCard
                card={card}
                isFlipped={knobs.isFlipped}
                overallRating={overallRating}
                onFlip={() => patch("isFlipped", !knobs.isFlipped)}
              />
            </div>
          </div>
          <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", margin: 0 }}>
            Tap the card to flip it — or use the <strong>isFlipped</strong> knob below.
          </p>
        </section>

        {/* Code */}
        <section id="code" className={styles.section}>
          <h2 className={styles.sectionTitle}>Code</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeFilename}>usage.tsx</span>
              <button className={styles.copyBtn} onClick={copy}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <pre className={styles.pre}><code>{buildSnippet(knobs)}</code></pre>
          </div>
          <p className={styles.importHint}>
            <code>{"import PlayerCard from \"@/components/player-card/PlayerCard\";"}</code>
          </p>
        </section>

        {/* Props / Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props</h2>
          <div className={styles.knobsGrid}>
            {/* Text fields */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>firstName</label>
              <input className={styles.knobInput} value={knobs.firstName}
                onChange={(e) => patch("firstName", e.target.value.toUpperCase())} />
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>lastName</label>
              <input className={styles.knobInput} value={knobs.lastName}
                onChange={(e) => patch("lastName", e.target.value.toUpperCase())} />
            </div>

            {/* Number */}
            <RangeRow label="number" value={knobs.number} min={1} max={99}
              onChange={(v) => patch("number", v)} />

            {/* Position */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>position</label>
              <select className={styles.knobSelect} value={knobs.position}
                onChange={(e) => patch("position", e.target.value as PlayerCardData["position"])}>
                {(["C","LW","RW","D","G"] as const).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Card colour */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>cardColor</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
                {CARD_COLOR_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    title={p.label}
                    aria-label={p.label}
                    onClick={() => patch("cardColor", p.value)}
                    style={{
                      width: 28, height: 28,
                      borderRadius: "var(--radius-3)",
                      background: p.value,
                      border: knobs.cardColor === p.value
                        ? "2px solid var(--border-white)"
                        : "2px solid transparent",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* isFlipped */}
            <div className={styles.knobRow}>
              <span className={styles.knobLabel}>isFlipped</span>
              <TogglePill
                on={knobs.isFlipped}
                onChange={(v) => patch("isFlipped", v)}
                label={knobs.isFlipped ? "Back face" : "Front face"}
              />
            </div>

            {/* Stats */}
            <RangeRow label="SKA" value={knobs.skaStat} onChange={(v) => patch("skaStat", v)} />
            <RangeRow label="SHO" value={knobs.shoStat} onChange={(v) => patch("shoStat", v)} />
            <RangeRow label="PUC" value={knobs.pucStat} onChange={(v) => patch("pucStat", v)} />
            <RangeRow label="GAM" value={knobs.gamStat} onChange={(v) => patch("gamStat", v)} />
            <RangeRow label="FIT" value={knobs.fitStat} onChange={(v) => patch("fitStat", v)} />
            <RangeRow label="CHA" value={knobs.chaStat} onChange={(v) => patch("chaStat", v)} />

            {/* Badges */}
            <div className={styles.knobRow} style={{ gridColumn: "1 / -1" }}>
              <span className={styles.knobLabel}>badges (max 3)</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
                {(["Captain","Dangler","Sniper","Playmaker","Enforcer"] as BadgeType[]).map((b) => {
                  const on = knobs.badges.includes(b);
                  return (
                    <button
                      key={b}
                      onClick={() => toggleBadge(b)}
                      style={{
                        padding: "var(--space-1) var(--space-3)",
                        borderRadius: "var(--radius-full)",
                        border: on ? "1px solid var(--yellow-500)" : "1px solid var(--border-secondary)",
                        background: on ? "rgba(255,185,56,0.12)" : "transparent",
                        color: on ? "var(--yellow-500)" : "var(--text-tertiary)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Computed overall */}
            <div className={styles.knobRow} style={{ gridColumn: "1 / -1" }}>
              <span className={styles.knobLabel}>overallRating (computed)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ fontSize: "var(--text-4xl)", fontWeight: 800, color: "var(--text-primary)" }}>
                  {overallRating}
                </span>
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                  weighted average of 6 stats — read-only
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Token Table */}
        <section id="tokens" className={styles.section}>
          <h2 className={styles.sectionTitle}>Tokens</h2>
          <table className={styles.tokenTable}>
            <thead>
              <tr>
                <th>CSS Variable</th>
                <th>Swatch</th>
                <th>Value</th>
                <th>Used for</th>
              </tr>
            </thead>
            <tbody>
              {[
                { v: "--fg-secondary",      hex: "#F5F5F4", use: "Card body background" },
                { v: "--fg-inverse",        hex: "#0C0A09", use: "Name, stats text" },
                { v: "--bg-primary",        hex: "#0C0A09", use: "Badge strip, position overlay" },
                { v: "--bg-tertiary",       hex: "#282524", use: "Team badge background" },
                { v: "--bg-brand-primary",  hex: "#2C7FFF", use: "GG label, overall rating accent" },
                { v: "--border-white",      hex: "#FFFFFF", use: "Jersey number text" },
                { v: "--yellow-500",        hex: "#FFB938", use: "Hex badge fill, team initials" },
                { v: "--text-secondary",    hex: "#D6D3D1", use: "Stat key labels" },
                { v: "--fg-tertiary",       hex: "#E7E5E4", use: "Foreground tertiary text" },
                { v: "--radius-5",          hex: "",        use: "Card corner radius — 12px" },
              ].map(({ v, hex, use }) => (
                <tr key={v}>
                  <td><code>{v}</code></td>
                  <td>{hex ? <Swatch hex={hex} size={28} /> : <span style={{ color: "var(--text-tertiary)", fontSize: "var(--text-xs)" }}>—</span>}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{hex || "12px"}</td>
                  <td style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* A11y */}
        <section id="accessibility" className={styles.section}>
          <h2 className={styles.sectionTitle}>Accessibility</h2>
          <dl className={styles.a11yList}>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Role</dt>
              <dd className={styles.a11yDesc}>
                <code>role="button"</code> on the card wrapper — interactive, tappable.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>aria-label</dt>
              <dd className={styles.a11yDesc}>
                Updates dynamically: <em>"Flip to card front"</em> / <em>"Flip to card back"</em> based on current face.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Keyboard</dt>
              <dd className={styles.a11yDesc}>
                <kbd>Tab</kbd> to focus the card · <kbd>Enter</kbd> to flip.
                The card has <code>tabIndex={0}</code> and an <code>onKeyDown</code> handler.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Reduced motion</dt>
              <dd className={styles.a11yDesc}>
                <code>@media (prefers-reduced-motion: reduce)</code> in <code>globals.css</code> disables
                the flip transition and all animation durations.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Contrast</dt>
              <dd className={styles.a11yDesc}>
                Jersey number (<code>--border-white</code> on <code>cardColor</code> background) — ensure
                sufficient contrast when selecting custom card colours. Yellow/light presets
                pair with dark overlay text; dark presets use white.
              </dd>
            </div>
          </dl>
        </section>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside className={styles.rightSidebar}>
        <span className={styles.tocTitle}>On This Page</span>
        <ul className={styles.tocList}>
          {TOC.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
