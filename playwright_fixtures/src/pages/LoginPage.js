export class LoginPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('input[name="email"]');
        this.password = page.locator('input[name="password"]');
        this.signinButton = page.locator('button.header_signin');
        this.submitButton = page.getByRole('button', {name: 'Login'});
    };

    async getLoginForm() {
        await this.signinButton.click();
    };

    async fillEmail(email) {
        await this.email.fill(email);
    };

    async fillPassword(password) {
        await this.password.fill(password);
    };
    
    async submit() {
        await this.submitButton.click();
    };

    async fillForm(email, password) {
        await this.fillEmail(email);
        await this.fillPassword(password);
    };
};