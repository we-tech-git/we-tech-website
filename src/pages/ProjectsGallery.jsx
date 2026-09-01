import { Link } from "react-router-dom";
import { useEffect } from "react";
import useReveal from "../hooks/useReveal.js";
import { projetos } from "../projetos.js";

/* ---------------------------------------------------------------
   PROJECTS GALLERY — Index page
   Shares the editorial language of SelectedWork
   --------------------------------------------------------------- */

function imgSrc(path) {
  return path;
}

function fallbackImgSrc(path) {
  return path.replace(".webp", ".png");
}

function ProjectItem({ projeto, index }) {
  const { ref, className } = useReveal();
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="pg__item">
      <Link
        to={`/projetos/${projeto.slug}`}
        ref={ref}
        className={`pg__link ${className}`}
        style={{ transitionDelay: `${index * 0.06}s` }}
        aria-label={`Ver projeto ${projeto.nome}`}
      >
        {/* Info */}
        <div>
          <div className="pg__item-meta">
            <span className="eyebrow">{projeto.categoria}</span>
            <span className="mono" style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
              {projeto.data}
            </span>
          </div>
          <h2 className="pg__item-name">{projeto.nome}</h2>
          <p className="pg__item-desc">{projeto.resumo}</p>
        </div>

        {/* Image */}
        <div className="pg__item-img-wrap">
          <picture>
            <source srcSet={imgSrc(projeto.preview || projeto.capa)} type="image/webp" />
            <img
              src={fallbackImgSrc(projeto.preview || projeto.capa)}
              alt={`Interface do projeto ${projeto.nome}`}
              loading={index === 0 ? "eager" : "lazy"}
              width={1400}
              height={740}
              className="pg__item-img"
            />
          </picture>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectsGallery() {
  const intro = useReveal();

  useEffect(() => {
    document.title = "Projetos — We Tech Hub";
    return () => { document.title = "We Tech Hub"; };
  }, []);

  return (
    <main>
      <section className="pg">
        <div className="container">
          <div ref={intro.ref} className={`pg__intro ${intro.className}`}>
            <div style={{ marginBottom: "var(--space-4)" }}>
              <span className="eyebrow">Projetos selecionados</span>
            </div>
            <h1 className="pg__heading">Projetos</h1>
            <p className="pg__sub">
              Produtos digitais construídos para contextos reais — cada projeto
              representa um desafio diferente.
            </p>
          </div>

          <div className="pg__list">
            {projetos.map((projeto, i) => (
              <ProjectItem key={projeto.slug} projeto={projeto} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
