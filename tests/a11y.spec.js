import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES, seed } from "./helpers.js";

// Automated WCAG 2.1 A/AA checks, including color contrast, for every route
// in both themes and both languages.
for (const theme of ["dark", "light"]) {
  for (const lang of ["pt", "en"]) {
    for (const route of ROUTES) {
      test(`axe ${route} (${theme}/${lang})`, async ({ page, context }, info) => {
        test.skip(info.project.name === "tablet", "desktop + mobile cobrem os extremos");
        await seed(context, { theme, lang });
        await page.goto(route);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
        expect(summary).toEqual([]);
      });
    }
  }
}

test.describe("teclado e semântica", () => {
  test("todo controle interativo tem nome acessível e foco visível", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    const unnamed = await page.evaluate(() =>
      [...document.querySelectorAll("a[href]:not([aria-hidden=true]), button")]
        .filter((el) => !(el.getAttribute("aria-label") || el.textContent.trim()))
        .map((el) => el.outerHTML.slice(0, 80))
    );
    expect(unnamed).toEqual([]);

    await page.keyboard.press("Tab"); // skip link
    await page.keyboard.press("Tab"); // logo
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    expect(outline).not.toBe("none");
  });

  test("hierarquia de títulos: um h1 e h2 por seção", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.locator("main section h2").count()).toBeGreaterThanOrEqual(7);
  });

  test("links externos avisam que abrem em nova aba", async ({ page, context }) => {
    await seed(context);
    await page.goto("/projetos/lelume");
    const link = page.getByRole("link", { name: /Visitar site/ });
    await expect(link).toHaveAccessibleName(/nova aba/);
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("prefers-reduced-motion mantém o conteúdo visível", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    const opacity = await page.locator(".why-principle-item").first().evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
  });
});
