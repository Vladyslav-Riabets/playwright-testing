export class GaragePage {
    constructor(page) {
        this.page = page;
        this.url = '/panel/garage';
        this.addCarButton = page.getByRole('button', {name: 'Add car'});
        this.brand = page.locator('select[name="carBrandId"]');
        this.model = page.locator('select[name="carModelId"]');
        this.mileage = page.locator('input[name="mileage"]');
        this.addButton = page.getByRole('button', {name: 'Add'});
        this.carItem = page.locator('ul.car-list li.car-item');
        this.carName = page.locator('.car_name.h2');
        this.editButton = page.locator('button.btn-edit');
        this.removeCarButton = page.getByRole('button', {name: 'Remove car'});
        this.removeButton = page.getByRole('button', {name: 'Remove'});
    };

    async checkUrl() {
        await this.page.waitForURL(this.url);
    };

    async addCarBtn() {
        await this.addCarButton.click();
    };

    async selectBrand(brand) {
        await this.brand.selectOption(brand);
    };

    async selectModel(model) {
        await this.model.selectOption(model);
    };

    async fillMileage(mileage) {
        await this.mileage.fill(mileage);
    };

    async submit() {
        await this.addButton.click();
    };

    async fillForm(brand, model, mileage) {
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.fillMileage(mileage);
    };

    async removeCar() {
        const firstCar = await this.carItem.first();
        
        
        await firstCar.hover();
        await firstCar.locator(this.editButton).click();
        await this.removeCarButton.click();
        await this.removeButton.click();
    };

    async carInfo() {
        const firstCar = await this.carItem.first();

        await firstCar.hover();
        return firstCar.locator(this.carName);
    };

};