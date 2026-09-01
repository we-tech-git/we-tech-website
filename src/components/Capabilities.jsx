import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import useReveal from "../hooks/useReveal.js";
import { EASINGS, DURATIONS, prefersReducedMotion } from "../motion.js";
import { BridgeFlowIcon } from "./Icons.jsx";

/* ---------------------------------------------------------------
   WE TECH HUB — CAPABILITIES: ANATOMICAL STRATA
   Direction: One System / Four Coordinated Disciplines
   Dissection of a real digital artifact reference across
   Product, Experience, Engineering, and Continuous Evolution.
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
  const [activeStratum, setActiveStratum] = useState(0); // Default to Produto (Product)
  const [hoveredCapability, setHoveredCapability] = useState(null);
  // Fase H: Capabilities = inspection. The real motion is the layer/artifact
  // switch on the right; the intro stays discreet rather than a dramatic reveal.
  const intro = useReveal({ variant: "standard" });
  const stageRef = useRef(null);
  const consolePanelRef = useRef(null);
  const planesRef = useRef([]);
  const tabRefs = useRef([]);
  const mobileTabRefs = useRef([]);

  const addPlaneRef = (index) => (el) => {
    if (el) {
      planesRef.current[index] = el;
    }
  };

  const current = STRATA[activeStratum];

  const handleStratumSelect = useCallback((index) => {
    setActiveStratum(index);
  }, []);

  /* Fase H: tracks the 768px breakpoint via matchMedia (not just innerWidth
     at effect-run time) so the 2.5D plane transforms below stay correct if
     the viewport crosses it — resize, rotate, or devtools panel toggle. */
  const [isMobileLayout, setIsMobileLayout] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsMobileLayout(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  /* 2.5D visual planes animation via GSAP with dynamic zIndex and viewport boundary containment */
  useEffect(() => {
    const planes = planesRef.current;
    if (!planes || !planes.length) return;

    const reduced = prefersReducedMotion();
    const isMobile = isMobileLayout;

    // Desktop 3D perspective tiering configs for all 4 strata
    const desktopTransforms = {
      0: [
        { y: -16, z: 40, opacity: 1, filter: "brightness(1) contrast(1)", zIndex: 10 },
        { y: 10, z: -15, opacity: 0.32, filter: "grayscale(70%) brightness(0.6)", zIndex: 3 },
        { y: 28, z: -45, opacity: 0.2, filter: "grayscale(90%) brightness(0.4)", zIndex: 2 },
        { y: 46, z: -70, opacity: 0.1, filter: "grayscale(100%) brightness(0.3)", zIndex: 1 },
      ],
      1: [
        { y: -30, z: -35, opacity: 0.3, filter: "grayscale(70%) brightness(0.5)", zIndex: 2 },
        { y: 0, z: 40, opacity: 1, filter: "brightness(1) contrast(1)", zIndex: 10 },
        { y: 24, z: -25, opacity: 0.3, filter: "grayscale(75%) brightness(0.5)", zIndex: 3 },
        { y: 46, z: -65, opacity: 0.15, filter: "grayscale(90%) brightness(0.35)", zIndex: 1 },
      ],
      2: [
        { y: -44, z: -65, opacity: 0.15, filter: "grayscale(90%) brightness(0.35)", zIndex: 1 },
        { y: -22, z: -25, opacity: 0.3, filter: "grayscale(75%) brightness(0.5)", zIndex: 2 },
        { y: 6, z: 40, opacity: 1, filter: "brightness(1) contrast(1)", zIndex: 10 },
        { y: 32, z: -20, opacity: 0.3, filter: "grayscale(70%) brightness(0.5)", zIndex: 3 },
      ],
      3: [
        { y: -50, z: -70, opacity: 0.1, filter: "grayscale(100%) brightness(0.3)", zIndex: 1 },
        { y: -34, z: -45, opacity: 0.2, filter: "grayscale(85%) brightness(0.4)", zIndex: 2 },
        { y: -16, z: -15, opacity: 0.35, filter: "grayscale(70%) brightness(0.5)", zIndex: 3 },
        { y: 6, z: 40, opacity: 1, filter: "brightness(1) contrast(1)", zIndex: 10 },
      ],
    };

    // Mobile safe offsets without overflow clipping
    const mobileTransforms = {
      0: [
        { y: 0, z: 0, opacity: 1, filter: "none", zIndex: 10 },
        { y: 12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 3 },
        { y: 24, z: 0, opacity: 0.1, filter: "grayscale(100%)", zIndex: 2 },
        { y: 36, z: 0, opacity: 0, filter: "grayscale(100%)", zIndex: 1 },
      ],
      1: [
        { y: -12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 2 },
        { y: 0, z: 0, opacity: 1, filter: "none", zIndex: 10 },
        { y: 12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 3 },
        { y: 24, z: 0, opacity: 0.1, filter: "grayscale(100%)", zIndex: 1 },
      ],
      2: [
        { y: -24, z: 0, opacity: 0.1, filter: "grayscale(100%)", zIndex: 1 },
        { y: -12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 2 },
        { y: 0, z: 0, opacity: 1, filter: "none", zIndex: 10 },
        { y: 12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 3 },
      ],
      3: [
        { y: -36, z: 0, opacity: 0, filter: "grayscale(100%)", zIndex: 1 },
        { y: -24, z: 0, opacity: 0.1, filter: "grayscale(100%)", zIndex: 2 },
        { y: -12, z: 0, opacity: 0.25, filter: "grayscale(80%)", zIndex: 3 },
        { y: 0, z: 0, opacity: 1, filter: "none", zIndex: 10 },
      ],
    };

    const transforms = isMobile ? mobileTransforms : desktopTransforms;
    const config = transforms[activeStratum] || transforms[0];

    if (reduced) {
      planes.forEach((plane, i) => {
        if (!plane || !config[i]) return;
        const isActive = i === activeStratum;
        plane.style.transform = "none";
        plane.style.opacity = isActive ? "1" : "0";
        plane.style.zIndex = isActive ? "10" : "1";
        plane.style.pointerEvents = isActive ? "auto" : "none";
        plane.style.filter = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      planes.forEach((plane, i) => {
        if (!plane || !config[i]) return;
        const isActive = i === activeStratum;

        // Immediate z-index assignment ensures focused plane renders above background planes
        plane.style.zIndex = config[i].zIndex;
        plane.style.pointerEvents = isActive ? "auto" : "none";

        gsap.to(plane, {
          y: config[i].y,
          z: config[i].z,
          opacity: config[i].opacity,
          filter: config[i].filter,
          duration: DURATIONS.base,
          ease: EASINGS.standard,
          overwrite: "auto",
        });
      });

      // Micro stagger on active stratum capability items
      if (consolePanelRef.current) {
        const items = consolePanelRef.current.querySelectorAll(".strata-capability-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, x: -6 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              stagger: 0.04,
              ease: EASINGS.standard,
              overwrite: "auto",
            }
          );
        }
      }
    }, stageRef);

    return () => ctx.revert();
  }, [activeStratum, isMobileLayout]);

  // Keyboard navigation for desktop vertical tabs
  const handleKeyDownVertical = useCallback(
    (e, index) => {
      let nextIndex = null;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (index + 1) % STRATA.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (index - 1 + STRATA.length) % STRATA.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = STRATA.length - 1;
      }

      if (nextIndex !== null) {
        handleStratumSelect(nextIndex);
        if (tabRefs.current[nextIndex]) {
          tabRefs.current[nextIndex].focus();
        }
      }
    },
    [handleStratumSelect]
  );

  // Keyboard navigation for mobile horizontal tabs
  const handleKeyDownHorizontal = useCallback(
    (e, index) => {
      let nextIndex = null;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextIndex = (index + 1) % STRATA.length;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextIndex = (index - 1 + STRATA.length) % STRATA.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = STRATA.length - 1;
      }

      if (nextIndex !== null) {
        handleStratumSelect(nextIndex);
        if (mobileTabRefs.current[nextIndex]) {
          mobileTabRefs.current[nextIndex].focus();
        }
      }
    },
    [handleStratumSelect]
  );

  return (
    <section
      id="expertise"
      className="section capabilities-section"
      aria-label="Capacidades e Disciplinas da We Tech"
    >
      {/* Anchor alias for #capacidades */}
      <span id="capacidades" className="section-anchor-target" aria-hidden="true" />

      <div className="container container--wide">
        {/* Section Intro Header */}
        <div ref={intro.ref} className={`${intro.className} capabilities-intro`}>
          <div className="capabilities-eyebrow-wrap">
            <span className="eyebrow">Capacidades</span>
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
        <div
          className="capabilities-mobile-nav"
          role="tablist"
          aria-label="Selecionar Disciplina"
        >
          {STRATA.map((s, idx) => {
            const isActive = activeStratum === idx;
            return (
              <button
                key={s.id}
                ref={(el) => (mobileTabRefs.current[idx] = el)}
                id={`strata-mobile-tab-${s.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`strata-panel-${s.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`capabilities-mobile-tab ${isActive ? "active" : ""}`}
                onClick={() => handleStratumSelect(idx)}
                onKeyDown={(e) => handleKeyDownHorizontal(e, idx)}
              >
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
                <span className="strata-console-label">Camadas do produto</span>
                <span className="strata-console-coord">Visão integrada</span>
              </div>

              {/* Vertical Interactive Selector */}
              <div
                className="strata-selector-list"
                role="tablist"
                aria-orientation="vertical"
                aria-label="Selecionar disciplina da We Tech"
              >
                {STRATA.map((s, idx) => {
                  const isActive = activeStratum === idx;
                  return (
                    <button
                      key={s.id}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      id={`strata-tab-${s.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`strata-panel-${s.id}`}
                      tabIndex={isActive ? 0 : -1}
                      className={`strata-selector-btn ${isActive ? "active" : ""}`}
                      onClick={() => handleStratumSelect(idx)}
                      onKeyDown={(e) => handleKeyDownVertical(e, idx)}
                    >
                      <div className="strata-selector-left">
                        <div className="strata-selector-copy">
                          <span className="strata-selector-name">{s.label}</span>
                          <span className="strata-selector-tagline">{s.tagline}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Capabilities Panel for Active Stratum */}
              <div
                ref={consolePanelRef}
                id={`strata-panel-${current.id}`}
                className="strata-active-panel"
                role="tabpanel"
                aria-labelledby={`strata-tab-${current.id}`}
              >
                <div className="strata-active-header">
                  <span className="strata-active-status">
                    {current.statusBadge}
                  </span>
                  <span className="mono strata-active-count">
                    {current.capabilities.length} disciplinas
                  </span>
                </div>

                <p className="strata-active-desc">{current.description}</p>

                <ul className="strata-capabilities-list" aria-label={`Disciplinas de ${current.label}`}>
                  {current.capabilities.map((cap) => {
                    const isHovered = hoveredCapability === cap.focus;
                    return (
                      <li
                        key={cap.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isHovered}
                        aria-label={`Destacar ${cap.name} na visualização`}
                        className={`strata-capability-item ${isHovered ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredCapability(cap.focus)}
                        onMouseLeave={() => setHoveredCapability(null)}
                        onFocus={() => setHoveredCapability(cap.focus)}
                        onBlur={() => setHoveredCapability(null)}
                        onClick={() =>
                          setHoveredCapability((prev) => (prev === cap.focus ? null : cap.focus))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHoveredCapability((prev) => (prev === cap.focus ? null : cap.focus));
                          }
                        }}
                      >
                        <span className="strata-cap-name">{cap.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: Strata Stage — 2.5D Inspection Pallet (Cols 6–12) */}
          <div className="strata-stage-col">
            <div className="strata-stage" ref={stageRef} aria-label="Visualização em camadas do artefato">
              {/* Inspection Header Bar */}
              <div className="strata-stage-topbar">
                <div className="strata-stage-meta-left">
                  <span className="strata-topbar-title">
                    Visualização do artefato · {current.label}
                  </span>
                </div>
                <div className="strata-stage-meta-right">
                  <span className="strata-topbar-stratum">
                    Visão da camada
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
                  ref={addPlaneRef(0)}
                  className={`stratum-plane stratum-plane--product ${activeStratum === 0 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 0}
                >
                  <div className="stratum-plane-inner blueprint-grid">
                    <div className="stratum-plane-header">
                      <span className="plane-badge">Estrutura &amp; Escopo</span>
                      <span className="plane-coords">Mapeamento de requisitos</span>
                    </div>

                    <div className="blueprint-schematic">
                      <div
                        className={`blueprint-zone blueprint-zone--header ${hoveredCapability === "zone-scope" ? "zone-highlight" : ""}`}
                      >
                        <span className="zone-tag">Posicionamento de produto</span>
                        <div className="blueprint-wire-line" />
                      </div>

                      <div className="blueprint-body">
                        <div className="blueprint-zone blueprint-zone--main">
                          <span className="zone-tag">Hierarquia de informação</span>
                          <div
                            className={`blueprint-box-placeholder ${hoveredCapability === "zone-ux" ? "zone-highlight" : ""}`}
                          />
                          <div
                            className={`blueprint-vector-arrow ${hoveredCapability === "zone-flow" ? "zone-highlight" : ""}`}
                          >
                            <span className="vector-label">Fluxo do usuário ──►</span>
                          </div>
                        </div>

                        <div
                          className={`blueprint-zone blueprint-zone--sidebar ${hoveredCapability === "zone-proto" ? "zone-highlight" : ""}`}
                        >
                          <span className="zone-tag">Prioridades de entrega</span>
                          <div className="blueprint-wire-metric">
                            <span className="metric-calc">Escopo priorizado</span>
                            <span className="metric-calc">Critérios de decisão</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLANE 2: Experiência (High-Fidelity Render & Design Systems) */}
                <div
                  ref={addPlaneRef(1)}
                  className={`stratum-plane stratum-plane--design ${activeStratum === 1 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 1}
                >
                  <div className="stratum-plane-inner design-grid">
                    <div className="stratum-plane-header">
                      <span className="plane-badge">Interface &amp; Sistema Visual</span>
                      <span className="plane-coords">Referência de alta fidelidade</span>
                    </div>

                    <div className="design-interface-viewport">
                      <img
                        src="/img/projects/toro_token_web_site.webp"
                        alt="Interface do projeto TORO Platform usada como referência visual de alta fidelidade"
                        className={`strata-real-img ${["zone-tokens", "zone-ui", "zone-hifi", "zone-micro"].includes(hoveredCapability) ? "zone-highlight" : ""}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* PLANE 3: Engenharia (Engineering structure) */}
                <div
                  ref={addPlaneRef(2)}
                  className={`stratum-plane stratum-plane--engineering ${activeStratum === 2 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 2}
                >
                  <div className="stratum-plane-inner engineering-grid">
                    <div className="stratum-plane-header">
                      <span className="plane-badge">Engenharia &amp; Componentes</span>
                      <span className="plane-coords">Arquitetura estruturada</span>
                    </div>

                    <div className="engineering-schematic">
                      {/* Component Boundaries & Node Hierarchy */}
                      <div
                        className={`eng-node eng-node--header ${hoveredCapability === "zone-apps" ? "zone-highlight" : ""}`}
                      >
                        <span className="eng-node-tag">Estrutura base da aplicação</span>
                      </div>

                      <div className="eng-node-split">
                        <div
                          className={`eng-node eng-node--component ${hoveredCapability === "zone-frontend" ? "zone-highlight" : ""}`}
                        >
                          <span className="eng-node-tag">Módulos de conteúdo</span>
                          <span className="eng-metric">Fluxo de dados</span>
                        </div>

                        <div
                          className={`eng-node eng-node--component ${hoveredCapability === "zone-api" ? "zone-highlight" : ""}`}
                        >
                          <span className="eng-node-tag">Estado da interface</span>
                          <span className="eng-metric">Integração de APIs</span>
                        </div>
                      </div>

                      <div
                        className={`eng-footer-notes ${hoveredCapability === "zone-perf" ? "zone-highlight" : ""}`}
                      >
                        <span>Acessibilidade</span>
                        <span>Performance</span>
                        <span>Responsivo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PLANE 4: Evolução (Continuous Evolution & Convergence in Production) */}
                <div
                  ref={addPlaneRef(3)}
                  className={`stratum-plane stratum-plane--evolution ${activeStratum === 3 ? "plane-focused" : ""}`}
                  aria-hidden={activeStratum !== 3}
                >
                  <div className="stratum-plane-inner evolution-grid">
                    <div className="stratum-plane-header">
                      <span className="plane-badge">Ciclo Contínuo &amp; Evolução</span>
                      <span className="plane-coords">Continuidade do produto</span>
                    </div>

                    <div className="evolution-schematic">
                      {/* Split Metric Nodes */}
                      <div className="evo-node-split">
                        <div className={`evo-node ${hoveredCapability === "zone-deploy" ? "zone-highlight" : ""}`}>
                          <div className="evo-node-head">
                            <span className="evo-node-tag">Entrega assistida</span>
                          </div>
                          <p className="evo-node-desc">Documentação e acompanhamento pós-entrega</p>
                          <div className="evo-metric-row">
                            <span className="evo-metric-item">Build estruturado</span>
                            <span className="evo-metric-item">Revisão contínua</span>
                          </div>
                        </div>

                        <div className={`evo-node ${hoveredCapability === "zone-monitor" ? "zone-highlight" : ""}`}>
                          <div className="evo-node-head">
                            <span className="evo-node-tag">Revisão de performance</span>
                          </div>
                          <p className="evo-node-desc">Revisão de experiência e Core Web Vitals</p>
                          <div className="evo-metric-row">
                            <span className="evo-metric-item">Performance</span>
                            <span className="evo-metric-item">Acessibilidade</span>
                          </div>
                        </div>
                      </div>

                      {/* Convergence Banner Card */}
                      <div
                        className={`evolution-convergence-card ${["zone-scale", "zone-qa"].includes(hoveredCapability) ? "zone-highlight" : ""}`}
                      >
                        <span className="convergence-text">Disciplinas alinhadas do conceito à evolução</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage footer */}
              <div className="strata-stage-footer">
                <span className="strata-footer-text">
                  Produto · Design · Engenharia
                </span>
                <span className="strata-footer-status">
                  Visão do artefato
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Bridge to Section 03: Frentes */}
        <div className="strata-transition-bridge">
          <div className="strata-bridge-content">
            <span className="strata-bridge-eyebrow">Do conceito à execução</span>
            <p className="strata-bridge-text">
              Você conheceu as disciplinas fundamentais. Descubra agora como estruturamos nossas frentes de atuação.
            </p>
          </div>
          <a href="#fronts" className="strata-bridge-link" aria-label="Ver frentes de atuação da We Tech">
            <span>Conhecer as frentes</span>
            <BridgeFlowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
