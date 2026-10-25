import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { projetos } from "../projetos.js";
import { ActionIcon } from "./Icons.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

function webpOf(path) {
  return path && path.endsWith(".webp") ? { webp: path, src: path.replace(/\.webp$/, ".png") } : { webp: null, src: path };
}

export default function Cases() {
  const { t } = useI18n();
  const order = ["lelume", "maria-mariana", "we-party"];
  const cases = order.map((slug) => projetos.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <section id="cases" className="section h-section" aria-labelledby="cases-title">
      <div className="container">
        <SectionHeader
          id="cases-title"
          eyebrow={t("cases.eyebrow")}
          title={t("cases.title")}
          lead={t("cases.lead")}
        />
        <ul className="h-cases">
          {cases.map((projeto, i) => {
            const copy = t(`cases.items.${projeto.slug}`);
            const { webp, src } = webpOf(projeto.capa);
            return (
              <Reveal as="li" key={projeto.slug} className="h-case" delay={i * 60}>
                <Link to={`/projetos/${projeto.slug}`} className="h-case__media" tabIndex={-1} aria-hidden="true">
                  <picture>
                    {webp && <source srcSet={webp} type="image/webp" />}
                    <img src={src} alt="" width={1400} height={740} loading="lazy" />
                  </picture>
                </Link>
                <div className="h-case__body">
                  <span className="h-case__name">{copy.name}</span>
                  <h3 className="h-case__headline">{copy.headline}</h3>
                  <p className="h-case__text">{copy.text}</p>
                  <ul className="h-tags" aria-label={copy.name}>
                    {copy.tags.map((tag) => (
                      <li key={tag} className="h-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/projetos/${projeto.slug}`} className="h-case__link">
                    {t("cases.cta")}
                    <span className="h-sr"> — {copy.name}</span> <ActionIcon />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </ul>
        <Reveal className="h-all">
          <Link to="/projetos" className="btn btn--ghost">
            {t("cases.all")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
