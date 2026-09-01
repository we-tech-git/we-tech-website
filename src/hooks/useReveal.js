import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver-based reveal with support for custom variants
 * (standard, mask, clip, scale, line).
 * Automatically honors prefers-reduced-motion.
 */
export default function useReveal(options = {}) {
  const {
    variant = "standard", // "standard" | "mask" | "clip" | "scale" | "line"
    threshold = 0.12,
    rootMargin = "0px 0px -8% 0px",
    delay = 0,
    once = false,
  } = options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const delayTimerRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const effectiveThreshold =
      variant === "mask" || variant === "clip"
        ? 0
        : typeof threshold === "number"
          ? threshold
          : 0.12;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
            if (delay > 0) {
              delayTimerRef.current = setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            if (once) {
              io.unobserve(entry.target);
            }
          } else {
            // Replay mode: reset only when the element has truly exited the physical viewport
            // (prevents micro-scroll jitter and never disappears while visible)
            if (!once) {
              const rect = entry.boundingClientRect;
              const isCompletelyOffscreen =
                rect.top >= window.innerHeight || rect.bottom <= 0;

              if (isCompletelyOffscreen) {
                if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
                setVisible(false);
              }
            }
          }
        });
      },
      { threshold: effectiveThreshold, rootMargin }
    );

    io.observe(node);

    return () => {
      io.disconnect();
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, [threshold, rootMargin, delay, once]);

  const variantClass = variant !== "standard" ? `reveal--${variant}` : "";
  const className = `reveal ${variantClass}${visible ? " visible" : ""}`.trim();

  return { ref, visible, className };
}
