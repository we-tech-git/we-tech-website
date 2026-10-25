/* ============================================================
   WE TECH HUB — MOTION TOKENS & UTILITIES
   Fase H · Motion Hierarchy & Microinteraction System

   Two consolidated GSAP curves — mirroring the CSS --ease-out /
   --ease-precision pair — drive every tween in the app instead of
   a different bezier per component.
   ============================================================ */

import gsap from "gsap";

/* --- EASING TOKENS ---
   standard — snappy, directional out-curve. Hover/focus response,
              content reveals, entrances (Level 1–3).
   emphasis — smooth symmetric curve. Narrative/layer morphs, pointer
              tracking, state transitions (Level 4). */
export const EASINGS = {
  standard: "power3.out",
  emphasis: "power2.inOut",
};

/* --- DURATION TOKENS (seconds) ---
   fast      — Level 1 micro response: hover, focus, small offsets (~160–240ms)
   base      — Level 2/3 content & section-interaction transitions (~350–650ms)
   editorial — Level 4 narrative reveals, section intros, layer settles (~700–850ms) */
export const DURATIONS = {
  fast: 0.22,
  base: 0.45,
  editorial: 0.75,
};

/* --- MEDIA QUERY HELPERS --- */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isPointerFine() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function isDesktopViewport() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 1025;
}

/* --- MAGNETIC BUTTON HELPER (Desktop Only, Pointer Fine) ---
   Applies a restrained, elegant magnetic pull (max 4-6px) on hover.
   Automatically cleans up on mouseleave.
   ------------------------------------------------------------ */
export function initMagneticElement(element, strength = 0.2, maxOffset = 6) {
  if (!element || typeof window === "undefined") return () => {};
  if (prefersReducedMotion() || !isPointerFine()) return () => {};

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Strict clamping to avoid excessive movement
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    gsap.to(element, {
      x: clampedX,
      y: clampedY,
      duration: 0.35,
      ease: EASINGS.standard,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: EASINGS.standard,
      overwrite: "auto",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
    gsap.set(element, { x: 0, y: 0 });
  };
}
