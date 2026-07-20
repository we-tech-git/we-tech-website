import { Link, useParams } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { getProjeto } from "../projetos.js";
import { waLink } from "../data.js";

function Section({ numero, titulo, texto, delay }) {
  const { ref, className } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionDelay: `${delay}s`,
        background: "#FFFFFF",
        border: "1px solid rgba(15,27,45,0.08)",
        borderRadius: 12,
        padding: 30,
        boxShadow: "0 8px 24px -14px rgba(15,27,45,0.25)",
      }}
    >
      <div className="mono" style={{ fontSize: 12, color: "#3D5A80", marginBottom: 14 }}>
        {numero}
      </div>
      <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 8, color: "#0F1B2D" }}>
        {titulo}
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(15,27,45,0.62)", margin: 0 }}>
        {texto}
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <section style={{ maxWidth: 640, margin: "0 auto", padding: "120px 28px", textAlign: "center" }}>
      <div
        className="mono"
        style={{ fontSize: 12, letterSpacing: "0.1em", color: "#C87D2F", marginBottom: 16 }}
      >
        // 404
      </div>
      <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 14px" }}>Projeto não encontrado</h1>
      <p style={{ fontSize: 16, color: "rgba(240,244,248,0.62)", margin: "0 0 30px" }}>
        O link acessado não está disponível. Escolha outro projeto para continuar.
      </p>
      <Link
        to="/projetos"
        className="underline-link"
        style={{ textDecoration: "none", color: "#F0F4F8", fontSize: 15 }}
      >
        ← Voltar para projetos
      </Link>
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const projeto = getProjeto(slug);
  const header = useReveal();
  const preview = useReveal();
  const resultado = useReveal();

  if (!projeto) return <NotFound />;

  return (
    <>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "44px 28px 0" }}>
        <Link
          to="/projetos"
          className="underline-link"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(240,244,248,0.7)",
            fontSize: 14,
            marginBottom: 34,
          }}
        >
          ← Voltar para projetos
        </Link>

        <div ref={header.ref} className={header.className}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#3ddc84",
              }}
            />
            <span className="mono" style={{ fontSize: 12, color: "rgba(240,244,248,0.5)" }}>
              {projeto.data}
            </span>
          </div>
          <h1
            style={{
              fontSize: 42,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              margin: "0 0 18px",
            }}
          >
            {projeto.nome}
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(240,244,248,0.66)",
              margin: "0 0 36px",
              maxWidth: 720,
            }}
          >
            {projeto.intro}
          </p>
        </div>

        <div
          className="float"
          style={{
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid rgba(240,244,248,0.09)",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            marginBottom: 56,
          }}
        >
          <img
            src={projeto.capa}
            alt={projeto.nome}
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </section>

      <section
        style={{
          background: "#EDF1F7",
          borderTop: "1px solid rgba(15,27,45,0.06)",
          borderBottom: "1px solid rgba(15,27,45,0.06)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 28px" }}>
          <div
            className="project-sections-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {projeto.secoes.map((secao, i) => (
              <Section
                key={secao.titulo}
                numero={String(i + 1).padStart(2, "0")}
                titulo={secao.titulo}
                texto={secao.texto}
                delay={0.05 + i * 0.08}
              />
            ))}
          </div>

          <div
            ref={preview.ref}
            className={preview.className}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(15,27,45,0.08)",
              borderRadius: 12,
              padding: 30,
              boxShadow: "0 8px 24px -14px rgba(15,27,45,0.25)",
            }}
          >
            <div className="mono" style={{ fontSize: 12, color: "#C87D2F", marginBottom: 14 }}>
              03
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 8, color: "#0F1B2D" }}>
              {projeto.preview_titulo}
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(15,27,45,0.62)",
                margin: "0 0 22px",
              }}
            >
              {projeto.preview_texto}
            </p>
            <div
              style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(15,27,45,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 14px",
                  background: "#0F1B2D",
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
                {projeto.link && (
                  <span
                    className="mono"
                    style={{
                      marginLeft: 10,
                      fontSize: 11.5,
                      color: "rgba(240,244,248,0.5)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {projeto.link}
                  </span>
                )}
              </div>
              <img
                src={projeto.preview}
                alt={projeto.preview_titulo}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "64px 28px" }}>
        <div
          ref={resultado.ref}
          className={resultado.className}
          style={{
            background: "#1E293B",
            border: "1px solid rgba(240,244,248,0.09)",
            borderRadius: 13,
            padding: 32,
            borderLeft: "3px solid #C87D2F",
            marginBottom: 40,
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "#C87D2F",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            {projeto.resultado_titulo}
          </div>
          <p style={{ fontSize: 16.5, lineHeight: 1.55, margin: 0, color: "rgba(240,244,248,0.9)" }}>
            {projeto.resultado_texto}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}
        >
          {projeto.link && (
            <a
              href={projeto.link}
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
                fontSize: 15.5,
                padding: "14px 24px",
                borderRadius: 9,
              }}
            >
              Abrir projeto <span className="mono">→</span>
            </a>
          )}
          <Link
            to="/projetos"
            className="underline-link"
            style={{
              textDecoration: "none",
              fontSize: 15,
              color: "rgba(240,244,248,0.78)",
              padding: "14px 8px",
            }}
          >
            Ver outros projetos
          </Link>
        </div>
      </section>
    </>
  );
}
