import useReveal from "../hooks/useReveal.js";

export default function Sobre() {
  const left = useReveal();
  const right = useReveal();

  return (
    <section id="sobre" style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 28px" }}>
      <div
        className="sobre-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div ref={left.ref} className={left.className}>
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "#C87D2F",
              marginBottom: 16,
            }}
          >
            // 04 — QUEM SOMOS
          </div>
          <h2
            style={{
              fontSize: 38,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              margin: "0 0 16px",
            }}
          >
            Um hub, não um fornecedor.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(240,244,248,0.64)", margin: 0 }}>
            A gente não divide responsabilidade e não terceiriza resultado.
            Tecnologia e performance vivem debaixo do mesmo teto — porque é
            assim que e-commerce escala de verdade.
          </p>
        </div>

        <div
          ref={right.ref}
          className={right.className}
          style={{ display: "grid", gap: 18, transitionDelay: "0.1s" }}
        >
          <div
            style={{
              background: "#1E293B",
              border: "1px solid rgba(240,244,248,0.09)",
              borderRadius: 13,
              padding: 28,
              borderLeft: "3px solid #C87D2F",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "#C87D2F",
                marginBottom: 10,
              }}
            >
              MISSÃO
            </div>
            <p style={{ fontSize: 16.5, lineHeight: 1.55, margin: 0, color: "rgba(240,244,248,0.9)" }}>
              Ajudar e-commerces a crescer resolvendo tecnologia e
              performance juntos — sem dividir responsabilidade, sem
              terceirizar resultado.
            </p>
          </div>
          <div
            style={{
              background: "#1E293B",
              border: "1px solid rgba(240,244,248,0.09)",
              borderRadius: 13,
              padding: 28,
              borderLeft: "3px solid #3D5A80",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "#3D5A80",
                marginBottom: 10,
              }}
            >
              VISÃO
            </div>
            <p style={{ fontSize: 16.5, lineHeight: 1.55, margin: 0, color: "rgba(240,244,248,0.9)" }}>
              Ser a referência no Brasil para e-commerces que querem escalar
              com tecnologia própria e marketing integrado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
