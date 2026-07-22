import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { projetos } from "../projetos.js";
import { waLink } from "../data.js";

function ProjectCard({ projeto, delay }) {
  const { ref, className } = useReveal();

  return (
    <Link
      to={`/projetos/${projeto.slug}`}
      ref={ref}
      className={`${className} project-card`}
      style={{
        transitionDelay: `${delay}s`,
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        background: "#1E293B",
        border: "1px solid rgba(240,244,248,0.09)",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          aspectRatio: "16 / 9",
          background: `#152238 url(${projeto.capa}) center / cover no-repeat`,
        }}
      />
      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "#C87D2F",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          {projeto.categoria}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{projeto.nome}</div>
        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.55,
            color: "rgba(240,244,248,0.62)",
            margin: "0 0 18px",
            flex: 1,
          }}
        >
          {projeto.resumo}
        </p>
        <span
          className="mono project-card__cta"
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#8FB3DE",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Ver detalhes →
        </span>
      </div>
    </Link>
  );
}

export default function ProjectsGallery() {
  const intro = useReveal();

  return (
    <>
      <section style={{ maxWidth: 1160, margin: "0 auto", padding: "76px 28px 60px" }}>
        <div ref={intro.ref} className={intro.className} style={{ maxWidth: 680 }}>
          <h1
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              margin: "0 0 18px",
            }}
          >
            Projetos em destaque
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(240,244,248,0.64)",
              margin: 0,
            }}
          >
            Alguns dos produtos digitais que a We Tech Hub construiu com times
            parceiros — de landing pages a plataformas web3 e institucionais.
          </p>
        </div>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 22,
            marginTop: 48,
          }}
        >
          {projetos.map((projeto, i) => (
            <ProjectCard key={projeto.slug} projeto={projeto} delay={0.05 + i * 0.07} />
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#EDF1F7",
          borderTop: "1px solid rgba(15,27,45,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "64px 28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: "#0F1B2D",
              margin: "0 0 22px",
            }}
          >
            Interessado em começar um projeto com a gente?
          </p>
          <a
            href={waLink("Olá! Vi o portfólio da We Tech Hub e quero começar um projeto.")}
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
              fontSize: 16,
              padding: "15px 28px",
              borderRadius: 9,
            }}
          >
            Entrar em contato →
          </a>
        </div>
      </section>
    </>
  );
}
