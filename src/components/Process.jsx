import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

export default function Process() {
  const { t } = useI18n();
  return (
    <section id="processo" className="section h-section h-section--alt" aria-labelledby="process-title">
      <div className="container">
        <SectionHeader
          id="process-title"
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          lead={t("process.lead")}
        />
        <ol className="h-steps">
          {t("process.steps").map((step, i) => (
            <Reveal as="li" key={step.title} className="h-step" delay={i * 60}>
              <span className="h-step__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="h-step__title">{step.title}</h3>
              <p className="h-step__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal as="p" className="h-outro h-outro--center">
          {t("process.closing")}
        </Reveal>
      </div>
    </section>
  );
}
