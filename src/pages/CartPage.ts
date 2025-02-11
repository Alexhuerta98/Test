import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage extends BasePage{

    private checkoutButton: Locator;
    private productList: Locator;

    constructor(page: Page){
        super(page);
        this.checkoutButton= page.getByRole('button', { name: 'Checkout' });
        this.productList= page.locator("ul[class='cartWrap ng-star-inserted']");
    }

    async clickCheckoutButton(){
        await this.clickButtom(this.checkoutButton);
        //return new CheckoutPage(this.page);
    }

    async getProductList(): Promise<boolean>{
        
        try{
        await this.page.waitForTimeout(1000);
        const productList= await this.productList.all();
        
        if (productList.length === 0) {
            throw new Error('No se encontraron productos en la lista.');
        }
        for(const product of productList){
            const productName= await product.locator('h3').innerText();
            console.log(productName);
        }
        return true;
    }catch (error){
        throw new Error(`Failed to return list of Products ${error.message}`);
    }


    }

    async goToCheckOutPage(): Promise<CheckoutPage>{
        this.clickCheckoutButton();
        return new CheckoutPage(this.page);
        }
    











}