import { useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import { INSTAGRAM_URL } from "../data.js";
import { initMagneticElement } from "../motion.js";
import { ActionIcon } from "./Icons.jsx";

/* ---------------------------------------------------------------
   WE TECH HUB — CLOSING CTA (FASE 8 & FASE F)
   Direction: PROJECT INITIATION
   Motion: CONVERGENCE & MAGNETIC INVITATION
   Transforms built trust into a clear, direct, and factual next step.
   --------------------------------------------------------------- */

const INITIATION_PILLARS = [
  {
    num: "01",
    label: "Contexto & estágio",
    detail: "Onde o produto está hoje e o que precisa acontecer a seguir.",
  },
  {
    num: "02",
    label: "Desafio central",
    detail: "Qual é o principal desafio de produto, experiência ou tecnologia.",
  },
  {
    num: "03",
    label: "Objetivo esperado",
    detail: "O que precisa mudar, lançar ou evoluir.",
  },
];

export default function ClosingCta() {
  const introReveal = useReveal({ variant: "mask" });
  const pillarsReveal = useReveal({ variant: "standard", threshold: 0.2 });
  const cardReveal = useReveal({ variant: "standard", threshold: 0.2 });
  const primaryBtnRef = useRef(null);

  /* ---- Magnetic CTA interaction (Desktop only) ---- */
  useEffect(() => {
    const cleanup = initMagneticElement(primaryBtnRef.current, 0.22, 6);
    return cleanup;
  }, []);

  return (
    <section
      id="contato"
      className="section closing-cta-section"
      aria-labelledby="cta-heading"
    >
      <div className="container">
        {/* Top metadata & Eyebrow */}
        <div
          ref={introReveal.ref}
          className={`${introReveal.className} closing-cta-header`}
        >
          <div className="closing-cta-eyebrow-row">
            <span className="eyebrow">Começar um projeto</span>
          </div>

          <h2 id="cta-heading" className="heading-xl closing-cta-heading">
            Conte o que você está construindo.
          </h2>

          <p className="body-lg closing-cta-lead">
            Se existe um produto para lançar, evoluir ou reorganizar, comece
            pelo contexto. A conversa parte do problema real e dos objetivos do
            negócio — não de uma lista genérica de funcionalidades.
          </p>
        </div>

        {/* Initiation Guidelines — 3 columns */}
        <div
          ref={pillarsReveal.ref}
          className={`closing-cta-pillars reveal-stagger ${pillarsReveal.className}`}
          role="list"
        >
          {INITIATION_PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="closing-cta-pillar"
              role="listitem"
            >
              <div className="pillar-top">
                <span className="pillar-label">{pillar.label}</span>
              </div>
              <p className="pillar-detail">{pillar.detail}</p>
            </div>
          ))}
        </div>

        {/* Action Row */}
        <div
          ref={cardReveal.ref}
          className={`${cardReveal.className} closing-cta-actions-wrap`}
        >
          <div className="closing-cta-actions">
            <div ref={primaryBtnRef} className="cta-magnetic-wrap">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary closing-cta-primary-btn"
                aria-label="Abrir Instagram da We Tech Hub para falar sobre o projeto"
              >
                Falar sobre o projeto <ActionIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
