import { Page, Locator } from "@playwright/test";
// Remove circular imports and use forward declarations
type DashBoardPage = import("./DashBoardPage").DashBoardPage;
type CartPage = import("./CartPage").CartPage;
type LoginPage = import("./LoginPage").LoginPage;

export class BasePage {

    //Selectors
     homeButtonHeader: Locator;
     ordersButtonHeader: Locator;
     cartButtonHeader: Locator;
     signOutButtonHeader: Locator;
    
    
     page: Page;

    constructor( page: Page) {
        this.page= page;
        this.homeButtonHeader= page.getByRole('button', { name: 'HOME' });
        this.ordersButtonHeader= page.getByRole('button', { name: 'ORDERS' });
        this.cartButtonHeader= page.locator(".btn.btn-custom[routerlink='/dashboard/cart']");
        this.signOutButtonHeader= page.getByRole('button', { name: 'Sign Out' });
    }




    async clickButtom(buttom:Locator){
        await buttom.click();
    }

    async clickHomeButtonHeader(): Promise<DashBoardPage> {
        await this.homeButtonHeader.click();
        const { DashBoardPage } = await import('./DashBoardPage');
        return new DashBoardPage(this.page);
    }

    /*

    async clickOrdersButtonHeader(): Promise<OrdersPage> {
        await this.ordersButtonHeader.click();
        const { OrdersPage } = await import('./OrdersPage');
        return new OrdersPage(this.page);
    }

    */

    
    async clickCartButtonHeader(): Promise<CartPage> {
        await this.cartButtonHeader.click();
        const { CartPage } = await import('./CartPage');
        return new CartPage(this.page);
    }

    async clickSighOutButtonHeader(): Promise<LoginPage> {
        await this.signOutButtonHeader.click();
        const { LoginPage } = await import('./LoginPage');
        return new LoginPage(this.page);
    }









}

