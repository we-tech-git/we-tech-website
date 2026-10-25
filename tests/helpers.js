// Source-of-truth brand colors for the color tests (mirror index.css / light.css).
export const COLORS = {
  dark: { canvas: "rgb(11, 13, 16)", textPrimary: "rgb(241, 240, 236)" },
  light: { canvas: "rgb(246, 245, 241)", textPrimary: "rgb(20, 23, 28)" },
  accent: "rgb(255, 77, 0)",
};

export const ROUTES = ["/", "/projetos", "/projetos/lelume", "/projetos/maria-mariana", "/projetos/we-party"];

// Pre-seeds theme/language before any page script runs.
export async function seed(context, { theme = "dark", lang = "pt" } = {}) {
  await context.addInitScript(
    ([t, l]) => {
      try {
        localStorage.setItem("wt-theme", t);
        localStorage.setItem("wt-lang", l);
      } catch {}
    },
    [theme, lang]
  );
}

export const bg = (page, selector = "body") =>
  page.locator(selector).first().evaluate((el) => getComputedStyle(el).backgroundColor);
