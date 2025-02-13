import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";


export class DashBoardPage extends BasePage{

    //Page element selectors
    private searchInputSelector: Locator;      // Search input field
    private resultItemsSelector: Locator;      // Product cards container
    private addToCartButtonSelector: Locator; // Add to cart button

    /**
     * Initialize DashboardPage with Playwright Page object
     * @param page Playwright Page instance
     */
    constructor(page: Page){
        super(page);
        // Initialize page elements using Playwright selectors
        this.searchInputSelector = page.getByRole('textbox', { name: 'search' })
        this.resultItemsSelector =this.page.locator("div[class='card']");
        this.addToCartButtonSelector = page.locator("button[class='btn w-10 rounded']");
    }

    /**
     * Performs a product search in the search input
     * @param product Product name to search for
     */
    async searchProduct(product: string): Promise<void> {
        if (!product.trim()) {
            throw new Error('Search term cannot be empty');
        }
        await this.searchInputSelector.fill(product);
        await this.searchInputSelector.press('Enter');
        await this.page.waitForTimeout(1000);  // Wait for results to load
    }

    /**
     * Gets the name of the first product from search results
     * @returns Promise<string> Name of first product found or error message
     */
    async getFirstProductName(): Promise<string> {
        try {
            // Check if any results are displayed
            const hasResults = await this.resultItemsSelector.first().isVisible();
            let firstProductName = '';
            
            if (hasResults) {
                // Extract the name of the first product
                const text = await this.resultItemsSelector
                    .first()
                    .locator('h5')
                    .textContent();
                firstProductName = text || 'Product not found';
            }
            
            return firstProductName;
        } catch (error) {
            return 'Error searching product';
        }
    }

    async getSearchResultsCount(): Promise<number> {
        const cards = await this.resultItemsSelector.all();
        
        return cards.length;
    }

    async filterByPriceRange(min: number, max: number): Promise<void> {
        // Implementar filtrado por precio
    }

    /**
     * Adds a specific product to the cart from its card object
     * @param cardObject Locator representing the product card element
     * @private
     */
    private async addSpecificProductToCart(cardObject: Locator): Promise<boolean> {
        try {    
            await this.clickButtom(cardObject.locator(this.addToCartButtonSelector));
            return true;
        } catch(error) {
            throw new Error(`Failed to add product to cart: ${error.message}`);
        }
    }

    /**
     * Adds all products from the search results to the cart
     * Iterates through each product card and triggers the add to cart action
     * @returns Promise<boolean> True if all products were added successfully
     * @throws Error if no products found or if adding products fails
     */
    async addToCart(): Promise<boolean> {
        try {
            const cardObjectArray = await this.resultItemsSelector.all();
            
            if (cardObjectArray.length === 0) {
                throw new Error('No products found to add to cart');
            }

            for (const card of cardObjectArray) {
                console.log(await card.locator('h5').textContent());
                await this.addSpecificProductToCart(card);
                // Esperar a que el indicador de carga desaparezca
                await this.page.waitForSelector('.loading-indicator', { state: 'hidden' });
                // Agregar un pequeño delay adicional para asegurar la estabilidad
                await this.page.waitForTimeout(500);
            }

            return true;
        } catch (error) {
            throw new Error(`Failed to add products to cart: ${error.message}`);
        }
    }

 


}