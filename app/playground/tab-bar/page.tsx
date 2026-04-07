"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import { TabBar, TabButton } from "@/components/editor/TabBar";

const NAV_ITEMS = [...SYSTEM_NAV, ...COMPONENT_NAV];

// ─── TOC ─────────────────────────────────────────────────────────────────────
const TOC_ITEMS = [
  { id: "overview",      label: "Overview"      },
  { id: "preview",       label: "Preview"       },
  { id: "code",          label: "Code"          },
  { id: "props",         label: "Props / Knobs" },
  { id: "tokens",        label: "Tokens"        },
  { id: "accessibility", label: "Accessibility" },
];

// ─── Tokens ───────────────────────────────────────────────────────────────────
const TOKEN_ROWS = [
  { token: "--border-primary",    hex: "#282524", usage: "TabBar bottom border (container underline)" },
  { token: "--bg-brand-primary",  hex: "#2C7FFF", usage: "Active tab underline indicator"             },
  { token: "--text-brand",        hex: "#2C7FFF", usage: "Active tab foreground color"                },
  { token: "--text-tertiary",     hex: "#A5A09C", usage: "Inactive tab icon / label"                  },
  { token: "--text-secondary",    hex: "#D6D3D1", usage: "Inactive tab hover state"                   },
  { token: "--space-6",           hex: "24px",    usage: "Horizontal padding on each TabButton"       },
  { token: "--space-4",           hex: "16px",    usage: "Vertical padding on each TabButton"         },
  { token: "--space-14",          hex: "56px",    usage: "TabButton height (h-14)"                    },
];

// ─── Demo tab definitions ─────────────────────────────────────────────────────
type DemoTab = "upload" | "templates" | "colors" | "filters";

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 5h-2.586l-2-2H8.586l-2 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    </svg>
  );
}
function CardsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="4" width="13" height="17" rx="2"/>
      <path d="M17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3V7z" opacity="0.5"/>
    </svg>
  );
}
function PaletteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  );
}
function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5h2V3H3v2zm0 8h2v-2H3v2zm0 8h2v-2H3v2zm4 0h14v-2H7v2zm0-8h14v-2H7v2zm0-10v2h14V3H7z" opacity="0.4"/>
      <circle cx="10" cy="6" r="2.5"/>
      <circle cx="16" cy="14" r="2.5"/>
    </svg>
  );
}

const DEMO_TABS: { id: DemoTab; label: string; icon: React.ReactNode }[] = [
  { id: "upload",    label: "Upload",    icon: <CameraIcon />  },
  { id: "templates", label: "Templates", icon: <CardsIcon />   },
  { id: "colors",    label: "Colors",    icon: <PaletteIcon /> },
  { id: "filters",   label: "Filters",   icon: <SlidersIcon /> },
];

type ChildMode = "icon" | "text" | "icon+text";

// ─── Code builder ─────────────────────────────────────────────────────────────
function buildSnippet(active: DemoTab, mode: ChildMode): string {
  const childExpr = (tab: { id: DemoTab; label: string }) => {
    if (mode === "icon")      return `{/* <${tab.label}Icon /> */}`;
    if (mode === "text")      return tab.label;
    return `<${tab.label}Icon /> {/* + label if needed */}`;
  };
  const lines = DEMO_TABS.map(
    (t) =>
      `  <TabButton\n    id="${t.id}"\n    active={activeTab === "${t.id}"}\n    label="${t.label}"\n    onClick={() => setActiveTab("${t.id}")}\n  >\n    ${childExpr(t)}\n  </TabButton>`
  ).join("\n");
  return `import { TabBar, TabButton } from "@/components/editor/TabBar";\n\n<TabBar>\n${lines}\n</TabBar>`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TabBarPlayground() {
  const [activeTab, setActiveTab] = useState<DemoTab>("upload");
  const [childMode, setChildMode] = useState<ChildMode>("icon");
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(buildSnippet(activeTab, childMode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.shell}>

      {/* ── Left sidebar ─────────────────────────────────────────── */}
      <nav className={styles.leftSidebar}>
        <p className={styles.sidebarTitle}>Design System</p>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.navItem} ${item.href === "/playground/tab-bar" ? styles.navItemActive : ""}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Center content ───────────────────────────────────────── */}
      <main className={styles.content}>

        {/* Overview */}
        <header id="overview" className={styles.header}>
          <h1 className={styles.componentName}>Tab Bar</h1>
          <p className={styles.componentDesc}>
            Reusable navigation bar built from Figma node 17791-1956. Exports two
            named components: <strong>TabBar</strong> (the flex row container with
            a bottom border) and <strong>TabButton</strong> (each individual tab
            item with animated active underline via Framer Motion{" "}
            <code>layoutId</code>). Accepts any children — icons, text, or both.
          </p>
          <code className={styles.sourceBadge}>components/editor/TabBar.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                Active: <strong style={{ color: "var(--text-primary)" }}>{activeTab}</strong>
                {" · "}mode: <strong style={{ color: "var(--text-primary)" }}>{childMode}</strong>
              </span>
              <button
                className={styles.themeBtn}
                onClick={() => { setActiveTab("upload"); setChildMode("icon"); }}
              >
                Reset
              </button>
            </div>

            {/* Live TabBar */}
            <div className={styles.previewCanvas} style={{ padding: 0, minHeight: "auto", alignItems: "stretch" }}>
              <div style={{ width: "402px", maxWidth: "100%", background: "var(--bg-secondary)" }}>
                <TabBar>
                  {DEMO_TABS.map((tab) => (
                    <TabButton
                      key={tab.id}
                      id={tab.id}
                      active={activeTab === tab.id}
                      label={tab.label}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {childMode === "icon"     && tab.icon}
                      {childMode === "text"     && tab.label}
                      {childMode === "icon+text" && (
                        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                          {tab.icon}
                          <span style={{ fontSize: "var(--text-xs)", lineHeight: 1 }}>{tab.label}</span>
                        </span>
                      )}
                    </TabButton>
                  ))}
                </TabBar>

                {/* Panel hint */}
                <div style={{ padding: "var(--space-4) var(--space-5)", background: "var(--bg-primary)", fontSize: "var(--text-sm)", color: "var(--text-tertiary)" }}>
                  Panel for: <strong style={{ color: "var(--text-primary)" }}>{activeTab}</strong>
                </div>
              </div>
            </div>
          </div>
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
            <pre className={styles.pre}>
              <code>{buildSnippet(activeTab, childMode)}</code>
            </pre>
          </div>
          <p className={styles.importHint}>
            <code>{`import { TabBar, TabButton } from "@/components/editor/TabBar";`}</code>
          </p>
        </section>

        {/* Props / Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props / Knobs</h2>
          <div className={styles.knobsGrid}>

            {/* activeTab */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>activeTab (TabButton.active)</label>
              <select
                className={styles.knobSelect}
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as DemoTab)}
              >
                {DEMO_TABS.map((t) => (
                  <option key={t.id} value={t.id}>{t.id}</option>
                ))}
              </select>
            </div>

            {/* childMode */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>children variant</label>
              <select
                className={styles.knobSelect}
                value={childMode}
                onChange={(e) => setChildMode(e.target.value as ChildMode)}
              >
                <option value="icon">icon only</option>
                <option value="text">text only</option>
                <option value="icon+text">icon + text</option>
              </select>
            </div>

            {/* TabBar.className */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>TabBar.className</label>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-tertiary)", paddingTop: "var(--space-2)" }}>
                optional — pass any Tailwind / CSS class to override layout
              </span>
            </div>

            {/* TabButton.id */}
            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>TabButton.id</label>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-tertiary)", paddingTop: "var(--space-2)" }}>
                string — used as React key + <code>aria-label</code> reference
              </span>
            </div>

          </div>

          {/* Prop reference table */}
          <table className={styles.tokenTable}>
            <thead>
              <tr>
                <th>Component</th>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>TabBar</code></td>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>One or more <code>TabButton</code> elements</td>
              </tr>
              <tr>
                <td><code>TabBar</code></td>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>&quot;&quot;</code></td>
                <td>Extra classes appended to the nav element</td>
              </tr>
              <tr>
                <td><code>TabButton</code></td>
                <td><code>id</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>Unique identifier; used as React key + aria reference</td>
              </tr>
              <tr>
                <td><code>TabButton</code></td>
                <td><code>active</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Shows brand-primary text + animated underline when true</td>
              </tr>
              <tr>
                <td><code>TabButton</code></td>
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td>—</td>
                <td>Accessible name for <code>aria-label</code></td>
              </tr>
              <tr>
                <td><code>TabButton</code></td>
                <td><code>onClick</code></td>
                <td><code>() =&gt; void</code></td>
                <td>—</td>
                <td>Tab selection handler</td>
              </tr>
              <tr>
                <td><code>TabButton</code></td>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>—</td>
                <td>Icon, text, or combined content</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Tokens */}
        <section id="tokens" className={styles.section}>
          <h2 className={styles.sectionTitle}>Tokens</h2>
          <table className={styles.tokenTable}>
            <thead>
              <tr><th>Token</th><th>Value</th><th>Usage</th></tr>
            </thead>
            <tbody>
              {TOKEN_ROWS.map((row) => (
                <tr key={row.token}>
                  <td><code>{row.token}</code></td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                      {row.hex.startsWith("#") && (
                        <span style={{
                          display: "inline-block",
                          width: 14, height: 14,
                          borderRadius: 3,
                          background: row.hex,
                          border: "1px solid var(--border-primary)",
                          flexShrink: 0,
                        }} />
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
              <dt className={styles.a11yTerm}>Role</dt>
              <dd className={styles.a11yDesc}>
                <code>TabBar</code> renders a <code>&lt;nav&gt;</code> with{" "}
                <code>aria-label=&quot;Editor sections&quot;</code>. Each{" "}
                <code>TabButton</code> is a semantic <code>&lt;button&gt;</code>.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Active state</dt>
              <dd className={styles.a11yDesc}>
                The active button receives <code>aria-current=&quot;page&quot;</code>,
                communicating selection to screen readers without relying on color alone.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Keyboard</dt>
              <dd className={styles.a11yDesc}>
                All buttons are natively focusable. Focus ring uses{" "}
                <code>focus-visible:ring-2 focus-visible:ring-bg-brand-primary ring-inset</code>{" "}
                so it only appears on keyboard navigation, not mouse click.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Icon-only tabs</dt>
              <dd className={styles.a11yDesc}>
                When <code>children</code> is an icon with no visible label, the
                required <code>label</code> prop is forwarded as{" "}
                <code>aria-label</code> on the button, satisfying WCAG 2.1 SC 4.1.2.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Reduced motion</dt>
              <dd className={styles.a11yDesc}>
                The Framer Motion spring on the active underline respects{" "}
                <code>@media (prefers-reduced-motion: reduce)</code> via{" "}
                <code>globals.css</code> — the indicator snaps immediately instead of
                sliding.
              </dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Contrast</dt>
              <dd className={styles.a11yDesc}>
                Active tab: <code>--text-brand</code> (#2C7FFF) on{" "}
                <code>--bg-secondary</code> (#1B1917) — passes WCAG AA (4.5:1).
                Inactive: <code>--text-tertiary</code> (#A5A09C) on same — passes AA
                large text (3:1).
              </dd>
            </div>
          </dl>
        </section>

      </main>

      {/* ── Right sidebar TOC ────────────────────────────────────── */}
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
