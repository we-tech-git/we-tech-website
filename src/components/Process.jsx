import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../hooks/useReveal.js";
import ProtocolArtifact from "./ProtocolArtifact.jsx";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   WE TECH HUB — BUILD PROTOCOL (FASE 6)
   Creative Direction: PROGRESSIVE MONOLITH
   A structured progression from problem framing to live evolution.
   --------------------------------------------------------------- */

const PROTOCOL_STEPS = [
  {
    id: "frame",
    num: "01",
    label: "Entender",
    question: "O que realmente precisa ser resolvido?",
    text: "Entender o contexto, os objetivos, as restrições e as prioridades antes de definir a solução.",
    focus: "Contexto e objetivos",
    stateBadge: "Estrutura inicial",
  },
  {
    id: "define",
    num: "02",
    label: "Definir",
    question: "O que realmente precisa existir?",
    text: "Delimitar o escopo e organizar os requisitos para concentrar esforço no que é essencial para o produto.",
    focus: "Escopo e prioridades",
    stateBadge: "Escopo definido",
  },
  {
    id: "shape",
    num: "03",
    label: "Dar forma",
    question: "Como a experiência deve funcionar?",
    text: "Estruturar fluxos, interface, comportamento e estados principais antes da implementação.",
    focus: "Fluxos e interface",
    stateBadge: "Experiência desenhada",
  },
  {
    id: "build",
    num: "04",
    label: "Construir",
    question: "Como transformar decisões em produto funcional?",
    text: "Implementar o que foi definido em uma aplicação utilizável, consistente e preparada para continuar evoluindo.",
    focus: "Implementação",
    stateBadge: "Código implementado",
  },
  {
    id: "validate",
    num: "05",
    label: "Validar",
    question: "O que precisa ser verificado antes de avançar?",
    text: "Revisar comportamento, experiência, responsividade e funcionamento para identificar problemas antes da próxima etapa.",
    focus: "Qualidade e ajustes",
    stateBadge: "Qualidade validada",
  },
  {
    id: "evolve",
    num: "06",
    label: "Evoluir",
    question: "O que acontece depois que o produto está no ar?",
    text: "Acompanhar novas necessidades e continuar aprimorando o produto conforme o contexto do negócio evolui.",
    focus: "Evolução contínua",
    stateBadge: "Evolução contínua",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const triggerInstanceRef = useRef(null);
  const activeStepRef = useRef(0);
  const intro = useReveal();

  const current = PROTOCOL_STEPS[activeStep] || PROTOCOL_STEPS[0];

  /* ---------------------------------------------------------------
     DESKTOP SCROLLTRIGGER PINNING
     Applies only on >=1025px desktop viewports with height >=700px
     and without prefers-reduced-motion.
     --------------------------------------------------------------- */
  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (!isClient) return;

    const mediaReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
            <span className="mono eyebrow">03 / Processo</span>
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
            {/* LEFT COLUMN: Narrative Console & Step Selector (Cols 1-5) */}
            <div className="protocol-console">
              {/* Stepper Navigation */}
              <div
                className="protocol-stepper"
                role="navigation"
                aria-label="Etapas do Processo de Construção"
              >
                <ol className="protocol-steps-list" role="list">
                  {PROTOCOL_STEPS.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <li key={step.id} className="protocol-step-item">
                        <button
                          type="button"
                          className={`protocol-step-btn ${isActive ? "active" : ""}`}
                          onClick={() => handleStepClick(idx)}
                          aria-current={isActive ? "step" : undefined}
                          aria-label={`Etapa ${step.num}: ${step.label} - ${step.question}`}
                        >
                          <span className="mono protocol-step-num">{step.num}</span>
                          <span className="protocol-step-label">{step.label}</span>
                          {isActive && <span className="protocol-active-dot" aria-hidden="true" />}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Active Step Narrative Block */}
              <div className="protocol-narrative-card">
                <div className="protocol-card-header">
                  <span className="mono protocol-focus-badge">{current.focus}</span>
                  <span className="mono protocol-step-indicator">{current.num} / 06</span>
                </div>

                <h3 className="protocol-question">{current.question}</h3>
                <p className="protocol-description">{current.text}</p>

                <div className="protocol-card-footer">
                  <span className="mono protocol-card-status">
                    <span className="protocol-status-node" aria-hidden="true" />
                    {current.stateBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Assembly Viewport (Cols 6-12) */}
            <div className="protocol-viewport-col">
              <div className="protocol-viewport">
                {/* Viewport Top Bar */}
                <div className="protocol-viewport-topbar">
                  <div className="protocol-viewport-meta-left">
                    <span className="protocol-viewport-dot" aria-hidden="true" />
                    <span className="mono protocol-viewport-title">
                      Visão da etapa · {current.label}
                    </span>
                  </div>
                  <div className="protocol-viewport-meta-right">
                    <span className="mono protocol-progress-counter">
                      Etapa {current.num}/06
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

                {/* Viewport Footer Bar */}
                <div className="protocol-viewport-footer">
                  <span className="mono protocol-footer-note">
                    Construção progressiva
                  </span>
                  <span className="mono protocol-footer-tag">
                    {current.stateBadge}
                  </span>
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
                <span className="mono protocol-mobile-focus">{step.focus}</span>
              </div>

              <h3 className="protocol-mobile-question">{step.question}</h3>
              <p className="protocol-mobile-text">{step.text}</p>

              {/* Inline Mini-Viewport for each state */}
              <div className="protocol-mobile-preview" aria-hidden="true">
                <div className="protocol-mobile-preview-top">
                  <span className="mono">{step.stateBadge}</span>
                  <span className="mono">{step.num}/06</span>
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
