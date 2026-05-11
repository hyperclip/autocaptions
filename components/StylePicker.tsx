"use client";

import { CAPTION_STYLES } from "@/lib/captionStyles";

type Props = {
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
};

export function StylePicker({ value, onChange, disabled }: Props) {
  return (
    <div className="w-full">
      <div
        className="text-[11px] uppercase tracking-wider mb-2"
        style={{ color: "var(--muted)" }}
      >
        Caption style
      </div>
      <div className="flex flex-wrap gap-2">
        {CAPTION_STYLES.map((preset) => {
          const selected = preset.id === value;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onChange(preset.id)}
              disabled={disabled}
              title={preset.description}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium",
                "transition-all duration-150",
                "disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "shadow-sm"
                  : "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
              ].join(" ")}
              style={{
                background: selected ? "var(--accent)" : "transparent",
                color: selected ? "var(--accent-fg)" : "var(--fg)",
                borderColor: selected ? "var(--accent)" : "var(--border)",
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
