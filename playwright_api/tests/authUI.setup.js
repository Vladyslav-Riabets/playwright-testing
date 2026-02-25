import {test as setup} from '@playwright/test';

const authFile = '.auth/loginUI.json';
const user = process.env.TEST_USER;
const pass = process.env.TEST_PASS;

setup('auth UI', async ({page}) => {

    await page.goto('/');
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page.locator('input[name="email"]').fill(user);
    await page.locator('input[name="password"]').fill(pass);
    await page.getByRole('button', {name: 'Login'}).click();

    await page.waitForURL('/panel/garage');

    await page.context().storageState({path: authFile});
});