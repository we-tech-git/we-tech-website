import { useI18n } from "../i18n/I18nContext.jsx";
import { CONTACT_EMAIL, mailtoLink } from "../data.js";
import { ActionIcon } from "./Icons.jsx";
import { Reveal } from "./Section.jsx";

export default function ClosingCta() {
  const { t } = useI18n();
  return (
    <section id="contato" className="section h-section h-cta" aria-labelledby="cta-title">
      <div className="container container--narrow h-cta__inner">
        <Reveal>
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2 id="cta-title" className="h-cta__title">
            {t("contact.title")}
          </h2>
          <p className="h-cta__body">{t("contact.body")}</p>
          <p className="h-cta__note">{t("contact.note")}</p>
          <ol className="h-cta__steps">
            {t("contact.steps").map((step, i) => (
              <li key={step}>
                <span className="h-cta__step-num" aria-hidden="true">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="h-cta__actions">
            <a
              className="btn btn--primary"
              href={mailtoLink(t("contact.mailSubject"), t("contact.mailBody"))}
            >
              {t("contact.cta")} <ActionIcon />
            </a>
            <p className="h-cta__email">
              {t("contact.emailLabel")} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
