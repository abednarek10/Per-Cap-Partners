import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const leadsFile = path.join(process.cwd(), ".data", "leads.jsonl");
const readLeads = async () => (await readFile(leadsFile, "utf8").catch(() => "")).split("\n").filter(Boolean).map((l) => JSON.parse(l));

// Each test gets a unique client IP so the per-IP rate limit doesn't bleed across tests.
let ipCounter = 0;
test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `203.0.113.${(Date.now() + ++ipCounter) % 250}` });
});

async function fill(page: Page, overrides: Record<string, string> = {}) {
  const v = {
    name: "Jamie Rivera",
    email: `gm+${Date.now()}@example.com`,
    role: "General Manager",
    venueName: "The Velvet Room",
    city: "Austin",
    ...overrides,
  };
  await page.getByLabel("Your name").fill(v.name);
  await page.getByLabel("Work email").fill(v.email);
  await page.getByLabel("Your role").fill(v.role);
  await page.getByLabel("Venue name").fill(v.venueName);
  await page.getByLabel("City", { exact: true }).fill(v.city);
  await page.getByLabel("Capacity", { exact: true }).selectOption("300–750");
  await page.getByLabel("Ticketed shows per year").selectOption("150–250");
  return v;
}

test.describe.configure({ mode: "serial" });

test("valid submission is stored and confirmed", async ({ page }) => {
  await page.goto("/contact");
  const v = await fill(page);
  await page.getByRole("button", { name: "Get my free revenue audit" }).click();
  await expect(page.getByRole("status")).toContainText("Thanks");
  const leads = await readLeads();
  const saved = leads.find((l) => l.email === v.email);
  expect(saved).toBeTruthy();
  expect(saved.ipHash).toMatch(/^[0-9a-f]{64}$/); // hashed, never raw IP
  expect(JSON.stringify(saved)).not.toContain("203.0.113.");
});

test("invalid submission shows field errors and keeps entered values", async ({ page }) => {
  await page.goto("/contact");
  await fill(page, { email: "not-an-email" });
  await page.getByRole("button", { name: "Get my free revenue audit" }).click();
  await expect(page.locator("#form-error")).toContainText("fix the highlighted fields");
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Venue name")).toHaveValue("The Velvet Room");
  await expect(page.getByLabel("Capacity", { exact: true })).toHaveValue("300–750");
});

test("honeypot submission looks successful but is not stored", async ({ page }) => {
  await page.goto("/contact");
  const v = await fill(page);
  await page.locator("#website").evaluate((el: HTMLInputElement) => (el.value = "http://spam.example"));
  await page.getByRole("button", { name: "Get my free revenue audit" }).click();
  await expect(page.getByRole("status")).toContainText("Thanks");
  expect((await readLeads()).some((l) => l.email === v.email)).toBe(false);
});
