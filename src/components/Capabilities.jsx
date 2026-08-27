import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import useReveal from "../hooks/useReveal.js";

/* ---------------------------------------------------------------
   WE TECH HUB — CAPABILITIES: ANATOMICAL STRATA
   Direction: One System / Multiple Disciplines
   Dissection of a digital artifact reference across
   Product, Design, Engineering, and Delivery Convergence.
   --------------------------------------------------------------- */

const STRATA = [
  {
    id: "product",
    num: "01",
    label: "Produto",
    shortLabel: "Produto",
    tagline: "Definir o que realmente precisa existir.",
    description:
      "Definimos com rigor o que construir, para quem e com quais prioridades de negócio antes de desenhar a primeira tela.",
    capabilities: [
      { id: "p1", code: "01.1", name: "Discovery & Modelagem de Escopo", focus: "zone-scope" },
      { id: "p2", code: "01.2", name: "UX Research & Mapeamento de Usuário", focus: "zone-ux" },
      { id: "p3", code: "01.3", name: "Arquitetura de Informação & Fluxos Críticos", focus: "zone-flow" },
      { id: "p4", code: "01.4", name: "Prototipação Estratégica de Validação", focus: "zone-proto" },
    ],
    statusBadge: "Decisão estratégica",
  },
  {
    id: "design",
    num: "02",
    label: "Experiência",
    shortLabel: "Experiência",
    tagline: "Dar forma a fluxos, interface e comportamento.",
    description:
      "Desenhamos interfaces para resolver problemas ergonômicos e operacionais antes de parecerem bonitas, com padrões visuais sustentáveis.",
    capabilities: [
      { id: "d1", code: "02.1", name: "UI & Design de Interfaces Críticas", focus: "zone-ui" },
      { id: "d2", code: "02.2", name: "Design Systems & Tokens de Engenharia", focus: "zone-tokens" },
      { id: "d3", code: "02.3", name: "Prototipação Funcional de Alta Fidelidade", focus: "zone-hifi" },
      { id: "d4", code: "02.4", name: "Microinterações & Ergonomia Digital", focus: "zone-micro" },
    ],
    statusBadge: "Design de interface",
  },
  {
    id: "engineering",
    num: "03",
    label: "Engenharia",
    shortLabel: "Engenharia",
    tagline: "Transformar decisões em produto funcional.",
    description:
      "Construímos front-ends e aplicações web com estrutura clara, atenção a performance e integrações orientadas por contrato.",
    capabilities: [
      { id: "e1", code: "03.1", name: "Aplicações Web & Plataformas Digitais", focus: "zone-apps" },
      { id: "e2", code: "03.2", name: "Engenharia Front-end Estruturada", focus: "zone-frontend" },
      { id: "e3", code: "03.3", name: "Integração de APIs & Orquestração de Dados", focus: "zone-api" },
      { id: "e4", code: "03.4", name: "Performance, Acessibilidade & Robustez", focus: "zone-perf" },
    ],
    statusBadge: "Estrutura de software",
  },
  {
    id: "convergence",
    num: "04",
    label: "Evolução",
    shortLabel: "Evolução",
    tagline: "Continuar construindo conforme o contexto muda.",
    description:
      "O ponto em que produto, design e engenharia chegam a um artefato pronto para ser lançado, acompanhado e evoluído.",
    capabilities: [
      { id: "c1", code: "04.1", name: "Entrega Assistida & Documentação", focus: "zone-deploy" },
      { id: "c2", code: "04.2", name: "Revisão de Experiência e Performance", focus: "zone-monitor" },
      { id: "c3", code: "04.3", name: "Sustentação de Código & Iteração Contínua", focus: "zone-scale" },
      { id: "c4", code: "04.4", name: "Critérios de Qualidade & Manutenção", focus: "zone-qa" },
    ],
    statusBadge: "Iteração contínua",
  },
];

export default function Capabilities() {
  const [activeStratum, setActiveStratum] = useState(1); // Default to Experiência (Design)
  const [hoveredCapability, setHoveredCapability] = useState(null);
  const intro = useReveal();
  const stageRef = useRef(null);
  const planesRef = useRef([]);
  planesRef.current = [];

  const addPlaneRef = (el) => {
    if (el && !planesRef.current.includes(el)) {
      planesRef.current.push(el);
    }
  };

  const current = STRATA[activeStratum];

  /* Update 2.5D visual planes via GSAP on stratum change */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const planes = planesRef.current;
    if (!planes.length) return;

    // Configuration per active stratum:
    // [Plane 1: Product, Plane 2: Design, Plane 3: Engineering]
    const transforms = {
      0: [ // Focus on 01 Produto
        { y: -30, z: 60, opacity: 1, filter: "grayscale(0%) brightness(1.1)" },
        { y: 15, z: -20, opacity: 0.25, filter: "grayscale(80%) brightness(0.6)" },
        { y: 55, z: -80, opacity: 0.15, filter: "grayscale(100%) brightness(0.4)" },
      ],
      1: [ // Focus on 02 Experiência (Design)
        { y: -45, z: -40, opacity: 0.35, filter: "grayscale(70%) brightness(0.5)" },
        { y: 0, z: 50, opacity: 1, filter: "grayscale(0%) brightness(1)" },
        { y: 45, z: -40, opacity: 0.28, filter: "grayscale(80%) brightness(0.5)" },
      ],
      2: [ // Focus on 03 Engenharia
        { y: -55, z: -80, opacity: 0.15, filter: "grayscale(100%) brightness(0.4)" },
        { y: -15, z: -20, opacity: 0.3, filter: "grayscale(75%) brightness(0.5)" },
        { y: 25, z: 60, opacity: 1, filter: "grayscale(0%) brightness(1.1)" },
      ],
      3: [ // 04 Evolução (all layers aligned in one artifact)
        { y: 0, z: 0, opacity: 0.9, filter: "grayscale(0%)" },
        { y: 0, z: 0, opacity: 1, filter: "grayscale(0%)" },
        { y: 0, z: 0, opacity: 0.85, filter: "grayscale(0%)" },
      ],
    };

    const config = transforms[activeStratum] || transforms[1];

    const ctx = gsap.context(() => {
      planes.forEach((plane, i) => {
        if (!plane || !config[i]) return;
        gsap.to(plane, {
          y: config[i].y,
          z: config[i].z,
          opacity: config[i].opacity,
          filter: config[i].filter,
          duration: 0.55,
          ease: "power3.out",
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, [activeStratum]);

  const handleStratumSelect = useCallback((index) => {
    setActiveStratum(index);
  }, []);

  return (
    <section id="expertise" className="section capabilities-section" aria-label="Capacidades e Disciplinas">
      <div className="container">
        {/* Section Intro Header */}
        <div ref={intro.ref} className={`${intro.className} capabilities-intro`}>
          <div className="capabilities-eyebrow-wrap">
            <span className="mono eyebrow">02 / Capacidades</span>
          </div>
          <h2 className="heading-lg capabilities-heading">
            Um produto digital não é uma soma de entregas isoladas.
            <span className="capabilities-heading-highlight"> É um único sistema contínuo.</span>
          </h2>
          <p className="body-base capabilities-lead">
            Eliminamos a passagem de bastão tradicional. Na We Tech, as decisões estratégicas de produto,
            a arquitetura visual da interface e a robustez da engenharia evoluem como camadas coordenadas
            do mesmo artefato digital.
          </p>
        </div>

        {/* Mobile-Only Segmented Control */}
        <div className="capabilities-mobile-nav" role="tablist" aria-label="Selecionar Disciplina">
          {STRATA.map((s, idx) => {
            const isActive = activeStratum === idx;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                className={`capabilities-mobile-tab ${isActive ? "active" : ""}`}
                onClick={() => handleStratumSelect(idx)}
              >
                <span className="mono capabilities-mobile-tab-num">{s.num}</span>
                <span className="capabilities-mobile-tab-label">{s.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 12-Column Strata Layout */}
        <div className="strata-grid">
          {/* LEFT: Editorial Control Console (Cols 1–5) */}
          <div className="strata-console">
            <div className="strata-console-inner">
              <div className="strata-console-meta">
                <span className="mono strata-console-label">Camadas do produto</span>
                <span className="mono strata-console-coord">Visão integrada</span>
              </div>

              {/* Vertical Interactive Selector */}
              <div className="strata-selector-list" role="tablist" aria-orientation="vertical">
                {STRATA.map((s, idx) => {
                  const isActive = activeStratum === idx;
                  return (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={isActive}
                      className={`strata-selector-btn ${isActive ? "active" : ""}`}
                      onClick={() => handleStratumSelect(idx)}
                    >
                      <div className="strata-selector-left">
                        <span className="mono strata-selector-num">{s.num}</span>
                        <div className="strata-selector-copy">
                          <span className="strata-selector-name">{s.label}</span>
                          <span className="strata-selector-tagline">{s.tagline}</span>
                        </div>
                      </div>
                      <span className="strata-selector-indicator" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* Capabilities Panel for Active Stratum */}
              <div className="strata-active-panel">
                <div className="strata-active-header">
                  <span className="mono strata-active-status">
                    <span className="status-dot" aria-hidden="true" />
                    {current.statusBadge}
                  </span>
                  <span className="mono strata-active-count">
                    {String(current.capabilities.length).padStart(2, "0")} disciplinas
                  </span>
                </div>

                <p className="strata-active-desc">{current.description}</p>

                <ul className="strata-capabilities-list">
                  {current.capabilities.map((cap) => {
                    const isHovered = hoveredCapability === cap.focus;
                    return (
                      <li
                        key={cap.id}
                        className={`strata-capability-item ${isHovered ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredCapability(cap.focus)}
                        onMouseLeave={() => setHoveredCapability(null)}
                      >
                        <span className="mono strata-cap-code">{cap.code}</span>
                        <span className="strata-cap-name">{cap.name}</span>
                        <span className="strata-cap-arrow" aria-hidden="true">→</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Strata Stage — 2.5D Inspection Pallet (Cols 6–12) */}
          <div className="strata-stage-col">
            <div className="strata-stage" ref={stageRef}>
              {/* Inspection Header Bar */}
              <div className="strata-stage-topbar">
                <div className="strata-stage-meta-left">
                  <span className="strata-stage-marker" aria-hidden="true" />
                  <span className="mono strata-topbar-title">
                    Visualização do artefato · {current.label}
                  </span>
                </div>
                <div className="strata-stage-meta-right">
                  <span className="mono strata-topbar-stratum">
                    Camada {current.num}/04
                  </span>
                </div>
              </div>

              {/* 2.5D Perspective Viewport */}
              <div className="strata-viewport">
                {/* Visual Grid Calipers */}
                <div className="strata-grid-overlay" aria-hidden="true">
                  <div className="strata-caliper strata-caliper--top" />
                  <div className="strata-caliper strata-caliper--bottom" />
                  <div className="strata-caliper strata-caliper--left" />
                  <div className="strata-caliper strata-caliper--right" />
                </div>

                {/* PLANE 1: Produto (Blueprint & Flow Matrix) */}
                <div
                  ref={addPlaneRef}
                  className={`stratum-plane stratum-plane--product ${activeStratum === 0 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 0}
                >
                  <div className="stratum-plane-inner blueprint-grid">
                    <div className="stratum-plane-header">
                      <span className="mono plane-badge">01 / Estrutura & Escopo</span>
                      <span className="mono plane-coords">Mapeamento de requisitos</span>
                    </div>

                    <div className="blueprint-schematic">
                      <div className="blueprint-zone blueprint-zone--header">
                        <span className="mono zone-tag">Posicionamento de produto</span>
                        <div className="blueprint-wire-line" />
                      </div>

                      <div className="blueprint-body">
                        <div className="blueprint-zone blueprint-zone--main">
                          <span className="mono zone-tag">Hierarquia de informação</span>
                          <div className="blueprint-box-placeholder" />
                          <div className="blueprint-vector-arrow">
                            <span className="mono vector-label">Fluxo do usuário ──►</span>
                          </div>
                        </div>

                        <div className="blueprint-zone blueprint-zone--sidebar">
                          <span className="mono zone-tag">Prioridades de entrega</span>
                          <div className="blueprint-wire-metric">
                            <span className="mono metric-calc">4 frentes de escopo</span>
                            <span className="mono metric-calc">Critérios validados</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLANE 2: Experiência (High-Fidelity Render & Design Systems) */}
                <div
                  ref={addPlaneRef}
                  className={`stratum-plane stratum-plane--design ${activeStratum === 1 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 1}
                >
                  <div className="stratum-plane-inner design-grid">
                    <div className="stratum-plane-header">
                      <span className="mono plane-badge">02 / Interface & Sistema Visual</span>
                      <span className="mono plane-coords">Instrument Sans · Grade 8px</span>
                    </div>

                    <div className="design-interface-viewport">
                      <img
                        src="/img/projects/toro_token_web_site.webp"
                        alt="Interface do projeto TORO Token usada como referência visual"
                        className="strata-real-img"
                        loading="lazy"
                      />

                      {/* Design System Guides */}
                      <div className="design-system-guides" aria-hidden="true">
                        <div className="ds-token-tag ds-token-tag--accent">
                          <span className="ds-token-swatch" />
                          <span className="mono">Token: #FF4D00</span>
                        </div>
                        <div className="ds-token-tag ds-token-tag--type">
                          <span className="mono">Fonte: Instrument Sans</span>
                        </div>
                        <div className="ds-token-tag ds-token-tag--radius">
                          <span className="mono">Raio: 2px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLANE 3: Engenharia (Engineering structure) */}
                <div
                  ref={addPlaneRef}
                  className={`stratum-plane stratum-plane--engineering ${activeStratum === 2 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 2}
                >
                  <div className="stratum-plane-inner engineering-grid">
                    <div className="stratum-plane-header">
                      <span className="mono plane-badge">03 / Engenharia & Componentes</span>
                      <span className="mono plane-coords">React · Arquitetura estruturada</span>
                    </div>

                    <div className="engineering-schematic">
                      {/* Component Boundaries & Node Hierarchy */}
                      <div className="eng-node eng-node--header">
                        <span className="mono eng-node-tag">&lt;ExperienceShell /&gt;</span>
                        <span className="mono eng-node-status">Estrutura base</span>
                      </div>

                      <div className="eng-node-split">
                        <div className="eng-node eng-node--component">
                          <span className="mono eng-node-tag">&lt;ContentModules /&gt;</span>
                          <span className="mono eng-metric">Módulos de conteúdo</span>
                          <div className="eng-data-pipeline">
                            <span className="eng-pipe-pulse" />
                            <span className="mono pipe-text">Fluxo de dados</span>
                          </div>
                        </div>

                        <div className="eng-node eng-node--component">
                          <span className="mono eng-node-tag">&lt;InterfaceState /&gt;</span>
                          <span className="mono eng-metric">Estado da interface</span>
                          <span className="mono eng-node-status eng-node-status--ok">Integração de APIs</span>
                        </div>
                      </div>

                      <div className="eng-footer-notes">
                        <span className="mono">Acessibilidade</span>
                        <span className="mono">Performance</span>
                        <span className="mono">Responsivo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLANE 4: Evolução (Visible when Evolução is selected) */}
                {activeStratum === 3 && (
                  <div className="stratum-convergence-banner">
                    <div className="convergence-chip">
                      <span className="convergence-dot" />
                      <span className="mono">Disciplinas alinhadas do conceito ao deploy</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage footer */}
              <div className="strata-stage-footer">
                <span className="mono strata-footer-text">
                  Produto · Design · Engenharia
                </span>
                <span className="mono strata-footer-status">
                  Visão do artefato
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Bridge to Section 03: Process */}
        <div className="strata-transition-bridge">
          <div className="strata-bridge-content">
            <span className="mono strata-bridge-eyebrow">Do conceito à execução</span>
            <p className="strata-bridge-text">
              Você conheceu as disciplinas fundamentais. Descubra agora o processo metódico pelo qual nós as colocamos em movimento.
            </p>
          </div>
          <a href="#process" className="strata-bridge-link" aria-label="Ver nosso processo de construção">
            <span>Conhecer o processo</span>
            <span className="strata-bridge-arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
