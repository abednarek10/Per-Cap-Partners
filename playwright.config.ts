import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);

export default defineConfig({
  reporter: process.env.CI ? "github" : "list",
  fullyParallel: true,
  use: { baseURL: `http://localhost:${PORT}`, trace: "off" },
  projects: [
    { name: "unit", testDir: "./tests/unit" },
    { name: "e2e", testDir: "./tests/e2e", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.argv.includes("--project=unit")
    ? undefined
    : {
        command: `npx next start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        // File fallback lets the form test run against a production build without a database.
        env: { LEADS_FILE_FALLBACK: "1", LEAD_IP_SALT: "test-salt" },
        timeout: 60_000,
      },
});
