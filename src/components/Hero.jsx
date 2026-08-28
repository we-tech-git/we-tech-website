import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projetos } from "../projetos.js";
import { EASINGS, DURATIONS, prefersReducedMotion, isPointerFine, initMagneticElement } from "../motion.js";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   PRODUCT VIEWPORT — Hero component
   We Tech Hub · Engineered Artifacts
   Fase F: Motion, Interaction, Depth & Seamless Continuity
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
  const viewportRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const viewportHeaderRef = useRef(null);
  const viewportFooterRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const imagesRef = useRef([]);
  const hasAnimated = useRef(false);
  const isSwitchingRef = useRef(false);

  const current = heroProjects[active];

  /* ---- Preload all viewport images ---- */
  useEffect(() => {
    heroProjects.forEach((p, i) => {
      if (i === 0) return;
      const img = new Image();
      img.src = p.src;
    });
  }, []);

  /* ---- Magnetic CTA interaction (Desktop only) ---- */
  useEffect(() => {
    const cleanup = initMagneticElement(ctaBtnRef.current, 0.22, 6);
    return cleanup;
  }, []);

  /* ---- GSAP Entrance Timeline & Scroll Seam ---- */
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const el = heroRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("hero--visible");
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(".hero__hairline", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero__eyebrow", { opacity: 0, y: 14 });
      gsap.set(".hero__headline-line", { opacity: 0, y: "100%" });
      gsap.set(".hero__body", { opacity: 0, y: 16 });
      gsap.set(".hero__cta-wrap", { opacity: 0, y: 14 });
      gsap.set(viewportRef.current, {
        opacity: 0,
        y: 28,
        scale: 0.975,
        rotateX: 2,
        transformPerspective: 1000,
      });

      const tl = gsap.timeline({
        defaults: { ease: EASINGS.precisionOut },
        delay: 0.15,
      });

      tl.to(".hero__hairline", { scaleX: 1, duration: 0.85 }, 0)
        .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.5 }, 0.12)
        .to(
          ".hero__headline-line",
          { opacity: 1, y: "0%", duration: 0.7, stagger: 0.08 },
          0.2
        )
        .to(".hero__body", { opacity: 1, y: 0, duration: 0.55 }, 0.45)
        .to(".hero__cta-wrap", { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .to(
          viewportRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            ease: EASINGS.precisionOut,
          },
          0.3
        );

      // Scroll Seam: subtle viewport depth displacement as user scrolls toward Selected Work
      if (window.innerWidth >= 1025) {
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            if (viewportRef.current) {
              gsap.set(viewportRef.current, {
                y: self.progress * 30,
                scale: 1 - self.progress * 0.02,
                opacity: 1 - self.progress * 0.35,
              });
            }
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  /* ---- Coordinated Image & Metadata Transition on Project Switch ---- */
  useEffect(() => {
    if (prefersReducedMotion()) {
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const isActive = i === active;
        img.style.opacity = isActive ? "1" : "0";
        img.style.zIndex = isActive ? "2" : "1";
        img.style.transform = "none";
      });
      return;
    }

    isSwitchingRef.current = true;

    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === active;

      if (isActive) {
        img.style.zIndex = "2";
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.03 },
          {
            opacity: 1,
            scale: 1,
            duration: DURATIONS.standard,
            ease: EASINGS.precisionOut,
            onComplete: () => {
              isSwitchingRef.current = false;
            },
          }
        );
      } else {
        img.style.zIndex = "1";
        gsap.to(img, {
          opacity: 0,
          scale: 1,
          duration: DURATIONS.fast,
          ease: EASINGS.precisionInOut,
        });
      }
    });
  }, [active]);

  /* ---- Multi-Layer Depth Response on Viewport Cursor Movement (Desktop Only) ---- */
  const handleMouseMove = useCallback((e) => {
    const vp = viewportRef.current;
    const mc = mediaContainerRef.current;
    const vh = viewportHeaderRef.current;
    const vf = viewportFooterRef.current;

    if (!vp || !mc || prefersReducedMotion() || !isPointerFine()) return;

    const rect = vp.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    // Media layer shifts deeper (2-5px)
    gsap.to(mc, {
      x: x * 4.5,
      y: y * 3.5,
      scale: 1.015,
      duration: 0.8,
      ease: EASINGS.editorial,
      overwrite: "auto",
    });

    // Chrome layers shift subtly in counter-plane (-1.5px) to heighten layer parallax
    if (vh && vf) {
      gsap.to([vh, vf], {
        x: x * -1.5,
        duration: 0.8,
        ease: EASINGS.editorial,
        overwrite: "auto",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const mc = mediaContainerRef.current;
    const vh = viewportHeaderRef.current;
    const vf = viewportFooterRef.current;

    if (!mc) return;

    gsap.to(mc, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.55,
      ease: EASINGS.precisionOut,
      overwrite: "auto",
    });

    if (vh && vf) {
      gsap.to([vh, vf], {
        x: 0,
        duration: 0.55,
        ease: EASINGS.precisionOut,
        overwrite: "auto",
      });
    }
  }, []);

  /* ---- Keyboard Navigation ---- */
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
        {/* ---- Copy Column ---- */}
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            Produto Digital · Design · Engenharia
          </span>

          <h1 className="heading-xl hero__headline" aria-label="Design e engenharia para produtos digitais que precisam ir além do lançamento.">
            <span className="hero__headline-mask">
              <span className="hero__headline-line">Design e engenharia para produtos</span>
            </span>
            <span className="hero__headline-mask">
              <span className="hero__headline-line">digitais que precisam ir além</span>
            </span>
            <span className="hero__headline-mask">
              <span className="hero__headline-line">do lançamento.</span>
            </span>
          </h1>

          <p className="body-lg hero__body">
            Produto, design e engenharia integrados em um único time — do
            conceito à infraestrutura que sustenta o crescimento.
          </p>

          <div className="hero__cta-wrap">
            <div ref={ctaBtnRef} className="hero__cta-magnetic-wrap">
              <Link to="/#contato" className="btn btn--primary">
                Iniciar projeto <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <Link to="/#work" className="btn btn--text link-underline">
              Ver projetos
            </Link>
          </div>
        </div>

        {/* ---- Product Viewport (Signature Motion Artifact) ---- */}
        <div
          ref={viewportRef}
          className="hero__viewport"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Projetos em destaque"
          aria-roledescription="product viewport"
        >
          {/* Viewport header — metadata bar */}
          <div ref={viewportHeaderRef} className="viewport__header">
            <div className="viewport__meta">
              <span className="viewport__name">{current.nome}</span>
            </div>
            <span className="label viewport__cat">{current.categoria}</span>
          </div>

          {/* Media area — stacked images, crossfade + settle */}
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
          <div ref={viewportFooterRef} className="viewport__footer">
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
              Ver projeto <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
