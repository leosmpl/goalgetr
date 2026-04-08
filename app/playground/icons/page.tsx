"use client";

import { useState } from "react";
import { COMPONENT_NAV, SYSTEM_NAV } from "../_nav";
import styles from "../player-card/page.module.css";
import {
  IconClose,
  IconFloppyDisk,
  IconCamera,
  IconPalette,
  IconCardsBlank,
  IconBars,
} from "@/components/ui/icons";

const NAV_ITEMS = [...SYSTEM_NAV, ...COMPONENT_NAV];

const TOC_ITEMS = [
  { id: "overview", label: "Overview"  },
  { id: "gallery",  label: "Gallery"   },
  { id: "code",     label: "Code"      },
  { id: "props",    label: "Props"     },
];

// ─── Icon registry ────────────────────────────────────────────────────────────
const ICONS = [
  {
    name: "IconClose",
    figma: "14884:1293",
    usage: "Close / dismiss buttons",
    hasSolid: false,
    render: (solid: boolean, size: number) => <IconClose width={size} height={size} />,
  },
  {
    name: "IconFloppyDisk",
    figma: "17795:3905",
    usage: "Save actions",
    hasSolid: true,
    render: (solid: boolean, size: number) => <IconFloppyDisk solid={solid} width={size} height={size} />,
  },
  {
    name: "IconCamera",
    figma: "17786:9759",
    usage: "Upload / photo tab",
    hasSolid: true,
    render: (solid: boolean, size: number) => <IconCamera solid={solid} width={size} height={size} />,
  },
  {
    name: "IconPalette",
    figma: "17786:9770",
    usage: "Colors tab",
    hasSolid: true,
    render: (solid: boolean, size: number) => <IconPalette solid={solid} width={size} height={size} />,
  },
  {
    name: "IconCardsBlank",
    figma: "17786:9780",
    usage: "Templates tab",
    hasSolid: true,
    render: (solid: boolean, size: number) => <IconCardsBlank solid={solid} width={size} height={size} />,
  },
  {
    name: "IconBars",
    figma: "16235:270",
    usage: "Filters / menu tab",
    hasSolid: true,
    render: (solid: boolean, size: number) => <IconBars solid={solid} width={size} height={size} />,
  },
];

const SIZES = [16, 24, 32];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IconsPlayground() {
  const [size, setSize] = useState(24);
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
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
                className={`${styles.navItem} ${item.href === "/playground/icons" ? styles.navItemActive : ""}`}
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
          <h1 className={styles.componentName}>Icons</h1>
          <p className={styles.componentDesc}>
            Custom icon set sourced from Figma node 12939-5630. SVG paths are permanently
            embedded — no CDN URLs to expire. Each icon accepts a <code>solid</code> prop
            for the filled variant and uses <code>fill="currentColor"</code> to inherit
            any text color from the parent.
          </p>
          <code className={styles.sourceBadge}>components/ui/icons.tsx</code>
        </header>

        {/* Gallery */}
        <section id="gallery" className={styles.section}>
          <h2 className={styles.sectionTitle}>Gallery</h2>

          {/* Size picker */}
          <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: "var(--space-1) var(--space-3)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  border: "1px solid",
                  cursor: "pointer",
                  background: size === s ? "var(--bg-brand-primary)" : "var(--bg-tertiary)",
                  borderColor: size === s ? "var(--bg-brand-primary)" : "var(--border-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                {s}px
              </button>
            ))}
          </div>

          {/* Icon grid */}
          <div className={styles.previewCard}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
              {ICONS.map((icon) => (
                <div
                  key={icon.name}
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-5)",
                    padding: "var(--space-4)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-4)",
                  }}
                >
                  {/* Icon previews */}
                  <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
                    {/* Line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                      <div style={{ color: "var(--text-primary)" }}>
                        {icon.render(false, size)}
                      </div>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Line</span>
                    </div>
                    {/* Solid */}
                    {icon.hasSolid && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)" }}>
                        <div style={{ color: "var(--text-primary)" }}>
                          {icon.render(true, size)}
                        </div>
                        <span style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)" }}>Solid</span>
                      </div>
                    )}
                  </div>

                  {/* Meta */}
                  <div>
                    <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "var(--space-1)" }}>
                      {icon.name}
                    </p>
                    <p style={{ fontSize: "var(--text-xs)", color: "var(--text-tertiary)", marginBottom: "var(--space-2)" }}>
                      {icon.usage}
                    </p>
                    <code style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
                      Figma {icon.figma}
                    </code>
                  </div>

                  {/* Copy import */}
                  <button
                    onClick={() => copy(`import { ${icon.name} } from "@/components/ui/icons";`, icon.name)}
                    style={{
                      padding: "var(--space-1) var(--space-3)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      border: "1px solid var(--border-secondary)",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    {copied === icon.name ? "✓ Copied" : "Copy import"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code */}
        <section id="code" className={styles.section}>
          <h2 className={styles.sectionTitle}>Code</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeFilename}>usage.tsx</span>
              <button
                className={styles.copyBtn}
                onClick={() => copy(
                  `import { IconCamera, IconPalette, IconBars } from "@/components/ui/icons";\n\n// Line (outline)\n<IconCamera />\n\n// Solid (filled)\n<IconCamera solid />\n\n// Custom size\n<IconCamera width={24} height={24} />`,
                  "snippet"
                )}
              >
                {copied === "snippet" ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <pre className={styles.pre}><code>{
`import { IconCamera, IconPalette, IconBars } from "@/components/ui/icons";

// Line (outline) — default
<IconCamera />

// Solid (filled)
<IconCamera solid />

// Custom size
<IconCamera width={24} height={24} />

// Inherit parent color via currentColor
<span className="text-blue-400">
  <IconFloppyDisk solid />
</span>`
            }</code></pre>
          </div>
          <p className={styles.importHint}>
            <code>{`import { IconClose, IconFloppyDisk, IconCamera, IconPalette, IconCardsBlank, IconBars } from "@/components/ui/icons";`}</code>
          </p>
        </section>

        {/* Props */}
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props</h2>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-4)" }}>
            All icons share the same prop interface. <code>IconClose</code> has no <code>solid</code> prop (line-only icon).
          </p>
          <table className={styles.tokenTable}>
            <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ["solid",     "boolean",          "false",   "Render the filled/solid variant instead of line"],
                ["width",     "number | string",  "16",      "SVG width in px"],
                ["height",    "number | string",  "16",      "SVG height in px"],
                ["className", "string",           "—",       "Extra class forwarded to the SVG element"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}><td><code>{prop}</code></td><td><code>{type}</code></td><td><code>{def}</code></td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>
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
