"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import StatusBar     from "@/components/device/StatusBar";
import HomeIndicator from "@/components/device/HomeIndicator";

const NAV_ITEMS = [...SYSTEM_NAV, ...COMPONENT_NAV];

const TOC_ITEMS = [
  { id: "overview",      label: "Overview"      },
  { id: "preview",       label: "Preview"       },
  { id: "code",          label: "Code"          },
  { id: "props",         label: "Props"         },
  { id: "tokens",        label: "Tokens"        },
  { id: "accessibility", label: "Accessibility" },
];

const TOKEN_ROWS = [
  { token: "--fg-primary",     hex: "#FAFAF9", usage: "Light mode — white icons/text/pill (dark bg)" },
  { token: "--fg-inverse",     hex: "#0C0A09", usage: "Dark mode — black icons/text/pill (light bg)" },
  { token: "--font-sans",      hex: "Geist",   usage: "Status bar time typeface" },
  { token: "--text-base",      hex: "16px",    usage: "Time font-size" },
];

function buildCode(time: string, colorMode: "light" | "dark") {
  return `import StatusBar     from "@/components/device/StatusBar";
import HomeIndicator  from "@/components/device/HomeIndicator";

// Overlay both at the top/bottom of your device frame (position:absolute)
// colorMode="light" → white  (dark backgrounds)
// colorMode="dark"  → black  (light backgrounds)

<div style={{ position: "relative" }}>
  {/* Status bar floats over content */}
  <div style={{ position: "absolute", inset: "0 0 auto", zIndex: 10 }}>
    <StatusBar time="${time}" colorMode="${colorMode}" />
  </div>

  {/* App content — pad top 62px + bottom 34px so nothing hides behind bars */}
  <div style={{ paddingTop: 62, paddingBottom: 34 }}>
    {/* …your app content… */}
  </div>

  {/* Home indicator floats over content */}
  <div style={{ position: "absolute", inset: "auto 0 0", zIndex: 10 }}>
    <HomeIndicator colorMode="${colorMode}" />
  </div>
</div>`;
}

export default function DeviceChromePage() {
  const [time, setTime]           = useState("9:41");
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [bgTheme, setBgTheme]     = useState<"dark" | "light">("dark");
  const [copied, setCopied]       = useState(false);

  function copy() {
    navigator.clipboard.writeText(buildCode(time, colorMode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const bgColor = bgTheme === "dark" ? "var(--bg-primary)" : "var(--fg-tertiary)";

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
                className={`${styles.navItem} ${item.href === "/playground/device-chrome" ? styles.navItemActive : ""}`}
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
          <h1 className={styles.componentName}>Device Chrome</h1>
          <p className={styles.componentDesc}>
            Transparent, edge-to-edge iOS safe-area components. The status bar and home
            indicator float as absolute overlays — content bleeds behind them. Two
            color modes: <code>light</code> (white, for dark backgrounds) and{" "}
            <code>dark</code> (black, for light backgrounds).
          </p>
          <code className={styles.sourceBadge}>components/device/StatusBar.tsx · HomeIndicator.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar}>
              {/* Background toggle */}
              <button className={styles.themeBtn} data-active={bgTheme === "dark"}  onClick={() => setBgTheme("dark")}>Dark bg</button>
              <button className={styles.themeBtn} data-active={bgTheme === "light"} onClick={() => setBgTheme("light")}>Light bg</button>
              {/* Color mode toggle */}
              <button
                className={styles.themeBtn}
                data-active={colorMode === "light"}
                onClick={() => setColorMode("light")}
                style={{ marginLeft: "var(--space-4)" }}
              >Light icons</button>
              <button
                className={styles.themeBtn}
                data-active={colorMode === "dark"}
                onClick={() => setColorMode("dark")}
              >Dark icons</button>
            </div>

            {/* Device-width preview strip */}
            <div className={styles.previewCanvas} style={{ padding: 0, minHeight: "auto" }}>
              <div style={{ width: "402px", maxWidth: "100%", position: "relative", background: bgColor, borderRadius: "var(--radius-6)", overflow: "hidden" }}>

                {/* Status bar — absolute overlay */}
                <div style={{ position: "absolute", inset: "0 0 auto", zIndex: 10 }}>
                  <StatusBar time={time} colorMode={colorMode} />
                </div>

                {/* Simulated content beneath */}
                <div style={{ paddingTop: "62px", paddingBottom: "34px" }}>
                  <div style={{
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    color: colorMode === "light" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
                    borderTop: "1px dashed rgba(128,128,128,0.3)",
                    borderBottom: "1px dashed rgba(128,128,128,0.3)",
                  }}>
                    app content scrolls here
                  </div>
                </div>

                {/* Home indicator — absolute overlay */}
                <div style={{ position: "absolute", inset: "auto 0 0", zIndex: 10 }}>
                  <HomeIndicator colorMode={colorMode} />
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
            <pre className={styles.pre}><code>{buildCode(time, colorMode)}</code></pre>
          </div>
          <p className={styles.importHint}>
            <code>import StatusBar from &quot;@/components/device/StatusBar&quot;;</code><br />
            <code>import HomeIndicator from &quot;@/components/device/HomeIndicator&quot;;</code>
          </p>
        </section>

        {/* Props / Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props</h2>
          <div className={styles.knobsGrid}>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>StatusBar · time</label>
              <input
                type="text"
                className={styles.knobInput}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>colorMode (both)</label>
              <select
                className={styles.knobSelect}
                value={colorMode}
                onChange={(e) => setColorMode(e.target.value as "light" | "dark")}
              >
                <option value="light">light — white icons (dark bg)</option>
                <option value="dark">dark — black icons (light bg)</option>
              </select>
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>HomeIndicator · props</label>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-tertiary)", paddingTop: "var(--space-2)", display: "block" }}>
                Only <code>colorMode</code> — no other props.
              </span>
            </div>

          </div>
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
                        <span style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "3px", background: row.hex, border: "1px solid var(--border-primary)", flexShrink: 0 }} />
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
              <dt className={styles.a11yTerm}>aria-hidden</dt>
              <dd className={styles.a11yDesc}>Both components are fully decorative. They carry <code>aria-hidden=&quot;true&quot;</code> — screen readers skip them entirely.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Transparency</dt>
              <dd className={styles.a11yDesc}>Both bars have no background. Content bleeds behind them — the background colour context determines which <code>colorMode</code> to use.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Contrast</dt>
              <dd className={styles.a11yDesc}>fg-primary (#FAFAF9) on bg-primary (#0C0A09) — 19.5:1 ratio (WCAG AAA). fg-inverse (#0C0A09) on fg-tertiary (#E7E5E4) — 15.3:1.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Motion</dt>
              <dd className={styles.a11yDesc}>No animations — zero motion impact.</dd>
            </div>
          </dl>
        </section>

      </main>

      {/* ── Right sidebar (TOC) ── */}
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
