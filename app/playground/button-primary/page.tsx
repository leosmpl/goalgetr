"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import type { ButtonSize } from "@/components/ui/ButtonPrimary";

const NAV_ITEMS = [...SYSTEM_NAV, ...COMPONENT_NAV];

const TOC_ITEMS = [
  { id: "overview",      label: "Overview"      },
  { id: "preview",       label: "Preview"       },
  { id: "code",          label: "Code"          },
  { id: "props",         label: "Props / Knobs" },
  { id: "tokens",        label: "Tokens"        },
  { id: "accessibility", label: "Accessibility" },
];

const TOKEN_ROWS = [
  { token: "--bg-brand-primary",        hex: "#2C7FFF",              usage: "Enabled background — shifts with league theme"      },
  { token: "--text-primary",            hex: "#F5F5F4",              usage: "Label + icon color when enabled"                    },
  { token: "--text-tertiary",           hex: "#A5A09C",              usage: "Label + icon color when disabled"                   },
  { token: "rgba(255,255,255,0.05)",    hex: "white / 5%",           usage: "Disabled background"                               },
  { token: "rgba(255,255,255,0.10)",    hex: "white / 10%",          usage: "Hover overlay (::after pseudo)"                    },
  { token: "--radius-full",             hex: "9999px",               usage: "Pill shape"                                        },
  { token: "--space-2",                 hex: "8px",                  usage: "Horizontal padding — sm + md"                      },
  { token: "--space-3",                 hex: "12px",                 usage: "Horizontal padding — lg"                           },
  { token: "--space-1",                 hex: "4px",                  usage: "Vertical padding"                                  },
  { token: "--text-size-sm",            hex: "14px / 20px",          usage: "Label font size — sm + md"                         },
  { token: "--text-size-base",          hex: "16px / 24px",          usage: "Label font size — lg"                              },
];

// Demo star icon
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1l1.854 3.756L14 5.528l-3 2.922.708 4.132L8 10.5l-3.708 2.082L5 8.45 2 5.528l4.146-.772L8 1z"/>
    </svg>
  );
}

function buildSnippet(label: string, size: ButtonSize, showIcons: boolean, disabled: boolean, fullWidth: boolean): string {
  const parts: string[] = [];
  if (label !== "Button")   parts.push(`label="${label}"`);
  if (size  !== "md")       parts.push(`size="${size}"`);
  if (showIcons)            parts.push(`iconLeft={<StarIcon />}\n  iconRight={<StarIcon />}`);
  if (disabled)             parts.push("disabled");
  if (fullWidth)            parts.push("fullWidth");
  const attrs = parts.length ? `\n  ${parts.join("\n  ")}\n` : "";
  return `<ButtonPrimary${attrs ? attrs : " "}onClick={() => console.log("clicked")} />`;
}

export default function ButtonPrimaryPlayground() {
  const [label,     setLabel]     = useState("Button");
  const [size,      setSize]      = useState<ButtonSize>("md");
  const [showIcons, setShowIcons] = useState(false);
  const [disabled,  setDisabled]  = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [copied,    setCopied]    = useState(false);

  function copy() {
    navigator.clipboard.writeText(buildSnippet(label, size, showIcons, disabled, fullWidth));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.shell}>

      {/* ── Left sidebar ─────────────────────────────────────── */}
      <nav className={styles.leftSidebar}>
        <p className={styles.sidebarTitle}>Design System</p>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`${styles.navItem} ${item.href === "/playground/button-primary" ? styles.navItemActive : ""}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Center content ───────────────────────────────────── */}
      <main className={styles.content}>

        {/* Overview */}
        <header id="overview" className={styles.header}>
          <h1 className={styles.componentName}>Button Primary</h1>
          <p className={styles.componentDesc}>
            Fundamental CTA element from Figma node 17786-9790. Three sizes (Sm · Md · Lg),
            three states (Enabled · Hover · Disabled), and optional left/right icon slots.
            Background uses <code>--bg-brand-primary</code> — automatically shifts hue
            when the current league&apos;s theme colour changes.
          </p>
          <code className={styles.sourceBadge}>components/ui/ButtonPrimary.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                size: <strong style={{ color: "var(--text-primary)" }}>{size}</strong>
                {" · "}disabled: <strong style={{ color: "var(--text-primary)" }}>{String(disabled)}</strong>
              </span>
              <button
                className={styles.themeBtn}
                onClick={() => { setLabel("Button"); setSize("md"); setShowIcons(false); setDisabled(false); setFullWidth(false); }}
              >
                Reset
              </button>
            </div>

            {/* All 9 states matrix */}
            <div className={styles.previewCanvas} style={{ flexDirection: "column", gap: "var(--space-8)", alignItems: "stretch" }}>

              {/* Sizes row */}
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>All sizes · Enabled</p>
                <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap" }}>
                  {(["sm", "md", "lg"] as ButtonSize[]).map((s) => (
                    <ButtonPrimary
                      key={s}
                      label={label}
                      size={s}
                      iconLeft={showIcons ? <StarIcon /> : undefined}
                      iconRight={showIcons ? <StarIcon /> : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Disabled row */}
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>All sizes · Disabled</p>
                <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", flexWrap: "wrap" }}>
                  {(["sm", "md", "lg"] as ButtonSize[]).map((s) => (
                    <ButtonPrimary
                      key={s}
                      label={label}
                      size={s}
                      disabled
                      iconLeft={showIcons ? <StarIcon /> : undefined}
                      iconRight={showIcons ? <StarIcon /> : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Knob-driven live button */}
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Interactive (knobs below)</p>
                <div style={{ display: "flex", justifyContent: fullWidth ? "stretch" : "flex-start" }}>
                  <ButtonPrimary
                    label={label}
                    size={size}
                    disabled={disabled}
                    fullWidth={fullWidth}
                    iconLeft={showIcons ? <StarIcon /> : undefined}
                    iconRight={showIcons ? <StarIcon /> : undefined}
                    onClick={() => console.log("clicked")}
                  />
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
              <code>{buildSnippet(label, size, showIcons, disabled, fullWidth)}</code>
            </pre>
          </div>
          <p className={styles.importHint}>
            <code>{`import ButtonPrimary from "@/components/ui/ButtonPrimary";`}</code>
          </p>
        </section>

        {/* Props / Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props / Knobs</h2>
          <div className={styles.knobsGrid}>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>label</label>
              <input
                type="text"
                className={styles.knobInput}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>size</label>
              <select className={styles.knobSelect} value={size} onChange={(e) => setSize(e.target.value as ButtonSize)}>
                <option value="sm">sm — 32px</option>
                <option value="md">md — 40px</option>
                <option value="lg">lg — 48px</option>
              </select>
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>icons (left + right)</label>
              <label className={styles.knobToggle}>
                <span className={styles.knobTogglePill} data-on={showIcons}>
                  <span className={styles.knobToggleThumb} />
                </span>
                <span className={styles.knobToggleLabel}>{showIcons ? "ON" : "OFF"}</span>
                <input type="checkbox" hidden checked={showIcons} onChange={(e) => setShowIcons(e.target.checked)} />
              </label>
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>disabled</label>
              <label className={styles.knobToggle}>
                <span className={styles.knobTogglePill} data-on={disabled}>
                  <span className={styles.knobToggleThumb} />
                </span>
                <span className={styles.knobToggleLabel}>{disabled ? "ON" : "OFF"}</span>
                <input type="checkbox" hidden checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
              </label>
            </div>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>fullWidth</label>
              <label className={styles.knobToggle}>
                <span className={styles.knobTogglePill} data-on={fullWidth}>
                  <span className={styles.knobToggleThumb} />
                </span>
                <span className={styles.knobToggleLabel}>{fullWidth ? "ON" : "OFF"}</span>
                <input type="checkbox" hidden checked={fullWidth} onChange={(e) => setFullWidth(e.target.checked)} />
              </label>
            </div>

          </div>

          {/* Prop table */}
          <table className={styles.tokenTable}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ["label",     "string",                    '"Button"', "Text shown inside the button"],
                ["size",      '"sm" | "md" | "lg"',        '"md"',     "Controls height, padding, icon size, font size"],
                ["iconLeft",  "ReactNode",                 "—",        "Icon slot to the left of the label"],
                ["iconRight", "ReactNode",                 "—",        "Icon slot to the right of the label"],
                ["disabled",  "boolean",                   "false",    "Switches to disabled visual state"],
                ["onClick",   "() => void",                "—",        "Click handler"],
                ["type",      '"button" | "submit" | "reset"', '"button"', "Native HTML button type"],
                ["fullWidth", "boolean",                   "false",    "Stretches button to 100% of parent"],
                ["className", "string",                    '""',       "Extra classes forwarded to root button"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td><code>{prop}</code></td>
                  <td><code>{type}</code></td>
                  <td><code>{def}</code></td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <dt className={styles.a11yTerm}>Semantic element</dt>
              <dd className={styles.a11yDesc}>Renders a native <code>&lt;button&gt;</code> — keyboard focusable, activatable with Enter/Space, and correctly announced by screen readers without any ARIA hacks.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Disabled state</dt>
              <dd className={styles.a11yDesc}>Uses the native <code>disabled</code> attribute — removes from tab order, blocks pointer events, and is announced as "dimmed" or "unavailable" by VoiceOver/NVDA.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Focus ring</dt>
              <dd className={styles.a11yDesc}><code>focus-visible:ring-2</code> shows a 2px blue ring only on keyboard navigation. Mouse clicks don&apos;t trigger the ring (uses <code>:focus-visible</code>, not <code>:focus</code>).</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Icon-only buttons</dt>
              <dd className={styles.a11yDesc}>If using icons without a visible label, pass <code>aria-label</code> via <code>className</code> or wrap in a parent with a tooltip. The component does not enforce this — add <code>aria-label</code> at the usage site.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Contrast</dt>
              <dd className={styles.a11yDesc}><code>#F5F5F4</code> on <code>#2C7FFF</code> = 3.0:1 (passes WCAG AA large text). For small text (14px bold) it meets AA. Disabled state intentionally uses lower contrast per Figma spec.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Reduced motion</dt>
              <dd className={styles.a11yDesc}>Framer Motion <code>whileTap</code> scale respects <code>prefers-reduced-motion</code> via <code>globals.css</code>.</dd>
            </div>
          </dl>
        </section>

      </main>

      {/* ── Right sidebar TOC ─────────────────────────────────── */}
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
