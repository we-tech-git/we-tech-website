import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router doesn't scroll to in-page anchors automatically. On every
// navigation we either jump to the top of the new page or, if the URL
// carries a hash, scroll to that section once it has had a chance to mount.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : "smooth";

    if (hash) {
      const id = hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior, block: "start" });
      };
      const timer = setTimeout(scrollToTarget, 50);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
