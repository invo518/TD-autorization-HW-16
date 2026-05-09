import { test, expect } from '@playwright/test';
import {faker} from "@faker-js/faker";
import {configDotenv} from "dotenv";

configDotenv()
const TD_URL = process.env.APP_URL;
const randomUsername = faker.internet.username()
const randomPassword = faker.internet.password()


test.beforeEach(async ({ page }) => {
    await page.goto(process.env.APP_URL);

});

test('TD negative auth test 1', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');
    const errorPopup = page.locator('[data-name="authorizationError-popup"]');

    await username.fill(randomUsername);
    await password.fill(randomPassword);
    await expect(signInBtn).toBeEnabled()
    await signInBtn.click();
    await expect(errorPopup).toBeVisible();
});

test('Positive auth test', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');

    await username.fill(process.env.username);
    await password.fill(process.env.password);
    await expect(signInBtn).toBeEnabled();
    await signInBtn.click();
    await expect(page.getByRole('heading', { name: 'Create Order' })).toBeVisible();
});
test('Switch language EN > RU', async ({ page }) => {

    await page.goto(process.env.APP_URL);

    const ruButton = page.locator('[data-name="language-ru"]');
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('[data-name="password-input"]');
    const signInBtn = page.locator('[data-name="signIn-button"]');


    await expect(ruButton).not.toHaveClass('language__button language__button_active');
    await ruButton.click();
    await expect(ruButton).toHaveClass("language__button language__button_active");
    await expect(usernameInput).toHaveAttribute('placeholder', 'Логин');
    await expect(passwordInput).toHaveAttribute('placeholder', 'Пароль');
    await expect(signInBtn).toHaveText( "Войти");
});
test('Privacy Policy link is correct', async ({ page }) => {
    await page.goto(process.env.APP_URL!);
    const privacyPolicy = page.locator('[data-name="privacy-policy"]');

    await expect(privacyPolicy).toBeVisible();
    await expect(privacyPolicy).toBeEnabled();
    await expect(privacyPolicy).toHaveAttribute('href', '/pdf/politics.pdf');
});
test('Cookie Policy link is correct', async ({ page }) => {
    await page.goto(process.env.APP_URL!);
    const cookiePolicy = page.locator('[data-name="cookie-policy"]');

    await expect(cookiePolicy).toBeVisible();
    await expect(cookiePolicy).toBeEnabled();
    await expect(cookiePolicy).toHaveAttribute('href', '/pdf/cookie.pdf');
});

test('Terms of service link is correct', async ({ page }) => {
    await page.goto(process.env.APP_URL!);
    const termsServ = page.locator('[data-name="terms-of-service"]');

    await expect(termsServ).toBeVisible();
    await expect(termsServ).toBeEnabled();
    await expect(termsServ).toHaveAttribute('href', '/pdf/conditions.pdf')
});


