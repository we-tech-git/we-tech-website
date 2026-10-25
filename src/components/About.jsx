import { useI18n } from "../i18n/I18nContext.jsx";
import { Reveal, SectionHeader } from "./Section.jsx";

export default function About() {
  const { t } = useI18n();
  return (
    <section id="sobre" className="section h-section h-section--alt" aria-labelledby="about-title">
      <div className="container h-split">
        <SectionHeader id="about-title" eyebrow={t("about.eyebrow")} title={t("about.title")} />
        <ul className="h-diffs">
          {t("about.items").map((item, i) => (
            <Reveal as="li" key={item.title} className="h-diff" delay={i * 40}>
              <h3 className="h-diff__title">{item.title}</h3>
              <p className="h-diff__text">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
