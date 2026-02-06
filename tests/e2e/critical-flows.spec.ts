import { expect, test } from "@playwright/test";

test("navigates to project detail", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /open project/i }).first().click();
  await expect(page).toHaveURL(/\/projects\/[^/]+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("shows 404 for invalid project slug", async ({ page }) => {
  await page.goto("/projects/nonexistent-project-xyz");
  await expect(page.getByRole("heading", { level: 1, name: /404/i })).toBeVisible();
});

test("restores scroll after reload", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    window.scrollTo(0, 900);
  });
  await page.waitForTimeout(120);

  await page.reload();
  await page.waitForTimeout(120);

  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(400);
});

test("persists theme across reload", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /select theme/i }).click();
  await page.getByRole("menuitem", { name: /dark/i }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
