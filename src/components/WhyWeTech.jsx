import useReveal from "../hooks/useReveal.js";

/* ---------------------------------------------------------------
   WE TECH HUB — WHY WE TECH (FASE 7 & FASE F)
   Direction: OPERATING PRINCIPLES
   Motion: DECOMPRESSION & EDITORIAL PAUSE
   Clear, defensible operating principles demonstrating the value
   of unified product, design, and engineering execution.
   --------------------------------------------------------------- */

const PRINCIPLES = [
  {
    index: "01",
    category: "Sistema integrado",
    title: "Decisões coordenadas, sem rupturas de handoff",
    description:
      "Produto, design e engenharia não são tratados como entregas separadas. Decisões de escopo, arquitetura de interface e viabilidade técnica acontecem em conjunto para eliminar a perda de contexto entre intenção e implementação.",
  },
  {
    index: "02",
    category: "Rigor de escopo",
    title: "Definição do problema antes de expandir complexidade",
    description:
      "A prioridade é entender o problema essencial e as restrições reais antes de adicionar linhas de código. Evitamos desperdício de esforço protegendo o foco e a clareza do produto.",
  },
  {
    index: "03",
    category: "Engenharia resiliente",
    title: "Estrutura concebida para evolução contínua",
    description:
      "O produto não é considerado encerrado no momento do deploy. A base técnica, os componentes e a arquitetura são estruturados para que novas necessidades sejam implementadas com agilidade e sustentabilidade.",
  },
  {
    index: "04",
    category: "Transparência e contexto",
    title: "Visibilidade contínua sobre critérios e prioridades",
    description:
      "Cada escolha técnica e de experiência é fundamentada de forma explícita. Mantemos alinhamento constante ao longo do processo para que você compreenda com exatidão o que está sendo construído e por quê.",
  },
];

function PrincipleItem({ principle, index }) {
  const itemReveal = useReveal({ variant: "standard", threshold: 0.15, delay: index * 40 });

  return (
    <li
      ref={itemReveal.ref}
      className={`why-principle-item ${itemReveal.className}`}
    >
      <div className="why-principle-header">
        <div className="why-principle-meta">
          <span className="why-principle-cat">
            {principle.category}
          </span>
        </div>
      </div>

      <div className="why-principle-body">
        <h3 className="why-principle-title">
          {principle.title}
        </h3>
        <p className="why-principle-desc">
          {principle.description}
        </p>
      </div>
    </li>
  );
}

export default function WhyWeTech() {
  // Fase H: Why We Tech is the decompression pause — minimum motion,
  // no clip/mask reveal here (that's reserved for Process and the CTA).
  const introReveal = useReveal({ variant: "standard" });

  return (
    <section
      id="about"
      className="section why-section"
      aria-labelledby="why-heading"
    >
      <div className="container">
        <div className="why-grid">
          {/* LEFT COLUMN: Narrative Positioning & Bridge (Cols 1–5) */}
          <div ref={introReveal.ref} className={`${introReveal.className} why-sticky-col`}>
            <div className="why-eyebrow-wrap">
              <span className="eyebrow">Princípios</span>
            </div>

            <h2 id="why-heading" className="heading-lg why-heading">
              Menos handoff entre etapas.
              <span className="why-heading-highlight">
                {" "}Mais coerência do início à evolução do produto.
              </span>
            </h2>

            <p className="body-base why-lead">
              O valor do trabalho não termina em uma interface desenhada ou em código publicado.
              A qualidade surge ao manter intenção estratégica, clareza de escopo e rigor técnico
              conectados em cada decisão de construção.
            </p>

            {/* Editorial Bridge to Final Contact */}
            <div className="why-bridge">
              <span className="why-bridge-label">Próximo passo</span>
              <p className="why-bridge-text">
                Se é esse nível de continuidade e rigor que o seu produto exige, o próximo passo é estruturar o desafio.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial List of Operating Principles (Cols 6–12) */}
          <div className="why-principles-col">
            <ol className="why-principles-list" role="list">
              {PRINCIPLES.map((principle, idx) => (
                <PrincipleItem
                  key={principle.index}
                  principle={principle}
                  index={idx}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
