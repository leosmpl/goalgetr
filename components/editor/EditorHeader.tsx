import IconButton from "@/components/ui/IconButton";

interface EditorHeaderProps {
  onClose?:  () => void;
  onAction?: () => void;
}

export default function EditorHeader({ onClose, onAction }: EditorHeaderProps) {
  return (
    <header className="relative h-14 flex items-center justify-between px-space-4 flex-shrink-0">

      {/* Left — close */}
      <IconButton variant="plain" size="md" aria-label="Close editor" onClick={onClose}>
        {/* X icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </IconButton>

      {/* Center — title absolutely centred */}
      <span className="absolute left-1/2 -translate-x-1/2 text-size-base font-medium text-text-primary whitespace-nowrap">
        Edit card
      </span>

      {/* Right — primary action */}
      <IconButton variant="primary" size="md" aria-label="Save card" onClick={onAction}>
        {/* Save / floppy-disk icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M13 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h8l3 3v8a1 1 0 0 1-1 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 14V9H5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 2v4h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconButton>

    </header>
  );
}
