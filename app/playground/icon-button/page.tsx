"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import IconButton from "@/components/ui/IconButton";
import type { IconButtonVariant, IconButtonSize } from "@/components/ui/IconButton";

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
  { token: "--bg-brand-primary",        hex: "#2C7FFF",              usage: "primary variant background"              },
  { token: "rgba(255,255,255,0.05)",    hex: "white / 5%",           usage: "soft variant background"                 },
  { token: "rgba(255,255,255,0.10)",    hex: "white / 10%",          usage: "hover overlay — all variants"            },
  { token: "--border-secondary",        hex: "#57534E",              usage: "outline variant border"                  },
  { token: "--radius-9",               hex: "32px",                 usage: "pill corner radius — all variants"       },
  { token: "--space-1",                hex: "4px",                  usage: "padding around icon — all sizes"         },
  { token: "--text-primary",           hex: "#F5F5F4",              usage: "icon color — all variants enabled"       },
  { token: "opacity: 0.40",            hex: "—",                    usage: "disabled state — all variants"           },
];

const VARIANTS: IconButtonVariant[] = ["plain", "soft", "primary", "outline"];
const SIZES: IconButtonSize[]       = ["sm", "md", "lg"];

// ─── Demo icons ───────────────────────────────────────────────────────────────
function StarIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>; }
function XIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>; }
function HeartIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>; }
function MoreIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>; }

const VARIANT_DESC: Record<IconButtonVariant, string> = {
  plain:   "Transparent bg · white/10 on hover",
  soft:    "white/5 bg · white/10 on hover",
  primary: "Brand-primary bg · white/10 overlay on hover",
  outline: "Transparent + border-secondary · white/10 on hover",
};

function buildSnippet(variant: IconButtonVariant, size: IconButtonSize, disabled: boolean): string {
  const attrs = [
    variant !== "plain" ? `variant="${variant}"` : null,
    size    !== "md"    ? `size="${size}"`        : null,
    `aria-label="Action"`,
    disabled            ? "disabled"              : null,
    `onClick={() => console.log("clicked")}`,
  ].filter(Boolean).join("\n  ");
  return `<IconButton\n  ${attrs}\n>\n  <YourIcon />\n</IconButton>`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IconButtonPlayground() {
  const [variant,  setVariant]  = useState<IconButtonVariant>("plain");
  const [size,     setSize]     = useState<IconButtonSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [copied,   setCopied]   = useState(false);

  function copy() {
    navigator.clipboard.writeText(buildSnippet(variant, size, disabled));
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
            Single unified icon-only button from Figma node 17799-7455. One component,
            one <code>variant</code> prop — <strong>plain</strong> · <strong>soft</strong> · <strong>primary</strong> · <strong>outline</strong>.
            Three sizes (Sm · Md · Lg), three states (enabled · hover · disabled).
            Requires an <code>aria-label</code>.
          </p>
          <code className={styles.sourceBadge}>components/ui/IconButton.tsx</code>
        </header>

        {/* Preview */}
        <section id="preview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.previewCard}>
            <div className={styles.previewBar}>
              <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>
                variant: <strong style={{ color: "var(--text-primary)" }}>{variant}</strong>
                {" · "}size: <strong style={{ color: "var(--text-primary)" }}>{size}</strong>
                {" · "}disabled: <strong style={{ color: "var(--text-primary)" }}>{String(disabled)}</strong>
              </span>
              <button className={styles.themeBtn} onClick={() => { setVariant("plain"); setSize("md"); setDisabled(false); }}>
                Reset
              </button>
            </div>

            <div className={styles.previewCanvas} style={{ flexDirection: "column", gap: "var(--space-8)", alignItems: "stretch" }}>

              {/* Full variant × size matrix */}
              {VARIANTS.map((v) => (
                <div key={v}>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-1)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{v}</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)" }}>{VARIANT_DESC[v]}</p>
                  <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center", flexWrap: "wrap" }}>
                    {SIZES.map((s) => (
                      <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center" }}>
                          {/* Enabled */}
                          <IconButton variant={v} size={s} aria-label={`${v} ${s} enabled`}><StarIcon /></IconButton>
                          {/* Hover (forced via className) */}
                          <IconButton variant={v} size={s} aria-label={`${v} ${s} hover`}
                            className={v === "primary" ? "bg-bg-brand-primary [&>span:first-child]:opacity-10" : "bg-[rgba(255,255,255,0.10)]"}
                          ><HeartIcon /></IconButton>
                          {/* Disabled */}
                          <IconButton variant={v} size={s} aria-label={`${v} ${s} disabled`} disabled><XIcon /></IconButton>
                        </div>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Interactive knob-driven */}
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Interactive (use knobs below)</p>
                <IconButton
                  variant={variant}
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
              <button className={styles.copyBtn} onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
            </div>
            <pre className={styles.pre}><code>{buildSnippet(variant, size, disabled)}</code></pre>
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
              <label className={styles.knobLabel}>variant</label>
              <select className={styles.knobSelect} value={variant} onChange={(e) => setVariant(e.target.value as IconButtonVariant)}>
                <option value="plain">plain — transparent</option>
                <option value="soft">soft — white/5 bg</option>
                <option value="primary">primary — brand blue</option>
                <option value="outline">outline — border</option>
              </select>
            </div>
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
                <span className={styles.knobTogglePill} data-on={disabled}><span className={styles.knobToggleThumb} /></span>
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
                ["children",   "ReactNode",                                         "—",        "Icon to render inside the button"],
                ["variant",    '"plain" | "soft" | "primary" | "outline"',          '"plain"',  "Visual style — controls bg, border, hover treatment"],
                ["size",       '"sm" | "md" | "lg"',                                '"md"',     "sm=32px · md=40px · lg=48px"],
                ["disabled",   "boolean",                                            "false",    "opacity-40, pointer-events blocked, native disabled"],
                ["aria-label", "string",                                             "required", "Accessible name — required for icon-only buttons"],
                ["onClick",    "() => void",                                         "—",        "Click handler"],
                ["type",       '"button" | "submit" | "reset"',                      '"button"', "Native HTML button type"],
                ["className",  "string",                                             '""',       "Extra classes forwarded to root button"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}><td><code>{prop}</code></td><td><code>{type}</code></td><td><code>{def}</code></td><td>{desc}</td></tr>
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
                        <span style={{ display:"inline-block", width:14, height:14, borderRadius:3, background:row.hex, border:"1px solid var(--border-primary)", flexShrink:0 }} />
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
              <dt className={styles.a11yTerm}>aria-label required</dt>
              <dd className={styles.a11yDesc}>Icon-only buttons have no visible text. <code>aria-label</code> is TypeScript-required and forwarded to the native <code>&lt;button&gt;</code> element so screen readers announce a meaningful name.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Semantic element</dt>
              <dd className={styles.a11yDesc}>Renders a native <code>&lt;button&gt;</code> — keyboard focusable, activated with Enter/Space, no ARIA overrides needed.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Disabled</dt>
              <dd className={styles.a11yDesc}>Uses the native <code>disabled</code> attribute — removed from tab order, announced as unavailable, pointer events blocked. Visual: 40% opacity on the entire button.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Focus ring</dt>
              <dd className={styles.a11yDesc}><code>focus-visible:ring-2 ring-inset</code> — 2px brand-blue ring appears only on keyboard navigation, not mouse click.</dd>
            </div>
            <div className={styles.a11yItem}>
              <dt className={styles.a11yTerm}>Hit area</dt>
              <dd className={styles.a11yDesc}>Minimum 32×32px (sm). Use <code>size="md"</code> (40px) or <code>"lg"</code> (48px) in touch interfaces to meet WCAG 2.5.5.</dd>
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
