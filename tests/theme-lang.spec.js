import { test, expect } from "@playwright/test";
import { COLORS, bg, seed } from "./helpers.js";

test.describe("tema claro/escuro", () => {
  test("padrão é escuro e usa as cores da marca", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await bg(page)).toBe(COLORS.dark.canvas);
    const color = await page.locator("body").evaluate((el) => getComputedStyle(el).color);
    expect(color).toBe(COLORS.dark.textPrimary);
  });

  test("toggle alterna para claro, persiste e volta", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bg(page)).toBe(COLORS.light.canvas);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bg(page)).toBe(COLORS.light.canvas);
    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("tema salvo é aplicado antes da hidratação (sem flash)", async ({ page, context }) => {
    await seed(context, { theme: "light" });
    await page.goto("/", { waitUntil: "commit" });
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe("light");
  });

  for (const theme of ["dark", "light"]) {
    test(`botão primário mantém a cor de marca (${theme})`, async ({ page, context }) => {
      await seed(context, { theme });
      await page.goto("/");
      const btn = page.locator(".h-hero__actions .btn--primary");
      expect(await btn.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(COLORS.accent);
      // text on the orange button must stay dark in both themes
      expect(await btn.evaluate((el) => getComputedStyle(el).color)).toBe("rgb(11, 13, 16)");
    });

    test(`seções alternadas e cartões usam tokens (${theme})`, async ({ page, context }) => {
      await seed(context, { theme });
      await page.goto("/");
      const canvas = await bg(page, ".h-hero");
      expect(canvas).toBe(COLORS[theme].canvas);
      const alt = await bg(page, "#solucoes");
      expect(alt).not.toBe(canvas);
    });
  }
});

test.describe("idioma PT/EN", () => {
  test("padrão pt-BR e html lang correto", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  });

  test("toggle troca todo o conteúdo para inglês e persiste", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("lang-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText("Technology for businesses that already work.");
    await expect(page).toHaveTitle(/Technology for businesses that already work/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /We Tech finds where technology/);
    await page.reload();
    await expect(page.locator("h1")).toHaveText("Technology for businesses that already work.");
  });

  test("não sobra texto em português na home em inglês", async ({ page, context }) => {
    await seed(context, { lang: "en" });
    await page.goto("/");
    const text = await page.locator("main").innerText();
    for (const pt of ["Soluções", "Gargalo", "Conheça", "Vamos conversar", "negócio"]) {
      expect(text).not.toContain(pt);
    }
  });

  test("projetos e 404 também são traduzidos", async ({ page, context }) => {
    await seed(context, { lang: "en" });
    await page.goto("/projetos/lelume");
    await expect(page.getByRole("link", { name: /Visit site/ })).toBeVisible();
    await page.goto("/nada");
    await expect(page.locator("h1")).toHaveText("Page not found");
  });

  test("idiomas têm exatamente as mesmas chaves", async () => {
    const { default: pt } = await import("../src/i18n/pt.js");
    const { default: en } = await import("../src/i18n/en.js");
    const shape = (o) =>
      Array.isArray(o)
        ? [o.length, ...o.map(shape)]
        : o && typeof o === "object"
        ? Object.fromEntries(Object.keys(o).sort().map((k) => [k, shape(o[k])]))
        : typeof o;
    expect(shape(en)).toEqual(shape(pt));
  });
});
