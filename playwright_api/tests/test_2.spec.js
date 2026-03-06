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

    test('NEGATIVE 1: should check error message: Car brand id is required', async ({request}) => {
        const response = await request.post('/api/cars', {
            data: {
                carModelId: 1,
                mileage: 1,               
            },
        });

        expect(response.status()).toBe(400);
        const error = await response.json();
        expect(error.message).toBe('Car brand id is required');
    });

    test('NEGATIVE 2: should check error for unexisted car brand', async ({request}) => {
        const response = await request.post('/api/cars', {
            data: {
                carBrandId: 7,
                carModelId: 1,
                mileage: 1,
            },
        });

        expect(response.status()).toBe(404);
        const error = await response.json();
        expect(error.message).toBe('Brand not found');
    });

});