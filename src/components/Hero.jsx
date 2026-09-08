import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASINGS, prefersReducedMotion, isPointerFine, initMagneticElement } from "../motion.js";
import { ActionIcon } from "./Icons.jsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   WE TECH HUB · HERO SECTION
   2D Editorial System Artifact:
   - Layer 1: Frame Substrate
   - Layer 2: Main Editorial Plane (Produto dominant / Sistema secondary)
   - Layer 3: Single Orange Accent (attached to Produto, #FF4D00)
   - Layer 4: Lateral Extension (Evolução)
   - Layer 5: Structural Datum Strip
   --------------------------------------------------------------- */

export default function Hero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const assemblyRef = useRef(null);

  // 2D Editorial System Layers
  const foundationRef = useRef(null);
  const platformRef = useRef(null);
  const actionCtaRef = useRef(null);
  const expansionRef = useRef(null);

  const ctaBtnRef = useRef(null);

  /* ---- Coordinated GSAP Assembly & 2D Planar Response ---- */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Magnetic CTA initialization
    const cleanupMagnetic = initMagneticElement(ctaBtnRef.current, 0.2, 5);

    if (prefersReducedMotion()) {
      el.classList.add("hero--visible");
      return () => cleanupMagnetic();
    }

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(".hero__hairline", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero__eyebrow", { opacity: 0, y: 12 });
      gsap.set(".hero__headline-line", { opacity: 0, y: "105%" });
      gsap.set(".hero__body", { opacity: 0, y: 14 });
      gsap.set(".hero__cta-wrap", { opacity: 0, y: 14 });
      gsap.set(".hero__datum-line", { scaleX: 0, transformOrigin: "left center" });

      // 2D Canvas Initial Setup
      if (stageRef.current) {
        gsap.set(stageRef.current, { opacity: 0, scale: 0.98 });
      }

      if (assemblyRef.current) {
        gsap.set(assemblyRef.current, { x: 0, y: 0 });
      }

      // Layer 1: Frame Substrate
      if (foundationRef.current) {
        gsap.set(foundationRef.current, { opacity: 0, scale: 0.98 });
      }
      // Layer 2: Dominant Main Plane
      if (platformRef.current) {
        gsap.set(platformRef.current, { opacity: 0, y: 18 });
      }
      // Layer 3: Lateral Extension
      if (expansionRef.current) {
        gsap.set(expansionRef.current, { opacity: 0, x: 20 });
      }
      // Dominant Orange Action Block
      if (actionCtaRef.current) {
        gsap.set(actionCtaRef.current, { scale: 0.85, opacity: 0 });
      }

      // 2. Coordinated 2D Assembly Timeline
      const tl = gsap.timeline({
        defaults: { ease: EASINGS.standard },
        delay: 0.08,
      });

      // Editorial headline & text progression
      tl.to(".hero__hairline", { scaleX: 1, duration: 0.8 }, 0)
        .to(".hero__eyebrow", { opacity: 1, y: 0, duration: 0.45 }, 0.1)
        .to(
          ".hero__headline-line",
          { opacity: 1, y: "0%", duration: 0.7, stagger: 0.08 },
          0.16
        )
        .to(".hero__body", { opacity: 1, y: 0, duration: 0.5 }, 0.42)
        .to(".hero__cta-wrap", { opacity: 1, y: 0, duration: 0.5 }, 0.5)
        .to(".hero__datum-line", { scaleX: 1, duration: 0.9 }, 0.3);

      // Stage entry
      if (stageRef.current) {
        tl.to(
          stageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: EASINGS.standard,
          },
          0.16
        );
      }

      // 1. Frame substrate establishes
      if (foundationRef.current) {
        tl.to(
          foundationRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: EASINGS.standard,
          },
          0.2
        );
      }

      // 2. Main dominant plane reveals
      if (platformRef.current) {
        tl.to(
          platformRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: EASINGS.standard,
          },
          0.28
        );
      }

      // 3. Dominant orange action block enters with emphasis
      if (actionCtaRef.current) {
        tl.to(
          actionCtaRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: EASINGS.emphasis,
          },
          0.44
        );
      }

      // 4. Asymmetric lateral extension breaches and docks
      if (expansionRef.current) {
        tl.to(
          expansionRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: EASINGS.standard,
          },
          0.5
        );
      }

      // 3. Scroll Seam Handover (gentle 2D vertical compression)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            if (stageRef.current) {
              gsap.set(stageRef.current, {
                y: self.progress * 24,
                opacity: 1 - self.progress * 0.35,
              });
            }
          },
        });

        return () => st.kill();
      });

      // 4. Hero Lifecycle Replay on Re-entry
      let hasExitedHero = false;
      const replayTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom 20%",
        onLeave: () => {
          hasExitedHero = true;
        },
        onUpdate: (self) => {
          if (hasExitedHero && self.progress < 0.08) {
            hasExitedHero = false;
            tl.restart();
          }
        },
      });

      return () => replayTrigger.kill();
    }, el);

    return () => {
      ctx.revert();
      cleanupMagnetic();
    };
  }, []);

  /* ---- Restrained 2D Pointer Response (Desktop Only, Max 2-3px, Zero Tilt) ---- */
  const handleMouseMove = (e) => {
    if (prefersReducedMotion() || !isPointerFine() || !stageRef.current || !assemblyRef.current) return;

    const stage = stageRef.current;
    const rect = stage.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    // Planar 2D subtle offsets
    if (assemblyRef.current) {
      gsap.to(assemblyRef.current, {
        x: nx * 3.5,
        y: ny * 2.5,
        duration: 0.75,
        ease: EASINGS.emphasis,
        overwrite: "auto",
      });
    }

    if (expansionRef.current) {
      gsap.to(expansionRef.current, {
        x: nx * 2,
        y: ny * 1.5,
        duration: 0.75,
        ease: EASINGS.emphasis,
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !assemblyRef.current) return;

    gsap.to(assemblyRef.current, {
      x: 0,
      y: 0,
      duration: 0.85,
      ease: EASINGS.standard,
      overwrite: "auto",
    });

    if (expansionRef.current) {
      gsap.to(expansionRef.current, {
        x: 0,
        y: 0,
        duration: 0.85,
        ease: EASINGS.standard,
        overwrite: "auto",
      });
    }
  };

  return (
    <section id="top" className="hero" ref={heroRef}>
      {/* Structural top hairline */}
      <div className="hero__hairline" aria-hidden="true" />

      <div className="container container--ultra hero__grid">
        {/* ---- Left Editorial Column ---- */}
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            PRODUTO DIGITAL <span className="hero__eyebrow-bullet">·</span> DESIGN <span className="hero__eyebrow-bullet">·</span> ENGENHARIA
          </span>

          {/* Recomposed 4-line Headline for balanced verticality & editorial rhythm */}
          <h1
            className="heading-xl hero__headline"
            aria-label="Design e engenharia para produtos digitais que precisam ir além do lançamento."
          >
            <span className="hero__headline-mask">
              <span className="hero__headline-line">Design e engenharia</span>
            </span>
            <span className="hero__headline-mask">
              <span className="hero__headline-line">para produtos digitais</span>
            </span>
            <span className="hero__headline-mask">
              <span className="hero__headline-line">que precisam ir além</span>
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
              <a
                href="#contato"
                className="btn btn--primary hero__primary-btn"
                aria-label="Iniciar projeto com a We Tech"
              >
                Iniciar projeto <ActionIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ---- Right Side: Editorial Digital Product Artifact ---- */}
        <div
          ref={stageRef}
          className="hero__artifact-stage hero__artifact-stage--editorial"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="region"
          aria-label="Objeto gráfico editorial We Tech — Produto, Sistema e Evolução"
        >
          {/* Subtle connection datum line bridging tension between text and object */}
          <div className="hero__datum-line" aria-hidden="true" />

          <div ref={assemblyRef} className="editorial-artifact">

            {/* 1. FRAME SUBSTRATE */}
            <div
              ref={foundationRef}
              className="ea-substrate"
              aria-hidden="true"
            />

            {/* PHYSICAL COMPOSITE: Main Plane + Docked Lateral Extension */}
            <div className="ea-body-composite">
              {/* 2. DOMINANT MAIN PLANE */}
              <div
                ref={platformRef}
                className="ea-main-plane"
                aria-hidden="true"
              >
                {/* Header bar */}
                <div className="ea-header-bar">
                  <div className="ea-brand-block">
                    <span className="ea-brand-dot" />
                    <span className="ea-brand-name">WE TECH</span>
                    <span className="ea-brand-divider">/</span>
                    <span className="ea-brand-sub">PRODUTO &amp; ENGENHARIA</span>
                  </div>
                  <div className="ea-status-pill">
                    <span className="ea-status-dot" />
                    <span className="ea-status-text">RUNTIME v2.4</span>
                  </div>
                </div>

                {/* Asymmetric Core: PRODUTO + SISTEMA */}
                <div className="ea-workspace">

                  {/* COLUNA 1: PRODUTO & INTERFACE */}
                  <div className="ea-core-canvas">
                    <div className="ea-zone-header">
                      <div className="ea-zone-title-wrap">
                        <span className="ea-zone-dot" />
                        <span className="ea-zone-label">Produto Digital</span>
                      </div>
                      <span className="ea-zone-tag">Interface &amp; Valor</span>
                    </div>

                    <div className="ea-prod-canvas">
                      {/* App Topbar / Window header */}
                      <div className="ea-prod-topbar">
                        <div className="ea-prod-route">
                          <span className="ea-prod-route-icon" />
                          <span className="ea-prod-route-path">/app/growth-engine</span>
                        </div>
                        <span className="ea-prod-badge-active">● 99.98% UPTIME</span>
                      </div>

                      {/* Focal Interactive Stage with Live Growth Sparkline */}
                      <div className="ea-prod-hero-stage">
                        <div className="ea-prod-stage-viewport">
                          {/* Header inside stage */}
                          <div className="ea-prod-stage-header">
                            <div>
                              <h4 className="ea-prod-stage-title">Engine de Conversão</h4>
                              <p className="ea-prod-stage-sub">Fluxo unificado · Latência: 14ms</p>
                            </div>
                            <div className="ea-prod-metric-badge">
                              <span className="ea-prod-metric-val">+142.8%</span>
                              <span className="ea-prod-metric-lbl">CRESCIMENTO</span>
                            </div>
                          </div>

                          {/* Data Visualization / SVG Sparkline */}
                          <div className="ea-prod-chart-wrap">
                            <svg className="ea-prod-chart-svg" viewBox="0 0 320 64" fill="none" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="eaChartGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#FF4D00" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <line x1="0" y1="18" x2="320" y2="18" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                              <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                              <path d="M 0 54 Q 60 50 110 38 T 210 20 T 280 8 L 320 4 L 320 64 L 0 64 Z" fill="url(#eaChartGrad)" />
                              <path d="M 0 54 Q 60 50 110 38 T 210 20 T 280 8 L 320 4" stroke="#FF4D00" strokeWidth="2" fill="none" />
                              <circle cx="210" cy="20" r="3" fill="#FFFFFF" stroke="#FF4D00" strokeWidth="1.5" />
                              <circle cx="280" cy="8" r="3" fill="#FFFFFF" stroke="#FF4D00" strokeWidth="1.5" />
                            </svg>
                          </div>

                          {/* Primary Action Button */}
                          <div ref={actionCtaRef} className="ea-prod-action-unit">
                            <span className="ea-prod-action-btn">
                              <span>Explorar Fluxo</span>
                              <ActionIcon className="ea-prod-action-icon" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Supporting Subgrid: Design System & Core Runtime */}
                      <div className="ea-prod-subgrid">
                        <div className="ea-prod-card">
                          <div className="ea-prod-card-head">
                            <span className="ea-prod-card-glyph ea-prod-card-glyph--tokens" />
                            <span className="ea-prod-card-title">Design System</span>
                            <span className="ea-prod-card-tag">36 TOKENS</span>
                          </div>
                          <div className="ea-prod-card-tokens">
                            <span className="ea-token-dot" style={{ background: "#FF4D00" }} />
                            <span className="ea-token-dot" style={{ background: "#FFFFFF" }} />
                            <span className="ea-token-dot" style={{ background: "#8A99AD" }} />
                            <span className="ea-token-dot" style={{ background: "#1F2937" }} />
                            <span className="ea-token-bar" />
                          </div>
                        </div>

                        <div className="ea-prod-card">
                          <div className="ea-prod-card-head">
                            <span className="ea-prod-card-glyph ea-prod-card-glyph--runtime" />
                            <span className="ea-prod-card-title">Core Runtime</span>
                            <span className="ea-prod-card-tag">12ms SYNC</span>
                          </div>
                          <div className="ea-prod-card-meter">
                            <div className="ea-prod-meter-track">
                              <div className="ea-prod-meter-fill" style={{ width: "88%" }} />
                            </div>
                            <span className="ea-prod-meter-text">88% Eficiência</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ea-workspace-divider" />

                  {/* COLUNA 2: SISTEMA & ENGENHARIA */}
                  <div className="ea-side-module">
                    <div className="ea-zone-header">
                      <div className="ea-zone-title-wrap">
                        <span className="ea-zone-dot ea-zone-dot--sys" />
                        <span className="ea-zone-label">Sistema</span>
                      </div>
                      <span className="ea-zone-tag">Pipeline &amp; Arquitetura</span>
                    </div>

                    <div className="ea-sys-flow">
                      {/* Stage 1: Ingestão */}
                      <div className="ea-sys-node ea-sys-node--input">
                        <div className="ea-sys-node-head">
                          <span className="ea-sys-step-num">01</span>
                          <span className="ea-sys-step-name">INGESTÃO DE DADOS</span>
                          <span className="ea-sys-badge-live">LIVE</span>
                        </div>
                        <div className="ea-sys-node-body">
                          <span className="ea-sys-chip">REST API</span>
                          <span className="ea-sys-chip">GraphQL</span>
                          <span className="ea-sys-chip">Events</span>
                          <span className="ea-sys-metric">4.2k req/s</span>
                        </div>
                      </div>

                      {/* Connective Link */}
                      <div className="ea-sys-link">
                        <span className="ea-sys-link-line" />
                        <span className="ea-sys-link-arrow">↓</span>
                      </div>

                      {/* Stage 2: Orquestração */}
                      <div className="ea-sys-node ea-sys-node--core">
                        <div className="ea-sys-node-head">
                          <span className="ea-sys-step-num">02</span>
                          <span className="ea-sys-step-name">ORQUESTRAÇÃO &amp; STATE</span>
                          <span className="ea-sys-badge-engine">ENGINE</span>
                        </div>
                        <div className="ea-sys-node-body">
                          <div className="ea-sys-services">
                            <span className="ea-sys-service-dot active" title="Auth" />
                            <span className="ea-sys-service-dot active" title="Sync" />
                            <span className="ea-sys-service-dot active" title="Cache" />
                            <span className="ea-sys-service-dot active" title="Compute" />
                          </div>
                          <span className="ea-sys-engine-text">Processamento Paralelo</span>
                          <span className="ea-sys-metric">14ms</span>
                        </div>
                      </div>

                      {/* Connective Link */}
                      <div className="ea-sys-link">
                        <span className="ea-sys-link-line" />
                        <span className="ea-sys-link-arrow">↓</span>
                      </div>

                      {/* Stage 3: Distribuição */}
                      <div className="ea-sys-node ea-sys-node--output">
                        <div className="ea-sys-node-head">
                          <span className="ea-sys-step-num">03</span>
                          <span className="ea-sys-step-name">DISTRIBUIÇÃO &amp; EDGE</span>
                          <span className="ea-sys-badge-sync">SYNC</span>
                        </div>
                        <div className="ea-sys-node-body">
                          <span className="ea-sys-chip">12 Regiões CDN</span>
                          <span className="ea-sys-chip ea-sys-chip--accent">Cache 98.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Structural rhythm strip */}
                <div className="ea-datum-strip" aria-hidden="true">
                  <div className="ea-datum-meta">
                    <span className="ea-datum-key">STATUS GERAL:</span>
                    <span className="ea-datum-val">PRODUÇÃO ESTÁVEL</span>
                  </div>
                  <div className="ea-datum-ticks">
                    <span className="ea-datum-tick" />
                    <span className="ea-datum-tick" />
                    <span className="ea-datum-tick" />
                    <span className="ea-datum-tick" />
                  </div>
                </div>
              </div>

              {/* COLUNA 3: EVOLUÇÃO (Linha do Tempo / Escala Modular) */}
              <div
                ref={expansionRef}
                className="ea-extension-block"
                aria-hidden="true"
              >
                <div className="ea-zone-header ea-zone-header--ext">
                  <div className="ea-zone-title-wrap">
                    <span className="ea-zone-dot ea-zone-dot--evo" />
                    <span className="ea-zone-label ea-zone-label--ext">Evolução</span>
                  </div>
                  <span className="ea-zone-tag">Roadmap</span>
                </div>

                <div className="ea-evo-timeline">
                  {/* Track line */}
                  <div className="ea-evo-track" />

                  {/* Fase 1: Fundação */}
                  <div className="ea-evo-card ea-evo-card--base">
                    <div className="ea-evo-card-badge">
                      <span className="ea-evo-milestone-dot" />
                      <span>FASE 01 · BASE</span>
                    </div>
                    <h5 className="ea-evo-card-title">Estrutura Core &amp; Tokens</h5>
                    <p className="ea-evo-card-desc">Arquitetura base, componentes de UI e runtime configurado.</p>
                  </div>

                  {/* Fase 2: Escala Ativa */}
                  <div className="ea-evo-card ea-evo-card--scale">
                    <div className="ea-evo-card-badge ea-evo-card-badge--accent">
                      <span className="ea-evo-milestone-dot active" />
                      <span>FASE 02 · ESCALA ATIVA</span>
                    </div>
                    <h5 className="ea-evo-card-title">Módulos &amp; Performance</h5>
                    <p className="ea-evo-card-desc">Caching distribuído, novas rotas e +300% de capacidade.</p>
                  </div>

                  {/* Fase 3: Expansão Contínua */}
                  <div className="ea-evo-card ea-evo-card--extend">
                    <div className="ea-evo-card-badge">
                      <span className="ea-evo-milestone-dot ghost" />
                      <span>FASE 03 · EXPANSÃO</span>
                    </div>
                    <h5 className="ea-evo-card-title">Ecossistema &amp; IA</h5>
                    <p className="ea-evo-card-desc">Automações avançadas e expansão multi-regional contínua.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}




