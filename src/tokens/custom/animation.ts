/**
 * Animation Tokens — hand-written (not from Figma)
 *
 * These define motion presets used across the design system.
 * Based on MD3 motion guidelines: https://m3.material.io/styles/motion
 */
export const animation = {
  /** Standard easing for most transitions */
  standard: {
    duration: 300,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
  },
  /** Emphasized easing for entrances */
  emphasizedDecelerate: {
    duration: 400,
    easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  },
  /** Emphasized easing for exits */
  emphasizedAccelerate: {
    duration: 200,
    easing: "cubic-bezier(0.3, 0, 0.8, 0.15)",
  },
  /** Quick interactions (ripples, state changes) */
  quick: {
    duration: 100,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
  },
} as const;

export type AnimationToken = keyof typeof animation;
