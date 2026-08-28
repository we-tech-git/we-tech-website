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
  } = options;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(node);

    // Safety fallback
    const fallback = setTimeout(() => setVisible(true), 2600);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold, rootMargin, delay]);

  const variantClass = variant !== "standard" ? `reveal--${variant}` : "";
  const className = `reveal ${variantClass}${visible ? " visible" : ""}`.trim();

  return { ref, visible, className };
}
