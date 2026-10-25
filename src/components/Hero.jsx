import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { mailtoLink } from "../data.js";
import { ActionIcon } from "./Icons.jsx";
import { Reveal } from "./Section.jsx";

export default function Hero() {
  const { t } = useI18n();
  const pairs = t("hero.pairs");

  return (
    <section className="hero h-hero" aria-labelledby="hero-title">
      <div className="container h-hero__grid">
        <Reveal className="h-hero__copy">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 id="hero-title" className="h-hero__title">
            {t("hero.title")}
          </h1>
          <p className="h-hero__subtitle">{t("hero.subtitle")}</p>
          <p className="h-hero__body">{t("hero.body")}</p>
          <div className="h-hero__actions">
            <a
              className="btn btn--primary"
              href={mailtoLink(t("contact.mailSubject"), t("contact.mailBody"))}
            >
              {t("hero.ctaPrimary")} <ActionIcon />
            </a>
            <Link className="btn btn--ghost" to="/#sobre">
              {t("hero.ctaSecondary")}
            </Link>
          </div>
          <p className="h-hero__tagline">{t("hero.tagline")}</p>
        </Reveal>

        <Reveal className="h-hero__visual" variant="scale" delay={120}>
          <figure className="h-flow" aria-label={t("hero.visualLabel")}>
            <ul className="h-flow__list">
              {pairs.map((pair) => (
                <li key={pair.from} className="h-flow__row">
                  <div className="h-flow__cell h-flow__cell--from">
                    <span className="h-flow__label">{t("hero.bottleneck")}</span>
                    <span className="h-flow__text">{pair.from}</span>
                  </div>
                  <span className="h-flow__arrow" aria-hidden="true">
                    →
                  </span>
                  <div className="h-flow__cell h-flow__cell--to">
                    <span className="h-flow__label">{t("hero.solution")}</span>
                    <span className="h-flow__text">{pair.to}</span>
                  </div>
                </li>
              ))}
            </ul>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
