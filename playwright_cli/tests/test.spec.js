import { test, expect } from '@playwright/test';
import {SignupPage} from '../src/pages/SignupPage';
import data from '../src/fixtures/test_data.json'; 

let signupPage;

test.beforeEach(async ({page}) => {
  await page.goto('/');

  signupPage = new SignupPage(page);
  await signupPage.open();
});

test('Positive: valid user registration', async ({page}) => {
  const name = data.validUser.name;
  const lastName = data.validUser.lastName;
  const password = data.validUser.password;
  const rePassword = data.validUser.rePassword;

  await signupPage.fillForm(name, lastName, password, rePassword);
  await signupPage.submit();

  await expect(page).toHaveURL('/panel/garage');
})

test('should check "Name required" error', async ()=> {
  await signupPage.fillName(data.nameCases.empty.value);
  await signupPage.trigger();

  await signupPage.expectError(data.nameCases.empty.error);
});

test('should check "Name is invalid" error', async () => {
  await signupPage.fillName(data.nameCases.specSymbols.value);
  await signupPage.trigger();

  await signupPage.expectError(data.nameCases.specSymbols.error);
});

test('should check "Name has to be from 2 to 20 characters long" error', async () => {
  await signupPage.fillName(data.nameCases.tooLong.value);
  await signupPage.trigger();

  await signupPage.expectError(data.nameCases.tooLong.error);
});

test('should check "Last name required" error', async () => {
  await signupPage.fillLastName(data.lastNameCases.empty.value);
  await signupPage.trigger();

  await signupPage.expectError(data.lastNameCases.empty.error);
});

test('should check "Last name is invalid" error', async () => {
  await signupPage.fillLastName(data.lastNameCases.specSymbols.value);
  await signupPage.trigger();

  await signupPage.expectError(data.lastNameCases.specSymbols.error);
});

test('should check "Last name has to be from 2 to 20 characters long" error', async () => {
  await signupPage.fillLastName(data.lastNameCases.tooLong.value);
  await signupPage.trigger();

  await signupPage.expectError(data.lastNameCases.tooLong.error);
});

test('should check "Email required" error', async () => {
  await signupPage.fillEmail('');
  await signupPage.trigger();

  await signupPage.expectError(data.emailCases.empty.error);
});

test('should check "Email is incorrect" error', async () => {
  await signupPage.fillEmail(data.emailCases.noDomain.value);
  await signupPage.trigger();

  await signupPage.expectError(data.emailCases.noDomain.error);
});

test('should check "Password required" error', async () => {
  await signupPage.fillPassword(data.passCases.empty.value);
  await signupPage.trigger();

  await signupPage.expectError(data.passCases.empty.error);
});

test('should check "Password has to be from ..." error', async () => {
  await signupPage.fillPassword(data.passCases.tooLong.value);
  await signupPage.trigger();

  await signupPage.expectError(data.passCases.tooLong.error);
});

test('should check "Re-enter password required" error', async () => {
  await signupPage.fillRePassword(data.rePassCases.empty.value);
  await signupPage.trigger();

  await signupPage.expectError(data.rePassCases.empty.error);
});

test('should check "Password do not match" error', async () => {
  await signupPage.fillPassword(data.validUser.password);
  await signupPage.fillRePassword(data.rePassCases.mismatch.value);
  await signupPage.trigger();

  await signupPage.expectError(data.rePassCases.mismatch.error);
});

test('should check the "Register button" is disabled for invalid data', async () => {
  const name = data.invalidUser.name;
  const lastName = data.invalidUser.lastName;
  const email = data.invalidUser.email;
  const password = data.invalidUser.password;
  const rePassword = data.invalidUser.rePassword;
  
  await signupPage.fillForm(name, lastName, email, password, rePassword);

  await expect(signupPage.submitButton).toBeDisabled();
});





