import { defineConfig } from "@playwright/test";

// Uses the system Chrome so no browser download is needed.
// CI can set PW_CHANNEL="" and run `npx playwright install chromium` instead.
const channel = process.env.PW_CHANNEL === undefined ? "chrome" : process.env.PW_CHANNEL || undefined;
const PORT = 4173;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel,
    locale: "pt-BR",
    reducedMotion: "reduce", // reveal animations off => deterministic
  },
  webServer: {
    command: `npm run build && npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "tablet", use: { viewport: { width: 820, height: 1180 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
});
