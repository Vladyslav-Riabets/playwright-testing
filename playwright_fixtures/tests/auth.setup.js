import {test as setup} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage';

const authFile = '.auth/login.json';
const user = process.env.TEST_USER;
const pass = process.env.TEST_PASS;

setup('authentication', async ({page}) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.getLoginForm();
    await loginPage.fillForm(user, pass);
    await loginPage.submit();

    await page.waitForURL('/panel/garage');

    await page.context().storageState({path: authFile});
});