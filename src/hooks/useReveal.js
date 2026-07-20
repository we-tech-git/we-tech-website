import { useEffect, useRef, useState } from "react";

export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(node);
    // Safety net: force-show if the observer never fires (e.g. element
    // starts off-screen in a way the browser never reports as intersecting).
    const fallback = setTimeout(() => setVisible(true), 2600);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, className: `reveal${visible ? " visible" : ""}` };
}
