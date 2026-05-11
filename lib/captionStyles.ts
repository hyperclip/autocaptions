// Caption style presets — sent to Hyperclip as
// `inputs.model_overrides[<auto_captions step>]._caption_style`.
//
// Field shape is documented at:
//   https://docs.hyperclip.co/nodes/auto-captions  (style options)
//   https://docs.hyperclip.co/api/inputs           (_caption_style override key)

export type CaptionStyleOverride = {
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  highlightColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  backgroundRadius?: number;
  animation?: "pop" | "fade" | "slide" | "bounce" | "shake" | "zoom" | "none";
  animationScope?: "word" | "group";
  wordGroupSize?: number;
  position?: number;
  uppercase?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
};

export type CaptionStylePreset = {
  id: string;
  label: string;
  description: string;
  // `null` means "don't send an override" — use whatever the flow has baked in.
  override: CaptionStyleOverride | null;
};

export const CAPTION_STYLES: readonly CaptionStylePreset[] = [
  {
    id: "default",
    label: "Default",
    description: "Use the flow's baked-in style",
    override: null,
  },
  {
    id: "pop",
    label: "Pop",
    description: "Yellow word highlight · bounce per word",
    override: {
      fontFamily: "Inter",
      fontSize: 64,
      textColor: "#FFFFFF",
      highlightColor: "#FACC15",
      strokeColor: "#000000",
      strokeWidth: 6,
      animation: "pop",
      animationScope: "word",
      position: 70,
      uppercase: true,
    },
  },
  {
    id: "bold",
    label: "Bold",
    description: "Thick outlined white · 3-word groups",
    override: {
      fontFamily: "Inter",
      fontSize: 72,
      textColor: "#FFFFFF",
      strokeColor: "#000000",
      strokeWidth: 8,
      animation: "fade",
      animationScope: "group",
      wordGroupSize: 3,
      position: 75,
      uppercase: true,
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Small lowercase · subtle fade",
    override: {
      fontFamily: "Inter",
      fontSize: 36,
      textColor: "#FFFFFF",
      strokeColor: "#000000",
      strokeWidth: 2,
      animation: "fade",
      animationScope: "group",
      wordGroupSize: 5,
      position: 88,
      uppercase: false,
    },
  },
] as const;

export const DEFAULT_STYLE_ID = "default";

export function getCaptionStyle(id: string): CaptionStylePreset {
  return (
    CAPTION_STYLES.find((s) => s.id === id) ??
    CAPTION_STYLES.find((s) => s.id === DEFAULT_STYLE_ID)!
  );
}
