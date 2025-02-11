// Import required dependencies from Playwright test framework and custom page objects
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashBoardPage } from '../pages/DashBoardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';




test('Login', async ({ page }) => {
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    

});





// Test to verify environment variables are properly set
test('Test .env', async () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.USEREMAIL);
    console.log(process.env.PASSWORD);
});


test('Search', async ({ page }) => {
    const productName='ZARA COAT 3';
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    const dashBoardPage= new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    const result= await dashBoardPage.getFirstProductName();
    expect(result).toContain(productName);
   
});


test('Add To Cart Specific Product from Search', async ({ page }) => {
    const productName='ZARA COAT 3';
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    const dashBoardPage= new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.addToCart();
});

test('Add to Cart All Products from Page', async ({ page }) => {
    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    const dashBoardPage= new DashBoardPage(page);
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    const cartPage= new CartPage(page);
    await cartPage.getProductList();
});


test('Get Product List from Cart from Specifi Product', async ({ page }) => {
    const productName='ZARA COAT 3';

    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    const dashBoardPage= new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName)
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    const cartPage= new CartPage(page);
    await cartPage.getProductList();
});

test('Place Order', async ({ page }) => {
    const productName='ZARA COAT 3';

    await page.goto('/client');
    const loginPage= new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
    const dashBoardPage= new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName)
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    const cartPage= new CartPage(page);
    await cartPage.getProductList();
    await cartPage.goToCheckOutPage();
    const checkoutPage= new CheckoutPage(page);
    await checkoutPage.placeOrder("123","Alex Huerta" ,"Mexico");
    
});



