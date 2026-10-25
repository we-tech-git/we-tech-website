import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReveal from "../hooks/useReveal.js";
import ProtocolArtifact from "./ProtocolArtifact.jsx";
import { EASINGS, prefersReducedMotion } from "../motion.js";
import { StepArrowIcon } from "./Icons.jsx";
import { useI18n } from "../i18n/I18nContext.jsx";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   WE TECH HUB — BUILD PROTOCOL (FASE 6 & FASE F)
   Creative Direction: ARCHITECTURAL PROTOCOL MATRIX
   Bespoke engineering progression deck without generic template clichés.
   --------------------------------------------------------------- */

/* Index of the ProtocolArtifact view shown for each step (the artifact has 6 views). */
const ARTIFACT_VIEWS = [0, 1, 2, 3, 5];

export default function Process() {
  const { t } = useI18n();
  const PROTOCOL_STEPS = t("process.steps").map((step, i) => ({
    ...step,
    id: `step-${i}`,
    num: String(i + 1).padStart(2, "0"),
    view: ARTIFACT_VIEWS[i],
  }));
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const pinnedRef = useRef(null);
  const narrativeRef = useRef(null);
  const triggerInstanceRef = useRef(null);
  const activeStepRef = useRef(0);
  // Fase H: Process is one of two sections (with the CTA) allowed the mask/clip
  // reveal — it precedes the pinned progression, so a heavier entrance is earned.
  const intro = useReveal({ variant: "mask" });

  const current = PROTOCOL_STEPS[activeStep] || PROTOCOL_STEPS[0];

  /* ---------------------------------------------------------------
     DESKTOP SCROLLTRIGGER PINNING
     Applies only on >=1025px desktop viewports with height >=700px
     and without prefers-reduced-motion.
     --------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    const totalSteps = PROTOCOL_STEPS.length;
    // Fase H: gsap.matchMedia() (not a one-time innerWidth check) so the pin
    // is created/torn down cleanly if the viewport crosses the desktop
    // breakpoint after mount — resize/rotate no longer leaves a stuck pin
    // or a desktop that never got one.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (min-height: 550px)", () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: sectionRef.current,
        start: "top 64px",
        end: "+=120%",
        scrub: 0.35,
        anticipatePin: 1,
        pinSpacing: true,
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

      return () => {
        triggerInstanceRef.current = null;
      };
    });

    return () => mm.revert();
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
        ease: EASINGS.standard,
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

  /* Keyboard navigation for protocol stage ladder */
  const handleLadderKeyDown = useCallback(
    (e, index) => {
      let nextIndex = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (index + 1) % PROTOCOL_STEPS.length;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (index - 1 + PROTOCOL_STEPS.length) % PROTOCOL_STEPS.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = PROTOCOL_STEPS.length - 1;
      }

      if (nextIndex !== null) {
        handleStepClick(nextIndex);
      }
    },
    [handleStepClick]
  );

  return (
    <section
      id="processo"
      ref={sectionRef}
      className="section protocol-section"
      aria-labelledby="protocol-heading"
    >
      <div className="container container--wide">
        {/* Section Intro (revealed on scroll) */}
        <div ref={intro.ref} className={`${intro.className} protocol-intro`}>
          <div className="protocol-eyebrow-wrap">
            <span className="eyebrow">{t("process.eyebrow")}</span>
          </div>
          <h2 id="protocol-heading" className="heading-lg protocol-heading">
            {t("process.title")}
            <span className="protocol-heading-highlight"> {t("process.highlight")}</span>
          </h2>
          <p className="body-base protocol-lead">
            {t("process.lead")}
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
                    <span className="protocol-deck-title">{t("process.ui.deck")}</span>
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
                            onKeyDown={(e) => handleLadderKeyDown(e, idx)}
                            aria-current={isActive ? "step" : undefined}
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
                    <span className="protocol-focus-tag">{current.focus}</span>
                  </div>
                  <div className="protocol-dossier-status">
                    <span className="protocol-status-pill">
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
                  <span className="protocol-deliverables-label">{t("process.ui.criteria")}</span>
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
                    aria-label={t("process.ui.prevLabel")}
                  >
                    {t("process.ui.prev")}
                  </button>
                  <span className="mono protocol-nav-count">
                    {current.num} / {String(PROTOCOL_STEPS.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    className="protocol-nav-btn protocol-nav-btn--next"
                    onClick={handleNext}
                    disabled={activeStep === PROTOCOL_STEPS.length - 1}
                    aria-label={t("process.ui.nextLabel")}
                  >
                    {t("process.ui.next")} <StepArrowIcon />
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
                    <span className="protocol-viewport-title">
                      {t("process.ui.view")} · {current.label}
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
                  <ProtocolArtifact activeStep={current.view} />
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
                <span className="protocol-mobile-focus">{step.focus}</span>
                <span className="protocol-mobile-status">{step.stateBadge}</span>
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
                  <span>{step.stateBadge}</span>
                </div>
                <ProtocolArtifact isMini={true} miniStep={step.view} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

