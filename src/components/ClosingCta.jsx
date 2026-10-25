import { useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import { CONTACT_EMAIL, mailtoLink } from "../data.js";
import { initMagneticElement } from "../motion.js";
import { ActionIcon } from "./Icons.jsx";

/* ---------------------------------------------------------------
   WE TECH HUB — CLOSING CTA
   Direction: PROJECT INITIATION
   Motion: CONVERGENCE & MAGNETIC INVITATION
   Turns built trust into a clear, direct next step: an e-mail.
   --------------------------------------------------------------- */

export default function ClosingCta() {
  const { t } = useI18n();
  const introReveal = useReveal({ variant: "mask" });
  const pillarsReveal = useReveal({ variant: "standard", threshold: 0.08 });
  const cardReveal = useReveal({ variant: "standard", threshold: 0.08 });
  const primaryBtnRef = useRef(null);

  /* ---- Magnetic CTA interaction (Desktop only) ---- */
  useEffect(() => {
    const cleanup = initMagneticElement(primaryBtnRef.current, 0.22, 6);
    return cleanup;
  }, []);

  return (
    <section id="contato" className="section closing-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div ref={introReveal.ref} className={`${introReveal.className} closing-cta-header`}>
          <div className="closing-cta-eyebrow-row">
            <span className="eyebrow">{t("contact.eyebrow")}</span>
          </div>

          <h2 id="cta-heading" className="heading-xl closing-cta-heading">
            {t("contact.title")}
          </h2>

          <p className="body-lg closing-cta-lead">{t("contact.body")}</p>
        </div>

        <ol
          ref={pillarsReveal.ref}
          className={`closing-cta-pillars reveal-stagger ${pillarsReveal.className}`}
        >
          {t("contact.steps").map((step, i) => (
            <li key={step} className="closing-cta-pillar">
              <div className="pillar-top">
                <span className="pillar-label">
                  {String(i + 1).padStart(2, "0")} · {step}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div ref={cardReveal.ref} className={`${cardReveal.className} closing-cta-actions-wrap`}>
          <div className="closing-cta-actions">
            <div ref={primaryBtnRef} className="cta-magnetic-wrap">
              <a
                href={mailtoLink(t("contact.mailSubject"), t("contact.mailBody"))}
                className="btn btn--primary closing-cta-primary-btn"
              >
                {t("contact.cta")} <ActionIcon />
              </a>
            </div>
            <p className="closing-cta-email">
              {t("contact.emailLabel")} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
