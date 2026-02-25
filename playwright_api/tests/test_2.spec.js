import {test, expect} from "@playwright/test";

test.describe('TASK 2: car tests', () => {
    test('POSITIVE: create car', async ({request}) =>{
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 1,
            },
        });

        expect(response.ok()).toBe(true);
        const car = await response.json();
        expect(car.data.brand).toBe('Audi');
        expect(car.data.model).toBe('TT');
    });
});