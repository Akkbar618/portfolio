import { expect, test } from "@playwright/test";

test("home renders hero content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /akbar/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /selected works/i })).toBeVisible();
});
