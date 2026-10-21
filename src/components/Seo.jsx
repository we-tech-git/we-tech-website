import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.wetechhub.com.br";

function setHeadTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  const created = !el;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return { el, created };
}

// The site is a SPA, so a static <link rel="canonical"> in index.html would
// point every page at the home. Instead we keep one canonical tag in <head>
// and update it on every navigation. Pages that shouldn't be indexed (404)
// pass `noindex` and get a robots meta; unknown URLs are served with HTTP 200
// by the SPA rewrite, so this is how we keep them out of the index.
export default function Seo({ noindex = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const href = noindex ? null : `${SITE_URL}${path === "/" ? "/" : path}`;

    const canonical = href
      ? setHeadTag('link[rel="canonical"]', () => document.createElement("link"), {
          rel: "canonical",
          href,
        })
      : null;

    const robots = noindex
      ? setHeadTag('meta[name="robots"]', () => document.createElement("meta"), {
          name: "robots",
          content: "noindex, follow",
        })
      : null;

    return () => {
      canonical?.el.remove();
      robots?.el.remove();
    };
  }, [pathname, noindex]);

  return null;
}
