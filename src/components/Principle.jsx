import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal } from "./Section.jsx";

export default function Principle() {
  const { t } = useI18n();
  return (
    <section className="section h-section h-principle" aria-labelledby="principle-title">
      <div className="container container--narrow">
        <Reveal>
          <span className="eyebrow">{t("principle.eyebrow")}</span>
          <h2 id="principle-title" className="h-principle__title">
            {t("principle.title")}
          </h2>
          <p className="h-principle__lead">{t("principle.lead")}</p>
          <p className="h-principle__body">{t("principle.body")}</p>
          <ul className="h-principle__options">
            {t("principle.options").map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <p className="h-principle__closing">{t("principle.closing")}</p>
        </Reveal>
      </div>
    </section>
  );
}
