import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

export default function Solutions() {
  const { t } = useI18n();
  return (
    <section id="solucoes" className="section h-section h-section--alt" aria-labelledby="solutions-title">
      <div className="container">
        <SectionHeader
          id="solutions-title"
          eyebrow={t("solutions.eyebrow")}
          title={t("solutions.title")}
          lead={t("solutions.lead")}
        />
        <ul className="h-cards">
          {t("solutions.items").map((item, i) => (
            <Reveal as="li" key={item.title} className="h-card" delay={(i % 3) * 60}>
              <span className="h-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="h-card__title">{item.title}</h3>
              <p className="h-card__text">{item.text}</p>
              <ul className="h-tags" aria-label={item.title}>
                {item.tags.map((tag) => (
                  <li key={tag} className="h-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
