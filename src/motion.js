/* ============================================================
   WE TECH HUB — MOTION TOKENS & UTILITIES
   Fase F · Precision, Assembly, Reveal, Response, Continuity
   ============================================================ */

import gsap from "gsap";

/* --- EASING TOKENS --- */
export const EASINGS = {
  // Precision snappy out for UI and entrances
  precisionOut: "power3.out",
  // Smooth symmetric ease for layer transitions and state morphs
  precisionInOut: "power2.inOut",
  // Gentle curve for editorial text and large surfaces
  editorial: "power2.out",
  // Magnetic spring curve for interactive cursor response
  magnetic: "power4.out",
  // Exponential snap for microinteractions
  expoOut: "expo.out",
};

/* --- DURATION TOKENS (seconds for GSAP, ms for CSS) --- */
export const DURATIONS = {
  fast: 0.22,      // 220ms — Hover, focus, small offsets
  standard: 0.45,  // 450ms — Component transitions, tab switches
  editorial: 0.75, // 750ms — Narrative reveals, section intros
  layer: 0.52,     // 520ms — 2.5D strata transforms
  settle: 0.65,    // 650ms — Image scale settlement
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
      ease: EASINGS.magnetic,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: EASINGS.precisionOut,
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
