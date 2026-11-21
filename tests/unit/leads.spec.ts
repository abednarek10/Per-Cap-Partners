import { test, expect } from "@playwright/test";
import { leadSchema } from "@/lib/leads/schema";
import { createRateLimiter } from "@/lib/leads/rate-limit";

const valid = {
  name: "Jamie Rivera",
  email: "  Jamie@Example.COM ",
  role: "General Manager",
  venueName: "The Velvet Room",
  city: "Austin",
  capacity: "300–750",
  showsPerYear: "150–250",
  message: "",
  website: "",
};

test.describe("lead schema", () => {
  test("accepts a valid lead and normalizes email", () => {
    const r = leadSchema.safeParse(valid);
    expect(r.success).toBe(true);
    expect(r.success && r.data.email).toBe("jamie@example.com");
  });

  test("rejects a bad email", () => {
    const r = leadSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0]?.path[0]).toBe("email");
  });

  test("rejects values outside the allowed options", () => {
    expect(leadSchema.safeParse({ ...valid, capacity: "huge" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, showsPerYear: "1000" }).success).toBe(false);
  });

  test("rejects a filled honeypot", () => {
    const r = leadSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(r.success).toBe(false);
    expect(r.error?.issues.some((i) => i.path[0] === "website")).toBe(true);
  });

  test("caps oversized fields", () => {
    expect(leadSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });
});

test.describe("rate limiter", () => {
  test("allows up to the limit then blocks until the window resets", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("a", 10).ok).toBe(true);
    const blocked = check("a", 20);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterMs).toBe(980);
    expect(check("b", 20).ok).toBe(true); // keys are independent
    expect(check("a", 1001).ok).toBe(true); // window reset
  });
});
