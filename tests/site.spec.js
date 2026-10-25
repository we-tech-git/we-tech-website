import { test, expect } from "@playwright/test";
import { ROUTES, seed } from "./helpers.js";

test.describe("rotas e renderização", () => {
  for (const route of ROUTES) {
    test(`${route} carrega sem erros de console`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      const res = await page.goto(route);
      expect(res.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main#main")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("imagens dos projetos carregam", async ({ page }) => {
    await page.goto("/projetos");
    const imgs = page.locator(".pg__item-img");
    await expect(imgs).toHaveCount(3);
    for (const img of await imgs.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  });

  test("rota inexistente mostra 404 com noindex e sem canonical", async ({ page }) => {
    await page.goto("/rota-que-nao-existe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página não encontrada");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test("slug de projeto inexistente também é 404", async ({ page }) => {
    await page.goto("/projetos/nao-existe");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("canonical por rota", async ({ page }) => {
    for (const [route, expected] of [
      ["/", "https://www.wetechhub.com.br/"],
      ["/projetos", "https://www.wetechhub.com.br/projetos"],
      ["/projetos/lelume", "https://www.wetechhub.com.br/projetos/lelume"],
    ]) {
      await page.goto(route);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expected);
    }
  });

  test("robots.txt e sitemap.xml são servidos", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap: https://www.wetechhub.com.br/sitemap.xml");
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.headers()["content-type"]).toContain("xml");
    expect(await sitemap.text()).toContain("/projetos/lelume");
  });
});

test.describe("conteúdo e posicionamento", () => {
  test("hero comunica o posicionamento e o CTA envia e-mail", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Tecnologia para negócios que já funcionam.");
    const cta = page.getByRole("link", { name: "Quero falar sobre meu negócio" });
    await expect(cta).toHaveAttribute("href", /^mailto:contact@wetechhub\.com\.br\?subject=/);
  });

  test("todas as seções da narrativa existem, em ordem", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    const ids = await page.locator("main section").evaluateAll((els) => els.slice(1).map((e) => e.id || e.className.split(" ").find((c) => c.startsWith("h-principle"))));
    expect(ids).toEqual(["problemas", "solucoes", "h-principle", "processo", "cases", "sobre", "para-quem", "contato"]);
    await expect(page.locator("main section").first()).toHaveClass(/hero/);
  });

  test("não há métricas inventadas na home", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/\d+\s?%/);
    expect(text).not.toMatch(/\d+\s?x\b/i);
  });

  test("cases levam às páginas dos projetos", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    await page.locator("#cases .h-case__link").first().click();
    await expect(page).toHaveURL(/\/projetos\/lelume$/);
    await expect(page.locator("h1")).toHaveText("Lelume");
  });
});

test.describe("navegação", () => {
  test("links de âncora do header chegam às seções", async ({ page, context }, info) => {
    await seed(context);
    await page.goto("/");
    if (info.project.name === "mobile") {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.locator("#mobile-nav").getByRole("link", { name: "Cases" }).click();
    } else {
      await page.locator(".nav__links").getByRole("link", { name: "Cases" }).click();
    }
    await expect(page).toHaveURL(/#cases$/);
    await expect(page.locator("#cases")).toBeInViewport({ ratio: 0.1 });
  });

  test("skip link leva ao conteúdo principal", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});
