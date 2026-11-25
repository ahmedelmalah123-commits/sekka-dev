import fs from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const systemChromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const useSystemChrome =
  !process.env.CI && process.platform === "win32" && fs.existsSync(systemChromePath);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    ...(useSystemChrome ? { channel: "chrome" } : {}),
  },
  webServer: {
    command: "pnpm start --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      ...process.env,
      ENABLE_STYLEGUIDE: process.env.ENABLE_STYLEGUIDE ?? "true",
    },
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
        ...(useSystemChrome ? { channel: "chrome" } : {}),
      },
    },
    {
      name: "mobile-chromium",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
        ...(useSystemChrome ? { channel: "chrome" } : {}),
      },
    },
  ],
});
