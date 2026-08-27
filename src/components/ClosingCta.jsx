import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { INSTAGRAM_URL } from "../data.js";

/* ---------------------------------------------------------------
   WE TECH HUB — CLOSING CTA (FASE 8)
   Direction: PROJECT INITIATION
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
  const introReveal = useReveal();
  const cardReveal = useReveal();

  return (
    <section
      id="contato"
      className="section closing-cta-section"
      aria-labelledby="cta-heading"
    >
      <div className="container">
        {/* Main Initiation Monolith */}
        <div className="closing-cta-card">
          {/* Top metadata & Eyebrow */}
          <div
            ref={introReveal.ref}
            className={`${introReveal.className} closing-cta-header`}
          >
            <div className="closing-cta-eyebrow-row">
              <span className="mono eyebrow">05 / Começar um projeto</span>
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
          <div className="closing-cta-pillars" role="list">
            {INITIATION_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="closing-cta-pillar"
                role="listitem"
              >
                <div className="pillar-top">
                  <span className="mono pillar-num" aria-hidden="true">
                    {pillar.num}
                  </span>
                  <span className="mono pillar-label">{pillar.label}</span>
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
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary closing-cta-primary-btn"
                aria-label="Abrir Instagram da We Tech Hub para falar sobre o projeto"
              >
                Falar sobre o projeto <span className="btn-arrow" aria-hidden="true">→</span>
              </a>

              <Link
                to="/projetos"
                className="btn btn--ghost closing-cta-secondary-btn"
              >
                Ver todos os projetos <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="closing-cta-channel-meta">
              <span className="mono channel-meta-text">
                Instagram @wetech.h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
