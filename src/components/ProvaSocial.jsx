import { useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { testimonials } from "../data.js";

export default function ProvaSocial() {
  const [ti, setTi] = useState(0);
  const intro = useReveal();
  const n = testimonials.length;
  const current = testimonials[ti];

  const next = () => setTi((i) => (i + 1) % n);
  const prev = () => setTi((i) => (i - 1 + n) % n);

  return (
    <section
      id="prova"
      style={{
        background: "#EDF1F7",
        borderTop: "1px solid rgba(15,27,45,0.06)",
        borderBottom: "1px solid rgba(15,27,45,0.06)",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px" }}>
        <div
          ref={intro.ref}
          className={intro.className}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 38,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                color: "#C87D2F",
                marginBottom: 16,
              }}
            >
              // 03 — QUEM JÁ ESCALOU COM A GENTE
            </div>
            <h2
              style={{
                fontSize: 38,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                margin: 0,
                color: "#0F1B2D",
              }}
            >
              Feedback dos nossos clientes.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={prev}
              aria-label="anterior"
              className="arrow-btn"
              style={{
                width: 44,
                height: 44,
                borderRadius: 9,
                border: "1px solid rgba(15,27,45,0.16)",
                background: "transparent",
                color: "#0F1B2D",
                fontSize: 18,
              }}
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="próximo"
              className="arrow-btn"
              style={{
                width: 44,
                height: 44,
                borderRadius: 9,
                border: "1px solid rgba(15,27,45,0.16)",
                background: "transparent",
                color: "#0F1B2D",
                fontSize: 18,
              }}
            >
              →
            </button>
          </div>
        </div>

        <div
          className="testimonial-card"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(15,27,45,0.08)",
            borderRadius: 16,
            padding: 44,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "center",
            boxShadow: "0 14px 40px -20px rgba(15,27,45,0.35)",
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: 13, color: "#C87D2F", marginBottom: 18 }}>
              "
            </div>
            <p
              style={{
                fontSize: 26,
                lineHeight: 1.4,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                margin: "0 0 26px",
                color: "#0F1B2D",
              }}
            >
              {current.quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#3D5A80",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#F0F4F8",
                  flexShrink: 0,
                }}
              >
                {current.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#0F1B2D" }}>
                  {current.name}
                </div>
                <div className="mono" style={{ fontSize: 12, color: "rgba(15,27,45,0.5)" }}>
                  {current.role}
                </div>
              </div>
            </div>
          </div>
          <div
            className="testimonial-metric"
            style={{
              textAlign: "center",
              paddingLeft: 40,
              borderLeft: "1px solid rgba(15,27,45,0.1)",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 700, color: "#C87D2F", letterSpacing: "-0.02em" }}>
              {current.metric}
            </div>
            <div className="mono" style={{ fontSize: 11, color: "rgba(15,27,45,0.5)", marginTop: 4 }}>
              {current.metricLabel}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setTi(i)}
              aria-label={`depoimento ${i + 1}`}
              style={{
                height: 6,
                border: "none",
                borderRadius: 99,
                padding: 0,
                transition: "width .25s, background .25s",
                width: i === ti ? 28 : 6,
                background: i === ti ? "#C87D2F" : "rgba(15,27,45,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
