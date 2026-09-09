import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projetos } from "../projetos.js";
import useReveal from "../hooks/useReveal.js";
import { EASINGS, DURATIONS, prefersReducedMotion, isPointerFine } from "../motion.js";
import { ExploreIcon } from "./Icons.jsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   PROJECT ORDER — curated for visual strength & sector variety
   1. We Party       — strongest screenshot, social/events, live link
   2. Lelume         — edtech/institutional, credibility
   3. Maria Mariana  — e-commerce, different sector
   4. Blue Token     — Web3, live link, monumental close
   --------------------------------------------------------------- */
const projectOrder = ["we-party", "lelume", "maria-mariana", "blue-token"];
const ordered = projectOrder
  .map((slug) => projetos.find((p) => p.slug === slug))
  .filter(Boolean);

/* Resolve WebP with PNG fallback */
function imgSrc(path) {
  return path;
}

function fallbackImgSrc(path) {
  return path.replace(".webp", ".png");
}

/* ---------------------------------------------------------------
   PROJECT CONFIGURATIONS — 3 Scales, Asymmetric Signatures & Rhythm
   - we-party:     LARGE / Opening case / Full-Bleed Right / Mask Reveal
   - lelume:       MEDIUM / Institutional Precision / Reversed / Chrome-First
   - maria-mariana: COMPACT / Editorial Pause / Negative Space / Minimal Settle
   - blue-token:   LARGE / Monumental Close / Panoramic Masked Expansion
   --------------------------------------------------------------- */
const projectConfigs = {
  "we-party": {
    scale: "large",
    variant: "bleed-right",
    hasChrome: false,
    aspectRatio: "16 / 8.5",
    revealVariant: "mask",
  },
  "lelume": {
    scale: "medium",
    variant: "reversed-chrome",
    hasChrome: true,
    chromeDomain: "lelume.com.br",
    aspectRatio: "16 / 10",
    revealVariant: "standard",
  },
  "maria-mariana": {
    scale: "compact",
    variant: "compact-editorial",
    hasChrome: false,
    aspectRatio: "16 / 7.1",
    revealVariant: "standard",
  },
  "blue-token": {
    scale: "large",
    variant: "monumental-close",
    hasChrome: false,
    aspectRatio: "16 / 8.2",
    revealVariant: "clip",
  },
};

/* ---------------------------------------------------------------
   PROJECT ROW — distinct compositive & motion signature per case
   --------------------------------------------------------------- */
function ProjectRow({ projeto, index }) {
  const num = String(index + 1).padStart(2, "0");
  const total = ordered.length;
  const rowRef = useRef(null);
  const imgFrameRef = useRef(null);
  const imgElementRef = useRef(null);
  const metaRef = useRef(null);
  const chromeRef = useRef(null);

  const config = projectConfigs[projeto.slug] || {
    scale: "medium",
    variant: "default",
    hasChrome: false,
    revealVariant: "standard",
  };

  const isReversed = config.variant === "reversed-chrome";

  /* ---- Dedicated GSAP Scroll-Triggered Entrance per Project Type ---- */
  useEffect(() => {
    const el = rowRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      let tl = null;
      let startPos = "top 80%";

      if (projeto.slug === "we-party") {
        startPos = "top 88%";
        tl = gsap.timeline({ paused: true });
        tl.fromTo(
          imgFrameRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.85,
            ease: EASINGS.standard,
          },
          0
        )
          .fromTo(
            imgElementRef.current,
            { scale: 1.04 },
            { scale: 1, duration: 0.95, ease: EASINGS.standard },
            0.05
          )
          .fromTo(
            metaRef.current,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.65, ease: EASINGS.standard },
            0.25
          );
      } else if (projeto.slug === "lelume") {
        startPos = "top 88%";
        tl = gsap.timeline({ paused: true });
        if (chromeRef.current) {
          tl.fromTo(
            chromeRef.current,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.45, ease: EASINGS.standard },
            0
          );
        }
        tl.fromTo(
          imgFrameRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: EASINGS.standard },
          0.1
        ).fromTo(
          metaRef.current,
          { opacity: 0, x: 16 },
          { opacity: 1, x: 0, duration: 0.6, ease: EASINGS.standard },
          0.25
        );
      } else if (projeto.slug === "maria-mariana") {
        startPos = "top 88%";
        tl = gsap.timeline({ paused: true });
        tl.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: EASINGS.emphasis,
          }
        );
      } else if (projeto.slug === "blue-token") {
        startPos = "top 85%";
        tl = gsap.timeline({ paused: true });
        tl.fromTo(
          imgFrameRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.9,
            ease: EASINGS.standard,
          },
          0
        ).fromTo(
          metaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: EASINGS.standard },
          0.3
        );
      }

      if (tl) {
        // Trigger 1: Controlled entrance (down & up) + silent reset when completely above viewport
        ScrollTrigger.create({
          trigger: el,
          start: startPos,
          end: "bottom top",
          onEnter: () => tl.restart(),
          onEnterBack: () => tl.restart(),
          onLeave: () => tl.pause(0),
        });

        // Trigger 2: Silent reset when completely below viewport (leaves going back up)
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          onLeaveBack: () => tl.pause(0),
        });
      }
    }, el);

    return () => ctx.revert();
  }, [projeto.slug]);

  /* ---- Subtle Interactive Hover (Image Scale 1.015, Meta Shift +4px) ---- */
  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion() || !isPointerFine()) return;
    const img = imgElementRef.current;
    const meta = metaRef.current;
    if (img) gsap.to(img, { scale: 1.015, duration: 0.5, ease: EASINGS.standard, overwrite: "auto" });
    if (meta) gsap.to(meta, { x: 4, duration: 0.45, ease: EASINGS.standard, overwrite: "auto" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion() || !isPointerFine()) return;
    const img = imgElementRef.current;
    const meta = metaRef.current;
    if (img) gsap.to(img, { scale: 1, duration: 0.45, ease: EASINGS.standard, overwrite: "auto" });
    if (meta) gsap.to(meta, { x: 0, duration: 0.4, ease: EASINGS.standard, overwrite: "auto" });
  }, []);

  return (
    <article
      ref={rowRef}
      className={`sw-row sw-row--${config.variant} sw-row--scale-${config.scale}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/projetos/${projeto.slug}`}
        className="sw-row__link"
        aria-label={`Ver projeto ${projeto.nome}`}
      >
        {/* Metadata column */}
        <div
          ref={metaRef}
          className={`sw-row__meta ${isReversed ? "sw-row__meta--right" : ""}`}
        >
          <div className="sw-row__index">
            <span className="mono sw-row__num">{num}</span>
            <span className="sw-row__index-sep" aria-hidden="true">/</span>
            <span className="mono sw-row__total">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className={`sw-row__name sw-row__name--${config.scale}`}>
            {projeto.nome}
          </h3>

          <div className="sw-row__tags">
            <span className="sw-row__cat">{projeto.categoria}</span>
            <span className="sw-row__divider" aria-hidden="true" />
            <span className="sw-row__tipo">{projeto.tipo}</span>
          </div>

          <p className="sw-row__desc">{projeto.resumo}</p>

          {projeto.data && (
            <span className="mono sw-row__date">{projeto.data}</span>
          )}

          <span className="sw-row__cta">
            Ver projeto <ExploreIcon />
          </span>
        </div>

        {/* Media column */}
        <div
          className={`sw-row__media ${isReversed ? "sw-row__media--left" : ""}`}
        >
          <div className="sw-row__media-frame" ref={imgFrameRef}>
            {/* Optional Browser Chrome (Lelume) */}
            {config.hasChrome && (
              <div ref={chromeRef} className="sw-chrome" aria-hidden="true">
                <div className="sw-chrome__dots">
                  <span className="sw-chrome__dot" />
                  <span className="sw-chrome__dot" />
                  <span className="sw-chrome__dot" />
                </div>
                <div className="sw-chrome__address">
                  <span className="mono sw-chrome__url">
                    {config.chromeDomain}
                  </span>
                </div>
              </div>
            )}

            <picture>
              <source
                srcSet={imgSrc(projeto.preview || projeto.capa)}
                type="image/webp"
              />
              <img
                ref={imgElementRef}
                src={fallbackImgSrc(projeto.preview || projeto.capa)}
                alt={`Interface do projeto ${projeto.nome}`}
                loading={index === 0 ? "eager" : "lazy"}
                width={1400}
                height={740}
                className="sw-row__img"
              />
            </picture>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ---------------------------------------------------------------
   SELECTED WORK SECTION
   --------------------------------------------------------------- */
export default function SelectedWork() {
  // Fase H: section motion lives in the image (mask/clip reveal per row, below).
  // The intro header stays a plain reveal so it doesn't compete with that.
  const introReveal = useReveal({ variant: "standard" });

  return (
    <section id="work" className="sw" aria-labelledby="sw-heading">
      <div className="container container--ultra">
        {/* Section intro */}
        <div
          className={`sw-intro ${introReveal.className}`}
          ref={introReveal.ref}
        >
          <div className="sw-intro__top">
            <span className="eyebrow">Projetos</span>
            <span className="mono sw-intro__count">{ordered.length} projetos</span>
          </div>

          <div className="sw-intro__hairline" aria-hidden="true" />

          <h2 id="sw-heading" className="sw-intro__heading">
            Produtos construídos para contextos reais.
          </h2>

          <p className="sw-intro__body">
            Cada projeto representa um desafio diferente de produto digital —
            da concepção ao deploy.
          </p>
        </div>

        {/* Project rows */}
        <div className="sw-projects">
          {ordered.map((projeto, i) => (
            <ProjectRow
              key={projeto.slug}
              projeto={projeto}
              index={i}
            />
          ))}
        </div>

        {/* Section close — link to full index */}
        <div className="sw-close">
          <Link to="/projetos" className="btn btn--ghost sw-close__btn">
            Ver todos os projetos <ExploreIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
