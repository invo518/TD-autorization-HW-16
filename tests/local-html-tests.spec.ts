import { test, expect } from '@playwright/test';
const path = require('path');

test.beforeEach(async ({ page }) => {
    const filePath = `file://${path.resolve('html/dummy-order.html')}`;
    await page.goto(filePath);
});

test('Basic button test', async ({ page }) => {
    const username = page.locator('#username');
    const email = page.getByPlaceholder('Enter your email');
    const btn = page.locator('button');
    const popup = page.locator('#popup-message');

    await expect(btn).toBeDisabled();
    await username.fill('user1');
    await email.fill('test@test.test');
    await expect(btn).toBeEnabled();
    await btn.click();
    await expect(popup).toBeVisible();
    await expect(popup).toHaveText('OK');
    expect(await popup.innerText()).toBe('OK');
});

test('Email field validation test', async ({ page }) => {
    const username = page.locator('#username');
    const email = page.getByPlaceholder('Enter your email');
    const btn = page.locator('button');

    const invalidEmailOptions = [
        '',
        'qwerty',
        'qwerty@qwerty',
        'qwerty.qwerty'
    ];
    const validEmailOption = 'qwerty@qwerty.qwerty';

    await username.fill('user2');
    await expect(btn).toBeDisabled();
    for(const emailValue of invalidEmailOptions) { // for (let i = 0; i<emailOptions.length; i++) {}
        await email.fill(emailValue);
        await expect(btn).toBeDisabled();
    }
    await email.fill(validEmailOption);
    await expect(btn).toBeEnabled();
});