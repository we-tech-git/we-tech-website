import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

export default function Identify() {
  const { t } = useI18n();
  return (
    <section id="problemas" className="section h-section" aria-labelledby="identify-title">
      <div className="container h-split">
        <SectionHeader
          id="identify-title"
          eyebrow={t("identify.eyebrow")}
          title={t("identify.title")}
          lead={t("identify.lead")}
        />
        <div>
          <ul className="h-pains">
            {t("identify.pains").map((pain, i) => (
              <Reveal as="li" key={pain} className="h-pains__item" delay={i * 40}>
                <span className="h-pains__mark" aria-hidden="true" />
                <span>{pain}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="h-outro">
            {t("identify.outro")}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
