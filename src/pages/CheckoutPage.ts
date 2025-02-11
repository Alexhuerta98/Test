import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CheckoutPage extends BasePage {

    private ccvCodeInput: Locator;

    private nameOnCard: Locator;

    private selectCountry: Locator;

    private placeHolderButton: Locator;



    constructor(page: Page) {

        super(page);

        this.ccvCodeInput = page.locator("(//input[@type='text'])[2]");

        this.nameOnCard = page.locator("(//input[@type='text'])[3]");

        this.selectCountry = page.locator("input[placeholder='Select Country']");

        this.placeHolderButton = page.locator(".btnn.action__submit.ng-star-inserted");



    }

    // Generic method to fill input fields
    private async fillInput(locator: Locator, fieldName: string, value: string) {
        try {
            await expect(locator).toBeVisible();
            await locator.fill(value);
        } catch (error) {
            throw new Error(`CheckoutPage.fillInput: Failed to fill ${fieldName}. Error: ${error.message}`);
        }
    }


    async fillCcvCode(value: string) {
        await this.fillInput(this.ccvCodeInput, "CCV code", value);
    }

    async fillNameOnCard(value: string) {
        await this.fillInput(this.nameOnCard, "Name on Card", value);
    }
    
    async fillselectCountry(contry: string) {
        await this.fillInput(this.selectCountry, "Name on Contry", contry);
    }



    async placeOrder(ccv: string, name: string, contry: string) {
        try {
            await expect(this.placeHolderButton).toBeVisible();
            await this.fillCcvCode(ccv);
            await this.fillNameOnCard(name);
            await this.fillselectCountry(contry)
            await this.placeHolderButton.click();
        } catch (error) {
            throw new Error(`CheckoutPage.placeOrder: Failed to click Place Order button. Error: ${error.message}`);
        }
    }


}