"use client";

import { motion, AnimatePresence } from "framer-motion";
import type {
  EditorTab,
  PlayerCardData,
  CardTemplate,
  CardFilter,
} from "@/lib/types";

import ColorsTab    from "./tabs/ColorsTab";
import UploadTab    from "./tabs/UploadTab";
import TemplatesTab from "./tabs/TemplatesTab";
import FiltersTab   from "./tabs/FiltersTab";

// ─── Tab icons (sourced from Figma node 17786:9512) ───────────────────────

function CameraIcon({ solid }: { solid?: boolean }) {
  return solid ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 5h-2.586l-2-2H8.586l-2 2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CardsIcon({ solid }: { solid?: boolean }) {
  return solid ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="4" width="13" height="17" rx="2"/>
      <path d="M17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3V7z" opacity="0.5"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="13" height="17" rx="2" />
      <path d="M17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

function PaletteIcon({ solid }: { solid?: boolean }) {
  return solid ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SlidersIcon({ solid }: { solid?: boolean }) {
  return solid ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 5h2V3H3v2zm0 8h2v-2H3v2zm0 8h2v-2H3v2zm4 0h14v-2H7v2zm0-8h14v-2H7v2zm0-10v2h14V3H7z" opacity="0.4"/>
      <circle cx="10" cy="6" r="2.5"/>
      <circle cx="16" cy="14" r="2.5"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="10" cy="6"  r="2" fill="var(--bg-secondary)" />
      <circle cx="16" cy="12" r="2" fill="var(--bg-secondary)" />
      <circle cx="8"  cy="18" r="2" fill="var(--bg-secondary)" />
    </svg>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────
interface TabConfig {
  id: EditorTab;
  label: string;
  icon: (solid: boolean) => React.ReactNode;
}

const TABS: TabConfig[] = [
  { id: "upload",    label: "Upload",    icon: (s) => <CameraIcon solid={s} />  },
  { id: "templates", label: "Templates", icon: (s) => <CardsIcon solid={s} />   },
  { id: "colors",    label: "Colors",    icon: (s) => <PaletteIcon solid={s} /> },
  { id: "filters",   label: "Filters",   icon: (s) => <SlidersIcon solid={s} /> },
];

// ─── Tab panel slide variants ─────────────────────────────────────────────
const tabVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -16 },
};

// ─── Props ────────────────────────────────────────────────────────────────
interface EditorSheetProps {
  activeTab:        EditorTab;
  card:             PlayerCardData;
  onTabChange:      (tab: EditorTab) => void;
  onColorChange:    (hex: string) => void;
  onPhotoChange:    (base64: string | null) => void;
  onTemplateChange: (t: CardTemplate) => void;
  onFilterChange:   (f: CardFilter) => void;
  onTextRunToggle:  () => void;
  onBlurChange:     (v: number) => void;
  onSave:           () => void;
  isDirty:          boolean;
}

export default function EditorSheet({
  activeTab,
  card,
  onTabChange,
  onColorChange,
  onPhotoChange,
  onTemplateChange,
  onFilterChange,
  onTextRunToggle,
  onBlurChange,
  onSave,
  isDirty,
}: EditorSheetProps) {
  return (
    <motion.div
      className="flex flex-col bg-bg-secondary rounded-t-[var(--radius-9)] overflow-hidden"
      style={{ height: "380px" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
    >
      {/* ── Tab navigation (Figma: border-b row, brand-primary underline) ── */}
      <nav
        className="flex flex-shrink-0 border-b border-border-primary"
        aria-label="Editor sections"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative flex-1 flex items-center justify-center h-14
                transition-colors duration-150 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-bg-brand-primary
                ${isActive ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"}
              `}
            >
              {tab.icon(isActive)}
              {/* Active underline — brand-primary, absolute bottom */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-bg-brand-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Tab panels ── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="absolute inset-0 panel-scroll px-space-4 py-space-4"
          >
            {activeTab === "upload" && (
              <UploadTab
                photoUrl={card.photoUrl}
                onPhotoChange={onPhotoChange}
              />
            )}
            {activeTab === "templates" && (
              <TemplatesTab
                template={card.template}
                onTemplateChange={onTemplateChange}
              />
            )}
            {activeTab === "colors" && (
              <ColorsTab
                cardColor={card.cardColor}
                onColorChange={onColorChange}
              />
            )}
            {activeTab === "filters" && (
              <FiltersTab
                filter={card.filter}
                textRun={card.textRun}
                blurAmount={card.blurAmount}
                onFilterChange={onFilterChange}
                onTextRunToggle={onTextRunToggle}
                onBlurChange={onBlurChange}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Save button ── */}
      <div className="flex-shrink-0 px-space-4 pb-space-4 pt-space-2">
        <motion.button
          onClick={onSave}
          whileTap={{ scale: 0.97 }}
          disabled={!isDirty}
          className={`
            w-full py-space-3 rounded-radius-full text-size-sm font-semibold
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-offset-bg-secondary focus-visible:ring-bg-brand-primary
            ${isDirty
              ? "bg-bg-brand-primary text-border-white"
              : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
            }
          `}
        >
          {isDirty ? "Save" : "No changes"}
        </motion.button>
      </div>
    </motion.div>
  );
}
