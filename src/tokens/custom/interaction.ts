/**
 * Interaction State Tokens — Montage-matched
 * Hand-written (not from Figma pipeline)
 *
 * Source: Montage (wanteddev/montage-web) interaction states
 * Reference: scripts/figma-docs/montage-tokens.md
 *
 * Overlay opacity = how much the state overlay covers the surface.
 * Component opacity = 1 - overlay opacity (what you apply to the component).
 */

/** Hover state overlay opacities */
export const HOVER_OPACITY_LIGHT = 0.0375;
export const HOVER_OPACITY_NORMAL = 0.05;
export const HOVER_OPACITY_STRONG = 0.075;

/** Active/pressed state overlay opacities */
export const ACTIVE_OPACITY_LIGHT = 0.09;
export const ACTIVE_OPACITY_NORMAL = 0.12;
export const ACTIVE_OPACITY_STRONG = 0.18;

/** Component opacity when pressed (1 - overlay) */
export const PRESSED_OPACITY = 1 - ACTIVE_OPACITY_NORMAL; // 0.88
export const PRESSED_OPACITY_STRONG = 1 - ACTIVE_OPACITY_STRONG; // 0.82

/** Disabled state */
export const DISABLED_OPACITY = 0.43;

/** Focus ring */
export const FOCUS_OUTLINE_WIDTH = 2;

/** Transition timing */
export const TRANSITION_DURATION_MS = 150;
export const TRANSITION_EASING = "ease";
