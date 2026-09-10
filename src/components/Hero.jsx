import { useEffect, useRef, useState } from "react";
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
  const ctaBtnRef = useRef(null);
  const explodedWrapperRef = useRef(null);

  /* ---- Idea 1: Live Interactive Pipeline Simulation State ---- */
  const [simState, setSimState] = useState("idle"); // "idle" | "running" | "completed"
  const [metricCounter, setMetricCounter] = useState("+142.8%");
  const [reqsMetric, setReqsMetric] = useState("4.2k req/s");
  const [latencyMetric, setLatencyMetric] = useState("14ms");
  const [cacheMetric, setCacheMetric] = useState("Cache 98.4%");

  const handleRunSimulation = (e) => {
    e.stopPropagation();
    if (simState === "running") return;

    setFocusedLayer("top");
    setSimState("running");
    setMetricCounter("+178.5%");
    setLatencyMetric("11.8ms");

    setTimeout(() => {
      setMetricCounter("+224.0%");
      setReqsMetric("18.4k req/s");
    }, 500);

    setTimeout(() => {
      setMetricCounter("+265.8%");
      setLatencyMetric("2.1ms");
    }, 1100);

    setTimeout(() => {
      setMetricCounter("+294.2%");
      setCacheMetric("Cache 99.9%");
    }, 1700);

    setTimeout(() => {
      setSimState("completed");
    }, 2300);

    setTimeout(() => {
      setSimState((curr) => {
        if (curr === "completed") {
          setMetricCounter("+142.8%");
          setReqsMetric("4.2k req/s");
          setLatencyMetric("14ms");
          setCacheMetric("Cache 98.4%");
          return "idle";
        }
        return curr;
      });
    }, 8500);
  };

  const handleResetSimulation = (e) => {
    e.stopPropagation();
    setSimState("idle");
    setMetricCounter("+142.8%");
    setReqsMetric("4.2k req/s");
    setLatencyMetric("14ms");
    setCacheMetric("Cache 98.4%");
  };

  /* ---- Idea 1: Logic / Schema Simulation State (Middle Layer) ---- */
  const [logicSimState, setLogicSimState] = useState("idle"); // "idle" | "running" | "completed"
  const [logicOpsMetric, setLogicOpsMetric] = useState("28.4k");
  const [logicAuthMetric, setLogicAuthMetric] = useState("1.2ms");
  const [logicResolveMetric, setLogicResolveMetric] = useState("3.8ms");
  const [logicSyncMetric, setLogicSyncMetric] = useState("94% Sincronizado");

  const handleRunLogicSimulation = (e) => {
    e.stopPropagation();
    if (logicSimState === "running") return;

    setFocusedLayer("middle");
    setLogicSimState("running");
    setLogicOpsMetric("42.1k");
    setLogicAuthMetric("0.8ms");

    setTimeout(() => {
      setLogicOpsMetric("68.5k");
      setLogicResolveMetric("1.9ms");
      setLogicSyncMetric("98% Sincronizado");
    }, 500);

    setTimeout(() => {
      setLogicOpsMetric("94.2k");
      setLogicAuthMetric("0.4ms");
      setLogicResolveMetric("0.6ms");
    }, 1100);

    setTimeout(() => {
      setLogicSyncMetric("100% Sincronizado");
    }, 1700);

    setTimeout(() => {
      setLogicSimState("completed");
    }, 2300);

    setTimeout(() => {
      setLogicSimState((curr) => {
        if (curr === "completed") {
          setLogicOpsMetric("28.4k");
          setLogicAuthMetric("1.2ms");
          setLogicResolveMetric("3.8ms");
          setLogicSyncMetric("94% Sincronizado");
          return "idle";
        }
        return curr;
      });
    }, 8500);
  };

  const handleResetLogicSimulation = (e) => {
    e.stopPropagation();
    setLogicSimState("idle");
    setLogicOpsMetric("28.4k");
    setLogicAuthMetric("1.2ms");
    setLogicResolveMetric("3.8ms");
    setLogicSyncMetric("94% Sincronizado");
  };

  /* ---- Idea 1: Infra / Cluster Telemetry Simulation State (Bottom Layer) ---- */
  const [infraSimState, setInfraSimState] = useState("idle"); // "idle" | "running" | "completed"
  const [infraCpuMetric, setInfraCpuMetric] = useState("14%");
  const [infraBgpMetric, setInfraBgpMetric] = useState("8.4ms");
  const [infraEnvoyMetric, setInfraEnvoyMetric] = useState("0.8ms");
  const [infraLatMetric, setInfraLatMetric] = useState("0.02ms Latência");

  const handleRunInfraSimulation = (e) => {
    e.stopPropagation();
    if (infraSimState === "running") return;

    setFocusedLayer("bottom");
    setInfraSimState("running");
    setInfraCpuMetric("48%");
    setInfraBgpMetric("5.1ms");

    setTimeout(() => {
      setInfraCpuMetric("78%");
      setInfraEnvoyMetric("0.4ms");
      setInfraLatMetric("0.01ms Latência");
    }, 500);

    setTimeout(() => {
      setInfraCpuMetric("32%");
      setInfraBgpMetric("2.2ms");
      setInfraEnvoyMetric("0.15ms");
    }, 1100);

    setTimeout(() => {
      setInfraCpuMetric("18%");
      setInfraLatMetric("0.008ms Latência");
    }, 1700);

    setTimeout(() => {
      setInfraSimState("completed");
    }, 2300);

    setTimeout(() => {
      setInfraSimState((curr) => {
        if (curr === "completed") {
          setInfraCpuMetric("14%");
          setInfraBgpMetric("8.4ms");
          setInfraEnvoyMetric("0.8ms");
          setInfraLatMetric("0.02ms Latência");
          return "idle";
        }
        return curr;
      });
    }, 8500);
  };

  const handleResetInfraSimulation = (e) => {
    e.stopPropagation();
    setInfraSimState("idle");
    setInfraCpuMetric("14%");
    setInfraBgpMetric("8.4ms");
    setInfraEnvoyMetric("0.8ms");
    setInfraLatMetric("0.02ms Latência");
  };

  /* Layer focus for interactive 3D elevation */
  const [focusedLayer, setFocusedLayer] = useState("idle"); // "idle" | "top" | "middle" | "bottom"

  /* ---- Coordinated GSAP Editorial Entry Sequence ---- */
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

      if (stageRef.current) {
        gsap.set(stageRef.current, { opacity: 0, scale: 0.98 });
      }

      // 2. Coordinated Editorial Assembly Timeline
      const tl = gsap.timeline({
        defaults: { ease: EASINGS.standard },
        delay: 0.08,
      });

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

      // Stage reveal (entrance only — hover 3D tilt is 100% pure CSS)
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

      // 3. Scroll Seam Handover
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

      // 5. Scroll-Driven Explode — layers separate as the user scrolls
      // (no hover/click required; makes the effect visible on touch devices too)
      const explodeTrigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const wrapper = explodedWrapperRef.current;
          if (!wrapper) return;
          wrapper.classList.toggle("is-scroll-explode", self.progress > 0.04);
        },
      });

      return () => {
        replayTrigger.kill();
        explodeTrigger.kill();
      };
    }, el);

    return () => {
      ctx.revert();
      cleanupMagnetic();
    };
  }, []);

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
          role="region"
          aria-label="Arquitetura de Produto We Tech em camadas 3D"
        >
          {/* Subtle connection datum line bridging tension between text and object */}
          <div className="hero__datum-line" aria-hidden="true" />

          {/* 3D Perspective Wrapper: perspective: 1400px with Cursor Spotlight */}
          <div
            ref={explodedWrapperRef}
            className="hero-exploded-wrapper"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.removeProperty("--mouse-x");
              e.currentTarget.style.removeProperty("--mouse-y");
              setFocusedLayer("idle");
            }}
          >
            {/* Sombra de Solo Dinâmica (Ambient Contact Shadow) */}
            <div className="exploded-ground-shadow" aria-hidden="true" />

            {/* 3D Container: transform-style: preserve-3d */}
            <div className="hero-exploded-stage">

              {/* Feixes de Dados Verticais (Data Conduits entre as camadas) */}
              <div className="exploded-conduit exploded-conduit--left" aria-hidden="true">
                <span className="exploded-conduit-pulse" />
              </div>
              <div className="exploded-conduit exploded-conduit--center" aria-hidden="true">
                <span className="exploded-conduit-pulse" />
              </div>
              <div className="exploded-conduit exploded-conduit--right" aria-hidden="true">
                <span className="exploded-conduit-pulse" />
              </div>

              {/* =========================================================
                  CAMADA INFERIOR: Infra / Deploy (translateZ(0))
                  ========================================================= */}
              <div
                className={`exploded-layer exploded-layer--bottom ${focusedLayer === "bottom" || infraSimState !== "idle" ? "exploded-layer--elevated" : ""}`}
                onClick={() => setFocusedLayer("bottom")}
              >
                <div className="ea-spotlight-glow" aria-hidden="true" />
                <div
                  className="exploded-badge exploded-badge--infra"
                  onMouseEnter={() => setFocusedLayer("bottom")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedLayer("bottom");
                  }}
                  title="Clique para focar na camada de Infra"
                >
                  <span className="exploded-badge__dot exploded-badge__dot--infra" />
                  <span>Infra / Deploy</span>
                </div>

                <div className="ea-body-composite ea-body-composite--infra">
                  <div className="ea-main-plane ea-main-plane--infra">
                    <div className="ea-header-bar">
                      <div className="ea-brand-block">
                        <span className="ea-brand-dot ea-brand-dot--infra" />
                        <span className="ea-brand-name">WE TECH</span>
                        <span className="ea-brand-divider">/</span>
                        <span className="ea-brand-sub">INFRASTRUCTURE &amp; CLOUD DEPLOY</span>
                      </div>
                      <div className="ea-status-pill ea-status-pill--infra">
                        <span className="ea-status-dot ea-status-dot--infra" />
                        <span className="ea-status-text">K8S CLUSTER v1.30</span>
                      </div>
                    </div>

                    <div className="ea-workspace">
                      {/* Coluna 1: Compute Fleet */}
                      <div className="ea-core-canvas">
                        <div className="ea-zone-header">
                          <div className="ea-zone-title-wrap">
                            <span className="ea-zone-dot ea-zone-dot--infra" />
                            <span className="ea-zone-label">Compute Fleet</span>
                          </div>
                          <span className="ea-zone-tag">Bare-Metal Nodes</span>
                        </div>

                        <div className="ea-prod-canvas ea-prod-canvas--infra">
                          <div className="ea-prod-topbar ea-prod-topbar--infra">
                            <div className="ea-prod-route">
                              <span className="ea-prod-route-icon ea-prod-route-icon--infra" />
                              <span className="ea-prod-route-path">sa-east-1 / cluster-prod-01</span>
                            </div>
                            <span className="ea-prod-badge-active ea-prod-badge-active--infra">● 100% HEALTHY</span>
                          </div>

                          <div className="ea-prod-hero-stage ea-prod-hero-stage--infra">
                            <div className="ea-prod-stage-viewport">
                              <div className="ea-prod-stage-header">
                                <div>
                                  <h4 className="ea-prod-stage-title">Bare-Metal Node Pool</h4>
                                  <p className="ea-prod-stage-sub">AMD EPYC 9654 · 96 Cores / 192 Threads</p>
                                </div>
                                <div className={`ea-prod-metric-badge ea-prod-metric-badge--infra ${infraSimState !== "idle" ? "ea-prod-metric-badge--sim-boost-infra" : ""}`}>
                                  <span className="ea-prod-metric-val ea-prod-metric-val--infra">{infraCpuMetric}</span>
                                  <span className="ea-prod-metric-lbl">CPU LOAD</span>
                                </div>
                              </div>

                              <div className="ea-prod-chart-wrap">
                                <svg className="ea-prod-chart-svg" viewBox="0 0 320 64" fill="none" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id="eaInfraChartGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                                    </linearGradient>
                                  </defs>
                                  <line x1="0" y1="18" x2="320" y2="18" stroke="rgba(34,197,94,0.12)" strokeDasharray="3 3" />
                                  <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(34,197,94,0.12)" strokeDasharray="3 3" />
                                  <path d="M 0 50 Q 70 42 140 28 T 240 18 T 320 14 L 320 64 L 0 64 Z" fill="url(#eaInfraChartGrad)" />
                                  <path className={`ea-chart-infra-curve ${infraSimState !== "idle" ? "ea-chart-base-curve--sim-infra" : ""}`} d="M 0 50 Q 70 42 140 28 T 240 18 T 320 14" stroke="#22C55E" strokeWidth="2" fill="none" />
                                  <circle cx="140" cy="28" r="3" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
                                  <circle cx="240" cy="18" r="3" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
                                </svg>
                              </div>

                              <div className="ea-prod-action-unit">
                                <button
                                  type="button"
                                  id="btn-cluster-telemetry"
                                  className={`ea-prod-action-btn ea-prod-action-btn--infra ${infraSimState === "running" ? "ea-prod-action-btn--running" : ""} ${infraSimState === "completed" ? "ea-prod-action-btn--completed" : ""}`}
                                  onClick={handleRunInfraSimulation}
                                  title="Clique para executar a telemetria do cluster em tempo real"
                                >
                                  {infraSimState === "running" ? (
                                    <>
                                      <span className="ea-sim-spinner" />
                                      <span>Analisando Cluster...</span>
                                    </>
                                  ) : infraSimState === "completed" ? (
                                    <>
                                      <span className="ea-sim-check">✓</span>
                                      <span>Telemetria Sincronizada</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Cluster Telemetry</span>
                                      <ActionIcon className="ea-prod-action-icon" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="ea-prod-subgrid">
                            <div className="ea-prod-card ea-prod-card--infra">
                              <div className="ea-prod-card-head">
                                <span className="ea-prod-card-glyph ea-prod-card-glyph--ram" />
                                <span className="ea-prod-card-title">Memory ECC</span>
                                <span className="ea-prod-card-tag">64GB / 24%</span>
                              </div>
                              <div className="ea-prod-card-tokens">
                                <span className="ea-token-dot" style={{ background: "#22C55E" }} />
                                <span className="ea-token-dot" style={{ background: "#4ADE80" }} />
                                <span className="ea-token-dot" style={{ background: "#10B981" }} />
                                <span className="ea-token-bar" style={{ background: "rgba(34,197,94,0.25)" }} />
                              </div>
                            </div>

                            <div className="ea-prod-card ea-prod-card--infra">
                              <div className="ea-prod-card-head">
                                <span className="ea-prod-card-glyph ea-prod-card-glyph--disk" />
                                <span className="ea-prod-card-title">NVMe Storage</span>
                                <span className="ea-prod-card-tag">2.4 GB/s</span>
                              </div>
                              <div className="ea-prod-card-meter">
                                <div className="ea-prod-meter-track">
                                  <div className="ea-prod-meter-fill" style={{ width: "98%", background: "linear-gradient(90deg, #22C55E, #10B981)" }} />
                                </div>
                                <span className={`ea-prod-meter-text ${infraSimState !== "idle" ? "ea-sys-metric--sim-infra" : ""}`}>{infraLatMetric}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ea-workspace-divider" />

                      {/* Coluna 2: Edge Ingress */}
                      <div className="ea-side-module">
                        <div className="ea-zone-header">
                          <div className="ea-zone-title-wrap">
                            <span className="ea-zone-dot ea-zone-dot--infra" />
                            <span className="ea-zone-label">Edge Ingress</span>
                          </div>
                          <span className="ea-zone-tag">Anycast &amp; Mesh</span>
                        </div>

                        <div className="ea-sys-flow ea-sys-flow--infra">
                          <div className="ea-sys-node ea-sys-node--infra">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--infra">01</span>
                              <span className="ea-sys-step-name">BGP ANYCAST &amp; DDOS</span>
                              <span className="ea-sys-badge-live ea-sys-badge-live--infra">EDGE</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <span className="ea-sys-chip">280+ PoPs</span>
                              <span className="ea-sys-chip">TLS 1.3 0-RTT</span>
                              <span className={`ea-sys-metric ${infraSimState !== "idle" ? "ea-sys-metric--sim-infra" : ""}`}>{infraBgpMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow" style={{ color: "#22C55E" }}>↓</span>
                          </div>

                          <div className="ea-sys-node ea-sys-node--core ea-sys-node--core-infra">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--infra">02</span>
                              <span className="ea-sys-step-name">INGRESS &amp; ENVOY PROXY</span>
                              <span className="ea-sys-badge-engine ea-sys-badge-engine--infra">MESH</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <div className="ea-sys-services">
                                <span className="ea-sys-service-dot active" style={{ background: "#22C55E" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#22C55E" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#22C55E" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#22C55E" }} />
                              </div>
                              <span className="ea-sys-engine-text">Zero-Trust Routing</span>
                              <span className={`ea-sys-metric ${infraSimState !== "idle" ? "ea-sys-metric--sim-infra" : ""}`}>{infraEnvoyMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow" style={{ color: "#22C55E" }}>↓</span>
                          </div>

                          <div className="ea-sys-node ea-sys-node--infra">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--infra">03</span>
                              <span className="ea-sys-step-name">OBJECT STORE &amp; KV</span>
                              <span className="ea-sys-badge-sync ea-sys-badge-sync--infra">REPLICATED</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <span className="ea-sys-chip">Multi-Region S3</span>
                              <span className="ea-sys-chip ea-sys-chip--infra">11 9s Durab.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`ea-datum-strip ea-datum-strip--infra ${infraSimState !== "idle" ? "ea-datum-strip--sim ea-datum-strip--sim-infra" : ""}`} aria-hidden="true">
                      {infraSimState === "idle" ? (
                        <>
                          <div className="ea-datum-meta">
                            <span className="ea-datum-key">INFRASTRUCTURE:</span>
                            <span className="ea-datum-val" style={{ color: "#22C55E" }}>OPTIMAL · GLOBAL LATENCY P50: 16ms</span>
                          </div>
                          <div className="ea-datum-ticks">
                            <span className="ea-datum-tick" style={{ background: "rgba(34,197,94,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(34,197,94,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(34,197,94,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(34,197,94,0.3)" }} />
                          </div>
                        </>
                      ) : (
                        <div className="ea-sim-banner-content">
                          <span
                            className={`ea-sim-banner-dot ${infraSimState === "completed" ? "ea-sim-banner-dot--success" : ""}`}
                            style={{
                              background: infraSimState === "completed" ? "#00E575" : "#22C55E",
                              boxShadow: infraSimState === "completed" ? "0 0 8px #00E575" : "0 0 8px #22C55E"
                            }}
                          />
                          <span className="ea-sim-banner-text">
                            {infraSimState === "running"
                              ? "TELEMETRIA EM TEMPO REAL · REBALANCEANDO 192 THREADS & MESH DE ENVOY..."
                              : "✓ K8S CLUSTER SAUDÁVEL · 0 PACKET DROP · LATÊNCIA P99: 0.15MS · 18% LOAD"}
                          </span>
                          {infraSimState === "completed" && (
                            <button
                              type="button"
                              className="ea-sim-replay-btn ea-sim-replay-btn--infra"
                              onClick={handleResetInfraSimulation}
                              title="Reiniciar telemetria de cluster"
                            >
                              ↺ Reset
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Extension block: Deploy */}
                  <div className="ea-extension-block ea-extension-block--infra" aria-hidden="true">
                    <div className="ea-zone-header ea-zone-header--ext">
                      <div className="ea-zone-title-wrap">
                        <span className="ea-zone-dot" style={{ background: "#22C55E" }} />
                        <span className="ea-zone-label ea-zone-label--ext">Deploy</span>
                      </div>
                      <span className="ea-zone-tag">GitOps CI/CD</span>
                    </div>

                    <div className="ea-evo-timeline">
                      <div className="ea-evo-card ea-evo-card--base">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot" style={{ background: "#22C55E" }} />
                          <span>COMMIT #7F39B2</span>
                          <span className="ea-evo-status-tag" style={{ color: "#22C55E" }}>PASS</span>
                        </div>
                        <h5 className="ea-evo-card-title">Automated Tests · Pass</h5>
                        <p className="ea-evo-card-desc">412/412 testes de integração validados com sucesso.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">412 Tests</span>
                          <span className="ea-evo-chip">CI Green</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow" style={{ color: "#22C55E" }}>↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--scale">
                        <div className="ea-evo-card-badge ea-evo-card-badge--infra">
                          <span className="ea-evo-milestone-dot active" style={{ background: "#22C55E" }} />
                          <span>TERRAFORM CLOUD</span>
                          <span className="ea-evo-status-tag" style={{ color: "#22C55E", borderColor: "rgba(34,197,94,0.3)" }}>APPLIED</span>
                        </div>
                        <h5 className="ea-evo-card-title">Infra-as-Code · Synced</h5>
                        <p className="ea-evo-card-desc">0 to add, 0 to change, 0 to destroy em produção.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">K8s v1.30</span>
                          <span className="ea-evo-chip">GitOps</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow" style={{ color: "#22C55E" }}>↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--extend">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot ghost" style={{ borderColor: "#22C55E" }} />
                          <span>ROLLING UPDATE</span>
                          <span className="ea-evo-status-tag" style={{ color: "rgba(255,255,255,0.4)" }}>LIVE</span>
                        </div>
                        <h5 className="ea-evo-card-title">Zero-Downtime Rollout</h5>
                        <p className="ea-evo-card-desc">100% tráfego roteado para a nova versão estável.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">Canary 100%</span>
                          <span className="ea-evo-chip">0 Drop</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  CAMADA DO MEIO: Lógica / Componentes (translateZ(70px))
                  ========================================================= */}
              <div
                className={`exploded-layer exploded-layer--middle ${focusedLayer === "middle" || logicSimState !== "idle" ? "exploded-layer--elevated" : ""}`}
                onClick={() => setFocusedLayer("middle")}
              >
                <div className="ea-spotlight-glow" aria-hidden="true" />
                <div
                  className="exploded-badge exploded-badge--logic"
                  onMouseEnter={() => setFocusedLayer("middle")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedLayer("middle");
                  }}
                  title="Clique para focar na camada de Lógica"
                >
                  <span className="exploded-badge__dot exploded-badge__dot--logic" />
                  <span>Lógica / Componentes</span>
                </div>

                <div className="ea-body-composite ea-body-composite--logic">
                  <div className="ea-main-plane ea-main-plane--logic">
                    <div className="ea-header-bar">
                      <div className="ea-brand-block">
                        <span className="ea-brand-dot ea-brand-dot--logic" />
                        <span className="ea-brand-name">WE TECH</span>
                        <span className="ea-brand-divider">/</span>
                        <span className="ea-brand-sub">LOGIC &amp; STATE ARCHITECTURE</span>
                      </div>
                      <div className="ea-status-pill ea-status-pill--logic">
                        <span className="ea-status-dot ea-status-dot--logic" />
                        <span className="ea-status-text">ACTOR MODEL v2.4</span>
                      </div>
                    </div>

                    <div className="ea-workspace">
                      {/* Coluna 1: State Engine */}
                      <div className="ea-core-canvas">
                        <div className="ea-zone-header">
                          <div className="ea-zone-title-wrap">
                            <span className="ea-zone-dot ea-zone-dot--logic" />
                            <span className="ea-zone-label">State Engine</span>
                          </div>
                          <span className="ea-zone-tag">Distributed Store</span>
                        </div>

                        <div className="ea-prod-canvas ea-prod-canvas--logic">
                          <div className="ea-prod-topbar ea-prod-topbar--logic">
                            <div className="ea-prod-route">
                              <span className="ea-prod-route-icon ea-prod-route-icon--logic" />
                              <span className="ea-prod-route-path">/kernel/state-orchestrator</span>
                            </div>
                            <span className="ea-prod-badge-active ea-prod-badge-active--logic">● REPLICATED SYNC</span>
                          </div>

                          <div className="ea-prod-hero-stage ea-prod-hero-stage--logic">
                            <div className="ea-prod-stage-viewport">
                              <div className="ea-prod-stage-header">
                                <div>
                                  <h4 className="ea-prod-stage-title">State Graph &amp; Event Delta</h4>
                                  <p className="ea-prod-stage-sub">Zero-Latency Hydration · Async Bus</p>
                                </div>
                                <div className={`ea-prod-metric-badge ea-prod-metric-badge--logic ${logicSimState !== "idle" ? "ea-prod-metric-badge--sim-boost-logic" : ""}`}>
                                  <span className="ea-prod-metric-val ea-prod-metric-val--logic">{logicOpsMetric}</span>
                                  <span className="ea-prod-metric-lbl">OPS/SEC</span>
                                </div>
                              </div>

                              <div className="ea-prod-chart-wrap">
                                <svg className="ea-prod-chart-svg" viewBox="0 0 320 64" fill="none" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id="eaLogicChartGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                                    </linearGradient>
                                  </defs>
                                  <line x1="0" y1="18" x2="320" y2="18" stroke="rgba(56,189,248,0.12)" strokeDasharray="3 3" />
                                  <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(56,189,248,0.12)" strokeDasharray="3 3" />
                                  <path d="M 0 45 L 50 32 L 100 48 L 150 18 L 210 28 L 260 12 L 320 8 L 320 64 L 0 64 Z" fill="url(#eaLogicChartGrad)" />
                                  <path className={`ea-chart-logic-curve ${logicSimState !== "idle" ? "ea-chart-base-curve--sim-logic" : ""}`} d="M 0 45 L 50 32 L 100 48 L 150 18 L 210 28 L 260 12 L 320 8" stroke="#38BDF8" strokeWidth="2" fill="none" />
                                  <circle cx="150" cy="18" r="3" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" />
                                  <circle cx="260" cy="12" r="3" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" />
                                </svg>
                              </div>

                              <div className="ea-prod-action-unit">
                                <button
                                  type="button"
                                  id="btn-inspect-schema"
                                  className={`ea-prod-action-btn ea-prod-action-btn--logic ${logicSimState === "running" ? "ea-prod-action-btn--running" : ""} ${logicSimState === "completed" ? "ea-prod-action-btn--completed" : ""}`}
                                  onClick={handleRunLogicSimulation}
                                  title="Clique para inspecionar e validar os schemas em tempo real"
                                >
                                  {logicSimState === "running" ? (
                                    <>
                                      <span className="ea-sim-spinner" />
                                      <span>Validando Schemas...</span>
                                    </>
                                  ) : logicSimState === "completed" ? (
                                    <>
                                      <span className="ea-sim-check">✓</span>
                                      <span>Schema Validado</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Inspect Schema</span>
                                      <ActionIcon className="ea-prod-action-icon" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="ea-prod-subgrid">
                            <div className="ea-prod-card ea-prod-card--logic">
                              <div className="ea-prod-card-head">
                                <span className="ea-prod-card-glyph ea-prod-card-glyph--cache" />
                                <span className="ea-prod-card-title">Redis Cluster</span>
                                <span className="ea-prod-card-tag">0.4ms P99</span>
                              </div>
                              <div className="ea-prod-card-tokens">
                                <span className="ea-token-dot" style={{ background: "#38BDF8" }} />
                                <span className="ea-token-dot" style={{ background: "#60A5FA" }} />
                                <span className="ea-token-dot" style={{ background: "#818CF8" }} />
                                <span className="ea-token-bar" style={{ background: "rgba(56,189,248,0.25)" }} />
                              </div>
                            </div>

                            <div className="ea-prod-card ea-prod-card--logic">
                              <div className="ea-prod-card-head">
                                <span className="ea-prod-card-glyph ea-prod-card-glyph--workers" />
                                <span className="ea-prod-card-title">Worker Pool</span>
                                <span className="ea-prod-card-tag">8 THREADS</span>
                              </div>
                              <div className="ea-prod-card-meter">
                                <div className="ea-prod-meter-track">
                                  <div className="ea-prod-meter-fill" style={{ width: "94%", background: "linear-gradient(90deg, #38BDF8, #818CF8)" }} />
                                </div>
                                <span className={`ea-prod-meter-text ${logicSimState !== "idle" ? "ea-sys-metric--sim-logic" : ""}`}>{logicSyncMetric}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ea-workspace-divider" />

                      {/* Coluna 2: API Pipeline */}
                      <div className="ea-side-module">
                        <div className="ea-zone-header">
                          <div className="ea-zone-title-wrap">
                            <span className="ea-zone-dot ea-zone-dot--logic" />
                            <span className="ea-zone-label">API Gateway</span>
                          </div>
                          <span className="ea-zone-tag">Resolvers &amp; RPC</span>
                        </div>

                        <div className="ea-sys-flow ea-sys-flow--logic">
                          <div className="ea-sys-node ea-sys-node--logic">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--logic">01</span>
                              <span className="ea-sys-step-name">AUTH &amp; TOKEN VALIDATION</span>
                              <span className="ea-sys-badge-live ea-sys-badge-live--logic">JWT</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <span className="ea-sys-chip">OAuth 2.1</span>
                              <span className="ea-sys-chip">Ed25519</span>
                              <span className={`ea-sys-metric ${logicSimState !== "idle" ? "ea-sys-metric--sim-logic" : ""}`}>{logicAuthMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow" style={{ color: "#38BDF8" }}>↓</span>
                          </div>

                          <div className="ea-sys-node ea-sys-node--core ea-sys-node--core-logic">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--logic">02</span>
                              <span className="ea-sys-step-name">QUERY RESOLVER &amp; MERGE</span>
                              <span className="ea-sys-badge-engine ea-sys-badge-engine--logic">SCHEMA</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <div className="ea-sys-services">
                                <span className="ea-sys-service-dot active" style={{ background: "#38BDF8" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#38BDF8" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#38BDF8" }} />
                                <span className="ea-sys-service-dot active" style={{ background: "#38BDF8" }} />
                              </div>
                              <span className="ea-sys-engine-text">Federated Subgraphs</span>
                              <span className={`ea-sys-metric ${logicSimState !== "idle" ? "ea-sys-metric--sim-logic" : ""}`}>{logicResolveMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow" style={{ color: "#38BDF8" }}>↓</span>
                          </div>

                          <div className="ea-sys-node ea-sys-node--logic">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num ea-sys-step-num--logic">03</span>
                              <span className="ea-sys-step-name">EVENT EMITTER &amp; BROKER</span>
                              <span className="ea-sys-badge-sync ea-sys-badge-sync--logic">KAFKA</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <span className="ea-sys-chip">8 Partições</span>
                              <span className="ea-sys-chip ea-sys-chip--logic">Zero-Drop ACK</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`ea-datum-strip ea-datum-strip--logic ${logicSimState !== "idle" ? "ea-datum-strip--sim ea-datum-strip--sim-logic" : ""}`} aria-hidden="true">
                      {logicSimState === "idle" ? (
                        <>
                          <div className="ea-datum-meta">
                            <span className="ea-datum-key">LOGIC KERNEL:</span>
                            <span className="ea-datum-val" style={{ color: "#38BDF8" }}>ALL 32 SERVICES HEALTHY · 0 EXCEPTIONS</span>
                          </div>
                          <div className="ea-datum-ticks">
                            <span className="ea-datum-tick" style={{ background: "rgba(56,189,248,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(56,189,248,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(56,189,248,0.3)" }} />
                            <span className="ea-datum-tick" style={{ background: "rgba(56,189,248,0.3)" }} />
                          </div>
                        </>
                      ) : (
                        <div className="ea-sim-banner-content">
                          <span
                            className={`ea-sim-banner-dot ${logicSimState === "completed" ? "ea-sim-banner-dot--success" : ""}`}
                            style={{
                              background: logicSimState === "completed" ? "#00E575" : "#38BDF8",
                              boxShadow: logicSimState === "completed" ? "0 0 8px #00E575" : "0 0 8px #38BDF8"
                            }}
                          />
                          <span className="ea-sim-banner-text">
                            {logicSimState === "running"
                              ? "VALIDANDO SCHEMAS · COMPILANDO AST & RESOLVENDO SUBGRAFOS FEDERADOS..."
                              : "✓ SCHEMA VALIDADO · ZERO CONFLITOS · 94.2K OPS/SEC · GRAFO RESIDUAL 0.6MS"}
                          </span>
                          {logicSimState === "completed" && (
                            <button
                              type="button"
                              className="ea-sim-replay-btn"
                              onClick={handleResetLogicSimulation}
                              title="Reiniciar inspeção de schema"
                            >
                              ↺ Reset
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Extension block: Componentes */}
                  <div className="ea-extension-block ea-extension-block--logic" aria-hidden="true">
                    <div className="ea-zone-header ea-zone-header--ext">
                      <div className="ea-zone-title-wrap">
                        <span className="ea-zone-dot" style={{ background: "#38BDF8" }} />
                        <span className="ea-zone-label ea-zone-label--ext">Componentes</span>
                      </div>
                      <span className="ea-zone-tag">Tree Graph</span>
                    </div>

                    <div className="ea-evo-timeline">
                      <div className="ea-evo-card ea-evo-card--base">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot" style={{ background: "#38BDF8" }} />
                          <span>NODE 01 · PROVIDER</span>
                          <span className="ea-evo-status-tag" style={{ color: "#38BDF8" }}>INIT</span>
                        </div>
                        <h5 className="ea-evo-card-title">&lt;RootContext /&gt;</h5>
                        <p className="ea-evo-card-desc">Injeção de dependências, auth tokens e telemetria.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">Context API</span>
                          <span className="ea-evo-chip">DI Container</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow" style={{ color: "#38BDF8" }}>↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--scale">
                        <div className="ea-evo-card-badge ea-evo-card-badge--logic">
                          <span className="ea-evo-milestone-dot active" style={{ background: "#38BDF8" }} />
                          <span>NODE 02 · PIPELINE</span>
                          <span className="ea-evo-status-tag" style={{ color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)" }}>SYNC</span>
                        </div>
                        <h5 className="ea-evo-card-title">&lt;StateOrchestrator /&gt;</h5>
                        <p className="ea-evo-card-desc">Processamento reativo, batching e sync assíncrono.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">Zustand Store</span>
                          <span className="ea-evo-chip">Immer Patch</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow" style={{ color: "#38BDF8" }}>↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--extend">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot ghost" style={{ borderColor: "#38BDF8" }} />
                          <span>NODE 03 · BRIDGE</span>
                          <span className="ea-evo-status-tag" style={{ color: "rgba(255,255,255,0.4)" }}>DUPLEX</span>
                        </div>
                        <h5 className="ea-evo-card-title">&lt;WebSocketBridge /&gt;</h5>
                        <p className="ea-evo-card-desc">Streaming duplex de eventos com fallback SSE.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">SSE Stream</span>
                          <span className="ea-evo-chip">WS Heartbeat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  CAMADA SUPERIOR: UI / Interface (translateZ(140px))
                  Exatamente o Dashboard Real de image_0.png
                  ========================================================= */}
              <div
                className={`exploded-layer exploded-layer--top ${focusedLayer === "top" || simState !== "idle" ? "exploded-layer--elevated" : ""}`}
                onClick={() => setFocusedLayer("top")}
              >
                <div className="ea-spotlight-glow" aria-hidden="true" />
                <div className="exploded-glass-sheen" aria-hidden="true" />
                <div
                  className="exploded-badge exploded-badge--ui"
                  onMouseEnter={() => setFocusedLayer("top")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedLayer("top");
                  }}
                  title="Clique para focar na camada de UI"
                >
                  <span className="exploded-badge__dot exploded-badge__dot--ui" />
                  <span>UI / Interface</span>
                </div>

                <div className="ea-body-composite">
                  <div className="ea-main-plane">
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
                          <div className="ea-prod-topbar">
                            <div className="ea-prod-route">
                              <span className="ea-prod-route-icon" />
                              <span className="ea-prod-route-path">/app/growth-engine</span>
                            </div>
                            <span className="ea-prod-badge-active">
                              <span className="ea-uptime-pulse-dot" />
                              <span>99.98% UPTIME</span>
                            </span>
                          </div>

                          <div className="ea-prod-hero-stage">
                            <div className="ea-prod-stage-viewport">
                              <div className="ea-prod-stage-header">
                                <div>
                                  <h4 className="ea-prod-stage-title">Engine de Conversão</h4>
                                  <p className="ea-prod-stage-sub">Fluxo unificado · Latência: {latencyMetric}</p>
                                </div>
                                <div className={`ea-prod-metric-badge ${simState !== "idle" ? "ea-prod-metric-badge--sim-boost" : ""}`}>
                                  <span className="ea-prod-metric-val">{metricCounter}</span>
                                  <span className="ea-prod-metric-lbl">CRESCIMENTO</span>
                                </div>
                              </div>

                              <div className="ea-prod-chart-wrap">
                                <svg className="ea-prod-chart-svg" viewBox="0 0 320 64" fill="none" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id="eaChartGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.25" />
                                      <stop offset="100%" stopColor="#FF5A00" stopOpacity="0.0" />
                                    </linearGradient>
                                    <linearGradient id="eaChartBeamGrad" x1="0" y1="0" x2="1" y2="0">
                                      <stop offset="0%" stopColor="#FF5A00" stopOpacity="0" />
                                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                      <stop offset="100%" stopColor="#FF5A00" stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                  <line x1="0" y1="18" x2="320" y2="18" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                                  <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                                  <path d="M 0 54 Q 60 50 110 38 T 210 20 T 280 8 L 320 4 L 320 64 L 0 64 Z" fill="url(#eaChartGrad)" />
                                  <path className={`ea-chart-base-curve ${simState !== "idle" ? "ea-chart-base-curve--sim" : ""}`} d="M 0 54 Q 60 50 110 38 T 210 20 T 280 8 L 320 4" stroke="#FF5A00" strokeWidth="2" fill="none" />
                                  <path className="ea-chart-beam-curve" d="M 0 54 Q 60 50 110 38 T 210 20 T 280 8 L 320 4" stroke="url(#eaChartBeamGrad)" strokeWidth="2.5" fill="none" />
                                  <circle cx="210" cy="20" r="3" fill="#FFFFFF" stroke="#FF5A00" strokeWidth="1.5" />
                                  <circle cx="280" cy="8" r="8" className="ea-chart-ping-ring" fill="rgba(255, 90, 0, 0.3)" />
                                  <circle cx="280" cy="8" r="3.5" className="ea-chart-active-dot" fill="#FFFFFF" stroke="#FF5A00" strokeWidth="1.8" />
                                </svg>
                              </div>

                              <div className="ea-prod-action-unit">
                                <button
                                  type="button"
                                  id="btn-explorar-fluxo"
                                  className={`ea-prod-action-btn ea-prod-action-btn--primary ${simState === "running" ? "ea-prod-action-btn--running" : ""} ${simState === "completed" ? "ea-prod-action-btn--completed" : ""}`}
                                  onClick={handleRunSimulation}
                                  title="Clique para simular o pipeline em tempo real"
                                >
                                  {simState === "running" ? (
                                    <>
                                      <span className="ea-sim-spinner" />
                                      <span>Otimizando Pipeline...</span>
                                    </>
                                  ) : simState === "completed" ? (
                                    <>
                                      <span className="ea-sim-check">✓</span>
                                      <span>Fluxo Otimizado</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Explorar Fluxo</span>
                                      <ActionIcon className="ea-prod-action-icon" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="ea-prod-subgrid">
                            <div className="ea-prod-card">
                              <div className="ea-prod-card-head">
                                <span className="ea-prod-card-glyph ea-prod-card-glyph--tokens" />
                                <span className="ea-prod-card-title">Design System</span>
                                <span className="ea-prod-card-tag">36 TOKENS</span>
                              </div>
                              <div className="ea-prod-card-tokens">
                                <span className="ea-token-dot" style={{ background: "#FF5A00" }} />
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
                              <span className={`ea-sys-metric ${simState !== "idle" ? "ea-sys-metric--sim" : ""}`}>{reqsMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow">↓</span>
                          </div>

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
                              <span className={`ea-sys-metric ${simState !== "idle" ? "ea-sys-metric--sim" : ""}`}>{latencyMetric}</span>
                            </div>
                          </div>

                          <div className="ea-sys-link">
                            <span className="ea-sys-link-line" />
                            <span className="ea-sys-link-arrow">↓</span>
                          </div>

                          <div className="ea-sys-node ea-sys-node--output">
                            <div className="ea-sys-node-head">
                              <span className="ea-sys-step-num">03</span>
                              <span className="ea-sys-step-name">DISTRIBUIÇÃO &amp; EDGE</span>
                              <span className="ea-sys-badge-sync">SYNC</span>
                            </div>
                            <div className="ea-sys-node-body">
                              <span className="ea-sys-chip">12 Regiões CDN</span>
                              <span className={`ea-sys-chip ea-sys-chip--accent ${simState !== "idle" ? "ea-sys-chip--sim" : ""}`}>{cacheMetric}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Structural rhythm strip / Live Simulation Diagnostic */}
                    <div className={`ea-datum-strip ${simState !== "idle" ? "ea-datum-strip--sim" : ""}`} aria-hidden="true">
                      {simState === "idle" ? (
                        <>
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
                        </>
                      ) : (
                        <div className="ea-sim-banner-content">
                          <span className={`ea-sim-banner-dot ${simState === "completed" ? "ea-sim-banner-dot--success" : ""}`} />
                          <span className="ea-sim-banner-text">
                            {simState === "running"
                              ? "SIMULANDO FLUXO · DISPARANDO REQUISIÇÕES & OTIMIZANDO LATÊNCIA..."
                              : "✓ PIPELINE OTIMIZADO · LATÊNCIA 2.1MS · 0 FALHAS · PRONTO PARA ESCALA"}
                          </span>
                          {simState === "completed" && (
                            <button
                              type="button"
                              className="ea-sim-replay-btn"
                              onClick={handleResetSimulation}
                              title="Reiniciar simulação"
                            >
                              ↺ Reset
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* COLUNA 3: EVOLUÇÃO (Linha do Tempo / Escala Modular) */}
                  <div className="ea-extension-block" aria-hidden="true">
                    <div className="ea-zone-header ea-zone-header--ext">
                      <div className="ea-zone-title-wrap">
                        <span className="ea-zone-dot ea-zone-dot--evo" />
                        <span className="ea-zone-label ea-zone-label--ext">Evolução</span>
                      </div>
                      <span className="ea-zone-tag">Roadmap</span>
                    </div>

                    <div className="ea-evo-timeline">
                      <div className="ea-evo-card ea-evo-card--base">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot" />
                          <span>FASE 01 · BASE</span>
                          <span className="ea-evo-status-tag">CONCLUÍDO</span>
                        </div>
                        <h5 className="ea-evo-card-title">Estrutura Core &amp; Tokens</h5>
                        <p className="ea-evo-card-desc">Arquitetura base, componentes de UI e runtime configurado.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">Design System</span>
                          <span className="ea-evo-chip">Tokens v1</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow">↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--scale">
                        <div className="ea-evo-card-badge ea-evo-card-badge--accent">
                          <span className="ea-evo-milestone-dot active" />
                          <span>FASE 02 · ESCALA ATIVA</span>
                          <span className="ea-evo-status-tag ea-evo-status-tag--active">PRODUÇÃO</span>
                        </div>
                        <h5 className="ea-evo-card-title">Módulos &amp; Performance</h5>
                        <p className="ea-evo-card-desc">Caching distribuído, novas rotas e +300% de capacidade.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip ea-evo-chip--active">Edge Caching</span>
                          <span className="ea-evo-chip ea-evo-chip--active">+300% Cap</span>
                        </div>
                      </div>

                      <div className="ea-evo-link">
                        <span className="ea-evo-link-line" />
                        <span className="ea-evo-link-arrow">↓</span>
                        <span className="ea-evo-link-line" />
                      </div>

                      <div className="ea-evo-card ea-evo-card--extend">
                        <div className="ea-evo-card-badge">
                          <span className="ea-evo-milestone-dot ghost" />
                          <span>FASE 03 · EXPANSÃO</span>
                          <span className="ea-evo-status-tag">ROADMAP</span>
                        </div>
                        <h5 className="ea-evo-card-title">Ecossistema &amp; IA</h5>
                        <p className="ea-evo-card-desc">Automações avançadas e expansão multi-regional contínua.</p>
                        <div className="ea-evo-chips">
                          <span className="ea-evo-chip">AI Ops</span>
                          <span className="ea-evo-chip">Multi-Region</span>
                        </div>
                      </div>
                    </div>
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
