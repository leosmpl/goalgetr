interface EditorHeaderProps {
  onClose?: () => void;
}

export default function EditorHeader({ onClose }: EditorHeaderProps) {
  return (
    <header className="relative h-14 flex items-center px-space-4 flex-shrink-0">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close editor"
        className="w-9 h-9 rounded-radius-full bg-bg-tertiary flex items-center justify-center text-text-primary transition-colors duration-150 hover:bg-bg-quaternary active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-brand-primary"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1L13 13M13 1L1 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Title — absolutely centred */}
      <span className="absolute left-1/2 -translate-x-1/2 text-size-base font-semibold text-text-primary whitespace-nowrap">
        Edit card
      </span>
    </header>
  );
}
