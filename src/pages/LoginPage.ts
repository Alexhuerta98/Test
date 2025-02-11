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

    /**
     * Creates an instance of LoginPage.
     * @param page - The Playwright Page object
     */
    constructor(page: Page){
        super(page);
        this.emailInputSelector=page.locator('#userEmail');
        this.passwordInputSelector=page.locator('#userPassword');
        this.loginButtonSelector=page.getByRole('button', { name: 'Login' });
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
}

// ... existing code ...