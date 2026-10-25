import { test, expect } from "@playwright/test";
import { ROUTES, seed } from "./helpers.js";

for (const theme of ["dark", "light"]) {
  for (const lang of ["pt", "en"]) {
    test.describe(`layout (${theme}/${lang})`, () => {
      for (const route of ROUTES) {
        test(`${route} sem overflow horizontal e sem texto cortado`, async ({ page, context }) => {
          await seed(context, { theme, lang });
          await page.goto(route);
          const { scrollW, clientW } = await page.evaluate(() => ({
            scrollW: document.documentElement.scrollWidth,
            clientW: document.documentElement.clientWidth,
          }));
          expect(scrollW).toBeLessThanOrEqual(clientW);
        });
      }
    });
  }
}

test.describe("responsividade da home", () => {
  test("header: menu mobile só no mobile/tablet estreito", async ({ page, context }, info) => {
    await seed(context);
    await page.goto("/");
    const toggle = page.locator(".nav__toggle");
    const links = page.locator(".nav__links");
    if (info.project.name === "desktop") {
      await expect(links).toBeVisible();
      await expect(toggle).toBeHidden();
    } else if (info.project.name === "mobile") {
      await expect(links).toBeHidden();
      await expect(toggle).toBeVisible();
    }
  });

  test("menu mobile abre, fecha com Esc e devolve o scroll", async ({ page, context }, info) => {
    test.skip(info.project.name === "desktop");
    await seed(context);
    await page.goto("/");
    const toggle = page.locator(".nav__toggle");
    test.skip(!(await toggle.isVisible()));
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("toggles de tema e idioma ficam visíveis em qualquer largura", async ({ page, context }) => {
    await seed(context);
    await page.goto("/");
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
    await expect(page.getByTestId("lang-toggle")).toBeVisible();
  });

  test("grades reorganizam por breakpoint", async ({ page, context }, info) => {
    await seed(context);
    await page.goto("/");
    const cols = await page.locator(".why-grid").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").length);
    const expected = { desktop: 12, tablet: 1, mobile: 1 }[info.project.name];
    expect(cols).toBe(expected);
  });

  test("alvos de toque do header têm pelo menos 40px", async ({ page, context }, info) => {
    test.skip(info.project.name !== "mobile");
    await seed(context);
    await page.goto("/");
    for (const id of ["theme-toggle", "lang-toggle"]) {
      const box = await page.getByTestId(id).boundingBox();
      expect(box.width).toBeGreaterThanOrEqual(40);
      expect(box.height).toBeGreaterThanOrEqual(40);
    }
  });
});
