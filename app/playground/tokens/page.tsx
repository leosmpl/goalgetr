"use client";

import { useState, useMemo } from "react";
import { NAV_ITEMS } from "../_nav";
import { usePathname } from "next/navigation";

// ─── Token data — sourced from /Tokens/*.json ─────────────────────────────
// Rule: every hex value must trace to a token file entry.

interface ColorToken { name: string; var: string; hex: string; source: string; alpha?: boolean; }
interface RadiusToken { name: string; var: string; px: string; }
interface SpacingToken { name: string; var: string; px: string; }
interface TypographyToken { name: string; var: string; value: string; }

const COLOR_SECTIONS: { label: string; tokens: ColorToken[] }[] = [
  {
    label: "Background",
    tokens: [
      { name: "bg-primary",           var: "--bg-primary",           hex: "#0C0A09", source: "Neutral/950" },
      { name: "bg-secondary",         var: "--bg-secondary",         hex: "#1B1917", source: "Neutral/900" },
      { name: "bg-tertiary",          var: "--bg-tertiary",          hex: "#282524", source: "Neutral/800" },
      { name: "bg-quaternary",        var: "--bg-quaternary",        hex: "#44403C", source: "Neutral/700" },
      { name: "bg-inverse",           var: "--bg-inverse",           hex: "#FFFFFF", source: "Common/White" },
      { name: "bg-brand-primary",     var: "--bg-brand-primary",     hex: "#2C7FFF", source: "Blue/500" },
      { name: "bg-brand-secondary",   var: "--bg-brand-secondary",   hex: "#BFDBFF", source: "Blue/200" },
      { name: "bg-error-primary",     var: "--bg-error-primary",     hex: "#FD603D", source: "Red/500" },
      { name: "bg-error-secondary",   var: "--bg-error-secondary",   hex: "#FFB690", source: "Red/200" },
      { name: "bg-success-primary",   var: "--bg-success-primary",   hex: "#21A77C", source: "Teal/500" },
      { name: "bg-success-secondary", var: "--bg-success-secondary", hex: "#8FEFC8", source: "Teal/200" },
    ],
  },
  {
    label: "Foreground",
    tokens: [
      { name: "fg-primary",           var: "--fg-primary",           hex: "#FAFAF9", source: "Neutral/50" },
      { name: "fg-secondary",         var: "--fg-secondary",         hex: "#F5F5F4", source: "Neutral/100" },
      { name: "fg-tertiary",          var: "--fg-tertiary",          hex: "#E7E5E4", source: "Neutral/200" },
      { name: "fg-quaternary",        var: "--fg-quaternary",        hex: "#D6D3D1", source: "Neutral/300" },
      { name: "fg-inverse",           var: "--fg-inverse",           hex: "#0C0A09", source: "Neutral/950" },
      { name: "fg-brand",             var: "--fg-brand",             hex: "#DBEAFE", source: "Blue/100" },
      { name: "fg-brand-secondary",   var: "--fg-brand-secondary",   hex: "#2C7FFF", source: "Blue/500" },
      { name: "fg-error-primary",     var: "--fg-error-primary",     hex: "#FFD1AD", source: "Red/100" },
      { name: "fg-error-secondary",   var: "--fg-error-secondary",   hex: "#FD603D", source: "Red/500" },
      { name: "fg-success-primary",   var: "--fg-success-primary",   hex: "#B0FFE0", source: "Teal/100" },
      { name: "fg-success-secondary", var: "--fg-success-secondary", hex: "#21A77C", source: "Teal/500" },
    ],
  },
  {
    label: "Text",
    tokens: [
      { name: "text-primary",   var: "--text-primary",   hex: "#F5F5F4", source: "Neutral/100" },
      { name: "text-secondary", var: "--text-secondary", hex: "#D6D3D1", source: "Neutral/300" },
      { name: "text-tertiary",  var: "--text-tertiary",  hex: "#A5A09C", source: "Neutral/400" },
      { name: "text-inverse",   var: "--text-inverse",   hex: "#0C0A09", source: "Neutral/950" },
      { name: "text-brand",     var: "--text-brand",     hex: "#2C7FFF", source: "Blue/500" },
      { name: "text-error",     var: "--text-error",     hex: "#FD603D", source: "Red/500" },
      { name: "text-success",   var: "--text-success",   hex: "#21A77C", source: "Teal/500" },
    ],
  },
  {
    label: "Border",
    tokens: [
      { name: "border-primary",   var: "--border-primary",   hex: "#282524", source: "Neutral/800" },
      { name: "border-secondary", var: "--border-secondary", hex: "#57534E", source: "Neutral/600" },
      { name: "border-tertiary",  var: "--border-tertiary",  hex: "#A5A09C", source: "Neutral/400" },
      { name: "border-white",     var: "--border-white",     hex: "#FFFFFF", source: "Common/White" },
    ],
  },
  {
    label: "Yellow Primitives (Card Accents)",
    tokens: [
      { name: "yellow-300", var: "--yellow-300", hex: "#FFDD87", source: "Yellow/300" },
      { name: "yellow-400", var: "--yellow-400", hex: "#FFCF69", source: "Yellow/400" },
      { name: "yellow-500", var: "--yellow-500", hex: "#FFB938", source: "Yellow/500" },
      { name: "yellow-600", var: "--yellow-600", hex: "#DB9628", source: "Yellow/600" },
      { name: "yellow-700", var: "--yellow-700", hex: "#B7751C", source: "Yellow/700" },
    ],
  },
];

const RADIUS_TOKENS: RadiusToken[] = [
  { name: "radius-0",    var: "--radius-0",    px: "0px"    },
  { name: "radius-1",    var: "--radius-1",    px: "2px"    },
  { name: "radius-2",    var: "--radius-2",    px: "4px"    },
  { name: "radius-3",    var: "--radius-3",    px: "6px"    },
  { name: "radius-4",    var: "--radius-4",    px: "8px"    },
  { name: "radius-5",    var: "--radius-5",    px: "12px"   },
  { name: "radius-6",    var: "--radius-6",    px: "16px"   },
  { name: "radius-7",    var: "--radius-7",    px: "20px"   },
  { name: "radius-8",    var: "--radius-8",    px: "24px"   },
  { name: "radius-9",    var: "--radius-9",    px: "32px"   },
  { name: "radius-11",   var: "--radius-11",   px: "48px"   },
  { name: "radius-full", var: "--radius-full", px: "9999px" },
];

const SPACING_TOKENS: SpacingToken[] = [
  { name: "space-1",  var: "--space-1",  px: "4px"   },
  { name: "space-2",  var: "--space-2",  px: "8px"   },
  { name: "space-3",  var: "--space-3",  px: "12px"  },
  { name: "space-4",  var: "--space-4",  px: "16px"  },
  { name: "space-5",  var: "--space-5",  px: "20px"  },
  { name: "space-6",  var: "--space-6",  px: "24px"  },
  { name: "space-7",  var: "--space-7",  px: "28px"  },
  { name: "space-8",  var: "--space-8",  px: "32px"  },
  { name: "space-9",  var: "--space-9",  px: "36px"  },
  { name: "space-10", var: "--space-10", px: "40px"  },
  { name: "space-11", var: "--space-11", px: "44px"  },
  { name: "space-12", var: "--space-12", px: "48px"  },
  { name: "space-14", var: "--space-14", px: "56px"  },
  { name: "space-16", var: "--space-16", px: "64px"  },
  { name: "space-20", var: "--space-20", px: "80px"  },
  { name: "space-24", var: "--space-24", px: "96px"  },
  { name: "space-32", var: "--space-32", px: "128px" },
];

const TYPE_TOKENS: TypographyToken[] = [
  { name: "text-xs",   var: "--text-xs",   value: "12px / 16px" },
  { name: "text-sm",   var: "--text-sm",   value: "14px / 20px" },
  { name: "text-base", var: "--text-base", value: "16px / 24px" },
  { name: "text-lg",   var: "--text-lg",   value: "18px / 28px" },
  { name: "text-xl",   var: "--text-xl",   value: "20px / 28px" },
  { name: "text-2xl",  var: "--text-2xl",  value: "24px / 32px" },
  { name: "text-3xl",  var: "--text-3xl",  value: "30px / 36px" },
  { name: "text-4xl",  var: "--text-4xl",  value: "36px / 40px" },
  { name: "text-5xl",  var: "--text-5xl",  value: "48px / 48px" },
  { name: "text-6xl",  var: "--text-6xl",  value: "60px / 60px" },
  { name: "text-7xl",  var: "--text-7xl",  value: "72px / 72px" },
];

// ─── Copy helper ─────────────────────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };
  return { copy, copied };
}

// ─── Inline styles using CSS vars ────────────────────────────────────────
const S = {
  shell: {
    display: "grid" as const,
    gridTemplateColumns: "220px 1fr 180px",
    gap: "var(--space-8)",
    minHeight: "100vh",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "var(--space-8) var(--space-6)",
    alignItems: "start" as const,
    background: "var(--bg-primary)",
    fontFamily: "var(--font-sans)",
    color: "var(--text-primary)",
  },
  leftSidebar: {
    position: "sticky" as const,
    top: "var(--space-8)",
    height: "calc(100vh - var(--space-16))",
    overflowY: "auto" as const,
  },
  sidebarTitle: {
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--text-secondary)",
    padding: "0 var(--space-3)",
    marginBottom: "var(--space-2)",
    display: "block",
  },
  navItem: (active: boolean): React.CSSProperties => ({
    display: "block",
    padding: "var(--space-2) var(--space-3)",
    borderRadius: "var(--radius-4)",
    fontSize: "var(--text-sm)",
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    textDecoration: "none",
    fontWeight: active ? 600 : 400,
    background: active ? "var(--bg-tertiary)" : "transparent",
    marginBottom: "2px",
  }),
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-12)",
    minWidth: 0,
  },
  section: { display: "flex", flexDirection: "column" as const, gap: "var(--space-5)" },
  sectionTitle: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    paddingBottom: "var(--space-3)",
    borderBottom: "1px solid var(--border-primary)",
    margin: 0,
  },
  rightSidebar: {
    position: "sticky" as const,
    top: "var(--space-8)",
    alignSelf: "start" as const,
  },
  tocTitle: {
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "var(--text-secondary)",
    marginBottom: "var(--space-2)",
    display: "block",
  },
  tocLink: {
    display: "block",
    padding: "var(--space-1) 0",
    fontSize: "var(--text-sm)",
    color: "var(--text-secondary)",
    textDecoration: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "var(--text-sm)",
  },
  th: {
    textAlign: "left" as const,
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    color: "var(--text-tertiary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    padding: "var(--space-2) var(--space-3)",
    borderBottom: "1px solid var(--border-primary)",
  },
  td: {
    padding: "var(--space-2) var(--space-3)",
    borderBottom: "1px solid var(--border-primary)",
    color: "var(--text-secondary)",
    verticalAlign: "middle" as const,
  },
  code: {
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-xs)",
    color: "var(--text-primary)",
    background: "var(--bg-tertiary)",
    padding: "2px 6px",
    borderRadius: "var(--radius-2)",
  },
  copyBtn: {
    fontSize: "var(--text-xs)",
    padding: "2px var(--space-2)",
    border: "1px solid var(--border-secondary)",
    borderRadius: "var(--radius-2)",
    background: "transparent",
    color: "var(--text-tertiary)",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
};

const TOC = [
  { id: "colors",     label: "Colors"     },
  { id: "radius",     label: "Radius"     },
  { id: "spacing",    label: "Spacing"    },
  { id: "typography", label: "Typography" },
];

// ─── Color swatch component ───────────────────────────────────────────────
function Swatch({ hex, size = 36 }: { hex: string; size?: number }) {
  // Checkerboard for alpha tokens
  const bg = `
    repeating-conic-gradient(#555 0% 25%, #333 0% 50%)
    0 0 / 10px 10px
  `;
  return (
    <div style={{ position: "relative", width: size, height: size, borderRadius: "var(--radius-3)", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ position: "absolute", inset: 0, background: bg }} />
      <div style={{ position: "absolute", inset: 0, background: hex }} />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────
export default function TokensPage() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const { copy, copied } = useCopy();

  // All color tokens flattened for search
  const allColors = useMemo(
    () => COLOR_SECTIONS.flatMap((s) => s.tokens),
    []
  );

  const q = search.toLowerCase();

  const matchColor = (t: ColorToken) =>
    !q ||
    t.name.toLowerCase().includes(q) ||
    t.hex.toLowerCase().includes(q) ||
    t.source.toLowerCase().includes(q) ||
    t.var.toLowerCase().includes(q);

  const matchRadius = (t: RadiusToken) =>
    !q || t.name.includes(q) || t.px.includes(q) || t.var.includes(q);

  const matchSpacing = (t: SpacingToken) =>
    !q || t.name.includes(q) || t.px.includes(q) || t.var.includes(q);

  const matchType = (t: TypographyToken) =>
    !q || t.name.includes(q) || t.value.includes(q) || t.var.includes(q);

  return (
    <div style={S.shell}>
      {/* ── LEFT SIDEBAR ── */}
      <nav style={S.leftSidebar}>
        <span style={S.sidebarTitle}>Design System</span>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={S.navItem(pathname === item.href)}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* ── CENTER CONTENT ── */}
      <main style={S.content}>
        {/* Header */}
        <header id="overview">
          <h1 style={{ fontSize: "var(--text-4xl)", fontWeight: 800, margin: "0 0 var(--space-2)" }}>
            Design Tokens
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-secondary)", margin: "0 0 var(--space-5)" }}>
            Every token sourced from <code style={S.code}>/Tokens/*.json</code>. Click any row to copy its CSS variable.
          </p>
          {/* Search */}
          <input
            type="search"
            placeholder="Search tokens — name, hex, source…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "var(--space-3) var(--space-4)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "var(--radius-5)",
              color: "var(--text-primary)",
              fontSize: "var(--text-sm)",
              outline: "none",
              fontFamily: "var(--font-sans)",
              boxSizing: "border-box",
            }}
          />
        </header>

        {/* ── COLORS ── */}
        <section id="colors" style={S.section}>
          <h2 style={S.sectionTitle}>Colors</h2>
          {COLOR_SECTIONS.map((section) => {
            const filtered = section.tokens.filter(matchColor);
            if (!filtered.length) return null;
            return (
              <div key={section.label}>
                <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", marginBottom: "var(--space-2)" }}>
                  {section.label}
                </p>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Token</th>
                      <th style={S.th}>Swatch</th>
                      <th style={S.th}>Hex</th>
                      <th style={S.th}>Source</th>
                      <th style={S.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.var} style={{ cursor: "pointer" }} onClick={() => copy(`var(${t.var})`)}>
                        <td style={S.td}><code style={S.code}>{t.var}</code></td>
                        <td style={S.td}><Swatch hex={t.hex} /></td>
                        <td style={{ ...S.td, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{t.hex}</td>
                        <td style={{ ...S.td, color: "var(--text-tertiary)", fontSize: "var(--text-xs)" }}>← {t.source}</td>
                        <td style={S.td}>
                          <button style={S.copyBtn} onClick={(e) => { e.stopPropagation(); copy(`var(${t.var})`); }}>
                            {copied === `var(${t.var})` ? "✓ Copied" : "Copy"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>

        {/* ── RADIUS ── */}
        <section id="radius" style={S.section}>
          <h2 style={S.sectionTitle}>Border Radius</h2>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Token</th>
                <th style={S.th}>Preview</th>
                <th style={S.th}>Value</th>
                <th style={S.th}></th>
              </tr>
            </thead>
            <tbody>
              {RADIUS_TOKENS.filter(matchRadius).map((t) => (
                <tr key={t.var}>
                  <td style={S.td}><code style={S.code}>{t.var}</code></td>
                  <td style={S.td}>
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: t.px === "9999px" ? "50%" : t.px,
                      background: "var(--bg-brand-primary)",
                      opacity: 0.7,
                    }} />
                  </td>
                  <td style={{ ...S.td, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{t.px}</td>
                  <td style={S.td}>
                    <button style={S.copyBtn} onClick={() => copy(`var(${t.var})`)}>
                      {copied === `var(${t.var})` ? "✓" : "Copy"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ── SPACING ── */}
        <section id="spacing" style={S.section}>
          <h2 style={S.sectionTitle}>Spacing</h2>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Token</th>
                <th style={S.th}>Scale</th>
                <th style={S.th}>Value</th>
                <th style={S.th}></th>
              </tr>
            </thead>
            <tbody>
              {SPACING_TOKENS.filter(matchSpacing).map((t) => {
                const pxNum = parseInt(t.px);
                const barW = Math.min(pxNum, 128);
                return (
                  <tr key={t.var}>
                    <td style={S.td}><code style={S.code}>{t.var}</code></td>
                    <td style={S.td}>
                      <div style={{ width: barW, height: 12, borderRadius: "var(--radius-1)", background: "var(--bg-brand-primary)", opacity: 0.7 }} />
                    </td>
                    <td style={{ ...S.td, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{t.px}</td>
                    <td style={S.td}>
                      <button style={S.copyBtn} onClick={() => copy(`var(${t.var})`)}>
                        {copied === `var(${t.var})` ? "✓" : "Copy"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section id="typography" style={S.section}>
          <h2 style={S.sectionTitle}>Typography</h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", margin: 0 }}>
            Font family: <code style={S.code}>Geist</code> — loaded via <code style={S.code}>next/font/google</code>
          </p>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Token</th>
                <th style={S.th}>Specimen</th>
                <th style={S.th}>size / line-height</th>
                <th style={S.th}></th>
              </tr>
            </thead>
            <tbody>
              {TYPE_TOKENS.filter(matchType).map((t) => {
                const [size] = t.value.split(" / ");
                return (
                  <tr key={t.var}>
                    <td style={S.td}><code style={S.code}>{t.var}</code></td>
                    <td style={{ ...S.td, fontSize: size, fontWeight: 500, color: "var(--text-primary)", maxWidth: "260px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      Goalgetr Player Card
                    </td>
                    <td style={{ ...S.td, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>{t.value}</td>
                    <td style={S.td}>
                      <button style={S.copyBtn} onClick={() => copy(`var(${t.var})`)}>
                        {copied === `var(${t.var})` ? "✓" : "Copy"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>

      {/* ── RIGHT SIDEBAR ── */}
      <aside style={S.rightSidebar}>
        <span style={S.tocTitle}>On This Page</span>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {TOC.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} style={S.tocLink}>{item.label}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
