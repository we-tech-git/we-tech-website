import useReveal from "../hooks/useReveal.js";
import { waLink } from "../data.js";

export default function Contato() {
  const reveal = useReveal();

  return (
    <section
      id="contato"
      style={{
        position: "relative",
        background: "#EDF1F7",
        borderTop: "1px solid rgba(15,27,45,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 120%, rgba(200,125,47,0.22), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 28px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div ref={reveal.ref} className={reveal.className}>
          <div
            style={{
              fontSize: "clamp(44px, 9vw, 104px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              marginBottom: 14,
              color: "#0F1B2D",
            }}
          >
            BUILD. <span style={{ color: "#C87D2F" }}>SCALE.</span> REPEAT.
          </div>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(15,27,45,0.66)",
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            Quer construir e escalar o seu e-commerce mas não sabe por onde
            começar? A We Tech faz esse trabalho para você.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
            <a
              href={waLink("Olá! Quero falar com a equipe da We Tech Hub.")}
              target="_blank"
              rel="noreferrer"
              className="btn-accent"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#C87D2F",
                color: "#0F1B2D",
                fontWeight: 700,
                fontSize: 17,
                padding: "16px 30px",
                borderRadius: 10,
              }}
            >
              Entrar em contato →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
