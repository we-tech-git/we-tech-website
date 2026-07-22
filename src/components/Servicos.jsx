import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { tech, perf, waLink } from "../data.js";

function segStyle(active) {
  return {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 13.5,
    fontWeight: 600,
    whiteSpace: "nowrap",
    background: active ? "#C87D2F" : "transparent",
    color: active ? "#0F1B2D" : "rgba(240,244,248,0.72)",
  };
}

function blockStyle(dim, sel, accent) {
  return {
    background: "#1E293B",
    border: `1px solid ${sel ? accent : "rgba(240,244,248,0.09)"}`,
    boxShadow: sel ? `0 0 0 3px ${accent}22` : "none",
    padding: 34,
    display: "flex",
    flexDirection: "column",
    opacity: dim ? 0.4 : 1,
    filter: dim ? "saturate(0.35)" : "none",
    transition:
      "opacity .35s ease, filter .35s ease, border-color .35s ease, box-shadow .35s ease",
  };
}

function ctaStyle(accent, dim, both) {
  return {
    marginTop: "auto",
    paddingTop: 22,
    display: both ? "none" : "inline-flex",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    textDecoration: "none",
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    fontWeight: 700,
    color: accent,
    opacity: dim ? 0.5 : 1,
  };
}

export default function Servicos() {
  const [mode, setMode] = useState("both"); // 'tech' | 'both' | 'perf'
  const intro = useReveal();

  const selTech = mode === "tech";
  const selPerf = mode === "perf";
  const both = mode === "both";
  const dimTech = mode === "perf";
  const dimPerf = mode === "tech";

  return (
    <section id="servicos" style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 28px" }}>
      <div
        ref={intro.ref}
        className={intro.className}
        style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}
      >
        <h2
          style={{
            fontSize: 38,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            margin: "0 0 14px",
          }}
        >
          Duas frentes. Um time só.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(240,244,248,0.62)", margin: 0 }}>
          Contrate os dois integrados — ou só o que você precisa agora. Você
          escolhe o ponto de partida.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", margin: "0 0 32px" }}>
        <div
          style={{
            display: "inline-flex",
            gap: 4,
            padding: 5,
            background: "#152238",
            border: "1px solid rgba(240,244,248,0.09)",
            borderRadius: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button className="seg-btn" style={segStyle(selTech)} onClick={() => setMode("tech")}>
            Só Tech
          </button>
          <button className="seg-btn" style={segStyle(both)} onClick={() => setMode("both")}>
            Ambos · integrado
          </button>
          <button className="seg-btn" style={segStyle(selPerf)} onClick={() => setMode("perf")}>
            Só Performance
          </button>
        </div>
      </div>

      <div
        className="servicos-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 0,
          alignItems: "stretch",
        }}
      >
        {/* TECH */}
        <div style={{ ...blockStyle(dimTech, selTech, "#3D5A80"), borderRadius: "14px 0 0 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(61,90,128,0.28)",
                display: "grid",
                placeItems: "center",
                fontFamily: "'Space Mono', monospace",
                color: "#3D5A80",
                fontWeight: 700,
              }}
            >
              {"</>"}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Tech</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(240,244,248,0.45)" }}>
                dev · manutenção · auditoria
              </div>
            </div>
          </div>

          {tech.map((item) => (
            <div
              key={item.t}
              style={{
                display: "flex",
                gap: 12,
                padding: "13px 0",
                borderTop: "1px solid rgba(240,244,248,0.07)",
              }}
            >
              <span
                className="mono"
                style={{ color: "#3D5A80", fontSize: 13, marginTop: 2 }}
              >
                ▸
              </span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(240,244,248,0.58)" }}>
                  {item.d}
                </div>
              </div>
            </div>
          ))}

          <a
            href={waLink(
              "Olá! Quero contratar só o bloco Tech (dev, manutenção, auditoria) da We Tech Hub."
            )}
            target="_blank"
            rel="noreferrer"
            style={ctaStyle("#8FB3DE", dimTech, both)}
          >
            Contratar só Tech →
          </a>
        </div>

        {/* CONNECTOR */}
        <div
          className="connector"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 4px",
            background: "#152238",
            borderTop: "1px solid rgba(240,244,248,0.09)",
            borderBottom: "1px solid rgba(240,244,248,0.09)",
            opacity: both ? 1 : 0.3,
            transition: "opacity .35s ease",
          }}
        >
          <div style={{ flex: 1, width: 2, background: "linear-gradient(to bottom,transparent,#C87D2F)" }} />
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#C87D2F",
              color: "#0F1B2D",
              display: "grid",
              placeItems: "center",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 20,
              boxShadow: "0 0 0 8px rgba(200,125,47,0.14)",
              flexShrink: 0,
              margin: "12px 0",
            }}
          >
            +
          </div>
          <div style={{ flex: 1, width: 2, background: "linear-gradient(to top,transparent,#C87D2F)" }} />
        </div>

        {/* PERFORMANCE */}
        <div style={{ ...blockStyle(dimPerf, selPerf, "#C87D2F"), borderRadius: "0 14px 14px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: "rgba(200,125,47,0.2)",
                display: "grid",
                placeItems: "center",
                fontFamily: "'Space Mono', monospace",
                color: "#C87D2F",
                fontWeight: 700,
              }}
            >
              ▲
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Performance</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(240,244,248,0.45)" }}>
                CRO · funil · A/B · heatmap
              </div>
            </div>
          </div>

          {perf.map((item) => (
            <div
              key={item.t}
              style={{
                display: "flex",
                gap: 12,
                padding: "13px 0",
                borderTop: "1px solid rgba(240,244,248,0.07)",
              }}
            >
              <span
                className="mono"
                style={{ color: "#C87D2F", fontSize: 13, marginTop: 2 }}
              >
                ▸
              </span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "rgba(240,244,248,0.58)" }}>
                  {item.d}
                </div>
              </div>
            </div>
          ))}

          <a
            href={waLink(
              "Olá! Quero contratar só o bloco Performance (CRO, funil, A/B, heatmap) da We Tech Hub."
            )}
            target="_blank"
            rel="noreferrer"
            style={ctaStyle("#C87D2F", dimPerf, both)}
          >
            Contratar só Performance →
          </a>
        </div>
      </div>
    </section>
  );
}
