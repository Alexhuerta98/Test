import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DashBoardPage } from "./DashBoardPage";


/**
 * Page object representing the login page of the application.
 * Extends BasePage to inherit common page functionality.
 */
export class LoginPage extends BasePage{

    //selectors
    private emailInputSelector: Locator;
    private passwordInputSelector: Locator;
    private loginButtonSelector: Locator;
    private errorMessageNoEmailSelector: Locator;
    private errorMessagePopUpSelector: Locator;
    private errorMessageNoPasswordSelector: Locator;
    /**
     * Creates an instance of LoginPage.
     * @param page - The Playwright Page object
     */
    constructor(page: Page){
        super(page);
        this.emailInputSelector=page.locator('#userEmail');
        this.passwordInputSelector=page.locator('#userPassword');
        this.loginButtonSelector=page.getByRole('button', { name: 'Login' });
        this.errorMessagePopUpSelector=page.locator("div[aria-label='Incorrect email or password.']");
        this.errorMessageNoEmailSelector=page.getByText("*Email is required");
        this.errorMessageNoPasswordSelector=page.getByText("*Password is required");
    }
    /**
     * Clicks the login button if visible.
     * @throws Error if login button is not visible
     */
    async clickLoginButton(){
        if(await this.loginButtonSelector.isVisible()){
            await this.clickButtom(this.loginButtonSelector);
        }else{
            throw new Error('Login button not found');
        }   
    }

    /**
     * Fills the email input field.
     * @param email - The email address to enter
     * @returns The entered email address
     * @throws Error if email input is not visible
     */
    private async fillEmail(email: string): Promise<string> {
        if(await this.emailInputSelector.isVisible()){
            await this.emailInputSelector.fill(email);
            return email;
        } else {
            throw new Error('Email input not found');
        }
    }

    /**
     * Fills the password input field.
     * @param password - The password to enter
     * @throws Error if password is empty or input is not visible
     */
    private async fillPassword(password: string){   
        
        if(await this.passwordInputSelector.isVisible()){
            await this.passwordInputSelector.fill(password);
        }else{
            throw new Error('Password input not found');
        }
    }

    /**
     * Performs the complete login process.
     * @param email - The email address to login with
     * @param password - The password to login with
     * @returns Instance of DashBoardPage after successful login
     * @throws Error if any step of the login process fails
     */
    async logInProcess(email: string, password: string): Promise<DashBoardPage>{
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
        return new DashBoardPage(this.page);
    }


    /**
     * Generic method to get error message text from a selector
     * @param selector - The locator for the error message element
     * @param context - Context for error message (used in error handling)
     * @returns Promise<string> The error message text or default message if not found
     * @throws Error if getting the message fails
     */
    private async getErrorMessage(selector: Locator, context: string): Promise<string> {
        try {
            const errorMessage: string | null = await selector.textContent({timeout: 3000});
            return errorMessage || 'No error message found';
        } catch (error) {
            throw new Error(`Error getting ${context} message: ${error.message}`);
        }
    }

    /**
     * Gets the error message from the popup
     */
    async getErrorMessagePopUp(): Promise<string> {
        return this.getErrorMessage(this.errorMessagePopUpSelector, 'popup error');
    }

    /**
     * Gets the error message when email is missing
     */
    async getErrorMessageNoEmail(): Promise<string> {
        return this.getErrorMessage(this.errorMessageNoEmailSelector, 'missing email');
    }

    /**
     * Gets the error message when password is missing
     */
    async getErrorMessageNoPassword(): Promise<string> {
        return this.getErrorMessage(this.errorMessageNoPasswordSelector, 'missing password');
    }




}

// ... existing code ...