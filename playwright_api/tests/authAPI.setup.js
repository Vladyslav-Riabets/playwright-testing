import { test as setup, expect } from "@playwright/test";


const authFile = ".auth/loginAPI.json";
const email = process.env.TEST_USER
const password = process.env.TEST_PASS

setup("auth API", async ({ request }) => {

  const response = await request.post("/api/auth/signin", {
    data: { email, password, remember: false },
  });

  expect(response.ok()).toBeTruthy();


  await request.storageState({ path: authFile });

});
