import { test, expect } from '../src/fixtures/userGaragePage';

test('should add car to garage', async ({ userGaragePage}) => {
    
    await userGaragePage.addCarBtn();
    await userGaragePage.fillForm('Audi', 'TT', '1');
    await userGaragePage.submit();
    const carInfo = await userGaragePage.carInfo();

    expect(carInfo).toHaveText('Audi TT');
});
