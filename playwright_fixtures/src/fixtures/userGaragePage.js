import {expect, test as base} from '@playwright/test';
import {GaragePage} from '../pages/GaragePage';

export const test = base.extend({
    userGaragePage: async({page}, use) => {
        const garagePage = new GaragePage(page);
        await page.goto('/panel/garage');
        await garagePage.checkUrl();
        await use(garagePage);
        await garagePage.removeCar();
    },
});

export {expect};
