import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import useReveal from "../hooks/useReveal.js";
import { getProjeto, projetos } from "../projetos.js";
import { StepArrowIcon, ExploreIcon, ActionIcon } from "../components/Icons.jsx";

/* ---------------------------------------------------------------
   PROJECT DETAIL — Premium single-project page
   Factual content only. No invented metrics.
   --------------------------------------------------------------- */

function imgSrc(path) {
  return path;
}

function fallbackImgSrc(path) {
  return path.replace(".webp", ".png");
}

function NotFound() {
  return (
    <main>
      <section className="pd pd__404">
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ marginBottom: "var(--space-4)", display: "block" }}>
            404
          </span>
          <h1 className="heading-lg" style={{ marginBottom: "var(--space-4)" }}>
            Projeto não encontrado
          </h1>
          <p className="body-lg" style={{ marginBottom: "var(--space-7)" }}>
            O link acessado não está disponível.
          </p>
          <Link to="/projetos" className="btn btn--ghost">
            ← Voltar para projetos
          </Link>
        </div>
      </section>
    </main>
  );
}

/* Prev/Next navigation */
function ProjectNav({ currentSlug }) {
  const currentIndex = projetos.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? projetos[currentIndex - 1] : projetos[projetos.length - 1];
  const next = currentIndex < projetos.length - 1 ? projetos[currentIndex + 1] : projetos[0];

  return (
    <nav className="pd__nav" aria-label="Navegação entre projetos">
      <Link
        to={`/projetos/${prev.slug}`}
        className="pd__nav-item"
        aria-label={`Projeto anterior: ${prev.nome}`}
      >
        <span className="pd__nav-label">← Anterior</span>
        <span className="pd__nav-name">{prev.nome}</span>
      </Link>
      <Link
        to={`/projetos/${next.slug}`}
        className="pd__nav-item pd__nav-item--next"
        aria-label={`Próximo projeto: ${next.nome}`}
      >
        <span className="pd__nav-label">Próximo <StepArrowIcon /></span>
        <span className="pd__nav-name">{next.nome}</span>
      </Link>
    </nav>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const projeto = getProjeto(slug);
  const header = useReveal();
  const coverReveal = useReveal();

  /* Scroll to top on project change */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    document.title = projeto ? `${projeto.nome} — We Tech Hub` : "Projeto não encontrado — We Tech Hub";
    return () => { document.title = "We Tech Hub"; };
  }, [projeto]);

  if (!projeto) return <NotFound />;

  const hasBanner = projeto.capa !== projeto.preview;
  const coverImg = projeto.capa;
  const previewImg = projeto.preview;

  return (
    <main>
      <section className="pd">
        <div className="container" style={{ maxWidth: 960 }}>
          {/* Back link */}
          <Link to="/projetos" className="pd__back">
            ← Projetos
          </Link>

          {/* Header */}
          <div ref={header.ref} className={`pd__header ${header.className}`}>
            <div className="pd__header-meta">
              <span className="eyebrow">{projeto.categoria}</span>
              <span className="sw-row__divider" aria-hidden="true" />
              <span className="mono" style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                {projeto.tipo}
              </span>
              <span className="sw-row__divider" aria-hidden="true" />
              <span className="mono" style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                {projeto.data}
              </span>
            </div>

            <h1 className="pd__title">{projeto.nome}</h1>

            <p className="pd__intro">{projeto.intro}</p>
          </div>

          {/* Cover image */}
          <div ref={coverReveal.ref} className={`pd__cover ${coverReveal.className}`}>
            <picture>
              <source srcSet={imgSrc(coverImg)} type="image/webp" />
              <img
                src={fallbackImgSrc(coverImg)}
                alt={`Interface do projeto ${projeto.nome}`}
                width={1400}
                height={740}
                loading="eager"
              />
            </picture>
          </div>

          {/* Content sections */}
          {projeto.secoes.length > 0 && (
            <div className="pd__sections">
              {projeto.secoes.map((secao, i) => (
                <SectionCard
                  key={secao.titulo}
                  num={String(i + 1).padStart(2, "0")}
                  titulo={secao.titulo}
                  texto={secao.texto}
                  delay={i * 0.08}
                />
              ))}
            </div>
          )}

          {/* Preview image — only if different from cover */}
          {hasBanner && previewImg && (
            <div className="pd__preview">
              <picture>
                <source srcSet={imgSrc(previewImg)} type="image/webp" />
                <img
                  src={fallbackImgSrc(previewImg)}
                  alt={`Preview da interface ${projeto.nome}`}
                  width={1400}
                  height={740}
                  loading="lazy"
                />
              </picture>
            </div>
          )}

          {/* Actions */}
          <div className="pd__actions">
            {projeto.link && (
              <a
                href={projeto.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Visitar site <ActionIcon />
              </a>
            )}
            <Link to="/projetos" className="btn btn--ghost">
              Ver outros projetos
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <div className="container" style={{ maxWidth: 960 }}>
        <ProjectNav currentSlug={projeto.slug} />
      </div>
    </main>
  );
}

/* Section card sub-component */
function SectionCard({ titulo, texto, delay }) {
  const { ref, className } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} surface pd__section-card`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <h3 className="pd__section-title">{titulo}</h3>
      <p className="pd__section-text">{texto}</p>
    </div>
  );
}
