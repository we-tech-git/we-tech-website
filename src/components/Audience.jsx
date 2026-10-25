import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

export default function Audience() {
  const { t } = useI18n();
  return (
    <section id="para-quem" className="section h-section" aria-labelledby="audience-title">
      <div className="container h-split">
        <SectionHeader
          id="audience-title"
          eyebrow={t("audience.eyebrow")}
          title={t("audience.title")}
          lead={t("audience.lead")}
        />
        <div>
          <ul className="h-checks">
            {t("audience.items").map((item, i) => (
              <Reveal as="li" key={item} className="h-checks__item" delay={i * 30}>
                <span className="h-checks__mark" aria-hidden="true" />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" className="h-outro">
            {t("audience.closing")}
          </Reveal>
          <Reveal as="p" className="h-fineprint">
            {t("audience.notFor")}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
