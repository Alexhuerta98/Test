// Import required dependencies from Playwright test framework and custom page objects
import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashBoardPage } from '../pages/DashBoardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Setup común para todos los tests
test.beforeEach(async ({ page }) => {
    await page.goto('/client');
    const loginPage = new LoginPage(page);
    await loginPage.logInProcess(process.env.USEREMAIL!, process.env.PASSWORD!);
});

test('should successfully log in to the application', async ({ page }) => {
    // Agregar assertion para verificar login exitoso
    const dashBoardPage = new DashBoardPage(page);
    await expect(page).toHaveURL(/.*dashboard/); // Ajusta según tu URL real
});

test('should find specific product in search results', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    const result = await dashBoardPage.getFirstProductName();
    expect(result).toContain(productName);
});

test('should add specific product to cart from search', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.addToCart();
    // Agregar assertion para verificar que el producto se agregó al carrito
    const cartPage = new CartPage(page);
    await dashBoardPage.clickCartButtonHeader();
    const products = await cartPage.getProductList();
    expect(products).toContainEqual(expect.objectContaining({ name: productName }));
});

// Test to verify environment variables are properly set
test('Test .env', async () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.USEREMAIL);
    console.log(process.env.PASSWORD);
});

test('Search', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    const result = await dashBoardPage.getFirstProductName();
    expect(result).toContain(productName);
});

test('Add to Cart All Products from Page', async ({ page }) => {
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    const cartPage = new CartPage(page);
    await cartPage.getProductList();
});

test('Get Product List from Cart from Specifi Product', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    const cartPage = new CartPage(page);
    await cartPage.getProductList();
});

test('should successfully place an order', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.addToCart();
    await dashBoardPage.clickCartButtonHeader();
    
    const cartPage = new CartPage(page);
    await cartPage.getProductList();
    await cartPage.goToCheckOutPage();
    
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.placeOrder("123", "Alex Huerta", "Mexico");
    

});



