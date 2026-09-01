import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projetos } from "../projetos.js";
import { EASINGS, DURATIONS, prefersReducedMotion, isPointerFine } from "../motion.js";
import { ExploreIcon } from "./Icons.jsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   PRODUCT VIEWPORT — Hero component
   We Tech Hub · Engineered Artifacts
   FASE I · SIGNATURE MOMENT 01: Product Viewport Assembly
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
  const calipersRef = useRef([]);
  const sweepRef = useRef(null);
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

  /* ---- SIGNATURE 01: GSAP Product Viewport Assembly & Scroll Handover ---- */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("hero--visible");
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(".hero__hairline", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero__eyebrow", { opacity: 0, y: 14 });
      gsap.set(".hero__headline-line", { opacity: 0, y: "100%" });
      gsap.set(".hero__body", { opacity: 0, y: 16 });

      // Viewport multi-planar disassembly initial state
      gsap.set(viewportRef.current, {
        opacity: 0,
        y: 32,
        scale: 0.96,
        transformPerspective: 1200,
      });
      if (viewportHeaderRef.current) {
        gsap.set(viewportHeaderRef.current, { y: -18, opacity: 0 });
      }
      if (mediaContainerRef.current) {
        gsap.set(mediaContainerRef.current, {
          rotateX: 4,
          scale: 0.95,
          opacity: 0,
          transformPerspective: 1200,
        });
      }
      if (viewportFooterRef.current) {
        gsap.set(viewportFooterRef.current, { y: 18, opacity: 0 });
      }
      if (calipersRef.current.length > 0) {
        gsap.set(calipersRef.current, { scale: 0, opacity: 0 });
      }
      if (sweepRef.current) {
        gsap.set(sweepRef.current, { top: "0%", opacity: 0 });
      }

      // 2. Coordinated Architectural Assembly Timeline (900-1200ms)
      const tl = gsap.timeline({
        defaults: { ease: EASINGS.standard },
        delay: 0.1,
      });

      // Editorial headline progression
      tl.to(".hero__hairline", { scaleX: 1, duration: 0.85 }, 0)
        .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.5 }, 0.12)
        .to(
          ".hero__headline-line",
          { opacity: 1, y: "0%", duration: 0.7, stagger: 0.08 },
          0.18
        )
        .to(".hero__body", { opacity: 1, y: 0, duration: 0.55 }, 0.42);

      // Multi-Planar Viewport Assembly:
      // Frame enters -> Header & Footer slide into position -> 2.5D Media tilts to flat -> Calipers lock -> Settle sweep
      tl.to(
        viewportRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: EASINGS.standard,
        },
        0.25
      )
        .to(
          viewportHeaderRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASINGS.standard,
          },
          0.38
        )
        .to(
          mediaContainerRef.current,
          {
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: EASINGS.standard,
          },
          0.35
        )
        .to(
          viewportFooterRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: EASINGS.standard,
          },
          0.45
        )
        .to(
          calipersRef.current,
          {
            scale: 1,
            opacity: 0.85,
            duration: 0.45,
            stagger: 0.05,
            ease: EASINGS.standard,
          },
          0.55
        );

      if (sweepRef.current) {
        tl.fromTo(
          sweepRef.current,
          { top: "0%", opacity: 0.8 },
          {
            top: "100%",
            opacity: 0,
            duration: 0.65,
            ease: EASINGS.emphasis,
          },
          0.6
        );
      }

      // 3. Scroll Seam Handover: subtle depth de-elevation as user scrolls toward Selected Work
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            if (viewportRef.current) {
              gsap.set(viewportRef.current, {
                y: self.progress * 34,
                scale: 1 - self.progress * 0.025,
                opacity: 1 - self.progress * 0.35,
              });
            }
          },
        });

        return () => st.kill();
      });

      // 4. Hero Replay on Re-entry:
      // Controlled replay when returning to top after scrolling significantly past Hero
      let hasExitedHero = false;

      const replayTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom 20%",
        onLeave: () => {
          hasExitedHero = true;
        },
        onUpdate: (self) => {
          if (hasExitedHero && self.progress < 0.1) {
            hasExitedHero = false;
            tl.restart();
          }
        },
      });

      return () => replayTrigger.kill();
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
          { opacity: 0, scale: 1.025 },
          {
            opacity: 1,
            scale: 1,
            duration: DURATIONS.base,
            ease: EASINGS.standard,
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
          ease: EASINGS.emphasis,
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

    // Media layer shifts deeper (max 4.5px)
    gsap.to(mc, {
      x: x * 4.5,
      y: y * 3.5,
      scale: 1.012,
      duration: 0.8,
      ease: EASINGS.emphasis,
      overwrite: "auto",
    });

    // Chrome layers shift subtly in counter-plane (-1.5px) for tactile spatial depth
    if (vh && vf) {
      gsap.to([vh, vf], {
        x: x * -1.5,
        duration: 0.8,
        ease: EASINGS.emphasis,
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
      ease: EASINGS.standard,
      overwrite: "auto",
    });

    if (vh && vf) {
      gsap.to([vh, vf], {
        x: 0,
        duration: 0.55,
        ease: EASINGS.standard,
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

      <div className="container container--ultra hero__grid">
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
          {/* Architectural Registration Calipers (4 corners) */}
          <span
            ref={(el) => (calipersRef.current[0] = el)}
            className="viewport__caliper viewport__caliper--tl"
            aria-hidden="true"
          />
          <span
            ref={(el) => (calipersRef.current[1] = el)}
            className="viewport__caliper viewport__caliper--tr"
            aria-hidden="true"
          />
          <span
            ref={(el) => (calipersRef.current[2] = el)}
            className="viewport__caliper viewport__caliper--bl"
            aria-hidden="true"
          />
          <span
            ref={(el) => (calipersRef.current[3] = el)}
            className="viewport__caliper viewport__caliper--br"
            aria-hidden="true"
          />

          {/* Viewport header — metadata bar */}
          <div ref={viewportHeaderRef} className="viewport__header">
            <div className="viewport__meta">
              <span className="viewport__name">{current.nome}</span>
            </div>
            <span className="label viewport__cat">{current.categoria}</span>
          </div>

          {/* Media area — stacked images, crossfade + settle */}
          <div className="viewport__media">
            <div className="viewport__assembly-sweep" ref={sweepRef} aria-hidden="true" />
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
              Ver projeto <ExploreIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

