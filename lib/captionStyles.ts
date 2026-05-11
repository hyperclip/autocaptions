// Caption style sent to Hyperclip on every run as
// `inputs.model_overrides[<auto_captions step>]._caption_style`.
//
// Field shape documented at:
//   https://docs.hyperclip.co/nodes/auto-captions  (style options)
//   https://docs.hyperclip.co/api/inputs           (_caption_style override key)
//
// This is the viral-TikTok look: bold white text, gold per-word highlight,
// thick black stroke, pop animation per word, lower-middle position.

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

export const CAPTION_STYLE: CaptionStyleOverride = {
  fontFamily: "Anton",
  fontSize: 80,
  textColor: "#FFFFFF",
  highlightColor: "#FFD700",
  strokeColor: "#000000",
  strokeWidth: 8,
  animation: "pop",
  animationScope: "word",
  position: 72,
  uppercase: true,
  shadowColor: "#000000",
  shadowBlur: 12,
};
