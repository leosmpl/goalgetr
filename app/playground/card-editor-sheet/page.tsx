"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import EditorSheet   from "@/components/editor/EditorSheet";
import PlayerCard    from "@/components/player-card/PlayerCard";
import type { EditorTab, CardTemplate, CardFilter, PlayerCardData } from "@/lib/types";
import { CARD_COLOR_PRESETS } from "@/lib/colorPresets";

const NAV_ITEMS = [...SYSTEM_NAV, ...COMPONENT_NAV];

const TOC_ITEMS = [
  { id: "overview",      label: "Overview"      },
  { id: "preview",       label: "Preview"       },
  { id: "props",         label: "Props / Knobs" },
  { id: "tokens",        label: "Tokens"        },
  { id: "accessibility", label: "Accessibility" },
];

const TOKEN_ROWS = [
  { token: "--bg-secondary",    hex: "#1B1917", usage: "Sheet background" },
  { token: "--bg-brand-primary",hex: "#2C7FFF", usage: "Active tab underline + Save button + filter pills" },
  { token: "--border-primary",  hex: "#282524", usage: "Tab bar border-bottom" },
  { token: "--bg-tertiary",     hex: "#282524", usage: "Inactive tab + toggle track" },
  { token: "--text-tertiary",   hex: "#A5A09C", usage: "Inactive icons + labels" },
  { token: "--radius-10",       hex: "32px",    usage: "Sheet top corner radius" },
];

const DEFAULT_CARD: PlayerCardData = {
  firstName: "ALEX",  lastName: "MERCER",
  number: 96,         position: "C",
  teamName: "GF FC",  teamLogoUrl: null,
  photoUrl: null,     cardColor: CARD_COLOR_PRESETS[0].value,
  stats: { SKA: 82, SHO: 79, PUC: 85, GAM: 88, FIT: 74, CHA: 91 },
  badges: ["Captain"],
  template: "classic", filter: "none", textRun: false, blurAmount: 0,
};

export default function CardEditorSheetPage() {
  const [activeTab, setActiveTab]     = useState<EditorTab>("upload");
  const [card, setCard]               = useState<PlayerCardData>(DEFAULT_CARD);
  const [isFlipped, setIsFlipped]     = useState(false);
  const [isDirty, setIsDirty]         = useState(false);
  const [saved, setSaved]             = useState(false);

  function patch(partial: Partial<PlayerCardData>) {
    setCard((c) => ({ ...c, ...partial }));
    setIsDirty(true);
    setSaved(false);
  }

  function handleSave() {
    setIsDirty(false);
    setSaved(true);
  }

  const overallRating = Math.round(
    card.stats.SKA * 0.2 + card.stats.SHO * 0.2 + card.stats.PUC * 0.2 +
    card.stats.GAM * 0.15 + card.stats.FIT * 0.1 + card.stats.CHA * 0.15
  );

  return (
    <div className={styles.shell}>

      {/* ── Left sidebar ── */}
      <nav className={styles.leftSidebar}>
        <p className={styles.sidebarTitle}>Design System</p>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.navItem} ${item.href === "/playground/card-editor-sheet" ? styles.navItemActive : ""}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Center content ── */}
      <main className={styles.content}>

        {/* Overview */}
        <header id="overview" className={styles.header}>
          <h1 className={styles.componentName}>Card Editor Sheet</h1>
          <p className={styles.componentDesc}>
            4-tab bottom sheet panel sourced from Figma node 17779-9874. Tabs:
            Upload (photo + BG remove), Templates (Classic / Modern / Stats),
            Colors (5 swatches + custom), Filters (Noir / Heritage / Game Day, blur slider, Text Run).
            All state flows up via callbacks; the sheet is purely presentational.
          </p>
          <code className={styles.sourceBadge}>components/editor/EditorSheet.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar} style={{ justifyContent: "space-between" }}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                Active tab: <strong style={{ color: "var(--text-primary)" }}>{activeTab}</strong>
                {" · "}template: <strong style={{ color: "var(--text-primary)" }}>{card.template}</strong>
                {" · "}filter: <strong style={{ color: "var(--text-primary)" }}>{card.filter}</strong>
              </span>
              <button
                className={styles.themeBtn}
                onClick={() => { setCard(DEFAULT_CARD); setActiveTab("upload"); setIsDirty(false); setSaved(false); }}
              >
                Reset
              </button>
            </div>

            <div className={styles.previewCanvas} style={{ flexDirection: "column", gap: 0, padding: 0 }}>
              <div style={{ width: "402px", maxWidth: "100%", background: "var(--bg-primary)", overflow: "hidden", borderRadius: "var(--radius-6) var(--radius-6) 0 0", display: "flex", flexDirection: "column", alignItems: "center", padding: "var(--space-6) var(--space-4) var(--space-4)" }}>
                <PlayerCard
                  card={card}
                  isFlipped={isFlipped}
                  overallRating={overallRating}
                  onFlip={() => setIsFlipped((f) => !f)}
                />
                <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginTop: "var(--space-3)" }}>
                  tap to flip
                </span>
              </div>

              <div style={{ width: "402px", maxWidth: "100%" }}>
                <EditorSheet
                  activeTab={activeTab}
                  card={card}
                  onTabChange={setActiveTab}
                  onColorChange={(hex) => patch({ cardColor: hex })}
                  onPhotoChange={(url) => patch({ photoUrl: url })}
                  onTemplateChange={(t: CardTemplate) => patch({ template: t })}
                  onFilterChange={(f: CardFilter) => patch({ filter: f })}
                  onTextRunToggle={() => patch({ textRun: !card.textRun })}
                  onBlurChange={(v) => patch({ blurAmount: v })}
                  onSave={handleSave}
                  isDirty={isDirty}
                />
              </div>

              {saved && (
                <div style={{ textAlign: "center", padding: "var(--space-2)", fontSize: "var(--text-xs)", color: "var(--text-success)" }}>
                  ✓ Saved
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props / Knobs</h2>
          <div className={styles.knobsGrid}>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>activeTab</label>
              <select className={styles.knobSelect} value={activeTab} onChange={(e) => setActiveTab(e.target.value as EditorTab)}>
                <option value="upload">upload</option>
                <option value="templates">templates</option>
                <option value="colors">colors</option>
                <option value="filters">filters</option>
              </select>
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>template</label>
              <select className={styles.knobSelect} value={card.template} onChange={(e) => patch({ template: e.target.value as CardTemplate })}>
                <option value="classic">classic</option>
                <option value="modern">modern</option>
                <option value="stats">stats</option>
              </select>
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>filter</label>
              <select className={styles.knobSelect} value={card.filter} onChange={(e) => patch({ filter: e.target.value as CardFilter })}>
                <option value="none">none</option>
                <option value="noir">noir</option>
                <option value="heritage">heritage</option>
                <option value="gameday">gameday</option>
              </select>
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>blurAmount</label>
              <input type="range" min={0} max={20} value={card.blurAmount} onChange={(e) => patch({ blurAmount: Number(e.target.value) })} className="w-full" />
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>textRun</label>
              <button className={styles.themeBtn} data-active={card.textRun} onClick={() => patch({ textRun: !card.textRun })}>
                {card.textRun ? "ON" : "OFF"}
              </button>
            </div>
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>isDirty</label>
              <span style={{ fontSize: "var(--text-sm)", color: isDirty ? "var(--text-brand)" : "var(--text-tertiary)" }}>
                {isDirty ? "true" : "false"}
              </span>
            </div>
          </div>
        </section>

        {/* Tokens */}
        <section id="tokens" className={styles.section}>
          <h2 className={styles.sectionTitle}>Tokens</h2>
          <table className={styles.tokenTable}>
            <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
            <tbody>
              {TOKEN_ROWS.map((row) => (
                <tr key={row.token}>
                  <td><code>{row.token}</code></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                      {row.hex.startsWith("#") && (
                        <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 3, background: row.hex, border: "1px solid var(--border-primary)", flexShrink: 0 }} />
                      )}
                      <code>{row.hex}</code>
                    </div>
                  </td>
                  <td>{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Accessibility */}
        <section id="accessibility" className={styles.section}>
          <h2 className={styles.sectionTitle}>Accessibility</h2>
          <dl className={styles.a11yList}>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Tab navigation</dt>
              <dd className={styles.a11yDesc}>Each tab button has <code>aria-label</code> and <code>aria-current=&quot;page&quot;</code> when active. All focus-visible ring styles are visible.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Toggle switch</dt>
              <dd className={styles.a11yDesc}>Text Run toggle uses <code>role=&quot;switch&quot;</code> with <code>aria-checked</code> reflecting state.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Reduced motion</dt>
              <dd className={styles.a11yDesc}>The marquee animation and all Framer Motion springs are disabled via <code>@media (prefers-reduced-motion: reduce)</code> in globals.css.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Filter contrast</dt>
              <dd className={styles.a11yDesc}>Game Day filter (contrast 1.4) can push text below WCAG AA. Always test card text legibility after applying filters.</dd>
            </div>
          </dl>
        </section>

      </main>

      {/* ── Right sidebar TOC ── */}
      <aside className={styles.rightSidebar}>
        <p className={styles.tocTitle}>On This Page</p>
        <ul className={styles.tocList}>
          {TOC_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.tocLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
