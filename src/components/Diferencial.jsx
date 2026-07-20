import useReveal from "../hooks/useReveal.js";

const cards = [
  {
    n: "01",
    title: "Dev + Performance integrados",
    text: "O mesmo time que escreve o código lê o heatmap. Contexto não se perde no caminho.",
  },
  {
    n: "02",
    title: "Sem handoff, sem desculpa",
    text: 'Nada de "isso é com o outro fornecedor". A entrega é ponta a ponta — do deploy à campanha.',
  },
  {
    n: "03",
    title: "Tecnologia própria",
    text: "Escala com stack own, não terceirizada. Você cresce sem depender de caixa-preta.",
  },
];

function DiffCard({ card, delay }) {
  const { ref, className } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} diff-card`}
      style={{
        transitionDelay: `${delay}s`,
        background: "#FFFFFF",
        border: "1px solid rgba(15,27,45,0.08)",
        borderRadius: 12,
        padding: 26,
        boxShadow: "0 8px 24px -14px rgba(15,27,45,0.25)",
      }}
    >
      <div className="mono" style={{ fontSize: 12, color: "#3D5A80", marginBottom: 14 }}>
        {card.n}
      </div>
      <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 8, color: "#0F1B2D" }}>
        {card.title}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(15,27,45,0.6)", margin: 0 }}>
        {card.text}
      </p>
    </div>
  );
}

export default function Diferencial() {
  const intro = useReveal();

  return (
    <section
      id="diferencial"
      style={{
        background: "#EDF1F7",
        borderTop: "1px solid rgba(15,27,45,0.06)",
        borderBottom: "1px solid rgba(15,27,45,0.06)",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px" }}>
        <div ref={intro.ref} className={intro.className} style={{ maxWidth: 760 }}>
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              color: "#C87D2F",
              marginBottom: 16,
            }}
          >
            // 01 — O PROBLEMA QUE RESOLVEMOS
          </div>
          <h2
            style={{
              fontSize: 38,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              margin: "0 0 18px",
              color: "#0F1B2D",
            }}
          >
            A agência culpa o dev. O dev culpa a agência.{" "}
            <span style={{ color: "rgba(15,27,45,0.45)" }}>Você fica no meio.</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(15,27,45,0.66)",
              margin: 0,
            }}
          >
            Quando tecnologia e marketing são fornecedores diferentes, o
            resultado vira jogo de empurra. A gente une os dois no mesmo
            time — uma decisão, uma responsabilidade, um número no fim do
            mês.
          </p>
        </div>

        <div
          className="diff-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginTop: 44,
          }}
        >
          {cards.map((card, i) => (
            <DiffCard key={card.n} card={card} delay={0.05 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
