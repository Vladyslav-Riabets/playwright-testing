import { emailGenerator } from "../utils/emailGen";
import {expect} from '@playwright/test';

export class SignupPage {
    constructor(page) {
        this.page = page;
        this.name = page.locator('input[name="name"]');
        this.lastName = page.locator('input[name="lastName"]');
        this.email = page.locator('input[name="email"]');
        this.password = page.locator('input[name="password"]');
        this.rePassword = page.locator('input[name="repeatPassword"]');
        this.error = page.locator('.invalid-feedback');
        this.submitButton = page.getByRole('button', {name: 'Register'});
    };
    
    async open() {
        await this.page.getByRole('button', {name: 'Sign up'}).click();
    };

    async trigger() {
        await this.page.locator('.modal-header').click();
    };

    async fillName(name) {
        await this.name.fill(name);
    };
    
    async fillLastName(lastName) {
        await this.lastName.fill(lastName);
    };
    
    async fillEmail(email = null) {
        const typeValue = email ?? emailGenerator();
        await this.email.fill(typeValue);
    };

    async fillPassword(password) {
        await this.password.fill(password);
    };

    async fillRePassword(rePassword) {
        await this.rePassword.fill(rePassword);
    };

    async fillForm(name, lastName, password, rePassword) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(emailGenerator());
        await this.fillPassword(password);
        await this.fillRePassword(rePassword);
    };

    async submit() {
        await this.submitButton.click();
    };

    async expectError(message) {
        await expect(this.error).toHaveText(message);
        await expect(this.error).toHaveCSS('color', 'rgb(220, 53, 69)');
    };

}