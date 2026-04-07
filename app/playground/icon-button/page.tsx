"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import IconButton from "@/components/ui/IconButton";
import type { IconButtonSize } from "@/components/ui/IconButton";

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
  { token: "rgba(255,255,255,0.10)", hex: "white / 10%", usage: "Hover background"                      },
  { token: "--radius-9",            hex: "32px",         usage: "Button corner radius (pill)"            },
  { token: "--space-1",             hex: "4px",          usage: "Padding around the icon"                },
  { token: "--text-primary",        hex: "#F5F5F4",      usage: "Icon color (default + hover)"           },
  { token: "opacity: 0.40",         hex: "—",            usage: "Disabled state opacity"                 },
];

// ─── Demo icons ───────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>
    </svg>
  );
}
function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5"  r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
    </svg>
  );
}

const ICONS = [
  { id: "x",     label: "Close",  el: <XIcon />     },
  { id: "heart", label: "Like",   el: <HeartIcon />  },
  { id: "share", label: "Share",  el: <ShareIcon />  },
  { id: "more",  label: "More",   el: <MoreIcon />   },
];

const SIZES: IconButtonSize[] = ["sm", "md", "lg"];

function buildSnippet(size: IconButtonSize, disabled: boolean): string {
  const attrs = [
    `size="${size}"`,
    `aria-label="Action"`,
    disabled ? "disabled" : null,
    `onClick={() => console.log("clicked")}`,
  ].filter(Boolean).join("\n  ");
  return `<IconButton\n  ${attrs}\n>\n  <YourIcon />\n</IconButton>`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IconButtonPlayground() {
  const [size,     setSize]     = useState<IconButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [copied,   setCopied]   = useState(false);

  function copy() {
    navigator.clipboard.writeText(buildSnippet(size, disabled));
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
                className={`${styles.navItem} ${item.href === "/playground/icon-button" ? styles.navItemActive : ""}`}
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
          <h1 className={styles.componentName}>Icon Button</h1>
          <p className={styles.componentDesc}>
            Plain icon-only button from Figma node 17784-3201 — <em>IconButtons/Plain</em>.
            Three sizes (Sm · Md · Lg), three states (default · hover · disabled).
            No background by default; a <code>rgba(255,255,255,0.10)</code> fill
            appears on hover. Requires an <code>aria-label</code> for accessibility.
          </p>
          <code className={styles.sourceBadge}>components/ui/IconButton.tsx</code>
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
              <button className={styles.themeBtn} onClick={() => { setSize("md"); setDisabled(false); }}>
                Reset
              </button>
            </div>

            <div className={styles.previewCanvas} style={{ flexDirection: "column", gap: "var(--space-8)", alignItems: "stretch" }}>

              {/* All sizes × icons matrix */}
              {SIZES.map((s) => (
                <div key={s}>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {s} — {s === "sm" ? "32px" : s === "md" ? "40px" : "48px"}
                  </p>
                  <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}>
                    {ICONS.map((icon) => (
                      <IconButton key={icon.id} size={s} aria-label={icon.label}>
                        {icon.el}
                      </IconButton>
                    ))}
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginLeft: "var(--space-2)" }}>hover →</span>
                    <IconButton size={s} aria-label="Hover example" className="bg-[rgba(255,255,255,0.10)]">
                      <HeartIcon />
                    </IconButton>
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginLeft: "var(--space-2)" }}>disabled →</span>
                    <IconButton size={s} aria-label="Disabled example" disabled>
                      <XIcon />
                    </IconButton>
                  </div>
                </div>
              ))}

              {/* Knob-driven live button */}
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Interactive (knobs below)</p>
                <IconButton
                  size={size}
                  disabled={disabled}
                  aria-label="Interactive example"
                  onClick={() => console.log("clicked")}
                >
                  <MoreIcon />
                </IconButton>
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
              <code>{buildSnippet(size, disabled)}</code>
            </pre>
          </div>
          <p className={styles.importHint}>
            <code>{`import IconButton from "@/components/ui/IconButton";`}</code>
          </p>
        </section>

        {/* Props / Knobs */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props / Knobs</h2>
          <div className={styles.knobsGrid}>

            <div className={styles.knobRow}>
              <label className={styles.knobLabel}>size</label>
              <select className={styles.knobSelect} value={size} onChange={(e) => setSize(e.target.value as IconButtonSize)}>
                <option value="sm">sm — 32px</option>
                <option value="md">md — 40px</option>
                <option value="lg">lg — 48px</option>
              </select>
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

          </div>

          {/* Prop table */}
          <table className={styles.tokenTable}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ["children",    "ReactNode",                    "—",        "The icon to render inside the button"],
                ["size",        '"sm" | "md" | "lg"',           '"md"',     "Controls button + icon area size"],
                ["disabled",    "boolean",                      "false",    "Dims icon to 40% opacity, blocks interaction"],
                ["aria-label",  "string",                       "required", "Accessible name — required for icon-only buttons"],
                ["onClick",     "() => void",                   "—",        "Click handler"],
                ["type",        '"button" | "submit" | "reset"','"button"', "Native HTML button type"],
                ["className",   "string",                       '""',       "Extra classes forwarded to the root button"],
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
                  <td><code>{row.hex}</code></td>
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
              <dt className={styles.a11yTerm}>aria-label required</dt>
              <dd className={styles.a11yDesc}>Icon-only buttons have no visible text. The <code>aria-label</code> prop is TypeScript-required and forwarded directly to the <code>&lt;button&gt;</code> element — screen readers announce it as the button&apos;s name.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Semantic element</dt>
              <dd className={styles.a11yDesc}>Renders a native <code>&lt;button&gt;</code> — keyboard focusable by default, activated with Enter/Space, correctly announced without any ARIA hacks.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Disabled state</dt>
              <dd className={styles.a11yDesc}>Uses the native <code>disabled</code> attribute so the button is removed from the tab order and announced as unavailable. Visual treatment: 40% opacity on the icon.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Focus ring</dt>
              <dd className={styles.a11yDesc}><code>focus-visible:ring-2 ring-inset</code> shows a 2px brand-blue ring only on keyboard navigation, not on mouse click.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Hit area</dt>
              <dd className={styles.a11yDesc}>Minimum tap target is 32×32px (Sm) — meets WCAG 2.5.5 Target Size (AAA recommends 44×44px; use <code>size="md"</code> or <code>"lg"</code> in touch contexts).</dd>
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
