// import {chromium} from '@playwright/test';


// export async function login() {
//   const browser = await chromium.launch();
//   const context = await browser.newContext({
//     httpCredentials: {
//       username: process.env.BASIC_AUTH_USER,
//       password: process.env.BASIC_AUTH_PASS,
//     },
//   });

//   const page = await context.newPage();
//   await page.goto('/');
// }

// helpers/login.js
import { chromium } from '@playwright/test';

export async function login() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    httpCredentials: {
      username: process.env.BASIC_AUTH_USER,
      password: process.env.BASIC_AUTH_PASS,
    },
  });

  const page = await context.newPage();
  await page.goto('/');

  // return everything you need
  return { browser, context, page };
}
