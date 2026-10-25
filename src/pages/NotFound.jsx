import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <main id="main" tabIndex={-1}>
      <Seo noindex title={t("meta.notFoundTitle")} />
      <section className="pd pd__404">
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="eyebrow" style={{ marginBottom: "var(--space-4)", display: "block" }}>
            {t("notFound.eyebrow")}
          </span>
          <h1 className="heading-lg" style={{ marginBottom: "var(--space-4)" }}>
            {t("notFound.title")}
          </h1>
          <p className="body-lg" style={{ marginBottom: "var(--space-7)" }}>
            {t("notFound.text")}
          </p>
          <div className="pd__actions">
            <Link to="/" className="btn btn--primary">
              {t("notFound.home")}
            </Link>
            <Link to="/projetos" className="btn btn--ghost">
              {t("notFound.projects")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
