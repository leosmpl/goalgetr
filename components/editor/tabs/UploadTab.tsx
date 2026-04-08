"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IconCamera } from "@/components/ui/icons";

interface UploadTabProps {
  photoUrl: string | null;
  onPhotoChange: (base64: string | null) => void;
}

export default function UploadTab({ photoUrl, onPhotoChange }: UploadTabProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onPhotoChange(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-space-4">
      <p className="text-size-xs font-semibold uppercase tracking-wider text-text-tertiary">
        Player Photo
      </p>

      {photoUrl ? (
        /* ── Preview state ── */
        <div className="relative rounded-radius-5 overflow-hidden bg-bg-tertiary" style={{ height: "160px" }}>
          <Image
            src={photoUrl}
            alt="Player photo"
            fill
            className="object-cover object-top"
            sizes="340px"
            style={{ mixBlendMode: "multiply" }}
          />
          {/* BG Removed badge */}
          <span className="absolute top-space-2 right-space-2 bg-bg-success-primary text-border-white text-[10px] font-bold uppercase tracking-wide px-space-2 py-[3px] rounded-radius-full">
            BG Removed
          </span>

          {/* Change / Remove */}
          <div className="absolute bottom-space-2 left-space-2 flex gap-space-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-bg-primary/70 text-fg-primary text-[11px] font-semibold px-space-3 py-[5px] rounded-radius-full hover:bg-bg-primary transition-colors duration-150"
            >
              Change
            </button>
            <button
              onClick={() => onPhotoChange(null)}
              className="bg-bg-error-primary/80 text-border-white text-[11px] font-semibold px-space-3 py-[5px] rounded-radius-full hover:bg-bg-error-primary transition-colors duration-150"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Upload state ── */
        <button
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-space-3 rounded-radius-5 border-2 border-dashed border-border-secondary text-text-tertiary hover:border-border-tertiary hover:text-text-secondary transition-colors duration-200"
          style={{ height: "160px" }}
        >
          <IconCamera width={28} height={28} />
          <span className="text-size-sm font-medium">Upload Photo</span>
          <span className="text-size-xs opacity-60">JPG, PNG · max 5 MB</span>
        </button>
      )}

      {error && (
        <p className="text-size-xs text-text-error">{error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
