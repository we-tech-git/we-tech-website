import { waLink } from "../data.js";

const bars = [38, 46, 42, 58, 66, 100];

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        maxWidth: 1160,
        margin: "0 auto",
        padding: "76px 28px 90px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 40,
          right: -120,
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(200,125,47,0.16), transparent 62%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 56,
          alignItems: "center",
          position: "relative",
        }}
        className="hero-grid"
      >
        <div>
          <h1
            style={{
              fontSize: 54,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              fontWeight: 700,
              margin: "0 0 22px",
            }}
          >
            Construa e escale o seu{" "}
            <span style={{ color: "#F0F4F8" }}>e-commerce</span>.
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(240,244,248,0.68)",
              maxWidth: 480,
              margin: "0 0 34px",
            }}
          >
            Dev e performance no mesmo time. Sem intermediários, sem handoff
            entre fornecedores — do código ao ROAS, uma responsabilidade só.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 16,
            }}
          >
            <a
              href={waLink("Olá! Quero falar com a equipe da We Tech Hub.")}
              target="_blank"
              rel="noreferrer"
              className="btn-accent"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#C87D2F",
                color: "#0F1B2D",
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 26px",
                borderRadius: 9,
              }}
            >
              Falar com a equipe <span className="mono">→</span>
            </a>
            <a
              href="#servicos"
              className="underline-link"
              style={{
                textDecoration: "none",
                fontSize: 15,
                color: "rgba(240,244,248,0.78)",
                padding: "15px 8px",
              }}
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div
          className="float"
          style={{
            background: "#1E293B",
            border: "1px solid rgba(240,244,248,0.09)",
            borderRadius: 14,
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "16px 20px",
              borderBottom: "1px solid rgba(240,244,248,0.08)",
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#3ddc84",
              }}
            />
            <span
              className="mono"
              style={{ fontSize: 11.5, color: "rgba(240,244,248,0.55)" }}
            >
              resultado em 90 dias
            </span>
            <span
              className="mono"
              style={{ marginLeft: "auto", fontSize: 11, color: "#C87D2F" }}
            >
              ao vivo
            </span>
          </div>

          <div style={{ padding: "26px 22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "rgba(240,244,248,0.5)",
                    marginBottom: 6,
                  }}
                >
                  RECEITA DO E-COMMERCE
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#F0F4F8",
                    letterSpacing: "-0.02em",
                  }}
                >
                  R$ 482 mil
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  className="mono"
                  style={{ fontSize: 12, color: "#3ddc84", fontWeight: 700 }}
                >
                  ▲ +38%
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 10.5, color: "rgba(240,244,248,0.45)" }}
                >
                  vs. período anterior
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 6,
                height: 64,
                marginBottom: 22,
              }}
            >
              {bars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background:
                      i === bars.length - 1
                        ? "#C87D2F"
                        : i >= 3
                        ? "rgba(61,90,128,0.6)"
                        : "rgba(61,90,128,0.5)",
                    borderRadius: "3px 3px 0 0",
                    height: `${h}%`,
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: 22,
                paddingTop: 18,
                borderTop: "1px solid rgba(240,244,248,0.08)",
              }}
            >
              {[
                ["2.4x", "ROAS"],
                ["-52%", "carrinho abandonado"],
                ["1.2s", "tempo de carregamento"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 19, fontWeight: 700, color: "#F0F4F8" }}>
                    {value}
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 10.5, color: "rgba(240,244,248,0.5)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
