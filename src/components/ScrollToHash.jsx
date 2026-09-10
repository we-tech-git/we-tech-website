import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router doesn't scroll to in-page anchors automatically. On every
// navigation we either jump to the top of the new page or, if the URL
// carries a hash, scroll to that section once it has had a chance to mount.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : "smooth";

    if (hash) {
      const id = hash.slice(1);
      if (id === "top") {
        window.scrollTo({ top: 0, left: 0, behavior });
        return;
      }

      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
        }
      };

      // Try immediately, then at 60ms and 150ms for smooth transitions between pages
      scrollToTarget();
      const t1 = setTimeout(scrollToTarget, 60);
      const t2 = setTimeout(scrollToTarget, 180);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}
