import { test, expect } from '@playwright/test';

test('TASK 1: user data substitution', async ({ page }) => {
  const userData = {
    userId: 123456,
    photoFilename: 'default-user.png',
    name: 'John',
    lastName: 'Smith',
  };

  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      json: userData,
    });
  });

  const responsePromise = page.waitForResponse('**/api/users/profile');

  await page.goto('/panel/profile');

  const response = await responsePromise;
  const json = await response.json();

  expect(json.name).toBe('John');
  expect(json.lastName).toBe('Smith');
});
