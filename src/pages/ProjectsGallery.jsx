import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import useReveal from "../hooks/useReveal.js";
import { projetos, localizeProjeto } from "../projetos.js";
import { useI18n } from "../i18n/I18nContext.jsx";

/* ---------------------------------------------------------------
   PROJECTS GALLERY — Index page
   Shares the editorial language of SelectedWork
   --------------------------------------------------------------- */

function getImgSources(path) {
  if (!path) return { webp: null, src: "" };
  if (path.endsWith(".webp")) {
    return { webp: path, src: path.replace(/\.webp$/, ".png") };
  }
  return { webp: null, src: path };
}

function ProjectItem({ projeto: base, index }) {
  const { t, lang } = useI18n();
  const projeto = localizeProjeto(base, lang);
  const { ref, className } = useReveal();
  const num = String(index + 1).padStart(2, "0");
  const { webp, src } = getImgSources(projeto.preview || projeto.capa);

  return (
    <article className="pg__item">
      <Link
        to={`/projetos/${projeto.slug}`}
        ref={ref}
        className={`pg__link ${className}`}
        style={{ transitionDelay: `${index * 0.06}s` }}
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
            {webp && <source srcSet={webp} type="image/webp" />}
            <img
              src={src}
              alt={`${t("projects.interfaceOf")} ${projeto.nome}`}
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
  const { t } = useI18n();

  return (
    <main id="main" tabIndex={-1}>
      <Seo title={t("meta.projectsTitle")} description={t("meta.projectsDescription")} />
      <section className="pg">
        <div className="container">
          <div ref={intro.ref} className={`pg__intro ${intro.className}`}>
            <div style={{ marginBottom: "var(--space-4)" }}>
              <span className="eyebrow">{t("projects.eyebrow")}</span>
            </div>
            <h1 className="pg__heading">{t("projects.title")}</h1>
            <p className="pg__sub">{t("projects.sub")}</p>
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
