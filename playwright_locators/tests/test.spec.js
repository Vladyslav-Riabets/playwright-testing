import { test, expect } from '@playwright/test';
import {login} from '../helpers/login';
import {generateEmail} from '../utils/emailGenerator';
import data from '../fixtures/test_data.json';

let page, context, browser;

test.beforeEach(async () => {
  const loginResult = await login();
  page = loginResult.page;
  context = loginResult.context;
  browser = loginResult.browser;

  await page.getByRole('button', {name: 'Sign up'}).click();
});

test.afterEach(async () => {
  await browser.close();
});

test('Positive: valid user registration', async () => {

  await page.locator('input[name="name"]').fill(data.validUser.name);
  await page.locator('input[name="lastName"]').fill(data.validUser.lastName);
  await page.locator('input[name="email"]').fill(generateEmail());
  await page.locator('input[name="password"]').fill(data.validUser.password);
  await page.locator('input[name="repeatPassword"]').fill(data.validUser.rePassword);

  await page.getByRole('button', {name: 'Register'}).click();

  await expect(page).toHaveURL('/panel/garage');
});

test('should check "Name required" error', async () => {
  await page.locator('input[name="name"]').click();
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.nameCases.empty.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Name has to be from 2 to 20 characters long" error', async () => {
  await page.locator('input[name="name"]').fill(data.nameCases.oneChar.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.nameCases.oneChar.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Name is invalid" error', async () => {
  await page.locator('input[name="name"]').fill(data.nameCases.specSymbols.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.nameCases.specSymbols.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Last name required" error', async () => {
  await page.locator('input[name="lastName"]').click();
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.lastNameCases.empty.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Last name has to be from 2 to 20 characters long" error', async () => {
  await page.locator('input[name="lastName"]').fill(data.lastNameCases.oneChar.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.lastNameCases.oneChar.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Last name is invalid" error', async () => {
  await page.locator('input[name="lastName"]').fill(data.lastNameCases.specSymbols.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.lastNameCases.specSymbols.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Email required', async () => {
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="name"]').click();

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.emailCases.empty.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Email is incorrect" error', async () => {
  await page.locator('input[name="email"]').fill(data.emailCases.noDomain.value);
  await page.locator('input[name="name"]').click();

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.emailCases.noDomain.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Password has to be from ..." error', async () => {
  await page.locator('input[name="password"]').fill(data.passCases.tooLong.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.passCases.tooLong.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Password required" error', async () => {
  await page.locator('input[name="password"]').click();
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.passCases.empty.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Re-enter password required" error', async () => {
  await page.locator('input[name="repeatPassword"]').click();
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.rePassCases.empty.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check "Passwords do not match" error', async () => {
  await page.locator('input[name="password"]').fill(data.validUser.password);
  await page.locator('input[name="repeatPassword"]').fill(data.rePassCases.mismatch.value);
  await page.locator('.modal-body').click(0, 0);

  const error = page.locator('.invalid-feedback');
  await expect(error).toHaveText(data.rePassCases.mismatch.error);
  await expect(error).toHaveCSS('color', 'rgb(220, 53, 69)');
})

test('should check the "Register button" is disabled for invalid data', async () => {
  const button = page.getByRole('button', {name: 'Register'});

  await expect(button).toBeDisabled();
})







