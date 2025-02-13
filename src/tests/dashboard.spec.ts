import { test as base, expect, Page } from '@playwright/test';
import { DashBoardPage } from '../pages/DashBoardPage';
import { LoginPage } from '../pages/LoginPage';


type DashboardFxiture = {
    dashboardPage: DashBoardPage;
};

// Create a test fixture that handles login
const test = base.extend<DashboardFxiture>({
    dashboardPage: async ({ page }, use) => {
        // Navigate to the login page
        await page.goto('/client');
        
        // Login and get dashboard page
        const loginPage = new LoginPage(page);
        const dashboardPage = await loginPage.logInProcess(
            process.env.USEREMAIL!,
            process.env.PASSWORD!
        );

        // Provide the dashboard page to the test
        await use(dashboardPage);
    },
});



//positives
test('should add specific product to cart from search', async ({ dashboardPage }) => {
    const productName = 'ZARA COAT 3';
    await dashboardPage.searchProduct(productName);
    await dashboardPage.addToCart();
});

test('add all products to cart from dashboardPage', async ({ dashboardPage }) => {
    const booleanResult=true;
    const result=await dashboardPage.addToCart();
    await expect(result).toBe(booleanResult);
    console.log("All products added to cart");

});



//negatives
test('should fail to add non-existent product to cart', async ({ dashboardPage }) => {
    const nonExistentProduct = 'NonExistentProduct123';
    await dashboardPage.searchProduct(nonExistentProduct);
    await expect(dashboardPage.addToCart()).rejects.toThrow('No products found to add to cart');
});

test('should fail to add products to cart when cart', async ({ dashboardPage }) => {
    const booleanResult=true;
    const result=await dashboardPage.addToCart();
    await expect(result).toBe(booleanResult);
    if(result === true) {
        console.log("All products added to cart");
    }
});
