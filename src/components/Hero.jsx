import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { projetos } from "../projetos.js";

/* ---------------------------------------------------------------
   PRODUCT VIEWPORT — Hero component
   We Tech Hub · Engineered Artifacts
   --------------------------------------------------------------- */

const heroProjects = projetos.map((p, i) => ({
  slug: p.slug,
  nome: p.nome,
  categoria: p.categoria,
  num: String(i + 1).padStart(2, "0"),
  src: p.preview,
}));

const TOTAL = heroProjects.length;

export default function Hero() {
  const [active, setActive] = useState(0);
  const heroRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const imagesRef = useRef([]);
  const hasAnimated = useRef(false);
  const prefersReduced = useRef(false);

  const current = heroProjects[active];

  /* ---- Check reduced motion once ---- */
  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  /* ---- Preload all viewport images ---- */
  useEffect(() => {
    heroProjects.forEach((p, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  /* ---- GSAP entrance timeline ---- */
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const el = heroRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      el.classList.add("hero--visible");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".hero__reveal", { opacity: 0, y: 20 });
      gsap.set(".hero__hairline", {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.18,
      });

      tl.to(".hero__hairline", { scaleX: 1, duration: 0.8 }, 0)
        .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.45 }, 0.15)
        .to(".hero__headline", { opacity: 1, y: 0, duration: 0.65 }, 0.25)
        .to(".hero__body", { opacity: 1, y: 0, duration: 0.45 }, 0.45)
        .to(".hero__cta-wrap", { opacity: 1, y: 0, duration: 0.45 }, 0.55)
        .to(".hero__viewport", { opacity: 1, y: 0, duration: 0.7 }, 0.35);
    }, el);

    return () => ctx.revert();
  }, []);

  /* ---- Image crossfade on project change ---- */
  useEffect(() => {
    const reduced = prefersReduced.current;
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === active;
      if (reduced) {
        img.style.opacity = isActive ? "1" : "0";
        img.style.zIndex = isActive ? "2" : "1";
      } else {
        gsap.to(img, {
          opacity: isActive ? 1 : 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
        img.style.zIndex = isActive ? "2" : "1";
      }
    });
  }, [active]);

  /* ---- Subtle cursor parallax on viewport ---- */
  const handleMouseMove = useCallback((e) => {
    const mc = mediaContainerRef.current;
    if (!mc || prefersReduced.current) return;
    const rect = mc.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    gsap.to(mc, {
      x: x * 4,
      y: y * 3,
      scale: 1.015,
      duration: 0.9,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const mc = mediaContainerRef.current;
    if (!mc) return;
    gsap.to(mc, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  /* ---- Keyboard navigation ---- */
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((p) => (p + 1) % TOTAL);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((p) => (p - 1 + TOTAL) % TOTAL);
    }
  }, []);

  return (
    <section id="top" className="hero" ref={heroRef}>
      {/* Structural hairline */}
      <div className="hero__hairline" aria-hidden="true" />

      <div className="container hero__grid">
        {/* ---- Copy column ---- */}
        <div className="hero__copy">
          <span className="eyebrow hero__reveal hero__eyebrow">
            Produto Digital · Design · Engenharia
          </span>

          <h1 className="heading-xl hero__reveal hero__headline">
            Design e engenharia para produtos digitais que precisam ir além do
            lançamento.
          </h1>

          <p className="body-lg hero__reveal hero__body">
            Produto, design e engenharia integrados em um único time — do
            conceito à infraestrutura que sustenta o crescimento.
          </p>

          <div className="hero__reveal hero__cta-wrap">
            <Link to="/#contato" className="btn btn--primary">
              Iniciar projeto <span className="btn-arrow">→</span>
            </Link>
            <Link to="/#work" className="btn btn--text link-underline">
              Ver projetos
            </Link>
          </div>
        </div>

        {/* ---- Product Viewport ---- */}
        <div
          className="hero__viewport hero__reveal"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Projetos em destaque"
          aria-roledescription="product viewport"
        >
          {/* Viewport header — metadata bar */}
          <div className="viewport__header">
            <div className="viewport__meta">
              <span className="mono viewport__num">{current.num}</span>
              <span className="viewport__divider" aria-hidden="true" />
              <span className="viewport__name">{current.nome}</span>
            </div>
            <span className="label viewport__cat">{current.categoria}</span>
          </div>

          {/* Media area — stacked images, crossfade */}
          <div className="viewport__media">
            <div className="viewport__media-inner" ref={mediaContainerRef}>
              {heroProjects.map((p, i) => (
                <img
                  key={p.slug}
                  ref={(el) => (imagesRef.current[i] = el)}
                  src={p.src}
                  alt={`Interface do projeto ${p.nome}`}
                  className="viewport__img"
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    zIndex: i === 0 ? 2 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Viewport footer — navigation controls */}
          <div className="viewport__footer">
            <div
              className="viewport__indicators"
              role="tablist"
              aria-label="Selecionar projeto"
            >
              {heroProjects.map((p, i) => (
                <button
                  key={p.slug}
                  className={`viewport__indicator${
                    i === active ? " is-active" : ""
                  }`}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Projeto ${p.nome}`}
                >
                  <span className="mono">{p.num}</span>
                </button>
              ))}
            </div>
            <Link
              to={`/projetos/${current.slug}`}
              className="viewport__link"
            >
              Ver projeto <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
