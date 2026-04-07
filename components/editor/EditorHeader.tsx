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
        {/* Checkmark icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M2.5 8.5L6.5 12.5L13.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconButton>

    </header>
  );
}
