import IconButton from "@/components/ui/IconButton";
import { IconClose, IconFloppyDisk } from "@/components/ui/icons";

interface EditorHeaderProps {
  onClose?:  () => void;
  onAction?: () => void;
}

export default function EditorHeader({ onClose, onAction }: EditorHeaderProps) {
  return (
    <header className="relative h-14 flex items-center justify-between px-space-4 flex-shrink-0">

      {/* Left — close */}
      <IconButton variant="plain" size="md" aria-label="Close editor" onClick={onClose}>
        <IconClose />
      </IconButton>

      {/* Center — title absolutely centred */}
      <span className="absolute left-1/2 -translate-x-1/2 text-size-base font-medium text-text-primary whitespace-nowrap">
        Edit card
      </span>

      {/* Right — primary action */}
      <IconButton variant="primary" size="md" aria-label="Save card" onClick={onAction}>
        <IconFloppyDisk solid />
      </IconButton>

    </header>
  );
}
