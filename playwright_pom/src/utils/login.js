import { chromium } from '@playwright/test';

export async function loginApp() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    httpCredentials: {
      username: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
    },
  });

  const page = await context.newPage();
  await page.goto('/');

  // return everything you need
  return { browser, context, page };
}