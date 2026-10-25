import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import pt from "./pt.js";
import en from "./en.js";

const DICTS = { pt, en };
export const LANGS = ["pt", "en"];
const STORAGE_KEY = "wt-lang";

function readInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  // Portuguese is the site's default; switch only for visitors whose
  // browser doesn't prefer Portuguese.
  const nav = typeof navigator !== "undefined" ? navigator.language || "pt" : "pt";
  return nav.toLowerCase().startsWith("pt") ? "pt" : "en";
}

function resolve(dict, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), dict);
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const t = useCallback(
    (path) => {
      const value = resolve(DICTS[lang], path);
      if (value !== undefined) return value;
      const fallback = resolve(DICTS.pt, path);
      return fallback !== undefined ? fallback : path;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
