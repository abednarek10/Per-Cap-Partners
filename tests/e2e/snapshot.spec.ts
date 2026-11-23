import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import path from "node:path";

const leadsFile = path.join(process.cwd(), ".data", "leads.jsonl");
const readLeads = async () => (await readFile(leadsFile, "utf8").catch(() => "")).split("\n").filter(Boolean).map((l) => JSON.parse(l));

// A unique client IP per test keeps the per-IP rate limit from bleeding across tests.
let n = 0;
test.beforeEach(async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `198.51.100.${(Date.now() + ++n) % 250}` });
});

async function fill(page: Page, overrides: Record<string, string> = {}) {
  const v = { name: "Jamie Rivera", email: `ops+${Date.now()}@example.com`, role: "Finance lead", company: "Riverside Venue Group", city: "Milwaukee", ...overrides };
  await page.getByLabel("Your name").fill(v.name);
  await page.getByLabel("Work email").fill(v.email);
  await page.getByLabel("Your role").fill(v.role);
  await page.getByLabel("Venue group").fill(v.company);
  await page.getByLabel("Main city").fill(v.city);
  await page.getByLabel("Rooms you operate").selectOption("3–5 rooms");
  await page.getByLabel("Interested in").selectOption("Free snapshot");
  return v;
}

test.describe.configure({ mode: "serial" });

test("a valid snapshot request is stored with a hashed IP", async ({ page }) => {
  await page.goto("/snapshot");
  const v = await fill(page);
  await page.getByRole("button", { name: "Request my snapshot" }).click();
  await expect(page.getByRole("status")).toContainText("we've got your request");
  const saved = (await readLeads()).find((l) => l.email === v.email);
  expect(saved).toBeTruthy();
  expect(saved.rooms).toBe("3–5 rooms");
  expect(saved.ipHash).toMatch(/^[0-9a-f]{64}$/);
  expect(JSON.stringify(saved)).not.toContain("198.51.100.");
});

test("invalid input shows field errors and keeps what was typed", async ({ page }) => {
  await page.goto("/snapshot");
  await fill(page, { email: "not-an-email" });
  await page.getByRole("button", { name: "Request my snapshot" }).click();
  await expect(page.locator("#form-error")).toContainText("fix the highlighted fields");
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByLabel("Venue group")).toHaveValue("Riverside Venue Group");
  await expect(page.getByLabel("Rooms you operate")).toHaveValue("3–5 rooms");
});

test("a honeypot submission looks successful but is not stored", async ({ page }) => {
  await page.goto("/snapshot");
  const v = await fill(page);
  await page.locator("#website").evaluate((el: HTMLInputElement) => (el.value = "http://spam.example"));
  await page.getByRole("button", { name: "Request my snapshot" }).click();
  await expect(page.getByRole("status")).toBeVisible();
  expect((await readLeads()).some((l) => l.email === v.email)).toBe(false);
});
