"use client";

import { useRef } from "react";
import Image from "next/image";

interface AvatarTabProps {
  photoUrl: string | null;
  teamLogoUrl: string | null;
  onPhotoChange: (base64: string | null) => void;
  onTeamLogoChange: (base64: string | null) => void;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) { reject(new Error("Not an image")); return; }
    if (file.size > 5 * 1024 * 1024)    { reject(new Error("File too large")); return; }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface UploadAreaProps {
  label: string;
  previewUrl: string | null;
  previewAlt: string;
  onUpload: (b64: string | null) => void;
  square?: boolean;
}

function UploadArea({ label, previewUrl, previewAlt, onUpload, square }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await readFileAsBase64(file);
      onUpload(b64);
    } catch {
      // Silent fail — invalid type or too large
    }
    e.target.value = ""; // reset so same file can be re-selected
  };

  return (
    <div className="flex flex-col gap-space-2">
      <p className="text-size-xs font-semibold text-text-secondary uppercase tracking-wider">{label}</p>
      <div
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-radius-5 border-2 border-dashed border-border-secondary
          flex flex-col items-center justify-center gap-space-2
          hover:border-bg-brand-primary transition-colors duration-150
          overflow-hidden
          ${square ? "w-20 h-20" : "w-full h-36"}
        `}
        role="button"
        aria-label={`Upload ${label}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt={previewAlt}
              fill
              className="object-cover"
              sizes={square ? "80px" : "320px"}
            />
            {/* Edit overlay */}
            <div className="absolute inset-0 bg-bg-primary/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-150">
              <span className="text-size-xs font-semibold text-text-primary">Change</span>
            </div>
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-size-xs text-text-tertiary text-center px-space-2">
              Tap to upload
            </span>
          </>
        )}
      </div>

      {/* Remove button */}
      {previewUrl && (
        <button
          onClick={(e) => { e.stopPropagation(); onUpload(null); }}
          className="text-size-xs text-text-tertiary hover:text-bg-error-primary transition-colors duration-150 self-start"
        >
          Remove
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}

export default function AvatarTab({
  photoUrl,
  teamLogoUrl,
  onPhotoChange,
  onTeamLogoChange,
}: AvatarTabProps) {
  return (
    <div className="flex flex-col gap-space-5 pb-space-4">
      <UploadArea
        label="Player Photo"
        previewUrl={photoUrl}
        previewAlt="Player photo"
        onUpload={onPhotoChange}
      />
      <div className="flex items-start gap-space-4">
        <UploadArea
          label="Team Logo"
          previewUrl={teamLogoUrl}
          previewAlt="Team logo"
          onUpload={onTeamLogoChange}
          square
        />
        <p className="text-size-xs text-text-tertiary pt-space-6 leading-relaxed">
          Team logo appears in the card header badge.
          Square images work best.
        </p>
      </div>
    </div>
  );
}
