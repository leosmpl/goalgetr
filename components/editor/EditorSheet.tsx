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
import { TabBar, TabButton } from "./TabBar";
import { IconCamera, IconCardsBlank, IconPalette, IconBars } from "@/components/ui/icons";

// ─── Tab config ───────────────────────────────────────────────────────────
interface TabConfig {
  id: EditorTab;
  label: string;
  icon: (solid: boolean) => React.ReactNode;
}

const TABS: TabConfig[] = [
  { id: "upload",    label: "Upload",    icon: (s) => <IconCamera solid={s} width={18} height={18} />     },
  { id: "templates", label: "Templates", icon: (s) => <IconCardsBlank solid={s} width={18} height={18} /> },
  { id: "colors",    label: "Colors",    icon: (s) => <IconPalette solid={s} width={18} height={18} />    },
  { id: "filters",   label: "Filters",   icon: (s) => <IconBars solid={s} width={18} height={18} />       },
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
}: EditorSheetProps) {
  return (
    <motion.div
      className="flex flex-col bg-bg-secondary rounded-t-[var(--radius-9)] overflow-hidden"
      style={{ height: "380px" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
    >
      {/* ── Tab navigation — TabBar / TabButton (Figma: node 17791-1956) ── */}
      <TabBar>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            active={tab.id === activeTab}
            label={tab.label}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon(tab.id === activeTab)}
          </TabButton>
        ))}
      </TabBar>

      {/* ── Colors tab — rendered OUTSIDE the overflow-hidden panel wrapper
           so the horizontal swatch scroll row is never clipped ── */}
      <AnimatePresence mode="wait" initial={false}>
        {activeTab === "colors" && (
          <motion.div
            key="colors"
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="flex-1 flex flex-col min-h-0"
          >
            <ColorsTab
              cardColor={card.cardColor}
              onColorChange={onColorChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── All other tab panels — inside clipping panel-scroll context ── */}
      {activeTab !== "colors" && (
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
      )}


    </motion.div>
  );
}
