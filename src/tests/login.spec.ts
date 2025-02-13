// Import required dependencies from Playwright test framework and custom page objects
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';



//positives
test('Login', async ({ page }) => {
    await page.goto('/client');
    const loginPage = new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
});



//negatives

test('Login with invalid email', async ({ page }) => {
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess('invalid@example.com', process.env.PASSWORD!);
    const errorMessage= await loginPage.getErrorMessagePopUp();
    await page.screenshot({path: 'screenshots/screenshot.png'});
    expect(errorMessage).toContain('Incorrect email or password.');
});  

test('Login with invalid password', async ({ page }) => {
    await page.goto('/client');
    const loginPage = new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, 'invalidpassword');
    const errorMessage = await loginPage.getErrorMessagePopUp();
    expect(errorMessage).toContain('Incorrect email or password.');
}); 

test('Login with empty email', async ({ page }) => {
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess('', process.env.PASSWORD!);
    const errorMessage= await loginPage.getErrorMessageNoEmail();
    expect(errorMessage).toContain('*Email is required');
});

test('Login with empty password', async ({ page }) => {
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, '');
    const errorMessage= await loginPage.getErrorMessageNoPassword();
    expect(errorMessage).toContain('*Password is required');
});     


