import { test, expect } from '@playwright/test';

test('TASK 1: user data substitution', async ({ page }) => {
  const mockResponse = {
    status: 'ok',
    data: {
      userId: 123456,
      photoFilename: 'default-user.png',
      name: 'John',
      lastName: 'Smith',
    }
  };

  await page.route('**/api/users/profile', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  await page.goto('/panel/profile');
  await expect(page.locator('p.profile_name')).toHaveText('John Smith');
});
