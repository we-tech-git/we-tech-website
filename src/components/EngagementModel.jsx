import { useState, useCallback } from "react";
import useReveal from "../hooks/useReveal.js";
import { FrontsActionBadge } from "./Icons.jsx";

/* ---------------------------------------------------------------
   WE TECH HUB — FRENTES DE ATUAÇÃO
   Direction: Duas frentes / Um time só
   FASE I · SIGNATURE MOMENT 03: Symmetrical Rail Synchronization
   --------------------------------------------------------------- */

const FRONTS = [
  {
    id: "tech",
    key: "a",
    index: "01",
    title: "Tech",
    meta: "Dev · Manutenção · Auditoria",
    tagline: "Engenharia de software e infraestrutura de ponta.",
    ctaText: "Contratar só Tech",
    ctaIntegrated: "Contratar Tech Integrada",
    capabilities: [
      {
        code: "01",
        title: "Desenvolvimento",
        desc: "Loja, checkout e integrações sob medida em stack própria.",
      },
      {
        code: "02",
        title: "Manutenção",
        desc: "Time de plantão para o que não pode cair no pico de venda.",
      },
      {
        code: "03",
        title: "Auditoria técnica",
        desc: "Performance, Core Web Vitals e segurança do front ao back.",
      },
      {
        code: "04",
        title: "Integrações",
        desc: "ERP, pagamento, logística e BI falando a mesma língua.",
      },
    ],
  },
  {
    id: "perf",
    key: "b",
    index: "02",
    title: "Performance",
    meta: "CRO · Funil · Testes A/B · Heatmap",
    tagline: "Otimização contínua e inteligência de conversão.",
    ctaText: "Contratar só Performance",
    ctaIntegrated: "Contratar Performance Integrada",
    capabilities: [
      {
        code: "01",
        title: "CRO",
        desc: "Otimização de conversão baseada em dado, não em achismo.",
      },
      {
        code: "02",
        title: "Funil",
        desc: "Redesenho de jornada do anúncio ao pós-compra.",
      },
      {
        code: "03",
        title: "Testes A/B",
        desc: "Hipótese, experimento e decisão — em ciclos curtos.",
      },
      {
        code: "04",
        title: "Heatmap",
        desc: "Onde o usuário trava vira ticket de dev no mesmo dia.",
      },
    ],
  },
];

const SELECTOR_OPTIONS = [
  { key: "a", label: "Só Tech", shortLabel: "Tech" },
  { key: "integrated", label: "Ambos · integrado", shortLabel: "Ambos", highlight: true },
  { key: "b", label: "Só Performance", shortLabel: "Performance" },
];

export default function EngagementModel() {
  const [state, setState] = useState("integrated");
  const [hoveredRow, setHoveredRow] = useState(null);
  const intro = useReveal({ variant: "standard" });
  const activeIndex = SELECTOR_OPTIONS.findIndex((opt) => opt.key === state);

  const handleSelect = useCallback((key) => {
    setState(key);
    setHoveredRow(null);
  }, []);

  const getPanelState = (key) => {
    if (state === "integrated") return "integrated";
    return state === key ? "active" : "dimmed";
  };

  return (
    <section id="fronts" className="section fronts-section" aria-label="Frentes de atuação">
      <div className="container container--wide">
        {/* Intro — Centralized */}
        <div ref={intro.ref} className={`${intro.className} fronts-intro`}>
          <div className="fronts-eyebrow-wrap">
            <span className="eyebrow">Frentes</span>
          </div>
          <h2 className="heading-lg fronts-heading">
            Duas frentes. <span className="fronts-heading-highlight">Um time só.</span>
          </h2>
          <p className="body-base fronts-lead">
            Contrate os dois integrados — ou só o que você precisa agora. Você escolhe o ponto de partida.
          </p>
        </div>

        {/* 3-Way Tactical Segmented Controller */}
        <div className="fronts-control-wrap">
          <div
            className="fronts-control"
            role="group"
            aria-label="Selecionar composição das frentes de atuação"
          >
            <div className="fronts-control-track" aria-hidden="true">
              <span
                className="fronts-control-indicator"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
              />
            </div>
            {SELECTOR_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={`fronts-control-btn ${state === opt.key ? "active" : ""} ${
                  opt.highlight ? "fronts-control-btn--highlight" : ""
                }`}
                aria-pressed={state === opt.key}
                onClick={() => handleSelect(opt.key)}
              >
                <span className="fronts-control-label fronts-control-label--desktop">{opt.label}</span>
                <span className="fronts-control-label fronts-control-label--mobile">{opt.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Integration Status Message */}
        <div className="fronts-status-bar" aria-live="polite">
          <span className="fronts-status-pill">
            {state === "integrated" && (
              <>SINERGIA TOTAL: TECH &amp; PERFORMANCE EM SPRINT COORDENADO</>
            )}
            {state === "a" && (
              <>ENGENHARIA &amp; DESENVOLVIMENTO DEDICADO</>
            )}
            {state === "b" && (
              <>OTIMIZAÇÃO DE CONVERSÃO &amp; PERFORMANCE DEDICADA</>
            )}
          </span>
        </div>

        {/* Symmetrical Dual Panels Stage with Central Connector */}
        <div className={`fronts-stage fronts-stage--${state}`}>
          {/* FRENTE A - TECH */}
          <div
            className={`fronts-panel fronts-panel--a fronts-panel--${getPanelState("a")}`}
            onClick={() => state !== "a" && handleSelect("a")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect("a")}
            aria-label={`${FRONTS[0].title} - ${state === "a" ? "Ativo" : state === "integrated" ? "Integrado" : "Clique para selecionar"}`}
          >
            <div className="fronts-panel-top-glow" aria-hidden="true" />

            <div className="fronts-panel-header">
              <div className="fronts-panel-badge-row">
                <div className="fronts-panel-index-wrap">
                  <span className="fronts-panel-state-tag">
                    {state === "integrated" ? "SINERGIA" : state === "a" ? "FRENTE ATIVA" : "STANDBY"}
                  </span>
                </div>
                <span className="mono fronts-panel-tag">{FRONTS[0].meta}</span>
              </div>
              <h3 className="heading-md fronts-panel-title">{FRONTS[0].title}</h3>
              <p className="fronts-panel-tagline">{FRONTS[0].tagline}</p>
            </div>

            <div className="fronts-panel-divider" aria-hidden="true" />

            <div className="fronts-panel-capabilities">
              {FRONTS[0].capabilities.map((cap, idx) => {
                const isSynergy = state === "integrated" && hoveredRow === idx;
                return (
                  <div
                    key={cap.code}
                    className={`fronts-cap-row ${isSynergy ? "is-synergy" : ""}`}
                    onMouseEnter={() => state === "integrated" && setHoveredRow(idx)}
                    onMouseLeave={() => state === "integrated" && setHoveredRow(null)}
                    onFocus={() => state === "integrated" && setHoveredRow(idx)}
                    onBlur={() => state === "integrated" && setHoveredRow(null)}
                    tabIndex={state === "integrated" ? 0 : -1}
                  >
                    <span className="mono fronts-cap-code">{cap.code}</span>
                    <div className="fronts-cap-content">
                      <span className="fronts-cap-title">{cap.title}</span>
                      <span className="fronts-cap-desc">{cap.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="fronts-panel-footer">
              <a
                href="#contato"
                className="fronts-panel-cta"
                aria-label={`Contratar ${state === "integrated" ? FRONTS[0].ctaIntegrated : FRONTS[0].ctaText}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>{state === "integrated" ? FRONTS[0].ctaIntegrated : FRONTS[0].ctaText}</span>
                <FrontsActionBadge />
              </a>
            </div>
          </div>

          {/* CENTRAL FUSION HUB & CONDUIT */}
          <div
            className={`fronts-connector fronts-connector--${state}`}
            onClick={() => handleSelect(state === "integrated" ? "a" : "integrated")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect("integrated")}
            title={state === "integrated" ? "Frentes integradas" : "Ativar ambos integrados"}
            aria-label="Ativar ambos integrados"
          >
            <div className="fronts-connector-line fronts-connector-line--left" />
            <div className="fronts-connector-badge">
              <span className="fronts-connector-plus">+</span>
            </div>
            <div className="fronts-connector-line fronts-connector-line--right" />
          </div>

          {/* FRENTE B - PERFORMANCE */}
          <div
            className={`fronts-panel fronts-panel--b fronts-panel--${getPanelState("b")}`}
            onClick={() => state !== "b" && handleSelect("b")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect("b")}
            aria-label={`${FRONTS[1].title} - ${state === "b" ? "Ativo" : state === "integrated" ? "Integrado" : "Clique para selecionar"}`}
          >
            <div className="fronts-panel-top-glow" aria-hidden="true" />

            <div className="fronts-panel-header">
              <div className="fronts-panel-badge-row">
                <div className="fronts-panel-index-wrap">
                  <span className="fronts-panel-state-tag">
                    {state === "integrated" ? "SINERGIA" : state === "b" ? "FRENTE ATIVA" : "STANDBY"}
                  </span>
                </div>
                <span className="mono fronts-panel-tag">{FRONTS[1].meta}</span>
              </div>
              <h3 className="heading-md fronts-panel-title">{FRONTS[1].title}</h3>
              <p className="fronts-panel-tagline">{FRONTS[1].tagline}</p>
            </div>

            <div className="fronts-panel-divider" aria-hidden="true" />

            <div className="fronts-panel-capabilities">
              {FRONTS[1].capabilities.map((cap, idx) => {
                const isSynergy = state === "integrated" && hoveredRow === idx;
                return (
                  <div
                    key={cap.code}
                    className={`fronts-cap-row ${isSynergy ? "is-synergy" : ""}`}
                    onMouseEnter={() => state === "integrated" && setHoveredRow(idx)}
                    onMouseLeave={() => state === "integrated" && setHoveredRow(null)}
                    onFocus={() => state === "integrated" && setHoveredRow(idx)}
                    onBlur={() => state === "integrated" && setHoveredRow(null)}
                    tabIndex={state === "integrated" ? 0 : -1}
                  >
                    <span className="mono fronts-cap-code">{cap.code}</span>
                    <div className="fronts-cap-content">
                      <span className="fronts-cap-title">{cap.title}</span>
                      <span className="fronts-cap-desc">{cap.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="fronts-panel-footer">
              <a
                href="#contato"
                className="fronts-panel-cta"
                aria-label={`Contratar ${state === "integrated" ? FRONTS[1].ctaIntegrated : FRONTS[1].ctaText}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>{state === "integrated" ? FRONTS[1].ctaIntegrated : FRONTS[1].ctaText}</span>
                <FrontsActionBadge />
              </a>
            </div>
          </div>
        </div>

        {/* High-Impact Integrated Master Action Bar */}
        {state === "integrated" && (
          <div className="fronts-integrated-footer-cta">
            <div className="fronts-integrated-banner">
              <div className="fronts-integrated-info">
                <span className="fronts-integrated-tag">Time completo</span>
                <span className="fronts-integrated-text">Sem atrito entre quem desenvolve e quem otimiza conversão.</span>
              </div>
              <a href="#contato" className="fronts-integrated-action-btn">
                <span>Contratar Tech + Performance Integrados</span>
                <FrontsActionBadge />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


