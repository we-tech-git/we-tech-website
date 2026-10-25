import { useI18n } from "../i18n/I18nContext.jsx";
import { useTheme } from "./ThemeContext.jsx";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const isLight = theme === "light";
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={isLight ? t("a11y.themeToDark") : t("a11y.themeToLight")}
      data-testid="theme-toggle"
    >
      {isLight ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  const next = lang === "pt" ? "en" : "pt";
  return (
    <button
      type="button"
      className="icon-btn icon-btn--text"
      onClick={() => setLang(next)}
      aria-label={t("a11y.langSwitchTo")}
      data-testid="lang-toggle"
    >
      <span aria-hidden="true">{next.toUpperCase()}</span>
    </button>
  );
}
