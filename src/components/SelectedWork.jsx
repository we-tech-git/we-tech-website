import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { projetos } from "../projetos.js";
import useReveal from "../hooks/useReveal.js";

/* ---------------------------------------------------------------
   PROJECT ORDER — curated for visual strength & sector variety
   1. TORO Token   — strongest screenshot, Web3, live link
   2. Genesis Bank — fintech/institutional, credibility
   3. Triper       — travel, different sector
   4. Blue Token   — Web3, live link, monumental close
   --------------------------------------------------------------- */
const projectOrder = ["toro-token", "genesis-bank", "triper", "blue-token"];
const ordered = projectOrder.map((slug) =>
  projetos.find((p) => p.slug === slug)
).filter(Boolean);

/* Resolve WebP with PNG fallback */
function imgSrc(path) {
  return path;
}

function fallbackImgSrc(path) {
  return path.replace(".webp", ".png");
}

/* ---------------------------------------------------------------
   PROJECT ROW — each row has a variant for visual rhythm
   variant 0: image right, large (dominant)
   variant 1: image left, reversed
   variant 2: compact, default proportions
   variant 3: monumental close, image emphasis
   --------------------------------------------------------------- */
function ProjectRow({ projeto, index, variant }) {
  const reveal = useReveal();
  const num = String(index + 1).padStart(2, "0");
  const total = ordered.length;
  const imgRef = useRef(null);
  const metaRef = useRef(null);

  const isReversed = variant === 1;

  /* Subtle hover: image scale + metadata shift */
  const handleMouseEnter = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = imgRef.current;
    const meta = metaRef.current;
    if (img) gsap.to(img, { scale: 1.02, duration: 0.6, ease: "power3.out" });
    if (meta) gsap.to(meta, { x: 4, duration: 0.5, ease: "power3.out" });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    const meta = metaRef.current;
    if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.out" });
    if (meta) gsap.to(meta, { x: 0, duration: 0.4, ease: "power3.out" });
  }, []);

  return (
    <article
      className={`sw-row sw-row--v${variant}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/projetos/${projeto.slug}`}
        ref={reveal.ref}
        className={`sw-row__link ${reveal.className}`}
        aria-label={`Ver projeto ${projeto.nome}`}
      >
        {/* Metadata column */}
        <div
          className={`sw-row__meta ${isReversed ? "sw-row__meta--right" : ""}`}
          ref={metaRef}
        >
          <div className="sw-row__index">
            <span className="mono sw-row__num">{num}</span>
            <span className="sw-row__index-sep" aria-hidden="true">/</span>
            <span className="mono sw-row__total">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className={`sw-row__name ${variant === 3 ? "sw-row__name--lg" : ""}`}>
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
            Ver projeto <span className="btn-arrow">→</span>
          </span>
        </div>

        {/* Media column */}
        <div
          className={`sw-row__media ${isReversed ? "sw-row__media--left" : ""} ${variant === 3 ? "sw-row__media--monumental" : ""}`}
        >
          <div className="sw-row__media-frame" ref={imgRef}>
            <picture>
              <source
                srcSet={imgSrc(projeto.preview || projeto.capa)}
                type="image/webp"
              />
              <img
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
  const introReveal = useReveal();

  const variants = [0, 1, 2, 3];

  return (
    <section id="work" className="sw" aria-labelledby="sw-heading">
      <div className="container">
        {/* Section intro */}
        <div
          className={`sw-intro ${introReveal.className}`}
          ref={introReveal.ref}
        >
          <div className="sw-intro__top">
            <span className="mono eyebrow">01 / Projetos</span>
            <span className="mono sw-intro__count">04 projetos</span>
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
              variant={variants[i]}
            />
          ))}
        </div>

        {/* Section close — link to full index */}
        <div className="sw-close">
          <Link to="/projetos" className="btn btn--ghost sw-close__btn">
            Ver todos os projetos <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
