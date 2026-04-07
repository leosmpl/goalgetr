"use client";

import AvatarTab from "./AvatarTab";

interface TeamTabProps {
  teamName: string;
  teamLogoUrl: string | null;
  onTeamNameChange: (name: string) => void;
  onTeamLogoChange: (b64: string | null) => void;
}

const inputClass =
  "w-full bg-bg-tertiary border border-border-primary rounded-radius-4 px-space-3 py-space-2 text-size-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-bg-brand-primary focus:ring-1 focus:ring-bg-brand-primary transition-colors duration-150";

export default function TeamTab({
  teamName,
  teamLogoUrl,
  onTeamNameChange,
  onTeamLogoChange,
}: TeamTabProps) {
  return (
    <div className="flex flex-col gap-space-5 pb-space-4">
      {/* Team name */}
      <div>
        <label
          htmlFor="teamName"
          className="block text-size-xs font-semibold text-text-secondary uppercase tracking-wider mb-space-1"
        >
          Team name
        </label>
        <input
          id="teamName"
          type="text"
          value={teamName}
          onChange={(e) => onTeamNameChange(e.target.value.toUpperCase())}
          placeholder="GOALGETR FC"
          maxLength={24}
          className={inputClass}
        />
      </div>

      {/* Team logo — reuse AvatarTab's UploadArea indirectly */}
      <div>
        <p className="text-size-xs font-semibold text-text-secondary uppercase tracking-wider mb-space-2">
          Team Logo
        </p>
        {/* Render only the logo portion of AvatarTab by passing null photo */}
        <AvatarTab
          photoUrl={null}
          teamLogoUrl={teamLogoUrl}
          onPhotoChange={() => {}}
          onTeamLogoChange={onTeamLogoChange}
        />
      </div>

      {/* Kit colour — coming soon placeholder */}
      <div className="rounded-radius-5 border border-dashed border-border-secondary px-space-4 py-space-4 flex items-center justify-between opacity-50">
        <div>
          <p className="text-size-sm font-semibold text-text-secondary">Kit Colour</p>
          <p className="text-size-xs text-text-tertiary">Customise your team kit</p>
        </div>
        <span className="text-size-xs font-bold uppercase tracking-wider text-text-tertiary bg-bg-tertiary px-space-3 py-space-1 rounded-radius-full">
          Soon
        </span>
      </div>
    </div>
  );
}
