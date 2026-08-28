import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../hooks/useReveal.js";
import ProtocolArtifact from "./ProtocolArtifact.jsx";
import { EASINGS, prefersReducedMotion } from "../motion.js";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   WE TECH HUB — BUILD PROTOCOL (FASE 6 & FASE F)
   Creative Direction: ARCHITECTURAL PROTOCOL MATRIX
   Bespoke engineering progression deck without generic template clichés.
   --------------------------------------------------------------- */

const PROTOCOL_STEPS = [
  {
    id: "frame",
    num: "01",
    label: "Entender",
    discipline: "CONCEPÇÃO",
    question: "O que realmente precisa ser resolvido?",
    text: "Entender o contexto, os objetivos, as restrições e as prioridades antes de definir a solução.",
    focus: "Contexto e objetivos",
    stateBadge: "Estrutura inicial",
    deliverables: ["Mapeamento de contexto", "Alinhamento de objetivos", "Definição de restrições"],
  },
  {
    id: "define",
    num: "02",
    label: "Definir",
    discipline: "ARQUITETURA",
    question: "O que realmente precisa existir?",
    text: "Delimitar o escopo e organizar os requisitos para concentrar esforço no que é essencial para o produto.",
    focus: "Escopo e prioridades",
    stateBadge: "Escopo definido",
    deliverables: ["Arquitetura de informação", "Grade funcional", "Matriz de prioridades"],
  },
  {
    id: "shape",
    num: "03",
    label: "Dar forma",
    discipline: "DESIGN SYSTEM",
    question: "Como a experiência deve funcionar?",
    text: "Estruturar fluxos, interface, comportamento e estados principais antes da implementação.",
    focus: "Fluxos e interface",
    stateBadge: "Experiência desenhada",
    deliverables: ["Wireframes de precisão", "Hierarquia visual", "Fluxos de interação"],
  },
  {
    id: "build",
    num: "04",
    label: "Construir",
    discipline: "ENGENHARIA",
    question: "Como transformar decisões em produto funcional?",
    text: "Implementar o que foi definido em uma aplicação utilizável, consistente e preparada para continuar evoluindo.",
    focus: "Implementação",
    stateBadge: "Código implementado",
    deliverables: ["Componentes modulares", "Integração de estados", "Engenharia de ponta"],
  },
  {
    id: "validate",
    num: "05",
    label: "Validar",
    discipline: "GARANTIA",
    question: "O que precisa ser verificado antes de avançar?",
    text: "Revisar comportamento, experiência, responsividade e funcionamento para identificar problemas antes da próxima etapa.",
    focus: "Qualidade e ajustes",
    stateBadge: "Qualidade validada",
    deliverables: ["Checkpoints de navegação", "Responsividade rigorosa", "Inspeção de performance"],
  },
  {
    id: "evolve",
    num: "06",
    label: "Evoluir",
    discipline: "CONTINUIDADE",
    question: "O que acontece depois que o produto está no ar?",
    text: "Acompanhar novas necessidades e continuar aprimorando o produto conforme o contexto do negócio evolui.",
    focus: "Evolução contínua",
    stateBadge: "Evolução contínua",
    deliverables: ["Módulos incrementais", "Escalabilidade técnica", "Ciclos de melhoria"],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const narrativeRef = useRef(null);
  const triggerInstanceRef = useRef(null);
  const activeStepRef = useRef(0);
  const intro = useReveal({ variant: "mask" });

  const current = PROTOCOL_STEPS[activeStep] || PROTOCOL_STEPS[0];

  /* ---------------------------------------------------------------
     DESKTOP SCROLLTRIGGER PINNING
     Applies only on >=1025px desktop viewports with height >=700px
     and without prefers-reduced-motion.
     --------------------------------------------------------------- */
  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (!isClient) return;

    const mediaReduced = prefersReducedMotion();
    const mediaDesktop = window.matchMedia("(min-width: 1025px) and (min-height: 700px)").matches;

    if (mediaReduced || !mediaDesktop) {
      return;
    }

    const ctx = gsap.context(() => {
      const totalSteps = PROTOCOL_STEPS.length;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinnedRef.current,
        start: "top top",
        end: "+=180%", // 180vh duration for optimal scroll comfort
        scrub: 0.35,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Map progress 0..1 to step index 0..5
          const rawIndex = Math.floor(self.progress * totalSteps);
          const clampedIndex = Math.min(totalSteps - 1, Math.max(0, rawIndex));
          if (activeStepRef.current !== clampedIndex) {
            activeStepRef.current = clampedIndex;
            setActiveStep(clampedIndex);
          }
        },
      });

      triggerInstanceRef.current = st;
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* Micro narrative transition on step change */
  useEffect(() => {
    if (prefersReducedMotion() || !narrativeRef.current) return;

    gsap.fromTo(
      narrativeRef.current.children,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: EASINGS.precisionOut,
        overwrite: "auto",
      }
    );
  }, [activeStep]);

  /* Direct Step Click Handler */
  const handleStepClick = useCallback((index) => {
    activeStepRef.current = index;
    setActiveStep(index);

    const st = triggerInstanceRef.current;
    if (st && st.start !== undefined && st.end !== undefined) {
      const stepFraction = (index + 0.5) / PROTOCOL_STEPS.length;
      const targetScroll = st.start + stepFraction * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  }, []);

  const handlePrev = () => {
    if (activeStep > 0) handleStepClick(activeStep - 1);
  };

  const handleNext = () => {
    if (activeStep < PROTOCOL_STEPS.length - 1) handleStepClick(activeStep + 1);
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section protocol-section"
      aria-labelledby="protocol-heading"
    >
      <div className="container">
        {/* Section Intro (revealed on scroll) */}
        <div ref={intro.ref} className={`${intro.className} protocol-intro`}>
          <div className="protocol-eyebrow-wrap">
            <span className="mono eyebrow">Processo</span>
          </div>
          <h2 id="protocol-heading" className="heading-lg protocol-heading">
            Menos incerteza antes do código.
            <span className="protocol-heading-highlight"> Mais clareza até o produto em produção.</span>
          </h2>
          <p className="body-base protocol-lead">
            Produto, design e engenharia avançam juntos. Cada etapa aumenta a definição do que está sendo construído antes da próxima decisão.
          </p>
        </div>

        {/* =========================================================
            DESKTOP PINNED WORKSPACE (Grid 12 cols, sticky viewport)
            ========================================================= */}
        <div ref={pinnedRef} className="protocol-workspace">
          <div className="protocol-grid">
            {/* LEFT: Architectural Stage Deck & Integrated Dossier */}
            <div className="protocol-rail-col">
              {/* Protocol Deck Controller */}
              <div className="protocol-deck-panel">
                {/* Deck Top Bar */}
                <div className="protocol-deck-topbar">
                  <div className="protocol-deck-header-left">
                    <span className="mono protocol-deck-title">PROTOCOL // ETAPAS</span>
                  </div>
                  <div className="protocol-deck-meter" aria-hidden="true">
                    {PROTOCOL_STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`protocol-meter-tick ${i <= activeStep ? "active" : ""}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stage Ladder Selector */}
                <nav className="protocol-deck-ladder" aria-label="Etapas do Processo de Construção">
                  <ol className="protocol-stage-list" role="list">
                    {PROTOCOL_STEPS.map((step, idx) => {
                      const isActive = activeStep === idx;
                      const isPassed = idx < activeStep;
                      return (
                        <li key={step.id} className="protocol-stage-item">
                          <button
                            type="button"
                            className={`protocol-stage-btn ${isActive ? "active" : ""} ${isPassed ? "passed" : ""}`}
                            onClick={() => handleStepClick(idx)}
                            aria-current={isActive ? "step" : undefined}
                            aria-label={`Etapa ${step.num}: ${step.label} (${step.discipline}) - ${step.question}`}
                          >
                            <span className="protocol-stage-indicator" aria-hidden="true" />
                            <span className="mono protocol-stage-num">{step.num}</span>
                            <span className="protocol-stage-name">{step.label}</span>
                            <span className="mono protocol-stage-discipline">{step.discipline}</span>
                            {isPassed && (
                              <span className="protocol-stage-check" aria-hidden="true">✓</span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>

              {/* Active Step Narrative & Technical Dossier */}
              <div ref={narrativeRef} className="protocol-dossier-card">
                <div className="protocol-dossier-header">
                  <div className="protocol-dossier-focus">
                    <span className="mono protocol-focus-tag">{current.focus}</span>
                  </div>
                  <div className="protocol-dossier-status">
                    <span className="mono protocol-status-pill">
                      {current.stateBadge}
                    </span>
                  </div>
                </div>

                <div className="protocol-dossier-body">
                  <h3 className="protocol-dossier-question">{current.question}</h3>
                  <p className="protocol-dossier-description">{current.text}</p>
                </div>

                {/* Deliverables / Key Criteria Chips */}
                <div className="protocol-deliverables-wrap">
                  <span className="mono protocol-deliverables-label">CRITÉRIOS DA ETAPA</span>
                  <ul className="protocol-deliverables-list" role="list">
                    {current.deliverables.map((item, i) => (
                      <li key={i} className="protocol-deliverable-chip">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ergonomic Step Navigation Controls */}
                <div className="protocol-dossier-nav">
                  <button
                    type="button"
                    className="protocol-nav-btn protocol-nav-btn--prev"
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    aria-label="Etapa anterior"
                  >
                    ← Anterior
                  </button>
                  <span className="mono protocol-nav-count">
                    {current.num} / 06
                  </span>
                  <button
                    type="button"
                    className="protocol-nav-btn protocol-nav-btn--next"
                    onClick={handleNext}
                    disabled={activeStep === PROTOCOL_STEPS.length - 1}
                    aria-label="Próxima etapa"
                  >
                    Próxima etapa →
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Dominant vertical-progression viewport */}
            <div className="protocol-viewport-col">
              <div className="protocol-viewport">
                {/* Viewport Top Bar */}
                <div className="protocol-viewport-topbar">
                  <div className="protocol-viewport-meta-left">
                    <span className="mono protocol-viewport-title">
                      Visão da etapa · {current.label}
                    </span>
                  </div>
                  <div className="protocol-viewport-meta-right">
                    <span className="mono protocol-progress-counter">
                      {current.discipline}
                    </span>
                  </div>
                </div>

                {/* Progress Hairline */}
                <div className="protocol-hairline-track" aria-hidden="true">
                  <div
                    className="protocol-hairline-fill"
                    style={{ width: `${((activeStep + 1) / PROTOCOL_STEPS.length) * 100}%` }}
                  />
                </div>

                {/* Central Evolving Vector Monolith */}
                <div className="protocol-viewport-body">
                  <ProtocolArtifact activeStep={activeStep} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE & TABLET CONTINUOUS CASCADE (No Pinning)
            Sequential editorial flow with inline mini-viewports
            ========================================================= */}
        <div className="protocol-mobile-flow">
          {PROTOCOL_STEPS.map((step, idx) => (
            <div key={step.id} className="protocol-mobile-block">
              <div className="protocol-mobile-header">
                <div className="protocol-mobile-idx-wrap">
                  <span className="mono protocol-mobile-num">{step.num}</span>
                  <span className="protocol-mobile-label">{step.label}</span>
                </div>
                <span className="mono protocol-mobile-discipline">{step.discipline}</span>
              </div>

              <div className="protocol-mobile-focus-bar">
                <span className="mono protocol-mobile-focus">{step.focus}</span>
                <span className="mono protocol-mobile-status">{step.stateBadge}</span>
              </div>

              <h3 className="protocol-mobile-question">{step.question}</h3>
              <p className="protocol-mobile-text">{step.text}</p>

              {/* Mobile Deliverables Chips */}
              <ul className="protocol-mobile-deliverables" role="list">
                {step.deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="protocol-mobile-chip">
                    <span aria-hidden="true">✓</span> {del}
                  </li>
                ))}
              </ul>

              {/* Inline Mini-Viewport for each state */}
              <div className="protocol-mobile-preview" aria-hidden="true">
                <div className="protocol-mobile-preview-top">
                  <span className="mono">{step.stateBadge}</span>
                </div>
                <ProtocolArtifact isMini={true} miniStep={idx} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

