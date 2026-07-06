import { test, expect } from '@playwright/test';


test('Verify error message', async function({page}) {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    await page.getByPlaceholder("Username").type('Admin');

    await page.locator("input[name='password']").type("asdasdsads")

    await page.locator("//button[normalize-space()='Login']").click()


    const errorMessage = await page.locator("//p[contains(@class, 'alert-content-text')]").textContent()

    console.log("Error message is "+ errorMessage);

    expect(errorMessage?.includes("Invalid")).toBeTruthy();
    expect(errorMessage === "Invalid credentials").toBeTruthy();
    

})