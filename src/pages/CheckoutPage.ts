import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CheckoutPage extends BasePage {
    // Locators for checkout form elements
    private ccvCodeInput: Locator;
    private nameOnCard: Locator;
    private selectCountry: Locator;
    private placeHolderButton: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize locators using XPath and CSS selectors
        this.ccvCodeInput = page.locator("(//input[@type='text'])[2]");
        this.nameOnCard = page.locator("(//input[@type='text'])[3]");
        this.selectCountry = page.locator("input[placeholder='Select Country']");
        this.placeHolderButton = page.locator(".btnn.action__submit.ng-star-inserted");
    }

    /**
     * Generic method to fill input fields with error handling
     * @param locator - The Playwright locator for the input field
     * @param fieldName - Name of the field for error messaging
     * @param value - Value to be entered in the field
     */
    private async fillInput(locator: Locator, fieldName: string, value: string) {
        try {
            await expect(locator).toBeVisible();
            await locator.fill(value);
        } catch (error) {
            throw new Error(`CheckoutPage.fillInput: Failed to fill ${fieldName}. Error: ${error.message}`);
        }
    }

    /**
     * Fills the CCV code field
     * @param value - The CCV code to enter
     */
    async fillCcvCode(value: string) {
        await this.fillInput(this.ccvCodeInput, "CCV code", value);
    }

    /**
     * Fills the name on card field
     * @param value - The cardholder name to enter
     */
    async fillNameOnCard(value: string) {
        await this.fillInput(this.nameOnCard, "Name on Card", value);
    }
    
    /**
     * Fills the country selection field
     * @param country - The country to select
     */
    async fillSelectCountry(country: string) {
        await this.fillInput(this.selectCountry, "Country Selection", country);
    }

    /**
     * Completes the checkout process by filling all required fields and placing the order
     * @param ccv - The CCV code
     * @param name - The cardholder name
     * @param country - The country for shipping
     * @throws Error if any step in the checkout process fails
     */
    async placeOrder(ccv: string, name: string, country: string) {
        try {
            await expect(this.placeHolderButton).toBeVisible();
            await this.fillCcvCode(ccv);
            await this.fillNameOnCard(name);
            await this.fillSelectCountry(country);
            await this.placeHolderButton.click();
        } catch (error) {
            throw new Error(`CheckoutPage.placeOrder: Failed to click Place Order button. Error: ${error.message}`);
        }
    }
}